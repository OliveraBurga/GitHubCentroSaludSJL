<?php namespace App\Controllers\Tesoreria\Reporte;

use App\Controllers\BaseController;

use App\Models\Tesoreria\Caja_model;

class Flujo_caja extends BaseController
{
	public function __construct()
	{
		$this->Caja_m = new Caja_model();
	}

	public function index()
	{
		$data_request = $this->request->getGet();

		$response = $this->Caja_m->select('caja.*')
		->select('u.nombre as usuario')
		->select('l.nombre as local')
	 
		->join('usuario u', 'u.id = caja.id_usuario', 'left')
		->join('local l', 'l.id = caja.id_local', 'left')
	 
	 

		->where('DATE_FORMAT(caja.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(caja.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('caja.fl_estado', 3);

		if($data_request["id_local"] != '')
		{
			$response->where('caja.id_local', $data_request["id_local"]);
		}

		if($data_request["id_usuario"] != '')
		{
			$response->where('caja.id_usuario', $data_request["id_usuario"]);
		}

		if($data_request["medio_pago"] != '')
		{
			$response->where('caja.modalidad', $data_request["medio_pago"]);
		}
			
		$response = $response->where('caja.id_empresa', ID_EMPRESA)
		->orderBy('caja.id', 'asc')
		->findAll();

		return $this->respond(['data' => $response], 200);
	}
		
}
