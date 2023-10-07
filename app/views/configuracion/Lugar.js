


let DOM, DOM_ID ;
let Componente = {
    render: async (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            Lugares
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
                        <table name="registros" class="table table-striped" style="width:100%;"></table>
                    </div>
                    </div>
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="row">                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nombre <span class="text-red">(*)</span></label>
                                            <input type="text" name="nombre" class="form-control" autocomplete="off" placeholder="Escribe aquí...">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Dirección <span class="text-red">(*)</span></label>
                                            <input type="text" name="direccion" class="form-control" autocomplete="off" >
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>UBIGEO <span class="text-red">(*)</span></label>
                                            <select name="id_ubigeo" class="form-control form-control-sm" data-select="UBIGEO" ></select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Local Anexo (JURISDICCIÓN) <span class="text-red">(*)</span></label>
                                            <select type="text" data-select="LOCAL" name="id_local" class="form-control"></select>
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

        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                nombre: {required: true},
                direccion: {required: true},
                id_local: {required:true},
                id_ubigeo: {required:true}
            },
          
            messages: {
                nombre: 'Punto de Inicio',
                direccion: 'Punto de Inicio',
                id_local: 'Local (Jurisdicción)',
                id_ubigeo:'UBIGEO'
            },

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
        
        Componente.datatable();
        Componente.select_local();
        Componente.select_ubigeo();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,

    /************ */

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

    select_local: async () =>
    {
        let select = DOM.find('select[data-select="LOCAL"]');
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));        

        await axios.get(BASE_API+'configuracion/local/get_select')
        .then(function (response) {
            Componente.array_documento = response.data;
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:BASE_API + 'configuracion/lugar',

            lengthChange:false,
            paginate: false,
            columns: [{
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group">
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
                { title: 'NOMBRE', mData: 'nombre' },
                { title: 'DIRECCIÓN', mData: 'direccion' },
                { title: 'UBIGEO', mData: 'ubigeo' },
                { title: 'LOCAL ANEXO (JURISDICCIÓN)', mData: 'local' },
            ]
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Lugar');

        /** DATA */
        HELPER.reset_form(form);

        this.id = null;
        this.action_submit = accion;

        
        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Lugar');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="direccion"]').val(data.direccion);
        form.find('select[name="id_local"]').val(data.id_local).change();

        if(data.id_ubigeo != null)
        {
            form.find('select[name="id_ubigeo"]').html('')
            .append(new Option(data.ubigeo, data.id_ubigeo));
        }

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Lugar');

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
            url: BASE_API + 'configuracion/lugar/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;