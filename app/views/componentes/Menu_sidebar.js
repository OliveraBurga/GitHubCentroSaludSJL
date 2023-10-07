

let Menu = {
  render: (usuario, permisos) => {
    
    let html = `
        <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul id="side-menu" class="sidebar-menu" data-widget="tree">
                <li id="sidebar-navegacion" class="header">MENÚ DE NAVEGACIÓN</li>

                `;

                if(usuario.tipo == 'SUPER USUARIO')
                {

                    html += `
                    <li id="sidebar-membresia">
                        <a href="#/membresia">
                        <i class="fa fa-id-card"></i> &nbsp;&nbsp;<span>Membresias</span>
                        </a>
                    </li>
                    <li id="sidebar-usuario">
                        <a href="#/usuario">
                        <i class="fa fa-users"></i> &nbsp;&nbsp;<span>Usuarios</span>
                        </a>
                    </li>                   
                    <li name="modulo" class="treeview" id="sidebar-configuracion">
                      <a href="javascript:void(0)">
                        <i class="fa fa-cog"></i>
                        <span>Configuración</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                      </a>
                      <ul class="treeview-menu">
                        <li id="sidebar-configuracion-general">
                          <a href="#/configuracion/general">
                            <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;General
                          </a>
                        </li>
                        <li id="sidebar-configuracion-moneda">
                          <a href="#/configuracion/moneda">
                            <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Monedas
                          </a>
                        </li>
                        <li id="sidebar-configuracion-utilitarios">
                          <a href="#/configuracion/utilitarios">
                            <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Utilitarios
                          </a>
                        </li>
                      </ul>
                    </li>
                    `;
                }
                else
                {
                    html += `                

                    <li id="sidebar-dashboard">
                    <a href="#/dashboard">
                      <i class="fas fa-tachometer-alt-average"></i> &nbsp;&nbsp;<span>Dashboard</span>
                    </a>
                  </li>
                  <li name="modulo" class="treeview" id="sidebar-configuracion">
                    <a href="javascript:void(0)">
                      <i class="fas fa-cogs"></i>&nbsp;
                      <span> Configuración</span>
                      <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu" >
                    <!--   <li id="sidebar-configuracion-ajuste_avanzado">
                        <a href="#/configuracion/ajuste_avanzado">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Ajuste Avanzado
                        </a>
                      </li> -->
                      <li id="sidebar-configuracion-usuario">
                        <a href="#/configuracion/usuario">
                          <i class="far fa-circle" style="font-size:13px;"></i>  &nbsp;&nbsp;Usuarios
                        </a>
                      </li>
                      <li id="sidebar-configuracion-rol">
                        <a href="#/configuracion/rol">
                          <i class="far fa-circle" style="font-size:13px;"></i>  &nbsp;&nbsp;Roles y Permisos
                        </a>
                      </li>
                      <li id="sidebar-configuracion-empresa">
                        <a href="#/configuracion/empresa">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Institución
                        </a>
                      </li>
                <!--       <li id="sidebar-configuracion-cuenta_bancaria_empresa">
                        <a href="#/configuracion/cuenta_bancaria_empresa">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp; cuenta bancaria empresa
                        </a>
                      </li> -->
                      <li id="sidebar-configuracion-personal">
                        <a href="#/configuracion/personal">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Personal Médico
                        </a>
                      </li>
                      <li id="sidebar-configuracion-socio">
                        <a href="#/configuracion/socio">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Pacientes
                        </a>
                      </li>
                      <li id="sidebar-configuracion-tipo_servicio">
                        <a href="#/configuracion/tipo_servicio">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Tipos de Servicio
                        </a>
                      </li>
                      <li id="sidebar-configuracion-tarifa">
                        <a href="#/configuracion/tarifa">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Tarifas
                        </a>
                      </li> 
                      <li id="sidebar-configuracion-diagnostico">
                        <a href="#/configuracion/diagnostico">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Diagnóstico
                        </a>
                      </li>

                      <li id="sidebar-configuracion-diagnostico_config">
                        <a href="#/configuracion/diagnostico_config">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Diagnóstico config
                        </a>
                      </li>


                     <!--  <li id="sidebar-configuracion-forma_pago">
                        <a href="#/configuracion/forma_pago">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Forma pago
                        </a>
                      </li>
                   
                      <li id="sidebar-configuracion-tipo_documento">
                        <a href="#/configuracion/tipo_documento">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Tipos de Documentos
                        </a>
                      </li> -->
                      <li id="sidebar-configuracion-unidad_medida">
                        <a href="#/configuracion/unidad_medida">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp; Unidad medida
                        </a>
                      </li>
                      <!--  
                      <li id="sidebar-configuracion-tipo_cambio">
                        <a href="#/configuracion/tipo_cambio">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Monedas / Tipo Cambio
                        </a>
                      </li>
                      
                      <li id="sidebar-configuracion-forma_pago">
                        <a href="#/configuracion/forma_pago">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Formas de Pago
                        </a>
                      </li> -->
                     
                      
                    </ul>
                  </li>             
             <!--      <li name="modulo" class="treeview" id="sidebar-documento">
                    <a href="javascript:void(0)">
                      <i class="fa fa-book"></i>
                      <span>Documentos</span>
                      <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">
                      <li id="sidebar-documento-documento_personal">
                        <a href="#/documento/documento_personal">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Documento de Personal
                        </a>
                      </li>
                       
                    </ul>
                  </li> -->

                  <li name="modulo" class="treeview" id="sidebar-operacion">
                    <a href="javascript:void(0)">
                      <i class="fa fa-book"></i>
                      <span>Operacion</span>
                      <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">
                      <li id="sidebar-operacion-atencion">
                        <a href="#/operacion/atencion">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Atencion
                        </a>
                      </li>
                      
                      <li id="sidebar-operacion-triaje">
                        <a href="#/operacion/triaje">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Triaje
                        </a>
                      </li>
                      <li id="sidebar-operacion-plan_atencion">
                        <a href="#/operacion/plan_atencion">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Historia Clinica
                        </a>
                      </li>
                      <li id="sidebar-operacion-analisis">
                        <a href="#/operacion/analisis">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Analisis Clinico
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li name="modulo" class="treeview" id="sidebar-reporte">
                    <a href="javascript:void(0)">
                      <i class="fa fa-book"></i>
                      <span>Reporte</span>
                      <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">


                    <li id="sidebar-reporte-historia">
                      <a href="#/reporte/historia">
                        <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Historias del dia
                      </a>
                    </li>

                    <li id="sidebar-reporte-rad">
                      <a href="#/reporte/rad">
                        <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Atencion Diaria
                      </a>
                    </li>
                    <li id="sidebar-reporte-diagnostico">
                      <a href="#/reporte/diagnostico">
                        <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Diagnostico
                      </a>
                    </li>



                      <li id="sidebar-reporte-tipo_servicio">
                        <a href="#/reporte/tipo_servicio">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Tipo de Servicio
                        </a>
                      </li>
                       
                    </ul>
                  </li>

         <!--          <li name="modulo" class="treeview" id="sidebar-tesoreria">
                    <a href="javascript:void(0)">
                      <i class="fa fa-book"></i>
                      <span>Tesoreria</span>
                      <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">
                      <li id="sidebar-tesoreria-pago_atencion">
                        <a href="#/tesoreria/pago_atencion">
                          <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Pago Atencion
                        </a>
                      </li>
                      
                      
                      <li id="sidebar-tesoreria-caja_chica">
                      <a href="#/tesoreria/caja_chica">
                        <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Caja chica
                      </a>
                    </li> 
                    <li id="sidebar-tesoreria-caja">
                      <a href="#/tesoreria/caja">
                        <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Caja
                      </a>
                    </li> 
                    <li id="sidebar-tesoreria-caja_rapida">
                      <a href="#/tesoreria/caja_rapida">
                        <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Caja Rápida
                      </a>
                    </li> 
                    <li id="sidebar-tesoreria-autorizacion_gasto">
                      <a href="#/tesoreria/autorizacion_gasto">
                        <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Autorización de Gastos
                      </a>
                    </li>



                    <li name="modulo" id="sidebar-tesoreria-reporte" class="treeview">
                      <a href="javascript:void(0)">
                      <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;
                        <span>Reportes</span>
                        <span class="pull-right-container">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                      </a>
                      <ul class="treeview-menu">                         
                        <li id="sidebar-tesoreria-reporte-caja_chica">
                          <a href="#/tesoreria/reporte/caja_chica">
                            <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Caja Chica
                          </a>
                        </li>
                        <li id="sidebar-tesoreria-reporte-flujo_caja">
                          <a href="#/tesoreria/reporte/flujo_caja">
                            <i class="far fa-circle" style="font-size:12px;"></i>  &nbsp;&nbsp;Flujo de Caja
                          </a>
                        </li>
                         
                      </ul>
                    </li> -->

                    </ul>
                  </li>
                `;
                  
                  if(usuario.fl_soporte_cliente == 1)
                  {
                    html += `
                      <li id="sidebar-soporte_cliente">
                          <a href="javascript:" name="link_soporte_cliente">
                          <i class="fa fa-life-ring"></i> &nbsp;&nbsp;<span>Soporte al Cliente</span>
                          </a>
                      </li>
                    `;
                  }

                }
                
                html += `
                
                    </ul>
                </li>          

            </ul>            
        `;

        return html;
  },

  after_render: (data_user) => {

    if(data_user.usuario.tipo != 'SUPER ADMINISTRADOR' && data_user.usuario.tipo != 'SUPER USUARIO')
    {
        let json_permisos = data_user.permisos;

        let sidebar = $('#side-menu li');

        /** ELIMINAR SUB MODULOS */
        sidebar.each(function(index, value) {

            let encontrado = false;

            //MENU ENCONTRADOS
            json_permisos.forEach(row => {

                if($(value).attr("id") == 'sidebar-'+row.menu && row.view == 1)
                {
                    encontrado = true;                 
                }

            });
            
            // NO ENCONTRADO
            if(encontrado == false)
            {
                let menu = $(value).attr("id");                
                 
                let particion = menu.split("-");
                
                if(particion.length > 2 && $(value).attr("name")!= 'modulo')
                {
                    $(value).remove();  
                }
            
            }
            
        });

        /** ELIMINAR MODULOS */
        let sidebar_delete = $('#side-menu li[name="modulo"]');

        sidebar_delete.each(function(index, value) {
            
            let id = $(value).attr("id");
            
            if($('#'+id+' li').length == 0)
            {
              $('#'+id).remove();
            }
            else
            {
              let cantidad_existente = $('#'+id+' li').length;
              let cantidad_encontrado = 0;

              $('#'+id+' li[name="modulo"]').each(function(){
                let name = $(this).attr("name");

                if(name == 'modulo')
                {
                  cantidad_encontrado++;
                }

              });

              if(cantidad_encontrado == cantidad_existente)
              {
                $('#'+id).remove();
              }
            }
            

        });
    }
    else
    {

    }
    

    $('#side-menu').fadeIn();

    Menu.tree_initial();
  },

  tree_initial: () => {
    
    $(".sidebar-menu").tree();
    $(".sidebar").slimScroll({
        height: ($(window).height()-50)+'px'
    });
    
    
  },
};

export default Menu;
