<?php namespace App\Controllers\Operacion;

use App\Controllers\BaseController;
 
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Cuenta_bancaria_persona_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Operacion\Triaje_signo_peligro_model;
use App\Models\Operacion\Atencion_model;
use App\Models\Operacion\Plan_atencion_model;
use App\Models\Operacion\Plan_atencion_diagnostico_model;
use App\Models\Operacion\Plan_atencion_receta_model;
use App\Models\Operacion\Triaje_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Operacion\Plan_atencion_tratamiento_model;
use App\Models\Operacion\Patologia_clinica_model;
use App\Models\Operacion\Detalle_atencion_diagnostigo_config_model;
use App\Models\Upload_model;
use App\Models\Operacion\Historial_vacuna_model;
use App\Models\Configuracion\Vacuna_model;
use App\Controllers\Recursos\Twilio_mensajeria;

class Plan_atencion extends BaseController
{
	public function __construct()
	{
		$this->Empresa_m = new Empresa_model();
		$this->Cuenta_bancaria_persona_m = new Cuenta_bancaria_persona_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$this->Usuario_m = new Usuario_model();
		$this->Triaje_signo_peligro_m = new Triaje_signo_peligro_model();
		$this->Atencion_m = new Atencion_model();
		$this->Plan_atencion_m = new Plan_atencion_model();
		$this->Plan_atencion_diagnostico_m = new Plan_atencion_diagnostico_model();
		$this->Plan_atencion_receta_m = new Plan_atencion_receta_model();
		$this->Triaje_m = new Triaje_model();
		$this->Plan_atencion_tratamiento_m = new Plan_atencion_tratamiento_model();
		$this->Patologia_clinica_m = new Patologia_clinica_model();

		$this->Detalle_atencion_diagnostigo_config_m = new Detalle_atencion_diagnostigo_config_model();
		$this->Historial_vacuna_m = new Historial_vacuna_model();
		$this->Vacuna_m = new Vacuna_model();
	}

	public function print($id_plan_atencion)
	{
		$response = $this->Plan_atencion_m->select('plan_atencion.*, concat(plan_atencion.serie, "-", plan_atencion.numero) as plan_atencion')
		->select('concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion, atencion.id_triaje,atencion.id_paciente')
		->select('p.nombre_completo as paciente,p.historia_clinica, p.nombre as nombre_paciente ,  p.apellido as apellido_paciente, p.fecha_nacimiento, TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) as edad, p.telefono, p.numero_documento')
		->select('pe.nombre_completo as personal,pe.imagen_firma')
		->select('s.nombre as servicio')
		->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->select('concat(tri.serie," - ",tri.numero)  as numero_triaje,
		
		tri.peso,tri.talla,tri.presion_arterial,tri.temperatura,tri.frecuencia_respiratoria,tri.frecuencia_cardiaca,
		tri.saturacion')
		->join('atencion', 'atencion.id = plan_atencion.id_atencion', 'left')
		->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
		->join('personal pe', 'pe.id = atencion.id_personal', 'left')
		->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
		->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
		->where('plan_atencion.id', $id_plan_atencion)
		->first();

		
		$response->receta = $this->Plan_atencion_receta_m->select('plan_atencion_receta.*')
		->select('coalesce(um.nombre, "") as unidad_medida')
		->join('con_unidad_medida um', 'um.id = plan_atencion_receta.id_unidad', 'left')
		->where('id_plan_atencion', $id_plan_atencion)->findAll();

		$response->signo_peligro = $this->Triaje_signo_peligro_m->where('id_triaje', $response->id_triaje)->findAll();

		$response->tratamiento = $this->Plan_atencion_tratamiento_m->where('id_plan_atencion', $id_plan_atencion)->findAll();
		$response->empresa = $this->Empresa_m->find(ID_EMPRESA);

		$response->triaje = $this->Triaje_m->where('id', $response->id_triaje)->first();

		$response->diagnostico = $this->Plan_atencion_diagnostico_m->select('plan_atencion_diagnostico.*')
				->select('di.enfermedad')
				->join('diagnostico di', 'di.id = plan_atencion_diagnostico.id_diagnostico', 'left')
				->where('id_plan_atencion', $id_plan_atencion)
				->findAll();


				$response->patologia_clinica = $this->Patologia_clinica_m->select('patologia_clinica.*')
				->select('t.nombre as servicio')
				->join('tipo_servicio t','t.id = patologia_clinica.id_analisis')
				->where('id_plan_atencion', $id_plan_atencion)
				->findAll();
			 

				$response->diagnostico_config = $this->Detalle_atencion_diagnostigo_config_m
				->select('detalle_atencion_diagnostigo_config.*')
				->select('t.nombre')
				->join('diagnostico_config t','t.id = detalle_atencion_diagnostigo_config.id_diagnostico')
				->where('id_plan_atencion', $response->id)->findAll();

		return $this->respond($response, 200);
	}

	public function get_correlativo()
	{
		$secuencia = $this->Plan_atencion_m->get_correlativo();

		return $this->respond($secuencia, 200);
	}

	public function historial_vacunas()
	{
		$data_request = $this->request->getGet();

		$response = $this->Vacuna_m->select('vacuna.*')
		->findAll();

		foreach ($response as $row) {
			

			
		$vacuna = $this->Historial_vacuna_m
		->where('id_vacuna',$row->id)

		->where('id_paciente',$data_request["id_paciente"])
		->first();

		$row->fecha = null ;


		if (is_object($vacuna)) {
		 
			$row->fecha = $vacuna->fecha ;
		}


		}

		return $this->respond($response, 200);
	}


	
	public function historial()
	{
		$data_request = $this->request->getGet();
		/* $response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
		->join('plan_atencion tri', 'tri.id = atencion.id_plan_atencion')
		->select('pe.nombre_completo as personal')
		->select('s.nombre as servicio')
		->join('personal pe', 'pe.id = atencion.id_personal', 'left')
		->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
		->where('atencion.id_paciente',$data_request["id_paciente"])
		->findAll();


 */
$response = $this->Plan_atencion_m->select('plan_atencion.*, concat(plan_atencion.serie, "-", plan_atencion.numero) as plan_atencion')
		->select('concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion, atencion.id_triaje,atencion.id_paciente')
		->select('p.nombre_completo as paciente,p.historia_clinica, p.nombre as nombre_paciente ,  p.apellido as apellido_paciente, p.fecha_nacimiento, TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) as edad, p.telefono, p.numero_documento')
		->select('pe.nombre_completo as personal')
		->select('s.nombre as servicio')
		->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->select('concat(tri.serie," - ",tri.numero)  as numero_triaje,

		tri.peso,tri.talla,tri.presion_arterial,tri.temperatura,tri.frecuencia_respiratoria,tri.frecuencia_cardiaca,
		tri.saturacion')
		->join('atencion', 'atencion.id = plan_atencion.id_atencion', 'left')
		->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
		->join('personal pe', 'pe.id = atencion.id_personal', 'left')
		->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
		->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
		->where('atencion.id_paciente',$data_request["id_paciente"])
		->findAll();

		$diagnostico = [];
		$receta = [];

		foreach ($response as $row) {
			 
			$diagnostico_t = $this->Plan_atencion_diagnostico_m->select('plan_atencion_diagnostico.*')
			->select('di.enfermedad')
			->join('diagnostico di', 'di.id = plan_atencion_diagnostico.id_diagnostico', 'left')
			->where('id_plan_atencion', $row->id)
			->findAll();

				foreach ($diagnostico_t as $di) {
					 
					$diagnostico   [] = $di->enfermedad;

				}

				$receta_d = $this->Plan_atencion_receta_m->select('plan_atencion_receta.*')
				->select('coalesce(um.nombre, "") as unidad_medida')
				->join('con_unidad_medida um', 'um.id = plan_atencion_receta.id_unidad', 'left')
				
				->where('id_plan_atencion', $row->id)->findAll();

				foreach ($receta_d as $di) {
					 
					$receta   [] = $di->medicamento.'/'.$di->unidad_medida;

				}
			 

				$row->diagnostico = implode(', ', $diagnostico);
				$row->receta = implode(', ', $receta);
		}


		return $this->respond($response, 200);
	}


	public function get_liquidar($id_atencion)
	{		
		$data_request = $this->request->getGet();	

		$response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion')
		->select('p.nombre_completo as paciente,p.numero_documento as dni , p.direccion,p.fecha_nacimiento,p.sexo')
		->select('pe.nombre_completo as personal')
		->select('s.nombre as servicio')
		->select('tri.fl_estado')
		->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
		->join('plan_atencion tri', 'tri.id = atencion.id_plan_atencion', 'left')
		->join('paciente p', 'p.id = atencion.id_paciente', 'left')
		->join('personal pe', 'pe.id = atencion.id_personal', 'left')
		->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
		->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
		->where('atencion.id', $id_atencion)
		->where("atencion.id_plan_atencion", null)		 
		->where('atencion.fl_estado', 2)
		->first();	


		
		return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();		

		$usuario = $this->Usuario_m->find(ID_USUARIO);

		if($data_request["tipo"] == 'SIN_ATENCION')
		{
            $response = $this->Atencion_m->select('atencion.*, concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion,atencion.comentario as observacion')
			->select('p.nombre_completo as paciente,p.numero_documento as dni , p.direccion,p.fecha_nacimiento,p.sexo,p.email,p.telefono')
            ->select('pe.nombre_completo as personal,pe.imagen_firma')
            ->select('s.nombre as servicio')
			->select('plan.fl_estado, concat(plan.serie, "-", plan.numero) as plan_atencion')
            ->select('concat(t.tipo_tarifa," - ",t.precio)  as tarifa')
			->select('concat(tri.serie," - ",tri.numero)  as numero_triaje,
			
			tri.peso,tri.talla,tri.presion_arterial,tri.temperatura,tri.frecuencia_respiratoria,tri.frecuencia_cardiaca,
			tri.saturacion')
			->join('plan_atencion plan', 'plan.id = atencion.id_plan_atencion', 'left')
            ->join('paciente p', 'p.id = atencion.id_paciente', 'left')
            ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
            ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
            ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
			->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
			->where("atencion.id_plan_atencion", null)		 
			->where('atencion.fl_estado', 2)
		 
			;
		}
		else
		{

			$response = $this->Plan_atencion_m->select('plan_atencion.*, concat(plan_atencion.serie, "-", plan_atencion.numero) as plan_atencion')
            ->select('concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion, atencion.id_triaje,atencion.id_paciente,p.telefono')
			->select('p.nombre_completo as paciente,p.numero_documento as dni ,p.email, p.direccion,p.fecha_nacimiento,p.sexo,p.historia_clinica, p.nombre as nombre_paciente ,  p.apellido as apellido_paciente, p.fecha_nacimiento, TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) as edad, p.telefono, p.numero_documento')
            ->select('pe.nombre_completo as personal,pe.imagen_firma')
            ->select('s.nombre as servicio')
            ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
			->select('concat(tri.serie," - ",tri.numero)  as numero_triaje,
			
			tri.peso,tri.talla,tri.presion_arterial,tri.temperatura,tri.frecuencia_respiratoria,tri.frecuencia_cardiaca,
			tri.saturacion')
			->join('atencion', 'atencion.id = plan_atencion.id_atencion', 'left')
			->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
            ->join('paciente p', 'p.id = atencion.id_paciente', 'left')
            ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
            ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
            ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
			->where('DATE_FORMAT(plan_atencion.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
			->where('DATE_FORMAT(plan_atencion.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
			
			;
		}

		if ($data_request["id_paciente"] != null && $data_request["id_paciente"] != '' ) {

			$response ->where('atencion.id_paciente',$data_request["id_paciente"]);
		}

		if ($usuario->tipo != 'SUPER ADMINISTRADOR') {
				
			$response ->groupStart()
					->orWhere('atencion.id_personal', $usuario->id_personal)
					->orWhere('atencion.id_usuario', ID_USUARIO)
				->groupEnd();

		/* 	$response ->where('atencion.id_personal',$usuario->id_personal); */
			
		}
		$response = $response->findAll();

		if($data_request["tipo"] != 'SIN_ATENCION')
		{

			foreach ($response as $row) {

				$row->triaje = $this->Triaje_m->where('id', $row->id_triaje)->first();
				$row->diagnostico = $this->Plan_atencion_diagnostico_m->select('plan_atencion_diagnostico.*')
				->select('di.enfermedad')
				->join('diagnostico di', 'di.id = plan_atencion_diagnostico.id_diagnostico', 'left')
				->where('id_plan_atencion', $row->id)
				->findAll();
				$row->receta = $this->Plan_atencion_receta_m->select('plan_atencion_receta.*')
				->select('coalesce(um.nombre, "") as unidad_medida')
				->join('con_unidad_medida um', 'um.id = plan_atencion_receta.id_unidad', 'left')
				
				->where('id_plan_atencion', $row->id)->findAll();

				$row->signo_peligro = $this->Triaje_signo_peligro_m->where('id_triaje', $row->id_triaje)->findAll();
		
				$row->tratamiento = $this->Plan_atencion_tratamiento_m->where('id_plan_atencion', $row->id)->findAll();
				$row->empresa = $this->Empresa_m->find(ID_EMPRESA);

				$row->patologia_clinica = $this->Patologia_clinica_m->select('patologia_clinica.*')
				->select('t.nombre as servicio')
				->join('tipo_servicio t','t.id = patologia_clinica.id_analisis')
				->where('id_plan_atencion', $row->id)
				->findAll();
			 

				$row->diagnostico_config = $this->Detalle_atencion_diagnostigo_config_m
				->select('detalle_atencion_diagnostigo_config.*')
				->select('t.nombre')
				->join('diagnostico_config t','t.id = detalle_atencion_diagnostigo_config.id_diagnostico')
				->where('id_plan_atencion', $row->id)->findAll();
			}

		
		}

		return $this->respond(['data' => $response], 200);
	}



	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('operacion-plan_atencion', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('operacion-plan_atencion', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'fecha' 					=> trim($data_request["fecha"]),
				'antecedente'				=> trim($data_request["antecedente"]),
				'motivo'					=> trim($data_request["motivo"]),
				'examen_fisico'				=> trim($data_request["examen_fisico"]),
				'tratamiento'				=> trim($data_request["tratamiento"]),
				'plan'						=> trim($data_request["plan"]),
				'observacion'				=> trim($data_request["observacion"]),
				'observacion_anatomia_patologica'				=> trim($data_request["observacion_anatomia_patologica"]),
				'observacion_diagnostico_imagenes'				=> trim($data_request["observacion_diagnostico_imagenes"]),
				'observacion_intervencion_quirurjica'				=> trim($data_request["observacion_intervencion_quirurjica"]),

			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$correlativo = $this->Plan_atencion_m->get_correlativo(date("Y"));
				$data["numero"] = $correlativo->numero;
				$data["serie"] = $correlativo->serie;

				$data["id_usuario"] = ID_USUARIO;
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_local"] = ID_LOCAL;
				$data["fecha_sistema"] = date("Y-m-d H:i:s");
				$data["fl_estado"] = 1;
				$data["id_atencion"] = trim($data_request["id_atencion"]);
			}

			$this->Plan_atencion_m->save($data);

			$id_plan_atencion = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/****** SAVE  */
		 
			$this->Helper->eliminar_registros_detalle('plan_atencion_diagnostico', 'id_plan_atencion', $id_plan_atencion, json_decode($data_request["detalle_diagnostico"]));

			foreach (json_decode($data_request["detalle_diagnostico"]) as $row) {

				$data_plan_atencion_diagnostico = [
					'id_diagnostico'	=> $row->id_diagnostico,
					'tipo'				=> $row->tipo,
					'id_plan_atencion'	=> $id_plan_atencion,
				];

				if(is_numeric($row->id))
				{
					$data_plan_atencion_diagnostico["id"] = $row->id;
				}

				$this->Plan_atencion_diagnostico_m->save($data_plan_atencion_diagnostico);
			}

			
			/****** SAVE  */
		 
			$this->Helper->eliminar_registros_detalle('plan_atencion_receta', 'id_plan_atencion', $id_plan_atencion, json_decode($data_request["detalle_receta"]));

			foreach (json_decode($data_request["detalle_receta"]) as $row) {

				$data_plan_atencion_receta = [
					'medicamento'		=> $row->medicamento,
					'id_unidad'			=> $row->id_unidad,
					'frecuencia'		=> $row->frecuencia,
					'periodo'			=> $row->periodo,
					'unidad_tiempo'		=> $row->unidad_tiempo, 
					'cantidad'			=> $row->cantidad, 
					'id_plan_atencion'	=> $id_plan_atencion,
				];
				 
				if(is_numeric($row->id))
				{
					$data_plan_atencion_receta ["id"] = $row->id;
				}

				$this->Plan_atencion_receta_m->save($data_plan_atencion_receta );
			}
	

/* 			$this->Helper->eliminar_registros_detalle('plan_atencion_tratamiento', 'id_plan_atencion', $id_plan_atencion, json_decode($data_request["detalle_tratamiento"]));

			foreach (json_decode($data_request["detalle_tratamiento"]) as $row) {

				$data_plan_atencion_tratamiento = [
					'medicamento'		=> $row->medicamento,
					'id_unidad'			=> $row->id_unidad,
					'frecuencia'		=> $row->frecuencia,
					'periodo'			=> $row->periodo,
					'unidad_tiempo'		=> $row->unidad_tiempo, 
					'cantidad'			=> $row->cantidad, 
					'id_plan_atencion'	=> $id_plan_atencion,
				];
				 
			 


				if(is_numeric($row->id))
				{
					$data_plan_atencion_tratamiento ["id"] = $row->id;
				}

				$this->Plan_atencion_tratamiento_m->save($data_plan_atencion_tratamiento );
			} */
	 
			$this->Helper->eliminar_registros_detalle('patologia_clinica', 'id_plan_atencion', $id_plan_atencion, json_decode($data_request["patologia_clinica"]));

			foreach (json_decode($data_request["patologia_clinica"]) as $row) {

				$data_patologia_clinica = [
					'id_analisis'		=> $row->id_analisis,
					'id_plan_atencion'	=> $id_plan_atencion,
				];
				 
				if(is_numeric($row->id))
				{
					$data_patologia_clinica ["id"] = $row->id;
				}

				$this->Patologia_clinica_m->save($data_patologia_clinica );
			}

				/*** VINCULAR A ATENCIÓN */

			if(!isset($data_request["id"]))
			{
				$data_atencion = [
					'id'					=> $data_request["id_atencion"],
					'id_plan_atencion'		=> $id_plan_atencion,
					'fl_estado'				=> 3,
				];
	
				$this->Atencion_m->save($data_atencion);
			}
			

	


						/****** SAVE anatomia_patologica  */

						$this->Detalle_atencion_diagnostigo_config_m->where('id_plan_atencion', $id_plan_atencion)
						->where('tipo', 'ANATOMIA PATOLOGICA')
						->delete();

						foreach (json_decode($data_request["anatomia_patologica"]) as $row) {
			
							$data_anatomia_patologica = [
								'id_diagnostico'	=> $row->id_diagnostico,
								'tipo'				=> 'ANATOMIA PATOLOGICA',
								'id_plan_atencion'	=> $id_plan_atencion,
							];
			
					 
			
							$this->Detalle_atencion_diagnostigo_config_m->save($data_anatomia_patologica);
						}

						/****** SAVE diagnostico_imagenes  */

						$this->Detalle_atencion_diagnostigo_config_m->where('id_plan_atencion', $id_plan_atencion)
						->where('tipo', 'DIAGNOSTICO POR IMAGENES')
						->delete();

						foreach (json_decode($data_request["diagnostico_imagenes"]) as $row) {
			
							$data_diagnostico_imagenes = [
								'id_diagnostico'	=> $row->id_diagnostico,
								'tipo'				=> 'DIAGNOSTICO POR IMAGENES',
								'id_plan_atencion'	=> $id_plan_atencion,
							];
			
						
			
							$this->Detalle_atencion_diagnostigo_config_m->save($data_diagnostico_imagenes);
						}
		

						/****** SAVE diagnostico_imagenes  */

						$this->Detalle_atencion_diagnostigo_config_m->where('id_plan_atencion', $id_plan_atencion)
						->where('tipo', 'INTERVENCION QUIRURGICA')
						->delete();

						foreach (json_decode($data_request["intervencion_quirurjica"]) as $row) {
			
							$data_intervencion_quirurjica = [
								'id_diagnostico'	=> $row->id_diagnostico,
								'tipo'				=> 'INTERVENCION QUIRURGICA',
								'id_plan_atencion'	=> $id_plan_atencion,
							];
			
						
			
							$this->Detalle_atencion_diagnostigo_config_m->save($data_intervencion_quirurjica);
						}
				

						$plan_atencion = $this->Plan_atencion_m->select('atencion.id_paciente')->join('atencion', 'atencion.id = plan_atencion.id_atencion')->find($id_plan_atencion);

						$this->Historial_vacuna_m->where('id_atencion', $id_plan_atencion)->delete();

						foreach (json_decode($data_request["vacunas"]) as $row) {
			
							$data_vacunas = [
								'id_vacuna'		=> $row->id,
								'fecha'			=> $row->fecha,
								'id_paciente'	=> $plan_atencion->id_paciente ,
								'id_atencion'	=> $id_plan_atencion,
							];
			
						
			
							$this->Historial_vacuna_m->save($data_vacunas);
						}
			
	

			/****************** SAVE CENTINELA *****************/
			$plan_atencion = $this->Plan_atencion_m->find($id_plan_atencion);

			$data_centinela = [
				'modulo'		=> 'OPERACIÓN',
				'menu'			=> 'plan_atencion',
				'accion'		=> 'NUEVO',
				'descripcion'	=> 'plan_atencion :'.$plan_atencion->serie.'-'.$plan_atencion->numero
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

		 
			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'fl_enviar'	=> 1,'id_plan_atencion'	=> $id_plan_atencion,], 200);

		 

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('operacion-plan_atencion', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$plan_atencion = $this->Plan_atencion_m->find($data_request["id_delete"]);

			/** DESVINCULAR DE VIAJE */
			$data_ = [
				'id'		=> $plan_atencion->id_atencion,
				'id_plan_atencion'	=> null,
				'fl_estado'	=> 2,
			];

			$this->Atencion_m->save($data_);

			/** SAVE */
			$data_plan= [
				'id'		=> $data_request["id_delete"],
				'fl_estado'	=> 0
			];

			$this->Plan_atencion_m->save($data_plan);     

			/****************** SAVE CENTINELA *****************/
			$plan_atencion = $this->Plan_atencion_m->select('concat(v.serie,"-",v.numero) as plan_atencion')
			->join('atencion v', 'v.id = plan_atencion.id_atencion')
			->find($data_request["id_delete"]);

			$data_centinela = [
				'modulo'		=> 'TESORERIA',
				'menu'			=> 'LIQUIDACIÓN DE TERCEROS',
				'accion'		=> 'ANULAR',
				'descripcion'	=>  'Plan  : '.$plan_atencion->plan_atencion
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		

	public function enviar_email()
	{
		 
		 
		
		try {

			$db = \Config\Database::connect();
			$data_request = $this->request->getPost();
			
			$atencion = $this->Plan_atencion_m->select('plan_atencion.*, concat(plan_atencion.serie, "-", plan_atencion.numero) as plan_atencion')
            ->select('concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion, atencion.id_triaje,atencion.id_paciente')
			->select('p.nombre_completo as paciente,p.numero_documento as dni ,p.telefono, p.direccion,p.fecha_nacimiento,p.sexo,p.historia_clinica, p.nombre as nombre_paciente ,  p.apellido as apellido_paciente, p.fecha_nacimiento, TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) as edad, p.telefono, p.numero_documento')
            ->select('pe.nombre_completo as personal,pe.imagen_firma')
            ->select('s.nombre as servicio')
            ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
			->select('concat(tri.serie," - ",tri.numero)  as numero_triaje,
			
			tri.peso,tri.talla,tri.presion_arterial,tri.temperatura,tri.frecuencia_respiratoria,tri.frecuencia_cardiaca,
			tri.saturacion')
			->select('e.razon_social as empresa,e.numero_documento as ruc_empresa')

			->join('atencion', 'atencion.id = plan_atencion.id_atencion', 'left')
			->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
            ->join('paciente p', 'p.id = atencion.id_paciente', 'left')
            ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
            ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
            ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
			->join('empresa e', 'e.id = plan_atencion.id_empresa', 'left')	
			->find($data_request["id"]);
	 
			$atencion->diagnostico = $this->Plan_atencion_diagnostico_m->select('plan_atencion_diagnostico.*')
			->select('di.enfermedad')
			->join('diagnostico di', 'di.id = plan_atencion_diagnostico.id_diagnostico', 'left')
			->where('id_plan_atencion',$data_request["id"])
			->findAll();


			$atencion->receta = $this->Plan_atencion_receta_m->select('plan_atencion_receta.*')
			->select('coalesce(um.nombre, "") as unidad_medida')
			->join('con_unidad_medida um', 'um.id = plan_atencion_receta.id_unidad', 'left')
			
			->where('id_plan_atencion', $data_request["id"])->findAll();

			$configuracion = $db->table('static_system')->get()->getRow();

			$email = \Config\Services::email();

			$config['mailType'] = 'html';

			$email->initialize($config);

			$email->setFrom($configuracion->email_robot, $configuracion->empresa);
			$email->setTo($data_request["email"]);

			$data = [
				'atencion'	=> $atencion
			];

			$htmlContent = view('email/historia', $data);

		 
			$email->setSubject('Historial Clinico '.$atencion->historia_clinica .' | '.$atencion->paciente);
			$email->setMessage($htmlContent);

			$file = $this->request->getFile('archivo');

			$Upload_m = new Upload_model();			
			$archivo = $Upload_m->guardar($this->request->getFile('archivo'), 'factura', (isset($data_request["archivo_anterior"])) ? $data_request["archivo_anterior"] : null);
 				

			if($file->getTempName() != "")
			{
				$email->attach($_ENV['BASE_URL_FRONTEND'].'/server/public/writable/uploads/'.$archivo);

				/* $email->attach($file->getTempName(), 'attachment', $file->getClientName(), $file->getClientMimeType()); */
			}

			$email->send();
			return $this->respond(['mensaje' => 'Enviado Correctamente'], 200);

		} catch (\Exception $e)
		{
		return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
		
	}


	public function enviar_email_automatico($id)
	{
		 
		 
		
		try {

			$db = \Config\Database::connect();
			$data_request = $this->request->getPost();
			
			$atencion = $this->Plan_atencion_m->select('plan_atencion.*, concat(plan_atencion.serie, "-", plan_atencion.numero) as plan_atencion')
            ->select('concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion, atencion.id_triaje,atencion.id_paciente')
			->select('p.nombre_completo as paciente,p.email,p.numero_documento as dni ,p.telefono, p.direccion,p.fecha_nacimiento,p.sexo,p.historia_clinica, p.nombre as nombre_paciente ,  p.apellido as apellido_paciente, p.fecha_nacimiento, TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) as edad, p.telefono, p.numero_documento')
            ->select('pe.nombre_completo as personal,pe.imagen_firma')
            ->select('s.nombre as servicio')
            ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
			->select('concat(tri.serie," - ",tri.numero)  as numero_triaje,
			
			tri.peso,tri.talla,tri.presion_arterial,tri.temperatura,tri.frecuencia_respiratoria,tri.frecuencia_cardiaca,
			tri.saturacion')
			->select('e.razon_social as empresa,e.numero_documento as ruc_empresa')

			->join('atencion', 'atencion.id = plan_atencion.id_atencion', 'left')
			->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
            ->join('paciente p', 'p.id = atencion.id_paciente', 'left')
            ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
            ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
            ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
			->join('empresa e', 'e.id = plan_atencion.id_empresa', 'left')	
			->find($id);
	 
			$atencion->diagnostico = $this->Plan_atencion_diagnostico_m->select('plan_atencion_diagnostico.*')
			->select('di.enfermedad')
			->join('diagnostico di', 'di.id = plan_atencion_diagnostico.id_diagnostico', 'left')
			->where('id_plan_atencion',$id)
			->findAll();


			$atencion->receta = $this->Plan_atencion_receta_m->select('plan_atencion_receta.*')
			->select('coalesce(um.nombre, "") as unidad_medida')
			->join('con_unidad_medida um', 'um.id = plan_atencion_receta.id_unidad', 'left')
			
			->where('id_plan_atencion', $id)->findAll();

			$configuracion = $db->table('static_system')->get()->getRow();

			$email = \Config\Services::email();

			$config['mailType'] = 'html';

			$email->initialize($config);

			$email->setFrom($configuracion->email_robot, $configuracion->empresa);
			$email->setTo($atencion->email);

			$data = [
				'atencion'	=> $atencion
			];

			$htmlContent = view('email/historia', $data);
 
			$email->setSubject('Historial Clinico '.$atencion->historia_clinica .' | '.$atencion->paciente);
			$email->setMessage($htmlContent);

		 
			$email->send();


			$Twilio_mensajeria_controller = new Twilio_mensajeria();

			// ENVIO DE MENSAJE  

				$numero_celular = $atencion->telefono;

				if ($numero_celular != '' or $numero_celular != nul) {
					
					$receta = [];

					foreach ($atencion->receta as $row) {
						
						$receta [] = ' '.$row->medicamento.' '.$row->cantidad.' '.$row->unidad_medida ;

					}

					$rece = implode(",",$receta);	

				$mensaje_ = 'SAN JUAN DE LA LIBERTAD HISTORIA CLINICA N° '.$atencion->historia_clinica. ' Se hace presente el historial de su atencion Fecha de Atención: '.date("d/m/Y", strtotime($atencion->fecha)) .
				' Dr Atención: '. $this->Helper->limpiar_nombre_twilio($atencion->personal). ' esto es la Receta '.$rece.', gracias.';


	
					$data_sms_destinatario = [
						'numero_destino'	=> $numero_celular,
						'codigo_pais'		=> '+51',
						'mensaje'			=> $mensaje_,
						'fl_whatsapp'		=> false
					];
					
					$Twilio_mensajeria_controller->send($data_sms_destinatario);

				}

			


			return $this->respond(['mensaje' => 'Enviado Correctamente'], 200);

		} catch (\Exception $e)
		{
		return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
		
	}

	public function enviar_sms()
	{
		 
		 
		
		try {

			$db = \Config\Database::connect();
			$data_request = $this->request->getPost();
			
			$atencion = $this->Plan_atencion_m->select('plan_atencion.*, concat(plan_atencion.serie, "-", plan_atencion.numero) as plan_atencion')
            ->select('concat(atencion.serie, "-", atencion.numero) as atencion, atencion.id as id_atencion, atencion.id_triaje,atencion.id_paciente')
			->select('p.nombre_completo as paciente,p.numero_documento as dni ,p.telefono, p.direccion,p.fecha_nacimiento,p.sexo,p.historia_clinica, p.nombre as nombre_paciente ,  p.apellido as apellido_paciente, p.fecha_nacimiento, TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) as edad, p.telefono, p.numero_documento')
            ->select('pe.nombre_completo as personal,pe.imagen_firma')
            ->select('s.nombre as servicio')
            ->select('concat(t.tipo_tarifa," - ",t.precio)   as tarifa')
			->select('concat(tri.serie," - ",tri.numero)  as numero_triaje,
			
			tri.peso,tri.talla,tri.presion_arterial,tri.temperatura,tri.frecuencia_respiratoria,tri.frecuencia_cardiaca,
			tri.saturacion')
			->select('e.razon_social as empresa,e.numero_documento as ruc_empresa')

			->join('atencion', 'atencion.id = plan_atencion.id_atencion', 'left')
			->join('triaje tri', 'tri.id = atencion.id_triaje', 'left')
            ->join('paciente p', 'p.id = atencion.id_paciente', 'left')
            ->join('personal pe', 'pe.id = atencion.id_personal', 'left')
            ->join('tipo_servicio s', 's.id = atencion.id_servicio', 'left')
            ->join('tarifa t', 't.id = atencion.id_tarifa', 'left')
			->join('empresa e', 'e.id = plan_atencion.id_empresa', 'left')	
			->find($data_request["id"]);
	 
			$atencion->diagnostico = $this->Plan_atencion_diagnostico_m->select('plan_atencion_diagnostico.*')
			->select('di.enfermedad')
			->join('diagnostico di', 'di.id = plan_atencion_diagnostico.id_diagnostico', 'left')
			->where('id_plan_atencion',$data_request["id"])
			->findAll();


			$atencion->receta = $this->Plan_atencion_receta_m->select('plan_atencion_receta.*')
			->select('coalesce(um.nombre, "") as unidad_medida')
			->join('con_unidad_medida um', 'um.id = plan_atencion_receta.id_unidad', 'left')
			
			->where('id_plan_atencion', $data_request["id"])->findAll();

			$configuracion = $db->table('static_system')->get()->getRow();


			 
			
			$Twilio_mensajeria_controller = new Twilio_mensajeria();

			// ENVIO DE MENSAJE  

				$numero_celular = $atencion->telefono;

				$receta = [];

					foreach ($atencion->receta as $row) {
						
						$receta [] = ' '.$row->medicamento.' '.$row->cantidad.' '.$row->unidad_medida ;

					}

					$rece = implode(",",$receta);	

				$mensaje_ = 'SAN JUAN DE LA LIBERTAD HISTORIA CLINICA N° '.$atencion->historia_clinica. ' Se hace presente el historial de su atencion Fecha de Atención: '.date("d/m/Y", strtotime($atencion->fecha)) .
				' Dr Atención: '. $this->Helper->limpiar_nombre_twilio($atencion->personal). ' esto es la Receta '.$rece.', gracias.';

				$data_sms_destinatario = [
					'numero_destino'	=> trim($data_request["telefono"]),
					'codigo_pais'		=> '+51',
					'mensaje'			=> $mensaje_,
					'fl_whatsapp'		=> false
				];


				
				$Twilio_mensajeria_controller->send($data_sms_destinatario);

		 




			return $this->respond(['mensaje' => 'Enviado Correctamente'], 200);

		} catch (\Exception $e)
		{
		return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
		
	}




}
