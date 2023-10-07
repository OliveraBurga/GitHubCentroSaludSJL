<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Forma_pago_model extends Model
{
  protected $table      = 'forma_pago';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'id_empresa',
    'fl_numero_operacion'
  ];

}
