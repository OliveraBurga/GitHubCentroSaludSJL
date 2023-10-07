<?php namespace App\Controllers\Documento;

use App\Controllers\BaseController;

use App\Models\Documento\Documento_vehiculo_model;
use App\Models\Configuracion\Vehiculo_model;
use App\Models\Upload_model;

class Documento_vehiculo extends BaseController
{
	public function __construct()
	{
		$this->Documento_vehiculo_m = new Documento_vehiculo_model();
		$this->Vehiculo_m = new Vehiculo_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Documento_vehiculo_m->select("id, concat(nombre,' ',apellido) as text");

		$response = $response->where('id_empresa', ID_EMPRESA)
		->findAll();
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Documento_vehiculo_m->select('documento_vehiculo.*')
		->select('v.placa as vehiculo')
		->select('td.nombre as tipo_documento')
		->join('vehiculo v', 'v.id = documento_vehiculo.id_vehiculo', 'left')
		->join('tipo_documento td', 'td.id = documento_vehiculo.id_tipo_documento', 'left')
		->where('documento_vehiculo.id_empresa', ID_EMPRESA)		
		->findAll();

        return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('documento-documento_vehiculo', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('documento-documento_vehiculo', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/* GUARDAR ARCHIVO */
			$Upload_m = new Upload_model();			
			$archivo = $Upload_m->guardar($this->request->getFile('archivo'), 'documento_vehiculo', (isset($data_request["archivo_anterior"])) ? $data_request["archivo_anterior"] : null);
					
			/** GUARDAR */
			$data = [
				'id_vehiculo'         	=> trim($data_request["id_vehiculo"]),
				'id_tipo_documento'   	=> trim($data_request["id_tipo_documento"]),
				'documento'        		=> trim($data_request["documento"]),
				'fecha_emision'       	=> trim($data_request["fecha_emision"]),
				'fecha_vencimiento'   	=> trim($data_request["fecha_vencimiento"]),        
				'costo'   				=> trim($data_request["costo"]),        
				'archivo'				=> $archivo
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Documento_vehiculo_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$vehiculo = $this->Vehiculo_m->find($data_request["id_vehiculo"]);

			$data_centinela = [
				'modulo'		=> 'DOCUMENTOS',
				'menu'			=> 'VEHÍCULOS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["documento"]).' - '.$vehiculo->placa
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
		$this->Helper->validar_permisos('documento-documento_vehiculo', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$documento_vehiculo = $this->Documento_vehiculo_m->find($data_request["id"]);

			$this->Documento_vehiculo_m->where('id', $data_request["id"])
			->delete();
			
			/** ELIMINAR IMAGEN */
			$Upload_m = new Upload_model();
			$Upload_m->eliminar($documento_vehiculo->archivo);

			/****************** SAVE CENTINELA *****************/
			$vehiculo = $this->Vehiculo_m->find($documento_vehiculo->id_vehiculo);

			$data_centinela = [
				'modulo'		=> 'DOCUMENTOS',
				'menu'			=> 'VEHÍCULOS',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $documento_vehiculo->documento.' - '.$vehiculo->placa
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
