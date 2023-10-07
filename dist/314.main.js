"use strict";(self.webpackChunkpoliclinico=self.webpackChunkpoliclinico||[]).push([[314],{314:(n,e,a)=>{let t,o;a.r(e),a.d(e,{default:()=>l});let i={render:async n=>{$("#main").off(),n.innerHTML='\n\n        <div id="main">\n            \x3c!-- Content Header (Page header) --\x3e\n            <section class="content-header">\n                <div class="row">\n                    <div class="col-md-8 content-header" style="padding-top:5px;">\n                        <h1 style="margin:0; ">\n                            Personal\n                            <small>Documentos</small>\n                        </h1>\n                    </div>\n                    <div class="col-md-4" align="right">\n                        <button type="button" class="btn btn-sm btn-warning" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>\n                    </div>\n                </div>\n                </section>\n\n                \x3c!-- Main content --\x3e\n                <section class="content">\n\n                \n                \x3c!-- Default box --\x3e\n                <div class="box box-info">\n                  <div class="box-body">\n                    <div class="row">        \n                      <div class="col-md-6">\n                        <div class="form-group">\n                            <label>Filtrar Personal </label>\n                            <div class="form-group">\n                            <select name="id_personal_filter" data-select="PERSONAL" class="form-control"></select>\n                            </div>                              \n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n                \x3c!-- Default box --\x3e\n                <div class="box box-info">\n                    <div class="box-body">\n                    <div class="table-responsive">\n                        <table name="registros" class="table table-striped" style="width:100%;"></table>\n                    </div>\n                    </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n            </section>\n            \x3c!-- /.content --\x3e\n\n            \x3c!-- MODAL SAVE --\x3e\n            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">\n                <div class="modal-dialog">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                            <h4 name="save" class="modal-title">Modal title</h4>\n                        </div>\n                        <form name="save">\n                            <div class="modal-body">\n                                <div class="row">\n                                    <div class="col-md-12">\n                                        <div class="form-group">\n                                            <label>Personal <span class="text-red">(*)</span></label>\n                                            <div class="form-group">\n                                            <select name="id_personal" data-select="PERSONAL" class="form-control"></select>\n                                            </div>                              \n                                        </div>\n                                    </div>\n                                    <div class="col-md-12">\n                                    <div class="form-group">\n                                        <label>Tipo Documento <span class="text-red">(*)</span></label>\n                                        <div class="form-group">\n                                        <select name="id_tipo_documento" data-select="TIPO_DOCUMENTO" class="form-control"></select>\n                                        </div>                              \n                                    </div>\n                                    </div>\n                                    <div class="col-md-12">\n                                    <div class="form-group">\n                                        <label>Documento <span class="text-red">(*)</span></label>\n                                        <input type="text" name="documento" class="form-control" list="list-documento" autocomplete="off">      \n                                        <datalist id="list-documento"></datalist>                    \n                                    </div>\n                                    </div>\n                                    <div class="col-md-8">\n                                    <div class="form-group">\n                                        <label>Archivo </label>\n                                        <input type="file" name="archivo" class="form-control" autocomplete="off">\n                                    </div>\n                                    </div>\n                                    <div class="col-md-4">\n                                        <div class="form-group" style="margin-top:25px;">\n                                            <label><input type="checkbox" name="fl_no_caduca" autocomplete="off"> No Caduca</label>                                            \n                                        </div>\n                                    </div>\n                                    <div class="col-md-6">\n                                    <div class="form-group">\n                                        <label>Fecha Emisión <span class="text-red">(*)</span></label>\n                                        <input type="date" name="fecha_emision" class="form-control" autocomplete="off">\n                                    </div>\n                                    </div>\n                                    <div class="col-md-6">\n                                        <div class="form-group">\n                                            <label>Fecha Vencimiento <span class="text-red">(*)</span></label>\n                                            <input type="date" name="fecha_vencimiento" class="form-control" autocomplete="off">\n                                        </div>\n                                    </div>\n                                    \n                                </div>                           \n                            </div>\n                            <div class="modal-footer" align="center" style="display:block">\n                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>\n                                <button type="submit" name="submit" class="btn btn-primary">Guardar</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n\n            \x3c!-- MODAL DELETE --\x3e\n            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">\n                <div class="modal-dialog modal-sm">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\n                            <h4 name="delete" class="modal-title">Modal title</h4>\n                        </div>\n                        <form name="delete">\n                            <div class="row">\n                                <div class="col-md-12" align="center">\n                                    <i class="fad fa-trash-alt fa-4x"></i><br/>\n                                </div>\n                                <div class="col-md-12"  align="center" style="padding-top:10px;">\n                                    <label><input type="checkbox" name="confirmacion" required/>\n                                        Confirmo realizar la eliminación</label>\n                                    <p style="color:red;">Esta acción no se podrá revertir</p>\n                                </div>\n                                <div class="col-md-12" name="texto" align="center">\n\n                                </div>\n                            </div>\n                            <div class="modal-footer" align="center" style="display:block" >\n                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>\n                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        \n\n        </div>            \n        ',await i.after_render()},after_render:async()=>{o="#main",t=$(o),t.find('form[name="save"]').validate({rules:{id_personal:{required:!0},id_tipo_documento:{required:!0},documento:{required:!0},fecha_emision:{required:!0},fecha_vencimiento:{required:!0}},messages:{id_personal:"Personal",id_tipo_documento:"Tipo de Documento",documento:"Documento",fecha_emision:"Fecha de Emisión",fecha_vencimiento:"Fecha de Vencimiento"},submitHandler:function(){i.submit()}}),t.find('form[name="delete"]').validate({submitHandler:function(){i.submit()}}),t.on("click",'button[name="nuevo"]',(function(n){n.stopImmediatePropagation(),i.new()})),t.on("click",'button[name="row-edit"]',(function(n){n.stopImmediatePropagation(),i.edit($(this))})),t.on("click",'a[name="row-delete"]',(function(n){n.stopImmediatePropagation(),i.delete($(this))})),t.on("change",'select[name="id_personal_filter"]',(function(n){n.stopImmediatePropagation(),i.table.ajax.reload(null,!1)})),t.on("change",'input[name="fl_no_caduca"]',(function(n){n.stopImmediatePropagation(),i.change_nocaduca()})),i.datatable(),i.select_personal(),i.select_tipo_documento(),HELPER.load_component()},id:null,action_submit:null,change_nocaduca:()=>{t.find('input[name="fl_no_caduca"]').is(":checked")?t.find('input[name="fecha_vencimiento"]').prop("disabled",!0):t.find('input[name="fecha_vencimiento"]').prop("disabled",!1)},select_tipo_documento:()=>{let n=t.find('select[data-select="TIPO_DOCUMENTO"]');n.empty(),n.append($("<option></option>").attr("value","").text("Seleccione...")),axios.get(BASE_API+"configuracion/tipo_documento/get_select?tipo=PERSONAL").then((function(e){e.data.forEach((e=>{n.append('<option value="'+e.id+'">'+e.text+"</option>")})),n.select2()})).catch((n=>{console.log(n)}))},select_personal:()=>{let n=t.find('select[data-select="PERSONAL"]');n.empty(),n.append($("<option></option>").attr("value","").text("Seleccione...")),axios.get(BASE_API+"configuracion/personal/get_select").then((function(e){e.data.forEach((e=>{n.append('<option value="'+e.id+'">'+e.text+"</option>")})),n.select2()})).catch((n=>{console.log(n)}))},datatable:function(){this.table=t.find('table[name="registros"]').DataTable({ajax:{url:BASE_API+"documento/documento_personal",data:function(n){n.id_personal=t.find('select[name="id_personal_filter"]').val()}},columns:[{title:"ACCIÓN",defaultContent:"",render:function(n,e,a){return'\n                            <div class="btn-group">\n                                <button type="button" class="btn btn-default btn-sm" name="row-edit">EDITAR</button>     \n                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">\n                                      <i class="fa fa-angle-down"></i>\n                                </button>\n                                <ul class="dropdown-menu dropdown-menu-left" role="menu">\n                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-trash-alt"></i> Eliminar</a></li>\n                                </ul>\n                            </div>\n                        '},width:"100px"},{title:"PERSONAL",mData:"personal"},{title:"TIPO DOCUMENTO",mData:"tipo_documento"},{title:"DOCUMENTO",mData:"documento"},{title:"FECHA EMISION",render:function(n,e,a){return HELPER.fecha(a.fecha_emision)}},{title:"FECHA VENCIMIENTO",defaultContent:"",render:function(n,e,a){return 1==a.fl_no_caduca?'<span class="text-green">NO CADUCA</span>':HELPER.fecha(a.fecha_vencimiento)}},{title:"ARCHIVO",defaultContent:"",render:function(n,e,a){return null!=a.archivo?'<a target="_blank" href="'+BASE_FILES+"uploads/"+a.archivo+'"><i class="fa fa-download"></i> Ver / Descargar</a>':""}}]})},new:function(){let n=t.find('form[name="save"]');t.find('h4[name="save"]').text("Nuevo Documento"),HELPER.reset_form(n),this.id=null,this.action_submit="save",this.archivo_anterior=null,t.find('tbody[name="detalle-cuenta_bancaria"').html(""),t.find('div[name="modal-save"]').modal("show")},edit:function(n){let e=t.find('form[name="save"]');t.find('h4[name="save"]').text("Editar Documento"),HELPER.reset_form(e);let a=HELPER.get_attr_json(n);e.find('select[name="id_personal"]').val(a.id_personal).change(),e.find('select[name="id_tipo_documento"]').val(a.id_tipo_documento).change(),e.find('input[name="documento"]').val(a.documento),e.find('input[name="fl_no_caduca"]').prop("checked",parseInt(a.fl_no_caduca)),e.find('input[name="fecha_vencimiento"]').val(a.fecha_vencimiento),e.find('input[name="fecha_emision"]').val(a.fecha_emision),this.change_nocaduca(),this.archivo_anterior=a.archivo,this.id=a.id,this.action_submit="save",t.find('div[name="modal-save"]').modal("show")},delete:function(n){let e="delete",a=t.find('form[name="'+e+'"]');t.find('h4[name="'+e+'"]').text("Eliminar Documento"),HELPER.reset_form(a);let o=HELPER.get_attr_json(n);a.find('div[name="texto"]').text(o.email),this.id=o.id,this.action_submit=e,t.find('div[name="modal-'+e+'"]').modal("show")},submit:function(){let n=HELPER.ladda(o+' form[name="'+this.action_submit+'"] button[type="submit"]'),e=new FormData(document.querySelector(o+' form[name="'+this.action_submit+'"]'));null!=this.id&&e.append("id",this.id),null!=this.archivo_anterior&&e.append("archivo_anterior",this.archivo_anterior),axios({method:"post",url:BASE_API+"documento/documento_personal/"+this.action_submit,data:e}).then((function(e){i.table.ajax.reload(null,!1),t.find('div[name="modal-'+i.action_submit+'"]').modal("hide"),HELPER.notificacion(e.data.mensaje,"success"),n.stop()})).catch((e=>{n.stop()}))}};const l=i}}]);