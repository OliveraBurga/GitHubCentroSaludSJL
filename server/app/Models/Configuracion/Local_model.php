<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Local_model extends Model
{
  protected $table      = 'local';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_empresa', 
    'nombre', 
    'direccion', 
    'codigo_sunat', 
    'tipo',
    'fl_facturacion',
    'token_pse',
    'descripcion',
    'tipo_afectacion_igv',
    'texto_bottom_factura',
    'telefono',
    'formato_impresion',
    'limite_maximo_saldo_caja_chica',
    'css_estructura_guia_transp'
  ];

}
