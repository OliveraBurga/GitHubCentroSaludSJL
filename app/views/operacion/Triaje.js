

import Numero_letra from '../recursivo/Numero_letras.js'
import Customer_triaje from '../../../customer/Triaje.js'


let DOM, DOM_ID ;
let Componente = {
    render: async (d, tipo = 'TRIAJE') => {

        let titulo = 'Triaje';
       
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
                        
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content">

                <!-- Default box -->
                <div class="box box-info">
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
                      <div class="col-md-4">
                        <div class="form-group">
                            <label>Tipo <small> </small></label>
                            <div class="form-group">
                            <select name="id_tipo" data-select="hg" class="form-control select">
                            <option value="SIN_TRIAJE">PENDIENTE TRIAJE</option>
                            <option value="CON_TRIAJE">CON TRIAJE</option>
                            </select>
                            </div>                              
                        </div>
                    </div>

                      <div class="col-md-1" style="padding-top:19px;">
                        <button class="btn btn-info" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>
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
                                        <li class="active"><a href="#triaje" data-toggle="tab" aria-expanded="true">TRIAJE</a></li>
                                        <li class=""><a href="#signo" data-toggle="tab" aria-expanded="false">SIGNO DE PELIGRO</a></li>
                                       
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="triaje"> 
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="panel panel-default">
                                                        <div class="panel-heading">
                                                            <h3 class="panel-title"><i class="fa fa-concierge-bell"></i> Datos de la atención</h3>
                                                        </div>
                                                        <div class="panel-body">
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label>N° Atención <span class="text-red"> </span></label>
                                                                        <div class="form-group">
                                                                        <input type="text" class="form-control" data-name="numero_atencion" disabled />
                                                                        </div>                              
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label>Paciente <span class="text-red"> </span></label>
                                                                        <div class="form-group">
                                                                        <input type="text" class="form-control" data-name="paciente" disabled/>
                                                                        </div>                              
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label>Especialista <span class="text-red"> </span></label>
                                                                        <div class="form-group">
                                                                        <input type="text" class="form-control" data-name="especialista" disabled/>
                                                                        </div>                              
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label>Servicio <span class="text-red"> </span></label>
                                                                        <div class="form-group">
                                                                        <input type="text" class="form-control" data-name="servicio" disabled/>
                                                                        </div>                              
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Correlativo <span class="text-red">(*)</span></label>
                                                        <div class="input-group input-group-left-right">
                                                            <input type="text" name="serie" class="form-control" autocomplete="off" readonly/>
                                                            <span class="input-group-addon">-</span>
                                                            <input type="text" name="numero" class="form-control" autocomplete="off" readonly/>
                                                        </div>                             
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Fecha</label>
                                                        <input type="date" name="fecha" class="form-control" autocomplete="off">
                                                    </div>                         
                                                </div>   
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Presión Arterial <span class="text-red">(mmGH*)</span></label>
                                                        <input type="text" name="presion_arterial" class="form-control" autocomplete="off">
                                                    </div>                         
                                                </div>  
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Temperatura <span class="text-red">(*)</span></label>
                                                        <input type="text" name="temperatura" class="form-control" autocomplete="off">
                                                    </div>                         
                                                </div>  
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Frecuencia Respiratoria <span class="text-red">(mmGH*)</span></label>
                                                        <input type="text" name="frecuencia_respiratoria" class="form-control" autocomplete="off">
                                                    </div>                         
                                                </div>  
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Frecuencia  Cardiaca<span class="text-red">(*)</span></label>
                                                        <input type="text" name="frecuencia_cardiaca" class="form-control" autocomplete="off">
                                                    </div>                         
                                                </div>  
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Saturación<span class="text-red">(*)</span></label>
                                                        <input type="text" name="saturacion" class="form-control" autocomplete="off">
                                                    </div>                         
                                                </div>      
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Peso<span class="text-red">(*)</span></label>
                                                        <input type="text" name="peso" class="form-control" autocomplete="off">
                                                    </div>                         
                                                </div>                                    
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Talla<span class="text-red">( *)</span></label>
                                                        <input type="text" name="talla" class="form-control" autocomplete="off">
                                                    </div>                         
                                                </div> 

                                            </div>
                                        </div>
                                        <div class="tab-pane" id="signo"> 

                                        <div class="row">
                                                  
                                            <div class="col-md-12">
                                                <table class="table tabla_permiso">
                                                   
                                                        <tr>
                                                            <td class="font-weight-bold" colspan="5"  text-align:left;"><strong> A) MENOR A 2 MESES </strong></td>
                                                        </tr>
                                                     
                                                    <tbody name="tabla-1"></tbody>
                                                    <tr>
                                                            <td class="font-weight-bold" colspan="5"  text-align:left;"><strong> A) DE DOS MESES A 4 AÑOS
                                                            </strong></td>
                                                        </tr>
                                                    <tbody name="tabla-2"></tbody>
                                                    <tr>
                                                            <td class="font-weight-bold" colspan="5"  text-align:left;"><strong> A)  PARA TODAS LAS EDADES
                                                            </strong></td>
                                                        </tr>

                                                    <tbody name="tabla-3"></tbody>

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
                presion_arterial: {required: true},
                temperatura: {required: true},
                frecuencia_respiratoria: {required: true},
                frecuencia_cardiaca: {required: true},
                saturacion: {required: true},
                peso: {required: true},
                talla: {required: true},
            },
          
            messages: {
                fecha: 'Fecha',
                presion_arterial: 'Presión arterial',
                temperatura: 'Temeratura',
                frecuencia_respiratoria: 'Frecuencia respiratoria',
                frecuencia_cardiaca: 'Frecuencia cardiaca',
                saturacion: 'Saturación',
                peso: 'Peso',
                talla: 'Talla',
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

        /* EDITAR */
        DOM.on('click', 'a[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit($(this));
        });

        /* LIQUIDAR */
        DOM.on('click', 'button[name="row-liquidar"]', function(e) {
            e.stopImmediatePropagation();
            Componente.liquidar($(this));
        });


        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
         //  
        });
        DOM.on('change', 'select[name="id_servicio"]', function(e) {
            e.stopImmediatePropagation();
            Componente.select_tarifa();
         
        });

        DOM.on('change', 'select[name="id_tipo"]', function(e) {
            e.stopImmediatePropagation();

            Componente.table.ajax.reload(null, false);     
         
        });

        /* PRINT */
        DOM.on('click', 'a[name="row-print"]', function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));
            Customer_triaje.print(data);

        });

        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
        
        Componente.tipo = tipo;
        Componente.select_paciente();
        Componente.select_personal();
        Componente.select_servicio();
        Componente.datatable();
  

        HELPER.load_component();
    },

    /**** DATA */
    id_atencion: null,
    action_submit: null,
    imagen_anterior: null,
    fl_auto_event: true,
    tipo: null,
    id_delete:null,
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

    select_servicio: async (id_servicio_nuevo = null) =>
    {
        let select = DOM.find('select[data-select="SERVICIO"]');
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));
        
        await axios.get(BASE_API+'configuracion/tipo_servicio/get_select')
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

    select_tarifa: function()
    {
        let select = DOM.find('select[data-select="TARIFA"]');
        let id_servicio = DOM.find('select[name="id_servicio"]').val();
 
        axios.get(BASE_API+'configuracion/tarifa/get_select?id_servicio='+id_servicio)
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
                    url: BASE_API + 'operacion/triaje',
                    data: function (d) {
                        d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                        d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                        d.tipo =  DOM.find('select[name="id_tipo"]').val();
                    }
            },

            columns: [{
                title: 'ACCIÓN',
                defaultContent: ``,                    
                render: function(data, type, row) {
                        var html = `
                            <div class="btn-group" style="width:120px;">`;

                            if(row.fl_estado == null)
                            {
                                html += `<button type="button" class="btn btn-default btn-sm" name="row-liquidar"><i class="fa fa-flag"></i> TRIAJE</button>`;
                            }
                            else
                            {
                                html += `<a type="button" class="btn btn-default btn-sm" name="row-print">VISUALIZAR</a>`;
                            }
                            
                            html += `
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-left" role="menu">`;

                            if(row.fl_estado != null)
                            {
                                html += `
                                <li><a class="dropdown-item" name="row-edit" href="javascript:"><i class="far fa-edit"></i> Editar</a></li>
                                <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-ban"></i> Anular</a></li>`;
                            }

                            html += `
                                </ul>
                            </div>
                            `;

                        return html;
                    },
                    width: '100px',
                },
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: '# ATENCIÓN', mData: 'atencion' }, 
                { title: '# TRIAJE', mData: 'triaje' },
                { title: 'PERSONAL', mData: 'personal' },
                { title: 'PACIENTE', mData: 'paciente' },
                { title: 'SERVICIO', mData: 'servicio' },
                { title: 'TARIFA', mData: 'tarifa' },
                { title: 'ESTADO', defaultContent: ``,                    
                    render: function(data, type, row) {
                        
                        let html = ``;

                        if(row.fl_estado == 0)
                        {
                            html = `
                                <small class="label label-danger"> ANULADO</small>
                            `;
                        }
                        else if(row.fl_estado == 1)
                        {
                            html = `
                                <small class="label label-default"> REGISTRADO</small>
                            `;
                        }
                        else if(row.fl_estado == 2)
                        {
                            html = `
                                <small class="label label-primary"> APROBADO</small>
                            `;
                        }
                        else if(row.fl_estado == 3)
                        {
                            html = `
                                <small class="label label-success"> PROCESADO</small>
                            `;
                        }

                        return html;
                    }
                },
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

        await axios.get(BASE_API+'operacion/triaje/get_correlativo')
        .then(function (response) {

            DOM.find('input[name="numero"]').val(response.data.numero);
            DOM.find('input[name="serie"]').val(response.data.serie);

        }).catch(error => {
            console.log(error);
        });

    },

    liquidar: function(row) {
        DOM.find('tbody[name="tabla-1"').html('');     
        DOM.find('tbody[name="tabla-2"').html('');     
        DOM.find('tbody[name="tabla-3"').html('');     

        let data = HELPER.get_attr_json(row);       
        Componente.get_liquidacion(data.id_atencion);

        DOM.find('div[name="modal-save"]').modal('show');
    },

    get_liquidacion: async (id_atencion) => {

        let accion = 'save';
        Componente.id = null;

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Triaje');

        let form = DOM.find('form[name="save"]');

        
    await axios.get(BASE_API+'configuracion/signo_peligro/get_select')
    .then(function (response) {
       
        let data = response.data;

        let tipo1 = '';
        let tipo2 = '';
        let tipo3 = '';

        data.forEach(row => {
            
            if (row.tipo == 1) {
                tipo1 += `
                <tr data-name="`+row.text+`">
                    <td> `+row.text+` </td>
                    <td class="text-center">
                        <label class="toggleSwitch" > 
                            <input type="checkbox" name="fl_inconveniente" />
                            <span>
                                <span>NO</span>
                                <span>SI</span>
                            </span>
                            <a></a>
                        </label>
                    </td>
                    
                </tr>`;
            }
        
            if (row.tipo == 2) {
                tipo2 += `
                <tr data-name="`+row.text+`">
                    <td> `+row.text+` </td>
                    <td class="text-center">
                        <label class="toggleSwitch" > 
                            <input type="checkbox" name="fl_inconveniente" />
                            <span>
                                <span>NO</span>
                                <span>SI</span>
                            </span>
                            <a></a>
                        </label>
                    </td>
                    
                </tr>`;
            }
            if (row.tipo == 3) {
                tipo3 += `
                <tr data-name="`+row.text+`">
                    <td> `+row.text+` </td>
                    <td class="text-center">
                        <label class="toggleSwitch" > 
                            <input type="checkbox" name="fl_inconveniente" />
                            <span>
                                <span>NO</span>
                                <span>SI</span>
                            </span>
                            <a></a>
                        </label>
                    </td>
                    
                </tr>`;
            }


        });
        DOM.find('tbody[name="tabla-1"').html(tipo1);
        DOM.find('tbody[name="tabla-2"').html(tipo2);
        DOM.find('tbody[name="tabla-3"').html(tipo3);

    }).catch(error => {
        console.log(error);
    }); 



        await axios.get(BASE_API+'operacion/triaje/get_liquidar/'+id_atencion)
        .then( function  async (response) {

            let data = response.data;

            /** DATA */
            HELPER.reset_form(form);
            
            Componente.get_correlativo();
            form.find('input[name="fecha"]').val(HELPER.fecha_actual());

            form.find('input[data-name="numero_atencion"]').val(data.atencion);
            form.find('input[data-name="paciente"]').val(data.paciente);
            form.find('input[data-name="especialista"]').val(data.personal);
            form.find('input[data-name="servicio"]').val(data.servicio);

            Componente.id_atencion = id_atencion;
            Componente.action_submit = accion;
            Componente.archivo_anterior = null;

        }).catch(error => {
            console.log(error);
        }); 
         
    },

    edit: async (row) => {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Triaje');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);


        
        await axios.get(BASE_API+'configuracion/signo_peligro/get_select')
        .then(function (response) {
           
            let data = response.data;
    
            let tipo1 = '';
            let tipo2 = '';
            let tipo3 = '';
    
            data.forEach(row => {
                
                if (row.tipo == 1) {
                    tipo1 += `
                    <tr data-name="`+row.text+`">
                        <td> `+row.text+` </td>
                        <td class="text-center">
                            <label class="toggleSwitch" > 
                                <input type="checkbox" name="fl_inconveniente" />
                                <span>
                                    <span>NO</span>
                                    <span>SI</span>
                                </span>
                                <a></a>
                            </label>
                        </td>
                        
                    </tr>`;
                }
            
                if (row.tipo == 2) {
                    tipo2 += `
                    <tr data-name="`+row.text+`">
                        <td> `+row.text+` </td>
                        <td class="text-center">
                            <label class="toggleSwitch" > 
                                <input type="checkbox" name="fl_inconveniente" />
                                <span>
                                    <span>NO</span>
                                    <span>SI</span>
                                </span>
                                <a></a>
                            </label>
                        </td>
                        
                    </tr>`;
                }
                if (row.tipo == 3) {
                    tipo3 += `
                    <tr data-name="`+row.text+`">
                        <td> `+row.text+` </td>
                        <td class="text-center">
                            <label class="toggleSwitch" > 
                                <input type="checkbox" name="fl_inconveniente" />
                                <span>
                                    <span>NO</span>
                                    <span>SI</span>
                                </span>
                                <a></a>
                            </label>
                        </td>
                        
                    </tr>`;
                }
    
    
            });
            DOM.find('tbody[name="tabla-1"').html(tipo1);
            DOM.find('tbody[name="tabla-2"').html(tipo2);
            DOM.find('tbody[name="tabla-3"').html(tipo3);
     console.log('aaaaaaaaaa')
        }).catch(error => {
            console.log(error);
        }); 


        form.find('input[data-name="numero_atencion"]').val(data.atencion);
        form.find('input[data-name="paciente"]').val(data.paciente);
        form.find('input[data-name="especialista"]').val(data.personal);
        form.find('input[data-name="servicio"]').val(data.servicio);

        form.find('input[name="fecha"]').val(data.fecha);
        form.find('input[name="peso"]').val(data.peso);
        form.find('input[name="talla"]').val(data.talla);
        form.find('input[name="presion_arterial"]').val(data.presion_arterial);
        form.find('input[name="temperatura"]').val(data.temperatura);
        form.find('input[name="frecuencia_respiratoria"]').val(data.frecuencia_respiratoria);
        form.find('input[name="frecuencia_cardiaca"]').val(data.frecuencia_cardiaca);
        form.find('input[name="saturacion"]').val(data.saturacion);
        form.find('input[name="serie"]').val(data.serie);
        form.find('input[name="numero"]').val(data.numero);


        
    let tabla = DOM.find('tbody[name="tabla-1"]');
    let tabla2 = DOM.find('tbody[name="tabla-2"]');
    let tabla3 = DOM.find('tbody[name="tabla-3"]');

   await data.detalle.forEach(row => {
       
      
   
        let fila = tabla.find('tr[data-name="'+row.signo+'"]');
        if (row.tipo == 1 && row.fl_estado == 1) {

      
            fila.find('input[name="fl_inconveniente"]').prop('checked', true);

          }


          if (row.tipo == 2 && row.fl_estado == 1) {

            fila = tabla2.find('tr[data-name="'+row.signo+'"]');
            fila.find('input[name="fl_inconveniente"]').prop('checked', true);

          }

          if (row.tipo == 3 && row.fl_estado == 1) {
            
           fila = tabla3.find('tr[data-name="'+row.signo+'"]');
           fila.find('input[name="fl_inconveniente"]').prop('checked', true);

          }
 
  
      });
   

        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Anular Caja');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.serie+'-'+data.numero);

        this.id_atencion = data.id_atencion;
        this.action_submit = accion;
        this.id_delete = data.id;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id_atencion != null) { formData.append('id_atencion', this.id_atencion); }
        if (this.id_delete != null) { formData.append('id_delete', this.id_delete); }
        if (this.id != null) { formData.append('id', this.id); }

        formData.append('tipo', Componente.tipo);


        let actividad = [];
 let index = 0;
    DOM.find('tbody[name="tabla-1"] tr').each(function(){ 
        var activida = false;
        if($(this).find('input[name="fl_inconveniente"]').is(':checked'))
        {
            activida = true;   
        }
            actividad[index] = {

                nombre: $(this).attr('data-name'),
                fl_estado :activida === true ?1:0,
                tipo :1 ,
            };   

            index++;
              

    });
    
    DOM.find('tbody[name="tabla-2"] tr').each(function(){ 
        var activida = false;
        if($(this).find('input[name="fl_inconveniente"]').is(':checked'))
        {
            activida = true;   
        }
            actividad[index] = {

                nombre: $(this).attr('data-name'),
                fl_estado :activida === true ?1:0,
                tipo :2 ,
            };   
             
            index++;
              

    });
    DOM.find('tbody[name="tabla-3"] tr').each(function(){ 
        var activida = false;
        if($(this).find('input[name="fl_inconveniente"]').is(':checked'))
        {
            activida = true;   
        }
            actividad[index] = {

                nombre: $(this).attr('data-name'),
                fl_estado :activida === true ?1:0,
                tipo :3 ,
            };   
             
            index++;
              

    });

    formData.append('signo', JSON.stringify(actividad));


        axios({
            method: 'post',
            url: BASE_API + 'operacion/triaje/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');

            if(Componente.action_submit == 'save')
            {
                Imprimir_caja.print(response.data.id_caja);
            }
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;