<?php namespace App\Controllers;

use App\Libraries\CreatorJwt;
use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Superusuario\Membresia_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Configuracion\Config_modulo_model;

use CodeIgniter\Controller;

class Autenticacion extends Controller
{
	use ResponseTrait;

	public function __construct()
	{
		$this->CreatorJwt = new CreatorJwt();
		$this->Helper = new Helper_model();
		$this->Membresia_m = new Membresia_model();
		$this->Empresa_m = new Empresa_model();
		$this->Usuario_m = new Usuario_model();
		$this->Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$this->Config_modulo_m = new Config_modulo_model();
	}

	public function login($data_request = null)
	{		
		if($data_request == null)
		{
			$data_request = $this->request->getPost();
		}
		
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->where('usuario', $data_request["usuario"])
		->orwhere('usuario.email', $data_request["usuario"])
		->first();

		if(is_object($usuario))
		{
			if($usuario->fl_suspendido == 1)
			{
				return $this->respond(['mensaje' => 'Usuario Suspendido', 'tipo' => 'warning'], 400);
			}

			if($usuario->fl_suspendido == 2)
			{
				return $this->respond(['mensaje' => 'Activar Cuenta', 'tipo' => 'warning'], 400);
			}

			$password_form = hash('sha512', $data_request["password"] . $usuario->salt);

			if($usuario->password == $password_form)
			{
				$login_date = Date('Y-m-d h:i:s');
				$tokenData['uniqueId'] = $usuario->id;
				$tokenData['role'] = $usuario->tipo;
				$tokenData['timeStamp'] = $login_date;
				$jwtToken = $this->CreatorJwt->GenerateToken($tokenData);

				$Usuario_m->save([
					'id' 			=> $usuario->id, 
					'login_date' 	=> $login_date,
					'token'			=> $jwtToken
				]);

				return $this->respond(['Token' => $jwtToken], 200);
			}

			else
			{
				return $this->respond(['mensaje' => 'Usuario o Contraseña incorrecta', 'tipo' => 'warning'], 400);
			}

		}
		else
		{
			return $this->respond(['mensaje' => 'Usuario o Contraseña incorrecta', 'tipo' => 'warning'], 400);
		}	
		
	}

	public function recuperar()
	{
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->select('salt')
							->where('email', $data_request["email"])
							->first();

		if(is_object($usuario))
		{
			$db = \Config\Database::connect();
			$system = $db->table('static_system')->get()->getRow();

			$email = \Config\Services::email();

			$config['mailType'] = 'html';

			$email->initialize($config);

			$email->setFrom($system->email_robot, $system->empresa);
			$email->setTo($data_request["email"]);

			$htmlContent = '<p><a href="'.$_ENV['BASE_URL_FRONTEND'].'#/restablecer/'.$usuario->salt.'">Haz click aquí para restablecer tu contraseña</a></p>';
			$email->setSubject('Restablecer Contraseña');
			$email->setMessage($htmlContent);

			$email->send();
			$mensaje = 'Hemos enviado un mensaje a '.$data_request["email"].' para que puedas retablecer tu contraseña';
			return $this->respond(['mensaje' => $mensaje], 200);
		}
		else
		{
			return $this->respond(['mensaje' => 'Correo electrónico no existe'], 400);
		}
	}

	public function restablecer_verificar()
	{
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->where('salt', $data_request["s"])->first();

		if(is_object($usuario))
		{
			return $this->respond($usuario, 200);
		}
		else
		{
			return $this->respond(['mensaje' => 'Error de validación'], 400);
		}
	}

	public function registrar()
	{
		
		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->transStart();			

			/** GUARDAR */
			$data = [
				'nombre'				=> trim($data_request["numero_documento"]),
				//'token_integracion'		=> trim($data_request["token_integracion"]),
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}

			$this->Membresia_m->save($data);

			/** CREAR AUTOMATIC */
			if(!isset($data_request["id"]))
			{
				$id_membresia = $db->insertID();

				/*** EMPRESA */
				$data_empresa = [
					'logo' 				=> 'sin_imagen.jpg',
					'id_membresia'		=> $id_membresia,
					'numero_documento'	=> $data_request["numero_documento"],
					'telefono'			=> $data_request["telefono"],
					'email'				=> $data_request["email"],
				];

				$this->Empresa_m->save($data_empresa);

				$id_empresa = $db->insertID();



				/** USUARIO */

				$data = [
					'nombre'			=> trim($data_request["nombre"]),
					'apellido'    		=> trim($data_request["apellido"]),
					'email'				=> trim($data_request["email"]),
					'usuario'			=> trim($data_request["numero_documento"]),
					'id_empresa'		=> $id_empresa ,
					'fl_suspendido'		=> 2 ,
					'id_membresia'		=> 	$id_membresia ,
					'imagen'			=>'sin_imagen.jpg',
					'tipo'          	=> 'SUPER ADMINISTRADOR',
					'fl_cambio_local'	=> 1
				];

				if(isset($data_request["id"]))
				{
					$data["id"] = $data_request["id"];
				}
				else
				{
					$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
					$password = hash('sha512', $data_request["password"] . $random_salt);

					$data["password"] = $password;
					$data["salt"] = $random_salt;
				}

				$this->Usuario_m->save($data);



				/*** AJUSTES AVANZADOS */
				$data_ajuste = [
					'porcentaje_detraccion'			=> 4,
					'porcentaje_igv'				=> 18,
					'id_empresa'					=> $id_empresa
				];

				$this->Ajuste_avanzado_m->insert($data_ajuste);

				/*** AJUSTES AVANZADOS */
				$data_ajuste = [
					'id_empresa'					=> $id_empresa
				];

				$this->Config_modulo_m->insert($data_ajuste); 
			}

			$db->transComplete();

			return $this->activar_cuenta($data_request["email"]) ;

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


	public function activar_cuenta($emaill)
	{

		
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->select('salt,nombre')
							->where('email',$emaill)
							->first();

		if(is_object($usuario))
		{
			
			$db = \Config\Database::connect();
			$system = $db->table('static_system')->get()->getRow();
	
			$email = \Config\Services::email();
		
			$config['mailType'] = 'html';

			$email->initialize($config);

			$email->setFrom($system->email_robot, $system->empresa);
			$email->setTo($emaill);

			$htmlContent = view('email/activar_cuenta', ['data' => $usuario]);

		 	//$htmlContent = '<p><a href="'.$_ENV['BASE_URL_FRONTEND'].'#/restablecer/'.$usuario->salt.'">Haz click aquí para Activar  tu cuenta</a></p>';
			$email->setSubject('Restablecer Contraseña');
			$email->setMessage($htmlContent);

			$email->send();
			$mensaje = 'Hemos enviado un mensaje a '.$emaill.' para que puedas activar tu cuenta';
			return $this->respond(['mensaje' => $mensaje], 200);
		}
		else
		{
			return $this->respond(['mensaje' => 'Correo electrónico no existe'], 400);
		}
	}


	public function activar_cuenta_user()
    {
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		try {

			$db = \Config\Database::connect();
			$db->transStart();			

			$usuario = $Usuario_m->select('id, email')
								->where('salt', $data_request["salt"])
								->first();

			if(is_object($usuario))
			{
				$Usuario_m = new Usuario_model();

				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
			 

				$data = array(
					'fl_suspendido'	=>null,
					'salt'        	=> $random_salt,
					'id'  			=> $usuario->id,
				);

				if($Usuario_m->save($data))
				{
					$data_request["usuario"] = $usuario->email;
					$data_request["clave"] = $usuario->password;

					$db->transComplete();

					return $this->login($data_request);
				}
				else
				{
					return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->errores($Usuario_m->errors())], 400);
				}

			}
			else
			{
				return $this->respond(['mensaje' => 'Error'], 400);
			}

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}

	}
	
	public function restablecer()
    {
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		try {

			$db = \Config\Database::connect();
			$db->transStart();			

			$usuario = $Usuario_m->select('id, email')
								->where('salt', $data_request["salt"])
								->first();

			if(is_object($usuario))
			{
				$Usuario_m = new Usuario_model();

				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				$password = hash('sha512', $data_request["password"] . $random_salt);

				$data = array(
					'password'      => $password,
					'salt'        	=> $random_salt,
					'id'  			=> $usuario->id,
				);

				if($Usuario_m->save($data))
				{
					$data_request["usuario"] = $usuario->email;
					$data_request["clave"] = $data_request["password"];

					$db->transComplete();

					return $this->login($data_request);
				}
				else
				{
					return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->errores($Usuario_m->errors())], 400);
				}

			}
			else
			{
				return $this->respond(['mensaje' => 'Error'], 400);
			}

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}

	}
	
	public function logout()
	{

		$received_Token = $this->request->getServer('HTTP_TOKEN');
		
		$jwtData = $this->CreatorJwt->DecodeToken($received_Token);

		$Usuario_m = new Usuario_model;
		$usuario = $Usuario_m->where('tipo', $jwtData["role"])
		->where('login_date', $jwtData["timeStamp"])
		->where('token', $received_Token)
		->where('id', $jwtData["uniqueId"])
		->first();


		$Usuario_m = new Usuario_model();
		
			$usuario = $Usuario_m->save(
				[
					'id'	=> $usuario->id,
					'token'	=> ''
				]
			);	
		
		return $this->respond([], 200);
	}
	

	//--------------------------------------------------------------------

}
