<?php namespace App\Controllers\Reporte;

use App\Controllers\BaseController;

use App\Models\Configuracion\Diagnostico_model;
use App\Models\Operacion\Plan_atencion_diagnostico_model;

class Diagnostico extends BaseController
{
	public function __construct()
	{
		$this->Diagnostico_m = new Diagnostico_model();
        $this->Plan_atencion_diagnostico_m = new Plan_atencion_diagnostico_model();
	}


	public function index()
	{		

        $data_request = $this->request->getGet();

		$response = $this->Diagnostico_m	
        ->select('concat(atencion.serie, "-", atencion.numero) as atencion,p.fecha,diagnostico.enfermedad,codigo')
        ->select('pa.nombre_completo as paciente, pa.numero_documento')
        ->select('pe.nombre_completo as personal')
        ->select('s.nombre as servicio')

        ->join('plan_atencion_diagnostico pl', 'pl.id_diagnostico = diagnostico.id')
        ->join('plan_atencion p', 'p.id = pl.id_plan_atencion')
        ->join('atencion', 'atencion.id = p.id_atencion')
        ->join('paciente pa', 'pa.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->where('diagnostico.id_empresa', ID_EMPRESA)
        ->where('DATE_FORMAT(p.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(p.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"]);
        

		if ($data_request["id_paciente"] != null && $data_request["id_paciente"] != '' ) {

			$response ->where('atencion.id_paciente',$data_request["id_paciente"]);
		}

        if ($data_request["id_diagnostico"] != null && $data_request["id_diagnostico"] != '' ) {

			$response ->where('pl.id_diagnostico',$data_request["id_diagnostico"]);
		}

        
        $response =$response  ->findAll();




		return $this->respond(['data' => $response], 200);
	}

	

}
