<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Diagnostico_config_model;

class Diagnostico_config extends BaseController
{
	public function __construct()
	{
		$this->Diagnostico_config_m = new Diagnostico_config_model();
	}

	public function get_select($tipo )
	{
		$data_request = $this->request->getGet();

		$response = $this->Diagnostico_config_m->select("id,nombre as text")
		->where('id_empresa', ID_EMPRESA)
		->where('tipo', $tipo )
        
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Diagnostico_config_m->where('id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-diagnostico_config', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-diagnostico_config', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'tipo'               		=> trim($data_request["tipo"]),
				'nombre'				=> trim($data_request["nombre"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}
			$this->Diagnostico_config_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'DIAGNÓSTICO CONFIG',
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
		$this->Helper->validar_permisos('configuracion-diagnostico_config', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$diagnostico = $this->Diagnostico_config_m->find($data_request["id"]);

			$this->Diagnostico_config_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'DIAGNÓSTICO',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $diagnostico->enfermedad
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
