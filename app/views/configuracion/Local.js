

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
                            Locales Anexos
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
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body" style="max-height:`+(window.innerHeight - 200)+`px; overflow:auto;">
                                <div class="nav-tabs-custom">
                                    <ul class="nav nav-tabs">
                                        <li class="active"><a href="#local-basico" data-toggle="tab" aria-expanded="true">Básico</a></li>
                                        <li class=""><a href="#local-facturacion" data-toggle="tab" aria-expanded="false">Comprobantes / Series</a></li>
                                        <li class=""><a href="#local-facturacion_electronica" data-toggle="tab" aria-expanded="false">Facturación Electrónica</a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="local-basico">
                                            <div class="row"> 
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Tipo <span class="text-red">(*)</span></label>
                                                        <input type="text" name="tipo" class="form-control" autocomplete="off" list="list-tipo">
                                                        <datalist id="list-tipo">
                                                            <option value="SUCURSAL" />
                                                            <option value="SEDE" />
                                                            <option value="FILIAL" />
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <label>Nombre <span class="text-red">(*)</span></label>
                                                        <input type="text" name="nombre" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>  
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Dirección <span class="text-red">(*)</span></label>
                                                        <input type="text" name="direccion" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>                                                
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Teléfono </label>
                                                        <input type="text" name="telefono" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>                                                
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Límite Máximo Saldo en Caja chica S/.</label>
                                                        <input type="number" step="any" name="limite_maximo_saldo_caja_chica" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                        <div class="tab-pane" id="local-facturacion">
                                            <div class="row">     
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Formato Impresión de Comprobantes<span class="text-red">(*)</span></label>
                                                        <select class="form-control select" name="formato_impresion">
                                                            <option value="">Seleccione...</option>
                                                            <option value="TICKET">TICKET</option>
                                                            <option value="A4">A4/A5</option>
                                                        </select>
                                                    </div>
                                                </div>                                            
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Serie Órden de Servicio <span class="text-red">(*)</span></label>
                                                        <input type="text" name="serie_orden" class="form-control" placeholder="OS01" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Serie Manifiesto <span class="text-red">(*)</span></label>
                                                        <input type="text" name="serie_manifiesto" class="form-control" placeholder="MF01" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Serie Desembarque <span class="text-red">(*)</span></label>
                                                        <input type="text" name="serie_desembarque" class="form-control" placeholder="DS01" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Serie Reparto <span class="text-red">(*)</span></label>
                                                        <input type="text" name="serie_reparto" class="form-control" placeholder="RP01" autocomplete="off">
                                                    </div>
                                                </div>                                                
                                                <div class="col-md-12">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>TIPO COMPROBANTE</th>
                                                                <th>SERIE</th>
                                                                <th>NÚMERO</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody name="detalle-serie_facturacion"></tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <th><button type="button" class="btn btn-default btn-sm" name="nuevo_serie_facturacion"><i class="fa fa-plus"></i> Agregar Nuevo</button></th>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>  
                                        </div>   
                                        <div class="tab-pane" id="local-facturacion_electronica">
                                            <div class="row">   
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label><input type="checkbox" name="fl_facturacion" autocomplete="off"> Facturación Electrónica </label>                                            
                                                    </div>
                                                </div>                                                
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Código de Establecimiento (SUNAT) <span class="text-red">(*)</span></label>
                                                        <input type="text" name="codigo_sunat" class="form-control" autocomplete="off" placeholder="0000">
                                                    </div>
                                                </div> 
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Tipo Afectación <span class="text-red">(*)</span></label>
                                                        <select name="tipo_afectacion_igv" class="form-control" autocomplete="off">
                                                            <option value="">Seleccione...</option>
                                                            <option value="GRAVADO">GRAVADO ONEROSO</option>
                                                            <option value="EXONERADO">EXONERADO ONEROSO</option>
                                                        </select>
                                                    </div>
                                                </div>    
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Texto en parte inferior de factura </label>
                                                        <input type="text" name="texto_bottom_factura" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>   
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>TOKEN PSE </label>
                                                        <input type="text" name="token_pse" class="form-control mayus_false" data-mayus="false" autocomplete="off">
                                                    </div>
                                                </div>
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
                tipo: {required: true},
                nombre: {required: true},
                codigo_sunat: {required: true},
                tipo_afectacion_igv: {required:true},
                serie_orden: {required:true},
                serie_manifiesto: {required:true},
                serie_desembarque: {required:true},
                serie_reparto: {required:true},
                formato_impresion: {required:true}
            },
          
            messages: {
                tipo: 'Tipo',
                nombre: 'Nombre del Gasto',
                codigo_sunat: 'Código SUNAT',
                tipo_afectacion_igv: 'Tipo de afectación IGV',
                serie_orden: 'Serie Orden de Servicio',
                serie_manifiesto: 'Serie de Manifiestos',
                serie_desembarque: 'Serie de Desembarque',
                serie_reparto: 'Serie de Reparto',
                formato_impresion: 'Formato de Impresión'
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

        /* CHANGE FL FACTURACIÓN */
        DOM.on('click', 'input[name="fl_facturacion"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_facturacion();
        });

        /****************** SERIES */
        /* NUEVA SERIE */
        DOM.on('click', 'button[name="nuevo_serie_facturacion"]', function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_serie_facturacion();
        });
        
        Componente.datatable();
        await Componente.get_comprobante();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,

    /************ */
    // SERIE DE FACTURACIÓN

    get_comprobante: async () => {
        axios.get(BASE_API + 'recursos/data_static/comprobante')
        .then(function(response) {

            Componente.array_comprobante = response.data;

        }).catch(error => {
            console.log(error);
        }); 
    },

    agregar_serie_facturacion: (data = null) => {

        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                id: '',
                id_comprobante: '',
                serie: '',
                numero_inicial: ''
            };
        }

        let option_comprobante = '';

        Componente.array_comprobante.forEach(comprobante => {
            option_comprobante += `<option value="`+comprobante.id+`">`+comprobante.text+`</option>`;
        });

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                <td><select data-name="id_comprobante" style="width:250px;" class="form-control">`+option_comprobante+`</select></td>
                <td><input type="text" data-name="serie"  class="form-control" value="`+data.serie+`" /></td>
                <td><input type="number" step="any" data-name="numero_inicial"  class="form-control" value="`+data.numero_inicial+`" /></td>
                <td><button type="button" onclick="$('tr[data-codigo=`+codigo+`]').remove();"class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-serie_facturacion"]').append(html);

        DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="id_comprobante"]').val(data.id_comprobante);
    },

    get_datajson_serie_facturacion: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-serie_facturacion"] tr').each(function(){
           
            let item = {
                id : $(this).find('input[data-name="id"]').val(),
                id_comprobante: $(this).find('select[data-name="id_comprobante"]').val(),
                serie : $(this).find('input[data-name="serie"]').val(),
                numero_inicial : $(this).find('input[data-name="numero_inicial"]').val(),
            };
  
            detalle.push(item);
        });

        return detalle;
    },

    /************** */

    change_facturacion: () => {

        if(DOM.find('input[name="fl_facturacion"]').is(':checked'))
        {
            DOM.find('input[name="codigo_sunat"]').prop('disabled', false);
            DOM.find('input[name="token_pse"]').prop('disabled', false);
            DOM.find('select[name="tipo_afectacion_igv"]').prop('disabled', false);
            DOM.find('input[name="texto_bottom_factura"]').prop('disabled', false);
        }
        else
        {
            DOM.find('input[name="codigo_sunat"]').prop('disabled', true);
            DOM.find('input[name="token_pse"]').prop('disabled', true);
            DOM.find('select[name="tipo_afectacion_igv"]').prop('disabled', true);
            DOM.find('input[name="texto_bottom_factura"]').prop('disabled', true);
        }

    },


    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:BASE_API + 'configuracion/local',
            columns: [{
                    title: 'ACCIÓN',                
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group" style="width:110px;">
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
                },                
                { title: 'TIPO', render: function(data, type, row)
                    { 
                        let color = 'default';

                        switch (row.tipo) {                            

                            case 'SUCURSAL':
                                color = 'primary';
                            break;
                        
                            case 'SEDE':
                                color = 'success';
                            break;

                            case 'FILIAL':
                                color = 'info';
                            break;
                        }

                        return '<small class="label label-'+color+'">'+row.tipo+'</small>';
                    } 
                },
                { title: 'NOMBRE', mData: 'nombre' },
                { title: 'DIRECCIÓN', mData: 'direccion' },
                { title: 'FORMATO', mData: 'formato_impresion' },
                { title: 'S. ORDEN', mData: 'serie_orden' },
                { title: 'S. MANIFIESTO', mData: 'serie_manifiesto' },
                { title: 'S. DESEMBARQUE', mData: 'serie_desembarque' },
                { title: 'S. REPARTO', mData: 'serie_reparto' },
                { title: 'SERIES DE FACTURACIÓN', render: function(data, type, row){
                    let html = '<table class="table">';

                    row.series.forEach(serie => {
                        html += `
                            <tr>
                                <td>`+serie.comprobante+`</td>
                                <td>`+serie.serie+`-`+serie.numero_inicial+`</td>
                            </tr>
                        `;
                    });

                    html += `</table>`;

                    return html;
                }, visible: false },
                { title: 'CÓDIGO SUNAT', mData: 'codigo_sunat', visible: false },
                { title: 'TOKEN PSE', mData: 'token_pse', visible: false },
            ],
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nueva Local');

        /** DATA */
        HELPER.reset_form(form);

        this.id = null;
        this.action_submit = accion;

        this.change_facturacion();
        
        DOM.find('tbody[name="detalle-serie_facturacion"').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Local');

        /** DATA */
        HELPER.reset_form(form);
        DOM.find('tbody[name="detalle-serie_facturacion"').html('');

        let data = HELPER.get_attr_json(row);

        form.find('input[name="tipo"]').val(data.tipo);
        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="direccion"]').val(data.direccion);        
        form.find('input[name="fl_facturacion"]').prop('checked', parseInt(data.fl_facturacion));
        form.find('input[name="codigo_sunat"]').val(data.codigo_sunat);        
        form.find('input[name="token_pse"]').val(data.token_pse);     
        form.find('select[name="tipo_afectacion_igv"]').val(data.tipo_afectacion_igv).change();      
        form.find('input[name="serie_orden"]').val(data.serie_orden);      
        form.find('input[name="serie_manifiesto"]').val(data.serie_manifiesto);      
        form.find('input[name="texto_bottom_factura"]').val(data.texto_bottom_factura);  
        form.find('input[name="telefono"]').val(data.telefono);      
        form.find('input[name="serie_desembarque"]').val(data.serie_desembarque);
        form.find('input[name="serie_reparto"]').val(data.serie_reparto);
        form.find('select[name="formato_impresion"]').val(data.formato_impresion).change();   
        form.find('input[name="limite_maximo_saldo_caja_chica"]').val(data.limite_maximo_saldo_caja_chica);
        
        
        this.change_facturacion();

        data.series.forEach(row => {
            Componente.agregar_serie_facturacion(row);
        });

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Local');

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

        formData.append('detalle_serie_facturacion', JSON.stringify(this.get_datajson_serie_facturacion()));

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/local/' + this.action_submit,
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