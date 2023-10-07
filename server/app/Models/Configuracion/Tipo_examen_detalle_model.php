<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Tipo_examen_detalle_model extends Model
{
  protected $table      = 'tipo_examen_detalle';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_tipo_servicio',
    'examen',
    'valor_referencial',
    'fl_ecelular',
    'id_unidad',
 
  ];

}
