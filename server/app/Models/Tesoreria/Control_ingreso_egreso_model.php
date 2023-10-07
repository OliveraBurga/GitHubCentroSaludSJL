<?php namespace App\Models\Tesoreria;

use CodeIgniter\Model;

class Control_ingreso_egreso_model extends Model
{
  protected $table      = 'control_ingreso_egreso';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'movimiento',
    'tipo',
    'concepto',
    'id_moneda',
    'monto',
    'tipo_cambio',
    'fecha_sistema',
    'fl_estado',
    'id_usuario',
    'id_empresa',
    'modalidad_pago',
    'id_cuenta_bancaria_empresa'
  ];

}
