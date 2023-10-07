<?php namespace App\Controllers\Reporte;

use App\Controllers\BaseController;

 

use App\Models\Configuracion\Empresa_model;

use App\Models\Configuracion\Tipo_servicio_model;
use App\Models\Operacion\Atencion_model;
use App\Models\Operacion\Atencion_detalle_model;

class Tipo_servicio extends BaseController
{
	public function __construct()
	{
		$this->Atencion_m = new Atencion_model();
		$this->Atencion_detalle_m = new Atencion_detalle_model();
		$this->Tipo_servicio_m = new Tipo_servicio_model();


        $this->Empresa_m = new Empresa_model();
  
	}



	public function index()
	{		

        $data_request = $this->request->getGet();

		$response = $this->Tipo_servicio_m	
        ->select('concat(atencion.serie, "-", atencion.numero) as atencion,p.fecha,tipo_servicio.nombre')
        ->select('pa.nombre_completo as paciente, pa.numero_documento')
        ->select('pe.nombre_completo as personal')
   
		->join('atencion', 'atencion.id_servicio = tipo_servicio.id')
        ->join('plan_atencion p', 'p.id_atencion = atencion.id')
     
        ->join('paciente pa', 'pa.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left') 
        ->where('tipo_servicio.id_empresa', ID_EMPRESA)
        ->where('DATE_FORMAT(p.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(p.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"]); 

		if ($data_request["id_paciente"] != null && $data_request["id_paciente"] != '' ) {

			$response ->where('atencion.id_paciente',$data_request["id_paciente"]);
		}

        if ($data_request["id_servicio"] != null && $data_request["id_servicio"] != '' ) {

			$response ->where('atencion.id_servicio',$data_request["id_servicio"]);
		}

        
        $response =$response  ->findAll();




		return $this->respond(['data' => $response], 200);
	}

	

}
