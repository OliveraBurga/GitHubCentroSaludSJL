<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Plan_atencion_diagnostico_model extends Model
{
  protected $table      = 'plan_atencion_diagnostico';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_diagnostico',
    'tipo',
    'id_plan_atencion', 
    
  ];
 
}
