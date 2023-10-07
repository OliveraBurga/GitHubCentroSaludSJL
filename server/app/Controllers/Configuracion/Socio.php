<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Socio_model;
use App\Models\Configuracion\Cuenta_bancaria_persona_model;
use App\Models\Image_model;

class Socio extends BaseController
{
	public function __construct()
	{
		$this->Socio_m = new Socio_model();
 
		$this->Cuenta_bancaria_persona_m = new Cuenta_bancaria_persona_model();
	}

	public function get_correlativo()
	{
		$secuencia = $this->Socio_m->get_correlativo();

		return $this->respond($secuencia, 200);
	}


	public function buscar()
	{
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->select('paciente.*')
		->select("coalesce(concat(u.id, ' - ', u.departamento, ' - ', u.provincia, ' - ', u.distrito), '') as ubigeo")
		->select('d.nombre as documento')
		->join('static_ubigeo u', 'u.id = paciente.id_ubigeo', 'left')
		->join('static_documento d', 'd.id = paciente.id_documento', 'left');

		if(isset($data_request["numero"]))
		{
			$response->where('paciente.numero_documento', $data_request["numero"]);
		}

		if(isset($data_request["id_socio"]))
		{
			$response->where('paciente.id', $data_request["id_socio"]);
		}
		
		$response = $response->where('id_empresa', ID_EMPRESA)
		->first();

		if(!is_object($response))
		{
			return $this->respond(null, 200);
		}

		$response->cuentas_bancarias = $this->Cuenta_bancaria_persona_m->where('id_socio', $response->id)->findAll();	
 
		return $this->respond($response, 200);
	}
 

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->select("id, nombre_completo as text")
		->where("(numero_documento like '".$data_request["buscar"]."' or nombre_completo like '%".$data_request["buscar"]."%')")
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function get_select_simple()
	{
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->select("id, razon_social as text")
		->where('id_empresa', ID_EMPRESA);

		if(isset($data_request["fl_cliente"]))
		{
			$response->where('fl_cliente', 1);
		}

		if(isset($data_request["fl_proveedor"]))
		{
			$response->where('fl_proveedor', 1);
		}

		$response = $response->findAll();

		return $this->respond($response, 200);
	}

	public function get_select_factura_pendiente()
	{
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->distinct('f.id_cliente')
		->select('f.id_cliente, f.cliente_razon_social as text')
		->join('factura f', 'f.id_cliente = paciente.id', 'left')
		->where('f.fl_pagado', null)
		->where('f.estado !=','ANULADO')
		->where('DATE_FORMAT(f.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
		->where('DATE_FORMAT(f.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('f.condicion_pago', $data_request["condicion_pago"])
		->where('f.id_empresa', ID_EMPRESA)	
		
		->findAll();

		return $this->respond($response, 200);
	}


 
	public function get_unique($id_socio)
	{		
		$response = $this->Socio_m->select('paciente.*')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		->join('static_ubigeo u', 'u.id = paciente.id_ubigeo', 'left')
		->where('paciente.id', $id_socio)
		->where('id_empresa', ID_EMPRESA)		
		->first();

        return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->select('paciente.*')
		->select("coalesce(concat(u.id, ' - ', u.departamento, ' - ', u.provincia, ' - ', u.distrito), '') as ubigeo")
		->select('d.nombre as documento')
		->join('static_ubigeo u', 'u.id = paciente.id_ubigeo', 'left')
		->join('static_documento d', 'd.id = paciente.id_documento', 'left')
		->orderBy('id','desc')
		->where('id_empresa', ID_EMPRESA)
		->findAll();
 

        return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-socio', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-socio', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR IMAGEN */
			$Imagen_upload = new Image_model();			
			$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'paciente', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
					
			/** GUARDAR */
			$data_socio = [
				'imagen'          			=> $imagen,
				'id_documento'              => trim($data_request["id_documento"]),
				'numero_documento'          => trim($data_request["numero_documento"]),
				'razon_social'              => trim($data_request["razon_social"]),
				'id_ubigeo'                 => (isset($data_request["id_ubigeo"])) ? trim($data_request["id_ubigeo"]) : null,
				'direccion'                 => trim($data_request["direccion"]),
				'telefono'                  => trim($data_request["telefono"]),
				'historia_clinica'          => trim($data_request["historia_clinica"]),
				'persona_encargado'         => trim($data_request["persona_encargado"]),
				'email'         			=> trim($data_request["email"]),
				'apellido'         			=> trim($data_request["apellido"]),
				'nombre'         			=> trim($data_request["nombre"]),
				'sexo'         				=> (isset($data_request["sexo"])) ? trim($data_request["sexo"]) : null,
				'fecha_nacimiento'         	=> trim($data_request["fecha_nacimiento"]),
				'nombre_completo'         	=> trim($data_request["nombre"]).' '.trim($data_request["apellido"]),

				'nombre_papa'         			=> trim($data_request["nombre_papa"]),
				'nombre_mama'         			=> trim($data_request["nombre_mama"]),

			];

			if(isset($data_request["id"]))
			{
				$data_socio["id"] = $data_request["id"];
			}
			else
			{
				$data_socio["id_empresa"] = ID_EMPRESA;
				$data_socio["fl_estado"] = 1;

			}

		 

			$this->Socio_m->save($data_socio);

			$id_socio = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();
 
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'PACIENTES',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"]).' '.trim($data_request["apellido"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			$data_socio["id_socio"] = $id_socio;
			
			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'paciente' => $data_socio], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-socio', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$socio = $this->Socio_m->find($data_request["id"]);

			$this->Cuenta_bancaria_persona_m->where('id_socio', $data_request["id"])->delete();
			$this->Socio_m->where('id', $data_request["id"])
			->delete();
			
			/** ELIMINAR IMAGEN */
			$Imagen_upload = new Image_model();
			$Imagen_upload->eliminar($socio->imagen);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'PACIENTES',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> 	$socio->nombre_completo
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
