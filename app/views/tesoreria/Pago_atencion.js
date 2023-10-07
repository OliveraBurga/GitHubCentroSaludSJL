

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
                             Pago de Atención
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
                             <table name="registros" class="table table-striped" style="width:100%;"></table>
                         </div>
                     </div>
                 </div>
                 <!-- /.box -->
 
             </section>
             <!-- /.content -->
 
             <!-- MODAL SAVE -->
             <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-xl">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                             <h4 name="save" class="modal-title">Modal title</h4>
                         </div>
                         <form name="save">
                             <input type="hidden" name="id_moneda" />
                             <div class="modal-body" style="height: 75vh; overflow-x:auto;">
                                 <div class="row">
                                     <div class="col-md-8">
                                         <div class="row">
                                             <div class="col-md-12">
                                                 <table class="table">
                                                     <thead>
                                                         <tr>
                                                             <th>FECHA</th>
                                                             <th>ATENCION</th>
                                                            
                                                             <th>CLIENTE</th>
                                                             <th>SERVICIO</th>
                                                             <th>TOTAL SERVICIO</th>   
                                                   
                                                             <th>TOTAL DEUDA</th>
                                                             <th></th>
                                                         </tr>
                                                     </thead>
                                                     <tbody name="detalle-atencion"></tbody>
                                                     <tfoot>
                                                         <tr>
                                                             <td><button type="button" name="mostrar_atencion" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                         </tr>
                                                     </tfoot>
                                                 </table>
                                             </div>
                                             <div class="col-md-6">
                                             </div>
                                           
                                             <div class="col-md-3">
                                                 <div class="form-group">
                                                     <label>Importe Total de Deuda<span class="text-red">(*)</span></label>
                                                     <input type="number" step="any" name="total_importe" class="form-control" autocomplete="off" readonly>        
                                                 </div>
                                             </div>  
                                         </div>
                                     </div>
                                     <div class="col-md-4">
                                         <div class="row">
                                             <div class="col-md-12">
                                                 <h4 style="font-weight:bold; text-align:center; ">DATOS DEL PAGO</h4>
                                             </div>
                                             <div class="col-md-12">
                                                 <div class="form-group">
                                                     <label>Fecha <span class="text-red">(*)</span></label>
                                                     <input type="date" name="fecha" class="form-control" autocomplete="off">        
                                                 </div>
                                             </div>
                                             <div class="col-md-6">
                                                 <div class="form-group">
                                                     <label>Tipo Canal <span class="text-red">(*)</span></label>
                                                     <select name="tipo_canal" class="form-control select" autocomplete="off">
                                                         <option value="">Seleccione...</option>
                                                         <option value="OFICINA">OFICINA</option>
                                                         <option value="AGENCIA">AGENCIA</option>
                                                         <option value="VENTANILLA">VENTANILLA</option>
                                                     </select>    
                                                 </div>
                                             </div>
                                             <div class="col-md-6">
                                                 <div class="form-group">
                                                     <label>Medio Pago <span class="text-red">(*)</span></label>
                                                     <select name="medio_pago" class="form-control select" autocomplete="off">
                                                         <option value="">Seleccione...</option>
                                                         <option value="EFECTIVO">EFECTIVO</option>
                                                         <option value="DEPOSITO">DEPOSITO</option>
                                                         <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                                                     </select>    
                                                 </div>
                                             </div>
                                             <div class="col-md-12">
                                                 <div class="form-group">
                                                     <label>Número Operación / Referencia <span class="text-red">(*)</span></label>
                                                     <input type="text" name="numero_operacion" class="form-control" autocomplete="off">        
                                                 </div>
                                             </div>
                                             <div class="col-md-12">
                                                 <div class="form-group">
                                                     <label>Monto a Pagar <span class="text-red">(*)</span></label>
                                                     <input type="number" step="any" name="monto_pago" class="form-control" autocomplete="off">        
                                                 </div>
                                             </div>
                                             <div class="col-md-12">
                                                 <div class="form-group">
                                                     <label>Cuenta Bancaria de destino (Empresa) <span class="text-red">(*)</span></label>
                                                     <select name="id_cuenta_bancaria_empresa" data-select="CUENTA_BANCARIA_EMPRESA" class="form-control" autocomplete="off"></select> 
                                                 </div>
                                             </div>
                                             <div class="col-md-12">
                                                 <div class="form-group">
                                                     <label>Observación / Detalle</label>
                                                     <input type="text" name="observacion" class="form-control" autocomplete="off">        
                                                 </div>
                                             </div>
                                             <div class="col-md-12" name="contenedor-aviso"></div>
                                         </div>
                                     </div>
                                 </div>                          
                             </div>
                             <div class="modal-footer" align="center" style="display:block">
                                 <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                 <button type="button" name="submit" class="btn btn-primary">Guardar</button>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
 
             <!-- MODAL EDIT -->
             <div class="modal inmodal fade" name="modal-edit" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                 <div class="modal-dialog ">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                             <h4 name="edit" class="modal-title">Modal title</h4>
                         </div>
                         <form name="edit">
                             <div class="modal-body">
                                 <div class="row">
                                     <div class="col-md-12">
                                         <h4 style="font-weight:bold; text-align:center; ">DATOS DEL PAGO</h4>
                                     </div>
                                     <div class="col-md-12">
                                         <div class="form-group">
                                             <label>Fecha <span class="text-red">(*)</span></label>
                                             <input type="date" name="fecha" class="form-control" autocomplete="off">        
                                         </div>
                                     </div>
                                     <div class="col-md-6">
                                         <div class="form-group">
                                             <label>Tipo Canal <span class="text-red">(*)</span></label>
                                             <select name="tipo_canal" class="form-control select" autocomplete="off">
                                                 <option value="">Seleccione...</option>
                                                 <option value="OFICINA">OFICINA</option>
                                                 <option value="AGENCIA">AGENCIA</option>
                                                 <option value="VENTANILLA">VENTANILLA</option>
                                             </select>    
                                         </div>
                                     </div>
                                     <div class="col-md-6">
                                         <div class="form-group">
                                             <label>Medio Pago <span class="text-red">(*)</span></label>
                                             <select name="medio_pago" class="form-control select" autocomplete="off">
                                                 <option value="">Seleccione...</option>
                                                 <option value="EFECTIVO">EFECTIVO</option>
                                                 <option value="DEPOSITO">DEPOSITO</option>
                                                 <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                                             </select>    
                                         </div>
                                     </div>
                                     <div class="col-md-12">
                                         <div class="form-group">
                                             <label>Número Operación / Referencia <span class="text-red">(*)</span></label>
                                             <input type="text" name="numero_operacion" class="form-control" autocomplete="off">        
                                         </div>
                                     </div>
                                     <div class="col-md-12">
                                         <div class="form-group">
                                             <label>Monto a Pagar <span class="text-red">(*)</span></label>
                                             <input type="number" step="any" name="monto_pago" class="form-control" autocomplete="off">        
                                         </div>
                                     </div>
                                     <div class="col-md-12">
                                         <div class="form-group">
                                             <label>Cuenta Bancaria de destino (Empresa) <span class="text-red">(*)</span></label>
                                             <select name="id_cuenta_bancaria_empresa" data-select="CUENTA_BANCARIA_EMPRESA" class="form-control" autocomplete="off"></select> 
                                         </div>
                                     </div>
                                     <div class="col-md-12">
                                         <div class="form-group">
                                             <label>Observación / Detalle</label>
                                             <input type="text" name="observacion" class="form-control" autocomplete="off">        
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <div class="modal-footer" align="center" style="display:block" >
                                 <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                 <button type="submit" name="submit" class="btn btn-danger">Guardar Cambios</button>
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
                                 <div class="col-md-12" name="texto" align="center"></div>
                             </div>
                             <div class="modal-footer" align="center" style="display:block" >
                                 <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                 <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
 
             <!-- MODAL ATENCION -->
             <div class="modal inmodal fade" name="modal-atencion" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-xl">
                     <div class="modal-content" >
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                             <h4 class="modal-title">Servicios pendientes de Pago</h4>
                         </div>
                         <div class="modal-body" style="height: 75vh; overflow-x:auto;">
                             <div class="row">
                                 <div class="col-md-12">
                                     <table name="registros_atencion" class="table table-striped nowrap" style="width:100%;"></table>
                                 </div>
                             </div>
                         </div>                        
                         <div class="modal-footer" align="center" style="display:block" >
                             <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                             <label class="pull-left" style="margin-top:5px; margin-left:10px;"> 
                                 <input type="checkbox" name="select_all_orden">
                                 Seleccionar Todas las Órdenes
                             </label>
 
                             <button type="button" name="agregar_a_pago" class="btn btn-primary">Agregar a Lista de Pagos</button>
                         </div>
                     </div>
                 </div>
             </div>
         
 
         </div>            
         `;
 
         Componente.after_render();     
         
     },
 
     after_render: async () => {
 
         DOM_ID = '#main';
         DOM = $(DOM_ID);        
 
         /** SUBMIT SAVE */
         DOM.find('form[name="save"]').validate({
 
             /* REGLAS */
             rules: {
                 id_moneda: {required:true},
                 fecha: {required: true},
                 tipo_canal: {required: true},
                 medio_pago: {required: true},
                 monto_pago: {required: true},
                 numero_operacion: {required: true},
                 id_cuenta_bancaria_empresa: {required: true}
             },
           
             messages: {
                 id_moneda: 'Moneda',
                 fecha: 'Fecha',
                 tipo_canal: 'Tipo de Canal',
                 medio_pago: 'Medio de Pago',
                 monto_pago: 'Monto a Pagar',
                 numero_operacion: 'Número de Operación / Referencia',
                 id_cuenta_bancaria_empresa: 'Cuenta bancaria de destino (Empresa)'
             },
           
         });
 
         DOM.on('click', 'form[name="save"] button[name="submit"]', function(e) {
             e.stopImmediatePropagation();
   
             if(DOM.find('form[name="save"]').valid())
             {
                 Componente.submit();
             }
             
         });
 
         /** SUBMIT EDIT */
         DOM.find('form[name="edit"]').validate({
 
             /* REGLAS */
             rules: {
                 fecha: {required: true},
                 tipo_canal: {required: true},
                 medio_pago: {required: true},
                 monto_pago: {required: true},
                 numero_operacion: {required: true},
                 id_cuenta_bancaria_empresa: {required: true}
             },
           
             messages: {
                 fecha: 'Fecha',
                 tipo_canal: 'Tipo de Canal',
                 medio_pago: 'Medio de Pago',
                 monto_pago: 'Monto a Pagar',
                 numero_operacion: 'Número de Operación / Referencia',
                 id_cuenta_bancaria_empresa: 'Cuenta bancaria de destino (Empresa)'
             },
 
             submitHandler: function() {
                 Componente.submit_operacion();
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
                 Componente.submit_operacion();
             }
         });
 
 
 
 
         /* MOSTRAR ORDENES */
         DOM.find('button[name="mostrar_atencion"]').click(function(e) {
             Componente.mostrar_atencion();
         });
 
         /* SELECCIONAR ALL ORDEN */
         DOM.find('input[name="select_all_orden"]').change(function(e) {
             Componente.select_all_orden();
         });
 
         /* AGREGAR A VIAJE */
         DOM.find('button[name="agregar_a_pago"]').click(function(e) {
             Componente.agregar_a_pago();
         });
 
         /* QUITAR ORDEN */
         DOM.on('click', 'button[name="quitar_atencion"]', function(e) {
             e.stopImmediatePropagation();
             Componente.quitar_atencion($(this));
         });
 
 
 
 
         /* NUEVO */
         DOM.on('click', 'button[name="nuevo"]', function(e) {
             e.stopImmediatePropagation();
             Componente.new();
         });
 
         /* PRINT */
         DOM.on('click', 'button[name="row-print"]', function(e) {
             e.stopImmediatePropagation();
             
             let data = HELPER.get_attr_json($(this));
             Componente.print(data.id);
         });
 
         /* EDITAR */
         DOM.on('click', 'a[name="row-edit"]', function(e) {
             e.stopImmediatePropagation();
             Componente.edit($(this));
         });
 
 
         /* ELIMINAR */
         DOM.on('click', 'a[name="row-delete"]', function(e) {
             e.stopImmediatePropagation();
             Componente.delete($(this));
         });
 
         /* CHANGE ORDENES */
         DOM.find('select[name="medio_pago"]').change(function(e) {
             Componente.change_medio_pago(this.value);
         });
         
 
         DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
         DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
 
         Componente.datatable();
         Componente.datatable_atencion();        
 
         HELPER.load_component();
     },
 
     /**** DATA */
     id: null,
     action_submit: null,
     imagen_anterior: null,
     fl_auto_event: true,
     id_moneda_deuda: null,
 
     /************ */
 
     change_medio_pago: (value) => {
 
         if(value != 'EFECTIVO')
         {
             DOM.find('select[name="id_cuenta_bancaria_empresa"]').prop('disabled', false);
             Componente.select_cuenta_bancaria_empresa();
         }
         else
         {
             DOM.find('select[name="id_cuenta_bancaria_empresa"]').prop('disabled', true);            
         }
 
     },
 
     /***** */
     mostrar_atencion: (data = null) => {
         
         Componente.table_orden.ajax.reload(null, false);
         DOM.find('div[name="modal-atencion"]').modal('show');
 
         setInterval(() => {
             $($.fn.dataTable.tables(true)).DataTable()
             .columns.adjust();
         }, 100);
     },
 
 
     select_all_orden: () => {
 
         if(DOM.find('input[name="select_all_orden"]').is(':checked'))
         {
             DOM.find('input[name="check_orden"]').prop('checked', true);
         }
         else
         {
             DOM.find('input[name="check_orden"]').prop('checked', false);
         }
 
     },
 
 
     quitar_atencion: (dom) => {
 
         var tr = dom.parents('tr');
         var codigo = tr[0].dataset.codigo_agregado;
 
         $('tr[data-codigo_agregado="'+codigo+'"]').remove();
         Componente.calcular_total_importe();
     },
 
 
 
     orden_json: () => {
 
         let detalle = [];
 
         DOM.find('tbody[name="detalle-atencion"] tr').each(function(){
             
             let data_atencion = JSON.parse(JSON.stringify($(this).data('json')));
 
             let item = {
                 id : data_atencion.id,
                 total_deuda : data_atencion.total_deuda,
             };
   
             detalle.push(item);
         });
 
         return detalle;
     },
 
     datatable_atencion: function() {
 
         this.table_orden = DOM.find('table[name="registros_atencion"]').DataTable({
             ajax:BASE_API + 'tesoreria/atencion_pago/servicio_pendiente',
 
             scrollY:false,
             columns: [{
                     title: '',
                     defaultContent: ``,                    
                     render: function(data, type, row) {                       
                         return '<input type="checkbox" name="check_orden" />';
                     },
                 },
                 { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                 { title: 'ATENCION', mData: 'atencion' },
                 { title: 'CLIENTE', mData: 'cliente' },
                 { title: 'SERVICIO', mData: 'servicio' },
       
                 { title: 'TOTAL SERVICIO', render: function(data, type, row) { return row.moneda_atencion+' '+row.importe; }, class:'text-right' },
     
          
                 { title: 'TOTAL PAGOS', mData: 'total_pago', class: 'text-right' },
                 { title: 'TOTAL DEUDA', render: function(data, type, row) { return row.moneda_deuda+' '+row.total_deuda; }, class:'text-right' },
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
 
     agregar_a_pago: () => {
 
         DOM.find('table[name="registros_atencion"] tr').each(function(){
 
             if($(this).find("input[type=checkbox]").prop('checked')) {
                     
                 let data_atencion= JSON.parse(JSON.stringify($(this).data('json')));
 
                 Componente.agregar_orden(data_atencion);
                 
             };
         });
         
         DOM.find('div[name="modal-atencion"]').modal('hide');
         Componente.calcular_total_importe();
     },
 
 
 
     agregar_orden: (data_atencion) => {
                        
         let html = `
             <tr data-codigo_agregado="`+data_atencion.id+`" data-json='`+JSON.stringify(data_atencion)+`'>
                 <td>`+HELPER.fecha(data_atencion.fecha)+`</td>
                 <td>`+data_atencion.atencion+`</td>
               
                 <td>`+(data_atencion.cliente!=null ? data_atencion.cliente : '')+`</td>
                 <td>`+(data_atencion.servicio!=null ? data_atencion.servicio: '')+`</td>
                 <td style="text-align:right;">`+(data_atencion.total_atencion!= null ? data_atencion.moneda_atencion+` `+data_atencion.total_atencion : data_atencion.moneda_atencion + ` 0.00`)+`</td>               
 
                 <td style="text-align:right;">`+data_atencion.moneda_deuda+` `+data_atencion.total_deuda+`</td>
                 <td><button type="button" name="quitar_atencion" class="btn btn-danger btn-sm"><i class="fa fa-times"></i></button></td>
             </tr>
         `;
 
         /*** VERIFICAR DUPLICADO AGREGADO */
         let contador_duplicado = 0;
         DOM.find('tbody[name="detalle-atencion"] tr').each(function(){
 
             let data_agregado = JSON.parse(JSON.stringify($(this).data('json')));
 
             if(data_agregado.id == data_orden.id)
             {
                 contador_duplicado++;
             }
 
         });
 
         if(contador_duplicado == 0)
         {
             DOM.find('tbody[name="detalle-atencion"]').append(html);
         }
         else
         {
             HELPER.notificacion('Hubo Servicios que no se agregaron, porque ya estaban agregaos anteriormente', 'warning');
         }
     },
 
     calcular_total_importe: async () => {
 
         let total_importe = 0;
   
 
         let array_factura = [];
 
         DOM.find('tbody[name="detalle-atencion"] tr').each(function(){
 
             let data_agregado = JSON.parse(JSON.stringify($(this).data('json')));           
             
             /** */
             let existe = false;
 
             array_factura.forEach(factu => {
                 console.log(factu+' '+data_agregado.factura);
                 if(factu == data_agregado.factura)
                 {
                     existe = true;
                 }
             });
 
             if(existe == false)
             {
     
             }
 
             array_factura.push(data_agregado.factura);
             
             /*** */
             
             total_importe = total_importe + parseFloat(data_agregado.total_deuda);
 
         });
 
         total_importe = Math.round(total_importe * 100) / 100;
 
 
         DOM.find('input[name="total_importe"]').val(total_importe.toFixed(2));
    
 
         Componente.validar_moneda();
     },
 
     validar_moneda: () => {
 
         let id_moneda_deuda = null;
         let bloquear_submit = false;
 
         DOM.find('tbody[name="detalle-atencion"] tr').each(function(){
 
             let data = JSON.parse(JSON.stringify($(this).data('json')));
 
             if(id_moneda_deuda != null)
             {
                 if(id_moneda_deuda != data.id_moneda_deuda)
                 {
                     bloquear_submit = true;
                 }
             }
 
             id_moneda_deuda = data.id_moneda_deuda;
 
         });
 
         if(bloquear_submit == true)
         {
             DOM.find('button[name="submit"]').prop('disabled', true);
             DOM.find('div[name="contenedor-aviso"]').html(`
                 <div class="callout callout-info">
                     <h4>Atención!</h4>
                     <p>No puede realizar pagos con diversos tipos de monedas a la vez.</p>
                 </div>
             `);
             DOM.find('input[name="id_moneda"]').val('');
         }
         else
         {
             DOM.find('button[name="submit"]').prop('disabled', false);
             DOM.find('div[name="contenedor-aviso"]').html('');
             DOM.find('input[name="id_moneda"]').val(id_moneda_deuda);
 
             Componente.id_moneda_deuda = id_moneda_deuda;
         }
     },
 
     /*********** */
 
     print: async (id) => {
 
         await axios.get(BASE_API + 'tesoreria/atencion_pago/print/'+id)
         .then(function (response) {
             
             let data = response.data;
 
             let separador = '<span style="font-size:16px;">--------------------------------------------------</span>';
 
             let html = `<div style="width:300px; margin:auto;">
 
             <div style="text-align:center;"><img src="`+BASE_FILES+`images/`+data.logo+`" style="max-width:200px;"/></div>
             <div style="text-align:center; font-size:15px; font-weight:bold; margin-top:10px;">`+data.empresa+`</div>
             <div style="font-weight:bold; text-align:center; font-size:17px; margin-top:10px;">------- TICKET DE PAGO -------</div>
             <div style="text-align:center;  font-size:15px;">ATENCION: `+data.atencion+`</div>
             <div style="text-align:center;">`+HELPER.fecha(data.fecha)+`</div>
 
             <table style="width:100%;">                
                 <tr>
                     <td>TIPO CANAL:</td>
                     <td style="text-align:right;">`+data.tipo_canal+`</td>
                 </tr>
                 <tr>
                     <td>MEDIO DE PAGO:</td>
                     <td style="text-align:right;">`+data.medio_pago+`</td>
                 </tr>
                 <tr>
                     <td>NÚM. OP / REFERENCIA:</td>
                     <td style="text-align:right;">`+data.numero_operacion+`</td>
                 </tr>
                 <tr>
                     <td>CANT. PAGOS:</td>
                     <td style="text-align:right;">`+data.cantidad_pagos+`</td>
                 </tr>
                 <tr>
                     <td colspan="2" style="text-align:center;">`+separador+`</td>
                 </tr>
                 <tr>
                     <td style="font-weight:bold; font-size:14px;">MONTO:</td>
                     <td style="font-weight:bold; text-align:right; font-size:14px;">`+data.moneda_pago+` `+data.monto+`</td>
                 </tr>
                 <tr>
                     <td>OBSERVACIÓN:</td>
                     <td style="text-align:right;">`+data.observacion+`</td>
                 </tr>
                 <tr>
                     <td>USUARIO:</td>
                     <td style="text-align:right;">`+data.usuario+`</td>
                 </tr>
                 
             </table>
 
             </div>`;
 
             HELPER.print(html);
 
         }).catch(error => {
             console.log(error);
         }); 
     },
 
     select_cuenta_bancaria_empresa: async (id_moneda = null) =>
     {
         if(id_moneda == null)
         {
             id_moneda = Componente.id_moneda_deuda;
         }
 
         let select = DOM.find('select[data-select="CUENTA_BANCARIA_EMPRESA"]');      
         select.empty(); 
         select.append($('<option></option>').attr('value', '').text('Seleccionar...'));
 
         if(id_moneda != null)
         {
             await axios.get(BASE_API+'configuracion/cuenta_bancaria_empresa/get_select?id_moneda='+id_moneda)
             .then(function (response) {
                 response.data.forEach(row => {
                     select.append('<option value="'+row.id+'">'+row.text+'</option>');
                 });
 
                 select.select2();
             }).catch(error => {
                 console.log(error);
             }); 
         }
         
     },
 
 
     datatable: function() {
 
         this.table = DOM.find('table[name="registros"]').DataTable({
             ajax:   {
                     url: BASE_API + 'tesoreria/atencion_pago',
                     data: function (d) {
                         d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                         d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                     }
             },
 
             columns: [{
                     title: 'ACCIÓN',
                     defaultContent: ``,                    
                     render: function(data, type, row) {
                         var html = `
                             <div class="btn-group">
                                 <button type="button" class="btn btn-default btn-sm" name="row-print">VISUALIZAR</button>     
                                 <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                       <i class="fa fa-angle-down"></i>
                                 </button>
                                 <ul class="dropdown-menu dropdown-menu-left" role="menu">
                                     <li><a class="dropdown-item" name="row-edit" href="javascript:"><i class="far fa-pencil"></i> Editar</a></li>
                                     <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-ban"></i> Eliminar</a></li>
                                 </ul>
                             </div>
                         `;
 
                         return html;
                     },
                     width: '100px',
                 },
                 { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                 { title: 'ATENCION', mData: 'atencion' },
         
                 { title: 'TOTAL ATENCION', render: function(data, type, row) { return row.moneda_atencion+' '+row.importe; }, class:'text-right' },
                 
                 { title: 'MONTO PAGO', render: function(data, type, row) { return row.moneda_pago+' '+row.monto; }, class:'text-right' },
                 { title: 'TIPO CANAL', mData: 'tipo_canal' },
                 { title: 'MEDIO PAGO', mData: 'medio_pago' },
                 { title: 'NÚMERO DE OPERACIÓN', mData: 'numero_operacion' },                
                 { title: 'OBSERVACIÓN', mData: 'observacion' },                
                 
                 
             ],
         });
 
     },
 
     new: function() {
 
         let accion = 'save';
         let form = DOM.find('form[name="save"]');
 
         DOM.find('h4[name="'+accion+'"]').text('Nuevo Pago');
 
         /** DATA */
         HELPER.reset_form(form);
 
         this.id = null;
         this.action_submit = accion;
 
         
         DOM.find('tbody[name="detalle-atencion"').html('');
         DOM.find('div[name="modal-'+accion+'"]').modal('show');
     },
 
     edit: async (row) => {
         
         let accion = 'edit';
         let form = DOM.find('form[name="edit"]');
 
         DOM.find('h4[name="'+accion+'"]').text('Editar Pago');
 
         /** DATA */
         HELPER.reset_form(form);
 
         let data = HELPER.get_attr_json(row);
 
 
         form.find('input[name="fecha"]').val(data.fecha);
         form.find('select[name="tipo_canal"]').val(data.tipo_canal).change();
         form.find('select[name="medio_pago"]').val(data.medio_pago).change();
         await Componente.select_cuenta_bancaria_empresa(data.id_moneda);
 
         form.find('input[name="numero_operacion"]').val(data.numero_operacion);
         form.find('input[name="monto_pago"]').val(data.monto);
         form.find('select[name="id_cuenta_bancaria_empresa"]').val(data.id_cuenta_bancaria_empresa).change();   
         form.find('input[name="observacion"]').val(data.observacion);
 
 
         Componente.id = data.id;
         Componente.action_submit = accion;
 
         DOM.find('div[name="modal-'+accion+'"]').modal('show');
     },
 
     delete: function(row) {
 
         let accion = 'delete';
         let form = DOM.find('form[name="'+accion+'"]');
 
         DOM.find('h4[name="'+accion+'"]').text('Eliminar Pago');
 
         /** DATA */
         HELPER.reset_form(form);
         
         let data = HELPER.get_attr_json(row);
 
         form.find('div[name="texto"]').text(data.monto+' / Atencion: '+data.atencion);
 
         this.id = data.id;
         this.action_submit = accion;
 
         DOM.find('div[name="modal-'+accion+'"]').modal('show');
     },
 
     submit: function() {
         
         let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
         let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));
 
         if (this.id != null) { formData.append('id', this.id); }
 
         let detalle_atencion = Componente.orden_json();
 
         if(detalle_atencion.length > 0)
         {
             formData.append('detalle_atencion', JSON.stringify(Componente.orden_json()));
 
             axios({
                 method: 'post',
                 url: BASE_API + 'tesoreria/atencion_pago/' + this.action_submit,
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
         }
         else
         {
             HELPER.notificacion('No exite servicios agregados', 'warning');
             ladda.stop();
         }
         
     },
 
     submit_operacion: function() {
         
         let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
         let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));
 
         if (this.id != null) { formData.append('id', this.id); }
 
         axios({
             method: 'post',
             url: BASE_API + 'tesoreria/atencion_pago/' + this.action_submit,
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