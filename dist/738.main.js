"use strict";(self.webpackChunkpoliclinico=self.webpackChunkpoliclinico||[]).push([[738],{738:(s,e,n)=>{n.r(e),n.d(e,{default:()=>r});let a={render:(s,e)=>'\n        \x3c!-- sidebar menu: : style can be found in sidebar.less --\x3e\n            <ul id="side-menu" class="sidebar-menu" data-widget="tree">\n              <li id="sidebar-navegacion" class="header">MENÚ DE NAVEGACIÓN</li><li id="sidebar-rastreo_unidad">\n                <a href="#/rastreo_unidad">\n                  <i class="fas fa-tachometer-alt-average"></i> &nbsp;&nbsp;<span>Rastreo de Unidades</span>\n                </a>\n              </li>   \n            </ul>            \n        ',after_render:s=>{$("#side-menu").fadeIn(),a.tree_initial()},tree_initial:()=>{$(".sidebar-menu").tree(),$(".sidebar").slimScroll({height:$(window).height()-50+"px"})}};const t=a,r={render:s=>{let e=s.usuario,n=s.ajuste,a=s.empresa,r="",i="assets/images/icono_brand.png";"SUPER USUARIO"!=e.tipo&&(GLOBAL.porcentaje_igv=n.porcentaje_igv,GLOBAL.porcentaje_detraccion=n.porcentaje_detraccion,GLOBAL.tipo_cambio=n.tipo_cambio,1==n.fl_sistema_change_color&&(r='style="background-color:'+n.sistema_color_bg+';"'),1==n.fl_sistema_logo&&(i=BASE_FILES+"images/"+a.logo));let l=e.nombre.split(" ")[0],c=(e.apellido.split(" ")[0],'\n \n         \x3c!-- Bootstrap 3.3.7 --\x3e\n         <link rel="stylesheet" href="template/bower_components/bootstrap/dist/css/bootstrap.min.css">\n \n         \x3c!-- DataTables --\x3e\n         <link rel="stylesheet" href="assets/library/datatable/datatables.min.css">\n         <link rel="stylesheet" href="https://cdn.datatables.net/colreorder/1.5.3/css/colReorder.dataTables.min.css">\n \n         \x3c!-- FONT AWESOME --\x3e\n         <link href="assets/library/pro_fontawesome/css/all.css" rel="stylesheet">\n \n         \x3c!-- Ionicons --\x3e\n         <link rel="stylesheet" href="template/bower_components/Ionicons/css/ionicons.min.css">\n \n         \x3c!-- Ladda --\x3e\n         <link rel="stylesheet" href="assets/library/ladda/ladda.min.css">\n \n         \x3c!-- Select2 --\x3e\n         <link rel="stylesheet" href="template/bower_components/select2/dist/css/select2.min.css">\n \n         \x3c!-- Theme style --\x3e\n         <link rel="stylesheet" href="template/dist/css/AdminLTE.min.css">\n \n         <link rel="stylesheet" href="template/dist/css/skins/_all-skins.min.css">\n     \n \n         <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">\n \n         <link href="assets/css/app.css" rel="stylesheet">\n \n         \x3c!-- COLORPICKER --\x3e\n         <link rel="stylesheet" href="assets/library/colorpicker-input/css/colorpicker.css">\n \n         \x3c!-- Site wrapper --\x3e\n         <div class="wrapper">\n \n         <header class="main-header">\n             \x3c!-- Logo --\x3e\n             <a href="app" class="logo" '+r+'>\n \n             \x3c!-- mini logo for sidebar mini 50x50 pixels --\x3e\n             <span class="logo-mini"><b>T</b>S</span>\n \n             \x3c!-- logo for regular state and mobile devices --\x3e\n             <span class="logo-lg"><img src="'+i+'" /></i><b></b></span>\n             </a>\n \n             \x3c!-- Header Navbar: style can be found in header.less --\x3e\n             <nav class="navbar navbar-static-top" '+r+'>\n \n             \x3c!-- Sidebar toggle button--\x3e\n             <a href="javascript:" class="sidebar-toggle" data-toggle="push-menu" role="button">\n                 <i class="fa fa-bars"></i>\n             </a>\n \n             <div class="navbar-custom-menu">\n                 <ul class="nav navbar-nav">\n                 \x3c!-- Messages: style can be found in dropdown.less--\x3e\n \n                 \x3c!-- User Account: style can be found in dropdown.less --\x3e\n                 <li class="dropdown user user-menu">\n                     <a href="#" class="dropdown-toggle" data-toggle="dropdown">\n                     <img src="'+BASE_FILES+"images/"+e.imagen+'" class="user-image" alt="User Image">\n                     <span class="hidden-xs">'+l+" | "+e.email+'</span>\n                     </a>\n                     <ul class="dropdown-menu">\n                     \x3c!-- User image --\x3e\n                     <li class="user-header">\n                         <img src="'+BASE_FILES+"images/"+e.imagen+'" class="img-circle" alt="User Image">\n \n                         <p>\n                         <?= $nombre; ?>\n                         <small>'+e.tipo+'</small>\n                         </p>\n                     </li>\n                     \x3c!-- Menu Body --\x3e\n                     \x3c!-- Menu Footer--\x3e\n                     <li class="user-footer">\n                         <div>\n                             <a href="javascript:"  id="cambiar_password" class="btn btn-default btn-flat" style="width:100%;">Cambiar Contraseña</a>\n                         </div>\n                         <div>\n                             <a href="javascript:"  id="cerrar_sesion" class="btn btn-default btn-flat" style="width:100%;">Cerrar Sesión</a>\n                         </div>\n                     </li>\n                     \n                     </ul>\n                 </li>\n                 </ul>\n             </div>\n             </nav>\n         </header>\n \n         \x3c!-- =============================================== --\x3e\n \n         \x3c!-- Left side column. contains the sidebar --\x3e\n         <aside class="main-sidebar">\n \n             \x3c!-- sidebar: style can be found in sidebar.less --\x3e\n             <section class="sidebar">\n \n                 \x3c!-- Sidebar user panel --\x3e\n                 <div class="user-panel">\n \n                     <div class="pull-left image">\n                         <img src="'+BASE_FILES+"images/"+e.imagen+'" class="img-circle" alt="User Image">\n                     </div>\n \n                     <div class="pull-left info">\n                         <p>'+l+'</p>\n                         <a href="#">\n                             <i class="fa fa-circle text-success"></i> '+e.tipo+"\n                         </a>\n                     </div>\n                    \n                 </div>");return c+=t.render(e)+'\n \n                 </section>\n             \x3c!-- /.sidebar --\x3e\n         </aside>\n \n         \x3c!-- =============================================== --\x3e\n \n         \x3c!-- Content Wrapper. Contains page content --\x3e\n         <div class="content-wrapper">\n             <div id="app">\n                 <div style="width:100%; text-align:center; margin-top:10%;">\n                     <div style="margin:auto; font-size:20px;">Preparando...</div>\n                 </div>\n             </div>\n         </div>\n         \x3c!-- /.content-wrapper --\x3e\n \n         <footer class="main-footer">\n             <div class="pull-right hidden-xs">\n             <b>Version</b> 3.0\n             </div>\n             <strong>Copyright &copy; <?= date("Y");?> Sistema para Transporte de Courier</a>\n         </footer>\n \n         </div>\n         \x3c!-- ./wrapper --\x3e\n         \n                     \x3c!---  MODAL SAVE --\x3e\n                         <div class="modal fade" id="main-save_password" data-backdrop="static" style="display:none;">\n                             <div class="modal-dialog modal-sm">\n                                 <div class="modal-content">\n                                     <div class="modal-header">\n                                         <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\n                                         <h4 name="save" class="modal-title">Cambiar Contraseña</h4>\n                                     </div>\n                                     <form name="save">\n                                         <div class="modal-body">\n                                             <div class="row">   \n                                                 <div class="col-md-12">\n                                                     <div class="form-group">\n                                                         <label>Contraseña Actual<span class="text-danger">*</span></label>\n                                                         <input type="password" name="password_actual" class="form-control" required maxlength="50" autocomplete="off" />\n                                                     </div>\n                                                 </div>\n                                                 <div class="col-md-12">\n                                                     <div class="form-group">\n                                                         <label>Nueva Contraseña <span class="text-danger">*</span></label>\n                                                         <input type="password" name="password_nuevo" class="form-control" required maxlength="50" autocomplete="off" />\n                                                     </div>\n                                                 </div>                                     \n                                                 <div class="col-md-12">\n                                                     <div class="form-group">\n                                                         <label>Repita nueva Contraseña <span class="text-danger">*</span></label>\n                                                         <input type="password" name="re_password_nuevo" class="form-control" required maxlength="50" autocomplete="off" />\n                                                     </div>\n                                                 </div>\n                                             </div>\n                                         </div>\n                                         <div class="modal-footer">\n                                             <button type="button" class="btn btn-light-grey" data-dismiss="modal" style="float:left;">Cancelar</button>\n                                             <button type="submit" class="btn btn-primary">Guardar</button>\n                                         </div>\n                                     </form>\n                                 </div>\n                                 \x3c!-- /.modal-content --\x3e\n                             </div>\n                             \x3c!-- /.modal-dialog --\x3e\n                         </div>\n                         \x3c!-- /.modal --\x3e\n             \n             \x3c!-- Bootstrap --\x3e\n             <script src="assets/library/sammy/sammy.min.js"><\/script>    \n             <script src="assets/library/ladda/spin.min.js"><\/script>    \n             <script src="assets/library/ladda/ladda.min.js"><\/script>   \n             \n             <script src="https://momentjs.com/downloads/moment.min.js"><\/script>\n             \n             \x3c!-- jQuery 3 --\x3e\n             <script src="template/bower_components/jquery/dist/jquery.min.js"><\/script>\n \n             \x3c!-- Bootstrap 3.3.7 --\x3e\n             <script src="template/bower_components/bootstrap/dist/js/bootstrap.min.js"><\/script>\n \n             \x3c!-- SlimScroll --\x3e\n             <script src="template/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"><\/script>\n \n             \x3c!-- FastClick --\x3e\n             <script src="template/bower_components/fastclick/lib/fastclick.js"><\/script>\n \n             \x3c!-- AdminLTE App --\x3e\n             <script src="template/dist/js/adminlte.min.js"><\/script>\n             \n             \x3c!-- AdminLTE for demo purposes --\x3e\n             <script src="template/dist/js/demo.js"><\/script>\n \n \n             \x3c!-- DataTables --\x3e\n             <script src="assets/library/datatable/datatables.min.js"><\/script>\n             <script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.colVis.min.js"><\/script>\n             <script src="https://cdn.datatables.net/colreorder/1.5.3/js/dataTables.colReorder.min.js"><\/script>\n \n             \x3c!-- Select2 --\x3e\n             <script src="template/bower_components/select2/dist/js/select2.full.min.js"><\/script>\n \n             \x3c!-- Select2 --\x3e\n             <script src="template/bower_components/select2/dist/js/select2.full.min.js"><\/script>\n \n             \x3c!-- Sweet alert--\x3e\n             <script src="assets/library/node_modules/sweetalert/dist/sweetalert.min.js"><\/script>\n \n \n             <script src="assets/library/form_validate/jquery.form.js"><\/script>\n             <script src="assets/library/form_validate/jquery.validate.js"><\/script>\n             <script src="assets/library/jquery-loading-overlay/dist/loadingoverlay.min.js"><\/script>\n \n             <script src="assets/library/bootstrap-notify.min.js"><\/script>\n \n             <script src="assets/library/colorpicker-input/js/colorpicker.js"><\/script>\n             \n             <script src="app/config/Helper.js"><\/script>\n             <script src="app/config/Library_init.js"><\/script>\n             <script src="app/config/Config_library.js"><\/script>\n \n             \x3c!-- GOOGLE MAPS --\x3e\n             <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDCyoF3nBv4SpGwGJYQ99cUjmtmrR5juY&libraries=adsense&sensor=true&language=es"><\/script>\n \n \n             \n \n         ',c},after_render:async s=>{t.after_render(s),$("body").addClass("skin-blue fixed sidebar-mini sidebar-mini-expand-feature"),$('#main-save_password form[name="save"]').validate({submitHandler:function(){l.submit()}}),document.querySelector("#cerrar_sesion").addEventListener("click",(function(){i()})),document.querySelector("#cambiar_password").addEventListener("click",(function(){l.show_modal()}))}};let i=()=>{axios.get(BASE_API+"autenticacion/logout").then((function(s){localStorage.removeItem("Token"),location.href=BASE_URL})).catch((s=>{localStorage.removeItem("Token"),location.href=BASE_URL}))},l={accion_submit:null,show_modal:()=>{var s=$('#main-save_password form[name="save"]');HELPER.reset_form(s),l.accion_submit="save_my_password",$("#main-save_password").modal("show")},submit:()=>{const s=document.querySelector('#main-save_password form[name="save"]'),e=Object.fromEntries(new FormData(s).entries());if(e.password_nuevo!==e.re_password_nuevo)return alert("Las contraseñas no coinciden"),!1;var n=new FormData(s);axios({method:"post",url:BASE_API+"configuracion/usuario/save_my_password",data:n}).then((function(s){$("#main-save_password").modal("hide"),alert("Completado"),i()})).catch((s=>{ladda.stop()}))}}}}]);