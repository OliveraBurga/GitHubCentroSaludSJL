<?php namespace App\Controllers\Reporte;

use App\Controllers\BaseController;

 
use App\Models\Operacion\Plan_atencion_model;
use App\Models\Operacion\Triaje_model;
use App\Models\Operacion\Plan_atencion_diagnostico_model;
use App\Models\Operacion\Plan_atencion_receta_model;
use App\Models\Operacion\Triaje_signo_peligro_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Operacion\Plan_atencion_tratamiento_model;
use App\Models\Operacion\Patologia_clinica_model;
use App\Models\Operacion\Detalle_atencion_diagnostigo_config_model;

class Historia extends BaseController
{
	public function __construct()
	{
        $this->Plan_atencion_m = new Plan_atencion_model();
        $this->Triaje_m = new Triaje_model();
		$this->Plan_atencion_diagnostico_m = new Plan_atencion_diagnostico_model();
        $this->Plan_atencion_receta_m = new Plan_atencion_receta_model();
        $this->Triaje_signo_peligro_m = new Triaje_signo_peligro_model();
        $this->Plan_atencion_tratamiento_m = new Plan_atencion_tratamiento_model();
		$this->Patologia_clinica_m = new Patologia_clinica_model();
        $this->Empresa_m = new Empresa_model();
        $this->Detalle_atencion_diagnostigo_config_m = new Detalle_atencion_diagnostigo_config_model();
	}


	public function index()
	{		

        $data_request = $this->request->getGet();
        $response = $this->Plan_atencion_m->select('plan_atencion.*, concat(plan_atencion.serie, "-", plan_atencion.numero) as plan_atencion')
        ->select('concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion, atencion.id_triaje,atencion.id_paciente')
        ->select('p.nombre_completo as paciente,p.numero_documento as dni ,p.email, p.direccion,p.fecha_nacimiento,p.sexo,p.historia_clinica, p.nombre as nombre_paciente ,  p.apellido as apellido_paciente, p.fecha_nacimiento, TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) as edad, p.telefono, p.numero_documento')
        ->select('pe.nombre_completo as personal,pe.imagen_firma')
        ->select('s.nombre as servicio')
        ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
        ->select('concat(tri.serie," - ",tri.numero)  as numero_triaje,
        
        tri.peso,tri.talla,tri.presion_arterial,tri.temperatura,tri.frecuencia_respiratoria,tri.frecuencia_cardiaca,
        tri.saturacion')
        ->join('atencion', 'atencion.id = plan_atencion.id_atencion', 'left')
        ->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
        ->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
        ->where('DATE_FORMAT(plan_atencion.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(plan_atencion.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"]);
        

		if ($data_request["id_paciente"] != null && $data_request["id_paciente"] != '' ) {

			$response ->where('atencion.id_paciente',$data_request["id_paciente"]);
		}

        $response = $response->findAll();

        foreach ($response as $row) {

            $row->triaje = $this->Triaje_m->where('id', $row->id_triaje)->first();
            $row->diagnostico = $this->Plan_atencion_diagnostico_m->select('plan_atencion_diagnostico.*')
            ->select('di.enfermedad')
            ->join('diagnostico di', 'di.id = plan_atencion_diagnostico.id_diagnostico', 'left')
            ->where('id_plan_atencion', $row->id)
            ->findAll();
            $row->receta = $this->Plan_atencion_receta_m->select('plan_atencion_receta.*')
            ->select('coalesce(um.nombre, "") as unidad_medida')
            ->join('con_unidad_medida um', 'um.id = plan_atencion_receta.id_unidad', 'left')
            
            ->where('id_plan_atencion', $row->id)->findAll();

            $row->signo_peligro = $this->Triaje_signo_peligro_m->where('id_triaje', $row->id_triaje)->findAll();
    
            $row->tratamiento = $this->Plan_atencion_tratamiento_m->where('id_plan_atencion', $row->id)->findAll();
            $row->empresa = $this->Empresa_m->find(ID_EMPRESA);

            $row->patologia_clinica = $this->Patologia_clinica_m->select('patologia_clinica.*')
            ->select('t.nombre as servicio')
            ->join('tipo_servicio t','t.id = patologia_clinica.id_analisis')
            ->where('id_plan_atencion', $row->id)
            ->findAll();
         

            $row->diagnostico_config = $this->Detalle_atencion_diagnostigo_config_m
            ->select('detalle_atencion_diagnostigo_config.*')
            ->select('t.nombre')
            ->join('diagnostico_config t','t.id = detalle_atencion_diagnostigo_config.id_diagnostico')
            ->where('id_plan_atencion', $row->id)->findAll();
        }


		return $this->respond(['data' => $response], 200);
	}

	

}
