<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Vacuna_model extends Model
{
  protected $table      = 'vacuna';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_empresa', 
    'tipo', 
    'nombre', 
    'dosis', 
    'desde', 
    'hasta', 
    
  ];
}
