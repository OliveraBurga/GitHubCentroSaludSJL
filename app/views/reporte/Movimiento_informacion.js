


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
                             Movimiento de Información
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
             
 
         </div>            
         `;
         
         await Componente.after_render();       
         
     },
 
     after_render: async () => {
 
         DOM_ID = '#main';
         DOM = $(DOM_ID);        
         
         /* DATATABLE UPDATE*/
         DOM.on('click', 'button[name="update_datatable"]', function(e) {
             e.stopImmediatePropagation();
             Componente.table.ajax.reload(null, false);
         });
  
         DOM.find('input[name="fecha_inicio"]').val(HELPER.fecha_actual());
         DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
 
         Componente.datatable();
 
         HELPER.load_component();
     },
      
     datatable: function() {
 
         let titulo = 'REPORTE DE SERVICIOS';
         let fecha_desde = 'Desde '+HELPER.fecha(DOM.find('input[name="fecha_inicio"]').val())+`  - Hasta `+HELPER.fecha(DOM.find('input[name="fecha_fin"]').val());
 
         this.table = DOM.find('table[name="registros"]').DataTable({
             ajax: {
                 url: BASE_API + 'reporte/movimiento_informacion',
                 data: function (d) {
                     d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                     d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                 }
             },
 
             buttons: [
                 {
                     extend: 'print',
                     exportOptions: { columns: ':visible', stripHtml: false },
                     title: '',
                     footer: true,
                     customize: function ( win ) { 
                         $(win.document.body)
                             .css( 'font-size', '8px' )
                             .prepend(
                                 `
                                 <style>
                                 td, th{
                                     white-space:nowrap;
                                     padding:3px !important;  
                                 }
                                 </style>
                                 <div style="text-align:center;"><h3>`+titulo+`</h3></div>
                                 <div style="text-align:center; font-size:14px;">`+fecha_desde+`</div>
                                 `
                         );
 
                         $(win.document.body).find( 'table' )
                         .addClass( 'compact' )
                         .css( 'font-size', 'inherit' );
                     }
                 },
                 {
                     extend: 'excelHtml5',
                     exportOptions: { columns: ':visible' },
                     title: titulo+ ' '+fecha_desde,
                     footer: true,
                 },
                 {
                     extend: 'colvis',
                     text: "Mostrar Columnas",
                 }
             ],
 
             columns: [
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'USUARIO', mData: 'usuario' },
                { title: 'MÓDULO', mData: 'modulo' },
                { title: 'MENÚ', mData: 'menu' },
                { title: 'ACCIÓN', render: function(data, type, row) { 
                        
                    let html = '';

                        switch (row.accion) {
                            case 'NUEVO':
                                html = `<small class="label label-primary"> `+row.accion+`</small>`;
                            break;

                            case 'EDITAR':
                                html = `<small class="label label-warning"> `+row.accion+`</small>`;
                            break;

                            case 'ELIMINAR':
                                html = `<small class="label label-danger"> `+row.accion+`</small>`;
                            break; 
                            
                            case 'ANULAR':
                                html = `<small class="label label-warning"> `+row.accion+`</small>`;
                            break;
                        }

                        return html
                    }
                },
                { title: 'DESCRIPCIÓN', mData: 'descripcion' },
             ]
         });
 
     },
 } 
 
 export default Componente;