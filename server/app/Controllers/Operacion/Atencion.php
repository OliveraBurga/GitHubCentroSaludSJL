<?php namespace App\Controllers\Operacion;

use App\Controllers\BaseController;

use App\Models\Operacion\Atencion_model;
use App\Models\Operacion\Atencion_detalle_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Usuario_model;

class Atencion extends BaseController
{
	public function __construct()
	{
		$this->Atencion_m = new Atencion_model();
		$this->Atencion_detalle_m = new Atencion_detalle_model();
		$this->Empresa_m = new Empresa_model();
		$this->Usuario_m = new Usuario_model();
	}

	public function get_manifiesto($id_manifiesto)
	{
		$response = $this->Manifiesto_m->select('manifiesto.*')
		->find($id_manifiesto);
		
		return $this->respond($response, 200);
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Atencion_m->select("id, concat(serie, ' - ', numero) as text");

		$response = $response
		->where('id_empresa', ID_EMPRESA)
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function get_correlativo()
	{
		$secuencia = $this->Atencion_m->get_correlativo();

		return $this->respond($secuencia, 200);
	}

	public function get_atencion_importe($id)
	{


		$response  = $this->Atencion_detalle_m->select('atencion_detalle.*')
		->select('t.nombre as servicio')
		->join('tipo_servicio t','t.id = atencion_detalle.id_servicio')
		->where('id_atencion', $id)->findAll();

		$servicio = [];
		$total = 0;
		foreach ($response  as $row) {
			 
			if ($row->precio_convenio >0 ) {
			
				$servicio[] = $row->servicio.' PRECIO COVENIO: '. $row->precio_convenio. ' / ';
				$total = $total + $row->precio_convenio ;

			}
		

		}

		$servicio = implode( $servicio);

		$response = [

			'servicio' =>$servicio,
			'total' => $total,
		];
		
		return $this->respond($response, 200);
	
	}

	public function print($id)
	{
		$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
		
		->select('p.nombre_completo as paciente')
        ->select('pe.nombre_completo as personal')
        ->select('s.nombre as servicio')
        ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')

		->where('atencion.id_empresa', ID_EMPRESA)	
		->where('atencion.id', $id)	
		->first();

		if ($response ->tipo == 'LABORATORIO') {

			$response->detalle_importes = $this->Atencion_detalle_m->select('atencion_detalle.*')
			->select('t.nombre as servicio')
			->join('tipo_servicio t','t.id = atencion_detalle.id_servicio')
			->where('id_atencion', $response->id)->findAll();

			$servicio = [];
			foreach ($response->detalle_importes  as $row) {
				 
				$servicio[] = $row->servicio.'<br>';

			}

			$response->servicio = implode( $servicio);
		}
		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);

		return $this->respond($response, 200);
	}

	public function index_caja_chica()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Atencion_m->select('caja.*, concat(caja.serie, "-", caja.numero) as caja')
		->select('concat(v.serie, "-", v.numero) as manifiesto')
		->select('coalesce(m.simbolo, "") as simbolo_moneda')
		->join('manifiesto v', 'v.id = caja.id_manifiesto', 'left')
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
		$usuario = $this->Usuario_m->find(ID_USUARIO);

		$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
 
        ->select('p.nombre_completo as paciente')
        ->select('pe.nombre_completo as personal')
        ->select('s.nombre as servicio')
        ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')

		->where('DATE_FORMAT(atencion.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(atencion.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('atencion.id_empresa', ID_EMPRESA);

			if ($usuario->tipo != 'SUPER ADMINISTRADOR') {
				
				 $response ->where('atencion.id_usuario',ID_USUARIO);

			}
		
		
		
			$response = $response ->findAll();


			foreach ($response as $row) {
				
				$row->detalle_importes = $this->Atencion_detalle_m->where('id_atencion', $row->id)->findAll();


			}
		 
		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('operacion-atencion', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('operacion-atencion', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();
			$db->query('LOCK TABLES atencion write, atencion_detalle write, centinela write');

		 

			/** GUARDAR */
			$data = [

				'fecha'							=> trim($data_request["fecha"]),
				'tipo'							=> trim($data_request["tipo_servicio"]),
                'id_paciente'					=> trim($data_request["id_paciente"]),
                'id_personal'					=> trim($data_request["id_personal"]),
                'id_tarifa'						=> (isset($data_request["id_tarifa"])) ? $data_request["id_tarifa"] : null, 
                'id_servicio'					=> (isset($data_request["id_servicio"])) ? $data_request["id_servicio"] : null, 
                'importe'						=> (isset($data_request["importe"])) ? $data_request["importe"] : 0, 
                'comentario'					=> trim($data_request["comentario"]),
				'id_moneda'						=> trim($data_request["id_moneda"]),
				'tipo_cambio'					=> (isset($data_request["tipo_cambio"])) ? $data_request["tipo_cambio"] : null,

				'cod_presta'					=> trim($data_request["cod_presta"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$correlativo = $this->Atencion_m->get_correlativo();

				$data["serie"] = $correlativo->serie;
				$data["numero"] = $correlativo->numero;
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_usuario"] = ID_USUARIO;
 				$data["fl_estado"] = 1;
				$data["estado"] = 'REGISTRADO';
				 
			}

			$this->Atencion_m->save($data);

			$id_atencion = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();
 	
 

				/** SAVE DETALLE IMPORTES ADICIONALES	 */
				$data_detalle = [];
				$this->Atencion_detalle_m->where('id_atencion', $id_atencion)->delete();
	
				foreach (json_decode($data_request["detalle_importes"]) as $row) {
	
					$data_detalle[] = [
						'id_atencion'				=> $id_atencion,
						'cantidad'					=> $row->cantidad,
						'id_servicio'				=> $row->id_servicio,
						'costo_unitario'			=> $row->costo_unitario,
						'importe'					=> $row->importe,
						'precio_convenio'			=> $row->precio_convenio,
					];
	
				}
	
				if(count($data_detalle) > 0)
				{
					$this->Atencion_detalle_m->insertbatch($data_detalle);
				}
	

						
			/****************** SAVE CENTINELA *****************/
			$atencion = $this->Atencion_m->find($id_atencion);

			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'CAJA',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $atencion->serie.'-'.$atencion->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->query('UNLOCK TABLES');
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'id_atencion' => $id_atencion], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('operacion-atencion', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id'		=> $data_request["id"],
				'fl_estado'	=> 0
			];

			$this->Atencion_m->save($data);
 
			/****************** SAVE CENTINELA *****************/
			$atencion = $this->Atencion_m->find($data_request["id"]);

			$data_centinela = [
				'modulo'		=> 'OPERACION',
				'menu'			=> 'ATENCION',
				'accion'		=> 'ANULAR',
				'descripcion'	=> $atencion->serie.'-'.$atencion->numero
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
