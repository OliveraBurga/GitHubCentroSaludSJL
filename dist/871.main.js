"use strict";(self.webpackChunkpoliclinico=self.webpackChunkpoliclinico||[]).push([[871],{871:(n,a,e)=>{let t,i;e.r(a),e.d(a,{default:()=>l});let o={render:async n=>{$("#main").off(),n.innerHTML='\n\n        <div id="main">\n            \x3c!-- Content Header (Page header) --\x3e\n            <section class="content-header">\n                <div class="row">\n                    <div class="col-md-8 content-header" style="padding-top:5px;">\n                        <h1 style="margin:0; ">\n                            Destinos de Notificaciones\n                            <small>Configuración</small>\n                        </h1>\n                    </div>\n                    <div class="col-md-4" align="right">\n                        <button type="button" class="btn btn-sm btn-warning" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>\n                    </div>\n                </div>\n                </section>\n\n                \x3c!-- Main content --\x3e\n                <section class="content">\n\n                \n                \x3c!-- Default box --\x3e\n                <div class="box box-warning">\n                  <div class="box-body">\n                    <div class="row">   \n                        <div class="col-md-12">\n                            <p>Tambíen puedes enviar notificaciones directas a todos los destinos registrados con tan solo hacer click en los siguientes botones.</p>\n                        </div>\n                        <div class="col-md-12">\n                            <a class="btn btn-default" href="'+BASE_API+'cronjob/mantenimiento" target="_blank"><i class="fa fa-envelope-square"></i> Notificar Mantenimientos de Vehículo</a>\n                            <a class="btn btn-default" href="'+BASE_API+'cronjob/documento" target="_blank"><i class="fa fa-envelope-square"></i> Notificar Documentos Vencidos</a>\n                        </div>\n                    </div>\n                  </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n                \x3c!-- Default box --\x3e\n                <div class="box box-warning">\n                    <div class="box-body">\n                    <div class="table-responsive">\n                        <table name="registros" class="table table-striped" style="width:100%;"></table>\n                    </div>\n                    </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n            </section>\n            \x3c!-- /.content --\x3e\n\n            \x3c!-- MODAL SAVE --\x3e\n            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">\n                <div class="modal-dialog ">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                            <h4 name="save" class="modal-title">Modal title</h4>\n                        </div>\n                        <form name="save">\n                            <div class="modal-body">\n                                <div class="row"> \n                                    <div class="col-md-12">\n                                        <div class="form-group">\n                                            <label>Nombre del Contacto</label>\n                                            <input type="text" name="nombre" class="form-control" autocomplete="off">\n                                        </div>\n                                    </div>   \n                                    <div class="col-md-6">\n                                        <div class="form-group">\n                                            <label>Email </label>\n                                            <input type="email" name="email" class="form-control" autocomplete="off">\n                                        </div>\n                                    </div>  \n                                    <div class="col-md-6">\n                                        <div class="form-group">\n                                            <label>Celular </label>\n                                            <input type="text" name="telefono" class="form-control" autocomplete="off">\n                                        </div>\n                                    </div>                                  \n                                </div>                              \n                            </div>\n                            <div class="modal-footer" align="center" style="display:block">\n                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>\n                                <button type="submit" name="submit" class="btn btn-primary">Guardar</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n\n            \x3c!-- MODAL DELETE --\x3e\n            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">\n                <div class="modal-dialog modal-sm">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\n                            <h4 name="delete" class="modal-title">Modal title</h4>\n                        </div>\n                        <form name="delete">\n                            <div class="row">\n                                <div class="col-md-12" align="center">\n                                    <i class="fad fa-trash-alt fa-4x"></i><br/>\n                                </div>\n                                <div class="col-md-12"  align="center" style="padding-top:10px;">\n                                    <label><input type="checkbox" name="confirmacion" required/>\n                                        Confirmo realizar la eliminación</label>\n                                    <p style="color:red;">Esta acción no se podrá revertir</p>\n                                </div>\n                                <div class="col-md-12" name="texto" align="center">\n\n                                </div>\n                            </div>\n                            <div class="modal-footer" align="center" style="display:block" >\n                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>\n                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        \n\n        </div>            \n        ',await o.after_render()},after_render:async()=>{i="#main",t=$(i),t.find('form[name="save"]').validate({rules:{nombre:{required:!0},email:{required:!0}},messages:{nombre:"Nombre del Contacto",email:"Email"},submitHandler:function(){o.submit()}}),t.find('form[name="delete"]').validate({submitHandler:function(){o.submit()}}),t.on("click",'button[name="nuevo"]',(function(n){n.stopImmediatePropagation(),o.new()})),t.on("click",'button[name="row-edit"]',(function(n){n.stopImmediatePropagation(),o.edit($(this))})),t.on("click",'a[name="row-delete"]',(function(n){n.stopImmediatePropagation(),o.delete($(this))})),o.datatable(),HELPER.load_component()},id:null,action_submit:null,datatable:function(){this.table=t.find('table[name="registros"]').DataTable({ajax:BASE_API+"configuracion/notificacion",columns:[{title:"ACCIÓN",defaultContent:"",render:function(n,a,e){return'\n                            <div class="btn-group">\n                                <button type="button" class="btn btn-default btn-sm" name="row-edit">EDITAR</button>     \n                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">\n                                      <i class="fa fa-angle-down"></i>\n                                </button>\n                                <ul class="dropdown-menu dropdown-menu-left" role="menu">\n                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-trash-alt"></i> Eliminar</a></li>\n                                </ul>\n                            </div>\n                        '},width:"100px"},{title:"NOMBRE",mData:"nombre"},{title:"EMAIL",mData:"email"},{title:"TELÉFONO",mData:"telefono"}]})},new:function(){let n=t.find('form[name="save"]');t.find('h4[name="save"]').text("Nueva Destino"),HELPER.reset_form(n),this.id=null,this.action_submit="save",t.find('tbody[name="detalle-cuenta_bancaria"').html(""),t.find('div[name="modal-save"]').modal("show")},edit:function(n){let a=t.find('form[name="save"]');t.find('h4[name="save"]').text("Editar Destino"),HELPER.reset_form(a);let e=HELPER.get_attr_json(n);a.find('input[name="nombre"]').val(e.nombre),a.find('input[name="email"]').val(e.email),a.find('input[name="telefono"]').val(e.telefono),this.id=e.id,this.action_submit="save",t.find('div[name="modal-save"]').modal("show")},delete:function(n){let a="delete",e=t.find('form[name="'+a+'"]');t.find('h4[name="'+a+'"]').text("Eliminar Destino"),HELPER.reset_form(e);let i=HELPER.get_attr_json(n);e.find('div[name="texto"]').text(i.email),this.id=i.id,this.action_submit=a,t.find('div[name="modal-'+a+'"]').modal("show")},submit:function(){let n=HELPER.ladda(i+' form[name="'+this.action_submit+'"] button[type="submit"]'),a=new FormData(document.querySelector(i+' form[name="'+this.action_submit+'"]'));null!=this.id&&a.append("id",this.id),axios({method:"post",url:BASE_API+"configuracion/notificacion/"+this.action_submit,data:a}).then((function(a){o.table.ajax.reload(null,!1),t.find('div[name="modal-'+o.action_submit+'"]').modal("hide"),HELPER.notificacion(a.data.mensaje,"success"),n.stop()})).catch((a=>{n.stop()}))}};const l=o}}]);