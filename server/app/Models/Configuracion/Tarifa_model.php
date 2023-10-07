<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Tarifa_model extends Model
{
  protected $table      = 'tarifa';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_servicio',
    'id_paciente',
    'precio',
    'tipo_tarifa',
    'id_empresa', 
    'id_usuario', 
    'precio_convenio'
  ];
}
