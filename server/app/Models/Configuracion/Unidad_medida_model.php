<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Unidad_medida_model extends Model
{
  protected $table      = 'con_unidad_medida';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre', 
    'codigo_sunat', 
    'id_empresa', 
    'id_membresia'
  ];

}
