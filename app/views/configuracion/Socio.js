


let DOM, DOM_ID ;
let Componente = {

    modal: (fl_basic = false) => {

        let style_hide = '';
        let size_modal = 'modal-xl';

        if(fl_basic == true)
        {
            style_hide = 'style="display:none;"';
            size_modal = 'modal-lg';
        }

        let html = `
            <!-- MODAL SAVE -->
                <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                    <div class="modal-dialog `+size_modal+`">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                <h4 name="save" class="modal-title">Modal title</h4>
                            </div>
                            <form name="save">
                                <div class="modal-body">
                                    <div class="nav-tabs-custom">
                                        <ul class="nav nav-tabs">
                                            <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Datos Personales</a></li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane active" id="tab_1">
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="row">
                                                            <div class="col-md-12" align="center">
                                                                <div>
                                                                    <img name="imagen" style="max-width:100%;" class="img_rectangle">
                                                                </div>
                                                                <div style="padding-top: 5px;">
                                                                    <label class="btn btn-info btn-sm" style="width:85%;">
                                                                        <i class="fa fa-search"></i> Examinar
                                                                        <input type="file" name="imagen" style="display:none;">
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-9">
                                                        <div class="row">
                                                             
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Documento <span class="text-red">(*)</span></label>
                                                                    <select data-select="DOCUMENTO_ENTIDAD" name="id_documento"class="form-control select"></select>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label style="font-weight: bold;">Número DOC. <span class="text-red">(*)</span></label> <label name="condicion"></label>
                                                                <div class="input-group">
                                                                    <input type="text" name="numero_documento" class="form-control" autocomplete="off">
                                                                    <span class="input-group-btn">
                                                                    <button type="button" name="buscar_numero" class="btn btn-info" data-style="zoom-in">
                                                                        <i class="fa fa-search"></i>
                                                                    </button>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Historia Clínica <span class="text-red">(*)</span></label>
                                                                    <input type="text" name="historia_clinica" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Apellidos<span class="text-red">(*)</span></label>
                                                                    <input type="text" name="apellido" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Nombres <span class="text-red">(*)</span></label>
                                                                    <input type="text" name="nombre" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label>Razón Social <span class="text-red">(*)</span></label>
                                                                    <input type="text" name="razon_social" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <label style="font-weight: bold;">Género <span class="text-red">(*)</span></label>
                                                                <div class="form-group">
                                                                    <input type="radio" data-name="sexo_m" name="sexo">
                                                                    <label>Masculino</label>

                                                                    <label style="padding-left: 20px; padding-right: 20px;"></label>

                                                                    <input type="radio" data-name="sexo_f" name="sexo">
                                                                    <label>Femenino</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Fecha de nacimiento <span class="text-red">(*)</span></label>
                                                                    <input type="date" name="fecha_nacimiento" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Edad <span class="text-red">(*)</span></label>
                                                                    <input type="text" name="edad" class="form-control" autocomplete="off" readonly>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-8">
                                                                <div class="form-group">
                                                                    <label>Dirección <span class="text-red">(*)</span></label>
                                                                    <input type="text" name="direccion" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Teléfono </label>
                                                                    <input type="text" name="telefono" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6" `+style_hide+`>
                                                                <div class="form-group">
                                                                    <label>Email <small>Separar por comas</small> </label>
                                                                    <input type="text" name="email" class="form-control mayus_false" data-mayus="false" autocomplete="off">
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6" `+style_hide+`>
                                                                <div class="form-group">
                                                                    <label>Persona / Encargado  </label>
                                                                    <input type="text" name="persona_encargado" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div> 

                                                            <div class="col-md-6"  data-name="menor">
                                                                <div class="form-group">
                                                                    <label>Nombre del Padre  </label>
                                                                    <input type="text" name="nombre_papa" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div> 
                                                            <div class="col-md-6"  data-name="menor">
                                                                <div class="form-group">
                                                                    <label>Nombre de la Madre </label>
                                                                    <input type="text" name="nombre_mama" class="form-control" autocomplete="off">
                                                                </div>
                                                            </div> 

                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label>UBIGEO - (Departamento - Provincia - Distrito) </label>
                                                                    <div class="form-group">
                                                                    <select name="id_ubigeo" data-select="UBIGEO" class="form-control select2"></select>
                                                                    </div>                              
                                                                </div>
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
                                    <button type="button" name="submit" class="btn btn-info">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        `;

        return html;
    },

    render: async (d, tipo, parent_comp = false) => {

      
        Componente.tipo = tipo;

        Componente.parent_comp = parent_comp;        

        let main_random = 'main_'+Math.random().toString(36).substr(2);

        $('#'+main_random).off();

        if(parent_comp != false)
        {
            d.html(`
                <div id="`+main_random+`">`+Componente.modal(true)+`</div> 
            `);
        }
        else
        {
            d.innerHTML = `

                <div id="`+main_random+`">
                    <!-- Content Header (Page header) -->
                    <section class="content-header">
                        <div class="row">
                            <div class="col-md-8 content-header" style="padding-top:5px;">
                                <h1 style="margin:0; ">
                                    Paciente
                                    <small>Configuración</small>
                                </h1>
                            </div>
                            <div class="col-md-4" align="right">
                                <button type="button" class="btn btn-sm btn-info" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>
                            </div>
                        </div>
                        </section>

                        <!-- Main content -->
                        <section class="content">

                        <!-- Default box -->
                        <div class="box box-info">
                            <div class="box-body">
                            <div class="table-responsive">
                                <table name="registros" class="table table-striped nowrap" style="width:100%;"></table>
                            </div>
                            </div>
                        </div>
                        <!-- /.box -->

                    </section>
                    <!-- /.content -->

                    `+Componente.modal()+`

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
                

                </div>            
                `;

        }

        
        await Componente.after_render(main_random);       
        
    },

    after_render: async (main_random) => {

        DOM_ID = '#'+main_random;
        DOM = $(DOM_ID);           

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                id_documento: {required: true},
                numero_documento: {required: true},
                historia_clinica: {required: true},
                apellido: {required: true},
                nombre: {required: true},
            },
          
            messages: {
                id_documento: 'Documento',
                numero_documento: 'Número de Documento',
                historia_clinica: 'Historia clínica',
                apellido: 'Apellidos',
                nombre: 'Nombre',
           
            },
          
        });

        DOM.on('click', 'form[name="save"] button[name="submit"]', function(e) {
            e.stopImmediatePropagation();
  
            if(DOM.find('form[name="save"]').valid())
            {
                Componente.submit();
            }
            
        });

        if(Componente.parent_comp == false)
        {
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
        }
        
        
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        DOM.on('change', 'input[name="fecha_nacimiento"]', function(e) {
            e.stopImmediatePropagation();
            Componente.calcular_edad();
        });

        DOM.on('keyup', 'input[name="fecha_nacimiento"]', function(e) {
            e.stopImmediatePropagation();
            Componente.calcular_edad();
        });

        /** CHANGE DOCUMENTO */
        DOM.on('change', 'select[name="id_documento"]', function(e) {
            e.stopImmediatePropagation();            
            Componente.change_documento();
        });

        /** BUSCAR NUMERO */
        DOM.on('click', 'button[name="buscar_numero"]', function(e) {
            e.stopImmediatePropagation();
            Componente.buscar_numero();
        });

        DOM.on('keyup', 'input[name="numero_documento"]', function(e) {            
            e.stopImmediatePropagation();
            if(e.which == 13) {
                Componente.buscar_numero();
            }            
        });


        Componente.datatable();
        Componente.select_documento_entidad();
        Componente.select_ubigeo();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    array_rutas : [],
    array_documento: [],
    
    /***** DIRECCION */

    change_documento: () => {        

        if(DOM.find('select[name="id_documento"]').val() == 100)
        {
            let codigo = Math.random().toString(36).substr(2);

            DOM.find('input[name="numero_documento"]').val('SD'+codigo);
        }
        else
        {
            DOM.find('input[name="numero_documento"]').val('');
        }

    },

    
    get_correlativo: async () => {

        await axios.get(BASE_API+'configuracion/socio/get_correlativo')
        .then(function (response) {

            DOM.find('input[name="historia_clinica"]').val(response.data.numero);
        

        }).catch(error => {
            console.log(error);
        });

    },


    calcular_edades: async()=>{

        let fecha_nacimiento =  DOM.find('input[name="fecha_nacimiento"]').val();
        let hoy = new Date()
        let fechaNacimiento = new Date(fecha_nacimiento)

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()

      
        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < (fechaNacimiento.getDate()+1)) ) {

          edad--;
        }

 


        DOM.find('input[name="edad"]').val(edad);

    },


    

    calcular_edad: async () => {
        let fecha_nacimiento = DOM.find('input[name="fecha_nacimiento"]').val();
        let hoy = new Date();
        let fechaNacimiento = new Date(fecha_nacimiento);
      
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
      
        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate() + 1)) {
          edad--;
        }
      
        let años = Math.floor(edad);
        let meses = hoy.getMonth() - fechaNacimiento.getMonth();
        let días = hoy.getDate() - fechaNacimiento.getDate();
      
        if (meses < 0) {
          años--;
          meses += 12;
        }
        if (días < 0) {
          meses--;
          días += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
        }

        DOM.find('input[name="edad"]').val(`${años} años, ${meses} meses y ${días} días`);
        console.log(`${años} años, ${meses} meses y ${días} días`);
        


        Componente.verificar_menor(edad);


    
    },


    verificar_menor: (edad) => {

        if(edad <= 5)
        {
            DOM.find('div[data-name="menor"]').show('slide');
        
        }
        else
        {
            DOM.find('div[data-name="menor"]').hide('slide');
     
        }
    },
        
    buscar_numero: async function() {

        let form = DOM.find('form[name="save"]');
        let ladda = HELPER.ladda(DOM_ID+' button[name="buscar_numero"]');

        /** BUSQUEDA INTERNO */
        await axios.get(BASE_API + 'configuracion/socio/buscar?numero='+form.find('input[name="numero_documento"]').val())
        .then(async function (response) {

            let fl_buscar = true;

            if(response.data != '')
            {
                let opcion = confirm("El cliente  ya existe, ¿Desea buscar nuevamente los datos en SUNAT/RENIEC?");
                if (opcion != true) {
                    fl_buscar = false;
                    ladda.stop();
                }                 
            }
            
            if(fl_buscar == true)
            {
                /*** BUSQUEDA EN SUNAT */
                await axios.get(BASE_API + 'recursos/busqueda/reniec_sunat?numero='+form.find('input[name="numero_documento"]').val())
                .then(function (response) {

                    if(DOM.find('select[name="id_documento"] option:selected').text() == 'RUC')
                    {
                        form.find('input[name="razon_social"]').val(response.data.razon_social);
                        form.find('select[name="id_ubigeo"]').html('')
                        .append(new Option(response.data.ubigeo, response.data.ubigeo));
                        
                        form.find('label[name="condicion"]').text(response.data.condicion);

                        if(response.data.condicion == 'HABIDO')
                        {
                            form.find('label[name="condicion"]').css('color', 'green');
                        }
                        else
                        {
                            form.find('label[name="condicion"]').css('color', 'red');
                        }
                        
                        

                    }

                    if(DOM.find('select[name="id_documento"] option:selected').text() == 'DNI')
                    {
                        form.find('input[name="razon_social"]').val(response.data.nombre+ ' '+response.data.apellido);
                        form.find('input[name="apellido"]').val(response.data.apellido);
                        form.find('input[name="nombre"]').val(response.data.nombre);
                        form.find('label[name="condicion"]').text('');
                    }
                    
                    form.find('input[name="direccion"]').val(response.data.direccion);  

                    ladda.stop();
                }).catch(error => {
                    console.log(error);
                    ladda.stop();
                }); 
            }

        }).catch(error => {
            console.log(error);
            ladda.stop();
        }); 


        
    },

    select_documento_entidad: async () =>
    {
        let select = DOM.find('select[data-select="DOCUMENTO_ENTIDAD"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'recursos/data_static/documento_entidad')
        .then(function (response) {
            Componente.array_documento = response.data;
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
        }).catch(error => {
            console.log(error);
        }); 
    },
    
    select_ubigeo: async () =>
    {
        DOM.find('select[data-select="UBIGEO"]').select2({
            ajax: {
              url: BASE_API+'recursos/data_static/ubigeo',
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
            placeholder: "Departamento - Provincia - Distrito",
            minimumInputLength: 3,
            allowClear: true,
            language: {
              inputTooShort: function () {
                return 'Digite mínimo 3 caracteres';
              }
            }
        });
    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:{
                url:BASE_API + 'configuracion/socio',
                data: function(d)
                {
                    if(Componente.tipo == 'cliente')
                    {
                        d.fl_cliente = true;
                    }
                    else if(Componente.tipo == 'proveedor')
                    {
                        d.fl_proveedor = true;
                    }
                    
                }
            },
            columns: [{
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group" style="width:120px;">
                                <button type="button" class="btn btn-default btn-sm" name="row-edit">EDITAR</button>     
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                      <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-left" role="menu">                                    
                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-trash-alt"></i> Eliminar</a></li>
                                </ul>
                            </div>
                        `;

                        return html;
                    },
                    width: '100px',
                },
           
                { title: 'DOCUMENTO', render: function(data, type, row) { return row.documento+' '+row.numero_documento; } },
                { title: 'PACIENTE', mData: 'nombre_completo' },
                { title: 'HISTORIA CLÍNICA', mData: 'historia_clinica' },
                { title: 'TELÉFONO', render: function(data, type, row){

                        let html = '';

                        if (row.telefono != null) {

                            html = '<a href="tel: +51'+ row.telefono +'" class="text-green"><i class="fa fa-phone-alt"></i> '+ row.telefono +'</a>';
                            
                        }

                        return html;
                    }, class: 'text-center'
                },
                { title: 'FECHA DE NACIMIENTO', render: function(data, type, row) { return (row.fecha_nacimiento != null ? HELPER.fecha(row.fecha_nacimiento): ''); } },
                { title: 'GÉNERO', render: function(data, type, row) { 

                    let estado = '';

                    if(row.sexo == 'MASCULINO')
                    {
                        estado = '<small class="label label-primary">MASCULINO</small>';

                        
                    }
                    else if(row.sexo == 'FEMENINO')
                    {
                        estado = '<small class="label label-warning">FEMENINO</small>';
                        
                    }

                    return estado; 

                    }, class:'text-center'
                },   
                { title: 'DIRECCIÓN', mData: 'direccion' },
                { title: 'EMAIL', mData: 'email' },
             
            ]
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo');

        /** DATA */
        HELPER.reset_form(form);

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;
        Componente.verificar_menor(0);
        Componente.get_correlativo();
        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');
        DOM.find('tbody[name="detalle-contacto"').html('');
        DOM.find('tbody[name="detalle-direccion"').html('');

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: async function(row = null, data_busqueda = null, id_socio = null) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar');

        /** DATA */
        HELPER.reset_form(form);

        let data = null;

        if(id_socio == null)
        {
            if(data_busqueda == null)
            {
                data = HELPER.get_attr_json(row);
            }
            else
            {
                data = data_busqueda;
            } 
        }
        else
        {
            await axios.get(BASE_API+'configuracion/socio/buscar?id_socio='+id_socio)
            .then(async function (response) {
                data = response.data;
            }).catch(error => {
                console.log(error);
            }); 
        }

        form.find('select[name="id_documento"]').val(data.id_documento).change();
        form.find('input[name="numero_documento"]').val(data.numero_documento);
        form.find('input[name="razon_social"]').val(data.razon_social);
        form.find('input[name="direccion"]').val(data.direccion);
        form.find('input[name="telefono"]').val(data.telefono);
        form.find('input[name="persona_encargado"]').val(data.persona_encargado);
        form.find('input[name="email"]').val(data.email);
        form.find('input[name="historia_clinica"]').val(data.historia_clinica);
        form.find('input[name="apellido"]').val(data.apellido);
        form.find('input[name="nombre"]').val(data.nombre);

        form.find('input[name="nombre_papa"]').val(data.nombre_papa);
        form.find('input[name="nombre_mama"]').val(data.nombre_mama);

        if (data.sexo == 'MASCULINO') {

            form.find('input[data-name="sexo_m"]').prop('checked' , true);
            
        }
        else if (data.sexo == 'FEMENINO') {

            form.find('input[data-name="sexo_f"]').prop('checked' , true);
            
        }

        form.find('input[name="fecha_nacimiento"]').val(data.fecha_nacimiento);

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.imagen);
        
        if(data.id_ubigeo != null)
        {
            form.find('select[name="id_ubigeo"]').html('')
            .append(new Option(data.ubigeo, data.id_ubigeo));
        }

      await  Componente.calcular_edad();

        this.id = data.id;
        this.action_submit = accion;
        this.imagen_anterior = data.imagen;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.nombre_completo);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }

        if(!DOM.find('input[data-name="sexo_f"]').is(':checked') && !DOM.find('input[data-name="sexo_m"]').is(':checked'))
        {
            ladda.stop();
            return HELPER.notificacion('Seleccione un género por favor', 'warning');
            
        }

        let sexo = '';

        if(DOM.find('input[data-name="sexo_f"]').is(':checked'))
        {
            sexo = 'FEMENINO';
        }
        else if(DOM.find('input[data-name="sexo_m"]').is(':checked'))
        {
            sexo = 'MASCULINO';
        }

        formData.append('sexo', sexo); 


        axios({
            method: 'post',
            url: BASE_API + 'configuracion/socio/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 

            if(Componente.parent_comp == false)
            {
                Componente.table.ajax.reload(null, false);
            }
            else
            {
                Componente.parent_comp(response.data.socio);
            }
            
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;