<?php namespace App\Controllers\Operacion;

use App\Controllers\BaseController;
 
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Cuenta_bancaria_persona_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Operacion\Atencion_model;
use App\Models\Operacion\Triaje_model;
use App\Models\Operacion\Atencion_detalle_model;
use App\Models\Operacion\Analisis_detalle_examen_model;
use App\Models\Operacion\Detalle_orina_model;
use App\Models\Configuracion\Tipo_examen_columnas_model;

class Analisis extends BaseController
{
	public function __construct()
	{
		$this->Empresa_m = new Empresa_model();
		$this->Cuenta_bancaria_persona_m = new Cuenta_bancaria_persona_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$this->Usuario_m = new Usuario_model();
		$this->Atencion_m = new Atencion_model();
		$this->Triaje_m = new Triaje_model();
		$this->Atencion_detalle_m = new Atencion_detalle_model();
		$this->Analisis_detalle_examen_m = new Analisis_detalle_examen_model();
		$this->Detalle_orina_m = new Detalle_orina_model();
		$this->Tipo_examen_columnas_m= new Tipo_examen_columnas_model();
	}

	public function print($id ,$id_detalle ='')
	{
		$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
		
		->select('p.nombre_completo as paciente,p.fecha_nacimiento')
        ->select('pe.nombre_completo as personal')
		->select('per.nombre_completo as user_atencion,per.imagen_firma')

        ->select('s.nombre as servicio')
        ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
		->join('usuario u', 'u.id = atencion.id_usuario', 'left')
        ->join('personal per', 'per.id = u.id_personal', 'left')

		->where('atencion.id_empresa', ID_EMPRESA)	
		->where('atencion.id', $id)	
		->first();

	 

			$response->detalle =$this->Atencion_detalle_m->select('atencion_detalle.*')
			->select('t.nombre as servicio ,t.valor_referencial,t.tipo_examen')
			->select('coalesce(um.nombre, "") as unidad_medida')
			
			->join('tipo_servicio t','t.id = atencion_detalle.id_servicio')
			->join('con_unidad_medida um', 'um.id = t.id_unidad_medida', 'left');

			if ($id_detalle != '0') {
				$response->detalle ->where('atencion_detalle.id',$id_detalle);
		
			}

			else{
					$response->detalle ->where('atencion_detalle.resultado!=',0);	
			}
			$response->detalle  = $response->detalle ->where('id_atencion',$response->id)->findAll();

		 
			$response->tipo_examen = "";

			foreach ($response->detalle as $row) {

				$response->muestra = $row ->muestra;
				$response->comentario = $row ->comentario;
				if ($row->tipo_examen !=null) {
					
					$response->tipo_examen =  $row->tipo_examen;
				}
				
			}
 

		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);
	 

		return $this->respond($response, 200);
	}

	public function print_emograma($id ,$id_detalle ='')
	{
		$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
		
		->select('p.nombre_completo as paciente,p.fecha_nacimiento')
        ->select('pe.nombre_completo as personal')
        ->select('s.nombre as servicio')
		->select('per.nombre_completo as user_atencion,per.imagen_firma')
        ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')

		->join('usuario u', 'u.id = atencion.id_usuario', 'left')
        ->join('personal per', 'per.id = u.id_personal', 'left')


		->where('atencion.id_empresa', ID_EMPRESA)	
		->where('atencion.id', $id)	
		->first();
		$response->detalle =$this->Atencion_detalle_m->select('atencion_detalle.*')
		->select('t.nombre as servicio ,t.valor_referencial,t.tipo_examen')
		->select('coalesce(um.nombre, "") as unidad_medida')
		->join('tipo_servicio t','t.id = atencion_detalle.id_servicio')
		->join('con_unidad_medida um', 'um.id = t.id_unidad_medida', 'left') 
		->find($id_detalle);


		$response->tipo_examen = $response->detalle ->tipo_examen;
		$response->muestra = $response->detalle ->muestra;
		$response->comentario = $response->detalle ->comentario;

		$response->analisis =$this->Analisis_detalle_examen_m->select('analisis_detalle_examen.*')
		->select('te.examen as servicio ,te.valor_referencial ')
		->select('coalesce(um.nombre, "") as unidad_medida')
		->join('tipo_examen_detalle te','te.id = analisis_detalle_examen.id_tipo_examen_detalle', 'left')

		->join('con_unidad_medida um', 'um.id = te.id_unidad', 'left') 
		->where('analisis_detalle_examen.id_atencion_detalle', $id_detalle) 

		->where('te.fl_ecelular', 0) 
		->findAll();


		$response->analisis_df =$this->Analisis_detalle_examen_m->select('analisis_detalle_examen.*')
		->select('te.examen as servicio ,te.valor_referencial ')
		->select('coalesce(um.nombre, "") as unidad_medida')
		->join('tipo_examen_detalle te','te.id = analisis_detalle_examen.id_tipo_examen_detalle', 'left')

		->join('con_unidad_medida um', 'um.id = te.id_unidad', 'left') 
		->where('analisis_detalle_examen.id_atencion_detalle', $id_detalle) 

		->where('te.fl_ecelular', 1) 
		->findAll();

/* 
			foreach ($response->detalle as $row) {

				$this->Analisis_detalle_examen_m->save($detalle_tipo);

				if ($row->tipo_examen !=null) {
					
					$response->tipo_examen =  $row->tipo_examen;
				}
				
			}
 */
		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);
	 

		return $this->respond($response, 200);
	}


	
	public function print_orina($id ,$id_detalle ='')
	{
		$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
		
		->select('p.nombre_completo as paciente,p.fecha_nacimiento')
        ->select('pe.nombre_completo as personal')
		->select('per.nombre_completo as user_atencion,per.imagen_firma')

        ->select('s.nombre as servicio')
        ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')

		->join('usuario u', 'u.id = atencion.id_usuario', 'left')
        ->join('personal per', 'per.id = u.id_personal', 'left')
		
		->where('atencion.id_empresa', ID_EMPRESA)	
		->where('atencion.id', $id)	
		->first();
		$response->detalle =$this->Atencion_detalle_m->select('atencion_detalle.*')
		->select('t.nombre as servicio ,t.valor_referencial,t.tipo_examen')
		->select('coalesce(um.nombre, "") as unidad_medida')
		->join('tipo_servicio t','t.id = atencion_detalle.id_servicio')
		->join('con_unidad_medida um', 'um.id = t.id_unidad_medida', 'left') 
		->find($id_detalle);


		$response->tipo_examen = $response->detalle ->tipo_examen;
		$response->muestra = $response->detalle ->muestra;
		$response->comentario = $response->detalle ->comentario;

		$response->caracteristicas =$this->Detalle_orina_m->select('detalle_orina.*')
		->where('detalle_orina.id_atencion_detalle', $id_detalle) 
		->where('fl_tipo', 1) 
		->findAll();

		$response->bioquimico =$this->Detalle_orina_m->select('detalle_orina.*')
		->where('detalle_orina.id_atencion_detalle', $id_detalle) 
		->where('fl_tipo', 2) 
		->findAll();
		$response->urinario =$this->Detalle_orina_m->select('detalle_orina.*')
		->where('detalle_orina.id_atencion_detalle', $id_detalle) 
		->where('fl_tipo', 3) 
		->findAll();
	 

 
		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);
	 

		return $this->respond($response, 200);
	}


	public function print_dengue($id ,$id_detalle ='')
	{
		$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
		
		->select('p.nombre_completo as paciente,p.fecha_nacimiento')
        ->select('pe.nombre_completo as personal')
        ->select('s.nombre as servicio')

		->select('per.nombre_completo as user_atencion,per.imagen_firma')

        ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
        ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
        ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
        ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')

		->join('usuario u', 'u.id = atencion.id_usuario', 'left')
        ->join('personal per', 'per.id = u.id_personal', 'left')

		->where('atencion.id_empresa', ID_EMPRESA)	
		->where('atencion.id', $id)	
		->first();

		$response->detalle =$this->Atencion_detalle_m->select('atencion_detalle.*')
		->select('t.nombre as servicio ,t.valor_referencial,t.tipo_examen,t.nombre')
		->select('coalesce(um.nombre, "") as unidad_medida')
		->join('tipo_servicio t','t.id = atencion_detalle.id_servicio')
		->join('con_unidad_medida um', 'um.id = t.id_unidad_medida', 'left') 
		->find($id_detalle);

		 
		$response->tipo_examen = $response->detalle ->tipo_examen;
		$response->muestra = $response->detalle ->muestra;
		$response->comentario = $response->detalle ->comentario;

		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);
	 

		return $this->respond($response, 200);
	}


	public function get_correlativo()
	{
		$secuencia = $this->Triaje_m->get_correlativo();

		return $this->respond($secuencia, 200);
	}

	public function get_analisis()
	{
		$data_request = $this->request->getGet();	
		$response = $this->Atencion_detalle_m->select('atencion_detalle.*')
		->select('t.nombre as servicio ')
		->join('tipo_servicio t','t.id = atencion_detalle.id_servicio')
		->where('id_atencion',$data_request["id_atencion"])->findAll();
	 

		return $this->respond($response, 200);
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

		 
            $response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion')
            ->select('p.nombre_completo as paciente')
            ->select('pe.nombre_completo as personal')
            ->select('s.nombre as servicio')
            ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
            ->join('paciente p', 'p.id = atencion.id_paciente', 'left')
            ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
            ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
            ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
			->where("atencion.tipo", 'LABORATORIO')		 
			->where('atencion.fl_estado', 1)
			->where('DATE_FORMAT(atencion.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
			->where('DATE_FORMAT(atencion.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"]);
			;
		 

		if ($usuario->tipo != 'SUPER ADMINISTRADOR') {
				
	/* 		$response ->where('atencion.id_personal',$usuario->id_personal); */

/* 			echo(ID_USUARIO); */
			$response ->groupStart()
					->orWhere('atencion.id_personal', $usuario->id_personal)
					->orWhere('atencion.id_usuario', ID_USUARIO)
				->groupEnd();

			
		}

		if ($data_request["tipo_filtro"] == 'FINALIZADO') {
			
			$response ->where('atencion.estado','FINALIZADO');
		}
		else
		{

			$response ->where('atencion.estado !=','FINALIZADO');

		}


		$response = $response->findAll();

		foreach ($response as $row) {
			$row->empresa = $this->Empresa_m->find(ID_EMPRESA);

			$row->servicio = $this->Atencion_detalle_m->select('atencion_detalle.*')
			->select('t.nombre as servicio,t.tipo_examen,t.id as id_tipo_servicio ')
			->select('coalesce(um.nombre, "") as unidad_medida')
			
			->join('tipo_servicio t','t.id = atencion_detalle.id_servicio')
			->join('con_unidad_medida um', 'um.id = t.id_unidad_medida', 'left')
			->where('id_atencion',$row->id)->findAll();

	/* 		foreach ($row->servicio as $row1) {

				$row1->columnas = $this->Tipo_examen_columnas_m->where('id_tipo_servicio',$row1->id)->findAll();
				
				
			}
 */
		}

		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('operacion-analisis', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('operacion-analisis', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'resultado' 					=> trim($data_request["resultado"]),

			];

			if(isset($data_request["id"]))
			{
				
				$data["id"] = $data_request["id"];
			}
			

			$this->Atencion_detalle_m->save($data);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


	public function save_dengue()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('operacion-analisis', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('operacion-analisis', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'dengue_igg' 					=> ((isset($data_request["dengue_igg"]) && $data_request["dengue_igg"]!= '')  ?  trim($data_request["dengue_igg"]) : null),
				'dengue_igm' 					=> ((isset($data_request["dengue_igm"]) && $data_request["dengue_igm"]!= '')  ?  trim($data_request["dengue_igm"]) : null),
				'dengue_ns1' 					=>((isset($data_request["dengue_ns1"]) && $data_request["dengue_ns1"]!= '')  ?  trim($data_request["dengue_ns1"]) : null),
				'cualitativo' 					=>((isset($data_request["cualitativo"]) && $data_request["cualitativo"]!= '')  ?  trim($data_request["cualitativo"]) : null),
				'cuantitativo' 					=> ((isset($data_request["cuantitativo"]) && $data_request["cuantitativo"]!= '')  ?  trim($data_request["cuantitativo"]) : null),
				'resultado' 					=> 0,

				'grupo' 					=> ((isset($data_request["grupo"]) && $data_request["grupo"]!= '')  ?  trim($data_request["grupo"]) : null),
				'rh' 					=> ((isset($data_request["rh"]) && $data_request["rh"]!= '')  ?  trim($data_request["rh"]) : null),
				'tifico_o' 					=> ((isset($data_request["tifico_o"]) && $data_request["tifico_o"]!= '')  ?  trim($data_request["tifico_o"]) : null),
				'tifico_h' 					=> ((isset($data_request["tifico_h"]) && $data_request["tifico_h"]!= '')  ?  trim($data_request["tifico_h"]) : null),
				'paratifico_a' 					=> ((isset($data_request["paratifico_a"]) && $data_request["paratifico_a"]!= '')  ?  trim($data_request["paratifico_a"]) : null),
				'paratifico_b' 					=> ((isset($data_request["paratifico_b"]) && $data_request["paratifico_b"]!= '')  ?  trim($data_request["paratifico_b"]) : null),
				'brucelas' 					=> ((isset($data_request["brucelas"]) && $data_request["brucelas"]!= '')  ?  trim($data_request["brucelas"]) : null),

 
			];
			$data["comentario"] = $data_request["comentario"];
			$data["muestra"] = $data_request["muestra"];
			
			if(isset($data_request["id"]))
			{
				
				$data["id"] = $data_request["id"];
			}
			

			$this->Atencion_detalle_m->save($data);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


	
	public function save_parasito()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('operacion-analisis', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('operacion-analisis', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

 
			/** GUARDAR */
			$data = [
				'color' 					=> ((isset($data_request["color"]) && $data_request["color"]!= '')  ?  trim($data_request["color"]) : null),
				'aspecto' 					=> ((isset($data_request["aspecto"]) && $data_request["aspecto"]!= '')  ?  trim($data_request["aspecto"]) : null),
				'consistencia' 					=>((isset($data_request["consistencia"]) && $data_request["consistencia"]!= '')  ?  trim($data_request["consistencia"]) : null),
				'moco_visible' 					=>((isset($data_request["moco_visible"]) && $data_request["moco_visible"]!= '')  ?  trim($data_request["moco_visible"]) : null),
				'sangre_visible' 					=> ((isset($data_request["sangre_visible"]) && $data_request["sangre_visible"]!= '')  ?  trim($data_request["sangre_visible"]) : null),
				'resultado' 					=> 0,
			];
			$data["comentario"] = $data_request["comentario"];
			$data["muestra"] = $data_request["muestra"];
			
			if(isset($data_request["id"]))
			{
				
				$data["id"] = $data_request["id"];
			}
			

			$this->Atencion_detalle_m->save($data);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


	public function save_inmunologia()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('operacion-analisis', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('operacion-analisis', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'beta_cualitativo' 					=> trim($data_request["beta_cualitativo"]),
			 
				'resultado' 					=> 0,
			];
			$data["comentario"] = $data_request["comentario"];
			$data["muestra"] = $data_request["muestra"];
			
			if(isset($data_request["id"]))
			{
				
				$data["id"] = $data_request["id"];
			}
			

			$this->Atencion_detalle_m->save($data);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


	public function save_orina()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('operacion-analisis', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('operacion-analisis', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'resultado' 					=> 0,

			];

			$data["comentario"] = $data_request["comentario"];
			$data["muestra"] = $data_request["muestra"];
			if(isset($data_request["id"]))
			{
				
				$data["id"] = $data_request["id"];
			}
			

			$this->Atencion_detalle_m->save($data);

			
			$id_atencion_detalle = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			$this->Detalle_orina_m->where('id_atencion_detalle',$id_atencion_detalle)->delete();


			foreach (json_decode($data_request["caracteristicas"]) as $row) {

				$detalle_tipo  = [
					'id_atencion_detalle'	=> $id_atencion_detalle,
					'nombre'	 			=> $row->nombre,
					'resultado'	 			=> $row->resultado,
					'fl_tipo'				=> 1,
			
					
				];
				$this->Detalle_orina_m->save($detalle_tipo);
			}

			foreach (json_decode($data_request["bioquimico"]) as $row) {

				$detalle_tipo  = [
					'id_atencion_detalle'	=> $id_atencion_detalle,
					'nombre'	 			=> $row->nombre,
					'resultado'	 			=> $row->resultado,
					'fl_tipo'				=> 2,
			
					
				];
				$this->Detalle_orina_m->save($detalle_tipo);
			}
			foreach (json_decode($data_request["urinario"]) as $row) {

				$detalle_tipo  = [
					'id_atencion_detalle'	=> $id_atencion_detalle,
					'nombre'	 			=> $row->nombre,
					'resultado'	 			=> $row->resultado,
					'fl_tipo'				=> 3,
			
					
				];
				$this->Detalle_orina_m->save($detalle_tipo);
			}

			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


	public function save_ematograma()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('operacion-analisis', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('operacion-analisis', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'resultado' 					=> 0,

			];

			$data["comentario"] = $data_request["comentario"];
			$data["muestra"] = $data_request["muestra"];

			if(isset($data_request["id"]))
			{
				
				$data["id"] = $data_request["id"];
				$data["comentario"] = $data_request["comentario"];
				$data["muestra"] = $data_request["muestra"];
			}
			

			$this->Atencion_detalle_m->save($data);

			$id_atencion_detalle = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			$this->Analisis_detalle_examen_m->where('id_atencion_detalle',$id_atencion_detalle)->delete();
		/* 	$this->Helper->eliminar_registros_detalle('analisis_detalle_examen', 'id_atencion_detalle', $id_atencion_detalle, json_decode($data_request["detalle_tipo"])); */

			foreach (json_decode($data_request["detalle_tipo"]) as $row) {

				$detalle_tipo  = [
					'id_atencion_detalle'	=> $id_atencion_detalle,
					'examen'	 			=> $row->examen,
					'resultado'	 			=> $row->resultado,
					'id_tipo_examen_detalle'=> $row->id_tipo,
			
					
				];

				
			/* 	if(is_numeric($row->id))
				{
					$detalle_tipo["id"] = $row->id;
				}
 */

				$this->Analisis_detalle_examen_m->save($detalle_tipo);
			}
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
		$this->Helper->validar_permisos('operacion-analisis', 'delete');

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

	
	public function inicio_atencion()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('operacion-analisis', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'fecha_inicio'		=> $data_request["fecha_inicio_atencion"].' '.$data_request["hora_inicio_atencion"],
			 
				'estado'	=> 'ATENDIENDO',
				'id'				=> $data_request["id"]
			];

			$this->Atencion_m->save($data);
 		
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
 

	public function fin_atencion()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('operacion-analisis', 'edit');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'fecha_fin'			=> $data_request["fecha_fin_atencion"].' '.$data_request["hora_fin_atencion"],
	 
				'estado'	=> 'FINALIZADO',
				'observacion'  => $data_request["comentario"],
				'id'				=> $data_request["id"],
			];

			$this->Atencion_m->save($data);
 
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


		
}
