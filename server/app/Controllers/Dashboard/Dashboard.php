<?php namespace App\Controllers\Dashboard;

use App\Controllers\BaseController;


use App\Models\Operacion\Atencion_model;
use App\Models\Configuracion\Diagnostico_model;
use App\Models\Configuracion\Socio_model;
use App\Models\Configuracion\Tipo_servicio_model;
use App\Models\Configuracion\Personal_model;
use App\Models\Documento\Documento_personal_model;
use App\Models\Configuracion\Usuario_model;

class Dashboard extends BaseController
{
	public function __construct()
	{
		$this->Personal_m = new Personal_model();

		$this->Atencion_m = new Atencion_model();
		$this->Tipo_servicio_m = new Tipo_servicio_model();
	      
        $this->Socio_m = new Socio_model();
		$this->Diagnostico_m = new Diagnostico_model();
		$this->Usuario_m = new Usuario_model();
	}

    public function get_cantidades()
	{		
		$db = \Config\Database::connect();

        $response = [
            'cantidad_atencion'  => $this->Atencion_m->where('id_empresa', ID_EMPRESA)->where('fl_estado!=', 0)->countAllResults(),
            'cantidad_personal'  =>$this->Personal_m->where('id_empresa', ID_EMPRESA)->countAllResults(),
            'cantidad_historia_clinica'  => '',
      
            'cantidad_cliente'  => $this->Socio_m->where('id_empresa', ID_EMPRESA)->countAllResults(),
		 
			'diagnostico'  => $this->Diagnostico_m->where('id_empresa', ID_EMPRESA)->countAllResults(),
			'usuario'  => $this->Usuario_m->where('id_empresa', ID_EMPRESA)->countAllResults(),


        ];

		return $this->respond($response, 200);
	}


	public function usuarios()
	{		
		 
	
		$response = $this->Usuario_m->select('usuario.*')
		->select("coalesce(l.descripcion, '') as local")
		->select('rol.nombre as rol')
		->select('cliente.razon_social as cliente')
		->join('local l', 'l.id = usuario.id_local', 'left')
		->join('rol', 'rol.id = usuario.id_rol', 'left')
		->join('paciente cliente', 'cliente.id = usuario.id_cliente', 'left')
		->where('usuario.id_empresa', ID_EMPRESA)
		->findAll(8);
	

		return $this->respond($response, 200);
	}






	public function dash_tipo_entrega()
	{		
		$servicio_totales = $this->Atencion_m->where('id_empresa', ID_EMPRESA)
		->where('fl_estado >', 0)
		->where('tipo', 'CONSULTA MEDICA')
		->countAllResults();

		$tipos_entrega = $this->Tipo_servicio_m->where('id_empresa', ID_EMPRESA)->findAll();

		$response = [];
		foreach ($tipos_entrega as $tipo_entrega) {
			
			$encontrado = $this->Atencion_m->where('id_servicio', $tipo_entrega->id)
			->where('id_empresa', ID_EMPRESA)
			->where('fl_estado >', 0)
			->where('tipo', 'CONSULTA MEDICA')
			->countAllResults();

			if($encontrado > 0)
			{
				$response[] = (object)[
					'y' => floatval(number_format((($encontrado * 100) / $servicio_totales), 2, '.', '')),
					'label' => $tipo_entrega->nombre,
					
				];
			}

		}

		return $this->respond($response, 200);
	}

	public function dash_resumen()
	{		

		$hoy = date("Y-m-d");

		$orden_totales = $this->Atencion_m
		->where('DATE_FORMAT(fecha, "%Y-%m-%d")', $hoy)
		->where('id_empresa', ID_EMPRESA)
		->where('fl_estado !=', 0)
		->countAllResults();
		$response = [];

	
		$nuevaFechaAyer = date("Y-m-d", strtotime($hoy . " -1 day"));
		$nuevaFechaAantesAyer = date("Y-m-d", strtotime($nuevaFechaAyer . " -1 day"));

	

		$response[] = (object) [
			'label' => $hoy ,
			'y'		=> $orden_totales
		];

		//
		$total_pagados = $this->Atencion_m->where('DATE_FORMAT(fecha, "%Y-%m-%d")', $nuevaFechaAyer)
		->where('id_empresa', ID_EMPRESA)
		->where('fl_estado !=', 0)
		->countAllResults();

		$response[] = (object)[
			'label' => $nuevaFechaAyer,
			'y' 	=> $total_pagados
		];

		//
		$total_entregados = $this->Atencion_m->where('DATE_FORMAT(fecha, "%Y-%m-%d")', $nuevaFechaAantesAyer)
		->where('id_empresa', ID_EMPRESA)
		->where('fl_estado !=', 0)
		->countAllResults();

		$response[] = (object)[
			'label' => $nuevaFechaAantesAyer ,
			'y' 	=> $total_entregados
		];

		//
	
		return $this->respond($response, 200);
	}
	 
		
}
