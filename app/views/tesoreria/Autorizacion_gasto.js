 

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
                             Autorización de Gastos
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
 
                 <div class="row"> 
                    <div class="col-md-1">
                        <button class="btn btn-warning" name="update_datatable" style="margin-bottom:10px;"><i class="fa fa-sync"></i> Actualizar</button>
                    </div>
                </div>
 
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
 
             <!-- MODAL APROBADO -->
             <div class="modal inmodal fade" name="modal-autorizado" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-sm">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                             <h4 name="autorizado" class="modal-title">Modal title</h4>
                         </div>
                         <form name="autorizado">
                             <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12" align="center" style="margin-top:10px;">
                                        <i class="fad fa-thumbs-up fa-4x"></i><br/>
                                    </div>
                                    <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar la autorización</label>
                                         
                                    </div>
                                    <div class="col-md-12" name="texto" align="center" style="font-weight:bold; font-size:20px;"></div>
                                    <div class="col-md-12" style="margin-top:10px;">
                                        <div class="form-group">
                                            <label>Comentario / Observación <small>(Opcional)</small></label>
                                            <input type="text" name="comentario" class="form-control" autocomplete="off">
                                        </div>                         
                                    </div>
                                </div>
                             </div>
                             <div class="modal-footer" align="center" style="display:block" >
                                 <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                 <button type="submit" name="submit" class="btn btn-success">Autorizar Ahora!</button>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
 
             <!-- MODAL DEENGADO -->
             <div class="modal inmodal fade" name="modal-denegado" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-sm">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                             <h4 name="denegado" class="modal-title">Modal title</h4>
                         </div>
                         <form name="denegado">
                             <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12" align="center" style="margin-top:10px;">
                                        <i class="fad fa-thumbs-down fa-4x"></i><br/>
                                    </div>
                                    <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar la denegación</label>
                                        <p style="color:red;">Esta acción no se podrá revertir y se dará por anulado la solicitud de caja</p>
                                    </div>
                                    <div class="col-md-12" name="texto" align="center" style="font-weight:bold; font-size:20px;"></div>
                                    <div class="col-md-12" style="margin-top:10px;">
                                        <div class="form-group">
                                            <label>Comentario / Observación <small>(Opcional)</small></label>
                                            <input type="text" name="comentario" class="form-control" autocomplete="off">
                                        </div>                         
                                    </div>
                                </div>
                             </div>
                             <div class="modal-footer" align="center" style="display:block" >
                                 <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                 <button type="submit" name="submit" class="btn btn-danger">Denegar Ahora!</button>
                             </div>
                         </form>
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
 
         /** SUBMIT APROBADO */
         DOM.find('form[name="autorizado"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        }); 
 
         /* DATATABLE UPDATE*/
         DOM.on('click', 'button[name="update_datatable"]', function(e) {
             e.stopImmediatePropagation();
             Componente.table.ajax.reload(null, false);
         });
 
         /** SUBMIT DENEGADO */
         DOM.find('form[name="denegado"]').validate({
             submitHandler: function() {
                 Componente.submit();
             }
         }); 
 
         /* APROBAR */
         DOM.on('click', 'button[name="row-autorizar"]', function(e) {
             e.stopImmediatePropagation();
             Componente.autorizado($(this));
         });
 
 
         /* DENEGAR */
         DOM.on('click', 'button[name="row-denegar"]', function(e) {
             e.stopImmediatePropagation();
             Componente.denegado($(this));
         });
           
         Componente.datatable();
 
         HELPER.load_component();
     },
 
     /**** DATA */
     id: null,
     action_submit: null,
     imagen_anterior: null,
     fl_auto_event: true,
 
     datatable: function() {
 
         this.table = DOM.find('table[name="registros"]').DataTable({
             ajax:   {
                     url: BASE_API + 'tesoreria/autorizacion_gasto',
                     data: function (d) {
                         d.tipo = 'CAJA';
                     }
             },
 
             columns: [{
                     title: 'ACCIÓN',
                     defaultContent: ``,                    
                     render: function(data, type, row) {
                         var html = `
                            <button type="button" class="btn btn-success btn-sm" name="row-autorizar"><i class="fa fa-thumbs-up"></i> AUTORIZAR</button>  
                            <button type="button" class="btn btn-danger btn-sm" name="row-denegar"><i class="fa fa-thumbs-down"></i> DENEGAR</button>  
                         `;
 
                         return html;
                     },
                     width: '170px',
                 },
                 { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                 { title: 'NRO CAJA', mData: 'caja' },
                 { title: 'ATENCION', mData: 'atencion' },
                 { title: 'MOTIVO', mData: 'motivo' },
                 { title: 'MODALIDAD', mData: 'modalidad' },
                 { title: 'PERSONA', mData: 'nombre_persona' },
                 { title: 'IMPORTE', render: function(data, type, row) { return row.simbolo_moneda+' '+row.importe; }, class:'text-right'},
                 { title: 'USUARIO', mData: 'usuario' },
                 
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
 
     autorizado: function(row) {
 
        let accion = 'autorizado';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Autorizar Gasto');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').html(data.serie+'-'+data.numero+' <br>'+data.simbolo_moneda+' '+data.importe);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },
 
     denegado: function(row) {
 
         let accion = 'denegado';
         let form = DOM.find('form[name="'+accion+'"]');
 
         DOM.find('h4[name="'+accion+'"]').text('Denegar Gasto');
 
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
  
         axios({
             method: 'post',
             url: BASE_API + 'tesoreria/autorizacion_gasto/' + this.action_submit,
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