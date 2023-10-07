<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Diagnostico_model;

class Diagnostico extends BaseController
{
	public function __construct()
	{
		$this->Diagnostico_m = new Diagnostico_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Diagnostico_m->select("id,concat(codigo,'-', enfermedad) as text")
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->Diagnostico_m->where('id_empresa', ID_EMPRESA)		
		->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-diagnostico', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-diagnostico', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR */
			$data = [
				'codigo'               		=> trim($data_request["codigo"]),
				'enfermedad'				=> trim($data_request["enfermedad"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
			}
			$this->Diagnostico_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'DIAGNÓSTICO',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["enfermedad"])
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
		$this->Helper->validar_permisos('configuracion-diagnostico', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$diagnostico = $this->Diagnostico_m->find($data_request["id"]);

			$this->Diagnostico_m->where('id', $data_request["id"])->delete();

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'DIAGNÓSTICO',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $diagnostico->enfermedad
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
		

	public function save_importacion()
	{
		ini_set('memory_limit', '-1');
		set_time_limit(300);

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('operacion-tarifa', 'new');
		

		$respuesta = explode(".", $_FILES["archivo"]['name']);		
		$extension = $respuesta[(count($respuesta))-1];
	
		if($extension == 'xlsx')
		{			
			require_once APPPATH."Libraries/phpexcel/PHPExcel.php";
			
			try {
				
				$db = \Config\Database::connect();
				$db->query('SET AUTOCOMMIT = 0');
				$db->transStart();
				$db->query('LOCK TABLES diagnostico write, centinela write ');
				
				
				$file_archivo = $_FILES["archivo"];
				$excelReader = \PHPExcel_IOFactory::createReaderForFile($file_archivo['tmp_name']);
				$hoja = $excelReader->load($file_archivo['tmp_name'])->getSheet(0);

				$ultima_fila = $hoja->getHighestRow();
				
				// SAVE DATA
				$array_batch = [];

				for ($fila = 2; $fila <= $ultima_fila; $fila++) {	

						$data_save = [
							'codigo'				=>	$this->Helper->limpiar_nombre(trim($hoja->getCell('A'.$fila)->getValue())),
							'enfermedad'				=> 	$this->Helper->limpiar_nombre(trim($hoja->getCell('B'.$fila)->getValue())),
						];

						$array_batch[] = $data_save;
						
				 
				}

 

				foreach ($array_batch as $row) {

				
                    $ruta = $this->Diagnostico_m->where('codigo', $row['codigo'])->where('enfermedad', $row['enfermedad'])->first();
				

                    if (!is_object($ruta)) {
                     
                     
						$data = [  

							'codigo'        		=>   $row['codigo'],
							'enfermedad'         	=>   $row['enfermedad'],
						];
	
					
						$data["id_empresa"] = ID_EMPRESA;
					
	
						$this->Diagnostico_m->save($data);


                    }
					

				}		
				

				$db->query('UNLOCK TABLES');
				$db->transComplete();

				return $this->respond(['tipo' => 'success', 'mensaje' => 'Proceso completado, '.count($array_batch) .' Diagnostico  creados '], 200);							

			} catch (\Exception $e) {
				return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
			}
			
		}
		else
		{
			return $this->respond(['tipo' => 'danger', 'mensaje' => 'Archivo con formato incorrecto, asegúrese que la extensión del archivo excel sea .xlsx'], 400);
		}
	}



}
