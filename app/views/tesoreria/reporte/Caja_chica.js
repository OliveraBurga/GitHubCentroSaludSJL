 
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
                            Caja chica
                            <small>Reportes</small>
                        </h1>
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
                                    <input type="date" data-filtro="fecha_inicio" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Fecha Hasta</label>
                                    <input type="date"  data-filtro="fecha_fin" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Local Anexo</label>
                                    <select data-filtro="id_local" data-select="LOCAL" class="form-control" autocomplete="off"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Usuario</label>
                                    <select data-filtro="id_usuario" data-select="USUARIO" class="form-control" autocomplete="off"></select>
                                </div>
                            </div>
                            <div class="col-md-1" style="padding-top:19px;">
                                <button class="btn btn-warning" name="update_datatable"><i class="fa fa-search"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.box -->

                <!-- Default box -->
                <div class="box box-warning">
                    <div class="box-body">
                    <div class="table-responsive">
                        <table name="registros" class="table table-striped table-bordered nowrap" style="width:100%;">
                            <tfoot>
                                <tr>
                                    <th colspan="5"></th>
                                    <th></th>
                                    <th></th>
                                    <th colspan="4"></th>
                                </tr>
                            </tfoot>
                        </table>
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

    imprimir: (id_caja_chica) => {

        axios.get(BASE_API + 'tesoreria/caja_chica/print/'+id_caja_chica)
        .then(function (response) {
            
            let data = response.data;

            let html = `
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
                                    <td align="center"><strong>REPORTE DE CAJA CHICA</strong></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width:100%;">
                                <tr>
                                    <td>USUARIO:</td>
                                    <td style="text-align:right;">`+data.caja_chica.usuario+`</td>                                    
                                </tr>
                                <tr>
                                    <td>APERTURA:</td>
                                    <td style="text-align:right;">`+HELPER.fecha_hora(data.caja_chica.fecha_apertura)+`</td>                                    
                                </tr>
                                <tr>
                                    <td>CIERRE:</td>
                                    <td style="text-align:right;">`+((data.caja_chica.fecha_cierre != null) ? HELPER.fecha_hora(data.caja_chica.fecha_cierre) : '-')+`</td>                                    
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top:10px; padding-bottom:10px;"><div style="border-top:dashed 1px #000;"></div></td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width:100%;">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>DESCRIPCIÓN</th>
                                        <th>EGRESOS</th>
                                        <th>INGRESOS</th>
                                    </tr>
                                </thead>
                                <tbody>`;
            
                                let total_egresos = 0;
                                let total_ingresis = 0;
                                let contador = 0;

                                response.data.detalle.forEach(row => {
                                    
                                    contador++;
                                    let importe_egreso = '-';
                                    let importe_ingreso = '-';
            
                                    switch (row.tipo_movimiento) {
                                        case 'EGRESO':
                                            importe_egreso = parseFloat(row.importe).toFixed(2);
                                        break;
                                    
                                        case 'INGRESO':
                                            importe_ingreso = parseFloat(row.importe).toFixed(2);
                                        break;
                                    }
                                    
                                    html += `
                                        <tr>
                                            <td>`+contador+`</td>
                                            <td>`+row.descripcion.substr(0, 25)+`</td>
                                            <td style="text-align:right;">`+importe_egreso+`</td>
                                            <td style="text-align:right;">`+importe_ingreso+`</td>
                                        </tr>
                                    `;
                                });
            
                                html += `
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top:10px; padding-bottom:10px;"><div style="border-top:dashed 1px #000;"></div></td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width:100%;">
                                <tr>
                                    <th></th>
                                    <th>TOTALES</th>                                    
                                </tr>
                                <tr>
                                    <td>SALDO INICIAL</td>
                                    <td>`+GLOBAL.moneda_sistema.simbolo+` <span style="float:right;">`+data.caja_chica.saldo_inicial+`</span></td>                                    
                                </tr>
                                <tr>
                                    <td>TOTAL INGRESOS</td>
                                    <td>`+GLOBAL.moneda_sistema.simbolo+` <span style="float:right;">`+data.caja_chica.total_ingreso+`</span></td>                                    
                                </tr>
                                <tr>
                                    <td>TOTAL EGRESOS</td>
                                    <td style="border-bottom:solid; border-bottom-width:1px;">`+GLOBAL.moneda_sistema.simbolo+` <span style="float:right;">- `+data.caja_chica.total_egreso+`</span></td>                                    
                                </tr>
                                <tr>
                                    <td>SALDO FINAL</td>
                                    <td>`+GLOBAL.moneda_sistema.simbolo+` <span style="float:right;">`+data.caja_chica.total_saldo+`</span></td>                                    
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width:100%;">
                                <tr>
                                    <td style="text-align:right; border-bottom:solid; border-bottom-width:1px; width:45%; padding-top:50px;"></td>
                                    <td style="width:10%;"></td>
                                    <td style="text-align:right; border-bottom:solid; border-bottom-width:1px; width:45%; padding-top:50px;"></td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;" >USUARIO</td>
                                    <td ></td>
                                    <td style="text-align:center;">SUPERVISOR</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                
            `;

            HELPER.print(html);

        }).catch(error => {
            console.log(error);
        });

    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        DOM.find('input[data-filtro="fecha_inicio"]').val(HELPER.fecha(null, 'YYYY-MM-DD'));
        DOM.find('input[data-filtro="fecha_fin"]').val(HELPER.fecha(null, 'YYYY-MM-DD'));
        
        /* DATATABLE UPDATE*/
        DOM.on('click', 'button[name="update_datatable"]', function(e) {
            e.stopImmediatePropagation();
            Componente.table.ajax.reload(null, false);
        });

        DOM.on('click', 'button[data-name="print"]', function(e) {
            e.stopImmediatePropagation();
            Componente.imprimir($(this).data('id_caja_chica'));
        });

        DOM.on('click', 'button[data-name="recalcular"]', function(e) {
            e.stopImmediatePropagation();
           
            axios.get(BASE_API + 'tesoreria/reporte/caja_chica/recalcular/'+$(this).data('id_caja_chica'))
            .then(function (response) {
                Componente.table.ajax.reload(null, false);
            }).catch(error => {
                console.log(error);
            });
        });


        Componente.select_local();
        Componente.select_usuario();
        Componente.datatable();

        HELPER.load_component();
    },

    select_local: async () => {
        let select = DOM.find('select[data-select="LOCAL"]');     
        select.empty();  
        select.append($('<option></option>').attr('value', '').text('TODOS'));

        await axios.get(BASE_API + 'configuracion/local/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });

            select.select2();
        }).catch(error => {
            console.log(error);
        });
    },

    select_usuario: async () => {
        let select = DOM.find('select[data-select="USUARIO"]');     
        select.empty();  
        select.append($('<option></option>').attr('value', '').text('TODOS'));

        await axios.get(BASE_API + 'configuracion/usuario/get_select')
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
            ajax: {
                url: BASE_API + 'tesoreria/reporte/caja_chica',
                data: function (d) {
                    d.fecha_inicio = DOM.find('input[data-filtro="fecha_inicio"]').val();
                    d.fecha_fin = DOM.find('input[data-filtro="fecha_fin"]').val();
                    d.id_local = DOM.find('select[data-filtro="id_local"]').val();
                    d.id_usuario = DOM.find('select[data-filtro="id_usuario"]').val();
                }
            },

            ordering:false,

            columns: [
                { title: 'ID', mData: 'id', visible:false},
                { title: '', render: function(data, type, row) { return `
                        <button data-name="print" data-id_caja_chica="`+row.id+`" class="btn btn-default btn-sm"><i class="fa fa-print"></i></button>
                        <button data-name="recalcular" data-id_caja_chica="`+row.id+`" class="btn btn-default btn-sm" title="Recalcular"><i class="fa fa-sync"></i> Recalcular</button>
                    `; }, class:'text-center'},
                { title: 'LOCAL ANEXO', mData: 'local'},
                { title: 'FECHA APERTURA', render: function(data, type, row) { return HELPER.fecha_hora(row.fecha_apertura, 'DD/MM/YYYY h:mm:ss a'); }, class:'text-center'},
                { title: 'SALDO INICIAL', render: function(data, type, row) { return '<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> '+row.saldo_inicial; }, class:'text-right'},
                { title: 'TOTAL INGRESO', render: function(data, type, row) { return '<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> '+row.total_ingreso; }, class:'text-right'},        
                { title: 'TOTAL EGRESO', render: function(data, type, row) { return '<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> '+row.total_egreso; }, class:'text-right'},
                { title: 'TOTAL SALDO', render: function(data, type, row) { return '<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> '+row.total_saldo; }, class:'text-right'},
                { title: 'FECHA CIERRE', render: function(data, type, row) { return HELPER.fecha_hora(row.fecha_cierre); }, class:'text-center'},
                { title: 'USUARIO', mData: 'usuario', class:'text-center' },
                { title: 'ESTADO', render: function(data, type, row) { 

                    let html = '';

                    if(row.estado == 'ABIERTO')
                    {
                        html = `<span class="label label-warning">ABIERTO</span>`;
                    }
                    else if(row.estado == 'CERRADO')
                    {
                        html = `<span class="label label-success">CERRADO</span>`;
                    }

                    return html; 
                    },
                }                
            ],

            footerCallback: function ( row, data, start, end, display ) {
                                    
                let saldo_inicial = 0;
                let total_ingreso = 0;
                let total_egreso = 0;
                let total_saldo = 0;

                data.forEach(item => {                        
                    
                    saldo_inicial = saldo_inicial + parseFloat(item.saldo_inicial);
                    total_ingreso = total_ingreso + parseFloat(item.total_ingreso);
                    total_egreso = total_egreso + parseFloat(item.total_egreso);   
                    total_saldo = total_saldo + parseFloat(item.total_saldo);          
                    
                });            

                let api = this.api();

                saldo_inicial = Math.round(saldo_inicial * 100) / 100;

                $(api.column(5).footer()).html('<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> <span style="float:right;">'+total_ingreso.toFixed(2)+'</span>');
                $(api.column(6).footer()).html('<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> <span style="float:right;">'+total_egreso.toFixed(2)+'</span>');
            },
            order: [
                [0, 'asc']
            ]
        });

    },
} 

export default Componente;