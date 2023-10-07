<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Lugar_model;

class Lugar extends BaseController
{
	public function __construct()
	{
		$this->Lugar_m = new Lugar_model();
	}

	public function get_select_origen()
	{
		$data_request = $this->request->getGet();

		$response = $this->Lugar_m->select("id, nombre as text")
		->where('id_empresa', ID_EMPRESA)
		->where('id_local', ID_LOCAL)
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function get_select_destino()
	{
		$data_request = $this->request->getGet();

		$response = $this->Lugar_m->select("id, nombre as text")
		->where('id_empresa', ID_EMPRESA)
		->where('id_local !=', ID_LOCAL)
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Lugar_m->select("id, nombre as text")
		->where('id_empresa', ID_EMPRESA)
		->findAll();
		
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Lugar_m->select('lugar.*')
		->select('coalesce(l.descripcion, "-") as local')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		

		->join('local l', 'l.id = lugar.id_local', 'left')
		->join('static_ubigeo u', 'u.id = lugar.id_ubigeo', 'left')

		->where('lugar.id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond(['data' => $response], 200);
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

			/** GUARDAR */
			$data = [
				'nombre'       => trim($data_request["nombre"]),
				'direccion'    => trim($data_request["direccion"]),
				'id_ubigeo'						=> (isset($data_request["id_ubigeo"])) ? $data_request["id_ubigeo"] : null,
				'id_local'     => trim($data_request["id_local"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Lugar_m->save($data);

			$id_lugar = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'DESTINOS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=>  trim($data_request["nombre"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'id_lugar' => $id_lugar], 200);

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

			$lugar = $this->Lugar_m->find($data_request["id"]);

			$this->Lugar_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'DESTINOS',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $lugar->nombre
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
