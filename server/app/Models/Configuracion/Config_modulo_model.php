<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Config_modulo_model extends Model
{
  protected $table      = 'config_modulo';
  protected $primaryKey = 'id_empresa';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_empresa', 
   
  ];
}
