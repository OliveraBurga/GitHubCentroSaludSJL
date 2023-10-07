
 import Numero_letra from '../recursivo/Numero_letras.js'
 
  import Imprimir_caja from './Imprimir.js'

let DOM, DOM_ID ;
let Componente = {
    render: async (d, tipo = 'ATENCION') => {

        let titulo = 'Atencion';

       
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            `+titulo+`
                            <small>Tesoreria</small>
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
                    <div class="row">        
                      <div class="col-md-2">
                        <div class="form-group">
                            <label>Fecha Desde</label>
                            <input type="date" name="fecha_inicio" id="fecha_inicio" class="form-control" autocomplete="off">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                            <label>Fecha Hasta</label>
                            <input type="date" name="fecha_fin" id="fecha_fin" class="form-control" autocomplete="off">
                        </div>
                      </div>
                      <div class="col-md-1" style="padding-top:19px;">
                        <button class="btn btn-warning" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.box -->

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
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Fecha <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <input type="date" class="form-control" name="fecha" />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Serie <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <input type="text" class="form-control" name="serie" disabled />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Número <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <input type="text" class="form-control" name="numero" disabled/>
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Paciente <small>(*)</small></label>
                                            <div class="form-group">
                                            <select name="id_paciente" data-select="PACIENTE" class="form-control"></select>
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Personal <small>(*)</small></label>
                                            <div class="form-group">
                                            <select name="id_personal" data-select="PERSONAL" class="form-control"></select>
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Area  <small>(*)</small></label>
                                            <select name="tipo_servicio" class="form-control select" >
                                            <option value="LABORATORIO">LABORATORIO</option>
                                            <option value="CONSULTA MEDICA">CONSULTA MEDICA</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Servicio <small>(*)</small></label>
                                            <div class="form-group">
                                            <select name="id_servicio" data-select="SERVICIO" class="form-control"></select>
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4" style="display:none">
                                        <div class="form-group">
                                            <label>Tarifa <small>(*)</small></label>
                                            <div class="form-group">
                                            <select name="id_tarifa" data-select="TARIFA" class="form-control"></select>
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Moneda <span class="text-red">(*)</span></label>
                                            <select name="id_moneda" data-select="MONEDA" class="form-control select"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Tipo Cambio <span class="text-red">(*)</span></label>
                                            <input type="number" step="any" name="tipo_cambio" class="form-control" autocomplete="off">
                                        </div>
                                    </div>  
                                     
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Importe <span class="text-red">(*)</span></label>
                                            <input type="number" name="importe" class="form-control" autocomplete="off">
                                        </div>                         
                                    </div> 
                                    
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Cod Presta <span class="text-red">(*)</span></label>
                                            <input type="number" name="cod_presta" class="form-control" autocomplete="off">
                                        </div>                         
                                    </div> 

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Descripción <span class="text-red"> </span></label>
                                            <input type="text" class="form-control" name="comentario" />                             
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="contenedor-detalle_importes">
                                        <div class="row">
                                            <div class="col-md-12">
                                            <div class="table-responsive" >
                                                <table class="table" style="width:100%; background-color:#DAEDFC; padding:10px;">
                                                    <thead>
                                                        <tr>
                                                            <th>CANTIDAD</th>
                                                            <th>SERVICIO</th>
                                                            <th>COSTO UNITARIO</th>
                                                            <th>PRECIO CONVENIO</th>
                                                            <th>IMPORTE</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody name="detalle_importes"></tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colspan="2" align="center"><button type="button" name="agregar_item_costo" class="btn btn-primary"><i class="fa fa-plus"></i> Agregar Servicio</button></td>
                                                            <td   align="right"><span name="total_costo" style="font-size:18px; color:#EA3838; font-weight:bold; text-align:left;"> 00</span> </td>
                                                            <td   align="right"><span name="total_convenio" style="font-size:18px; color:#EA3838; font-weight:bold; text-align:left;"></span> </td>
                                                            <td   align="right"> <span name="total_importe" style="font-size:18px; color:#EA3838; font-weight:bold; text-align:left;"></span></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
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
                                        Confirmo realizar la anulación</label>
                                    <p style="color:red;">Esta acción no se podrá revertir</p>
                                </div>
                                <div class="col-md-12" name="texto" align="center">

                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Anular Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        

        </div>            
        `;

        Componente.after_render(tipo);     
        
    },

    after_render: async (tipo) => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                fecha: {required: true},
                id_paciente: {required: true},
                id_personal: {required: true},
            /*     id_tarifa: {required: true}, */
                importe: {required: true},
                id_servicio: {required: true},
                 
               
            },
          
            messages: {
                fecha: 'Fecha',
                id_paciente: 'Paciente',
                id_personal: 'Personal',
          /*       id_tarifa: 'Tarifa', */
                importe: 'Importe',
                id_servicio: 'Servicio',
             
          
            },

            submitHandler: function() {
                Componente.submit();
            }
          
        });

        /* DATATABLE UPDATE*/
        DOM.on('click', 'button[name="update_datatable"]', function(e) {
            e.stopImmediatePropagation();
            Componente.table.ajax.reload(null, false);
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
        DOM.on('change', 'select[name="id_tarifa"]', function(e) {
            e.stopImmediatePropagation();

            if(Componente.fl_auto_event == true)
            {
                 Componente.selec_precio();
            }


        });
        /* PRINT */
        DOM.on('click', 'button[name="row-print"]', function(e) {
            e.stopImmediatePropagation();
            
            let data = HELPER.get_attr_json($(this));
            console.log(data);
            Componente.print(data.id);
        });

        /* EDITAR */
        DOM.on('click', 'a[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit($(this));
        });

        /* CHANGE MONEDA*/
        DOM.on('change', 'select[name="id_moneda"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
       
                Componente.change_moneda();
            }            
        });


        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
         //  
        });
        DOM.on('change', 'select[name="tipo_servicio"]', function(e) {
            e.stopImmediatePropagation();
            if (Componente.fl_auto_event = true) {
                Componente.select_servicio();
                Componente.change_select_servicio();
            }
            
         
        });

        DOM.on('change', 'select[name="id_servicio"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
            Componente.select_tarifa();
            }
         
        });
        /* CHANGE FL DETALLE IMPORTES*/
        DOM.on('keyup', 'input[data-name="detalle_importe-cantidad"]', function(e) {
            e.stopImmediatePropagation();
            if (Componente.fl_auto_event = true) {
            Componente.calcular_importe_detalle_importe($(this).data('codigo'));
            }
        });

        /* CHANGE FL DETALLE IMPORTES*/
        DOM.on('keyup', 'input[data-name="detalle_importe-precio_convenio"]', function(e) {
            e.stopImmediatePropagation();
            if (Componente.fl_auto_event = true) {
            Componente.calcular_importe_detalle_importe($(this).data('codigo'));
            }
        });

        DOM.on('keyup', 'input[data-name="detalle_importe-costo_unitario"]', function(e) {
            e.stopImmediatePropagation();
            if (Componente.fl_auto_event = true) {
            Componente.calcular_importe_detalle_importe($(this).data('codigo'));
            }
        });

        /**** DETALLE DE CARGA */
        DOM.on('change', 'select[data-name="id_servicio"]', function(e) {
            e.stopImmediatePropagation();
            if (Componente.fl_auto_event = true) {
            Componente.consultar_costo($(this).data('codigo'),$(this).val());
            
            }
        });
        
        /* QUITAR ITEM */
        DOM.on('click', 'button[name="quitar-item"]', function(e) {
        e.stopImmediatePropagation();
        Componente.quitar_item($(this));
        if (Componente.fl_auto_event = true) {
        Componente.calcular_total_orden();
        Componente.calcular_importe_total();
        }
        });

        /* CHANGE FL DETALLE IMPORTES*/
        DOM.on('click', 'button[name="agregar_item_costo"]', function(e) {
            e.stopImmediatePropagation();
            if (Componente.fl_auto_event = true) {
                Componente.agregar_item_costo();
            }
         
        });


        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
        
        Componente.tipo = tipo;
        Componente.select_paciente();
        Componente.select_personal();
        
        Componente.select_moneda();
        Componente.datatable();
  

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    fl_auto_event: true,
    tipo: null,


     
    /* ************************** */

    agregar_item_costo: (data = null) => {

        if(data == null)
        {
            data = {
                cantidad: 1,
                id_servicio: '',
                costo_unitario: '',
                precio_convenio: '',
                importe: ''
            };
        }

        let codigo = Math.random().toString(36).substr(2);

/*         let option_servicio = '<option value="">Seleccione...</option>';

        Componente.array_sevicios.forEach(row => {
            option_servicio += `<option value="`+row.id+`">`+row.text+`</option>`;
        });
 */

        let html = `
            <tr data-codigo="`+codigo+`">
                
                <td style="width:150px;"><input type="number" data-codigo="`+codigo+`" step="any" class="form-control" data-name="detalle_importe-cantidad" value="`+data.cantidad+`"  /></td>
                <td><select data-select="SERVICIO" data-name="id_servicio" data-codigo="`+codigo+`" class="form-control"></select></td>
                <td style="width:150px;"><input type="number" data-codigo="`+codigo+`" step="any" class="form-control" data-name="detalle_importe-costo_unitario" value="`+data.costo_unitario+`" /></td>
                <td style="width:150px;"><input type="number" data-codigo="`+codigo+`" step="any" class="form-control" data-name="detalle_importe-precio_convenio" value="`+data.precio_convenio+`" /></td>
                <td style="width:150px;"><input type="number" step="any" class="form-control" data-name="detalle_importe-importe" readonly value="`+data.importe+`" /></td>
                <td><button type="button" name="quitar-item" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle_importes"]').append(html);
       /*  DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="id_servicio"]').val(data.id_servicio); */
       Componente.select__servicio(codigo,data.id_servicio);
    },

    select__servicio: async (codigo = null, id_servicio = '') =>
    {
        DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="SERVICIO"]').html('');
        let select = DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="SERVICIO"]');

        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

            Componente.array_sevicios.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
                
              
            });
       
        select.val(id_servicio);
        select.select2();
    },

    quitar_item: (dom) => {
 
        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

    },

    calcular_importe_detalle_importe: (codigo) => {

        let fila = DOM.find('tr[data-codigo="'+codigo+'"]');

        let cantidad = fila.find('input[data-name="detalle_importe-cantidad"]').val();
        cantidad = parseFloat((cantidad != '') ? cantidad : 0);

        let costo_unitario = fila.find('input[data-name="detalle_importe-costo_unitario"]').val();
        costo_unitario = parseFloat((costo_unitario != '') ? costo_unitario : 0);

        let importe = cantidad * costo_unitario;
        importe = Math.round(importe * 100) / 100;

        fila.find('input[data-name="detalle_importe-importe"]').val(importe.toFixed(2));

        Componente.calcular_total_orden();
        Componente.calcular_importe_total();
      
    },

    get_detalle_importes: () => {

        let response = [];

        DOM.find('tbody[name="detalle_importes"] tr').each(function(){

            response.push({
                cantidad: $(this).find('input[data-name="detalle_importe-cantidad"]').val(),
                id_servicio: $(this).find('select[data-name="id_servicio"]').val(),
                costo_unitario: $(this).find('input[data-name="detalle_importe-costo_unitario"]').val(),
                precio_convenio: $(this).find('input[data-name="detalle_importe-precio_convenio"]').val(),
                importe: $(this).find('input[data-name="detalle_importe-importe"]').val(),
            });

        });

        return response;
    },

    calcular_importe_total: async () => {

        let total_costo = 0;
        let total_convenio = 0;
        let total_importe = 0;

        DOM.find('tbody[name="detalle_importes"] tr').each(function(){
           
            let costo =  parseFloat($(this).find('input[data-name="detalle_importe-costo_unitario"]').val());
            let convenio = parseFloat( $(this).find('input[data-name="detalle_importe-precio_convenio"]').val());
            let importe =  parseFloat($(this).find('input[data-name="detalle_importe-importe"]').val());

            total_costo = total_costo + costo;
            total_convenio = total_convenio + convenio;
            total_importe = total_importe + importe;
        });

        DOM.find('span[name="total_costo"]').text(total_costo.toFixed(2));
        DOM.find('span[name="total_convenio"]').text(total_convenio.toFixed(2));
        DOM.find('span[name="total_importe"]').text(total_importe.toFixed(2));

    },

    calcular_total_orden: async () => {

    
        let importe_total = DOM.find('input[name="importe"]').val();

      
        importe_total = parseFloat(0);

        importe_total = Math.round(importe_total * 100) / 100;

        /*** SUMATORIA DETALLE ADICIONALES */
        
        DOM.find('tbody[name="detalle_importes"] tr').each(function(){

            let importe = $(this).find('input[data-name="detalle_importe-importe"]').val();
            importe = parseFloat((importe != '') ? importe : 0);


            importe_total = importe_total + importe;

        });

        DOM.find('input[name="importe"]').val(importe_total.toFixed(2))
    },



    /***-* */

    change_fl_detalle_importes: () => {

        if(DOM.find('input[name="fl_detalle_importes"]').is(':checked'))
        {
            DOM.find('div[name="contenedor-detalle_importes"]').show('fast');
        }
        else
        {
            DOM.find('div[name="contenedor-detalle_importes"]').hide('fast');
        }

    },


     
    consultar_costo: async(codigo,id)=>{
 
        let tipo = DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="id_servicio"]').val();
            await axios.get(BASE_API+'configuracion/tarifa/get_select_unique_costo/'+id)
            .then(function (response) {
               console.log(codigo);
               
                DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="detalle_importe-costo_unitario"]').val(response.data.costo);
                DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="detalle_importe-precio_convenio"]').val(response.data.precio_convenio);
            }).catch(error => {
                console.log(error);
            });


        Componente.calcular_importe_detalle_importe(codigo);

     },


    /************ */
    select_paciente: async () => {

        DOM.find('select[data-select="PACIENTE"]').select2({
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

    
    change_moneda: async (get_helper = true) => {
        let value = DOM.find('select[name="id_moneda"]').val();

        if(value == 1)
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', true);
            DOM.find('input[name="tipo_cambio"]').val('');
        }
        else if(value != '')
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', false);
            if(get_helper)
            {
                DOM.find('input[name="tipo_cambio"]').val(await HELPER.get_tipo_cambio(value));
            }
            
        }
    },
    select_moneda: async () => {

        let select = DOM.find('select[data-select="MONEDA"]');  

        await axios.get(BASE_API + 'recursos/data_static/moneda')
        .then(function (response) {

            let html = '<option value="">Seleccione...</option>';

            response.data.forEach(row => {
                html += '<option value="'+row.id+'">'+row.text+'</option>';
            });

            select.html(html);
            select.select2();
        }).catch(error => {
            console.log(error);
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


    change_select_servicio: async (id_servicio_nuevo = null) =>
    {
     
        let tipo = DOM.find('select[name="tipo_servicio"]').val();
         
        
        if (tipo == 'CONSULTA MEDICA') {
            
            DOM.find('select[name="id_servicio"]').prop('disabled', false);
            DOM.find('select[name="id_tarifa"]').prop('disabled', false);
            DOM.find('div[name="contenedor-detalle_importes"]').hide();
        
        }
        else
        {

            DOM.find('select[name="id_servicio"]').prop('disabled', true);
            DOM.find('select[name="id_tarifa"]').prop('disabled', true);
            DOM.find('div[name="contenedor-detalle_importes"]').show();
        }


    },
    select_servicio1: async (tipo) =>
    {
   
     
        
        await axios.get(BASE_API+'configuracion/tipo_servicio/get_select?tipo='+tipo)
        .then(async function (response) {


            Componente.array_sevicios = response.data;
          
           

        }).catch(error => {
            console.log(error);
        }); 
    },


    select_servicio: async (id_servicio_nuevo = null) =>
    {
        let select = DOM.find('select[data-select="SERVICIO"]');
        let tipo = DOM.find('select[name="tipo_servicio"]').val();
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));
        
        await axios.get(BASE_API+'configuracion/tipo_servicio/get_select?tipo='+tipo)
        .then(async function (response) {


            Componente.array_sevicios = response.data;
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

    select_tarifa: function(id_tarifa = null)
    {
        let select = DOM.find('select[data-select="TARIFA"]');
        let id_servicio = DOM.find('select[name="id_servicio"]').val();
        let id_cliente = DOM.find('select[name="id_paciente"]').val();

        DOM.find('select[data-select="TARIFA"]').html('');

        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        
        axios.get(BASE_API+'configuracion/tarifa/get_select?id_servicio='+id_servicio+'&id_cliente='+id_cliente)
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();   

            if(id_tarifa != null)
            {
                select.val(id_tarifa).change();
               
            }
        }).catch(error => {
            console.log(error);
        }); 
    },

    selec_precio: function()
    {
       
        let id_tarifa = DOM.find('select[name="id_tarifa"]').val();
 
        if (id_tarifa>0) {
            
            axios.get(BASE_API+'configuracion/tarifa/get_unique?id='+id_tarifa)
        .then(function (response) {
           
             DOM.find('input[name="importe"]').val(response.data.importe);
           
        }).catch(error => {
            console.log(error);
        }); 
        }
        
    },


    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:   {
                    url: BASE_API + 'operacion/atencion',
                    data: function (d) {
                        d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                        d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                        d.tipo = Componente.tipo;
                    }
            },

            columns: [
  { title: 'ID', mData: 'id' },
            {
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group" style="width:150px;">
                                <button type="button" class="btn btn-default btn-sm" name="row-print">VISUALIZAR</button>     
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                      <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-left" role="menu">
                                    <li><a class="dropdown-item" name="row-edit" href="javascript:"><i class="far fa-pencil"></i> Editar</a></li>
                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-ban"></i> Anular</a></li>
                                </ul>
                            </div>
                        `;

                        return html;
                    },
                    width: '100px',
                },
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'NÚMERO', mData: 'atencion' },
                  
                { title: 'PERSONAL MEDICO', mData: 'personal' },
                { title: 'PACIENTE', mData: 'paciente' },
                { title: 'AREA', mData: 'tipo' },
                { title: 'SERVICIO', mData: 'servicio' },
         /*        { title: 'TARIFA', mData: 'tarifa' }, */
                { title: 'IMPORTE', mData: 'importe' },
                { title: 'COD PRESTA', mData: 'cod_presta' }, 
                
                { title: 'ESTADO', defaultContent: ``,                    
                    render: function(data, type, row) {
                        
                        let html = ``;

                    
                        if(row.fl_estado == 1)
                        {
                            html = `
                                <small class="label label-default"> REGISTRADO</small>
                            `;
                        }
                        else if(row.fl_estado == 2)
                        {
                            html = `
                                <small class="label label-primary"> CON TRIAJE</small>
                            `;
                        }
                        else if(row.fl_estado == 3)
                        {
                            html = `
                                <small class="label label-success"> ATENDIDO</small>
                            `;
                        }

                        if (row.tipo == 'LABORATORIO') {


                            html = `
                            <small class="label label-default"> REGISTRADO</small>
                          `;
     
                           
                            if(row.estado == 'ATENDIENDO')
                             {
                                 html = `
                                     <small class="label label-success"> ATENDIENDO</small>
                                 `;
                             }
                             else if(row.estado == 'FINALIZADO')
                             {
                                 html = `
                                     <small class="label label-primary"> FINALIZADO</small>
                                 `;
                             }
                            
                        }
                        if(row.fl_estado == 0)
                        {
                            html = `
                                <small class="label label-danger"> ANULADO</small>
                            `;
                        }

                        return html;
                    }
                },
                { title: 'COMENTARIO', mData: 'comentario' },
            ],
         
            createdRow: function (row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));

                if(data.fl_estado == 0)
                {
                    $(row).css('text-decoration', 'line-through');
                    $(row).css('color', 'red');
                }
            },
        });

    },

    get_correlativo: async () => {

        await axios.get(BASE_API+'operacion/atencion/get_correlativo')
        .then(function (response) {

            DOM.find('input[name="numero"]').val(response.data.numero);
            DOM.find('input[name="serie"]').val(response.data.serie);

        }).catch(error => {
            console.log(error);
        });

    },

    new: function() {
        DOM.find('tbody[name="detalle_importes"]').html('');
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nueva Atencion');

        /** DATA */
        HELPER.reset_form(form);
       
        form.find('input[name="fecha"]').val(HELPER.fecha_actual());
        DOM.find('select[name="tipo_servicio"]').val('CONSULTA MEDICA').change();
        this.get_correlativo();

        form.find('select[name="id_moneda"]').val(1).change();

        form.find('select[name="id_local"]').val(GLOBAL.usuario.id_local).change();

        this.id = null;
        this.action_submit = accion;
        
   
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: async (row) => {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Atención');
        DOM.find('tbody[name="detalle_importes"]').html('');
        /** DATA */
        HELPER.reset_form(form);

     

        let data = HELPER.get_attr_json(row);

        Componente.fl_auto_event = false;

        form.find('input[name="fecha"]').val(data.fecha);

        form.find('input[name="serie"]').val(data.serie);
        form.find('input[name="numero"]').val(data.numero);

        if(data.id_paciente != null)
        {
            form.find('select[name="id_paciente"]').html('');
            form.find('select[name="id_paciente"]').append(new Option(data.paciente, data.id_paciente));
        }        

        form.find('input[name="descripcion"]').val(data.descripcion);
        form.find('input[name="motivo"]').val(data.motivo).change();
        form.find('select[name="modalidad"]').val(data.modalidad).change();
        form.find('select[name="id_personal"]').val(data.id_personal).change();
        form.find('select[name="id_moneda"]').val(data.id_moneda).change();

        form.find('input[name="importe"]').val(data.importe);
        form.find('input[name="cod_presta"]').val(data.cod_presta);
        
       form.find('input[name="tipo_cambio"]').val(data.tipo_cambio);
   
  

        form.find('select[name="tipo_servicio"]').val(data.tipo).change();
        form.find('input[name="comentario"]').val(data.comentario);
 
        if (data.tipo == 'CONSULTA MEDICA') {

            await Componente.select_servicio(data.id_servicio);
            await   Componente.select_tarifa(data.id_tarifa);
        }else
        {
            await  Componente.select_servicio1(data.tipo);

        }
     


        await Componente.change_moneda(false);
        form.find('select[name="id_tarifa"]').val(data.id_tarifa).change();

        data.detalle_importes.forEach(row => {
            Componente.agregar_item_costo(row);
        });

        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Anular Atención');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.serie+'-'+data.numero);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }

        formData.append('detalle_importes', JSON.stringify(Componente.get_detalle_importes()));
        formData.append('tipo', Componente.tipo);

        axios({
            method: 'post',
            url: BASE_API + 'operacion/atencion/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');

            if(Componente.action_submit == 'save')
            {
                Imprimir_caja.print(response.data.id_atencion);
            }
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },


    print: async (id) => {

        await axios.get(BASE_API + 'operacion/atencion/print/'+id)
        .then(function (response) {
            
            let data = response.data;
            Componente.ticket(response.data);

        }).catch(error => {
            console.log(error);
        }); 
    },

    

    ticket: async (data) => {

        let html = `
            <style>
                td{
                    padding:1px;
                }

            </style>
            
            <table border="0" cellspacing="0" cellpadding="0" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; max-width:350px;">
                <tr>
                    <td style="text-align:center;">
                        <img src="`+BASE_FILES+`images/`+data.empresa.logo_factura+`" style="width:250px;" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="4">
                            <tr>
                                <td align="center">`+data.empresa.razon_social+`</td>
                            </tr>
                            <tr>
                                <td align="center">Código IPRESS: `+data.empresa.numero_documento+`</td>
                            </tr>
                            <tr>
                                <td align="center">`+data.empresa.direccion+`</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="4">
                            <tr>
                                <td align="center" style="font-size:18px; font-weight:bold;">ATENCIÓN</td>
                            </tr>
                            <tr>
                                <td align="center" style="font-size:18px;">`+data.atencion+`</td>
                            </tr>
                        </table>
                    </td>
                </tr> 
                <tr>
                    <td style="text-align:center;">
                        Fecha de Registro: `+HELPER.fecha(data.fecha)+`
                    </td>
                </tr>              
                <tr>
                    <td style="padding-bottom:10px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="5">
                            <tr>
                                <td>Paciente: </td>
                                <td style="text-align:right;">`+data.paciente+`</td>
                            </tr>
                            <tr>
                                <td>Personal:</td>
                                <td style="text-align:right;">`+data.personal+`</td>
                            </tr>

                            <tr>
                                <td>Area:</td>
                                <td style="text-align:right;">`+data.tipo+`</td>
                            </tr>
                            `;

                           
                        if (data.tipo == 'CONSULTA MEDICA') {
                            
                        
                                                
                            
                            html += `


                           
                            <tr>
                                <td>Servicio:</td>
                                <td style="text-align:right;">`+data.servicio+`</td>
                            </tr>


                            <tr>
                                <td>Importe:</td>
                                <td style="text-align:right;">`+data.importe+`</td>
                            </tr>

                            `;

                        }

                           
                            
                            html += `
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="border-top:dashed 1px #000;"></td>
                </tr>

                `;

                           
                if (data.tipo == 'LABORATORIO') {
                    
                
                                        
                    
                    html += `

                <tr>
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="5">
                        <thead>
                            <tr>
                                <th style="text-align:center;">ITEM</th>
                                <th style="text-align:center;">CANTIDAD</th>
                                <th>SERVICIO</th>
                                <th style="text-align:right;">PRECIO</th>
                                <th align="right">IMPORTE</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
let contador = 1;

                            data.detalle_importes.forEach(row => { 

                                html += `
                                    <tr>
                                    <td style="text-align:center;">`+contador+`</td>
                                        <td style="text-align:center;">`+row.cantidad+`</td>
                                        <td>`+row.servicio+`</td>
                                     
                                        <td style="text-align:right;">`+parseFloat(row.costo_unitario).toFixed(2)+`</td>
                                        <td style="text-align:right;">`+row.importe+`</td>
                                    </tr>
                                `;
                                contador++;
                            });

                           
                            
                            html += `
                            
                        </tbody>
                        <tfoot>
                           
                            
                            <tr>
                                <td></td>
                                <td colspan="3" style="text-align:right; font-weight:bold;">TOTAL IMPORTE</td>
                                <td align="right" style="font-weight:bold;">S/ `+data.importe+`</td>
                            </tr>
                        </tfoot>                           
                        
                    </table>                
                </td>
            </tr> 
            `;

        }

           
            
            html += `
                <tr>
                    <td style="text-align:center;">
                        `+Numero_letra.convertir(data.importe, 'SOLES')+`
                     </td>
                </tr>`;
 
                
                html += `    
                <tr>
                    <td style="padding-top:10px; padding-bottom:10px;"><div style="border-top:dashed 1px #000;"></div></td>
                </tr>
 
                

            </table>
 
        `;

        await HELPER.print(html);
    },


} 

export default Componente;