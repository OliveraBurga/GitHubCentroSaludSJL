<?php namespace App\Controllers\Tesoreria\Reporte;

use App\Controllers\BaseController;

use App\Models\Tesoreria\Caja_chica_model;

class Caja_chica extends BaseController
{
	public function __construct()
	{
		$this->Caja_chica_m = new Caja_chica_model();
	}

	public function index()
	{
		$data_request = $this->request->getGet();

		$response = $this->Caja_chica_m->select('caja_chica.*')
		->select('u.nombre as usuario')
		->select('l.nombre as local')

		->join('usuario u', 'u.id = caja_chica.id_usuario')
		->join('local l', 'l.id = caja_chica.id_local')

		->where('DATE_FORMAT(caja_chica.fecha_apertura, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(caja_chica.fecha_apertura, "%Y-%m-%d") <=', $data_request["fecha_fin"]);

		if($data_request["id_local"] != '')
		{
			$response->where('caja_chica.id_local', $data_request["id_local"]);
		}

		if($data_request["id_usuario"] != '')
		{
			$response->where('caja_chica.id_usuario', $data_request["id_usuario"]);
		}
			
		$response = $response->where('caja_chica.id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public function recalcular($id_caja_chica)
	{

		$this->Caja_chica_m->calcular_totales($id_caja_chica);

		$response = [
			'mensaje'	=> 'Recalculo completado',
			'tipo'		=> 'success'
		];

		return $this->respond($response, 200);
	}
		
}
