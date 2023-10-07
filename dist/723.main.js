"use strict";(self.webpackChunkpoliclinico=self.webpackChunkpoliclinico||[]).push([[723],{723:(n,e,a)=>{let t,i;a.r(e),a.d(e,{default:()=>l});let o={render:async n=>{$("#main").off(),n.innerHTML='\n\n        <div id="main">\n            \x3c!-- Content Header (Page header) --\x3e\n            <section class="content-header">\n                <div class="row">\n                    <div class="col-md-8 content-header" style="padding-top:5px;">\n                        <h1 style="margin:0; ">\n                            Lugares\n                            <small>Configuración</small>\n                        </h1>\n                    </div>\n                    <div class="col-md-4" align="right">\n                        <button type="button" class="btn btn-sm btn-warning" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>\n                    </div>\n                </div>\n                </section>\n\n                \x3c!-- Main content --\x3e\n                <section class="content">\n\n                \x3c!-- Default box --\x3e\n                <div class="box box-warning">\n                    <div class="box-body">\n                    <div class="table-responsive">\n                        <table name="registros" class="table table-striped" style="width:100%;"></table>\n                    </div>\n                    </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n            </section>\n            \x3c!-- /.content --\x3e\n\n            \x3c!-- MODAL SAVE --\x3e\n            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">\n                <div class="modal-dialog">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                            <h4 name="save" class="modal-title">Modal title</h4>\n                        </div>\n                        <form name="save">\n                            <div class="modal-body">\n                                <div class="row">                \n                                    <div class="col-md-12">\n                                        <div class="form-group">\n                                            <label>Nombre <span class="text-red">(*)</span></label>\n                                            <input type="text" name="nombre" class="form-control" autocomplete="off" placeholder="Escribe aquí...">\n                                        </div>\n                                    </div>\n                                    <div class="col-md-12">\n                                        <div class="form-group">\n                                            <label>Dirección <span class="text-red">(*)</span></label>\n                                            <input type="text" name="direccion" class="form-control" autocomplete="off" >\n                                        </div>\n                                    </div>\n                                    <div class="col-md-12">\n                                        <div class="form-group">\n                                            <label>UBIGEO <span class="text-red">(*)</span></label>\n                                            <select name="id_ubigeo" class="form-control form-control-sm" data-select="UBIGEO" ></select>\n                                        </div>\n                                    </div>\n                                    <div class="col-md-12">\n                                        <div class="form-group">\n                                            <label>Local Anexo (JURISDICCIÓN) <span class="text-red">(*)</span></label>\n                                            <select type="text" data-select="LOCAL" name="id_local" class="form-control"></select>\n                                        </div>\n                                    </div>\n                                </div>                              \n                            </div>\n                            <div class="modal-footer" align="center" style="display:block">\n                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>\n                                <button type="submit" name="submit" class="btn btn-primary">Guardar</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n\n            \x3c!-- MODAL DELETE --\x3e\n            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">\n                <div class="modal-dialog modal-sm">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\n                            <h4 name="delete" class="modal-title">Modal title</h4>\n                        </div>\n                        <form name="delete">\n                            <div class="row">\n                                <div class="col-md-12" align="center">\n                                    <i class="fad fa-trash-alt fa-4x"></i><br/>\n                                </div>\n                                <div class="col-md-12"  align="center" style="padding-top:10px;">\n                                    <label><input type="checkbox" name="confirmacion" required/>\n                                        Confirmo realizar la eliminación</label>\n                                    <p style="color:red;">Esta acción no se podrá revertir</p>\n                                </div>\n                                <div class="col-md-12" name="texto" align="center">\n\n                                </div>\n                            </div>\n                            <div class="modal-footer" align="center" style="display:block" >\n                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>\n                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        \n\n        </div>            \n        ',await o.after_render()},after_render:async()=>{i="#main",t=$(i),t.find('form[name="save"]').validate({rules:{nombre:{required:!0},direccion:{required:!0},id_local:{required:!0},id_ubigeo:{required:!0}},messages:{nombre:"Punto de Inicio",direccion:"Punto de Inicio",id_local:"Local (Jurisdicción)",id_ubigeo:"UBIGEO"},submitHandler:function(){o.submit()}}),t.find('form[name="delete"]').validate({submitHandler:function(){o.submit()}}),t.on("click",'button[name="nuevo"]',(function(n){n.stopImmediatePropagation(),o.new()})),t.on("click",'button[name="row-edit"]',(function(n){n.stopImmediatePropagation(),o.edit($(this))})),t.on("click",'a[name="row-delete"]',(function(n){n.stopImmediatePropagation(),o.delete($(this))})),o.datatable(),o.select_local(),o.select_ubigeo(),HELPER.load_component()},id:null,action_submit:null,imagen_anterior:null,select_ubigeo:async()=>{t.find('select[data-select="UBIGEO"]').select2({ajax:{url:BASE_API+"recursos/data_static/ubigeo",dataType:"json",delay:250,data:function(n){return{buscar:n.term}},processResults:function(n,e){return{results:n}},cache:!0},escapeMarkup:function(n){return n},placeholder:"Departamento - Provincia - Distrito",minimumInputLength:3,allowClear:!0,language:{inputTooShort:function(){return"Digite mínimo 3 caracteres"}}})},select_local:async()=>{let n=t.find('select[data-select="LOCAL"]');n.empty(),n.append($("<option></option>").attr("value","").text("Seleccione...")),await axios.get(BASE_API+"configuracion/local/get_select").then((function(e){o.array_documento=e.data,e.data.forEach((e=>{n.append('<option value="'+e.id+'">'+e.text+"</option>")})),n.select2()})).catch((n=>{console.log(n)}))},datatable:function(){this.table=t.find('table[name="registros"]').DataTable({ajax:BASE_API+"configuracion/lugar",lengthChange:!1,paginate:!1,columns:[{title:"ACCIÓN",defaultContent:"",render:function(n,e,a){return'\n                            <div class="btn-group">\n                                <button type="button" class="btn btn-default btn-sm" name="row-edit">EDITAR</button>     \n                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">\n                                      <i class="fa fa-angle-down"></i>\n                                </button>\n                                <ul class="dropdown-menu dropdown-menu-left" role="menu">\n                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-trash-alt"></i> Eliminar</a></li>\n                                </ul>\n                            </div>\n                        '},width:"100px"},{title:"NOMBRE",mData:"nombre"},{title:"DIRECCIÓN",mData:"direccion"},{title:"UBIGEO",mData:"ubigeo"},{title:"LOCAL ANEXO (JURISDICCIÓN)",mData:"local"}]})},new:function(){let n=t.find('form[name="save"]');t.find('h4[name="save"]').text("Nuevo Lugar"),HELPER.reset_form(n),this.id=null,this.action_submit="save",t.find('tbody[name="detalle-cuenta_bancaria"').html(""),t.find('div[name="modal-save"]').modal("show")},edit:function(n){let e=t.find('form[name="save"]');t.find('h4[name="save"]').text("Editar Lugar"),HELPER.reset_form(e);let a=HELPER.get_attr_json(n);e.find('input[name="nombre"]').val(a.nombre),e.find('input[name="direccion"]').val(a.direccion),e.find('select[name="id_local"]').val(a.id_local).change(),null!=a.id_ubigeo&&e.find('select[name="id_ubigeo"]').html("").append(new Option(a.ubigeo,a.id_ubigeo)),this.id=a.id,this.action_submit="save",t.find('div[name="modal-save"]').modal("show")},delete:function(n){let e="delete",a=t.find('form[name="'+e+'"]');t.find('h4[name="'+e+'"]').text("Eliminar Lugar"),HELPER.reset_form(a);let i=HELPER.get_attr_json(n);a.find('div[name="texto"]').text(i.email),this.id=i.id,this.action_submit=e,t.find('div[name="modal-'+e+'"]').modal("show")},submit:function(){let n=HELPER.ladda(i+' form[name="'+this.action_submit+'"] button[type="submit"]'),e=new FormData(document.querySelector(i+' form[name="'+this.action_submit+'"]'));null!=this.id&&e.append("id",this.id),axios({method:"post",url:BASE_API+"configuracion/lugar/"+this.action_submit,data:e}).then((function(e){o.table.ajax.reload(null,!1),t.find('div[name="modal-'+o.action_submit+'"]').modal("hide"),HELPER.notificacion(e.data.mensaje,"success"),n.stop()})).catch((e=>{n.stop()}))}};const l=o}}]);