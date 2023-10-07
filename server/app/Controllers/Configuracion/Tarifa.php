<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;
 
use App\Models\Configuracion\Tarifa_model;
use App\Models\Configuracion\Tarifa_detalle_model;
use App\Models\Configuracion\Lugar_model;
use App\Models\Configuracion\Tipo_servicio_model;

class Tarifa extends BaseController
{
	public function __construct()
	{
	 
		$this->Tarifa_m = new Tarifa_model();
		$this->Lugar_m = new Lugar_model();
		$this->Tarifa_detalle_m = new Tarifa_detalle_model();
		$this->Tipo_servicio_m = new Tipo_servicio_model();
	}

	public function get()
	{
		$data_request = $this->request->getGet();

		$response = $this->Tarifa_m->select('tarifa.*')
		->select('a.unidad_medida, a.peso')
		->join('articulo a', 'a.id = tarifa.id_articulo')
		->where('id_lugar_origen', $data_request["id_lugar_origen"])
		->where('id_lugar_destino', $data_request["id_lugar_destino"]);

		if(isset($data_request["id_cliente"]))
		{
			$response->where('id_cliente', $data_request["id_cliente"]);
		}
		else
		{
			$response->where('id_cliente', null);
		}

		if(isset($data_request["id_articulo"]))
		{
			$response->where('id_articulo', $data_request["id_articulo"]);
		}
		
		$response = $response->first();

		if(is_object($response))
		{
			return $this->respond($response, 200);
		}
		else
		{
			return $this->respond('null', 200);
		}		
		
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response_final = [];
		$response = $this->Tarifa_m->select("id, concat(tipo_tarifa,' - ', precio) as text,precio as importe")
	
		->where('id_servicio', $data_request["id_servicio"])
		->where('id_paciente',null)
		->where('id_empresa', ID_EMPRESA)
		->findAll();

	
	
		
		$response1 = $this->Tarifa_m->select("id, concat(tipo_tarifa,' - ', precio) as data,precio as importe")
		->where('id_servicio', $data_request["id_servicio"])
		->where('id_paciente', $data_request["id_cliente"])
		->where('id_empresa', ID_EMPRESA)
		->findAll();


		

		if (count($response1) > 0) {
			foreach ($response1 as $row) {
				$row->text = 'TARIFA CLIENTE  '. $row->data;
	
				$response_final   [] =$row ;
			}
		 
		}else
		{

			foreach ($response as $row) {
			
				$response_final   [] =$row ;
			}
	
		
		}

	
		

		return $this->respond($response_final, 200);
	}

	public function get_select_unique_costo($id)
	{
		$data_request = $this->request->getGet();

		$response = $this->Tipo_servicio_m->select('tipo_servicio.*')
		->select('t.precio as precio_tarifa,t.precio_convenio')
		->join('tarifa t','t.id_servicio=tipo_servicio.id','left')
		->where('tipo_servicio.id_empresa', ID_EMPRESA)
		->where('tipo_servicio.id', $id)
		;
		$response = $response->first();

		return $this->respond($response, 200);
	}

	public function get_unique()
	{
		$data_request = $this->request->getGet();

		$response = $this->Tarifa_m->select("id, precio as importe")	
		->where('id_empresa', ID_EMPRESA)
		->find($data_request["id"]);
		
		

		return $this->respond($response, 200);
	}


	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Tarifa_m->select('tarifa.*')
		->select('s.nombre as servicio')
		->select('p.nombre_completo as paciente')
		->join('tipo_servicio s', 's.id = tarifa.id_servicio', 'left')
		->join('paciente p', 'p.id = tarifa.id_paciente', 'left')
		->where('tarifa.id_empresa', ID_EMPRESA);


		if($data_request["tipo_tarifa"] != '')
		{
			$response->where('tarifa.tipo_tarifa', $data_request["tipo_tarifa"]);
			$fl_filtro = true;
		}

		$response = $response->findAll();
		
		return $this->respond(['data' => $response], 200);
	}

	public function validar_duplicado($data)
	{
		$db = \Config\Database::connect();

		$registro = $db->table('tarifa')
		->where('id_servicio', $data["id_servicio"])
		->where('id_paciente', $data["id_paciente"])
		->where('id_empresa', ID_EMPRESA)
		->where('tipo_tarifa',  $data["tipo_tarifa"])
		->get()
		->getRow();

		if($data["id"] != null)
		{
			if(is_object($registro))
			{
				if($registro->id != $data["id"])
				{
					return ['tipo' => 'warning', 'mensaje' => 'TARIFA ya existente '.$registro->id.' '.$data["id"]];
				}
			}
		}
		else
		{
			if(is_object($registro))
			{
				return ['tipo' => 'warning', 'mensaje' => 'TARIFA ya existente'];
			}
		}
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-tarifa', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-tarifa', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data_validacion = [
				'tipo_tarifa' 		=> $data_request["tipo_tarifa"],
				'id_servicio' 		=> (isset($data_request["id_servicio"])) ? trim($data_request["id_servicio"]) : null,
				'id_paciente' 		=> (isset($data_request["id_paciente"])) ? trim($data_request["id_paciente"]) : null,
				'id' 				=> (isset($data_request["id"])) ? $data_request["id"] : null,
			];

		//	$result_validacion = $this->validar_duplicado($data_validacion);

		//	if(is_array($result_validacion))
		//	{
		//		return $this->respond($result_validacion, 400);
		//	}			

			/** GUARDAR */
			$data = [
				'id_servicio'        		=> (isset($data_request["id_servicio"])) ? trim($data_request["id_servicio"]) : null,
				'id_paciente'        		=> (isset($data_request["id_paciente"])) ? trim($data_request["id_paciente"]) : null,
				'precio'        			=> trim($data_request["precio"]),
				'tipo_tarifa'           	=> trim($data_request["tipo_tarifa"]),
				'precio_convenio'        			=> trim($data_request["precio_convenio"]),
			];
			

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_usuario"] = ID_USUARIO;
			}

			$this->Tarifa_m->save($data);

			$id_tarifa = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();
			
			/****************** SAVE CENTINELA *****************/
			

			// $data_centinela = [
			// 	'modulo'		=> 'CONFIGURACIÓN',
			// 	'menu'			=> 'TARIFAS',
			// 	'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
			// 	'descripcion'	=> ''
			// ];

			// $this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'id_tarifa' => $id_tarifa], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-tarifa', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();


			$this->Tarifa_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/			
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'TARIFAS',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> ''
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
