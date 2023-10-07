

import Numero_letra from '../recursivo/Numero_letras.js'

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
                            Atención Diaria
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
      

           /* PRINT */
           DOM.on('click', 'button[name="row-print"]', function(e) {
            e.stopImmediatePropagation();
            
            let data = HELPER.get_attr_json($(this));
            console.log(data);
            Componente.print(data.id);
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
                url: BASE_API + 'reporte/rad',
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
          /*       { title: 'TARIFA', mData: 'tarifa' }, */
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