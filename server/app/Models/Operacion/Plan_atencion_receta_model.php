<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Plan_atencion_receta_model extends Model
{
  protected $table      = 'plan_atencion_receta';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'medicamento',
    'presentacion',
    'dosis',
    'duracion',
    'cantidad',
    'id_plan_atencion', 
    'id_unidad',
    'id_plan_atencion', 
    'unidad_tiempo',
    'frecuencia',
    'periodo',
  ];
 
}
