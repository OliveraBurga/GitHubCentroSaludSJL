<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Plan_atencion_model extends Model
{
  protected $table      = 'plan_atencion';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_atencion', 'serie', 'numero', 'id_paciente', 'id_usuario',
     'id_empresa', 'id_local', 'fl_estado', 'fecha',
      'antecedente', 'motivo', 'examen_fisico', 'tratamiento', 'plan', 'observacion','fecha_sistema',
      'observacion_anatomia_patologica',
      'observacion_diagnostico_imagenes',
'observacion_intervencion_quirurjica',
  ];

  public function get_correlativo()
  {
    $serie = date("Y");
    
    $Plan_atencion_m = new Plan_atencion_model();

    $response = $Plan_atencion_m->select('COALESCE(MAX(CAST(numero AS UNSIGNED)), 0) as numero')
    ->where('serie', $serie)
    ->where('id_empresa', ID_EMPRESA)
    ->first();

    $response->serie = $serie;
    $response->numero = str_pad(($response->numero + 1),  8, "0", STR_PAD_LEFT);

    return $response;
  }
}
