<?php namespace App\Controllers\Tesoreria;

use App\Controllers\BaseController;

use App\Models\Tesoreria\Control_ingreso_egreso_model;


class Control_ingreso_egreso extends BaseController
{
	public function __construct()
	{
		$this->Control_ingreso_egreso_m = new Control_ingreso_egreso_model();
	}
	

	public function index()
	{		
		$response = $this->Control_ingreso_egreso_m->where('id_empresa', ID_EMPRESA)->findAll();

        return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('tesoreria-control_ingreso_egreso', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();
					
			/** GUARDAR */
			$data = [
				'movimiento'						=> $data_request["movimiento"],
				'tipo'								=> $data_request["tipo"],	
				'concepto'							=> $data_request["concepto"],		
				'monto'								=> $data_request["monto"],
				'fecha_sistema'						=> date("Y-m-d H:i:s"),
				'modalidad_pago'					=> trim($data_request["modalidad_pago"]),
				'id_cuenta_bancaria_empresa'		=> (isset($data_request["id_cuenta_bancaria_empresa"])) ? trim($data_request["id_cuenta_bancaria_empresa"]): null,
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

			$this->Control_ingreso_egreso_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'CONTROL DE INGRESO Y EGRESO',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> $data_request["movimiento"].':'.$data_request["tipo"].':S/. '.$data_request["monto"]
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
		$this->Helper->validar_permisos('tesoreria-control_ingreso_egreso', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$control = $this->Control_ingreso_egreso_m->find($data_request["id"]);

			$this->Control_ingreso_egreso_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'CONTROL DE INGRESO Y EGRESO',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $control->movimiento.':'.$control->tipo.':S/. '.$control->monto
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
