<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Lugar_model extends Model
{
  protected $table      = 'lugar';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre', 
    'id_local', 
    'id_empresa', 
    'direccion',
    'id_ubigeo'
  ];
}
