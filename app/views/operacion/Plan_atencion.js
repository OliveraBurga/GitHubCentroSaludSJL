


 import Imprimir_plan_atencion from './Imprimir.js'
 import Customer_triaje from '../../../customer/Triaje.js'

let DOM, DOM_ID ;
let Componente = {
    render: async (d, tipo = 'PLAN ATENCION') => {

        let titulo = 'HISTORIA CLINICA';

       
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            `+titulo+`
                            <small>Operacion</small>
                        </h1>
                    </div>
                    
                </div>
                </section>

                <!-- Main content -->
                <section class="content">

                <!-- Default box -->
                <div class="box box-warning">
                  <div class="box-body">
                    <div class="row">        
                      <div class="col-md-2">
                        <div class="form-group">
                            <label>Fecha Desde</label>
                            <input type="date" name="fecha_inicio" id="fecha_inicio" class="form-control" autocomplete="off">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                            <label>Fecha Hasta</label>
                            <input type="date" name="fecha_fin" id="fecha_fin" class="form-control" autocomplete="off">
                        </div>
                      </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label>Tipo <small> </small></label>
                            <div class="form-group">
                            <select name="id_tipo" data-select="hg" class="form-control select">
                            <option value="SIN_ATENCION">SIN ATENCION</option>
                            <option value="">CON ATENCION</option>
                            </select>
                            </div>                              
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Paciente <small>(*)</small></label>
                            <div class="form-group">
                            <select name="id_paciente_filtro" data-select="PACIENTE" class="form-control"></select>
                            </div>                              
                        </div>
                    </div>

                    <div class="col-md-1" style="padding-top:19px;">
                    <button class="btn btn-warning" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>
                    </div>
                </div>
            </div>
        </div>
                <!-- /.box -->

                <!-- Default box -->
                <div class="box box-warning">
                    <div class="box-body">
                    <div class="table-responsive">
                        <table name="registros" class="table table-striped nowrap" style="width:100%;"></table>
                    </div>
                    </div>
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="nav-tabs-custom">
                                    <ul class="nav nav-tabs">
                                        <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Historial</a></li>
                                        <li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Datos Generales</a></li>
                                        <li class=""><a href="#tab_3" data-toggle="tab" aria-expanded="false">Diagnostico- CIE10</a></li>
                                        <li class=""><a href="#tab_4" data-toggle="tab" aria-expanded="false">Patología Clínica</a></li>
                                        <li class="" ><a href="#tab_5" data-toggle="tab" aria-expanded="false">Anatomía Patológica</a></li>
                                        <li class="" ><a href="#tab_6" data-toggle="tab" aria-expanded="false">Diagnóstico por Imágenes</a></li>
                                        <li class=""><a href="#tab_7" data-toggle="tab" aria-expanded="false">Intervención quirúrgica</a></li>
                                        <li class=""><a href="#tab_8" data-toggle="tab" aria-expanded="false">Receta Médica</a></li>
                                        <li class=""><a href="#tab_9" data-toggle="tab" aria-expanded="false">Vacunas</a></li>

                                     </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tab_1">
                                            <div class="row">
                                                <div class="col-md-6"  style="display:none">
                                                    <div class="form-group">
                                                        <label>Paciente <span class="text-red"> </span></label>
                                                        <div class="form-group">
                                                        <input type="text" class="form-control" data-name="paciente" disabled/>
                                                        </div>                              
                                                    </div>
                                                </div>
                                                <div class="col-md-6"  style="display:none">
                                                    <div class="form-group">
                                                        <label>Especialista <span class="text-red"> </span></label>
                                                        <div class="form-group">
                                                        <input type="text" class="form-control" data-name="especialista" disabled/>
                                                        </div>                              
                                                    </div>
                                                </div>
                                                <div class="col-md-6" style="display:none">
                                                    <div class="form-group">
                                                        <label>Servicio <span class="text-red"> </span></label>
                                                        <div class="form-group">
                                                        <input type="text" class="form-control" data-name="servicio" disabled/>
                                                        </div>                              
                                                    </div>
                                                </div>
                                               
                                                <div style="display:none" class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Tratamiento <span class="text-red"></span></label> 
                                                        <textarea name="tratamiento" class="form-control"></textarea>  
                                                    </div>                         
                                                </div>  
                                                <div class="col-md-12" style="display:none"> 
                                                
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Tratamiento</th>
                                                                <th>Presentación</th>
                                                                <th>Dosis</th>
                                                                <th>Vía administración</th>
                                                                <th>Tiempo Tratamiento</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody name="detalle-tratamiento"></tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td><button type="button" name="agregar_tratamiento" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>

                                              
                                                <div class="col-md-12" style="display:none">
                                                    <div class="form-group">
                                                        <label>Plan<span class="text-red"> </span></label>
                                                        <input type="text" name="plan" class="form-control" autocomplete="off">
                                                    </div>                         
                                                </div>                                    
                                            



                                                <div class="col-md-12">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>FECHA</th>
                                                                <th>MEDICO</th>
                                                                <th>SERVICIO</th>
                                                                <th>DIAGNOSTICO</th>
                                                                <th>RECETA</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody name="historial">
                                                        
                                                        </tbody>
                                                         
                                                    </table>
                                                </div>


                                                 
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="tab_2">
                                            <div class="row">

                                                <div class="col-md-12">
                                                    <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;font-size: 12px;font-family: Tahoma;">
                                                        <table style="width:100%;">
                                                            <tr>
                                                                <td  colspan="4" style="text-align: center;font-size: 18px;"><strong>DATOS DEL PACIENTE</strong></td>
                                                            
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 15%;" > <strong> PACIENTE</strong></td>
                                                                <td  style="width: 35%;"><span>:</span><span name="paciente"></span> </td>
                                                                <td  style="width: 15%;"><strong>DIRECCION</strong></td>
                                                                <td  style="width: 35%;"><span>:</span><span name="direccion"></span> </td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td ><strong> DNI</strong></td>
                                                                <td ><span>:</span><span name="dni"></span> </td>
                                                                <td ><strong>SEXO</strong></td>
                                                                <td ><span>:</span><span name="sexo"></span> </td>
                                                            </tr>
                                                            <tr>
                                                                <td ><strong> FECHA NACIMIENTO</strong></td>
                                                                <td ><span>:</span><span name="fecha_nacimiento"></span> </td>
                                                                <td ><strong>EDAD</strong></td>
                                                                <td ><span>:</span><span name="edad"></span> </td>
                                                            </tr>
                                                         
                                                        </table>
                                                    </div>
                                                </div>

                                                
                                                    <div class="col-md-12">
                                                        <div style="background-color:#fff !important; border: 1px solid #bebdbd !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;font-size: 12px;font-family: Tahoma;">
                                                            <table style="width:100%;">
                                                                <tr>
                                                                    <td  colspan="4" style="text-align: center;font-size: 18px;"><strong>FUNCIONES VITALES</strong></td>
                                                                
                                                                </tr>
                                                            
                                                                
                                                                
                                                                <tr>
                                                                    <td ><strong> PRECION ARTERIAL</strong></td>
                                                                    <td ><span>:</span><span name="presion_arterial"></span> </td>
                                                                    <td ><strong>TEMPERATURA</strong></td>
                                                                    <td ><span>:</span><span name="temperatura"></span> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td ><strong> FRECUENCIA RESPIRATORIA</strong></td>
                                                                    <td ><span>:</span><span name="frecuencia_respiratoria"></span> </td>
                                                                    <td ><strong>FRECUENCIA CARDIACA</strong></td>
                                                                    <td ><span>:</span><span name="frecuencia_cardiaca"></span> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td ><strong>PESO</strong></td>
                                                                    <td ><span>:</span><span name="peso"></span> </td>
                                                                    <td ><strong>TALLA</strong></td>
                                                                    <td ><span>:</span><span name="talla"></span> </td>
                                                                </tr>
                                                                <tr>
                                                                    <td ><strong>SATURACION</strong></td>
                                                                    <td ><span>:</span><span name="saturacion"></span> </td>
                                                                    <td ><strong> </strong></td>
                                                                    <td ><span  ></span> </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Fecha<span class="text-red"> </span></label>
                                                            <div class="form-group">
                                                            <input type="date" class="form-control" name="fecha" />
                                                            </div>                              
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Serie<span class="text-red"> </span></label>
                                                            <div class="form-group">
                                                            <input type="text" class="form-control" name="serie" disabled/>
                                                            </div>                              
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Numero<span class="text-red"> </span></label>
                                                            <div class="form-group">
                                                            <input type="text" class="form-control" name="numero" disabled/>
                                                            </div>                              
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Antecedentes<span class="text-red"> </span></label>
                                                            <textarea name="antecedente" class="form-control"></textarea>       
                                                        </div>                         
                                                    </div>  
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Motivo de la consulta<span class="text-red"> </span></label>
                                                            <textarea name="motivo" class="form-control"></textarea>  
                                                        </div>                         
                                                    </div>  
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Examen Fisico<span class="text-red"> </span></label>
                                                            <textarea name="examen_fisico" class="form-control"></textarea>  
                                                        </div>                         
                                                    </div> 
                                           

                                                
                                                </div> 
                                            </div>
                                            <div class="tab-pane" id="tab_3">
                                                <div class="row">
                                                    <div class="col-md-12">     
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>DIAGNOSTICO</th>
                                                                    <th>TIPO</th>
                                                                    <th></th>
                                                                
                                                                </tr>
                                                            </thead>
                                                            <tbody name="detalle-diagnostico"></tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td><button type="button" name="agregar_diagnostico" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>

                                                
                                                </div> 
                                            </div>

                                            <div class="tab-pane" id="tab_4">
                                                <div class="row">


                                                    <div class="col-md-12" style="display:none"> 
                                                        
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Tratamiento</th>
                                                                    <th>Presentación</th>
                                                                    <th>Dosis</th>
                                                                    <th>Vía administración</th>
                                                                    <th>Tiempo Tratamiento</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody name="detalle-tratamiento"></tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td><button type="button" name="agregar_tratamiento" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>ANALISIS</th>
                                                                
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody name="detalle-patologia_clinica"></tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td><button type="button" name="agregar_patologia_clinica" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>

                                             
                                            

                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Observación <span class="text-red"></span></label> 
                                                            <textarea name="observacion" class="form-control"></textarea>  
                                                        </div>                         
                                                    </div> 

                                                
                                                </div> 
                                            </div>

                                            <div class="tab-pane" id="tab_5">
                                                <div class="row">


                                                <div class="col-md-12">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>NOMBRE</th>
                                                            
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody name="detalle-anatomia_patologica"></tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td><button type="button" name="agregar_anatomia_patologica" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                                
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Observación <span class="text-red"></span></label> 
                                                        <textarea name="observacion_anatomia_patologica" class="form-control"></textarea>  
                                                    </div>                         
                                                </div> 

                                                
                                                </div> 
                                            </div>

                                            <div class="tab-pane" id="tab_6">
                                                <div class="row">

                                                
                                                    <div class="col-md-12">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>NOMBRE</th>
                                                                
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody name="detalle-diagnostico_imagenes"></tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td><button type="button" name="agregar_diagnostico_imagenes" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>

                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Observación <span class="text-red"></span></label> 
                                                            <textarea name="observacion_diagnostico_imagenes" class="form-control"></textarea>  
                                                        </div>                         
                                                    </div> 

                                                </div> 
                                            </div>
                                            <div class="tab-pane" id="tab_7">
                                                <div class="row">

                                                <div class="col-md-12">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>NOMBRE</th>
                                                            
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody name="detalle-intervencion_quirurjica"></tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td><button type="button" name="agregar_intervencion_quirurjica" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>


                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Observación <span class="text-red"></span></label> 
                                                        <textarea name="observacion_intervencion_quirurjica" class="form-control"></textarea>  
                                                    </div>                         
                                                </div> 
                                                
                                                </div> 
                                            </div>
                                            <div class="tab-pane" id="tab_8">
                                                <div class="row">

                                                    <div class="col-md-12"> 

                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>MEDICAMENTO</th>
                                                                    <th>CANTIDAD</th>
                                                                    <th>UM</th>
                                                                    <th>FRECUENCIA</th>
                                                                    <th>PERIODO</th>
                                                                    <th>UNIDAD DE TIEMPO</th>
                                                                 
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody name="detalle-receta"></tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td><button type="button" name="agregar_receta" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>

                                                
                                                </div> 
                                            </div>


                                            <div class="tab-pane" id="tab_9">
                                                        <div class="row">

                                                            <div class="col-md-12"> 

                                                                <table class="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>TIPO</th>
                                                                            <th>NOMBRE</th>
                                                                            <th>DOSIS</th>
                                                                            <th>FECHA</th>
                                                                           
                                                                        
                                                                        
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody name="historial_vacunas"></tbody>
                                                                     
                                                                </table>
                                                            </div>

                                                        
                                                        </div> 
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
        

            
            <div class="modal inmodal fade" name="modal-historial" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title">Atencion </h4>
                        </div>
                        
                        <div class="modal-body">
                            <div class="row">          
                                <div class="col-md-12">
                                    <table style="width:100%;">
                                        <tr>
                                            <td colspan="2" style="text-align:  center;">
                                               <span style="font-weight:bold; color:#0d1013;font-size:20px; ">DETALLE PACIENTE</span>
                                            </td>
                                             
                                              
                                        </tr>
                                        <tr>
                                            <td style="text-align:  left;">
                                               <span style="font-weight:bold; color:#085BBE">HISTORIA CLINICA</span>
                                            </td>
                                            <td style="text-align: left;">
                                                <span name="historia_clinica" style="font-size:18px; color:#EA3838; font-weight:bold; text-align:left;"></span>
                                             </td>
                                              
                                        </tr>
                                        <tr>
                                            <td>
                                                 <span style="font-weight:bold; color:#085BBE">PACIENTE</span>
                                            </td>
                                            <td>
                                                <span name="paciente" style="font-size:18px; color:#EA3838; font-weight:bold; text-align:left;"> </span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-md-12">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>fecha</th>
                                                <th>Atencion</th>
                                              
                                                <th>Medico</th>
                                                <th>Servicio</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody name="detalle-historial"></tbody>
                                    </table>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>


            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-enviar_email" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="enviar_email" class="modal-title">Modal title</h4>
                        </div>
                        <form name="enviar_email">
                            <div class="modal-body">
                                <div class="row">                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>HISTORIAL </label>
                                            <input type="text" name="name" class="form-control" autocomplete="off" readonly required>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Ajuntar Archivo Adicional </label>
                                            <input type="file" name="archivo" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Correo Electrónico <small> </small> <span class="text-red">(*)</span></label>
                                            <input type="text" name="email" class="form-control mayus_false" data-mayus="false" autocomplete="off" required>
                                        </div>
                                    </div>
                                </div>                              
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-primary">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-enviar_sms" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="enviar_sms" class="modal-title">Modal title</h4>
                        </div>
                        <form name="enviar_sms">
                            <div class="modal-body">
                                <div class="row">                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>HISTORIAL </label>
                                            <input type="text" name="name" class="form-control" autocomplete="off" readonly required>
                                        </div>
                                    </div>
                            
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Telefono <small> </small> <span class="text-red">(*)</span></label>
                                            <input type="number" name="telefono" class="form-control mayus_false" data-mayus="false" autocomplete="off" required>
                                        </div>
                                    </div>
                                </div>                              
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-primary">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </div>            
        `;

        Componente.after_render(tipo);     
        
    },

    after_render: async (tipo) => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                fecha: {required: true},
                antecedente: {required: true},
                motivo: {required: true},
                examen_fisico: {required: true},
            
           
            },
          
            messages: {
                fecha: 'Fecha',
                antecedente: 'Antecedentes',
                motivo: 'Motivo',
                examen_fisico: 'Examen fisico',
             
                 
          
            },

            submitHandler: function() {
                Componente.submit();
            }
          
        });
        DOM.find('form[name="enviar_email"]').validate({
            submitHandler: function() {
                Componente.submit_enviar_email();
            }
        });

        DOM.find('form[name="enviar_sms"]').validate({
            submitHandler: function() {
                Componente.submit_enviar_sms();
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
        /* LIQUIDAR */
        DOM.on('click', 'button[name="row-liquidar"]', function(e) {
            e.stopImmediatePropagation();
            Componente.liquidar($(this));
        });

        /* PRINT */
        DOM.on('click', 'button[name="row-print"]', function(e) {
            e.stopImmediatePropagation();
             
            let data = HELPER.get_attr_json($(this));
            Imprimir_plan_atencion.print(data);

            // Imprimir_plan_atencion.plan_atencion(data);
        });
        DOM.on('click', 'a[name="row-print_historial"]', function(e) {
            e.stopImmediatePropagation();

            axios.get(BASE_API + 'operacion/plan_atencion/print/'+$(this).data('id'))
            .then(function (response) {
                
                Imprimir_plan_atencion.print(response.data);        

            }).catch(error => {
                console.log(error);
            }); 

        });

        /* PRINT TRIAJE */
        DOM.on('click', 'a[name="row-print_triaje"]', function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));

            axios.get(BASE_API + 'operacion/triaje/print/'+data.id_triaje)
            .then(function (response) {
                
                Customer_triaje.print(response.data);        

            }).catch(error => {
                console.log(error);
            }); 

            
        });

        /* EDITAR */
        DOM.on('click', 'a[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit($(this));
        });

        DOM.on('click', 'a[name="row-historial"]', function(e) {
            e.stopImmediatePropagation();
            Componente.historial($(this));
        });

        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
         //  
        });
        DOM.on('change', 'select[name="id_tipo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.table.ajax.reload(null, false);    
         
        });
 
        DOM.find('button[name="agregar_diagnostico"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_diagnostico();
        });

   
        DOM.on('click', 'button[name="quitar-diagnostico"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_diagnostico($(this));
        });

      
        DOM.find('button[name="agregar_tratamiento"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_tratamiento();
        });

       
        DOM.on('click', 'button[name="quitar-tratamiento"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_tratamien($(this));
        });

        DOM.find('button[name="agregar_receta"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_receta();
        });

       
        DOM.on('click', 'button[name="quitar-receta"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_receta($(this));
        });


        /* AGREGAR */
        DOM.find('button[name="agregar_patologia_clinica"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_patologia_clinica();
        });

        /* QUITAR  */
        DOM.on('click', 'button[name="quitar-patologia_clinica"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_patologia_clinica($(this));
        });


        /* AGREGAR */
        DOM.find('button[name="agregar_anatomia_patologica"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_anatomia_patologica();
        });

        /* QUITAR  */
        DOM.on('click', 'button[name="quitar-anatomia_patologica"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_anatomia_patologica($(this));
        });
        
        /* AGREGAR */
        DOM.find('button[name="agregar_diagnostico_imagenes"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_diagnostico_imagenes();
        });

        /* QUITAR  */
        DOM.on('click', 'button[name="quitar-diagnostico_imagenes"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_diagnostico_imagenes($(this));
        });


        /* AGREGAR */
        DOM.find('button[name="agregar_intervencion_quirurjica"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_intervencion_quirurjica();
        });

        /* QUITAR  */
        DOM.on('click', 'button[name="quitar-intervencion_quirurjica"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_intervencion_quirurjica($(this));
        });


        DOM.on('click', 'a[name="row-email"]', async function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));
            Componente.enviar_email($(this));

        }); 
       
        
        DOM.on('click', 'a[name="row-sms"]', async function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));
            Componente.enviar_sms($(this));

        }); 


        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
        Componente.select_unidad_medida();
        Componente.tipo = tipo;
     Componente.select_paciente()
        Componente.get_diagnostico();
        Componente.datatable();
  

        Componente.get_data_anatomia_patologica();
        Componente.get_data_diagnostico_imagenes();
        Componente.get_data_intervencion_quirurjica();

        Componente.get_data_analisis();
        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    fl_auto_event: true,
    tipo: null,
    id_delete:null,


        /* ************************************************* */
        quitar_anatomia_patologica: (dom) => {

            var tr = dom.parents('tr');
            var codigo = tr[0].dataset.codigo;
    
            $('tr[data-codigo="'+codigo+'"]').remove();
    
        },
        
        agregar_anatomia_patologica: (data = null) => {
    
            let codigo = Math.random().toString(36).substr(2);
    
            if(data == null)
            {
                data = {
              
                    id_diagnostico: '',

                    id:''
                };
            }
    
            let html = `
                <tr data-codigo="`+codigo+`">
                    <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                
                    <td><select data-select="DIAGNOSTICO_PATOLOGICO" data-name="id_diagnostico" data-codigo="`+codigo+`" class="form-control"></select></td>
                    <td><button type="button" name="quitar-anatomia_patologica" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
                </tr>
            `;
    
            DOM.find('tbody[name="detalle-anatomia_patologica"]').append(html);
            Componente.select_anatomia_patologica(codigo,data.id_diagnostico);
        },
    
        select_anatomia_patologica: async (codigo = null, id_analisis = '') =>
        {
            DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="DIAGNOSTICO_PATOLOGICO"]').html('');
            let select = DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="DIAGNOSTICO_PATOLOGICO"]');
    
            select.append($('<option></option>').attr('value', '').text('Seleccione...'));
    
                Componente.array_anatomia_patologica.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                    
                  
                });
           
            select.val(id_analisis);
            select.select2();
        },
    
    
        get_data_anatomia_patologica: async (tipo ='ANATOMIA PATOLOGICA') =>
        {
            await axios.get(BASE_API+'configuracion/diagnostico_config/get_select/'+tipo)
            .then(async function (response) {
                Componente.array_anatomia_patologica = response.data;
            }).catch(error => {
                console.log(error);
            }); 
        },
    
    
        get_datajson_anatomia_patologica: () => {
    
            let detalle = [];
    
            DOM.find('tbody[name="detalle-anatomia_patologica"] tr').each(function(){
                let item = {
                    id : $(this).find('input[data-name="id"]').val(),
                    id_diagnostico : $(this).find('select[data-name="id_diagnostico"]').val(),
                };
      
                detalle.push(item);
            });
    
            return detalle;
        },
    
    
        /************ */




                /* ************************************************* */
                quitar_diagnostico_imagenes: (dom) => {

                    var tr = dom.parents('tr');
                    var codigo = tr[0].dataset.codigo;
            
                    $('tr[data-codigo="'+codigo+'"]').remove();
            
                },
                
                agregar_diagnostico_imagenes: (data = null) => {
            
                    let codigo = Math.random().toString(36).substr(2);
            
                    if(data == null)
                    {
                        data = {
                      
                            id_diagnostico: '',
        
                            id:''
                        };
                    }
            
                    let html = `
                        <tr data-codigo="`+codigo+`">
                            <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                        
                            <td><select data-select="DIAGNOSTICO_IMAGENES" data-name="id_diagnostico" data-codigo="`+codigo+`" class="form-control"></select></td>
                            <td><button type="button" name="quitar-diagnostico_imagenes" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
                        </tr>
                    `;
            
                    DOM.find('tbody[name="detalle-diagnostico_imagenes"]').append(html);
                    Componente.select_diagnostico_imagenes(codigo,data.id_diagnostico);
                },
            
                select_diagnostico_imagenes: async (codigo = null, id_analisis = '') =>
                {
                    DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="DIAGNOSTICO_IMAGENES"]').html('');
                    let select = DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="DIAGNOSTICO_IMAGENES"]');
            
                    select.append($('<option></option>').attr('value', '').text('Seleccione...'));
            
                        Componente.array_diagnostico_imagenes.forEach(row => {
                            select.append('<option value="'+row.id+'">'+row.text+'</option>');
                            
                          
                        });
                   
                    select.val(id_analisis);
                    select.select2();
                },
            
            
                get_data_diagnostico_imagenes: async (tipo ='DIAGNOSTICO POR IMAGENES') =>
                {
                    await axios.get(BASE_API+'configuracion/diagnostico_config/get_select/'+tipo)
                    .then(async function (response) {
                        Componente.array_diagnostico_imagenes = response.data;
                    }).catch(error => {
                        console.log(error);
                    }); 
                },
            
            
                get_datajson_diagnostico_imagenes: () => {
            
                    let detalle = [];
            
                    DOM.find('tbody[name="detalle-diagnostico_imagenes"] tr').each(function(){
                        let item = {
                            id : $(this).find('input[data-name="id"]').val(),
                            id_diagnostico : $(this).find('select[data-name="id_diagnostico"]').val(),
                        };
              
                        detalle.push(item);
                    });
            
                    return detalle;
                },
            
            
                /************ */


                        /* ************************************************* */
        quitar_intervencion_quirurjica: (dom) => {

            var tr = dom.parents('tr');
            var codigo = tr[0].dataset.codigo;
    
            $('tr[data-codigo="'+codigo+'"]').remove();
    
        },
        
        agregar_intervencion_quirurjica: (data = null) => {
    
            let codigo = Math.random().toString(36).substr(2);
    
            if(data == null)
            {
                data = {
              
                    id_diagnostico: '',

                    id:''
                };
            }
    
            let html = `
                <tr data-codigo="`+codigo+`">
                    <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                
                    <td><select data-select="INTERVENCION" data-name="id_diagnostico" data-codigo="`+codigo+`" class="form-control"></select></td>
                    <td><button type="button" name="quitar-intervencion_quirurjica" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
                </tr>
            `;
    
            DOM.find('tbody[name="detalle-intervencion_quirurjica"]').append(html);
            Componente.select_intervencion_quirurjica(codigo,data.id_diagnostico);
        },
    
        select_intervencion_quirurjica: async (codigo = null, id_analisis = '') =>
        {
            DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="INTERVENCION"]').html('');
            let select = DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="INTERVENCION"]');
    
            select.append($('<option></option>').attr('value', '').text('Seleccione...'));
    
                Componente.array_intervencion_quirurjica.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                    
                  
                });
           
            select.val(id_analisis);
            select.select2();
        },
    
    
        get_data_intervencion_quirurjica: async (tipo ='INTERVENCION QUIRURGICA') =>
        {
            await axios.get(BASE_API+'configuracion/diagnostico_config/get_select/'+tipo)
            .then(async function (response) {
                Componente.array_intervencion_quirurjica = response.data;
            }).catch(error => {
                console.log(error);
            }); 
        },
    
    
        get_datajson_intervencion_quirurjica: () => {
    
            let detalle = [];
    
            DOM.find('tbody[name="detalle-intervencion_quirurjica"] tr').each(function(){
                let item = {
                    id : $(this).find('input[data-name="id"]').val(),
                    id_diagnostico : $(this).find('select[data-name="id_diagnostico"]').val(),
                };
      
                detalle.push(item);
            });
    
            return detalle;
        },
    
    
        /************ */



        get_datajson_vacunas: () => {
    
            let detalle = [];
    
            DOM.find('tbody[name="historial_vacunas"] tr').each(function(){
                let item = {
                    id : $(this).find('input[data-name="id"]').val(),
                    fecha : $(this).find('input[data-name="fecha"]').val(),
                };
      
                detalle.push(item);
            });
    
            return detalle;
        },


    /* ************************************************* */
    quitar_patologia_clinica: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

    },
    
    agregar_patologia_clinica: (data = null) => {

        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
          
                id_analisis: '',
                id:''
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
            
                <td><select data-select="SERVICIO" data-name="id_analisis" data-codigo="`+codigo+`" class="form-control"></select></td>
                <td><button type="button" name="quitar-patologia_clinica" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-patologia_clinica"]').append(html);
        Componente.select__servicio(codigo,data.id_analisis);
    },

    select__servicio: async (codigo = null, id_analisis = '') =>
    {
        DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="SERVICIO"]').html('');
        let select = DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="SERVICIO"]');

        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

            Componente.array_sevicios.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
                
              
            });
       
        select.val(id_analisis);
        select.select2();
    },


    get_data_analisis: async (tipo) =>
    {
        await axios.get(BASE_API+'configuracion/tipo_servicio/get_select')
        .then(async function (response) {
            Componente.array_sevicios = response.data;
        }).catch(error => {
            console.log(error);
        }); 
    },


    get_datajson_patologia_clinica: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-patologia_clinica"] tr').each(function(){
            let item = {
                id : $(this).find('input[data-name="id"]').val(),
                id_analisis : $(this).find('select[data-name="id_analisis"]').val(),
            };
  
            detalle.push(item);
        });

        return detalle;
    },


    /************ */
    get_diagnostico: async () =>
    {
        await axios.get(BASE_API+'configuracion/diagnostico/get_select')
        .then(function (response) {
           Componente.array_diagnostico= response.data;
           console.log(response.data);
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_paciente: async () => {

        DOM.find('select[data-select="PACIENTE"]').select2({
            ajax: {
              url: BASE_API + "configuracion/socio/get_select?fl_cliente=true",
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
            placeholder: "Buscar Razón Social o Número de Documento",
            minimumInputLength: 6,
            allowClear:true
        });

    },

    select_diagnostico: async (codigo = null, id_diagnostico = '') =>
    {
        DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="DIAGNOSTICO"]').html('');
        let select = DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="DIAGNOSTICO"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));
 
            Componente.array_diagnostico.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
                
              
            });
       
        select.val(id_diagnostico);
        select.select2();
    },

    agregar_diagnostico: (data = null) => {
        
        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                id:'',
                id_diagnostico: '',
                tipo:'P',
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                <td><select data-select="DIAGNOSTICO" data-name="id_diagnostico" class="form-control"> </select></td>
                <td><select data-select="TIPO" data-name="tipo" class="form-control">
                    <option value="P">P</option> 
                    <option value="D">D</option> 
                    <option value="R">R</option> 
                </select></td>
                <td><button type="button" name="quitar-diagnostico" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-diagnostico"]').append(html);
        Componente.select_diagnostico(codigo, data.id_diagnostico);
      

    },

    quitar_diagnostico: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

    },

    diagnostico_json: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-diagnostico"] tr').each(function(){
           
            let item = {

                id : $(this).find('input[data-name="id"]').val(),
                id_diagnostico : $(this).find('select[data-name="id_diagnostico"]').val(),
                tipo : $(this).find('select[data-name="tipo"]').val(),

            };
  
            detalle.push(item);
        });

        return detalle;
    },

    /************ */

       
    /************ */

    select_unidad_medida: async () =>
    {
        let select = DOM.find('select[data-select="UNIDAD_MEDIDA"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'configuracion/unidad_medida/get_select')
        .then(function (response) {

            Componente.array_unidad_medida = response.data;
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },


    

    select_unidad: async (codigo = null, id_tipo_mercaderia = '') =>
    {
        let select = DOM.find('tr[data-codigo="'+codigo+'"] select[data-select="UNIDAD"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        Componente.array_unidad_medida.forEach(row => {
            select.append('<option value="'+row.id+'">'+row.text+'</option>');
        });

        select.val(id_tipo_mercaderia);
        select.select2();
    },

    agregar_receta: (data = null) => {
        
        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                id:'',
                medicamento: '',
                cantidad: '',

                id_unidad: '',
                frecuencia: '',
                periodo: '',
                unidad_tiempo: '',
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                <td><input type="text" data-name="medicamento" class="form-control" value="`+data.medicamento+`" /></td>
                <td><input type="number" data-name="cantidad" class="form-control" value="`+data.cantidad+`" /></td>
                <td><select data-select="UNIDAD" data-name="id_unidad" class="form-control"></select> </td>
                <td><input type="text" data-name="frecuencia" class="form-control" value="`+data.frecuencia+`" /></td>
                <td><input type="text" data-name="periodo" class="form-control" value="`+data.periodo+`" /></td>
                <td><input type="text" data-name="unidad_tiempo" class="form-control" value="`+data.unidad_tiempo+`" /></td>

                <td><button type="button" name="quitar-receta" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-receta"]').append(html);
        Componente.select_unidad(codigo, data.id_unidad);
 
    },

    quitar_receta: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

    },

    receta_json: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-receta"] tr').each(function(){
           
            let item = {
            
                id : $(this).find('input[data-name="id"]').val(),
                medicamento:  $(this).find('input[data-name="medicamento"]').val(),
                frecuencia:  $(this).find('input[data-name="frecuencia"]').val(),
                periodo:  $(this).find('input[data-name="periodo"]').val(),
                unidad_tiempo:  $(this).find('input[data-name="unidad_tiempo"]').val(),
                cantidad: $(this).find('input[data-name="cantidad"]').val(),
                id_unidad : $(this).find('select[data-name="id_unidad"]').val(),
            };
  
            detalle.push(item);
        });

        return detalle;
    },

    /************ */


    
    /************ */

    agregar_tratamiento: (data = null) => {
        
        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                id:'',
                medicamento: '',
                presentacion: '',
                dosis: '',
                duracion: '',
                cantidad: ''
            };
        }

        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none;"><input type="hidden" data-name="id" style="width:150px;" value="`+data.id+`"/></td>
                <td><input type="text" data-name="medicamento" class="form-control" value="`+data.medicamento+`" /></td>
            
                <td><select data-name="presentacion" style="width:300px;" class="form-control select"> 
                    <option value="SUS"> SUS</option>
                    <option value="TAB">TAB</option>
                    <option value="INY">INY</option>
                    <option value="JBE">JBE</option>
                    <option value="SOL">SOL</option>
                    <option value="SOL-OFT">SOL-OFT</option>
                    </select>
                </td>

                <td><input type="text" data-name="dosis" class="form-control" value="`+data.dosis+`" /></td>
                <td><select data-name="cantidad" style="width:300px;" class="form-control select"> 
                    <option value="VO"> VO</option>
                    <option value="SC">SC</option>
                    <option value="INY">EV</option>

                    </select>
                </td>
                <td><input type="text" data-name="duracion" class="form-control" value="`+data.duracion+`" /></td>
               
                <td><button type="button" name="quitar-tratamiento" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-tratamiento"]').append(html);
        DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="presentacion"]').val(data.presentacion).select2();
        DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="cantidad"]').val(data.cantidad).select2();

    },

    quitar_tratamien: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

    },

    tratamien_json: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-tratamiento"] tr').each(function(){
           
            let item = {

                id : $(this).find('input[data-name="id"]').val(),
                medicamento:  $(this).find('input[data-name="medicamento"]').val(),
                presentacion:  $(this).find('select[data-name="presentacion"]').val(),
                dosis:  $(this).find('input[data-name="dosis"]').val(),
                duracion:  $(this).find('input[data-name="duracion"]').val(),
                cantidad: $(this).find('select[data-name="cantidad"]').val(),

            };
  
            detalle.push(item);
        });

        return detalle;
    },

    /************ */

    liquidar: function(row) {
        
        let data = HELPER.get_attr_json(row);       
        Componente.get_liquidacion(data.id_atencion);
        DOM.find('tbody[name="historial"]').html('');
        DOM.find('tbody[name="detalle-patologia_clinica"]').html('');

        DOM.find('tbody[name="detalle-diagnostico_imagenes"]').html('');
        DOM.find('tbody[name="detalle-anatomia_patologica"]').html('');
        DOM.find('tbody[name="detalle-intervencion_quirurjica"]').html('');
        DOM.find('tbody[name="detalle-diagnostico"]').html('');

        
        DOM.find('span[name="atencion"]').text( data.atencion);
 
        DOM.find('span[name="especialista"]').text(data.personal);
        DOM.find('span[name="servicio"]').text(data.servicio);
        DOM.find('span[name="presion_arterial"]').text(data.presion_arterial);
        DOM.find('span[name="temperatura"]').text(data.temperatura);
       
        DOM.find('span[name="frecuencia_respiratoria"]').text(data.frecuencia_respiratoria);
        DOM.find('span[name="frecuencia_cardiaca"]').text(data.frecuencia_cardiaca);
        DOM.find('span[name="peso"]').text(data.peso);
        DOM.find('span[name="talla"]').text(data.talla);
        DOM.find('span[name="saturacion"]').text(data.saturacion);

        DOM.find('div[name="modal-save"]').modal('show');


        DOM.find('span[name="paciente"]').text(data.paciente);
        DOM.find('span[name="dni"]').text(data.dni);
        DOM.find('span[name="direccion"]').text(data.direccion);
        DOM.find('span[name="fecha_nacimiento"]').text(HELPER.fecha(data.fecha_nacimiento));
        DOM.find('span[name="sexo"]').text(data.sexo);

        
        let fecha_nacimiento =  data.fecha_nacimiento;
        let hoy = new Date()
        let fechaNacimiento = new Date(fecha_nacimiento)

        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()

  

        if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < (fechaNacimiento.getDate()+1)) ) {

          edad--;
        }
        DOM.find('span[name="edad"]').text(edad);

        axios.get(BASE_API + 'operacion/plan_atencion/historial?id_paciente='+data.id_paciente)
        .then(function (response) {

            let data = response.data;
           let  html ='';
                data.forEach(row => {
                    
                    html += `
                        <tr data-json='`+JSON.stringify(row)+`'>
                            <td style="width:100px; text-align:center; font-size:14px;">
                                <div>`+row.fecha+`</div>
                            </td>
                            <td><div>`+row.personal+`</div></td>
                            <td> <div>`+row.servicio+`</div> </td>
                            <td>`+row.diagnostico+`</td>
                            <td>`+row.receta+`</td>

                            <td>
                            <a class="dropdown-item" href="javascript:" name="row-print_historial" data-id="`+row.id+`"><i class="far fa-print"></i></a>
                            </td>
                        </tr>
                    `;
                });
                        
                    

            DOM.find('tbody[name="historial"]').html(html);
          

        }).catch(error => {
            console.log(error);
        });


        axios.get(BASE_API + 'operacion/plan_atencion/historial_vacunas?id_paciente='+data.id_paciente)
        .then(function (response) {

            let data = response.data;
           let  html ='';

    
                data.forEach(row => {
                    
                    let fecha = row.fecha;
                    let style_color = row.fecha != null? ' background-color: #a9e8f1;':'';

                    html += `
                        <tr>

                        <td style="display:none"><input type="number" data-name="id" class="form-control" value="`+row.id+`" /></td>
                            
                            <td style="${style_color }"><div>`+row.tipo+`</div></td>
                            <td style="${style_color }"> <div>`+row.nombre+`</div> </td>
                            <td style="${style_color }">`+row.dosis+`</td>
                            <td style="${style_color }"><input type="date" data-name="fecha" class="form-control" value="`+fecha+`" /></td>
                        </tr>
                    `;
                });
                        
                    

            DOM.find('tbody[name="historial_vacunas"]').html(html);
          

        }).catch(error => {
            console.log(error);
        });



    },

    get_liquidacion: async (id_atencion) => {

        let accion = 'save';

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Historia Clinica');

        let form = DOM.find('form[name="save"]');

        await axios.get(BASE_API+'operacion/plan_atencion/get_liquidar/'+id_atencion)
        .then( function  async (response) {

            let data = response.data;

            /** DATA */
            HELPER.reset_form(form);
            
            Componente.get_correlativo();
            form.find('input[name="fecha"]').val(HELPER.fecha_actual());

            form.find('input[data-name="numero_atencion"]').val(data.atencion);
            form.find('input[data-name="paciente"]').val(data.paciente);
            form.find('input[data-name="especialista"]').val(data.personal);
            form.find('input[data-name="servicio"]').val(data.servicio);

            Componente.id_atencion = id_atencion;
            Componente.action_submit = accion;
            Componente.archivo_anterior = null;



        }).catch(error => {
            console.log(error);
        }); 
         

  
    },


    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:   {
                    url: BASE_API + 'operacion/plan_atencion',
                    data: function (d) {
                        d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                        d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                        d.tipo =  DOM.find('select[name="id_tipo"]').val();
                        d.id_paciente =  DOM.find('select[name="id_paciente_filtro"]').val();;
                    }
            },

            columns: [{
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                        <div class="btn-group" style="width:150px;">`;

                        if(row.fl_estado == null)
                        {
                            html += `<button type="button" class="btn btn-default btn-sm" name="row-liquidar"><i class="fa fa-flag"></i> ATENCION</button>`;
                        }
                        else
                        {
                            html += `<button type="button" class="btn btn-default btn-sm" name="row-print">VISUALIZAR</button>`;
                        }
                        
                        html += `
                            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-angle-down"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-left" role="menu">`;

                        if(row.fl_estado != null)
                        {
                            html += `
                            <li><a class="dropdown-item" name="row-edit" href="javascript:"><i class="far fa-edit"></i> Editar</a></li>
                            <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-ban"></i> Anular</a></li>
                            <li><a class="dropdown-item" name="row-email" href="javascript:"><i class="fa fa-envelope"></i> Enviar Email</a></li>
                            <li><a class="dropdown-item" name="row-sms" href="javascript:"><i class="fa fa-envelope"></i> Enviar SMS</a></li>
                            
                            `;
                        }

                        html += `
                                <li><a class="dropdown-item" name="row-historial" href="javascript:"><i class="far fa-edit"></i> Ver Historial</a></li>
                            </ul>
                        </div>
                        `;

                    return html;
                    },
                    width: '100px',
                },
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'HISTORIA CLINICA', mData: 'plan_atencion' },
                { title: 'ATENCIÒN', mData: 'atencion' },
                { title: 'TRIAJE', render: function(data, type, row) { 


                    let html = '';

                        if (row.id_triaje != null) {

                            html = '<a href="javascript:" class="text-green" name="row-print_triaje"><i class="fa fa-print"></i> '+ row.numero_triaje +'</a>';
                            
                        }

                        return html;
                    }, class: 'text-center'
                
                },
                { title: 'PERSONAL MEDICO', mData: 'personal' },
                { title: 'PACIENTE', mData: 'paciente' },
                { title: 'SERVICIO', mData: 'servicio' },
                { title: 'ESTADO', defaultContent: ``,                    
                    render: function(data, type, row) {
                        
                        let html = ``;

                        if(row.fl_estado == 0)
                        {
                            html = `
                                <small class="label label-danger"> ANULADO</small>
                            `;
                        }
                        else if(row.fl_estado == null)
                        {
                            html = `
                                <small class="label label-default"> REGISTRADO</small>
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
                { title: 'OBSERVACION', mData: 'observacion' },
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

    get_correlativo: async () => {

        await axios.get(BASE_API+'operacion/plan_atencion/get_correlativo')
        .then(function (response) {

            DOM.find('input[name="numero"]').val(response.data.numero);
            DOM.find('input[name="serie"]').val(response.data.serie);

        }).catch(error => {
            console.log(error);
        });

    },


    historial: function(row) {

        DOM.find('tbody[name="detalle-historial"]').html('');
        
        let data = HELPER.get_attr_json(row);
 
   /*      Componente.id_atencion = data.id; */

        DOM.find('span[name="paciente"]').text(data.paciente);
        DOM.find('span[name="historia_clinica"]').text(data.historia_clinica);

        axios.get(BASE_API + 'operacion/plan_atencion/historial?id_paciente='+data.id_paciente)
        .then(function (response) {

            let data = response.data;
           let  html ='';
                data.forEach(row => {
                    
                    html += `
                        <tr data-json='`+JSON.stringify(row)+`'>
                            <td style="width:100px; text-align:center; font-size:14px;">
                                <div>`+row.fecha+`</div>
                            </td>
                            <td>
                                <div>`+row.atencion+`</div> 
                                
                            </td>
                            <td  >
                            <div>`+row.personal+`</div> 
                            </td>
                            <td  >
                            <div>`+row.servicio+`</div> 
                            </td>
                            <td  >
                            <a class="dropdown-item" href="javascript:" name="row-print_historial" data-id="`+row.id+`"><i class="far fa-print"></i></a>
                            </td>
                        </tr>
                    `;
                });
                        
                    

            DOM.find('tbody[name="detalle-historial"]').html(html);
            DOM.find('div[name="modal-historial"]').modal('show');

        }).catch(error => {
            console.log(error);
        });

        
    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nueva Historia Clinica');

        /** DATA */
        HELPER.reset_form(form);

        form.find('input[name="fecha"]').val(HELPER.fecha_actual());
        
        this.get_correlativo();

        form.find('select[name="id_moneda"]').val(1).change();

        form.find('select[name="id_local"]').val(GLOBAL.usuario.id_local).change();

        this.id = null;
        this.action_submit = accion;
        DOM.find('tbody[name="detalle-patologia_clinica"]').html('');
        DOM.find('tbody[name="detalle-diagnostico_imagenes"]').html('');
        DOM.find('tbody[name="detalle-anatomia_patologica"]').html('');
        DOM.find('tbody[name="detalle-intervencion_quirurjica"]').html('');
        DOM.find('div[data-campo="fl_no_liquidacion_manifiesto"]').hide();
        DOM.find('tbody[name="detalle-receta"]').html('');
        DOM.find('tbody[name="detalle-cuenta_bancaria"]').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: async (row) => {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Historia Clinica');
        DOM.find('tbody[name="detalle-patologia_clinica"]').html('');
        DOM.find('tbody[name="detalle-diagnostico"]').html('');
        DOM.find('tbody[name="detalle-diagnostico_imagenes"]').html('');
        DOM.find('tbody[name="detalle-anatomia_patologica"]').html('');
        DOM.find('tbody[name="detalle-intervencion_quirurjica"]').html('');
        DOM.find('tbody[name="detalle-receta"]').html('');
       
        /** DATA */
        HELPER.reset_form(form);

        DOM.find('div[data-campo="fl_no_liquidacion_manifiesto"]').hide();

        let data = HELPER.get_attr_json(row);

        Componente.fl_auto_event = false;

        form.find('input[name="fecha"]').val(data.fecha);

        form.find('input[name="serie"]').val(data.serie);
        form.find('input[name="numero"]').val(data.numero);

        form.find('input[data-name="numero_atencion"]').val(data.atencion);
        form.find('input[data-name="paciente"]').val(data.paciente);
        form.find('input[data-name="especialista"]').val(data.personal);
        form.find('input[data-name="servicio"]').val(data.servicio);


        form.find('textarea[name="antecedente"]').val(data.antecedente);
        form.find('textarea[name="motivo"]').val(data.motivo);
        form.find('textarea[name="examen_fisico"]').val(data.examen_fisico);
        form.find('textarea[name="tratamiento"]').val(data.tratamiento);
        form.find('input[name="plan"]').val(data.plan);
        form.find('textarea[name="observacion"]').val(data.observacion);

        form.find('textarea[name="observacion_anatomia_patologica"]').val(data.observacion_anatomia_patologica);
        form.find('textarea[name="observacion_diagnostico_imagenes"]').val(data.observacion_diagnostico_imagenes);
        form.find('textarea[name="observacion_intervencion_quirurjica"]').val(data.observacion_intervencion_quirurjica);



        DOM.find('span[name="atencion"]').text(data.atencion);
        DOM.find('span[name="paciente"]').text(data.paciente);
        DOM.find('span[name="especialista"]').text(data.personal);
        DOM.find('span[name="servicio"]').text(data.servicio);
        DOM.find('span[name="presion_arterial"]').text(data.presion_arterial);
        DOM.find('span[name="temperatura"]').text(data.temperatura);
       
        DOM.find('span[name="frecuencia_respiratoria"]').text(data.frecuencia_respiratoria);
        DOM.find('span[name="frecuencia_cardiaca"]').text(data.frecuencia_cardiaca);
        DOM.find('span[name="peso"]').text(data.peso);
        DOM.find('span[name="talla"]').text(data.talla);
        DOM.find('span[name="saturacion"]').text(data.saturacion);
       
   
        data.diagnostico.forEach(row => {
            Componente.agregar_diagnostico(row);
        });
        data.tratamiento.forEach(row => {
            Componente.agregar_tratamiento(row);
        });

        data.receta.forEach(row => {
            Componente.agregar_receta(row);
        });
        data.patologia_clinica.forEach(row => {
            Componente.agregar_patologia_clinica(row);
        });




        data.diagnostico_config.forEach(row => {

            if (row.tipo == 'ANATOMIA PATOLOGICA') {
                Componente.agregar_anatomia_patologica(row);
            }
            
        });

        data.diagnostico_config.forEach(row => {

            if (row.tipo == 'DIAGNOSTICO POR IMAGENES') {
                Componente.agregar_diagnostico_imagenes(row);
            }
            
        });
        
        data.diagnostico_config.forEach(row => {

            if (row.tipo == 'INTERVENCION QUIRURGICA') {
                Componente.agregar_intervencion_quirurjica(row);
            }
            
        });
        
        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('tbody[name="historial"]').html('');
        axios.get(BASE_API + 'operacion/plan_atencion/historial?id_paciente='+data.id_paciente)
        .then(function (response) {

            let data = response.data;
           let  html ='';
                data.forEach(row => {
                    
                    html += `
                        <tr data-json='`+JSON.stringify(row)+`'>
                            <td style="width:100px; text-align:center; font-size:14px;">
                                <div>`+row.fecha+`</div>
                            </td>
                            <td><div>`+row.personal+`</div></td>
                            <td> <div>`+row.servicio+`</div> </td>
                            <td>`+row.diagnostico+`</td>
                            <td>`+row.receta+`</td>

                            <td>
                            <a class="dropdown-item" href="javascript:" name="row-print_historial" data-id="`+row.id+`"><i class="far fa-print"></i></a>
                            </td>
                        </tr>
                    `;
                });
                        
                    

            DOM.find('tbody[name="historial"]').html(html);
          

        }).catch(error => {
            console.log(error);
        });



        axios.get(BASE_API + 'operacion/plan_atencion/historial_vacunas?id_paciente='+data.id_paciente)
        .then(function (response) {

            let data = response.data;
           let  html ='';

    
                data.forEach(row => {
                    
                    let fecha = row.fecha;
                    let style_color = row.fecha != null? ' background-color: #a9e8f1;':'';

                    html += `
                        <tr>

                        <td style="display:none"><input type="number" data-name="id" class="form-control" value="`+row.id+`" /></td>
                            
                            <td style="${style_color }"><div>`+row.tipo+`</div></td>
                            <td style="${style_color }"> <div>`+row.nombre+`</div> </td>
                            <td style="${style_color }">`+row.dosis+`</td>
                            <td style="${style_color }"><input type="date" data-name="fecha" class="form-control" value="`+fecha+`" /></td>
                        </tr>
                    `;
                });
                        
                    

            DOM.find('tbody[name="historial_vacunas"]').html(html);
          

        }).catch(error => {
            console.log(error);
        });
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },


     
    enviar_email: function(row) {
 
        let accion = 'enviar_email';
        let form = DOM.find('form[name="'+accion+'"]');
        
        DOM.find('h4[name="'+accion+'"]').text('Enviar   a correo electrónico');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="name"]').val(data.atencion);
        form.find('input[name="email"]').val(data.email);

        this.id = data.id;
        this.action_submit = accion;

        
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    
    enviar_sms: function(row) {
 
        let accion = 'enviar_sms';
        let form = DOM.find('form[name="'+accion+'"]');
        
        DOM.find('h4[name="'+accion+'"]').text('Enviar   a este numero ');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="name"]').val(data.atencion);
        form.find('input[name="telefono"]').val(data.telefono);

        this.id = data.id;
        this.action_submit = accion;

        
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },



    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Anular Historia  Clinica');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.serie+'-'+data.numero);

        this.id_delete = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }

        formData.append('tipo', Componente.tipo);

        formData.append('detalle_diagnostico', JSON.stringify(Componente.diagnostico_json()));
        formData.append('detalle_tratamiento', JSON.stringify(Componente.tratamien_json()));
        formData.append('detalle_receta', JSON.stringify(Componente.receta_json()));
        formData.append('patologia_clinica', JSON.stringify(Componente.get_datajson_patologia_clinica()));

        formData.append('anatomia_patologica', JSON.stringify(Componente.get_datajson_anatomia_patologica()));
        formData.append('diagnostico_imagenes', JSON.stringify(Componente.get_datajson_diagnostico_imagenes()));
        formData.append('intervencion_quirurjica', JSON.stringify(Componente.get_datajson_intervencion_quirurjica()));

        formData.append('vacunas', JSON.stringify(Componente.get_datajson_vacunas()));


        if (this.id_atencion != null) { formData.append('id_atencion', this.id_atencion); }
        if (this.id_delete != null) { formData.append('id_delete', this.id_delete); }

        axios({
            method: 'post',
            url: BASE_API + 'operacion/plan_atencion/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');


            if (response.data.fl_enviar == 1) {

                   
                setTimeout(() => {
                    Componente.enviar_historial(response.data.id_plan_atencion);

           
                }, 1000);

            }else{

              
                HELPER.notificacion(response.data.mensaje, response.data.tipo);
           

            }



           

            if(Componente.action_submit == 'save')
            {
               // Imprimir_plan_atencion.print(response.data.id_plan_atencion);
            }
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    enviar_historial: (id) => {      
        axios.get(BASE_API+'operacion/plan_atencion/enviar_email_automatico/'+id)
        .then(function (response) {

            HELPER.notificacion(response.data.mensaje, response.data.tipo);
            
            
        }).catch(error => {

            Impresion_factura.print(id); 
            console.log(error);
        });
    },


    submit_enviar_email: function() {
         
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        formData.append('id', this.id);

        axios({
            method: 'post',
            url: BASE_API + 'operacion/plan_atencion/enviar_email',
            data: formData
        })
        .then(function(response) { 
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },


    submit_enviar_sms: function() {
         
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        formData.append('id', this.id);

        axios({
            method: 'post',
            url: BASE_API + 'operacion/plan_atencion/enviar_sms',
            data: formData
        })
        .then(function(response) { 
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },


} 

export default Componente;