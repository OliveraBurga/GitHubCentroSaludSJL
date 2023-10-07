

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
                            Diagnóstico
                            <small>Configuración</small>
                        </h1>
                    </div>
                    <div class="col-md-4" align="right">
                        <button type="button" class="btn btn-sm btn-success" name="nuevo_importacion"><i class="fa fa-plus"></i> Importación</button>

                        <button type="button" class="btn btn-sm btn-info" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>
                        <a   target="_blank" href="`+BASE_FILES+`uploads/formato_diagnostico.xlsx" class="btn btn-sm btn-success" name="descargar"><i class="fa fa-download"></i> Descargar Formato</a
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content">


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
                <div class="modal-dialog modal-sm">
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
                                            <label>Código </label>
                                            <input type="text" name="codigo" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Enfermedad </label>
                                            <input type="text" name="enfermedad" class="form-control" autocomplete="off">
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
        

            <!-- MODAL IMPORTACIÓN -->
            <div class="modal inmodal fade" name="modal-save_importacion" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="save_importacion" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save_importacion">
                            <div class="modal-body">
                                <div class="row">
                                     
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Seleccionar Archivo excel</label>
                                            <input type="file" name="archivo" class="form-control" autocomplete="off" accept=".xlsx" required>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-success">Procesar Ahora!</button>
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
                codigo: {required: true},
                enfermedad: {required: true},
            },
          
            messages: {
                codigo: 'Código',
                enfermedad: 'Enfermedad',
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
        
        /** SUBMIT SAVE IMPORTACIÓN*/
        DOM.find('form[name="save_importacion"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });
        /* NUEVO IMPORTACIÓN */
        DOM.on('click', 'button[name="nuevo_importacion"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new_importacion();
        });


        Componente.datatable();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,

    /************ */


    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:BASE_API + 'configuracion/diagnostico',
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
                { title: 'CÓDIGO', mData: 'codigo' },
                { title: 'ENFERMEDAD', mData: 'enfermedad' },
            ],
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo diagnóstico');

        /** DATA */
        HELPER.reset_form(form);

        this.id = null;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar diagnóstico');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="codigo"]').val(data.codigo);
        form.find('input[name="enfermedad"]').val(data.enfermedad);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar diagnóstico');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.codigo + ' - ' + data.enfermedad);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    
    new_importacion: function() {

        let accion = 'save_importacion';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Nueva Importación');

        /** DATA */
        HELPER.reset_form(form);

        this.id = null;
        this.action_submit = accion;
        
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },


    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/diagnostico/' + this.action_submit,
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