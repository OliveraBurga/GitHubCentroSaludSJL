<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Tarifa_detalle_model extends Model
{
  protected $table      = 'tarifa_detalle';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_tarifa', 
    'tipo', 
    'id_empresa',
    'precio_minimo',
    'precio_maximo',
    'precio',
  ];
}
