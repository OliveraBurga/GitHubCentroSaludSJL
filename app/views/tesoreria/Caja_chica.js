 
 
import Imprimir_caja from './Imprimir_caja.js' 
import Comp_reporte_caja_chica from './reporte/Caja_chica.js'

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
                            Caja chica
                            <small>Tesoreria</small>
                        </h1>
                    </div>
                    <div class="col-md-4" data-contenedor="caja_chica_abierto" align="right">
                        <button type="button" class="btn btn-sm btn-primary" name="nuevo"><i class="fa fa-plus"></i> Nuevo Movimiento</button>
                        <button type="button" class="btn btn-sm btn-danger" name="cerrar_caja"><i class="fa fa-minus-circle"></i> Cerrar Caja</button>
                    </div>
                </div>
            </section>

            <!-- Main content -->
            <section class="content">

                <div data-contenedor="caja_chica_abierto" style="display:none;">
                    <div class="row">        
                        <div class="col-md-3">
                            <div class="info-box bg-yellow">
                                <span class="info-box-icon">
                                    <i class="fa fa-flag"></i>
                                </span>
                    
                                <div class="info-box-content">
                                    <span class="info-box-text">INICIAL</span>
                                    <span class="info-box-number contador_animate" name="saldo_inicial">0.00</span>
                        
                                    <div class="progress">
                                        <div class="progress-bar" style="width: 50%"></div>
                                    </div>
                                    <span class="progress-description">
                                            
                                    </span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="info-box bg-aqua">
                                <span class="info-box-icon"><i class="fa fa-arrow-circle-up"></i></span>
                    
                                <div class="info-box-content">
                                <span class="info-box-text">INGRESOS</span>
                                <span class="info-box-number contador_animate" name="total_ingreso">0.00</span>
                    
                                <div class="progress">
                                    <div class="progress-bar" style="width: 50%"></div>
                                </div>
                                <span class="progress-description">
                                 
                                </span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="info-box bg-red">
                                <span class="info-box-icon"><i class="fa fa-arrow-circle-down"></i></span>
                    
                                <div class="info-box-content">
                                <span class="info-box-text">EGRESOS</span>
                                <span class="info-box-number contador_animate" name="total_egreso">0</span>
                    
                                <div class="progress">
                                    <div class="progress-bar" style="width: 50%"></div>
                                </div>
                                <span class="progress-description">
                                        
                                </span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="info-box bg-green">
                                <span class="info-box-icon"><i class="fa fa-coins"></i></span>
                    
                                <div class="info-box-content">
                                <span class="info-box-text">SALDO</span>
                                <span class="info-box-number contador_animate" name="total_saldo">0</span>
                    
                                <div class="progress">
                                    <div class="progress-bar" style="width: 50%"></div>
                                </div>
                                <span class="progress-description">
                                    
                                </span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                        </div>
                    </div>

                    <!-- Default box -->
                    <div class="box box-warning">
                        <div class="box-body">
                            <div class="table-responsive">
                                <table name="registros" class="table table-striped nowrap" style="width:100%;"></table>
                            </div>
                        </div>
                    </div>
                    <!-- /.box -->
                </div>

                <div data-contenedor="caja_chica_cerrado" style="display:none;">
                    
                    <div style="width:320px; margin:auto;">
                        <!-- Default box -->
                        <div class="box box-primary">
                            <div class="box-body">
                                <form name="save_apertura">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Usuario de Sistema</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" value="`+GLOBAL.usuario.nombre+` `+GLOBAL.usuario.apellido+`" readonly />
                                                </div>                              
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="form-group">
                                                <label>Fecha <span class="text-red">(*)</span></label>
                                                <div class="form-group">
                                                    <input type="date" class="form-control" name="fecha" value="`+HELPER.fecha(null, 'YYYY-MM-DD')+`" required />
                                                </div>                              
                                            </div>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="form-group">
                                                <label>Hora <span class="text-red">(*)</span></label>
                                                <div class="form-group">
                                                <input type="time" class="form-control" name="hora" value="`+HELPER.fecha(null, 'HH:mm')+`" required />
                                                </div>                              
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <label>Importe Inicial <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <span class="input-group-addon">`+GLOBAL.moneda_sistema.simbolo+`</span>
                                                    <input type="number" step="any" name="saldo_inicial" class="form-control" autocomplete="off" list="list-contacto_nombre">
                                                </div>                                   
                                            </div>   
                                        </div>
                                        <div class="col-md-12" align="center" style="padding:5px;">
                                            <label><input type="checkbox" required/> Acepto aperturar caja</label>
                                        </div>
                                        <div class="col-md-12">
                                            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;"><i class="fa fa-plus-circle"></i>  APERTURAR CAJA</button>
                                        </div>
                                    </div>
                                </form>                                
                            </div>
                        </div>
                        <!-- /.box -->                           
                    </div>

                    
                </div>

            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Tipo Movimiento<span class="text-red">(*)</span></label>
                                            <select name="tipo_movimiento" class="form-control select">
                                                <option value="">Seleccione...</option>
                                                <option value="INGRESO">INGRESO</option>
                                                <option value="EGRESO">EGRESO</option>
                                            </select>                           
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Fecha <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <input type="date" class="form-control" name="fecha" />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Atencion <small>()</small></label>
                                            <div class="form-group">
                                            <select name="id_atencion" data-select="VIAJE" class="form-control"></select>
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Motivo <span class="text-red">(*)</span></label>
                                            <input type="text" name="motivo" class="form-control" list="list-motivo_caja" autocomplete="off" />
                                            <datalist id="list-motivo_caja">
                                                <option value="PAGO ATENCION" />
                                                
                                                <option value="OTROS" />
                                            </datalist>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label>Descripción <span class="text-red">(*)</span></label>
                                            <input type="text" class="form-control" name="descripcion" autocomplete="off" />                             
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Modalidad de Pago <span class="text-red">(*)</span></label>
                                            <input type="text" name="modalidad" class="form-control" list="list-modalidad" />
                                            <datalist id="list-modalidad">
                                                <option value="">
                                                <option value="TRANSFERENCIA" />
                                                <option value="EFECTIVO" />
                                                <option value="CHEQUE" />
                                                <option value="DEPÓSITO" />   
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Moneda <span class="text-red">(*)</span></label>
                                            <select name="id_moneda" data-select="MONEDA" class="form-control select"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Tipo Cambio <span class="text-red">(*)</span></label>
                                            <input type="number" step="any" name="tipo_cambio" class="form-control" autocomplete="off">
                                        </div>
                                    </div>      
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Importe <span class="text-red">(*)</span></label>
                                            <input type="text" name="importe" class="form-control" autocomplete="off">
                                        </div>                         
                                    </div> 
                                    <div class="col-md-4" data-contenedor="tipo_persona">
                                        <div class="form-group">
                                            <label>Tipo Persona <span class="text-red">(*)</span></label>
                                            <select name="tipo_persona" class="form-control select">
                                                <option value="">Seleccione...</option>
                                                
                                                <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                                                <option value="BIOLOGO">BIOLOGO</option>
                                                <option value="ENFERMERA">ENFERMERA</option>
                                                <option value="MEDICO">MEDICO</option>
                                                <option value="MICROBIOLOGO">MICROBIOLOGO</option>
                                                <option value="PSICOLOGO">PSICOLOGO</option>
                                                <option value="TEC.ENFERMERA">TEC.ENFERMERA</option>
                                                <option value="TECNOLOGO MEDICO">TECNOLOGO MEDICO</option>
                                                <option value="OTRO">OTRO</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4" data-campo="id_tipo_persona" data-contenedor="tipo_persona">
                                        <div class="form-group">
                                            <label>Persona <span class="text-red">(*)</span></label>
                                            <select name="id_tipo_persona" data-select="ID_TIPO_PERSONA" class="form-control"></select>                          
                                        </div>
                                    </div>
                                    <div class="col-md-4" data-campo="nombre_persona" data-contenedor="tipo_persona">
                                        <div class="form-group">
                                            <label>Nombre completo de persona <span class="text-red">(*)</span></label>
                                            <input type="text" name="nombre_persona" class="form-control" autocomplete="off">                 
                                        </div>
                                    </div>
                                    <div class="col-md-6" data-campo="id_cuenta_bancaria_persona" data-contenedor="tipo_persona">
                                        <div class="form-group">
                                            <label>Cuenta Bancaria de Persona <span class="text-red">(*)</span></label>
                                            <select name="id_cuenta_bancaria_persona" data-select="ID_CUENTA_BANCARIA_PERSONA" class="form-control"></select>                          
                                        </div>
                                    </div>
                                    <div class="col-md-6" data-campo="cuenta_bancaria_persona" data-contenedor="tipo_persona">
                                        <div class="form-group">
                                            <label>Cuenta Bancaria de Persona <span class="text-red">(*)</span></label>
                                            <input type="text" name="cuenta_bancaria_persona" class="form-control" autocomplete="off">                 
                                        </div>
                                    </div>
                                    <div class="col-md-6" data-contenedor="tipo_persona">
                                        <div class="form-group">
                                            <label>Cuenta Bancaria de Empresa</label>
                                            <select name="id_cuenta_bancaria_empresa" data-select="CUENTA_BANCARIA_EMPRESA" class="form-control"></select>                          
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Observación</label>
                                            <textarea name="observacion" class="form-control"></textarea>                          
                                        </div>
                                    </div>
                                    
                                                    
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-primary">Guardar</button>
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
                                        Confirmo realizar la anulación</label>
                                    <p style="color:red;">Esta acción no se podrá revertir</p>
                                </div>
                                <div class="col-md-12" name="texto" align="center">

                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Anular Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- MODAL SAVE CIERRE -->
            <div class="modal inmodal fade" name="modal-save_cierre" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="save_cierre" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save_cierre">                            
                            <div class="modal-body" style="display:block" >
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Usuario de Sistema</label>
                                            <div class="form-group">
                                                <input type="text" class="form-control" value="`+GLOBAL.usuario.nombre+` `+GLOBAL.usuario.apellido+`" readonly />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Fecha Apertura<span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="fecha_apertura" disabled />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Fecha Cierre<span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                                <input type="date" class="form-control" name="fecha" required />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Hora Cierre<span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <input type="time" class="form-control" name="hora" required />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                       <table class="table table-striped" style="width:100%;">
                                            <tr>
                                                <td>SALDO INICIAL</td>
                                                <td>`+GLOBAL.moneda_sistema.simbolo+` <span name="cierre-saldo_inicial" style="float:right;"></span></td>
                                            </tr>
                                            <tr>
                                                <td>INGRESOS</td>
                                                <td>`+GLOBAL.moneda_sistema.simbolo+` <span name="cierre-total_ingreso" style="float:right;"></span></td>
                                            </tr>
                                            <tr>
                                                <td>EGRESOS</td>
                                                <td>`+GLOBAL.moneda_sistema.simbolo+` <span name="cierre-total_egreso" style="float:right;"></span></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="border-bottom:solid; border-width:1px;"></td>
                                            </tr>
                                            <tr>
                                                <td>SALDO FINAL</td>
                                                <td>`+GLOBAL.moneda_sistema.simbolo+` <span name="cierre-total_saldo" style="float:right;"></span></td>
                                            </tr>
                                       </table>
                                    </div>
                                    <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar el cierre de caja</label>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Cerrar Caja</button>
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

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                fecha: {required: true},
                motivo: {required: true},
                modalidad: {required: true},
                id_moneda: {required: true},
                importe: {required: true},
                descripcion: {required: true},
                id_cuenta_bancaria_persona: {required: true},
                cuenta_bancaria_persona: {required: true},
                tipo_cambio: {required:true},
            },
          
            messages: {
                fecha: 'Fecha',
                motivo: 'Motivo',
                modalidad: 'Modalidad',
                id_moneda: 'Moneda',
                importe: 'Importe',
                descripcion: 'Descripción',
                id_cuenta_bancaria_persona: 'Cuenta Bancaria de la Persona',
                cuenta_bancaria_persona: 'Cuenta Bancaria de la Persona',
                tipo_cambio: 'Tipo Cambio'
            },

            submitHandler: function() {
                Componente.submit();
            }
          
        });

        /** SUBMIT APERTURA */
        DOM.find('form[name="save_apertura"]').validate({

            submitHandler: function() {
                Componente.submit_apertura();
            }
          
        });

        /** SUBMIT CIERRE */
        DOM.find('form[name="save_cierre"]').validate({

            submitHandler: function() {
                Componente.submit_cierre();
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
                Componente.submit();
            }
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new();
        });

        /* CERRAR CAJA */
        DOM.on('click', 'button[name="cerrar_caja"]', function(e) {
            e.stopImmediatePropagation();
            Componente.cerrar_caja();
        });

        /* PRINT */
        DOM.on('click', 'button[name="row-print"]', function(e) {
            e.stopImmediatePropagation();
            
            let data = HELPER.get_attr_json($(this));
            Imprimir_caja.print(data.id);
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

        /* CHANGE TIPO  */
        DOM.on('change', 'select[name="tipo_movimiento"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_tipo_movimiento();
            }            
        });

        /* CHANGE TIPO PERSONA */
        DOM.on('change', 'select[name="tipo_persona"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_tipo_persona();
                Componente.select_cuenta_bancaria_persona();
            }            
        });

        /* CHANGE ID TIPO PERSONA */
        DOM.on('change', 'select[name="id_tipo_persona"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.select_cuenta_bancaria_persona();
                Componente.change_id_tipo_persona();
            }            
        });

        /* CHANGE CUENTA BANCARIA PERSONA*/
        DOM.on('change', 'select[name="id_cuenta_bancaria_persona"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_id_cuenta_bancaria_persona();
            }            
        });

        /* CHANGE MODALIDAD */
        DOM.on('change', 'input[name="modalidad"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_tipo_persona();
            }            
        });

        /* CHANGE MONEDA*/
        DOM.on('change', 'select[name="id_moneda"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.select_cuenta_bancaria_empresa();
                Componente.change_moneda();
            }            
        });


        /* CHANGE VIAJE*/
        DOM.on('change', 'select[name="id_atencion"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_atencion();
            }            
        });
        

        DOM.find('input[name="fecha_inicio"]').val(HELPER.fecha_actual());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());

        await Componente.verificar_caja_chica_existente();        
        await Componente.select_atencion();
        await Componente.select_cuenta_bancaria_empresa();
        await Componente.select_moneda();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    fl_auto_event: true,
    id_caja_chica:null,

    /************ */

    change_tipo_movimiento: () => {

        let tipo = DOM.find('select[name="tipo_movimiento"]').val();

        if(tipo == 'EGRESO')
        {
            DOM.find('select[name="id_atencion"]').prop('disabled', false);
            DOM.find('input[name="modalidad"]').prop('readonly', false);
            DOM.find('div[data-contenedor="tipo_persona"]').show('slow');
        }
        else if(tipo == 'INGRESO')
        {
            DOM.find('select[name="id_atencion"]').prop('disabled', true);
            DOM.find('input[name="modalidad"]').val('EFECTIVO');
            DOM.find('input[name="modalidad"]').prop('readonly', true);
            DOM.find('div[data-contenedor="tipo_persona"]').hide('fast');
        }

        Componente.change_tipo_persona();
    },

    verificar_caja_chica_existente: async () => {
        await axios.get(BASE_API + 'tesoreria/caja_chica/verificar_caja_chica_existente')
        .then(async function (response) {

            DOM.find('div[data-contenedor="caja_chica_cerrado"]').hide('slow');
            DOM.find('div[data-contenedor="caja_chica_abierto"]').hide('slow');

            if(response.data.caja_chica == null)
            {
                if(response.data.ultima_caja != null)
                {
                    DOM.find('input[name="saldo_inicial"]').val(response.data.ultima_caja.total_saldo);
                }
                
                DOM.find('div[data-contenedor="caja_chica_cerrado"]').show('slow');
            }
            else
            {
                if(response.data.caja_chica.estado == 'ABIERTO')
                {
                    Componente.id_caja_chica = response.data.caja_chica.id;
                    Componente.datatable();
                    DOM.find('div[data-contenedor="caja_chica_abierto"]').show('slow');

                    DOM.find('span[name="saldo_inicial"]').attr('value_contador_animate', response.data.caja_chica.saldo_inicial);
                    DOM.find('span[name="total_ingreso"]').attr('value_contador_animate', response.data.caja_chica.total_ingreso);
                    DOM.find('span[name="total_egreso"]').attr('value_contador_animate', response.data.caja_chica.total_egreso);
                    DOM.find('span[name="total_saldo"]').attr('value_contador_animate', response.data.caja_chica.total_saldo);

                    HELPER.counter_animate(1000, 2);
                }
                else
                {                    
                    DOM.find('div[data-contenedor="caja_chica_cerrado"]').show('slow');
                }
                
            }
            
        }).catch(error => {
            console.log(error);
        }); 
    },

    actualizar_totales: () => {
        axios.get(BASE_API + 'tesoreria/caja_chica/get_totales/'+Componente.id_caja_chica)
        .then(async function (response) {

            DOM.find('span[name="saldo_inicial"]').text(response.data.saldo_inicial);
            DOM.find('span[name="total_ingreso"]').text(response.data.total_ingreso);
            DOM.find('span[name="total_egreso"]').text(response.data.total_egreso);
            DOM.find('span[name="total_saldo"]').text(response.data.total_saldo);
            
        }).catch(error => {
            console.log(error);
        }); 
    },

    change_moneda: async (get_helper = true) => {
        let value = DOM.find('select[name="id_moneda"]').val();

        if(value == 1)
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', true);
            DOM.find('input[name="tipo_cambio"]').val('');
        }
        else if(value != '')
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', false);
            if(get_helper)
            {
                DOM.find('input[name="tipo_cambio"]').val(await HELPER.get_tipo_cambio(value));
            }
            
        }
    },

    change_atencion: async () => {

        let id_atencion = DOM.find('select[name="id_atencion"]').val();
        
        if(id_atencion != null)
        {
            await axios.get(BASE_API + 'tesoreria/caja/get_atencion/'+id_atencion)
            .then(function (response) {
                
                DOM.find('select[name="id_moneda"]').val(response.data.id_moneda).change();
                DOM.find('div[data-campo="fl_no_liquidacion_atencion"]').show();
                
            }).catch(error => {
                console.log(error);
            }); 
        }
        else
        {
            DOM.find('div[data-campo="fl_no_liquidacion_atencion"]').hide();
            DOM.find('input[name="fl_no_liquidacion_atencion"]').prop('checked', false);
        }
    },

    select_moneda: async () => {

        let select = DOM.find('select[data-select="MONEDA"]');  

        await axios.get(BASE_API + 'recursos/data_static/moneda')
        .then(function (response) {

            let html = '<option value="">Seleccione...</option>';

            response.data.forEach(row => {
                html += '<option value="'+row.id+'">'+row.text+'</option>';
            });

            select.html(html);
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },
    

    change_id_tipo_persona: async () => {

        let tipo_persona = DOM.find('select[name="tipo_persona]').val();

        if(tipo_persona != 'OTRO')
        {
            let nombre = DOM.find('select[name="id_tipo_persona"] option:selected').text()
            DOM.find('input[name="nombre_persona"]').val(nombre);
        }
        
    },

    change_id_cuenta_bancaria_persona: async () => {

        let tipo_persona = DOM.find('select[name="tipo_persona]').val();

        if(tipo_persona != 'OTRO')
        {
            let nombre_cuenta = DOM.find('select[name="id_cuenta_bancaria_persona"] option:selected').text()
            DOM.find('input[name="cuenta_bancaria_persona"]').val(nombre_cuenta);
        }
        
    },


    select_cuenta_bancaria_persona : async () => {        

        let id = DOM.find('select[name="id_tipo_persona"]').val();
        let tipo_persona = DOM.find('select[name="tipo_persona"]').val();

        let select = DOM.find('select[data-select="ID_CUENTA_BANCARIA_PERSONA"]');     
        select.empty();  
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        if(id != '' && id != null)
        {
            await axios.get(BASE_API + 'configuracion/cuenta_bancaria_persona/get_select?tipo='+tipo_persona+'&id='+id)
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

    change_tipo_persona: async () => {

        let tipo_persona = DOM.find('select[name="tipo_persona"]').val();
        
        let url;
        let select_tipo_persona = true;

        DOM.find('div[data-campo="id_tipo_persona"]').show();
        DOM.find('select[name="id_tipo_persona"]').prop('disabled', false);
        DOM.find('div[data-campo="nombre_persona"]').hide();

        if(tipo_persona!='OTRO'){

            url = BASE_API  + 'configuracion/personal/get_select?tipo='+tipo_persona;

        }
        else

        {

            select_tipo_persona = false;
            DOM.find('select[name="id_tipo_persona"]').prop('disabled', true);
            DOM.find('div[data-campo="id_tipo_persona"]').hide();
            DOM.find('div[data-campo="nombre_persona"]').show();

        }

       /*  switch (tipo_persona) {
            case 'DOCTOR':
                url = BASE_API  + 'configuracion/personal/get_select?tipo=DOCTOR';
            break;
        
            case 'ADMINISTRATIVO':
                url = BASE_API  +   'configuracion/personal/get_select?tipo=ADMINISTRATIVO';
            break;

            case 'PROVEEDOR':
                url = BASE_API  +   'configuracion/socio/get_select_simple?fl_proveedor=true';
            break;

            case 'OTRO':                    
                select_tipo_persona = false;

                DOM.find('select[name="id_tipo_persona"]').prop('disabled', true);
                DOM.find('div[data-campo="id_tipo_persona"]').hide();
                DOM.find('div[data-campo="nombre_persona"]').show();

            break;

            default:
                select_tipo_persona = false;
            break;
        } */
        
        if(select_tipo_persona)
        {
            await Componente.select_tipo_persona(url);
        }   

        /** CAMPOS CUENTA BANCARIA */
        let modalidad = DOM.find('input[name="modalidad"]').val();

        DOM.find('select[name="id_cuenta_bancaria_persona"]').prop('disabled', false);
        DOM.find('input[name="cuenta_bancaria_persona"]').prop('disabled', false);
        DOM.find('div[data-campo="id_cuenta_bancaria_persona"]').show();
        DOM.find('div[data-campo="cuenta_bancaria_persona"]').hide();

        if(modalidad != 'EFECTIVO')
        {
            if(tipo_persona == 'OTRO')
            {
                DOM.find('select[name="id_cuenta_bancaria_persona"]').prop('disabled', true);
                DOM.find('div[data-campo="id_cuenta_bancaria_persona"]').hide();
                DOM.find('div[data-campo="cuenta_bancaria_persona"]').show();
            }
            else
            {
                DOM.find('div[data-campo="id_cuenta_bancaria_persona"]').show();
                DOM.find('div[data-campo="cuenta_bancaria_persona"]').hide();
            }
        }
        else
        {
            DOM.find('select[name="id_cuenta_bancaria_persona"]').prop('disabled', true);
            DOM.find('input[name="cuenta_bancaria_persona"]').prop('disabled', true);
        }
    },

    select_tipo_persona: async (url) => {

        let select = DOM.find('select[data-select="ID_TIPO_PERSONA"]');  

        await axios.get(url)
        .then(function (response) {

            let html = '<option value="">Seleccione...</option>';

            response.data.forEach(row => {
                html += '<option value="'+row.id+'">'+row.text+'</option>';
            });

            select.html(html);
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_cuenta_bancaria_empresa: async () =>
    {
        let select = DOM.find('select[data-select="CUENTA_BANCARIA_EMPRESA"]');       
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccionar...'));

        let id_moneda = DOM.find('select[name="id_moneda"]').val();

        if(id_moneda != '')
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

    select_atencion: async () => {

        DOM.find('select[data-select="VIAJE"]').select2({
            ajax: {
              url: BASE_API + "operacion/atencion/get_select",
              dataType: 'json',
              delay: 250,
              data: function(params) {
                return {buscar:params.term};
              },
              processResults: function(data, params) {      
                return {results: data};
              },
              cache: true,
            },
            escapeMarkup: function(markup) {
              return markup;
            },
            placeholder: "Buscar por Serie-Número o dia/mes/año ",
            minimumInputLength: 6,
            allowClear:true
        });

    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:   {
                    url: BASE_API + 'tesoreria/caja/index_caja_chica',
                    data: function (d) {
                        d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                        d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                        d.id_caja_chica = Componente.id_caja_chica;
                    }
            },

            columns: [{
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {

                        let html = `
                            <div class="btn-group" style="width:120px;">
                                <button type="button" class="btn btn-default btn-sm" name="row-print"><i class="fa fa-print"></i></button>     
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                      <i class="fa fa-angle-down"></i>
                                </button>
                                `;

                                if(row.id_orden_pago == null && row.id_factura_pago == null)
                                {
                                    html += `
                                        <ul class="dropdown-menu dropdown-menu-left" role="menu">
                                            <li><a class="dropdown-item" name="row-edit" href="javascript:"><i class="far fa-pencil"></i> Editar</a></li>
                                            <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-ban"></i> Anular</a></li>
                                        </ul>
                                        `;
                                }
                                

                                html += `
                            </div>
                        `;

                        return html;
                    },
                    width: '100px',
                },
                { title: 'T. MOV.', mData: 'tipo_movimiento' },
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'NÚMERO', mData: 'caja' },                
                { title: 'MOTIVO', mData: 'motivo' },
                { title: 'MODALIDAD', mData: 'modalidad' },
                { title: 'IMPORTE', render: function(data, type, row) { return '<span style="float:left;">'+row.simbolo_moneda+'</span> '+row.importe; }, class:'text-right'},
                { title: 'TIPO CAMBIO', mData: 'tipo_cambio' },
                { title: 'DESCRIPCION', mData: 'descripcion' },  
                { title: 'ATENCION', mData: 'atencion' },
                { title: 'PERSONA', mData: 'nombre_persona' },
                
                { title: 'ESTADO', defaultContent: ``,                    
                    render: function(data, type, row) {
                        
                        let html = ``;

                        if(row.fl_estado == 0)
                        {
                            html = `
                                <small class="label label-danger"> ANULADO</small>
                            `;
                        }
                        else if(row.fl_estado == 1)
                        {
                            html = `
                                <small class="label label-default"> EN EVALUACIÓN</small>
                            `;
                        }
                        else if(row.fl_estado == 2)
                        {
                            html = `
                                <small class="label label-primary"> APROBADO</small>
                            `;
                        }
                        else if(row.fl_estado == 3)
                        {
                            html = `
                                <small class="label label-success"> PROCESADO</small>
                            `;
                        }

                        return html;
                    }
                },
                { title: 'COMENTARIO', mData: 'comentario_autorizacion', visible: (Componente.tipo == 'CAJA_RAPIDA') ? false : true },
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

    cerrar_caja: async () => {
        
        let accion = 'save_cierre';
        let form = DOM.find('form[name="save_cierre"]');

        DOM.find('h4[name="'+accion+'"]').text('Cierre de Caja ');

        /** DATA */
        HELPER.reset_form(form);

        await axios.get(BASE_API + 'tesoreria/caja_chica/get_totales/'+Componente.id_caja_chica)
        .then(async function (response) {

            DOM.find('span[name="cierre-saldo_inicial"]').text(response.data.saldo_inicial);
            DOM.find('span[name="cierre-total_ingreso"]').text(response.data.total_ingreso);
            DOM.find('span[name="cierre-total_egreso"]').text('-'+response.data.total_egreso);
            DOM.find('span[name="cierre-total_saldo"]').text(response.data.total_saldo);
            form.find('input[name="fecha_apertura"]').val(HELPER.fecha(response.data.fecha_apertura, 'DD/MM/YYYY h:mm a'));

        }).catch(error => {
            console.log(error);
        }); 

        form.find('input[name="fecha"]').val(HELPER.fecha(null, 'YYYY-MM-DD'));
        form.find('input[name="hora"]').val(HELPER.fecha(null, 'HH:mm'));

        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    get_correlativo: async () => {

        await axios.get(BASE_API+'tesoreria/caja/get_correlativo')
        .then(function (response) {

            DOM.find('input[name="numero"]').val(response.data.numero);
            DOM.find('input[name="serie"]').val(response.data.serie);

        }).catch(error => {
            console.log(error);
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo ');

        /** DATA */
        HELPER.reset_form(form);

        form.find('input[name="fecha"]').val(HELPER.fecha_actual());
        
        this.get_correlativo();

        form.find('select[name="id_moneda"]').val(1).change();

        this.id = null;
        this.action_submit = accion;
        
        DOM.find('div[data-campo="fl_no_liquidacion_atencion"]').hide();
        DOM.find('tbody[name="detalle-cuenta_bancaria"]').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: async (row) => {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar ');

        /** DATA */
        HELPER.reset_form(form);

        DOM.find('div[data-campo="fl_no_liquidacion_atencion"]').hide();

        let data = HELPER.get_attr_json(row);

        Componente.fl_auto_event = false;

        form.find('select[name="tipo_movimiento"]').val(data.tipo_movimiento).change();
        await Componente.change_tipo_movimiento();

        form.find('input[name="fecha"]').val(data.fecha);

        form.find('input[name="serie"]').val(data.serie);
        form.find('input[name="numero"]').val(data.numero);

        if(data.id_atencion != null)
        {
            form.find('select[name="id_atencion"]').html('');
            form.find('select[name="id_atencion"]').append(new Option(data.atencion, data.id_atencion));
        }        

        form.find('input[name="descripcion"]').val(data.descripcion);
        form.find('input[name="motivo"]').val(data.motivo).change();
        form.find('input[name="modalidad"]').val(data.modalidad);
        form.find('input[name="importe"]').val(data.importe);
        form.find('select[name="tipo_persona"]').val(data.tipo_persona).change();
        form.find('input[name="fl_no_liquidacion_atencion"]').prop('checked', parseInt(data.fl_no_liquidacion_atencion));
        
        
        await Componente.change_atencion();

        await Componente.change_tipo_persona();

        form.find('select[name="id_tipo_persona"]').val(data.id_tipo_persona).change();
        form.find('input[name="nombre_persona"]').val(data.nombre_persona);

        await Componente.change_tipo_persona();

        form.find('select[name="id_moneda"]').val(data.id_moneda).change();

        await Componente.change_moneda(false);
        form.find('input[name="tipo_cambio"]').val(data.tipo_cambio);


        form.find('select[name="id_tipo_persona"]').val(data.id_tipo_persona).change();

        await Componente.select_cuenta_bancaria_persona();

        form.find('select[name="id_cuenta_bancaria_persona"]').val(data.id_cuenta_bancaria_persona).change();
        form.find('input[name="cuenta_bancaria_persona"]').val(data.cuenta_bancaria_persona);

        await Componente.select_cuenta_bancaria_empresa();

        form.find('select[name="id_cuenta_bancaria_empresa"]').val(data.id_cuenta_bancaria_empresa).change();
        form.find('textarea[name="observacion"]').html(data.observacion);

       

        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Anular Caja');

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
        formData.append('id_caja_chica', Componente.id_caja_chica);

        axios({
            method: 'post',
            url: BASE_API + 'tesoreria/caja_chica/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            Componente.actualizar_totales();
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');

            if(Componente.action_submit == 'save')
            {
                Imprimir_caja.print(response.data.id_caja);
            }
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    submit_apertura: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="save_apertura"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="save_apertura"]'));

        if (this.id != null) { formData.append('id', this.id); }

        axios({
            method: 'post',
            url: BASE_API + 'tesoreria/caja_chica/save_apertura',
            data: formData
        })
        .then(function(response) { 
            Componente.verificar_caja_chica_existente();
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    submit_cierre: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="save_cierre"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="save_cierre"]'));

        formData.append('id_caja_chica', Componente.id_caja_chica);

        axios({
            method: 'post',
            url: BASE_API + 'tesoreria/caja_chica/save_cierre',
            data: formData
        })
        .then(function(response) { 
            Comp_reporte_caja_chica.imprimir(Componente.id_caja_chica);
            Componente.verificar_caja_chica_existente();
            DOM.find('div[name="modal-save_cierre"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

} 

export default Componente;