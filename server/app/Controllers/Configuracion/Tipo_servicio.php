<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Tipo_servicio_model;
use App\Models\Configuracion\Tipo_examen_detalle_model;
use App\Models\Configuracion\Tipo_examen_columnas_model;

class Tipo_servicio extends BaseController
{
	public function __construct()
	{
		$this->Tipo_servicio_m = new Tipo_servicio_model();
		$this->Tipo_examen_detalle_m = new Tipo_examen_detalle_model();
		$this->Tipo_examen_columnas_m= new Tipo_examen_columnas_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Tipo_servicio_m->select("id, nombre as text")
		->where('id_empresa', ID_EMPRESA);

		if (isset($data_request["tipo"]) and $data_request["tipo"]!= '' ) {
			
			$response->where('tipo', $data_request["tipo"]);

		}

		$response = $response->findAll();

		return $this->respond($response, 200);
	}

 

	public function get_select_unique($id)
	{
		$data_request = $this->request->getGet();

		$response = $this->Tipo_servicio_m
		->where('id_empresa', ID_EMPRESA)
		->where('id', $id)
		;
 

		$response = $response->first();

		return $this->respond($response, 200);
	}

	public function get_tipo_examen()
	{		
		$data_request = $this->request->getGet();
 
		$response = $this->Tipo_examen_detalle_m->select('tipo_examen_detalle.*')
		->select('id as id_tipo')
		->where('id_tipo_servicio', $data_request["id"])->findAll();
		 


		return $this->respond( $response , 200);
	}
	public function get_columnas()
	{		
		$data_request = $this->request->getGet();
 
		$response = $this->Tipo_examen_columnas_m->select('tipo_examen_columnas.*')
		->where('id_tipo_servicio', $data_request["id"])->findAll();
		 


		return $this->respond( $response , 200);
	}



	
	public function index()
	{		
		$response = $this->Tipo_servicio_m->select('tipo_servicio.*')
		->select('coalesce(um.nombre, "") as unidad_medida')
		->join('con_unidad_medida um', 'um.id = tipo_servicio.id_unidad_medida', 'left')
		->where('tipo_servicio.id_empresa', ID_EMPRESA)		
		
		->findAll();

		foreach ($response as $row) {
			$row->detalle = $this->Tipo_examen_detalle_m->where('id_tipo_servicio', $row->id)->findAll();

			$row->columnas = $this->Tipo_examen_columnas_m->select('tipo_examen_columnas.*')
		->where('id_tipo_servicio', $row->id)->findAll();
		}


		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-tipo_servicio', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-tipo_servicio', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			// QUITAR DEFAULT
			$db->table('tipo_servicio')
			->set('fl_default', 'NULL', FALSE)
			->where('id_empresa', ID_EMPRESA)
			->update();

			/** GUARDAR */
			$data = [
				'nombre'               		=> isset($data_request["nombre"]) ? trim($data_request["nombre"]) :null ,
				'tipo'               		=>isset($data_request["tipo"]) ? trim($data_request["tipo"]) :null ,  
				'costo'               		=> isset($data_request["costo"]) ? trim($data_request["costo"]) :null ,   
				'fl_default'				=> (isset($data_request["fl_default"])) ? 1 : 0,
				'valor_referencial'			=>isset($data_request["valor_referencial"]) ? trim($data_request["valor_referencial"]) :null, 
				'id_unidad_medida'			=>isset($data_request["id_unidad_medida"]) ? trim($data_request["id_unidad_medida"]) :null, 
				'tipo_examen'              => isset($data_request["tipo_examen"]) ? trim($data_request["tipo_examen"]) :null, 
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}
			$this->Tipo_servicio_m->save($data);

			$id_tipo_servicio = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();
			

			if ($data_request["tipo_examen"] == 'HEMOGRAMA' OR  $data_request["tipo_examen"] == 'GRUPO EXAMEN') {
				# code...
				$this->Helper->eliminar_registros_detalle('tipo_examen_detalle', 'id_tipo_servicio', $id_tipo_servicio, json_decode($data_request["detalle_tipo"]));

				foreach (json_decode($data_request["detalle_tipo"]) as $row) {

					$detalle_tipo  = [
						'id_tipo_servicio'		=> $id_tipo_servicio,
						'examen'	 			=> $row->examen,
						'id_unidad'	 			=> $row->id_unidad,
						'valor_referencial'	 	=> $row->valor_referencial,
						'fl_ecelular'	 		=> $row->fl_ecelular,
						
					];

					
					if(is_numeric($row->id))
					{
						$detalle_tipo["id"] = $row->id;
					}


					$this->Tipo_examen_detalle_m->save($detalle_tipo);
				}
	

			}
			

			if ($data_request["tipo_examen"] == 'INMUNOSEROLOGÍA') {
				
				$this->Tipo_examen_columnas_m->where('id_tipo_servicio', $id_tipo_servicio)->delete();

			/* 	$data_insert = array(); */
				
				foreach (json_decode($data_request["columnas"]) as $row) {
				 
						$data_insert  = [

							'nombre'            => $row->nombre,
							'fl_estado'			=>1,
							'id_empresa'    	=> ID_EMPRESA,
							'id_tipo_servicio'	=> $id_tipo_servicio,

						];
						 
							
						 
						$this->Tipo_examen_columnas_m->save($data_insert);
				}
	
			 

			}

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'TIPO DE SERVICIO',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"])
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
	

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-tipo_servicio', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$tipo_servicio = $this->Tipo_servicio_m->find($data_request["id"]);

			$this->Tipo_servicio_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'TIPO DE SERVICIO',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $tipo_servicio->nombre
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
