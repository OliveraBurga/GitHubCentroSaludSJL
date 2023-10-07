<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Local_model;
 
use App\Models\Configuracion\Lugar_model;

class Local extends BaseController
{
	public function __construct()
	{
		$this->Local_m = new Local_model();
 
		$this->Lugar_m = new Lugar_model();
	}
	

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Local_m->select("id, descripcion as text")
		->where('id_empresa', ID_EMPRESA)
		->findAll();
		return $this->respond($response, 200);
	}

	public function get_unique($id)
	{
		$response = $this->Local_m->find($id);
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Local_m->where('id_empresa', ID_EMPRESA)->findAll();

		 

        return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-local', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();
					
			/** GUARDAR */
			$data = [
				'nombre'							=> $data_request["nombre"],
				'direccion'							=> $data_request["direccion"],				
				'tipo'								=> $data_request["tipo"],
				'descripcion'						=> $data_request["tipo"].' | '.$data_request["nombre"],
				

				'fl_facturacion'					=> isset($data_request["fl_facturacion"]) ? 1 : 0,
				'codigo_sunat'						=> (isset($data_request["codigo_sunat"])) ? $data_request["codigo_sunat"] : null,
				'token_pse'							=> (isset($data_request["token_pse"])) ? $data_request["token_pse"] : null,
				'tipo_afectacion_igv'				=> (isset($data_request["tipo_afectacion_igv"])) ? $data_request["tipo_afectacion_igv"] : null,
				'texto_bottom_factura'				=> (isset($data_request["texto_bottom_factura"])) ? $data_request["texto_bottom_factura"] : null,
				
				'telefono' 							=> $data_request["telefono"],
				'formato_impresion'					=> $data_request["formato_impresion"],
				'limite_maximo_saldo_caja_chica'	=> $data_request["limite_maximo_saldo_caja_chica"],
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Local_m->save($data);

			$id_local = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/****** SAVE SERIES DE FACTURACIÓN */
 
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'LOCALES ANEXOS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $data_request["nombre"]
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */




			/*** CREAR DESTINO AUTOMÁTICO */

			if(!isset($data_request["id"]))
			{
				/** GUARDAR */
				$data_lugar = [
					'nombre'       	=> trim($data_request["nombre"]),
					'direccion'     => trim($data_request["direccion"]),
					'id_local'     	=> $id_local,
					'id_empresa'	=> ID_EMPRESA
				];
				
				$this->Lugar_m->save($data_lugar);
			}




			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function save_estructura_guia_transportista()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-cuadre_guia_transportista', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();
					
			/** GUARDAR */
			$data = [
				'css_estructura_guia_transp'	=> $data_request["css_estructura_guia_transp"],
				'json_estructura_guia_transp'	=> $data_request["estructura_guia_transp"],
				'id'							=> $data_request["id_local"]
			];

			$this->Local_m->save($data);

			$id_local = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'LOCALES ANEXOS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> 'CUADRE GUIA DE TRANSPORTISTA'
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

	public function save_estructura_guia_remitente()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-cuadre_guia_remitente', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();
					
			/** GUARDAR */
			$data = [
				'json_estructura_guia_remitent'	=> $data_request["estructura_guia_remitente"],
				'id'							=> $data_request["id_local"]
			];

			$this->Local_m->save($data);

			$id_local = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'LOCALES ANEXOS',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> 'CUADRE GUIA REMITENTE'
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
		$this->Helper->validar_permisos('configuracion-local', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$local = $this->Local_m->find($data_request["id"]);

			$this->Local_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'LOCALES ANEXOS',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $local->nombre
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
