<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Analisis_detalle_examen_model extends Model
{
  protected $table      = 'analisis_detalle_examen';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_tipo_examen_detalle',
    'examen',
    'resultado',
    'id_atencion_detalle',
 
 
  ];

}
