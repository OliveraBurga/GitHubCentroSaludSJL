<?php namespace App\Controllers;

use App\Libraries\CreatorJwt;
use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Permiso_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Moneda_model;
use CodeIgniter\Controller;

class App extends BaseController
{
	use ResponseTrait;

	public function __construct()
	{
		$this->CreatorJwt = new CreatorJwt();
		$this->Helper = new Helper_model();
	}

	public function initial($response = true)
	{
		
		$Usuario_m = new Usuario_model;
		$Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$Empresa_m = new Empresa_model;
		$Moneda_m = new Moneda_model;
		
		$usuario = $Usuario_m->select('imagen, id_rol, usuario.id_local, usuario.tipo, usuario.nombre, apellido, email, usuario.id_empresa, id_personal, tipo_persona, usuario.usuario, usuario.fl_cambio_local, fl_supervisor, fl_soporte_cliente')
		->select('r.fl_no_dashboard')
		->select('coalesce(l.nombre, "") as local, l.formato_impresion, l.tipo_afectacion_igv')
		->join('rol r', 'r.id = usuario.id_rol', 'left')
		->join('local l', 'l.id = usuario.id_local', 'left')
		->find(ID_USUARIO);

		$ajustes = $Ajuste_avanzado_m->where('id_empresa', $usuario->id_empresa)->first();

		$empresa = $Empresa_m->select('logo,  numero_documento, razon_social, tipo_proveedor_electronico')->where('id', $usuario->id_empresa)->first();
		$moneda = $Moneda_m->select('codigo, tipo_cambio, id')->where('fl_publico', 1)->first();
		$moneda_sistema = $Moneda_m->select('nombre, codigo, tipo_cambio, simbolo, id')->where('id', 1)->first();

		if(is_object($ajustes))
		{
			$ajustes->moneda_sistema = $moneda_sistema;

			if(is_object($moneda))
			{
				$ajustes->tipo_cambio = $moneda->tipo_cambio;
				$ajustes->tipo_cambio_moneda = $moneda->codigo;
				$ajustes->id_moneda_tipo_cambio = $moneda->id;
			}
			else
			{
				$ajustes->tipo_cambio_texto = 'No especificado';
				$ajustes->tipo_cambio = 0;
				$ajustes->id_moneda_tipo_cambio = 0;
			}
		}		
		

		if(is_object($usuario))
		{
			/** CARGAR PERMISOS */
			$Permiso_m = new Permiso_model;
			$permisos = $Permiso_m->where('id_rol', $usuario->id_rol)->findAll();

			if ($usuario->tipo == 'ADMINISTRADOR' or $usuario->tipo == 'SUPER ADMINISTRADOR') {

				$permisos = array(
					0 => (object) array(
					'modulo'    => '',
					'view'      => 1,
					'new'       => 1,
					'edit'      => 1,
					'delete'    => 1,
					)
				);
	
				$all_permiso = true;
			}
			else
			{
				$all_permiso = false;
			}

			$response = [
				'usuario' 			=> $usuario,
				'permisos'			=> $permisos,
				'all_permiso'		=> $all_permiso,
				'ajuste'			=> $ajustes,
				'empresa'			=> $empresa
			];

			return $this->respond($response, 200);			
		}
		else
		{
			return $this->respond(['mensaje' => 'Sesión Finalizada'], 401);
		}
				
	}

}
