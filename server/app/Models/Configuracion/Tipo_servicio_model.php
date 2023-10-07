<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Tipo_servicio_model extends Model
{
  protected $table      = 'tipo_servicio';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'id_empresa',
    'tipo',
    'fl_default',
    'costo',
    'valor_referencial',
    'id_unidad_medida',
    'tipo_examen'
  ];

}
