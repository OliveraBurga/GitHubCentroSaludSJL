<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Atencion_model extends Model
{
  protected $table      = 'atencion';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_paciente',
    'id_personal',
    'id_tarifa', 
    'id_servicio', 
    'id_empresa', 
    'id_usuario',
    'importe', 
    'fl_estado', 
    'id_triaje',
    'fecha', 
    'comentario', 
    'serie',
    'numero',
    'id_moneda',
    'tipo_cambio',
    'fl_pagado',
    'id_plan_atencion',
    'tipo',
    'estado',
    'fecha_inicio',
    'fecha_fin',
    'observacion',
    'cod_presta'
  ];

  public function get_correlativo()
  {
    $serie = date("Y");
    
    $Atencion_m = new Atencion_model();

    $response = $Atencion_m->select('COALESCE(MAX(CAST(numero AS UNSIGNED)), 0) as numero')
    ->where('serie', $serie)
    ->where('id_empresa', ID_EMPRESA)
    ->first();

    $response->serie = $serie;
    $response->numero = str_pad(($response->numero + 1),  8, "0", STR_PAD_LEFT);

    return $response;
  }
}
