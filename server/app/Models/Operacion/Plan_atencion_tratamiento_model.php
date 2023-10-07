<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Plan_atencion_tratamiento_model extends Model
{
  protected $table      = 'plan_atencion_tratamiento';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'medicamento',
    'presentacion',
    'dosis',

    'duracion',
    'cantidad',
 
  ];
 
}
