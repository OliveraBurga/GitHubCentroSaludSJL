<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Diagnostico_config_model extends Model
{
  protected $table      = 'diagnostico_config';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'tipo',
    'nombre',
    'id_empresa'
  ];

}
