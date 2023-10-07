<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Atencion_detalle_model extends Model
{
  protected $table      = 'atencion_detalle';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'cantidad',
    'id_servicio',
    'costo_unitario',
    'importe',
    'id_atencion',
    'precio_convenio',
    'resultado',
    'comentario',
    'muestra',
 
    'dengue_igg',
    'dengue_igm',
    'dengue_ns1',
    'beta_cualitativo',
    'cuantitativo',
    'cualitativo',

    'color',
    'aspecto',
    'consistencia',
    'moco_visible',
    'sangre_visible',
 
/*  */
    'grupo',
    'rh',
    'tifico_o',
    'tifico_h',
    'paratifico_a',
    'paratifico_b',
    'brucelas',

  ];

}
