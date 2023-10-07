<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Ajuste_avanzado_model extends Model
{
  
  protected $table      = 'ajuste_avanzado';
  protected $primaryKey = 'id_empresa';
  protected $returnType = 'object';

  protected $allowedFields = [ 
    'id_empresa',
    'porcentaje_igv',
    'fl_sistema_logo',
    'fl_sistema_change_color',
    'sistema_color_bg',
    'fl_pagar_factura',
    'cant_decimales_venta',
    
  ];

}
