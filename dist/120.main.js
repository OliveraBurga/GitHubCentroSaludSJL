"use strict";(self.webpackChunkpoliclinico=self.webpackChunkpoliclinico||[]).push([[120],{120:(t,a,e)=>{let n,o;e.r(a),e.d(a,{default:()=>i});let l={render:async t=>{$("#main").off(),t.innerHTML='\n\n        <div id="main">\n            \x3c!-- Content Header (Page header) --\x3e\n            <section class="content-header">\n                <div class="row">\n                    <div class="col-md-8 content-header" style="padding-top:5px;">\n                        <h1 style="margin:0; ">\n                            Flujo de Caja\n                            <small>Reportes</small>\n                        </h1>\n                    </div>       \n                </div>\n            </section>\n\n            \x3c!-- Main content --\x3e\n            <section class="content">\n\n            \n                \x3c!-- Default box --\x3e\n                <div class="box box-warning">\n                    <div class="box-body">\n                        <div class="row">        \n                            <div class="col-md-2">\n                                <div class="form-group">\n                                    <label>Fecha Desde</label>\n                                    <input type="date" data-filtro="fecha_inicio" class="form-control" autocomplete="off">\n                                </div>\n                            </div>\n                            <div class="col-md-2">\n                                <div class="form-group">\n                                    <label>Fecha Hasta</label>\n                                    <input type="date"  data-filtro="fecha_fin" class="form-control" autocomplete="off">\n                                </div>\n                            </div>\n                            <div class="col-md-4">\n                                <div class="form-group">\n                                    <label>Local Anexo</label>\n                                    <select data-filtro="id_local" data-select="LOCAL" class="form-control" autocomplete="off"></select>\n                                </div>\n                            </div>\n                            <div class="col-md-4">\n                                <div class="form-group">\n                                    <label>Usuario</label>\n                                    <select data-filtro="id_usuario" data-select="USUARIO" class="form-control" autocomplete="off"></select>\n                                </div>\n                            </div>\n                            <div class="col-md-3">\n                                <div class="form-group">\n                                    <label>Medio de Pago</label>\n                                    <select data-filtro="medio_pago" class="form-control" autocomplete="off">\n                                        <option value="">TODOS</option>\n                                        <option value="EFECTIVO">EFECTIVO</option>\n                                        <option value="TARJETA">TARJETA</option>\n                                        <option value="DEPOSITO">DEPOSITO</option>\n                                        <option value="TRANSFERENCIA">TRANSFERENCIA</option>\n                                        <option value="CHEQUE">CHEQUE</option>\n                                    </select>\n                                </div>\n                            </div>\n                            <div class="col-md-3" style="padding-top:19px;">\n                                <button class="btn btn-warning" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n                \x3c!-- Default box --\x3e\n                <div class="box box-warning">\n                    <div class="box-body">\n                    <div class="table-responsive">\n                        <table name="registros" class="table table-striped table-bordered nowrap" style="width:100%;">\n                            <tfoot>\n                                <tr>\n                                    <th colspan="2"></th>\n                                    <th></th>\n                                    <th></th>\n                                    <th></th>\n                                </tr>\n                            </tfoot>\n                        </table>\n                    </div>\n                    </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n            </section>\n            \x3c!-- /.content --\x3e\n            \n\n        </div>            \n        ',await l.after_render()},after_render:async()=>{o="#main",n=$("#main"),n.find('input[data-filtro="fecha_inicio"]').val(HELPER.fecha(null,"YYYY-MM-DD")),n.find('input[data-filtro="fecha_fin"]').val(HELPER.fecha(null,"YYYY-MM-DD")),n.on("click",'button[name="update_datatable"]',(function(t){t.stopImmediatePropagation(),l.table.ajax.reload(null,!1)})),l.select_local(),l.select_usuario(),l.datatable(),HELPER.load_component()},select_local:async()=>{let t=n.find('select[data-select="LOCAL"]');t.empty(),t.append($("<option></option>").attr("value","").text("TODOS")),await axios.get(BASE_API+"configuracion/local/get_select").then((function(a){a.data.forEach((a=>{t.append('<option value="'+a.id+'">'+a.text+"</option>")})),t.select2()})).catch((t=>{console.log(t)}))},select_usuario:async()=>{let t=n.find('select[data-select="USUARIO"]');t.empty(),t.append($("<option></option>").attr("value","").text("TODOS")),await axios.get(BASE_API+"configuracion/usuario/get_select").then((function(a){a.data.forEach((a=>{t.append('<option value="'+a.id+'">'+a.text+"</option>")})),t.select2()})).catch((t=>{console.log(t)}))},datatable:function(){this.table=n.find('table[name="registros"]').DataTable({ajax:{url:BASE_API+"tesoreria/reporte/flujo_caja",data:function(t){t.fecha_inicio=n.find('input[data-filtro="fecha_inicio"]').val(),t.fecha_fin=n.find('input[data-filtro="fecha_fin"]').val(),t.id_local=n.find('select[data-filtro="id_local"]').val(),t.id_usuario=n.find('select[data-filtro="id_usuario"]').val(),t.medio_pago=n.find('select[data-filtro="medio_pago"]').val()}},ordering:!1,columns:[{title:"LOCAL ANEXO",mData:"local"},{title:"FECHA",render:function(t,a,e){return HELPER.fecha(e.fecha)}},{title:"MEDIO PAGO",mData:"modalidad"},{title:"DESCRIPCIÓN",mData:"descripcion",class:"text-right"},{title:"INGRESOS",render:function(t,a,e){let n="";return"INGRESO"==e.tipo_movimiento&&(n=e.importe),n},class:"text-right"},{title:"EGRESOS",render:function(t,a,e){let n="";return"EGRESO"==e.tipo_movimiento&&(n=e.importe),n},class:"text-right"},{title:"USUARIO",mData:"usuario",class:"text-center"}],footerCallback:function(t,a,e,n,o){let l=0,i=0;a.forEach((t=>{"INGRESO"==t.tipo_movimiento?l+=parseFloat(t.importe):"EGRESO"==t.tipo_movimiento&&(i+=parseFloat(t.importe))}));let c=this.api();$(c.column(2).footer()).html('<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> <span style="float:right;">'+l.toFixed(2)+"</span>"),$(c.column(3).footer()).html('<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> <span style="float:right;">'+i.toFixed(2)+"</span>")}})}};const i=l}}]);