<?php namespace App\Controllers\Documento;

use App\Controllers\BaseController;

use App\Models\Documento\Documento_personal_model;
use App\Models\Configuracion\Personal_model;
use App\Models\Upload_model;

class Documento_personal extends BaseController
{
	public function __construct()
	{
		$this->Documento_personal_m = new Documento_personal_model();
		$this->Personal_m = new Personal_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Documento_personal_m->select("id, concat(nombre,' ',apellido) as text");

		$response = $response->where('id_empresa', ID_EMPRESA)
		->findAll();
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Documento_personal_m->select('documento_personal.*')
		->select('p.nombre_completo as personal')
		->select('td.nombre as tipo_documento')
		->join('personal p', 'p.id = documento_personal.id_personal', 'left')
		->join('tipo_documento td', 'td.id = documento_personal.id_tipo_documento', 'left')
		->where('documento_personal.id_empresa', ID_EMPRESA);

		if($data_request["id_personal"] != '')
		{
			$response->where('documento_personal.id_personal', $data_request["id_personal"]);
		}

		$response = $response->findAll();

        return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('documento-documento_personal', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('documento-documento_personal', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/* GUARDAR ARCHIVO */
			$Upload_m = new Upload_model();			
			$archivo = $Upload_m->guardar($this->request->getFile('archivo'), 'documento_personal', (isset($data_request["archivo_anterior"])) ? $data_request["archivo_anterior"] : null);
					
			/** GUARDAR */
			$data = [
				'id_personal'         	=> trim($data_request["id_personal"]),
				'id_tipo_documento'   	=> trim($data_request["id_tipo_documento"]),
				'documento'        		=> trim($data_request["documento"]),
				'fecha_emision'       	=> trim($data_request["fecha_emision"]),
				'fecha_vencimiento'   	=> (isset($data_request["fecha_vencimiento"])) ? $data_request["fecha_vencimiento"] : null,     
				'archivo'				=> $archivo,
				'fl_no_caduca'   		=> (isset($data_request["fl_no_caduca"])) ? 1 : 0,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Documento_personal_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$personal = $this->Personal_m->find($data_request["id_personal"]);

			$data_centinela = [
				'modulo'		=> 'DOCUMENTOS',
				'menu'			=> 'PERSONAL',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["documento"]).' - '.$personal->nombre_completo
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
		$this->Helper->validar_permisos('documento-documento_personal', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$documento_personal = $this->Documento_personal_m->find($data_request["id"]);

			$this->Documento_personal_m->where('id', $data_request["id"])
			->delete();
			
			/** ELIMINAR IMAGEN */
			$Upload_m = new Upload_model();
			$Upload_m->eliminar($documento_personal->archivo);

			/****************** SAVE CENTINELA *****************/
			$personal = $this->Personal_m->find($documento_personal->id_personal);

			$data_centinela = [
				'modulo'		=> 'DOCUMENTOS',
				'menu'			=> 'PERSONAL',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $documento_personal->documento.' - '.$personal->nombre_completo
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
