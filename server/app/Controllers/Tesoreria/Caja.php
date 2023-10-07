<?php namespace App\Controllers\Tesoreria;

use App\Controllers\BaseController;

use App\Models\Tesoreria\Caja_model;
use App\Models\Tesoreria\Flujo_caja_model;
 
use App\Models\Operacion\atencion_orden_model;
use App\Models\Operacion\Atencion_model;
use App\Models\Configuracion\Empresa_model;

class Caja extends BaseController
{
	public function __construct()
	{
		$this->Caja_m = new Caja_model();
		$this->Flujo_caja_m = new Flujo_caja_model();
		 
		$this->Empresa_m = new Empresa_model();
		$this->Atencion_m = new Atencion_model();
	}

	public function get_atencion($id_atencion)
	{
		$response = $this->Atencion_m->select('atencion.*')
		->find($id_atencion);
		
		return $this->respond($response, 200);
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Caja_m->select("id, concat(serie, ' - ', numero) as text");

		$response = $response
		->where('id_empresa', ID_EMPRESA)
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function get_correlativo()
	{
		$secuencia = $this->Caja_m->get_correlativo();

		return $this->respond($secuencia, 200);
	}

	public function print($id)
	{
		$response = $this->Caja_m->select('caja.*, concat(caja.serie, "-", caja.numero) as caja, coalesce(caja.cuenta_bancaria_persona, "") as cuenta_bancaria_persona, coalesce(caja.observacion, "") as observacion')
		->select('coalesce(concat(v.serie, "-", v.numero), "") as atencion')
		->select('e.nombre_comercial as empresa, e.logo')
		->select('coalesce(m.simbolo, "") as simbolo_moneda, coalesce(m.nombre, "SOLES") as moneda')
		->join('atencion v', 'v.id = caja.id_atencion', 'left')
		->join('empresa e', 'e.id = caja.id_empresa', 'left')
		->join('static_moneda m', 'm.id = caja.id_moneda', 'left')

		->where('caja.id_empresa', ID_EMPRESA)	
		->where('caja.id', $id)	
		->first();

		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);

		return $this->respond($response, 200);
	}

	public function index_caja_chica()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Caja_m->select('caja.*, concat(caja.serie, "-", caja.numero) as caja')
		->select('concat(v.serie, "-", v.numero) as atencion')
		->select('coalesce(m.simbolo, "") as simbolo_moneda')
		->join('atencion v', 'v.id = caja.id_atencion', 'left')
		->join('static_moneda m', 'm.id = caja.id_moneda', 'left')
		->where('caja.modalidad', 'EFECTIVO')
		->where('caja.id_caja_chica', $data_request["id_caja_chica"])		
		->where('caja.id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Caja_m->select('caja.*, concat(caja.serie, "-", caja.numero) as caja')
		->select('concat(v.serie, "-", v.numero) as atencion')
		->select('coalesce(m.simbolo, "") as simbolo_moneda')
		->join('atencion v', 'v.id = caja.id_atencion', 'left')
		->join('static_moneda m', 'm.id = caja.id_moneda', 'left')

		->where('DATE_FORMAT(caja.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(caja.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('caja.id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('tesoreria-caja', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('tesoreria-caja', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();
			$db->query('LOCK TABLES caja write,  flujo_caja write, centinela write,    atencion write');

			/*** AJUSTE GENERAL */

		 

			/** VALIDAR SI atencion ESTÁ LIQUIDADO */
			 

			/** GUARDAR */
			$data = [

				'fecha'							=> trim($data_request["fecha"]),
				'id_atencion'					=> (isset($data_request["id_atencion"])) ? trim($data_request["id_atencion"]) : null,
				'tipo_persona'					=> trim($data_request["tipo_persona"]),
				'id_tipo_persona'				=> (isset($data_request["id_tipo_persona"])) ? trim($data_request["id_tipo_persona"]) : null,
				'nombre_persona'				=> trim($data_request["nombre_persona"]),
				'motivo'						=> trim($data_request["motivo"]),
				'modalidad'						=> trim($data_request["modalidad"]),
				'id_moneda'						=> trim($data_request["id_moneda"]),
				'importe'						=> trim($data_request["importe"]),
				'observacion'					=> trim($data_request["observacion"]),
				'descripcion'					=> trim($data_request["descripcion"]),
				'cuenta_bancaria_persona'		=> (isset($data_request["cuenta_bancaria_persona"])) ? trim($data_request["cuenta_bancaria_persona"]) : null,
				'titular_cuenta'				=> (isset($data_request["titular_cuenta"])) ? trim($data_request["titular_cuenta"]) : null,
				'id_cuenta_bancaria_empresa'	=> ($data_request["id_cuenta_bancaria_empresa"] != '') ? trim($data_request["id_cuenta_bancaria_empresa"]) : null,
				'id_cuenta_bancaria_persona'	=> (isset($data_request["id_cuenta_bancaria_persona"])) ? trim($data_request["id_cuenta_bancaria_persona"]): null,
				'fl_no_liquidacion_atencion'	=> (isset($data_request["fl_no_liquidacion_atencion"])) ? 1 : null,
				'tipo_cambio'					=> (isset($data_request["tipo_cambio"])) ? $data_request["tipo_cambio"] : null,
				'id_local'						=>(isset($data_request["id_local"])) ? $data_request["id_local"] : null,
				'tipo'        					=> 'EGRESO',
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$correlativo = $this->Caja_m->get_correlativo();

				$data["serie"] = $correlativo->serie;
				$data["numero"] = $correlativo->numero;
				$data["tipo"] = trim($data_request["tipo"]);
				$data["fl_estado"] = ($data_request["tipo"] == 'CAJA_RAPIDA') ? 3 : 1;
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_usuario"] = ID_USUARIO;
				$data["tipo_movimiento"] = 'EGRESO';
				// $data["id_local"] = ID_LOCAL;
			}

			$this->Caja_m->save($data);

			$id_caja = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/** SAVE FLUJO CAJA */
		
				$this->Flujo_caja_m->where('id_caja', $id_caja)->delete();

				$data =  [
					'fecha'       					=> $data_request["fecha"],
					'tipo'        					=> 'EGRESO',
					'descripcion' 					=> $data_request["descripcion"],
					'id_caja'						=> $id_caja,
					'id_usuario'  					=> ID_USUARIO,
					'id_empresa' 					=> ID_EMPRESA,
					'id_cuenta_bancaria_empresa'   	=> (isset($data_request["id_cuenta_bancaria_empresa"])) ? $data_request["id_cuenta_bancaria_empresa"] : null,
					'monto'       					=> $data_request["importe"]
				];

				$this->Flujo_caja_m->save($data);
			

			/*** OPERACIONES SOLO AL CREAR NUEVA CAJA RÁPIDA */
	

			/****************** SAVE CENTINELA *****************/
			$caja = $this->Caja_m->find($id_caja);

			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'CAJA',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $caja->serie.'-'.$caja->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->query('UNLOCK TABLES');
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'id_caja' => $id_caja], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('tesoreria-caja', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id'		=> $data_request["id"],
				'fl_estado'	=> 0
			];

			$this->Caja_m->save($data);

			$caja = $this->Caja_m->find($data_request["id"]);

			$this->Flujo_caja_m->where('id_caja', $data_request["id"])->delete();

			// DESVINCULAR CAJA DE OTROS PAGOS
			$data_null = [
				'id_caja' => null
			];

			$db->table('vale_pago')
			->update($data_null, ['id_caja' => $data_request["id"]]);

			$db->table('vale_combustible')
			->update($data_null, ['id_caja' => $data_request["id"]]);

			$db->table('mantenimiento_vehiculo')
			->update($data_null, ['id_caja' => $data_request["id"]]);

			/******** OTRAS VERIFICACIONES VINCULADAS DE CAJA */

			/****
			 * SI LA CAJA PERTENECE A UN PAGO DE REQUERIMIENTO DEBERÁ MOSTRARSE NUEVAMENTE EN PAGO DE REQUERIMIENTOS
			 */

			if($caja->motivo == 'ADELANTO atencion TERCERIZADO')
			{
				$data_atencion = [
					'id'									=> $caja->id_atencion,
					'fl_requerimiento_adelanto_tercerizado'	=> null
				];

				$this->Atencion_m->save($data_atencion);
			}
			else if($caja->motivo == 'FLETE atencion TERCERIZADO')
			{
				$data_atencion = [
					'id'									=> $caja->id_atencion,
					'fl_requerimiento_flete_tercerizado'	=> null
				];

				$this->Atencion_m->save($data_atencion);
			}
			else if($caja->motivo == 'ADELANTO SERVICIO ESCOLTA')
			{
				$data_atencion = [
					'id'									=> $caja->id_atencion,
					'fl_requerimiento_adelanto_escolta'		=> null
				];

				$this->Atencion_m->save($data_atencion);
			}

			else if($caja->motivo == 'SERVICIO ESCOLTA')
			{
				$data_atencion = [
					'id'									=> $caja->id_atencion,
					'fl_requerimiento_escolta'				=> null
				];

				$this->Atencion_m->save($data_atencion);
			}


			/****************** SAVE CENTINELA *****************/
			$caja = $this->Caja_m->find($data_request["id"]);

			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'CAJA',
				'accion'		=> 'ANULAR',
				'descripcion'	=> $caja->serie.'-'.$caja->numero
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
