


let DOM, DOM_ID ;
let Componente = {
    render: (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            Usuarios
                            <small>Configuración</small>
                        </h1>
                    </div>
                    <div class="col-md-4" align="right">
                        <button type="button" class="btn btn-sm btn-warning" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content">

                <!-- Default box -->
                <div class="box box-warning">
                    <div class="box-body">
                    <div class="table-responsive">
                        <table name="registros" class="table table-striped nowrap" style="width:100%;"></table>
                    </div>
                    </div>
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="nav-tabs-custom">
                                    <ul class="nav nav-tabs">
                                        <li class="active"><a href="#usuario-basico" data-toggle="tab" aria-expanded="true">Básico</a></li>
                                        `+((GLOBAL.ajuste.fl_general_serie_usuario == 1) ? '<li class=""><a href="#usuario-serie" data-toggle="tab" aria-expanded="false">Series</a></li>' : '' )+`
                                    </ul>
                                </div>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="usuario-basico">
                                        <div class="row">
                                            <div class="col-md-3"> 
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Tipo Persona</label>
                                                            <select name="tipo_persona" class="form-control select" autocomplete="off">
                                                                <option value="">USUARIO ESTANDART</option>
                                                                <option value="PERSONAL">PERSONAL MEDICO</option>
                                                                <option value="CLIENTE">PACIENTE</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" align="center">
                                                        <div>
                                                            <img name="imagen" style="max-width:100%;" class="img_rectangle">
                                                        </div>
                                                        <div>
                                                            <label class="btn btn-default btn-sm" style="width:100%;">
                                                                <i class="fa fa-search"></i> Imagen de Perfil
                                                                <input type="file" name="imagen" style="display:none;">
                                                            </label>
                                                        </div>
                                                    </div>                                                                   
                                                </div>
                                            </div>
                                            <div class="col-md-9">
                                                <div class="row">
                                                    <div class="col-md-12" name="contenedor-personal">
                                                        <div class="form-group">
                                                            <label>Personal <span class="text-red">(*)</span></label>
                                                            <select data-select="PERSONAL" name="id_personal" class="form-control" autocomplete="off" required></select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" name="contenedor-cliente">
                                                        <div class="form-group">
                                                            <label>Cliente <span class="text-red">(*)</span></label>
                                                            <select data-select="CLIENTE" name="id_cliente" class="form-control" autocomplete="off" required></select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" name="contenedor-nombre">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label>Nombre <span class="text-red">(*)</span></label>
                                                                <input type="text" name="nombre" class="form-control" autocomplete="off" required>
                                                            </div>
                                                            </div>
                                                            <div class="col-md-12">
                                                            <div class="form-group">
                                                                <label>Apellidos <span class="text-red">(*)</span></label>
                                                                <input type="text" name="apellido" class="form-control" autocomplete="off" required>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Correo Electrónico <span class="text-red">(*)</span><small>(Recuperar Contraseña)</small></label>
                                                            <input type="email" name="email" class="form-control" autocomplete="off" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Usuario <span class="text-red">(*)</span></label>
                                                            <input type="text" data-mayus="false" name="usuario" class="form-control mayus_false" autocomplete="off" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Contraseña <span class="text-red">(*)</span></label>
                                                            <input type="text" name="clave" class="form-control mayus_false" data-mayus="false" autocomplete="off" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" data-no_cliente="true">
                                                        <div class="form-group">
                                                            <label>Rol y Permisos</label>
                                                            <select name="id_rol" data-select="rol" class="form-control select2"></select>
                                                        </div>
                                                    </div>
                                                    <div style="display:none" class="col-md-12" data-no_cliente="true">
                                                        <div class="form-group">
                                                            <label>Local Anexo</label>
                                                            <select name="id_local" data-select="LOCAL" class="form-control"></select>
                                                        </div>
                                                    </div>
                            
                                                </div>
                                            </div>
                                           
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- MODAL DELETE -->
            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="delete" class="modal-title">Modal title</h4>
                        </div>
                        <form name="delete">
                            <div class="row">
                                <div class="col-md-12" align="center">
                                    <i class="fad fa-trash-alt fa-4x"></i><br/>
                                </div>
                                <div class="col-md-12"  align="center" style="padding-top:10px;">
                                    <label><input type="checkbox" name="confirmacion" required/>
                                        Confirmo realizar la eliminación</label>
                                    <p style="color:red;">Esta acción no se podrá revertir</p>
                                </div>
                                <div class="col-md-12" name="texto" align="center">

                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!---  MODAL SAVE PASSWORD -->
            <div class="modal inmodal fade" name="modal-save_password" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="save_password" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save_password">
                            <div class="modal-body text-center p-3">                
                                <div class="row mt-3">
                                    <div class="col-md-12" align="center">
                                        <i class="fa fa-lock fa-4x"></i>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <input type="text" data-mayus="false" name="usuario" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Correo electrónico</label>
                                            <input type="email" name="email" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nueva Contraseña</label>
                                            <input type="text" name="password" data-mayus="false" class="form-control mayus_false" autocomplete="off" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <!-- /.modal -->

            <!---  MODAL SUSPENDER -->
            <div class="modal inmodal fade" name="modal-save_suspendido" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="save_suspendido" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save_suspendido">
                            <div class="modal-body text-center p-3">                
                                <div class="row mt-3">
                                    <div class="col-md-12" align="center">
                                        <i class="fa fa-pause fa-4x"></i>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <input type="text" data-mayus="false" name="usuario" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Correo electrónico</label>
                                            <input type="email" name="email" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-warning">Suspender Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <!-- /.modal -->

            <!---  MODAL ACTIVAR -->
            <div class="modal inmodal fade" name="modal-save_activar" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="save_activar" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save_activar">
                            <div class="modal-body text-center p-3">                
                                <div class="row mt-3">
                                    <div class="col-md-12" align="center">
                                        <i class="fa fa-play fa-4x"></i>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <input type="text" data-mayus="false" name="usuario" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Correo electrónico</label>
                                            <input type="email" name="email" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-success">Activar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <!-- /.modal -->



        </div>            
        `;

        Componente.after_render();
    },

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /** SUBMIT SAVE PASSWORD */
        DOM.find('form[name="save_password"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /** SUBMIT SAVE SUSPENDIDO */
        DOM.find('form[name="save_suspendido"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

         /** SUBMIT SAVE ACTIVAR */
         DOM.find('form[name="save_activar"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /** SUBMIT DELETE */
        DOM.find('form[name="delete"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new();
        });

        /* EDITAR */
        DOM.on('click', 'button[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit($(this));
        });

        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
        });

        
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        /* CHANGE TIPO PERSONA */
        DOM.on('change', 'select[name="tipo_persona"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_tipo_persona();
            Componente.change_cambio_local();
        });

        DOM.on('click', 'a[name="row-email"]', async function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));

            if(confirm('Enviar  a '+data.usuario+'?')){

                let formData = new FormData();

                formData.append('id', data.id);

                let resp = await axios({
                    method: 'post',
                    url: BASE_API + 'configuracion/usuario/enviar_email',
                    data: formData
                });

                if(resp.status == 200){
                    HELPER.notificacion(resp.data.mensaje, 'success');
               
                }

            }       

        }); 
       

        /* EDITAR PASSWORD */
        DOM.on('click', 'a[name="row-edit_password"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit_password($(this));
        });

        /* SUSPENDER  */
        DOM.on('click', 'a[name="row-suspender"]', function(e) {
            e.stopImmediatePropagation();
            Componente.suspender($(this));
        });

        /* ACTIVAR  */
        DOM.on('click', 'a[name="row-activar"]', function(e) {
            e.stopImmediatePropagation();
            Componente.activar($(this));
        });

     

        Componente.datatable();
        Componente.get();
        Componente.select_rol();
        Componente.select_personal();
        Componente.select_local();
        Componente.select_cliente();
 

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    fl_autoevento: true,
    

    /************ */
 
 
 
    change_cambio_local: () => {

        if(DOM.find('select[name="tipo_persona"]').val() == '')
        {
            DOM.find('div[name="contenedor-cambio_local"]').show('slide');
            DOM.find('input[name="fl_cambio_local"]').prop('disabled', false);
        }
        else
        {
            DOM.find('div[name="contenedor-cambio_local"]').hide('slide');
            DOM.find('input[name="fl_cambio_local"]').prop('disabled', true);
        }
    },

    change_tipo_persona: () => {

        if(Componente.fl_autoevento == false)
        {
            return false;
        }
        
        let tipo_persona = DOM.find('select[name="tipo_persona"]').val();

        DOM.find('div[name="contenedor-personal"]').hide('slide');
        DOM.find('div[name="contenedor-cliente"]').hide('slide');

        DOM.find('select[name="id_personal"]').prop('disabled', true);
        DOM.find('select[name="id_cliente"]').prop('disabled', true);

        /** OCULTAR CAMPOS PARA DIGITAR NOMBRE Y APELLIDO */
        DOM.find('input[name="nombre"]').prop('disabled', true);
        DOM.find('input[name="apellido"]').prop('disabled', true);

        DOM.find('div[name="contenedor-nombre"]').hide('slide');
        DOM.find('div[data-no_cliente="true"]').show('slide');

        if(tipo_persona == 'PERSONAL')
        {
            DOM.find('div[name="contenedor-personal"]').show('slide');
            DOM.find('select[name="id_personal"]').prop('disabled', false);
        }
        else if(tipo_persona == 'CLIENTE')
        {
            DOM.find('div[name="contenedor-cliente"]').show('slide');
            DOM.find('select[name="id_cliente"]').prop('disabled', false);
            DOM.find('div[data-no_cliente="true"]').hide('slide');
        }
        else
        {
            /** MOSTRAR CAMPOS PARA DIGITAR NOMBRE Y APELLIDO */
            DOM.find('input[name="nombre"]').prop('disabled', false);
            DOM.find('input[name="apellido"]').prop('disabled', false);

            DOM.find('div[name="contenedor-nombre"]').show('slide');
        }
    },

    select_local: function()
    {
        let select = DOM.find('select[data-select="LOCAL"]');
        select.append($('<option></option>').attr('value', '').text('Ninguno...'));
        axios.get(BASE_API+'configuracion/local/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();   
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_cliente: async () => {

        DOM.find('select[data-select="CLIENTE"]').select2({
            ajax: {
              url: BASE_API + "configuracion/socio/get_select?fl_cliente=true",
              dataType: 'json',
              delay: 250,
              data: function(params) {
                return {buscar:params.term};
              },
              processResults: function(data, params) {      
                return {results: data};
              },
              cache: true,
            },
            escapeMarkup: function(markup) {
              return markup;
            },
            placeholder: "Buscar Razón Social o Número de Documento",
            minimumInputLength: 6,
            allowClear:true
        });

    },

    select_personal: function()
    {
        let select = DOM.find('select[data-select="PERSONAL"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));
        axios.get(BASE_API+'configuracion/personal/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();   
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_rol: function()
    {
        let select = DOM.find('select[data-select="rol"]');
        select.append($('<option></option>').attr('value', '').text('SUPER ADMINISTRADOR'));
        axios.get(BASE_API+'configuracion/rol/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();   
        }).catch(error => {
            console.log(error);
        }); 
    },

    get: function() {
        
        axios.get(BASE_API + 'configuracion/usuario')
        .then(function(response) {
            Componente.table.clear().rows.add(response.data).draw(false);
        }).catch(error => {
            console.log(error);
        }); 
    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({

            lengthChange:false,
            paginate: false,
            columns: [
                    { title: 'ID', mData: 'id', visible:false },
                    {
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {

                        let opcion_suspender = '<li><a class="dropdown-item" name="row-suspender" href="javascript:"><i class="far fa-pause"></i> Suspender</a></li>';

                        if(row.fl_suspendido == 1)
                        {
                            opcion_suspender = '<li><a class="dropdown-item" name="row-activar" href="javascript:"><i class="far fa-play"></i> Activar Usuario</a></li>';
                        }

                        var html = `
                            <div class="btn-group" style="width:120px;">
                                <button type="button" class="btn btn-default btn-sm" name="row-edit">EDITAR</button>     
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                      <i class="fa fa-angle-down"></i>
                                </button>
                                <ul  class="dropdown-menu dropdown-menu-left" role="menu">
                                    <li><a class="dropdown-item" name="row-edit_password" href="javascript:"><i class="far fa-lock"></i> Cambiar Contraseña</a></li>
                                    `+opcion_suspender+`
                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-trash-alt"></i> Eliminar</a></li>

                                    <li><a class="dropdown-item" name="row-email" href="javascript:">Enviar Email</a></li>
                                </ul>
                            </div>
                        `;

                        return html;
                    },
                    width: '100px',
                },
                { title: 'ESTADO', render: function(data, type, row) {
                    
                    let html = '<span class="label label-success">ACTIVO</span>'
                    
                    if(row.fl_suspendido == 1)
                    {
                        html = '<span class="label label-warning">SUSPENDIDO</span>';
                    }

                    return html;
                } },
                { title: 'NOMBRE', mData: 'nombre' },
                { title: 'APELLIDO', mData: 'apellido' },
                { title: 'USUARIO', mData: 'usuario' },
                { title: 'EMAIL', mData: 'email' },
            
                { title: 'TIPO PERSONA', mData: 'tipo_persona' },
                { title: 'ROL PERMISO', mData: 'rol' },
            ],
            createdRow: function(row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));
                $(row).find('td').eq(0).css('width', '10px');
            },
            order:[
                ['0', 'asc']
            ]
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Usuario');

        /** DATA */
        HELPER.reset_form(form);

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');
        form.find('input[name="clave"]').prop('disabled', false);

        DOM.find('tbody[name="detalle-serie_facturacion"').html('');
        
        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: (row) => {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Usuario');

        /** DATA */
        HELPER.reset_form(form); 

        let data = HELPER.get_attr_json(row);

        Componente.fl_autoevento = false;

        DOM.find('tbody[name="detalle-serie_facturacion"').html('');
        
        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="apellido"]').val(data.apellido);
        form.find('input[name="email"]').val(data.email);
        form.find('input[name="usuario"]').val(data.usuario);
        form.find('select[name="id_local"]').val(data.id_local).change();
        form.find('select[name="id_rol"]').val(data.id_rol).change();
        form.find('select[name="id_personal"]').val(data.id_personal).change();
        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.imagen);
        form.find('select[name="tipo_persona"]').val(data.tipo_persona).change();

        form.find('select[name="id_cliente"]').html('');
        form.find('select[name="id_cliente"]').append(new Option(data.cliente, data.id_cliente));
        form.find('input[name="fl_cambio_local"]').prop('checked', parseInt(data.fl_cambio_local));
        form.find('input[name="fl_supervisor"]').prop('checked', parseInt(data.fl_supervisor));
        form.find('input[name="fl_soporte_cliente"]').prop('checked', parseInt(data.fl_soporte_cliente));

        form.find('input[name="clave"]').prop('disabled', true);

        form.find('input[name="serie_orden"]').val(data.serie_orden);
        form.find('input[name="serie_manifiesto"]').val(data.serie_manifiesto);
        form.find('input[name="serie_desembarque"]').val(data.serie_desembarque);
        form.find('input[name="serie_reparto"]').val(data.serie_reparto);
 
        
        Componente.id = data.id;
        Componente.action_submit = accion;
        Componente.imagen_anterior = data.imagen;
        Componente.imagen_firma_anterior = data.imagen_firma;

        Componente.fl_autoevento = true;

        Componente.change_tipo_persona();

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit_password: function(row) {

        let accion = 'save_password';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Cambiar Contraseña');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="usuario"]').val(data.usuario);
        form.find('input[name="email"]').val(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    suspender: function(row) {

        let accion = 'save_suspendido';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Suspender Usuario');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="usuario"]').val(data.usuario);
        form.find('input[name="email"]').val(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    activar: function(row) {

        let accion = 'save_activar';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Activar Usuario');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="usuario"]').val(data.usuario);
        form.find('input[name="email"]').val(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Usuario');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;

        this.imagen_anterior = data.imagen;
        this.imagen_firma_anterior = data.imagen_firma;


        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }
        
 

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/usuario/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            Componente.get();
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;