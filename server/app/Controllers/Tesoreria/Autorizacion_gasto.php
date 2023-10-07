<?php namespace App\Controllers\Tesoreria;

use App\Controllers\BaseController;

use App\Models\Tesoreria\Caja_model;
 

class Autorizacion_gasto extends BaseController
{
	public function __construct()
	{
		$this->Caja_m = new Caja_model();
		 
	}
	

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Caja_m->select('caja.*, concat(caja.serie, "-", caja.numero) as caja')
		->select('u.nombre as usuario')
		->select('concat(v.serie, "-", v.numero) as atencion')
		->select('m.simbolo as simbolo_moneda')
		->join('atencion v', 'v.id = caja.id_atencion', 'left')
		->join('usuario u', 'u.id = caja.id_usuario', 'left')
		->join('static_moneda m', 'm.id = caja.id_moneda', 'left' )

		->where('caja.fl_estado', 1)		
		->where('caja.id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public function autorizado()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('tesoreria-autorizacion_gasto', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id'						=> $data_request["id"],
				'comentario_autorizacion'	=> $data_request["comentario"],
				'fl_estado'					=> 3
			];

			$this->Caja_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$caja = $this->Caja_m->find($data_request["id"]);

			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'AUTORIZACION DE GASTOS',
				'accion'		=> 'AUTORIZAR',
				'descripcion'	=> $caja->serie.'-'.$caja->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function denegado()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('tesoreria-autorizacion_gasto', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id'						=> $data_request["id"],
				'comentario_autorizacion'	=> $data_request["comentario"],
				'fl_estado'					=> 0
			];

			$this->Caja_m->save($data);

		 
			/****************** SAVE CENTINELA *****************/
			$caja = $this->Caja_m->find($data_request["id"]);

			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'AUTORIZACION DE GASTOS',
				'accion'		=> 'DENEGAR',
				'descripcion'	=> $caja->serie.'-'.$caja->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		
}
