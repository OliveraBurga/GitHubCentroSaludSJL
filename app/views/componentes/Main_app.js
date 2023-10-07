

import Menu_sidebar from './Menu_sidebar.js'
import Helper from '../../config/Helper.js'

window.HELPER = Helper;

let Main = {
    render: (data) => {
        
        let usuario = data.usuario;
        let ajuste = data.ajuste;
        let empresa = data.empresa;

        let style_change_color =   `style="background-color:#899200 !important;"`;
        let logo_sistema = 'assets/images/icono_brand.png';

        if(usuario.tipo != 'SUPER USUARIO')
        {
            // ESTABLCER CANTIDAD DE DECIMALES EN PRECIO DE VENTA POR DEFECTO
           if(ajuste.cant_decimales_venta == null || ajuste.cant_decimales_venta == '')
           {
               ajuste.cant_decimales_venta = 7;
           }

           GLOBAL.porcentaje_igv = ajuste.porcentaje_igv;
           GLOBAL.porcentaje_detraccion = ajuste.porcentaje_detraccion;
           GLOBAL.tipo_cambio = ajuste.tipo_cambio;
           GLOBAL.moneda_sistema = ajuste.moneda_sistema;
           GLOBAL.ajuste = ajuste;
           GLOBAL.usuario = usuario;
           GLOBAL.empresa = empresa;

           /**** AJUSTES PERSONALIZADOS VISUAL */
           if(ajuste.fl_sistema_change_color == 1)
           {
             /*   style_change_color = `style="background-color:`+ajuste.sistema_color_bg+`;"`; */
           }

           if(ajuste.fl_sistema_logo == 1)
           {
               logo_sistema = BASE_FILES+'images/'+empresa.logo;
           }
        }
        

        let part_nombre = usuario.nombre.split(' ');
        let nombre = part_nombre[0];

        let part_apellido = usuario.apellido.split(' ');
        let apellido = part_apellido[0];         
        
        
        let html = `


        <!-- Site wrapper -->
        <div class="wrapper">

        <style>
           .titulo_empresa{
               width:60%;
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
           }

           .bg_column_grt{
               background-color:#FFF2A3 !important;
           }

           .bg_column_os{
               background-color:#C9E3F9 !important;
           }

           .bg_column_manifiesto{
               background-color:#FFDEDE !important;
           }

           .form-control, .select2-container--default .select2-selection--single, .btn{
               border-radius:15px;
           }
   
           .form-group label{
               font-weight:600;
           }

           #qr-reader__scan_region video{
               width:150px;
           }

        </style>



        <header class="main-header">
            <!-- Logo -->
            <a href="`+BASE_URL+`" class="logo" `+style_change_color+`>

            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>S</b>J</span>

            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><img src="`+logo_sistema+`" /></i><b>C.S SAN JUAN
            </b> </span>
            </a>

            <!-- Header Navbar: style can be found in header.less -->
            <nav class="navbar navbar-static-top" `+style_change_color+`>

            <!-- Sidebar toggle button-->
            <a href="javascript:" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <i class="fa fa-bars"></i>
            </a>

            <div class="titulo_empresa" style="float:left; color:#fff; margin-top:15px;">`;

            if(empresa != null)
            {
               html += `RUC: `+empresa.numero_documento+' - '+empresa.razon_social;
            }

            html += `
           </div>

            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                <!-- Messages: style can be found in dropdown.less-->

                <!-- User Account: style can be found in dropdown.less -->
                <li class="dropdown user user-menu">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <img src="`+BASE_FILES+`images/`+usuario.imagen+`" class="user-image" alt="User Image">
                    <span class="hidden-xs">`+nombre+` | `+usuario.email+`</span>
                    </a>
                    <ul class="dropdown-menu">
                    <!-- User image -->
                    <li class="user-header">
                        <img src="`+BASE_FILES+`images/`+usuario.imagen+`" class="img-circle" alt="User Image">

                        <p>
                           <small>`+usuario.tipo+`</small>
                        </p>
                    </li>
                    <!-- Menu Body -->
                    <!-- Menu Footer-->
                    <li class="user-footer">
                       `;
                       
                       if(usuario.fl_cambio_local == 1)
                       {
                          /*  html += `
                           <div>
                               <a href="javascript:"  id="cambiar_local" class="btn btn-default btn-flat" style="width:100%;">Cambiar de Local</a>
                           </div>
                           `; */
                       }
                       

                       html += `
                       
                        <div>
                            <a href="javascript:"  id="cambiar_password" class="btn btn-default btn-flat" style="width:100%;">Cambiar Contraseña</a>
                        </div>
                        <div>
                            <a href="javascript:"  id="cerrar_sesion" class="btn btn-default btn-flat" style="width:100%;">Cerrar Sesión</a>
                        </div>
                    </li>
                    
                    </ul>
                </li>
                </ul>
            </div>
            </nav>
        </header>

        <!-- =============================================== -->

        <!-- Left side column. contains the sidebar -->
        <aside class="main-sidebar">

            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar">

                <!-- Sidebar user panel -->
                <div class="user-panel" style="height:80px;">

                    <div class="pull-left image">
                        <img src="`+BASE_FILES+`images/`+usuario.imagen+`" class="img-circle" alt="User Image">
                    </div>

                    <div class="pull-left info">
                        <p>`+nombre+`</p>
                        <a href="#">
                            <i class="fa fa-circle text-success"></i> `+usuario.tipo+`
                        </a> <br>
                        <a href="#">
                            <i class="fa fa-warehouse" style="color:#EEA22C;"></i> `+usuario.local+`
                        </a>
                    </div>
                   
                </div>`;


                if(usuario.tipo != 'SUPER USUARIO')
                {
                    html += `                
                    <div style="background-color:#1a2226; height:2px;"></div>
                    <div class="user-panel" style="height:80px;">
    
                        <div class="info" style="color:#b8c7ce; text-align:left; left:0;">
                            <div>Tipo Cambio: <span name="global-tipo_cambio">`+ajuste.tipo_cambio_moneda+` `+ajuste.tipo_cambio+`</span></div>
                          
                            <div style="margin-top:5px;"> IGV: <span name="global-porcentaje_igv">`+ajuste.porcentaje_igv+`</span>%</div>
                        </div>
                        <div class="info" style="left:160px; margin-top:-5px;">
                            <button class="btn btn-link" id="cambiar_paramtros_globales"><i class="fa fa-pencil"></i></button>
                            <br><button class="btn btn-link" onclick="location.href = '`+BASE_URL+`';"><i class="fa fa-sync-alt"></i></button>
                        </div>
    
                    </div>    
                    `;
                }    
                
                html += Menu_sidebar.render(usuario)+`

                </section>
            <!-- /.sidebar -->
        </aside>

        <!-- =============================================== -->

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <div id="app">
                <div style="width:100%; text-align:center; margin-top:10%;">
                    <div style="margin:auto; font-size:20px;">Preparando...</div>
                </div>
            </div>
        </div>
        <!-- /.content-wrapper -->

        <footer class="main-footer">
            <div class="pull-right hidden-xs">
            <b>Version</b> 3.0
            </div>
            <strong>Copyright &copy;  Sistema para Clinica </a>
        </footer>

        </div>
        <!-- ./wrapper -->
        
                    <!---  MODAL SAVE -->
                        <div class="modal fade" id="main-save_password" data-backdrop="static" style="display:none;">
                            <div class="modal-dialog modal-sm">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                        <h4 name="save" class="modal-title">Cambiar Contraseña</h4>
                                    </div>
                                    <form name="save">
                                        <div class="modal-body">
                                            <div class="row">   
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Contraseña Actual<span class="text-danger">*</span></label>
                                                        <input type="password" name="password_actual" class="form-control" required maxlength="50" autocomplete="off" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Nueva Contraseña <span class="text-danger">*</span></label>
                                                        <input type="password" name="password_nuevo" class="form-control" required maxlength="50" autocomplete="off" />
                                                    </div>
                                                </div>                                     
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Repita nueva Contraseña <span class="text-danger">*</span></label>
                                                        <input type="password" name="re_password_nuevo" class="form-control" required maxlength="50" autocomplete="off" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-light-grey" data-dismiss="modal" style="float:left;">Cancelar</button>
                                            <button type="submit" class="btn btn-primary">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                                <!-- /.modal-content -->
                            </div>
                            <!-- /.modal-dialog -->
                        </div>
                        <!-- /.modal -->
                        `;

                        if(usuario.tipo != 'SUPER USUARIO')
                        {
                            html += `
                            <!---  MODAL SAVE -->
                            <div class="modal fade" id="main-save_global" data-backdrop="static" style="display:none;">
                                <div class="modal-dialog modal-sm">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                            <h4 name="save" class="modal-title">Parametros Globales</h4>
                                        </div>
                                        <form name="save">
                                            <div class="modal-body">
                                               <input type="hidden" name="id_moneda" value="`+ajuste.id_moneda_tipo_cambio+`" />
                                                <div class="row">   
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Tipo de Cambio (`+ajuste.tipo_cambio_moneda+`)<span class="text-danger">*</span></label>
                                                            <input type="number" step="any" name="tipo_cambio" class="form-control" required autocomplete="off" value="`+ajuste.tipo_cambio+`" />
                                                        </div>
                                                    </div>
                                                   
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Porcentaje de IGV<span class="text-danger">*</span></label>
                                                            <input type="number" step="any" name="porcentaje_igv" class="form-control" required autocomplete="off" value="`+ajuste.porcentaje_igv+`"  />
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-light-grey" data-dismiss="modal" style="float:left;">Cancelar</button>
                                                <button type="submit" class="btn btn-primary">Guardar</button>
                                            </div>
                                        </form>
                                    </div>
                                    <!-- /.modal-content -->
                                </div>
                                <!-- /.modal-dialog -->
                            </div>
                            <!-- /.modal -->
                            
                       <!---  MODAL SAVE -->
                        <div class="modal fade" id="main-save_local" data-backdrop="static" style="display:none;">
                            <div class="modal-dialog modal-sm">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                        <h4 name="save" class="modal-title">Cambiar de Local</h4>
                                    </div>
                                    <form name="save_local">
                                        <div class="modal-body">
                                            <div class="row">   
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <select name="id_local" id="select_local_global" class="form-control" /></select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- /.modal-content -->
                            </div>
                            <!-- /.modal-dialog -->
                        </div>
                        <!-- /.modal -->

                            
                            `;
                        }

                        

           html += `
      


            

        `;

        return html;

    },

    after_render: async (data_user) => {
                
        Menu_sidebar.after_render(data_user);

        $('body').addClass("skin-blue fixed sidebar-mini sidebar-mini-expand-feature");
        /*$('body').overlayScrollbars({});
        $('.scroll_bars').overlayScrollbars({});*/

        /** SUBMIT SAVE PASSWORD*/
        $('#main-save_password form[name="save"]').validate({
            submitHandler: function() {
                cambiar_password.submit();
            }
        });   
        
        /** SUBMIT SAVE GLOBAL */
        $('#main-save_global form[name="save"]').validate({
            submitHandler: function() {
                parametro_global.submit();
            }
        });   
        
       document.querySelector('#cerrar_sesion').addEventListener('click', function() { 
            cerrar_sesion();
       });

       document.querySelector('#cambiar_password').addEventListener('click', function() { 
            cambiar_password.show_modal();
       });

       $(document).on('click', '#cambiar_local', function(e) {
           e.stopImmediatePropagation();
           $('#main-save_local').modal('show');
       });

       $(document).on('change', '#select_local_global', function(e) {
           e.stopImmediatePropagation();
           cambiar_local.submit();
       });

       $(document).on('click', 'a[name="link_soporte_cliente"]', function(e) {
           e.stopImmediatePropagation();
           soporte_cliente();
       });

       if(data_user.usuario.tipo != 'SUPER USUARIO')
       {
           document.querySelector('#cambiar_paramtros_globales').addEventListener('click', function() { 
               parametro_global.show_modal();
           });
       }
        

       /*** AUTO OPEN SELECT2 FOCUS */
       $(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
           $(this).closest(".select2-container").siblings('select:enabled').select2('open');
       });

       $('select.select2').on('select2:closing', function (e) {
           $(e.target).data("select2").$selection.one('focus focusin', function (e) {
           e.stopPropagation();
           });
       });
       
       let select = $('#select_local_global');
       select.empty();
       select.append('<option value="">Seleccione...</option>');

       axios.get(BASE_API + 'configuracion/local/get_select')
       .then(function (response) {
           response.data.forEach(row => {
               select.append('<option value="'+row.id+'">'+row.text+'</option>');
           });

           select.select2();
       }).catch(error => {
           console.log(error);
       });
        
    }
}
export default Main;

// FUNCIONES DEL MAIN

let soporte_cliente = () => {
   
   axios.get(BASE_API + 'soporte_cliente/get_token')
   .then(function(response) {

       let a = document.createElement('a');
       a.target="_blank";
       a.href= response.data.url;
       a.click();
   }).catch(error => {
   });
}

let cerrar_sesion = () => {

    axios.get(BASE_API + 'autenticacion/logout')
    .then(function(response) {
        localStorage.removeItem('Token');
        location.href = BASE_URL;

    }).catch(error => {
        localStorage.removeItem('Token');
        location.href = BASE_URL;
    });

}

let cambiar_password = {
    
    accion_submit: null,

    show_modal: () => {
        var accion = 'save_my_password';
        var form = $('#main-save_password form[name="save"]');

        /** DATA */
        HELPER.reset_form(form);
        cambiar_password.accion_submit = accion;

        $('#main-save_password').modal('show');
    },

    submit: () => {
        
        const form = document.querySelector('#main-save_password form[name="save"]');

        const data = Object.fromEntries(new FormData(form).entries());

        if(data.password_nuevo !== data.re_password_nuevo)
        {
            alert("Las contraseñas no coinciden");
            return false;
        }

        var formData = new FormData(form);

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/usuario/save_my_password',
            data: formData
        })
        .then(function(response) {
            $('#main-save_password').modal('hide');
            alert("Completado");
            cerrar_sesion();
        }).catch(error => {
            ladda.stop();
        });
    }
};

let cambiar_local = {
    
   submit: () => {
       
       const form = document.querySelector('#main-save_local form[name="save_local"]');

       var formData = new FormData(form);

       axios({
           method: 'post',
           url: BASE_API + 'configuracion/usuario/save_local',
           data: formData
       })
       .then(function(response) {
           location.reload();
       }).catch(error => {
           
       });
   }
};

let parametro_global = {
    
    accion_submit: null,

    show_modal: () => {
        var accion = 'save_global';
        var form = $('#main-save_global form[name="save"]');

        /** DATA */
        HELPER.reset_form(form);
        cambiar_password.accion_submit = accion;

        $('#main-save_global').modal('show');
    },

    submit: () => {
        
        const form = document.querySelector('#main-save_global form[name="save"]');

        const data = Object.fromEntries(new FormData(form).entries());

        if(data.password_nuevo !== data.re_password_nuevo)
        {
            alert("Las contraseñas no coinciden");
            return false;
        }

        var formData = new FormData(form);

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/ajuste_avanzado/save_global',
            data: formData
        })
        .then(function(response) {
            $('#main-save_global').modal('hide');
            location.href = BASE_URL;
        }).catch(error => {
            ladda.stop();
        });
    }
}