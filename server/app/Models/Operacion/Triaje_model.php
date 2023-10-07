<?php namespace App\Models\Operacion;

use CodeIgniter\Model;

class Triaje_model extends Model
{
  protected $table      = 'triaje';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'serie',
    'numero',
    'fecha', 
    'fecha_sistema', 
    'id_atencion', 
    'peso',
    'talla', 
    'presion_arterial', 
    'temperatura',
    'frecuencia_respiratoria', 
    'frecuencia_cardiaca', 
    'saturacion',
    'id_usuario',
    'fl_estado',
    'id_empresa',
    'id_local'
  ];

  public function get_correlativo()
  {
    $serie = date("Y");
    
    $Triaje_m = new Triaje_model();

    $response = $Triaje_m->select('COALESCE(MAX(CAST(numero AS UNSIGNED)), 0) as numero')
    ->where('serie', $serie)
    ->where('id_empresa', ID_EMPRESA)
    ->first();

    $response->serie = $serie;
    $response->numero = str_pad(($response->numero + 1),  8, "0", STR_PAD_LEFT);

    return $response;
  }
}
