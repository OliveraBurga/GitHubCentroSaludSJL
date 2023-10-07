<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Image_model;

class Ajuste_avanzado extends BaseController
{
	public function __construct()
	{
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
	}

	public function index()
	{		
		$response = $this->Ajuste_avanzado_m->select('ajuste_avanzado.*')
		->where('id_empresa', ID_EMPRESA)
		->first();

        return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-ajuste_avanzado', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

					
			/** GUARDAR */
			$data = [
				'fl_pagar_factura'					=> (isset($data_request["fl_pagar_factura"])) ? 1 : null,
				'fl_tarifa_articulo'				=> (isset($data_request["fl_tarifa_articulo"])) ? 1 : null,		
				'fl_tarifa_cliente'					=> (isset($data_request["fl_tarifa_cliente"])) ? 1 : null,	
				'fl_tarifa_ruta'					=> (isset($data_request["fl_tarifa_ruta"])) ? 1 : null,	
				'fl_op_os_doc_ref'					=> (isset($data_request["fl_op_os_doc_ref"])) ? 1 : null,	
				'fl_op_clave_edit_orden'			=> (isset($data_request["fl_op_clave_edit_orden"])) ? 1 : null,	
				'fl_op_multiple_orden_gt'			=> (isset($data_request["fl_op_multiple_orden_gt"])) ? 1 : null,	
				'fl_op_emision_electronico_grt'		=> (isset($data_request["fl_op_emision_electronico_grt"])) ? 1 : null,	
				'fl_op_emision_electronico_grr'		=> (isset($data_request["fl_op_emision_electronico_grr"])) ? 1 : null,	
				'fl_general_local_independiente'	=> (isset($data_request["fl_general_local_independiente"])) ? 1 : null,	
				'fl_op_os_emision_grt'				=> (isset($data_request["fl_op_os_emision_grt"])) ? 1 : null,	
				'fl_facturacion_envio_manual_sunat'	=> (isset($data_request["fl_facturacion_envio_manual_sunat"])) ? 1 : null,	
				'fl_fact_detraccion_automatica'		=> (isset($data_request["fl_fact_detraccion_automatica"])) ? 1 : null,	
				'fl_op_os_descripcion_articulo'		=> (isset($data_request["fl_op_os_descripcion_articulo"])) ? 1 : null,	
				'cant_decimales_venta'				=> $data_request["cant_decimales_venta"],	
				'fl_op_tarifa_info'					=> (isset($data_request["fl_op_tarifa_info"])) ? 1 : null,	
				'fl_general_serie_usuario'			=> (isset($data_request["fl_general_serie_usuario"])) ? 1 : null,	
				
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Ajuste_avanzado_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'AJUSTE AVANZADO',
				'accion'		=> 'EDITAR',
				'descripcion'	=> ''
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

		
}
