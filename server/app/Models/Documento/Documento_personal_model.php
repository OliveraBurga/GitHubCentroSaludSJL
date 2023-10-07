<?php namespace App\Models\Documento;

use CodeIgniter\Model;

class Documento_personal_model extends Model
{
  protected $table      = 'documento_personal';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_personal', 
    'id_tipo_documento', 
    'documento', 
    'fecha_emision', 
    'fecha_vencimiento', 
    'archivo', 
    'id_empresa',
    'fl_no_caduca'
  ];
}
