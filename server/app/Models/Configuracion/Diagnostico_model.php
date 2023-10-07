<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Diagnostico_model extends Model
{
  protected $table      = 'diagnostico';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'codigo',
    'enfermedad',
    'id_empresa'
  ];

}
