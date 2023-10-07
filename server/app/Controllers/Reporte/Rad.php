<?php namespace App\Controllers\Reporte;

use App\Controllers\BaseController;

 

use App\Models\Configuracion\Empresa_model;


use App\Models\Operacion\Atencion_model;
use App\Models\Operacion\Atencion_detalle_model;

class Rad extends BaseController
{
	public function __construct()
	{
		$this->Atencion_m = new Atencion_model();
		$this->Atencion_detalle_m = new Atencion_detalle_model();



        $this->Empresa_m = new Empresa_model();
  
	}


	public function index()
	{		

        $data_request = $this->request->getGet();


      	$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
 
        ->select('p.nombre_completo as paciente')
        ->select('pe.nombre_completo as personal')
        ->select('s.nombre as servicio')
        ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')

		->where('DATE_FORMAT(atencion.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(atencion.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('atencion.id_empresa', ID_EMPRESA);

			
		
		
	
		if ($data_request["id_paciente"] != null && $data_request["id_paciente"] != '' ) {

			$response ->where('atencion.id_paciente',$data_request["id_paciente"]);
		}

        $response = $response->findAll();


			foreach ($response as $row) {
				
				$row->detalle_importes = $this->Atencion_detalle_m->where('id_atencion', $row->id)->findAll();


			}
		 

		return $this->respond(['data' => $response], 200);
	}

	

}
