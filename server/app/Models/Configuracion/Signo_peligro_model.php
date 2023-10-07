<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Signo_peligro_model extends Model
{
  protected $table      = 'signo_peligro';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'signo',
    'id_empresa',
    'fl_todos',
    'edad_minimo',
    'edad_maximo',


  ];
}
