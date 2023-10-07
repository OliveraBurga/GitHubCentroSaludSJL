<?php namespace App\Controllers\Tesoreria;

use App\Controllers\BaseController;

use App\Models\Operacion\Atencion_model;
use App\Models\Tesoreria\Flujo_caja_model;
use App\Models\Tesoreria\Atencion_pago_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Tesoreria\Caja_model;

class atencion_pago extends BaseController
{
	public function __construct()
	{
		$this->Atencion_pago_m = new Atencion_pago_model();
		$this->Atencion_m = new Atencion_model();
		$this->Flujo_caja_m = new Flujo_caja_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$this->Caja_m = new Caja_model();
	}

	public function servicio_pendiente()
	{		
		 $ajuste = $this->Ajuste_avanzado_m->where('id_empresa', ID_EMPRESA)->first();

		$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie,"-",atencion.numero) as atencion')
		->select('c.razon_social as cliente')
		->select('ts.nombre as servicio')
		->select('mo.simbolo as moneda_atencion, mo.id as id_moneda_atencion')
	
	
		->join('paciente c', 'c.id = atencion.id_paciente', 'left')
		->join('tipo_servicio ts', 'ts.id = atencion.id_servicio', 'left')
	
		->join('static_moneda mo', 'mo.id = atencion.id_moneda', 'left')
	
 
		->where('atencion.fl_pagado', null)
		->where('atencion.id_empresa', ID_EMPRESA)		
		->findAll();

		foreach ($response as $row) {

			$total_pago = $this->Atencion_pago_m->select('coalesce(sum(monto), 0) as monto')->where('id_atencion', $row->id)->first();
            
			//COBRAR SEGUN atencion
			$row->moneda_deuda = $row->moneda_atencion;
			$row->id_moneda_deuda = $row->id_moneda_atencion;
			$total_atencion = $row->importe;


			$total_deuda = $total_atencion - $total_pago->monto;
			$row->total_pago = $total_pago->monto;
			$row->total_deuda = number_format($total_deuda, 2, '.', '');
		}

		return $this->respond(['data' => $response], 200);
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Atencion_pago_m->select("id, concat(serie, ' - ', numero) as text");

		$response = $response
		->where('id_empresa', ID_EMPRESA)
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function get_correlativo($serie)
	{
		$secuencia = $this->Atencion_pago_m->get_correlativo($serie);

		return $this->respond($secuencia, 200);
	}

	public function print($id)
	{
		$response = $this->Atencion_pago_m->select('atencion_pago.*')
		->select('coalesce(concat(o.serie, "-", o.numero), "") as atencion')
		->select('e.nombre_comercial as empresa, e.logo')
		->select('u.usuario')
		->select('coalesce(mp.simbolo, "") as moneda_pago')

		->join('atencion o', 'o.id = atencion_pago.id_atencion', 'left')
		->join('empresa e', 'e.id = atencion_pago.id_empresa', 'left')
		->join('usuario u', 'u.id = atencion_pago.id_usuario', 'left')
		->join('static_moneda mp', 'mp.id = atencion_pago.id_moneda', 'left')

		->where('atencion_pago.id_empresa', ID_EMPRESA)	
		->where('atencion_pago.id', $id)	
		->first();

		$cantidad_pagos = $this->Atencion_pago_m->where('id_atencion', $response->id_atencion)->countAllResults();

		$response->cantidad_pagos = $cantidad_pagos;

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Atencion_pago_m->select('atencion_pago.*')
		->select('concat(o.serie, "-", o.numero) as atencion, o.importe')
		->select('mo.simbolo as moneda_atencion')
 
		->select('coalesce(mp.simbolo, "") as moneda_pago')


		->join('atencion o', 'o.id = atencion_pago.id_atencion', 'left')
		->join('static_moneda mo', 'mo.id = o.id_moneda', 'left')
	

		->join('static_moneda mp', 'mp.id = atencion_pago.id_moneda', 'left')

		->where('DATE_FORMAT(atencion_pago.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(atencion_pago.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('atencion_pago.id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('tesoreria-atencion_pago', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('tesoreria-atencion_pago', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$aporte = $data_request["monto_pago"];

            $efectivo = $aporte;
            $atenciones_pagadas = array();
            $atencion_saldo = null;

            /* RECORRIENDO DETALLE */
            foreach (json_decode($data_request["detalle_atencion"]) as $item) {
                
				$id_atencion = $item->id;

                $atencion = $this->Atencion_m->select('id as id_atencion, importe, serie, numero')->find($id_atencion);

				$atencion->monto_cobrar = $item->total_deuda;

				
                $efectivo = $efectivo - $atencion->monto_cobrar;
               
                if($efectivo > 0)
                {
                    
                    /* PAGANDO COMPROBANTES */
                    $atenciones_pagadas[] = $atencion;
                }
                else if($efectivo == 0)
                {
                    /* PAGO EXACTO */
                    
                     
                    $atenciones_pagadas[] = $atencion;
                    break;

                  
                }
                else
                {  
                    /* COMPROBANTE SALDO */
                    $atencion_saldo = $atencion;
                    $saldo = abs($efectivo);
                    $efectivo = 0;
                    break;
                }
            }

            foreach ($atenciones_pagadas as $row) {

                
                /** REGISTRAR PAGO */
                $array_pago = [
                  'id_cuenta_bancaria_empresa'   	=> (isset($data_request["id_cuenta_bancaria_empresa"])) ? $data_request["id_cuenta_bancaria_empresa"] : null,
                  'tipo_canal'        				=> $data_request["tipo_canal"],
                  'medio_pago'         				=> $data_request["medio_pago"],
				  'numero_operacion'         		=> $data_request["numero_operacion"],
                  'observacion'           			=> $data_request["observacion"],
                  'id_empresa'       				=> ID_EMPRESA,
                  'id_usuario'        				=> ID_USUARIO,
                  'monto'             				=> $row->monto_cobrar,
                  'id_atencion'          				=> $row->id_atencion,
                  'fecha'             				=> $data_request["fecha"],
				  'fecha_sistema'					=> date("Y-m-d H:i:s"),
				  'id_moneda'						=> $data_request["id_moneda"]
                ];

                $this->Atencion_pago_m->save($array_pago);

                $id_atencion_pago = $db->insertID();

                /** SAVE FLUJO CAJA */
				$data =  [
					'fecha'       					=> $data_request["fecha"],
					'tipo'        					=> 'INGRESO',
					'descripcion' 					=> $data_request["numero_operacion"],
					'id_atencion_pago'				=> $id_atencion_pago,
					'id_usuario'  					=> ID_USUARIO,
					'id_empresa' 					=> ID_EMPRESA,
					'id_cuenta_bancaria_empresa'   	=> (isset($data_request["id_cuenta_bancaria_empresa"])) ? $data_request["id_cuenta_bancaria_empresa"] : null,
					'monto'       					=>  $row->monto_cobrar,
                    'medio_pago'         			=> $data_request["medio_pago"],
				];

				$this->Flujo_caja_m->save($data);
                               

					/** REGISTRAR CAJA */
					$data = [
						'fecha'							=> trim($data_request["fecha"]),
						'motivo'						=> 'PAGO ÓRDEN DE SERVICIOS',
						'modalidad'						=> $data_request["medio_pago"],
						'id_moneda'						=> trim($data_request["id_moneda"]),
						'importe'						=> $row->monto_cobrar,
						'observacion'					=> trim($data_request["observacion"]),
						'descripcion'					=> 'PAGO ATENCION '.$row->serie.'-'.$row->numero,
					];
		
					$correlativo = $this->Caja_m->get_correlativo();
		
					$data["serie"] = $correlativo->serie;
					$data["numero"] = $correlativo->numero;
					$data["tipo"] = 'CAJA_RAPIDA';
					$data["tipo_movimiento"] = 'INGRESO';
					$data["fl_estado"] = 3; // PROCESADO
					$data["id_empresa"] = ID_EMPRESA;
					$data["id_usuario"] = ID_USUARIO;
					$data["id_local"] = ID_LOCAL;
				/* 	$data["id_caja_chica"] = $id_caja_chica; */
					$data["id_orden_pago"] = $id_atencion_pago;
		
					$this->Caja_m->save($data);

                /* GUARDAR ESTADO */                
                $array_save = [
                  'id'          		=> $row->id_atencion,
                  'fl_pagado'         	=> 1,
                ];
    
                $this->Atencion_m->save($array_save);

				/****************** SAVE CENTINELA *****************/
				$atencion_pago = $this->Atencion_pago_m->select('concat(o.serie,"-",o.numero) as atencion')
				->join('atencion o', 'o.id = atencion_pago.id_atencion')
				->select('atencion_pago.monto')
				->find($id_atencion_pago);

				$data_centinela = [
					'modulo'		=> 'TESORERIA',
					'menu'			=> 'PAGO DE ÓRDENES',
					'accion'		=> 'NUEVO',
					'descripcion'	=> 'Pago Completo: '.$atencion_pago->monto.', atencion: '.$atencion_pago->atencion
				];

				$this->Centinela_m->registrar($data_centinela);
				/*************************************************** */
                
            } 

            if ($atencion_saldo != null) {

				/** REGISTRAR PAGO */
                $array_pago = [
					'id_cuenta_bancaria_empresa'   		=> (isset($data_request["id_cuenta_bancaria_empresa"])) ? $data_request["id_cuenta_bancaria_empresa"] : null,
					'tipo_canal'        				=> $data_request["tipo_canal"],
					'medio_pago'         				=> $data_request["medio_pago"],
					'numero_operacion'         			=> $data_request["numero_operacion"],
					'observacion'           			=> $data_request["observacion"],
					'id_empresa'       					=> ID_EMPRESA,
					'id_usuario'        				=> ID_USUARIO,
					'monto'             				=> $atencion_saldo->monto_cobrar - $saldo,
					'id_atencion'          				=> $atencion_saldo->id_atencion,
					'fecha'             				=> $data_request["fecha"],
					'fecha_sistema'						=> date("Y-m-d H:i:s"),
					'id_moneda'						=> $data_request["id_moneda"],
                    
				  ];

				$this->Atencion_pago_m->save($array_pago);

                $id_atencion_pago = $db->insertID();

				/** SAVE FLUJO CAJA */
				$data =  [
					'fecha'       					=> $data_request["fecha"],
					'tipo'        					=> 'INGRESO',
					'descripcion' 					=> $data_request["numero_operacion"],
					'id_atencion_pago'					=> $id_atencion_pago,
					'id_usuario'  					=> ID_USUARIO,
					'id_empresa' 					=> ID_EMPRESA,
					'id_cuenta_bancaria_empresa'   	=> (isset($data_request["id_cuenta_bancaria_empresa"])) ? $data_request["id_cuenta_bancaria_empresa"] : null,
					'monto'       					=> $atencion_saldo->monto_cobrar - $saldo,
                    'medio_pago'         				=> $data_request["medio_pago"],
				];

				$this->Flujo_caja_m->save($data);


				/** REGISTRAR CAJA */
				$data = [
					'fecha'							=> trim($data_request["fecha"]),
					'motivo'						=> 'PAGO ÓRDEN DE SERVICIOS',
					'modalidad'						=> $data_request["medio_pago"],
					'id_moneda'						=> trim($data_request["id_moneda"]),
					'importe'						=> $atencion_saldo->monto_cobrar - $saldo,
					'observacion'					=> trim($data_request["observacion"]),
					'descripcion'					=> 'PAGO PARCIAL ÓRDEN DE SERVICIO '.$atencion_saldo->serie.'-'.$atencion_saldo->numero,
				];
	
				$correlativo = $this->Caja_m->get_correlativo();
	
				$data["serie"] = $correlativo->serie;
				$data["numero"] = $correlativo->numero;
				$data["tipo"] = 'CAJA_RAPIDA';
				$data["tipo_movimiento"] = 'INGRESO';
				$data["fl_estado"] = 3; // PROCESADO
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_usuario"] = ID_USUARIO;
				$data["id_local"] = ID_LOCAL;
			/* 	$data["id_caja_chica"] = $id_caja_chica; */
				$data["id_orden_pago"] = $id_atencion_pago;
	
				$this->Caja_m->save($data);

				/****************** SAVE CENTINELA *****************/
				$atencion_pago = $this->Atencion_pago_m->select('concat(o.serie,"-",o.numero) as atencion')
				->select('atencion_pago.monto')
				->join('atencion o', 'o.id = atencion_pago.id_atencion')
				->find($id_atencion_pago);

				$data_centinela = [
					'modulo'		=> 'TESORERIA',
					'menu'			=> 'PAGO DE ÓRDENES',
					'accion'		=> 'NUEVO',
					'descripcion'	=> 'Pago Parcial: '.$atencion_pago->monto.', atencion: '.$atencion_pago->atencion
				];

				$this->Centinela_m->registrar($data_centinela);
				/*************************************************** */
                
				
            }
				

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function edit()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('tesoreria-atencion_pago', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$atencion_pago = $this->Atencion_pago_m->select('f.id as id_flujo_caja, atencion_pago.id, atencion_pago.id_atencion, o.importe')
			->join('flujo_caja f', 'f.id_atencion_pago = atencion_pago.id')
			->join('atencion o', 'o.id = atencion_pago.id_atencion')
			->where('atencion_pago.id', $data_request["id"])
			->first();

			if(is_object($atencion_pago))
			{
				/** REGISTRAR PAGO */
				$array_pago = [
					'id_cuenta_bancaria_empresa'   	=> (isset($data_request["id_cuenta_bancaria_empresa"])) ? $data_request["id_cuenta_bancaria_empresa"] : null,
					'tipo_canal'        			=> $data_request["tipo_canal"],
					'medio_pago'         			=> $data_request["medio_pago"],
					'numero_operacion'         		=> $data_request["numero_operacion"],
					'observacion'           		=> $data_request["observacion"],
					'id_usuario'        			=> ID_USUARIO,
					'monto'             			=> $data_request["monto_pago"],
					'fecha'             			=> $data_request["fecha"],
					'id'							=> $data_request["id"]
				];

				$this->Atencion_pago_m->save($array_pago);

				/** SAVE FLUJO CAJA */
				$data =  [
					'fecha'       					=> $data_request["fecha"],
					'tipo'        					=> 'INGRESO',
					'descripcion' 					=> $data_request["numero_operacion"],
					'id_atencion_pago'					=> $data_request["id"],
					'id_usuario'  					=> ID_USUARIO,
					'id_cuenta_bancaria_empresa'   	=> (isset($data_request["id_cuenta_bancaria_empresa"])) ? $data_request["id_cuenta_bancaria_empresa"] : null,
					'monto'       					=> $data_request["monto_pago"],
					'id'							=> $atencion_pago->id_flujo_caja
				];

				$this->Flujo_caja_m->save($data);
				

				/*** VERIFICAR PAGO TOTAL */
				$total_pago = $this->Atencion_pago_m->select('coalesce(sum(monto), 0) as monto')->where('id_atencion', $atencion_pago->id_atencion)->first();
			
				/* GUARDAR ESTADO */                
				$array_save = [
					'id'          		=> $atencion_pago->id_atencion,
					'fl_pagado'         => ($total_pago->monto >= $atencion_pago->importe) ? 1 : null,
				];				
	
				$this->Atencion_m->save($array_save);

				/****************** SAVE CENTINELA *****************/
				$atencion_pago = $this->Atencion_pago_m->select('concat(o.serie,"-",o.numero) as atencion')
				->select('atencion_pago.monto')
				->join('atencion o', 'o.id = atencion_pago.id_atencion')
				->find($data_request["id"]);

				$data_centinela = [
					'modulo'		=> 'TESORERIA',
					'menu'			=> 'PAGO DE ÓRDENES',
					'accion'		=> 'EDITAR',
					'descripcion'	=> 'Monto: '.$atencion_pago->monto.', atencion: '.$atencion_pago->atencion
				];

				$this->Centinela_m->registrar($data_centinela);
				/*************************************************** */

				$db->transComplete();

				return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);
			}
			else
			{
				return $this->respond(['tipo' => 'warning', 'mensaje' => 'No hubo cambios'], 200);
			}
			

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('tesoreria-atencion_pago', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$atencion_pago = $this->Atencion_pago_m->select('concat(o.serie,"-",o.numero) as atencion, atencion_pago.id as id_atencion')
			->select('atencion_pago.monto')
			->join('atencion o', 'o.id = atencion_pago.id_atencion')
			->find($data_request["id"]);

			$data = [
				'id'		=> $atencion_pago->id_atencion,
				'fl_pagado'	=> null
			];

			$this->Atencion_m->save($data);

			$this->Atencion_pago_m->where('id', $data_request["id"])->delete();
			$this->Flujo_caja_m->where('id_atencion_pago', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'PAGO DE servicio',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> 'Monto: '.$atencion_pago->monto.', atencion: '.$atencion_pago->atencion
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		
}
