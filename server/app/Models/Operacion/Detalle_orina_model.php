<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Detalle_orina_model extends Model
{
  protected $table      = 'detalle_orina';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'resultado',
    'fl_tipo',
    'id_atencion_detalle',
 
 
  ];

}
