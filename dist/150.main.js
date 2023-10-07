"use strict";(self.webpackChunkpoliclinico=self.webpackChunkpoliclinico||[]).push([[150],{150:(n,a,t)=>{let e,i;t.r(a),t.d(a,{default:()=>o});let d={render:async n=>{$("#main").off(),n.innerHTML='\n\n        <div id="main">        \n\n            \x3c!-- Content Header (Page header) --\x3e\n            <section class="content-header">\n                <div class="row">\n                    <div class="col-md-8 content-header" style="padding-top:5px;">\n                        <h1 style="margin:0; ">\n                            Unidades de Medida\n                            <small>Configuración</small>\n                        </h1>\n                    </div>\n                    <div class="col-md-4" align="right">\n                        <button type="button" class="btn btn-sm btn-warning" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>\n                    </div>\n                </div>\n                </section>\n\n                \x3c!-- Main content --\x3e\n                <section class="content">\n\n                \x3c!-- Default box --\x3e\n                <div class="box box-warning">\n                    <div class="box-body">\n                    <div class="table-responsive">\n                        <table name="registros" class="table table-striped" style="width:100%;"></table>\n                    </div>\n                    </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n            </section>\n            \x3c!-- /.content --\x3e\n\n            \x3c!-- MODAL SAVE --\x3e\n            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">\n                <div class="modal-dialog modal-sm">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                            <h4 name="save" class="modal-title">Modal title</h4>\n                        </div>\n                        <form name="save">\n                            <div class="modal-body">\n                                <div class="row">                                   \n                                    <div class="col-md-12">\n                                        <div class="form-group">\n                                            <label>Nombre <span class="text-red">(*)</span></label>\n                                            <input type="text" name="nombre" class="form-control" autocomplete="off">\n                                        </div>\n                                    </div>\n                                    <div class="col-md-12">\n                                        <div class="form-group">\n                                            <label>Código SUNAT </label>\n                                            <select name="codigo_sunat" data-select="UNIDAD_MEDIDA_SUNAT" class="form-control"></select>\n                                        </div>\n                                    </div>\n                                </div>                           \n                            </div>\n                            <div class="modal-footer" align="center" style="display:block">\n                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>\n                                <button type="submit" name="submit" class="btn btn-primary">Guardar</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n\n            \x3c!-- MODAL DELETE --\x3e\n            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">\n                <div class="modal-dialog modal-sm">\n                    <div class="modal-content">\n                        <div class="modal-header">\n                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>\n                            <h4 name="delete" class="modal-title">Modal title</h4>\n                        </div>\n                        <form name="delete">\n                            <div class="row">\n                                <div class="col-md-12" align="center">\n                                    <i class="fad fa-trash-alt fa-4x"></i><br/>\n                                </div>\n                                <div class="col-md-12"  align="center" style="padding-top:10px;">\n                                    <label><input type="checkbox" name="confirmacion" required/>\n                                        Confirmo realizar la eliminación</label>\n                                    <p style="color:red;">Esta acción no se podrá revertir</p>\n                                </div>\n                                <div class="col-md-12" name="texto" align="center">\n\n                                </div>\n                            </div>\n                            <div class="modal-footer" align="center" style="display:block" >\n                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>\n                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        \n\n        </div>            \n        ',await d.after_render()},after_render:async()=>{i="#main",e=$(i),e.find('form[name="save"]').validate({rules:{nombre:{required:!0}},messages:{nombre:"Personal"},submitHandler:function(){d.submit()}}),e.find('form[name="delete"]').validate({submitHandler:function(){d.submit()}}),e.on("click",'button[name="nuevo"]',(function(n){n.stopImmediatePropagation(),d.new()})),e.on("click",'button[name="row-edit"]',(function(n){n.stopImmediatePropagation(),d.edit($(this))})),e.on("click",'a[name="row-delete"]',(function(n){n.stopImmediatePropagation(),d.delete($(this))})),d.datatable(),d.select_unidad_medida_sunat(),HELPER.load_component()},id:null,action_submit:null,select_unidad_medida_sunat:async()=>{let n=e.find('select[data-select="UNIDAD_MEDIDA_SUNAT"]');n.empty(),n.append($("<option></option>").attr("value","").text("Seleccione...")),await axios.get(BASE_API+"recursos/data_static/unidad_medida").then((function(a){a.data.forEach((a=>{n.append('<option value="'+a.id+'">'+a.text+"</option>")})),n.select2()})).catch((n=>{console.log(n)}))},datatable:function(){this.table=e.find('table[name="registros"]').DataTable({ajax:{url:BASE_API+"configuracion/unidad_medida"},columns:[{title:"ACCIÓN",defaultContent:"",render:function(n,a,t){return'\n                            <div class="btn-group">\n                                <button type="button" class="btn btn-default btn-sm" name="row-edit">EDITAR</button>     \n                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">\n                                      <i class="fa fa-angle-down"></i>\n                                </button>\n                                <ul class="dropdown-menu dropdown-menu-left" role="menu">\n                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-trash-alt"></i> Eliminar</a></li>\n                                </ul>\n                            </div>\n                        '},width:"100px"},{title:"NOMBRE",mData:"nombre"},{title:"CÓDIGO SUNAT",mData:"codigo_sunat"}]})},new:function(){let n=e.find('form[name="save"]');e.find('h4[name="save"]').text("Nueva Unidad de Medida"),HELPER.reset_form(n),this.id=null,this.action_submit="save",e.find('tbody[name="detalle-cuenta_bancaria"').html(""),e.find('div[name="modal-save"]').modal("show")},edit:function(n){let a=e.find('form[name="save"]');e.find('h4[name="save"]').text("Editar Unidad de Medida"),HELPER.reset_form(a);let t=HELPER.get_attr_json(n);a.find('input[name="nombre"]').val(t.nombre),a.find('select[name="codigo_sunat"]').val(t.codigo_sunat).change(),this.id=t.id,this.action_submit="save",e.find('div[name="modal-save"]').modal("show")},delete:function(n){let a="delete",t=e.find('form[name="'+a+'"]');e.find('h4[name="'+a+'"]').text("Eliminar Unidad de Medida"),HELPER.reset_form(t);let i=HELPER.get_attr_json(n);t.find('div[name="texto"]').text(i.email),this.id=i.id,this.action_submit=a,e.find('div[name="modal-'+a+'"]').modal("show")},submit:function(){let n=HELPER.ladda(i+' form[name="'+this.action_submit+'"] button[type="submit"]'),a=new FormData(document.querySelector(i+' form[name="'+this.action_submit+'"]'));null!=this.id&&a.append("id",this.id),axios({method:"post",url:BASE_API+"configuracion/unidad_medida/"+this.action_submit,data:a}).then((function(a){d.table.ajax.reload(null,!1),e.find('div[name="modal-'+d.action_submit+'"]').modal("hide"),HELPER.notificacion(a.data.mensaje,"success"),n.stop()})).catch((a=>{n.stop()}))}};const o=d}}]);