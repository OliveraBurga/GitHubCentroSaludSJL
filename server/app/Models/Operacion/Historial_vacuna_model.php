<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Historial_vacuna_model extends Model
{
  protected $table      = 'historial_vacuna';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_atencion', 
    'id_paciente', 
    'id_vacuna',
    'fecha',



    
  ];
 
}
