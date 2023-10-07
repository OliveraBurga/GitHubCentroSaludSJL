<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Personal_model;
use App\Models\Configuracion\Cuenta_bancaria_persona_model;
use App\Models\Image_model;

class Personal extends BaseController
{
	public function __construct()
	{
		$this->Personal_m = new Personal_model();
		$this->Cuenta_bancaria_persona_m = new Cuenta_bancaria_persona_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Personal_m->select("id, nombre_completo as text");

		if(isset($data_request["tipo"]))
		{
			$response->where('tipo_personal', $data_request["tipo"]);
		}


		$response = $response
		->where('id_empresa', ID_EMPRESA)
		->findAll();
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Personal_m->select('personal.*')
		->select('d.nombre as documento')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
 
		->join('static_ubigeo u', 'u.id = personal.id_ubigeo', 'left')
		->join('static_documento d', 'd.id = personal.id_documento', 'left')
 
		->where('personal.id_empresa', ID_EMPRESA)		
		->findAll();

		foreach ($response as $row) {
			
			$row->cuentas_bancarias = $this->Cuenta_bancaria_persona_m->where('id_personal', $row->id)->findAll();
		}

        return $this->respond(['data' => $response], 200);
	}

	

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-personal', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-personal', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();


			/** GUARDAR IMAGEN */
			$Imagen_upload = new Image_model();			
			$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'personal', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);

			$imagen_firma = $Imagen_upload->guardar($this->request->getFile('imagen_firma'), 'personal', (isset($data_request["imagen_firma_anterior"])) ? $data_request["imagen_firma_anterior"] : null, null);
					
			/** GUARDAR */
			$data = [
				'imagen'          			=> $imagen,
				'tipo_personal'          	=> trim($data_request["tipo_personal"]),
				'id_documento'            	=> trim($data_request["id_documento"]),
				'numero_documento'          => trim($data_request["numero_documento"]),
				'nombre'                    => trim($data_request["nombre"]),
				'apellido'         			=> trim($data_request["apellido"]),
				'nombre_completo'         	=> trim($data_request["nombre"]).' '.trim($data_request["apellido"]),
				'id_ubigeo'                 => (isset($data_request["id_ubigeo"])) ? trim($data_request["id_ubigeo"]) : null,
				'direccion'                 => (isset($data_request["direccion"])) ? trim($data_request["direccion"]) : '',
				'tipo_contratacion'         => trim($data_request["tipo_contratacion"]),
				'modalidad_contrato'     	=> isset($data_request["modalidad_contrato"]) ? trim($data_request["modalidad_contrato"]) : '',
				'genero'                    => (isset($data_request["genero"])) ? trim($data_request["genero"]) : '',
				'telefono'                  => trim($data_request["telefono"]),
			 
				'cmp'                  => trim($data_request["cmp"]),
				'rne'                  => trim($data_request["rne"]),

				'id_proveedor'              => (isset($data_request["id_proveedor"])) ? $data_request["id_proveedor"] : null,
				'fecha_nacimiento'          => trim($data_request["fecha_nacimiento"]),
				'fecha_ingreso'             => (isset($data_request["fecha_ingreso"])) ? trim($data_request["fecha_ingreso"]) : null,
				'fecha_planilla'            => (isset($data_request["fecha_planilla"])) ? trim($data_request["fecha_planilla"]) : null,
				'fecha_salida'              => (isset($data_request["fecha_salida"])) ? trim($data_request["fecha_salida"]) : null,
				'sueldo_basico'             => (isset($data_request["fecha_salida"])) ? trim($data_request["sueldo_basico"]) : 0,
				'sueldo_variable'           => (isset($data_request["sueldo_variable"])) ? trim($data_request["sueldo_variable"]) : 0,
				'sueldo_interno'            => (isset($data_request["sueldo_interno"])) ? trim($data_request["sueldo_interno"]) : 0,
				'numero_seguro'             => (isset($data_request["numero_seguro"])) ? trim($data_request["numero_seguro"]) : '',
				'seguro_com_trabajo_riesgo' => trim($data_request["seguro_com_trabajo_riesgo"]),
				'seguro_salud' 				=> trim($data_request["seguro_salud"]),
				'seguro_vidaley' 			=> trim($data_request["seguro_vidaley"]),

				'id_cliente' 				=> (isset($data_request["id_cliente"]) && $data_request["id_cliente"] != '') ? trim($data_request["id_cliente"]) : null,
				'codigo_sap'  				=> trim($data_request["codigo_sap"]),
				'pais'  					=> trim($data_request["pais"]),
				'filtro_security' 			=> trim($data_request["filtro_security"]),
				'vigencia_filtro' 			=> trim($data_request["vigencia_filtro"]),
				'fotocheck' 				=> trim($data_request["fotocheck"]),
				'licencia_interna' 			=> trim($data_request["licencia_interna"]),
				'hazmati' 					=> trim($data_request["hazmati"]),
				'hazmatii' 					=> trim($data_request["hazmatii"]),
				'capacitacion_mtc' 			=> trim($data_request["capacitacion_mtc"]),
				'certi_prim_auxilio' 		=> trim($data_request["certi_prim_auxilio"]),
				'certi_man_defensivo' 		=> trim($data_request["certi_man_defensivo"]),
				'certi_man_extintor' 		=> trim($data_request["certi_man_extintor"]),
				'portuaria_seguridad' 		=> trim($data_request["portuaria_seguridad"]),
				'proteccion_portuaria' 		=> trim($data_request["proteccion_portuaria"]),
				'curriculum' 				=> trim($data_request["curriculum"]),
				'record' 					=> trim($data_request["record"]),
				'otro' 						=> trim($data_request["otro"]),
				'antecedente_policial' 		=> trim($data_request["antecedente_policial"]),
				'antecedente_penal' 		=> trim($data_request["antecedente_penal"]),
				'trabajo_altura' 			=> trim($data_request["trabajo_altura"]),
				'observacion' 				=> trim($data_request["observacion"]),

				'imagen_firma'				=> $imagen_firma,
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_membresia"] = ID_MEMBRESIA;
			}

			$this->Personal_m->save($data);

			$id_personal = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/****** SAVE CUENTAS BANCARIAS */

			$this->Helper->eliminar_registros_detalle('cuenta_bancaria_persona', 'id_personal', $id_personal, json_decode($data_request["detalle_cuenta_bancaria"]));

			foreach (json_decode($data_request["detalle_cuenta_bancaria"]) as $row) {

				$data_detalle_cuenta = [
					'id_personal'	=> $id_personal,
					'banco'			=> $row->banco,
					'tipo'			=> $row->tipo,
					'numero'		=> $row->numero,
					'full_data'		=> $row->banco.' - '.$row->tipo.' - '.$row->numero
				];

				if(is_numeric($row->id))
				{
					$data_detalle_cuenta["id"] = $row->id;
				}

				$this->Cuenta_bancaria_persona_m->save($data_detalle_cuenta);
			}

			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'PERSONAL',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"]).' '.trim($data_request["apellido"])
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

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-personal', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$personal = $this->Personal_m->find($data_request["id"]);

			$this->Cuenta_bancaria_persona_m->where('id_personal', $data_request["id"])->delete();
			$this->Personal_m->where('id', $data_request["id"])
			->delete();
			
			/** ELIMINAR IMAGEN */
			$Imagen_upload = new Image_model();
			$Imagen_upload->eliminar($personal->imagen);
			$Imagen_upload->eliminar($personal->imagen_firma);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'PERSONAL',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $personal->nombre_completo
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
            
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		
}
