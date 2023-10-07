<?php namespace App\Controllers\Publico;

use CodeIgniter\API\ResponseTrait;

use CodeIgniter\Controller;

class atencion extends Controller
{
	use ResponseTrait;

    public function get_atencion_ejecucion()
    {
        $db = \Config\Database::connect();
        $resposne  = $db->table('atencion')
        ->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
 
        ->select('p.nombre_completo as paciente')
        ->select('pe.nombre_completo as personal')
        ->select('s.nombre as servicio')
    
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->where('atencion.fl_estado', 1)  
        ->where('atencion.id_triaje', null)  
        ->get()->getResult();
        return $this->respond($resposne, 200);
    }

    public function get_plan_atencion_ejecucion()
    {
        $db = \Config\Database::connect();
        $resposne  = $db->table('atencion')
        ->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
 
        ->select('p.nombre_completo as paciente')
        ->select('pe.nombre_completo as personal')
        ->select('s.nombre as servicio')
    
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->where("atencion.id_plan_atencion", null)		 
			->where('atencion.fl_estado', 2) 
        ->get()->getResult();
        return $this->respond($resposne, 200);
    }

    

}
