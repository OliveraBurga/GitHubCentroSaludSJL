<?php namespace App\Controllers\Recursos;

use App\Controllers\BaseController;

class Busqueda extends BaseController
{
	public function __construct()
	{
		$this->db = \Config\Database::connect();
		$this->curl = \Config\Services::curlrequest();
	}

	public function reniec_sunat()
	{
		$data_request = $this->request->getGet();
		
		if(strlen($data_request["numero"]) == 11)
		{
 		
			$token = 'apis-token-1495.DIzDbXLL4cFH8pXytda9mpwZRCVoFpOj';
				$ruc = $data_request["numero"];

				// Iniciar llamada a API
				$curl = curl_init();

				// Buscar ruc sunat
				curl_setopt_array($curl, array(
				CURLOPT_URL => 'https://api.apis.net.pe/v1/ruc?numero=' . $ruc,
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => '',
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 0,
				CURLOPT_FOLLOWLOCATION => true,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => 'GET',
				CURLOPT_HTTPHEADER => array(
					'Referer: http://apis.net.pe/api-ruc',
					'Authorization: Bearer ' . $token
				),
				));

				$response = curl_exec($curl);

				curl_close($curl);
				
				$data = json_decode($response , true);
			 
				
  

			$response = [
				'response' 			=> $data,
				'numero' 			=> $data["numeroDocumento"] ,
				'razon_social' 		=> $data["nombre"] ,
				'nombre' 			=> '',
				'apellido' 			=> '',
				'fecha_nacimiento'	=> '',
				'direccion'			=> $data["direccion"] ,
				'ubigeo' 	    	=> '',
				'condicion'			=> $data["condicion"] ,
			];

			return $this->respond($response, 200);
		}

		else if(strlen($data_request["numero"]) == 8)
		{
			 

			$token = 'apis-token-1.aTSI1U7KEuT-6bbbCguH-4Y8TI6KS73N';
			$dni = $data_request["numero"];
			
			// Iniciar llamada a API
			$curl = curl_init();
			
			// Buscar dni
			curl_setopt_array($curl, array(
			  CURLOPT_URL => 'https://api.apis.net.pe/v1/dni?numero=' . $dni,
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => '',
			  CURLOPT_MAXREDIRS => 2,
			  CURLOPT_TIMEOUT => 0,
			  CURLOPT_FOLLOWLOCATION => true,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => 'GET',
			  CURLOPT_HTTPHEADER => array(
				'Referer: https://apis.net.pe/consulta-dni-api',
				'Authorization: Bearer ' . $token
			  ),
			));
			
			$response = curl_exec($curl);
			
			curl_close($curl);
			// Datos listos para usar
			$dni = json_decode($response, true);

		 
 
			$response = [
				'response' 			=> $dni,
				'numero' 			=> $dni["numeroDocumento"] ,
				'razon_social' 		=> $dni["nombre"] ,
				'nombre' 			=> $dni["nombres"] ,
				'apellido' 			=> $dni["apellidoPaterno"].'  '.$dni["apellidoMaterno"] ,
				'fecha_nacimiento'	=> '' ,
				'direccion'			=> '',
				'ubigeo' 	    	=> '',
				'condicion'			=> ''
			];  

			return $this->respond($response, 200);
		}
		else
		{
			$response = [
				'mensaje' => 'Número de Documento no válido',
				'tipo'	=> 'danger'
			];
			return $this->respond($response, 400);
		}
		
	}
		
}
