<?php namespace App\Controllers\Tesoreria;

use App\Controllers\BaseController;

use App\Models\Tesoreria\Caja_chica_model;
use App\Models\Tesoreria\Caja_model;
use App\Models\Tesoreria\Flujo_caja_model;
 
use App\Models\Operacion\Atencion_model;
 
use App\Models\Configuracion\Empresa_model;

class Caja_chica extends BaseController
{
	public function __construct()
	{
		$this->Empresa_m = new Empresa_model();
		$this->Caja_chica_m = new Caja_chica_model();
		$this->Caja_m = new Caja_model();
		$this->Flujo_caja_m = new Flujo_caja_model();
		 
	}

	public function verificar_caja_chica_existente()
	{
		$caja_chica = $this->Caja_chica_m->where('id_empresa', ID_EMPRESA)
		->where('id_local', ID_LOCAL)
		->where('id_usuario', ID_USUARIO)
		->where('estado', 'ABIERTO')
		->first();

		if(!is_object($caja_chica))
		{
			$response = [
				'caja_chica' 	=> null,
				'ultima_caja'	=> null
			];			
		}
		else
		{
			$this->Caja_chica_m->calcular_totales($caja_chica->id);
			$response = [
				'caja_chica' 	=> $caja_chica,
				'ultima_caja'	=> null
			];
		}

		$ultima_caja = $this->Caja_chica_m->where('id_empresa', ID_EMPRESA)
		->where('id_local', ID_LOCAL)
		->where('id_usuario', ID_USUARIO)
		->where('estado', 'CERRADO')
		->orderBy('fecha_cierre', 'desc')
		->first();
		
		if(is_object($ultima_caja))
		{
			$response["ultima_caja"] = $ultima_caja;
		}

		return $this->respond($response, 200);

	}

	public function save_apertura()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('tesoreria-caja_chica', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('tesoreria-caja_chica', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();

			/** GUARDAR */
			$data = [
				'fecha_sistema'					=> date("Y-m-d H:i:s"),
				'fecha_apertura'				=> trim($data_request["fecha"].' '.$data_request["hora"]),
				'saldo_inicial'					=> (is_numeric($data_request["saldo_inicial"])) ? trim($data_request["saldo_inicial"]) : 0,
				'id_local'						=> ID_LOCAL,
				'id_usuario'					=> ID_USUARIO,
				'id_empresa'					=> ID_EMPRESA,
				'estado'						=> 'ABIERTO',
				'total_ingreso'					=> 0,
				'total_egreso'					=> 0,
				'total_saldo'					=> (is_numeric($data_request["saldo_inicial"])) ? trim($data_request["saldo_inicial"]) : 0,	
			];

			$this->Caja_chica_m->save($data);


			/****************** SAVE CENTINELA *****************/

			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'CAJA CHICA',
				'accion'		=> 'APERTURA',
				'descripcion'	=> 'Saldo Inicial: '.(is_numeric($data_request["saldo_inicial"])) ? trim($data_request["saldo_inicial"]) : 0
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function save_cierre()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('tesoreria-caja_chica', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('tesoreria-caja_chica', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();

			/** GUARDAR */
			$data = [
				'fecha_cierre'					=> trim($data_request["fecha"].' '.$data_request["hora"]),
				'estado'						=> 'CERRADO',
				'id'							=> trim($data_request["id_caja_chica"])
			];

			$this->Caja_chica_m->save($data);

			$totales = $this->Caja_chica_m->calcular_totales($data_request["id_caja_chica"]);

			/****************** SAVE CENTINELA *****************/

			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'CAJA CHICA',
				'accion'		=> 'CIERRE',
				'descripcion'	=> 'Saldo final: '.$totales->total_saldo
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function print($id)
	{
		$caja_chica = $this->Caja_chica_m->select('caja_chica.*')
		->select('coalesce(u.nombre, "") as usuario')
		->join('usuario u', 'u.id = caja_chica.id_usuario', 'left')
		->find($id);

		$detalle = $this->Caja_m->where('id_caja_chica', $id)
		->where('modalidad', 'EFECTIVO')
		->where('fl_estado', 3)
		->findAll();
		$empresa = $this->Empresa_m->find(ID_EMPRESA);

		$response = [
			'empresa'		=> $empresa,
			'detalle'		=> $detalle,
			'caja_chica'	=> $caja_chica
		];

		return $this->respond($response, 200);
	}

	public function get_totales($id_caja_chica)
	{		
		$response = $this->Caja_chica_m->find($id_caja_chica);

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Caja_chica_m->select('caja.*, concat(caja.serie, "-", caja.numero) as caja')
		->select('concat(v.serie, "-", v.numero) as atencion')
		->select('coalesce(m.simbolo, "") as simbolo_moneda')
		->join('atencion v', 'v.id = caja.id_atencion', 'left')
		->join('static_moneda m', 'm.id = caja.id_moneda', 'left')

		->where('DATE_FORMAT(caja.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(caja.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('caja.tipo', $data_request["tipo"])		
		->where('caja.id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('tesoreria-caja_chica', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('tesoreria-caja_chica', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();
			$db->query('LOCK TABLES caja write,  flujo_caja write, centinela write,   atencion write, caja_chica write');

			/*** AJUSTE GENERAL */

		 

 

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
				 
				'tipo_cambio'					=> (isset($data_request["tipo_cambio"])) ? $data_request["tipo_cambio"] : null,
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
				$data["tipo"] = 'CAJA_RAPIDA';
				$data["tipo_movimiento"] = trim($data_request["tipo_movimiento"]);
				$data["fl_estado"] = 3; // PROCESADO
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_usuario"] = ID_USUARIO;
				$data["id_local"] = ID_LOCAL;
				$data["id_caja_chica"] = $data_request["id_caja_chica"];
			}

			$this->Caja_m->save($data);

			$id_caja = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			$this->Caja_chica_m->calcular_totales($data_request["id_caja_chica"]);

			/** SAVE FLUJO CAJA */
			$this->Flujo_caja_m->where('id_caja', $id_caja)->delete();

			$data =  [
				'fecha'       					=> $data_request["fecha"],
				'tipo'        					=> trim($data_request["tipo_movimiento"]),
				'descripcion' 					=> $data_request["descripcion"],
				'id_caja'						=> $id_caja,
				'id_usuario'  					=> ID_USUARIO,
				'id_empresa' 					=> ID_EMPRESA,
				'id_cuenta_bancaria_empresa'   	=> (isset($data_request["id_cuenta_bancaria_empresa"])) ? $data_request["id_cuenta_bancaria_empresa"] : null,
				'monto'       					=> $data_request["importe"]
			];

			$this->Flujo_caja_m->save($data);

	 
			


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
		$this->Helper->validar_permisos('tesoreria-caja_chica', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id'		=> $data_request["id"],
				'fl_estado'	=> 0
			];

			$this->Caja_m->save($data);

			$caja = $this->Caja_m->find($data_request["id"]);

			$this->Caja_chica_m->calcular_totales($data_request["id_caja_chica"]);

			$this->Flujo_caja_m->where('id_caja', $data_request["id"])->delete();

			// DESVINCULAR CAJA DE OTROS PAGOS
		 

			/******** OTRAS VERIFICACIONES VINCULADAS DE CAJA */

			/****
			 * SI LA CAJA PERTENECE A UN PAGO DE REQUERIMIENTO DEBERÁ MOSTRARSE NUEVAMENTE EN PAGO DE REQUERIMIENTOS
			 */

		 


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
