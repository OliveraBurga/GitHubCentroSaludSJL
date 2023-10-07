<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Triaje_signo_peligro_model extends Model
{
  protected $table      = 'triaje_signo_peligro';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_triaje',
    'signo',
    'fl_estado',

    'tipo',
 
 
  ];
 
}
