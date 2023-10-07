<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Detalle_atencion_diagnostigo_config_model extends Model
{
  protected $table      = 'detalle_atencion_diagnostigo_config';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_diagnostico',
    'tipo',
    'id_plan_atencion', 
    
  ];
 
}
