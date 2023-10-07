
import Imprimir_plan_atencion from '../operacion/Imprimir.js'
import Customer_triaje from '../../../customer/Triaje.js'


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
                            Historia Clinica Diaria
                            <small>Reporte</small>
                        </h1>
                    </div>
                    
                </div>
                </section>

                <!-- Main content -->
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
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Paciente <small></small></label>
                                <div class="form-group">
                                <select name="id_paciente_filtro" data-select="PACIENTE" class="form-control"></select>
                                </div>                              
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

           
                       
            <div class="modal inmodal fade" name="modal-historial" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title">Atencion </h4>
                        </div>
                        
                        <div class="modal-body">
                            <div class="row">          
                                <div class="col-md-12">
                                    <table style="width:100%;">
                                        <tr>
                                            <td colspan="2" style="text-align:  center;">
                                               <span style="font-weight:bold; color:#0d1013;font-size:20px; ">DETALLE PACIENTE</span>
                                            </td>
                                             
                                              
                                        </tr>
                                        <tr>
                                            <td style="text-align:  left;">
                                               <span style="font-weight:bold; color:#085BBE">HISTORIA CLINICA</span>
                                            </td>
                                            <td style="text-align: left;">
                                                <span name="historia_clinica" style="font-size:18px; color:#EA3838; font-weight:bold; text-align:left;"></span>
                                             </td>
                                              
                                        </tr>
                                        <tr>
                                            <td>
                                                 <span style="font-weight:bold; color:#085BBE">PACIENTE</span>
                                            </td>
                                            <td>
                                                <span name="paciente" style="font-size:18px; color:#EA3838; font-weight:bold; text-align:left;"> </span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-md-12">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>fecha</th>
                                                <th>Atencion</th>
                                              
                                                <th>Medico</th>
                                                <th>Servicio</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody name="detalle-historial"></tbody>
                                    </table>
                                </div>
                            </div>  
                        </div>
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
        DOM.find('input[name="fecha_inicio"]').val(HELPER.fecha_actual());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());

                /* DATATABLE UPDATE*/
                DOM.on('click', 'button[name="update_datatable"]', function(e) {
                    e.stopImmediatePropagation();
                    Componente.table.ajax.reload(null, false);
                });
        
       /* PRINT */
       DOM.on('click', 'button[name="row-print"]', function(e) {
        e.stopImmediatePropagation();
         
        let data = HELPER.get_attr_json($(this));
        Imprimir_plan_atencion.print(data);

        // Imprimir_plan_atencion.plan_atencion(data);
    });
    DOM.on('click', 'a[name="row-print_historial"]', function(e) {
        e.stopImmediatePropagation();

        axios.get(BASE_API + 'operacion/plan_atencion/print/'+$(this).data('id'))
        .then(function (response) {
            
            Imprimir_plan_atencion.print(response.data);        

        }).catch(error => {
            console.log(error);
        }); 

    });

    DOM.on('click', 'a[name="row-historial"]', function(e) {
        e.stopImmediatePropagation();
        Componente.historial($(this));
    });




            /* PRINT TRIAJE */
            DOM.on('click', 'a[name="row-print_triaje"]', function(e) {
                e.stopImmediatePropagation();
    
                let data = HELPER.get_attr_json($(this));
    
                axios.get(BASE_API + 'operacion/triaje/print/'+data.id_triaje)
                .then(function (response) {
                    
                    Customer_triaje.print(response.data);        
    
                }).catch(error => {
                    console.log(error);
                }); 
    
                
            });
    
        Componente.select_paciente();

        Componente.datatable();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,

    /************ */
     

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:   {
                url: BASE_API + 'reporte/historia',
                data: function (d) {
                    
                    d.id_paciente =  DOM.find('select[name="id_paciente_filtro"]').val();
                    d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                    d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();

                }
        },


          
            columns: [           
               

                {
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                        <div class="btn-group" style="width:150px;">`;

                  
                            html += `<button type="button" class="btn btn-default btn-sm" name="row-print">VISUALIZAR</button>`;
                       
                        
                        html += `
                            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-angle-down"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-left" role="menu">`;

                   
                        html += `
                                <li><a class="dropdown-item" name="row-historial" href="javascript:"><i class="far fa-edit"></i> Ver Historial</a></li>
                            </ul>
                        </div>
                        `;

                    return html;
                    },
                    width: '100px',
                },
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'HISTORIA CLINICA', mData: 'plan_atencion' },
                { title: 'ATENCIÒN', mData: 'atencion' },
                { title: 'TRIAJE', render: function(data, type, row) { 


                    let html = '';

                        if (row.id_triaje != null) {

                            html = '<a href="javascript:" class="text-green" name="row-print_triaje"><i class="fa fa-print"></i> '+ row.numero_triaje +'</a>';
                            
                        }

                        return html;
                    }, class: 'text-center'
                
                },
                { title: 'PERSONAL MEDICO', mData: 'personal' },
                { title: 'PACIENTE', mData: 'paciente' },
                { title: 'SERVICIO', mData: 'servicio' },
               
                { title: 'OBSERVACION', mData: 'observacion' },
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

 
  historial: function(row) {

        DOM.find('tbody[name="detalle-historial"]').html('');
        
        let data = HELPER.get_attr_json(row);
 
   /*      Componente.id_atencion = data.id; */

        DOM.find('span[name="paciente"]').text(data.paciente);
        DOM.find('span[name="historia_clinica"]').text(data.historia_clinica);

        axios.get(BASE_API + 'operacion/plan_atencion/historial?id_paciente='+data.id_paciente)
        .then(function (response) {

            let data = response.data;
           let  html ='';
                data.forEach(row => {
                    
                    html += `
                        <tr data-json='`+JSON.stringify(row)+`'>
                            <td style="width:100px; text-align:center; font-size:14px;">
                                <div>`+row.fecha+`</div>
                            </td>
                            <td>
                                <div>`+row.atencion+`</div> 
                                
                            </td>
                            <td  >
                            <div>`+row.personal+`</div> 
                            </td>
                            <td  >
                            <div>`+row.servicio+`</div> 
                            </td>
                            <td  >
                            <a class="dropdown-item" href="javascript:" name="row-print_historial" data-id="`+row.id+`"><i class="far fa-print"></i></a>
                            </td>
                        </tr>
                    `;
                });
                        
                    

            DOM.find('tbody[name="detalle-historial"]').html(html);
            DOM.find('div[name="modal-historial"]').modal('show');

        }).catch(error => {
            console.log(error);
        });

        
    },

} 

export default Componente;