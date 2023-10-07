<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Patologia_clinica_model extends Model
{
  protected $table      = 'patologia_clinica';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_analisis', 
    'id_plan_atencion', 
    
  ];
 
}
