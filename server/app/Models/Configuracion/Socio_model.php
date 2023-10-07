<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Socio_model extends Model
{
  protected $table      = 'paciente';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_documento', 
    'numero_documento', 
    'razon_social', 
    'id_ubigeo', 
    'direccion', 
    'id_empresa', 
    'telefono', 
    'persona_encargado',
    'imagen',
    'email',
    'fl_cliente',
    'fl_proveedor',
    'tipo',
    'historia_clinica',
    'apellido',
    'nombre',
    'sexo',
    'fecha_nacimiento',
    'edad',
    'nombre_completo',
    'fl_estado',
    'nombre_papa','nombre_mama',
  ];

  public function get_correlativo()
{
   
  
  $Socio_m = new Socio_model();

  $response = $Socio_m->select('COALESCE(MAX(CAST(historia_clinica AS UNSIGNED)), 0) as numero')
  ->where('id_empresa', ID_EMPRESA)
  ->first();

 
  $response->numero = str_pad(($response->numero + 1),  2, "0", STR_PAD_LEFT);

  return $response;
}
}


