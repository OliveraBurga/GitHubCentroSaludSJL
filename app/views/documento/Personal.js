
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
                            Personal
                            <small>Documentos</small>
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
                <div class="box box-info">
                  <div class="box-body">
                    <div class="row">        
                      <div class="col-md-6">
                        <div class="form-group">
                            <label>Filtrar Personal </label>
                            <div class="form-group">
                            <select name="id_personal_filter" data-select="PERSONAL" class="form-control"></select>
                            </div>                              
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.box -->

                <!-- Default box -->
                <div class="box box-info">
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
                                            <label>Personal <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <select name="id_personal" data-select="PERSONAL" class="form-control"></select>
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Tipo Documento <span class="text-red">(*)</span></label>
                                        <div class="form-group">
                                        <select name="id_tipo_documento" data-select="TIPO_DOCUMENTO" class="form-control"></select>
                                        </div>                              
                                    </div>
                                    </div>
                                    <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Documento <span class="text-red">(*)</span></label>
                                        <input type="text" name="documento" class="form-control" list="list-documento" autocomplete="off">      
                                        <datalist id="list-documento"></datalist>                    
                                    </div>
                                    </div>
                                    <div class="col-md-8">
                                    <div class="form-group">
                                        <label>Archivo </label>
                                        <input type="file" name="archivo" class="form-control" autocomplete="off">
                                    </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group" style="margin-top:25px;">
                                            <label><input type="checkbox" name="fl_no_caduca" autocomplete="off"> No Caduca</label>                                            
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Fecha Emisión <span class="text-red">(*)</span></label>
                                        <input type="date" name="fecha_emision" class="form-control" autocomplete="off">
                                    </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Fecha Vencimiento <span class="text-red">(*)</span></label>
                                            <input type="date" name="fecha_vencimiento" class="form-control" autocomplete="off">
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
                id_personal: {required: true},
                id_tipo_documento: {required: true},
                documento: {required: true},
                fecha_emision: {required: true},
                fecha_vencimiento: {required: true},
              },
            
            messages: {
                id_personal: 'Personal',
                id_tipo_documento: 'Tipo de Documento',
                documento: 'Documento',
                fecha_emision: 'Fecha de Emisión',
                fecha_vencimiento: 'Fecha de Vencimiento',
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

        /* FILTRO PERSONAL */
        DOM.on('change', 'select[name="id_personal_filter"]', function(e) {
            e.stopImmediatePropagation();
            Componente.table.ajax.reload(null, false);
        });

        /* CHANGE NO CADUCA */
        DOM.on('change', 'input[name="fl_no_caduca"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_nocaduca();  
        });
        
        Componente.datatable();
        Componente.select_personal();
        Componente.select_tipo_documento();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,

    /************ */

    change_nocaduca: () => {

        if(DOM.find('input[name="fl_no_caduca"]').is(':checked'))
        {
            DOM.find('input[name="fecha_vencimiento"]').prop('disabled', true);
        }
        else
        {
            DOM.find('input[name="fecha_vencimiento"]').prop('disabled', false);
        }
    },

    select_tipo_documento: () =>
    {
        let select = DOM.find('select[data-select="TIPO_DOCUMENTO"]');
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        axios.get(BASE_API+'configuracion/tipo_documento/get_select?tipo=PERSONAL')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });

            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_personal: () =>
    {
        let select = DOM.find('select[data-select="PERSONAL"]');
        select.empty();
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


    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:   {
                url: BASE_API + 'documento/documento_personal',
                data: function (d) {
                    d.id_personal = DOM.find('select[name="id_personal_filter"]').val();
                }
            },
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
                { title: 'PERSONAL MEDICO', mData: 'personal' },
                { title: 'TIPO DOCUMENTO', mData: 'tipo_documento' },
                { title: 'DOCUMENTO', mData: 'documento' },
                { title: 'FECHA EMISION', render: function(data, type, row) { return HELPER.fecha(row.fecha_emision); }},
                { title: 'FECHA VENCIMIENTO', 
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        
                        if(row.fl_no_caduca == 1)
                        {
                            return '<span class="text-green">NO CADUCA</span>';                            
                        }
                        else
                        {
                            return  HELPER.fecha(row.fecha_vencimiento);
                        }
                        
                    }, 
                },
                { title: 'ARCHIVO', 
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        
                        return  (row.archivo != null) ? `<a target="_blank" href="`+BASE_FILES+`uploads/`+row.archivo+`"><i class="fa fa-download"></i> Ver / Descargar</a>` : '';
                    }, 
                },
            ],
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Documento');

        /** DATA */
        HELPER.reset_form(form);

        this.id = null;
        this.action_submit = accion;
        this.archivo_anterior = null;

        
        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Documento');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);        

        form.find('select[name="id_personal"]').val(data.id_personal).change();
        form.find('select[name="id_tipo_documento"]').val(data.id_tipo_documento).change();
        form.find('input[name="documento"]').val(data.documento);
        form.find('input[name="fl_no_caduca"]').prop('checked', parseInt(data.fl_no_caduca));
        form.find('input[name="fecha_vencimiento"]').val(data.fecha_vencimiento);
        form.find('input[name="fecha_emision"]').val(data.fecha_emision);

        this.change_nocaduca();

        this.archivo_anterior = data.archivo;
        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Documento');

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
        if (this.archivo_anterior != null) { formData.append('archivo_anterior', this.archivo_anterior); }

        axios({
            method: 'post',
            url: BASE_API + 'documento/documento_personal/' + this.action_submit,
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