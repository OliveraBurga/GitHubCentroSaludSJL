"use strict";(self.webpackChunkpoliclinico=self.webpackChunkpoliclinico||[]).push([[101],{101:(e,a,n)=>{let i,t;n.r(a),n.d(a,{default:()=>o});let l={render:e=>{$("#main").off(),e.innerHTML='\n\n        <div id="main">\n            \x3c!-- Content Header (Page header) --\x3e\n            <section class="content-header">\n                <div class="row">\n                    <div class="col-md-8 content-header" style="padding-top:5px;">\n                        <h1 style="margin:0; ">\n                            Ajustes Avanzados\n                            <small>Configuración</small>\n                        </h1>\n                    </div>\n                </div>\n                </section>\n\n                \x3c!-- Main content --\x3e\n                <section class="content">\n\n                \x3c!-- Default box --\x3e\n                <div class="box box-warning">\n                    <form name="save">\n                        <div class="box-body">                        \n                            <div class="row">\n                                <div class="col-md-4">\n                                    <div class="box box-widget widget-user-2">\n                                        <div class="widget-user-header bg-red">\n                                            <div class="widget-user-image" style="float:left; padding-top:0px">\n                                                <i class="fad fa-globe fa-3x"></i>\n                                            </div>\n                                            <h3 class="widget-user-username">General</h3>\n                                        </div>\n                                        <div class="box-footer no-padding">\n                                            <ul class="nav nav-stacked">\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_general_local_independiente" /> Restringir información por Locales Anexos</label></a></li>\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_general_serie_usuario" /> Habilitar series asignado al usuario</label></a></li>\n                                                <li><a href="javascript:"><label>Cantidad de decimales en precio de Venta <input type="number" name="cant_decimales_venta" class="form-control" placeholder="7" /></a></li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                    \x3c!-- /.widget-user --\x3e\n\n                                    <div class="box box-widget widget-user-2">\n                                        <div class="widget-user-header bg-blue">\n                                            <div class="widget-user-image" style="float:left; padding-top:0px">\n                                                <i class="fad fa-file-invoice fa-3x"></i>\n                                            </div>\n                                            <h3 class="widget-user-username">Facturación</h3>\n                                        </div>\n                                        <div class="box-footer no-padding">\n                                            <ul class="nav nav-stacked">\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_facturacion_envio_manual_sunat" /> Enviar facturas manualmente a SUNAT (OFFLINE)<br> <span style="color:#CB2A2A; font-weight:bold;">(Es responsabilidad de Ud. enviar todas las facturas a SUNAT dentro del tiempo permitido)</span></label></a></li>\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_fact_detraccion_automatica" /> Aplicar detracción a facturas mayores de 400 soles.</label></a></li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                    \x3c!-- /.widget-user --\x3e\n                                </div>\n                                <div class="col-md-4">\n                                    <div class="box box-widget widget-user-2">\n                                        <div class="widget-user-header bg-green">\n                                            <div class="widget-user-image" style="float:left; padding-top:0px">\n                                                <i class="fad fa-truck-loading fa-3x"></i>\n                                            </div>\n                                            <h3 class="widget-user-username">Operación</h3>\n                                        </div>\n                                        <div class="box-footer no-padding">\n                                            <ul class="nav nav-stacked">\n                                                <li><a href="javascript:"><strong>Orden de Servicios</strong></a></li>\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_op_os_descripcion_articulo" /> Agregar nombre de artículo en descripción del item automáticamente, y solicitar una descripción general para la orden de servicio</label></a></li>\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_op_tarifa_info" /> Mostrar Información de tarifas y los precios sean editables al agregar items a la orden</label></a></li>\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_op_os_doc_ref" /> Documento de Referencia (Obligatorio) <br> Solo para clientes jurídicos</label></a></li>\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_op_clave_edit_orden" /> Solicitar clave de entrega al editar orden</label></a></li>\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_tarifa_ruta" /> Tarifas de artículos por Rutas</label></a></li>\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_op_os_emision_grt" /> Emitir GRT al generar O/S</label></a></li>\n                                                <li><a href="javascript:"><strong>Guias de Remisión</strong></a></li>\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_op_emision_electronico_grr" /> Emisión Electrónica (GR-REMITENTE)</label></a></li>\n                                                <li><a href="javascript:" style="display:none;"><label><input type="checkbox" disabled name="fl_op_emision_electronico_grt" /> Emisión Electrónica (GR-TRANSPORTISTA)</label></a></li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                    \x3c!-- /.widget-user --\x3e\n                                </div>\n                                <div class="col-md-4" style="display:none;">\n                                    <div class="box box-widget widget-user-2">\n                                        <div class="widget-user-header bg-yellow">\n                                            <div class="widget-user-image" style="float:left; padding-top:0px">\n                                                <i class="fad fa-money-bill-alt fa-3x"></i>\n                                            </div>\n                                            <h3 class="widget-user-username">Tesoreria</h3>\n                                        </div>\n                                        <div class="box-footer no-padding">\n                                            <ul class="nav nav-stacked">\n                                                <li><a href="javascript:"><label><input type="checkbox" name="fl_pagar_factura" /> Pagar solo facturas y no órdenes de servicios</label></a></li>\n                                                \n                                            </ul>\n                                        </div>\n                                    </div>\n                                    \x3c!-- /.widget-user --\x3e\n                                </div>\n                                \n                            </div>\n                        </div>\n                        <div class="modal-footer">\n                            <button type="button" class="btn btn-light-grey btn-sm" data-dismiss="modal" style="float:left;">Cancelar</button>\n                            <button type="button" name="submit" class="btn btn-primary btn-sm">Guardar</button>\n                        </div>\n                    </form>\n                </div>\n                \x3c!-- /.box --\x3e\n\n            </section>\n            \x3c!-- /.content --\x3e\n\n\n\n        </div>            \n        ',l.after_render()},after_render:()=>{t="#main",i=$(t),i.on("click",'form[name="save"] button[name="submit"]',(function(e){e.stopImmediatePropagation(),l.submit()})),l.get(),HELPER.load_component()},id:null,action_submit:null,imagen_anterior:null,get:async function(){axios.get(BASE_API+"configuracion/ajuste_avanzado").then((function(e){let a=e.data,n=i.find('form[name="save"]');n.find('input[name="fl_pagar_factura"]').prop("checked",parseInt(a.fl_pagar_factura)),n.find('input[name="fl_tarifa_cliente"]').prop("checked",parseInt(a.fl_tarifa_cliente)),n.find('input[name="fl_tarifa_articulo"]').prop("checked",parseInt(a.fl_tarifa_articulo)),n.find('input[name="fl_tarifa_ruta"]').prop("checked",parseInt(a.fl_tarifa_ruta)),n.find('input[name="fl_op_os_doc_ref"]').prop("checked",parseInt(a.fl_op_os_doc_ref)),n.find('input[name="fl_op_clave_edit_orden"]').prop("checked",parseInt(a.fl_op_clave_edit_orden)),n.find('input[name="fl_op_multiple_orden_gt"]').prop("checked",parseInt(a.fl_op_multiple_orden_gt)),n.find('input[name="fl_op_emision_electronico_grt"]').prop("checked",parseInt(a.fl_op_emision_electronico_grt)),n.find('input[name="fl_op_emision_electronico_grr"]').prop("checked",parseInt(a.fl_op_emision_electronico_grr)),n.find('input[name="fl_general_local_independiente"]').prop("checked",parseInt(a.fl_general_local_independiente)),n.find('input[name="fl_op_os_emision_grt"]').prop("checked",parseInt(a.fl_op_os_emision_grt)),n.find('input[name="fl_facturacion_envio_manual_sunat"]').prop("checked",parseInt(a.fl_facturacion_envio_manual_sunat)),n.find('input[name="fl_fact_detraccion_automatica"]').prop("checked",parseInt(a.fl_fact_detraccion_automatica)),n.find('input[name="fl_op_os_descripcion_articulo"]').prop("checked",parseInt(a.fl_op_os_descripcion_articulo)),n.find('input[name="cant_decimales_venta"]').val(a.cant_decimales_venta),n.find('input[name="fl_op_tarifa_info"]').prop("checked",parseInt(a.fl_op_tarifa_info)),n.find('input[name="fl_general_serie_usuario"]').prop("checked",parseInt(a.fl_general_serie_usuario)),l.action_submit="save"})).catch((e=>{console.log(e)}))},submit:function(){let e=HELPER.ladda(t+' form[name="'+this.action_submit+'"] button[name="submit"]'),a=new FormData(document.querySelector(t+' form[name="'+this.action_submit+'"]'));null!=this.id&&a.append("id",this.id),axios({method:"post",url:BASE_API+"configuracion/ajuste_avanzado/"+this.action_submit,data:a}).then((function(a){l.get(),i.find('div[name="modal-'+l.action_submit+'"]').modal("hide"),HELPER.notificacion(a.data.mensaje,"success"),e.stop()})).catch((a=>{e.stop()}))}};const o=l}}]);