

import Comp_servicio from './Tipo_servicio.js'

let DOM, DOM_ID ;
let Componente = {

    modal: () => {

        let html = `
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
                            <div class="row">   
                                <div class="col-md-4" data-name="contenedor-tipo_tarifa">
                                    <div class="form-group">
                                        <label>Tipo Tarifa <span class="text-red">(*)</span></label>
                                        <select name="tipo_tarifa" class="form-control select" autocomplete="off" required>
                                            <option value="">Seleccione...</option>
                                            <option value="LABORATORIO">LABORATORIO</option>
                                            <option value="CONSULTA MEDICA">CONSULTA MEDICA</option>
                                            <option value="PACIENTE">PACIENTE</option>
                                            <option value="SERVICIO-PACIENTE">SERVICIO - PACIENTE</option>
                                        </select>
                                    </div>
                                </div>    
                                <div class="col-md-8" data-contenedor_form="paciente" style="display: none;">
                                    <div class="form-group">
                                        <label>Paciente <span class="text-red">(*)</span></label>
                                        <select class="form-control" name="id_paciente"  data-select="PACIENTE" required></select>
                                    </div>
                                </div>
                                <div class="col-md-8" data-contenedor_form="servicio" style="display: none;">
                                    <div class="form-group">
                                        <label>Servicio <span class="text-red">(*)</span></label> <a name="nuevo_servicio" href="javascript:" style="float:right; display: none;">Crear Nuevo</a>
                                        <select name="id_servicio" data-select="SERVICIO" class="form-control" autocomplete="off" required></select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Precio  </label>
                                        <div class="input-group">
                                            <span class="input-group-addon">`+GLOBAL.moneda_sistema.simbolo+`</span>
                                            <input type="number" name="precio" class="form-control" autocomplete="off" required>
                                        </div>                                   
                                    </div>
                                </div> 
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Precio Convenio </label>
                                        <div class="input-group">
                                            <span class="input-group-addon">`+GLOBAL.moneda_sistema.simbolo+`</span>
                                            <input type="number" name="precio_convenio" class="form-control" autocomplete="off" required>
                                        </div>                                   
                                    </div>
                                </div> 
                            </div>                              
                        </div>
                        <div class="modal-footer" align="center" style="display:block">
                            <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                            <button type="submit" name="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

            
        `;

        return html;
    },

    render: async (d, parent_comp = false) => {
        
        Componente.parent_comp = parent_comp;    

        let main_random = 'main_'+Math.random().toString(36).substr(2);

        $('#'+main_random).off();

        if(parent_comp != false)
        {
            d.html(`
                <div id="`+main_random+`">`+Componente.modal(true)+`</div> 
                <div name="componente-servicio"></div>
            `);
        }
        else
        {
            d.innerHTML = `

                <div id="`+main_random+`">
                    <!-- Content Header (Page header) -->
                    <section class="content-header">
                        <div class="row">
                            <div class="col-md-6 content-header" style="padding-top:5px;">
                                <h1 style="margin:0; ">
                                    Tarifas
                                    <small>Configuración</small>
                                </h1>
                            </div>
                            <div class="col-md-6" align="right">
                                <button type="button" class="btn btn-sm btn-info" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>
                            </div>
                        </div>
                    </section>

                    <!-- Main content -->
                    <section class="content">

                        <!-- Default box -->
                        <div class="box box-info" >
                            <div class="box-body">
                                <div class="row">                                    
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label>Tipo Tarifa </label>
                                            <select class="form-control" data-filtro="tipo_tarifa">
                                                <option value="">TODOS</option>
                                                <option value="LABORATORIO">LABORATORIO</option>
                                                <option value="CONSULTA MEDICA">CONSULTA MEDICA</option>
                                                <option value="PACIENTE">PACIENTE</option>
                                                <option value="SERVICIO-PACIENTE">SERVICIO - PACIENTE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-1" style="padding-top:20px;">
                                        <button type="button" class="btn btn-sm btn-info" name="btn_buscar"><i class="fa fa-search"></i> Buscar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.box -->

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
                <div name="componente-servicio"></div>       
            `;
        }
        

        await Componente.after_render(main_random);     
        await Comp_servicio.render($('div[name="componente-servicio"]'), Componente.select_servicio);
        
    },

    after_render: async (main_random) => {

        DOM_ID = '#'+main_random;
        DOM = $(DOM_ID);           

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            submitHandler: function() {
                Componente.submit();
            }
        
        });

        if(Componente.parent_comp == false)
        {

            /* DATATABLE UPDATE*/
            DOM.on('click', 'button[name="btn_buscar"]', function(e) {
                e.stopImmediatePropagation();
                Componente.table.ajax.reload(null, false);
            });

            Componente.datatable();

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

            DOM.on('change', 'select[name="id_servicio"]', function(e) {
                e.stopImmediatePropagation();
                if(Componente.fl_evento == true){
                Componente.consultar_costo();
                }
            });

            /* ELIMINAR */
            DOM.on('click', 'a[name="row-delete"]', function(e) {
                e.stopImmediatePropagation();
                Componente.delete($(this));
            });
        }
            
        /* NUEVO SERVICIO */
        DOM.on('click', 'a[name="nuevo_servicio"]', function(e) {
            e.stopImmediatePropagation();
            Comp_servicio.new();
        });

        /* CHANGE TIPO TARIFA FORM */
        DOM.on('change', 'select[name="tipo_tarifa"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_tipo_tarifa_form();
        });

       
        Componente.select_paciente();
        

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    id_cliente: null,
    id_servicio_nuevo: null,
    fl_evento:true,
    /************ */


    change_tipo_tarifa_form: () => { 
        
        let form = DOM.find('form[name="save"]');
        let value = form.find('select[name="tipo_tarifa"]').val();

        if(value == 'LABORATORIO' || value == 'CONSULTA MEDICA' )
        {
            form.find('div[data-contenedor_form="paciente"]').hide('fast');
            form.find('div[data-contenedor_form="servicio"]').show('fast');

            form.find('select[name="id_paciente"]').prop('disabled', true);
            form.find('select[name="id_servicio"]').prop('disabled', false);

            if(Componente.fl_evento == true){

                Componente.select_servicio();
            }
            
        }
        else if(value == 'PACIENTE')
        {
            form.find('div[data-contenedor_form="paciente"]').show('fast');
            form.find('div[data-contenedor_form="servicio"]').hide('fast');
            
            form.find('select[name="id_paciente"]').prop('disabled', false);
            form.find('select[name="id_servicio"]').prop('disabled', true);
        }
        else if(value == 'SERVICIO-PACIENTE')
        {
            form.find('div[data-contenedor_form="paciente"]').show('fast');
            form.find('div[data-contenedor_form="servicio"]').show('fast');
            
            form.find('select[name="id_paciente"]').prop('disabled', false);
            form.find('select[name="id_servicio"]').prop('disabled', false);

            if(Componente.fl_evento == true){

                Componente.select_servicio();
            }
        }

    },


    nuevo_servicio: () => {
        Componente.id_servicio_nuevo = null;
        Comp_servicio.new();
    },

    select_paciente: async () => {

        DOM.find('select[data-select="PACIENTE"]').select2({
            ajax: {
            url: BASE_API + "configuracion/socio/get_select",
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
            placeholder: "Buscar Nombres o Número de Documento",
            minimumInputLength: 2,
            language: {
                inputTooShort: function(args) {
                    return "Escriba mas de 2 caracteres";
                },
            },
            allowClear:true
        });

    },

    select_servicio: async (id_servicio_nuevo = null) =>
    {
        let select = DOM.find('select[data-select="SERVICIO"]');
        let tipo = DOM.find('select[name="tipo_tarifa"]').val();
        DOM.find('select[data-select="SERVICIO"]').html('');
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));
        
        if (tipo == 'SERVICIO-PACIENTE') {
            
            tipo = 'CONSULTA MEDICA';
        }

        await axios.get(BASE_API+'configuracion/tipo_servicio/get_select?tipo='+tipo)
        .then(async function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });

            select.select2();

            if(id_servicio_nuevo != null)
            {
                select.val(id_servicio_nuevo).change();
                Componente.id_servicio_nuevo = id_servicio_nuevo;
            }

        }).catch(error => {
            console.log(error);
        }); 
    },

    consultar_costo: async()=>{
 
             let id_servicio = DOM.find('select[name="id_servicio"]').val();

             if (id_servicio != '' && id_servicio != null) {
                await axios.get(BASE_API+'configuracion/tipo_servicio/get_select_unique/'+id_servicio)
                .then(function (response) {
                 
              
                    DOM.find('input[name="precio"]').val(response.data.costo);
        
                }).catch(error => {
                    console.log(error);
                });
    
             }
          

       

     },


    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
        ajax: {
            url: BASE_API + 'configuracion/tarifa',
            data: function(d)
            {
                d.tipo_tarifa = DOM.find('select[data-filtro="tipo_tarifa"]').val();
            }
        },

        lengthChange:false,
        paginate: false,
        columns: [{
                title: 'ACCIÓN',
                defaultContent: ``,                    
                render: function(data, type, row) {
                    var html = `
                        <div class="btn-group" style="width:100px;">
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
            { title: 'TIPO TARIFA', mData: 'tipo_tarifa' },
            { title: 'SERVICIO', mData: 'servicio'},  
            { title: 'PACIENTE', mData: 'paciente' },                        
            { title: 'PRECIO', render: function(data, type, row){ return GLOBAL.moneda_sistema.simbolo+' '+ row.precio; }, class:'text-right'},
            { title: 'PRECIO CONVENIO', render: function(data, type, row){ return GLOBAL.moneda_sistema.simbolo+' '+ row.precio_convenio; }, class:'text-right'},
        ]
        });

    },

    new: function(data_param = null) {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nueva Tarifa');

        /** DATA */
        HELPER.reset_form(form);

        form.find('div[data-contenedor_form="paciente"]').hide('fast');
        form.find('div[data-contenedor_form="servicio"]').hide('fast');


        this.id = null;
        this.action_submit = accion;
        Componente.id_servicio_nuevo = null;
        
        DOM.find('div[name="modal-'+accion+'"]').modal('show');    
                    

    },

    edit: async function(row, data_ajax = false) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Tarifa');

        /** DATA */
        HELPER.reset_form(form);

        let data;

        if(data_ajax == false)
        {
            data = HELPER.get_attr_json(row);
        }
        else
        {
            data = data_ajax;
        } 
        
Componente.fl_evento = false;
      
        form.find('input[name="precio"]').val(data.precio);
        form.find('input[name="precio_convenio"]').val(data.precio_convenio);
        form.find('select[name="tipo_tarifa"]').val(data.tipo_tarifa).change();
       // await form.find('select[name="id_servicio"]').val(data.id_servicio).change();
       await Componente.select_servicio(data.id_servicio);

        axios.get(BASE_API+'configuracion/socio/get_unique/'+data.id_paciente)
        .then(function (response) {

            form.find('select[name="id_paciente"]').html('');
            form.find('select[name="id_paciente"]').append(new Option(response.data.nombre_completo, response.data.id)); 


        }).catch(error => {
            console.log(error);
        });

        

        this.id = data.id;
        this.action_submit = accion;
        
        Componente.fl_evento = true;
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Tarifa');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/tarifa/' + this.action_submit,
            data: formData
        })
        .then(function(response) {  
            
            if(Componente.parent_comp == false)
            {
                Componente.table.ajax.reload(null, false);
            }
            else
            {
                Componente.parent_comp(Componente.id_servicio_nuevo, true);
                //Componente.id_servicio_nuevo = null;
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