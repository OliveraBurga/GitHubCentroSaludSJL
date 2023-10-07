<?php namespace App\Controllers\Operacion;

use App\Controllers\BaseController;
 
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Cuenta_bancaria_persona_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Operacion\Atencion_model;
use App\Models\Operacion\Triaje_model;
use App\Models\Operacion\Triaje_signo_peligro_model;
class Triaje extends BaseController
{
	public function __construct()
	{
		$this->Empresa_m = new Empresa_model();
		$this->Cuenta_bancaria_persona_m = new Cuenta_bancaria_persona_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$this->Usuario_m = new Usuario_model();
		$this->Atencion_m = new Atencion_model();
		$this->Triaje_m = new Triaje_model();
		$this->Triaje_signo_peligro_m = new Triaje_signo_peligro_model();

	}

	public function print($id_triaje)
	{
		$response = $this->Triaje_m->select('triaje.*, concat(triaje.serie, "-", triaje.numero) as triaje')
		->select('concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion, atencion.importe')
		->select('p.nombre_completo as paciente')
		->select('pe.nombre_completo as personal')
		->select('s.nombre as servicio')
		->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('atencion', 'atencion.id = triaje.id_atencion', 'left')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
		->join('personal pe', 'pe.id = atencion.id_personal', 'left')
		->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
		->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
		->where('triaje.id', $id_triaje)
		->first();

		$response->detalle = $this->Triaje_signo_peligro_m->where('id_triaje', $id_triaje)->findAll();

		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);

		return $this->respond($response, 200);
	}

	public function get_correlativo()
	{
		$secuencia = $this->Triaje_m->get_correlativo();

		return $this->respond($secuencia, 200);
	}

	public function get_liquidar($id_atencion)
	{		
		$data_request = $this->request->getGet();	

		$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
		->select('p.nombre_completo as paciente')
		->select('pe.nombre_completo as personal')
		->select('s.nombre as servicio')
		->select('tri.fl_estado')
		->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
		->join('personal pe', 'pe.id = atencion.id_personal', 'left')
		->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
		->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
		->where('atencion.id', $id_atencion)
		->where("atencion.id_triaje", null)		 
		->where('atencion.fl_estado', 1)
		->first();	

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();		
		$usuario = $this->Usuario_m->find(ID_USUARIO);

		if($data_request["tipo"] == 'SIN_TRIAJE')
		{
            $response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion')
            ->select('p.nombre_completo as paciente')
            ->select('pe.nombre_completo as personal')
            ->select('s.nombre as servicio')
			->select('tri.fl_estado, concat(tri.serie, "-", tri.numero) as triaje')
            ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
			->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
            ->join('paciente p', 'p.id = atencion.id_paciente', 'left')
            ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
            ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
            ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
			->where("atencion.id_triaje", null)	
			->where("atencion.tipo", 'CONSULTA MEDICA')		 
			->where('atencion.fl_estado', 1)
		 
			;
		}
		else
		{

			$response = $this->Triaje_m->select('triaje.*, concat(triaje.serie, "-", triaje.numero) as triaje')
            ->select('concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion, atencion.importe')
			->select('p.nombre_completo as paciente')
            ->select('pe.nombre_completo as personal')
            ->select('s.nombre as servicio')
            ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
			->join('atencion', 'atencion.id = triaje.id_atencion', 'left')
            ->join('paciente p', 'p.id = atencion.id_paciente', 'left')
            ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
            ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
            ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
			->where('DATE_FORMAT(triaje.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
			->where('DATE_FORMAT(triaje.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"]);
		}

		if ($usuario->tipo != 'SUPER ADMINISTRADOR') {
				
			$response ->where('atencion.id_personal',$usuario->id_personal);
			
		}
		$response = $response->findAll();

		foreach ($response as $row) {
			$row->empresa = $this->Empresa_m->find(ID_EMPRESA);

			$row->detalle = $this->Triaje_signo_peligro_m->where('id_triaje', $row->id)->findAll();
			 
		}

		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('operacion-triaje', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('operacion-triaje', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'fecha' 					=> trim($data_request["fecha"]),
				
				'peso'						=> trim($data_request["peso"]),
				'talla'						=> trim($data_request["talla"]),
				'presion_arterial'			=> trim($data_request["presion_arterial"]),
				'temperatura'				=> trim($data_request["temperatura"]),
				'frecuencia_respiratoria'	=> trim($data_request["frecuencia_respiratoria"]),
				'frecuencia_cardiaca'		=> trim($data_request["frecuencia_cardiaca"]),
				'saturacion'				=> trim($data_request["saturacion"]),

			];

			if(isset($data_request["id"]))
			{
				
				$data["id"] = $data_request["id"];
			}
			else
			{
				$correlativo = $this->Triaje_m->get_correlativo(date("Y"));
				$data["numero"] = $correlativo->numero;
				$data["serie"] = $correlativo->serie;
			 
				$data["id_usuario"] = ID_USUARIO;
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_local"] = ID_LOCAL;
				$data["fecha_sistema"] = date("Y-m-d H:i:s");
				$data["fl_estado"] = 1;
				$data["id_atencion"] = trim($data_request["id_atencion"]);
			}

			$this->Triaje_m->save($data);

			$id_triaje = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/*** VINCULAR A ATENCIÓN */
			if(!isset($data_request["id"]))
			{
				$data_atencion = [
					'id'					=> $data_request["id_atencion"],
					'id_triaje'				=> $id_triaje,
					'fl_estado'				=> 2,
				];
	
				$this->Atencion_m->save($data_atencion);
			}
		

			
			

			$this->Triaje_signo_peligro_m->where('id_triaje', $id_triaje)->delete();

			foreach (json_decode($data_request["signo"]) as $row) {

				$data_signo = [
					'signo'	=> $row->nombre,
					'tipo'				=>  $row->tipo,
					'fl_estado'				=>  $row->fl_estado,
					'id_triaje'	=> $id_triaje,
				];

			

				$this->Triaje_signo_peligro_m->save($data_signo);
			}


			/****************** SAVE CENTINELA *****************/
			$triaje = $this->Triaje_m->find($id_triaje);

			$data_centinela = [
				'modulo'		=> 'OPERACIÓN',
				'menu'			=> 'TRIAJE',
				'accion'		=> 'NUEVO',
				'descripcion'	=> 'TRIAJE :'.$triaje->serie.'-'.$triaje->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'id_triaje' => $id_triaje], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('operacion-triaje', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$triaje = $this->Triaje_m->find($data_request["id_delete"]);

			/** DESVINCULAR DE VIAJE */
			$data_ = [
				'id'		=> $triaje->id_atencion,
				'id_triaje'	=> null,
				'fl_estado'	=> 1,
			];

			$this->Atencion_m->save($data_);

			/** SAVE */
			$data_triaje= [
				'id'		=> $data_request["id_delete"],
				'fl_estado'	=> 0
			];

			$this->Triaje_m->save($data_triaje);     

			/****************** SAVE CENTINELA *****************/
			$triajes = $this->Triaje_m->select('concat(v.serie,"-",v.numero) as triaje')
			->join('atencion v', 'v.id = triaje.id_atencion')
			->find($data_request["id_delete"]);

			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'LIQUIDACIÓN DE TERCEROS',
				'accion'		=> 'ANULAR',
				'descripcion'	=>  'Triaje : '.$triajes->triaje
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
