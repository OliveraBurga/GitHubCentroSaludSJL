<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Forma_pago_model;

class Forma_pago extends BaseController
{
	public function __construct()
	{
		$this->Forma_pago_m = new Forma_pago_model();
	}

	public function get_select()
	{
		$response = $this->Forma_pago_m->select("id, nombre as text, fl_numero_operacion")
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Forma_pago_m->where('id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-forma_pago', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-forma_pago', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'nombre'               => trim($data_request["nombre"]),
				'fl_numero_operacion'  => (isset($data_request["fl_numero_operacion"])) ? 1 : 0,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'MODALIDAD DE PAGO',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$this->Forma_pago_m->save($data);
			
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
		$this->Helper->validar_permisos('configuracion-forma_pago', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$forma_pago = $this->Forma_pago_m->find($data_request["id"]);

			$this->Forma_pago_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'MODALIDAD DE PAGO',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $forma_pago->nombre
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
