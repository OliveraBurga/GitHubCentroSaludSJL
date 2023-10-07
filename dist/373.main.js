"use strict";(self.webpackChunkpoliclinico=self.webpackChunkpoliclinico||[]).push([[373],{373:(t,a,n)=>{let e,l;n.r(a),n.d(a,{default:()=>o});let i={render:async t=>{$("#main").off(),t.innerHTML='\n\n        <div id="main">\n            \x3c!-- Content Header (Page header) --\x3e\n            <section class="content-header">\n                <div class="row">\n                    <div class="col-md-8 content-header" style="padding-top:5px;">\n                        <h1 style="margin:0; ">\n                            Caja chica\n                            <small>Reportes</small>\n                        </h1>\n                    </div>       \n                </div>\n            </section>\n\n            \x3c!-- Main content --\x3e\n            <section class="content">\n\n            \n                \x3c!-- Default box --\x3e\n                <div class="box box-warning">\n                    <div class="box-body">\n                        <div class="row">        \n                            <div class="col-md-2">\n                                <div class="form-group">\n                                    <label>Fecha Desde</label>\n                                    <input type="date" data-filtro="fecha_inicio" class="form-control" autocomplete="off">\n                                </div>\n                            </div>\n                            <div class="col-md-2">\n                                <div class="form-group">\n                                    <label>Fecha Hasta</label>\n                                    <input type="date"  data-filtro="fecha_fin" class="form-control" autocomplete="off">\n                                </div>\n                            </div>\n                            <div class="col-md-4">\n                                <div class="form-group">\n                                    <label>Local Anexo</label>\n                                    <select data-filtro="id_local" data-select="LOCAL" class="form-control" autocomplete="off"></select>\n                                </div>\n                            </div>\n                            <div class="col-md-3">\n                                <div class="form-group">\n                                    <label>Usuario</label>\n                                    <select data-filtro="id_usuario" data-select="USUARIO" class="form-control" autocomplete="off"></select>\n                                </div>\n                            </div>\n                            <div class="col-md-1" style="padding-top:19px;">\n                                <button class="btn btn-warning" name="update_datatable"><i class="fa fa-search"></i> </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n                \x3c!-- Default box --\x3e\n                <div class="box box-warning">\n                    <div class="box-body">\n                    <div class="table-responsive">\n                        <table name="registros" class="table table-striped table-bordered nowrap" style="width:100%;">\n                            <tfoot>\n                                <tr>\n                                    <th colspan="5"></th>\n                                    <th></th>\n                                    <th></th>\n                                    <th colspan="4"></th>\n                                </tr>\n                            </tfoot>\n                        </table>\n                    </div>\n                    </div>\n                </div>\n                \x3c!-- /.box --\x3e\n\n            </section>\n            \x3c!-- /.content --\x3e\n            \n\n        </div>            \n        ',await i.after_render()},imprimir:t=>{axios.get(BASE_API+"tesoreria/caja_chica/print/"+t).then((function(t){let a=t.data,n='\n                <table border="0" cellspacing="0" cellpadding="0" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; max-width:350px;">\n                    <tr>\n                        <td style="text-align:center;">\n                            <img src="'+BASE_FILES+"images/"+a.empresa.logo_factura+'" style="width:250px;" />\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <table width="100%" border="0" cellspacing="0" cellpadding="4">\n                                <tr>\n                                    <td align="center">'+a.empresa.razon_social+'</td>\n                                </tr>\n                                <tr>\n                                    <td align="center">RUC: '+a.empresa.numero_documento+'</td>\n                                </tr>\n                                <tr>\n                                    <td align="center"><strong>REPORTE DE CAJA CHICA</strong></td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <table style="width:100%;">\n                                <tr>\n                                    <td>USUARIO:</td>\n                                    <td style="text-align:right;">'+a.caja_chica.usuario+'</td>                                    \n                                </tr>\n                                <tr>\n                                    <td>APERTURA:</td>\n                                    <td style="text-align:right;">'+HELPER.fecha_hora(a.caja_chica.fecha_apertura)+'</td>                                    \n                                </tr>\n                                <tr>\n                                    <td>CIERRE:</td>\n                                    <td style="text-align:right;">'+(null!=a.caja_chica.fecha_cierre?HELPER.fecha_hora(a.caja_chica.fecha_cierre):"-")+'</td>                                    \n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style="padding-top:10px; padding-bottom:10px;"><div style="border-top:dashed 1px #000;"></div></td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <table style="width:100%;">\n                                <thead>\n                                    <tr>\n                                        <th>#</th>\n                                        <th>DESCRIPCIÓN</th>\n                                        <th>EGRESOS</th>\n                                        <th>INGRESOS</th>\n                                    </tr>\n                                </thead>\n                                <tbody>',e=0;t.data.detalle.forEach((t=>{e++;let a="-",l="-";switch(t.tipo_movimiento){case"EGRESO":a=parseFloat(t.importe).toFixed(2);break;case"INGRESO":l=parseFloat(t.importe).toFixed(2)}n+="\n                                        <tr>\n                                            <td>"+e+"</td>\n                                            <td>"+t.descripcion.substr(0,25)+'</td>\n                                            <td style="text-align:right;">'+a+'</td>\n                                            <td style="text-align:right;">'+l+"</td>\n                                        </tr>\n                                    "})),n+='\n                                </tbody>\n                            </table>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td style="padding-top:10px; padding-bottom:10px;"><div style="border-top:dashed 1px #000;"></div></td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <table style="width:100%;">\n                                <tr>\n                                    <th></th>\n                                    <th>TOTALES</th>                                    \n                                </tr>\n                                <tr>\n                                    <td>SALDO INICIAL</td>\n                                    <td>'+GLOBAL.moneda_sistema.simbolo+' <span style="float:right;">'+a.caja_chica.saldo_inicial+"</span></td>                                    \n                                </tr>\n                                <tr>\n                                    <td>TOTAL INGRESOS</td>\n                                    <td>"+GLOBAL.moneda_sistema.simbolo+' <span style="float:right;">'+a.caja_chica.total_ingreso+'</span></td>                                    \n                                </tr>\n                                <tr>\n                                    <td>TOTAL EGRESOS</td>\n                                    <td style="border-bottom:solid; border-bottom-width:1px;">'+GLOBAL.moneda_sistema.simbolo+' <span style="float:right;">- '+a.caja_chica.total_egreso+"</span></td>                                    \n                                </tr>\n                                <tr>\n                                    <td>SALDO FINAL</td>\n                                    <td>"+GLOBAL.moneda_sistema.simbolo+' <span style="float:right;">'+a.caja_chica.total_saldo+'</span></td>                                    \n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <table style="width:100%;">\n                                <tr>\n                                    <td style="text-align:right; border-bottom:solid; border-bottom-width:1px; width:45%; padding-top:50px;"></td>\n                                    <td style="width:10%;"></td>\n                                    <td style="text-align:right; border-bottom:solid; border-bottom-width:1px; width:45%; padding-top:50px;"></td>\n                                </tr>\n                                <tr>\n                                    <td style="text-align:center;" >USUARIO</td>\n                                    <td ></td>\n                                    <td style="text-align:center;">SUPERVISOR</td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n                \n            ',HELPER.print(n)})).catch((t=>{console.log(t)}))},after_render:async()=>{l="#main",e=$("#main"),e.find('input[data-filtro="fecha_inicio"]').val(HELPER.fecha(null,"YYYY-MM-DD")),e.find('input[data-filtro="fecha_fin"]').val(HELPER.fecha(null,"YYYY-MM-DD")),e.on("click",'button[name="update_datatable"]',(function(t){t.stopImmediatePropagation(),i.table.ajax.reload(null,!1)})),e.on("click",'button[data-name="print"]',(function(t){t.stopImmediatePropagation(),i.imprimir($(this).data("id_caja_chica"))})),e.on("click",'button[data-name="recalcular"]',(function(t){t.stopImmediatePropagation(),axios.get(BASE_API+"tesoreria/reporte/caja_chica/recalcular/"+$(this).data("id_caja_chica")).then((function(t){i.table.ajax.reload(null,!1)})).catch((t=>{console.log(t)}))})),i.select_local(),i.select_usuario(),i.datatable(),HELPER.load_component()},select_local:async()=>{let t=e.find('select[data-select="LOCAL"]');t.empty(),t.append($("<option></option>").attr("value","").text("TODOS")),await axios.get(BASE_API+"configuracion/local/get_select").then((function(a){a.data.forEach((a=>{t.append('<option value="'+a.id+'">'+a.text+"</option>")})),t.select2()})).catch((t=>{console.log(t)}))},select_usuario:async()=>{let t=e.find('select[data-select="USUARIO"]');t.empty(),t.append($("<option></option>").attr("value","").text("TODOS")),await axios.get(BASE_API+"configuracion/usuario/get_select").then((function(a){a.data.forEach((a=>{t.append('<option value="'+a.id+'">'+a.text+"</option>")})),t.select2()})).catch((t=>{console.log(t)}))},datatable:function(){this.table=e.find('table[name="registros"]').DataTable({ajax:{url:BASE_API+"tesoreria/reporte/caja_chica",data:function(t){t.fecha_inicio=e.find('input[data-filtro="fecha_inicio"]').val(),t.fecha_fin=e.find('input[data-filtro="fecha_fin"]').val(),t.id_local=e.find('select[data-filtro="id_local"]').val(),t.id_usuario=e.find('select[data-filtro="id_usuario"]').val()}},ordering:!1,columns:[{title:"ID",mData:"id",visible:!1},{title:"",render:function(t,a,n){return'\n                        <button data-name="print" data-id_caja_chica="'+n.id+'" class="btn btn-default btn-sm"><i class="fa fa-print"></i></button>\n                        <button data-name="recalcular" data-id_caja_chica="'+n.id+'" class="btn btn-default btn-sm" title="Recalcular"><i class="fa fa-sync"></i> Recalcular</button>\n                    '},class:"text-center"},{title:"LOCAL ANEXO",mData:"local"},{title:"FECHA APERTURA",render:function(t,a,n){return HELPER.fecha_hora(n.fecha_apertura,"DD/MM/YYYY h:mm:ss a")},class:"text-center"},{title:"SALDO INICIAL",render:function(t,a,n){return'<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+"</span> "+n.saldo_inicial},class:"text-right"},{title:"TOTAL INGRESO",render:function(t,a,n){return'<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+"</span> "+n.total_ingreso},class:"text-right"},{title:"TOTAL EGRESO",render:function(t,a,n){return'<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+"</span> "+n.total_egreso},class:"text-right"},{title:"TOTAL SALDO",render:function(t,a,n){return'<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+"</span> "+n.total_saldo},class:"text-right"},{title:"FECHA CIERRE",render:function(t,a,n){return HELPER.fecha_hora(n.fecha_cierre)},class:"text-center"},{title:"USUARIO",mData:"usuario",class:"text-center"},{title:"ESTADO",render:function(t,a,n){let e="";return"ABIERTO"==n.estado?e='<span class="label label-warning">ABIERTO</span>':"CERRADO"==n.estado&&(e='<span class="label label-success">CERRADO</span>'),e}}],footerCallback:function(t,a,n,e,l){let i=0,o=0,s=0,d=0;a.forEach((t=>{i+=parseFloat(t.saldo_inicial),o+=parseFloat(t.total_ingreso),s+=parseFloat(t.total_egreso),d+=parseFloat(t.total_saldo)}));let r=this.api();i=Math.round(100*i)/100,$(r.column(5).footer()).html('<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> <span style="float:right;">'+o.toFixed(2)+"</span>"),$(r.column(6).footer()).html('<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> <span style="float:right;">'+s.toFixed(2)+"</span>")},order:[[0,"asc"]]})}};const o=i}}]);