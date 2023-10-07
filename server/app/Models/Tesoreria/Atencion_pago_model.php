<?php namespace App\Models\Tesoreria;

use CodeIgniter\Model;

class Atencion_pago_model extends Model
{
  protected $table      = 'atencion_pago';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'monto',
    'id_atencion',
    'fecha',
    'fecha_sistema',
    'tipo_canal',
    'medio_pago',
    'observacion',
    'id_usuario',
    'id_cuenta_bancaria_empresa',
    'numero_operacion',
    'fl_liquidado',
    'id_empresa',
    'id_moneda'
  ];

}
