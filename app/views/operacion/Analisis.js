
 
 let DOM, DOM_ID ;
 let Componente = {
     render: async (d, tipo = 'TRIAJE') => {
 
         let titulo = 'Analisis Clinico';
        
         $('#main').off();
         d.innerHTML = `
 
         <div id="main">
             <!-- Content Header (Page header) -->
             <section class="content-header">
                 <div class="row">
                     <div class="col-md-8 content-header" style="padding-top:5px;">
                         <h1 style="margin:0; ">
                             `+titulo+`
                             <small>Tesoreria</small>
                         </h1>
                     </div>
                     <div class="col-md-4" align="right">
                         
                     </div>
                 </div>
                 </section>
 
                 <!-- Main content -->
                 <section class="content">
 
                 <!-- Default box -->
                 <div class="box box-info">
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
                       
                       <div class="col-md-4">
                            <div class="form-group">
                                <label>Tipo <small> </small></label>
                                <div class="form-group">
                                <select name="id_tipo_filtro" data-select="hg" class="form-control select">
                                <option value="PENDIENTE">PENDIENTE </option>
                                <option value="FINALIZADO"> FINALIZADO</option>
                                </select>
                                </div>                              
                            </div>
                        </div>

 
                       <div class="col-md-1" style="padding-top:19px;">
                         <button class="btn btn-info" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>
                       </div>
                     </div>
                   </div>
                 </div>
                 <!-- /.box -->
 
                 <!-- Default box -->
                 <div class="box box-info">
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
                 <div class="modal-dialog modal-sm">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                             <h4 name="save" class="modal-title">Modal title</h4>
                         </div>
                         <form name="save">
                             <div class="modal-body">
                                 <div class="row"> 
                                     <div class="col-md-12">
                                         <div class="form-group">
                                             <label>Resultado </label>
                                             <input type="text" step="any" data-name="numerico" name="resultado" class="form-control" autocomplete="off"  >
                                         </div>
                                     </div>

                                     <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar esta accion</label>
                                        <p style="color:red;">Esta acción no se podrá revertir</p>
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

             <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-color">
            

             <!-- MODAL SAVE dengue-->
             <div class="modal inmodal fade" name="modal-save_dengue" data-backdrop="static"  role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-sm">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                             <h4 name="save_dengue" class="modal-title">Modal title</h4>
                         </div>
                         <form name="save_dengue">
                             <div class="modal-body">
                                 <div class="row"> 

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Tipo Muestra <span class="text-red"> </span></label>
                                            <div class="form-group">
                                            <input type="text" name="muestra"  class="form-control" list="list-muestra">
                                            <datalist id="list-muestra">
                                                <option value="SUERO"/>
                                            </datalist> 
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12" name="dengue_igg" >
                                        <div class="form-group">
                                            <label>Dengue IgG   <small>(*)</small></label>
                                            <select name="dengue_igg" class="form-control select" >
                                            <option value="Positivo">Positivo</option>
                                            <option value="Negativo">Negativo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="dengue_igm">
                                        <div class="form-group">
                                            <label>Dengue IgM  <small>(*)</small></label>
                                            <select name="dengue_igm" class="form-control select" >
                                            <option value="Positivo">Positivo</option>
                                            <option value="Negativo">Negativo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="dengue_ns1" >
                                        <div class="form-group">
                                            <label>Dengue NS1  <small>(*)</small></label>
                                            <select name="dengue_ns1" class="form-control select" >
                                            <option value="Positivo">Positivo</option>
                                            <option value="Negativo">Negativo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="cualitativo">
                                        <div class="form-group">
                                            <label>Cualitativo <small>(*)</small></label>
                                            <select name="cualitativo" class="form-control select" >
                                            <option value="Positivo">Positivo</option>
                                            <option value="Negativo">Negativo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="cuantitativo">
                                        <div class="form-group">
                                            <label>Cuantitativo <small>(*)</small></label>
                                            <input type="text" name="cuantitativo"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="grupo">
                                        <div class="form-group">
                                            <label>Grupo <small>(*)</small></label>
                                            <input type="text" name="grupo"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="rh">
                                        <div class="form-group">
                                            <label>RH <small>(*)</small></label>
                                            <input type="text" name="rh"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="tifico_o">
                                        <div class="form-group">
                                            <label>Tifico  O <small>(*)</small></label>
                                            <input type="text" name="tifico_o"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="tifico_h">
                                        <div class="form-group">
                                            <label>Tifico  H  <small>(*)</small></label>
                                            <input type="text" name="tifico_h"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="paratifico_a">
                                        <div class="form-group">
                                            <label>Paratifico  A  <small>(*)</small></label>
                                            <input type="text" name="paratifico_a"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12" name="paratifico_b">
                                        <div class="form-group">
                                            <label>Paratifico  B  <small>(*)</small></label>
                                            <input type="text" name="paratifico_b"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-12" name="brucelas">
                                        <div class="form-group">
                                            <label>Brucelas <small>(*)</small></label>
                                            <input type="text" name="brucelas"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>


                                    


                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Comentario</label>
                                            <textarea name="comentario" class="form-control" autocomplete="off"></textarea>    
                                        </div>
                                    </div>
                                     <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar esta accion</label>
                                        <p style="color:red;">Esta acción no se podrá revertir</p>
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



             <!-- MODAL SAVE dengue-->
             <div class="modal inmodal fade" name="modal-save_parasito" data-backdrop="static"  role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-sm">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                             <h4 name="save_parasito" class="modal-title">Modal title</h4>
                         </div>
                         <form name="save_parasito">
                             <div class="modal-body">
                                 <div class="row"> 

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Tipo Muestra <span class="text-red"> </span></label>
                                            <div class="form-group">
                                            <input type="text" name="muestra"  class="form-control" list="list-muestra">
                                            <datalist id="list-muestra">
                                                <option value="SUERO"/>
                                            </datalist> 
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>COLOR <small>(*)</small></label>
                                            <input type="text" name="color"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                
                                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Aspecto <small>(*)</small></label>
                                            <input type="text" name="aspecto"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Consistencia <small>(*)</small></label>
                                            <input type="text" name="consistencia"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Moco visible <small>(*)</small></label>
                                            <input type="text" name="moco_visible"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Sangre visible <small>(*)</small></label>
                                            <input type="text" name="sangre_visible"  class="form-control" >
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Comentario</label>
                                            <textarea name="comentario" class="form-control" autocomplete="off"></textarea>    
                                        </div>
                                    </div>

                                     <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar esta accion</label>
                                        <p style="color:red;">Esta acción no se podrá revertir</p>
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


 
             
             <!-- MODAL SAVE inmonologia-->
             <div class="modal inmodal fade" name="modal-save_inmunologia" data-backdrop="static"  role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-sm">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                             <h4 name="save_inmunologia" class="modal-title">Modal title</h4>
                         </div>
                         <form name="save_inmunologia">
                             <div class="modal-body">
                                 <div class="row"> 

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Tipo Muestra <span class="text-red"> </span></label>
                                            <div class="form-group">
                                            <input type="text" name="muestra"  class="form-control" list="list-muestra">
                                            <datalist id="list-muestra">
                                                <option value="SUERO"/>
                                            </datalist> 
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Resultado <small>(*)</small></label>
                                            <select name="beta_cualitativo" class="form-control select" >
                                            <option value="Positivo">Positivo</option>
                                            <option value="Negativo">Negativo</option>
                                            </select>
                                        </div>
                                    </div>
                                   
                                  
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Comentario</label>
                                            <textarea name="comentario" class="form-control" autocomplete="off"></textarea>    
                                        </div>
                                    </div>
                                     <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar esta accion</label>
                                        <p style="color:red;">Esta acción no se podrá revertir</p>
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
 
 
             <div class="modal inmodal fade" name="modal-analisis" data-backdrop="static"  role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-lg">
                 <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                             <h4 class="modal-title">Lista de Analisis</h4>
                         </div>
                           
                         <div class="modal-body">
                            <div class="col-md-12" align="right">
                                <button type="button" class="btn btn-sm btn-primary" name="imprimir"><i class="fa fa-print"></i> Imprimir</button>
                            </div>
                             <table class="table table-striped">

                                 <thead>
                                     <tr>
                                        <th>Cantidad</th>
                                         <th>Nombre</th>
                                         <th>Precio</th>
                                         
                                     </tr>
                                 </thead>
                                 <tbody name="detalle-analisis"></tbody>
                             </table>
                         </div>
                     </div>
                 </div>
             </div>



             
             <!-- MODAL INICIO   -->
             <div class="modal inmodal fade" name="modal-inicio_atencion" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-sm">
                     <div class="modal-content">
                         <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                             <h4 name="inicio_atencion" style="color:#0a7655;" class="modal-title">Modal title</h4>
                         </div>
                         <form name="inicio_atencion">
                             <div class="modal-body">
                                 <div class="row">
                                     <div class="col-md-12" align="center" style="margin-bottom:10px;">
                                         <i class="fa fa-play fa-4x" style="color:#0da779;"></i><br/>
                                     </div>
 
                                     <div class="col-md-12">
                                         <div class="form-group">
                                             <label>Fecha <span class="text-red">(*)</span></label>
                                             <input type="date" name="fecha_inicio_atencion" class="form-control" autocomplete="off" required>        
                                         </div>
                                     </div>
                                     <div class="col-md-12">
                                         <div class="form-group">
                                             <label>Hora inicio <span class="text-red"> </span></label>
                                             <input type="time" name="hora_inicio_atencion" class="form-control" autocomplete="off" required>        
                                         </div>
                                     </div>
                                    
                                     <div class="col-md-12"  align="center" style="padding-top:10px;">
                                         <label><input type="checkbox" name="confirmacion" required/>
                                             Confirmo realizar esta operación</label>
                                         <p style="color:#e17100;">Esta acción no se podrá revertir</p>
                                     </div>
                                     <div class="col-md-12" name="texto" align="center">
 
                                     </div>
                                 </div>
                             </div>                            
                             <div class="modal-footer" align="center">
                                 <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cancelar</button>
                                 <button type="submit" name="submit" class="btn btn-success">Iniciar Ahora!</button>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>

            <!-- MODAL FIN   -->
            <div class="modal inmodal fade" name="modal-fin_atencion" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="fin_atencion" style="color:#1a6795;" class="modal-title">Modal title</h4>
                        </div>
                        <form name="fin_atencion">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12" align="center" style="margin-bottom:10px;">
                                        <i class="fa fa-flag fa-4x" style="color:#228ac7;"></i><br/>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Fecha <span class="text-red">(*)</span></label>
                                            <input type="date" name="fecha_fin_atencion" class="form-control" autocomplete="off" required>        
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Hora Fin <span class="text-red"> </span></label>
                                            <input type="time" name="hora_fin_atencion" class="form-control" autocomplete="off" required>        
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Comentario</label>
                                            <textarea name="comentario" class="form-control" autocomplete="off"></textarea>    
                                        </div>
                                    </div>
 
                                    <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar esta operación</label>
                                        <p style="color:#e17100;">Esta acción no se podrá revertir</p>
                                    </div>
                                    <div class="col-md-12" name="texto" align="center">

                                    </div>
                                </div>
                            </div>                            
                            <div class="modal-footer" align="center">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cancelar</button>
                                <button type="submit" name="submit" class="btn btn-primary">Finalizar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- SAVE EMATOGRAMA -->


            <div class="modal inmodal fade" name="modal-save_ematograma" data-backdrop="static"  role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 name="save_ematograma" class="modal-title">Modal title</h4>
                    </div>
                    <form name="save_ematograma">
                        <div class="modal-body">
                            <div class="row"> 
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Tipo Muestra <span class="text-red"> </span></label>
                                    <div class="form-group">
                                    <input type="text" name="muestra"  class="form-control" list="list-muestra">
                                    <datalist id="list-muestra">
                                        <option value="SUERO"/>
                                    </datalist> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Comentario</label>
                                    <textarea name="comentario" class="form-control" autocomplete="off"></textarea>    
                                </div>
                            </div>
                                <div class="col-md-12">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>EXAMEN</th>
                                                <th>RESULTADO</th>
                                              
                                            </tr>
                                        </thead>
                                        <tbody name="detalle">
                                           
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                              
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>


                                <div class="col-md-12"  align="center" style="padding-top:10px;">
                                   <label><input type="checkbox" name="confirmacion" required/>
                                       Confirmo realizar esta accion</label>
                                   <p style="color:red;">Esta acción no se podrá revertir</p>
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


        
        <!-- SAVE ORINA -->


        <div class="modal inmodal fade" name="modal-save_orina" data-backdrop="static"  role="dialog" aria-hidden="true">
        <div class="modal-dialog  modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 name="save_orina" class="modal-title">Modal title</h4>
                </div>
                <form name="save_orina">
                    <div class="modal-body">
                        <div class="row"> 
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Tipo Muestra <span class="text-red"> </span></label>
                                <div class="form-group">
                                <input type="text" name="muestra"  class="form-control" list="list-muestra1">
                                <datalist id="list-muestra1">
                                    <option value="ORINA"/>
                                </datalist> 
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Comentario</label>
                                <textarea name="comentario" class="form-control" autocomplete="off"></textarea>    
                            </div>
                        </div>

                   
                        <div class="col-md-12" >
                            <table class="table" > 
                                <tr>
                                    <th colspan="2">
                                        CARACTERÍSTICAS MACROSCÓPICAS
                                    </th>
                                </tr>
                                <tbody name="caracteristicas" >
                                    <tr data-name="Color" style="padding: 1px !important;">
                                        <th style="padding: 1px !important;"> Color </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-color">
                                        <datalist id="list-color">
                                            <option value="Amarillo"/>
                                        </datalist>  
                                        </td>
                                    </tr>
                                    <tr data-name="Aspecto"  >
                                        <th style="padding: 1px !important;"> Aspecto </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-aspecto">
                                        <datalist id="list-aspecto">
                                            <option value="Turbio"/>
                                        </datalist>  
                                        </td>
                                    </tr>
                                    <tr data-name="Densidad"  >
                                        <th style="padding: 1px !important;"> Densidad </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  >
                                       
                                        </td>
                                    </tr>
                                    <tr data-name="PH"  >
                                        <th style="padding: 1px !important;"> PH </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  >
                                       
                                        </td>
                                    </tr>
                                </tbody>
                                 
                                <tr>
                                    <th colspan="2">
                                        ANALISIS BIOQUIMICO
                                    </th>
                                </tr>
                                <tbody name="bioquimico">
                                    <tr data-name="Leucocitos">
                                        <th style="padding: 1px !important;"> Leucocitos </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-Leucocitos">
                                        <datalist id="list-Leucocitos">
                                            <option value="Negativo"/>
                                            <option value="Positivo"/>
                                        </datalist>  
                                        </td>
                                    </tr>
                                    <tr data-name="Sangre">
                                        <th style="padding: 1px !important;"> Sangre  </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-sangre">
                                        <datalist id="list-sangre">
                                            <option value="Negativo"/>
                                            <option value="Positivo"/>
                                        </datalist>  
                                        </td>
                                    </tr>
                                    <tr data-name="Urobilinógeno">
                                        <th style="padding: 1px !important;"> Urobilinógeno  </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-sangre">
                                          
                                        </td>
                                    </tr>
                                    <tr data-name="Bilirrubinas">
                                        <th style="padding: 1px !important;"> Bilirrubinas  </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-sangre">
                                          
                                        </td>
                                    </tr>
                                    <tr data-name="Proteinas">
                                        <th style="padding: 1px !important;"> Proteinas  </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-sangre">
                                          
                                        </td>
                                    </tr>
                                    <tr data-name="Nitritos">
                                        <th style="padding: 1px !important;"> Nitritos  </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-sangre">
                                          
                                        </td>
                                    </tr>
                                    <tr data-name="Cetonas">
                                        <th style="padding: 1px !important;"> Cetonas  </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-sangre">
                                          
                                        </td>
                                    </tr>

                                    <tr data-name="Glucosa">
                                        <th style="padding: 1px !important;"> Glucosa  </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-sangre">
                                          
                                        </td>
                                    </tr>
                                    <tr data-name="Ac. Ascórbico">
                                        <th style="padding: 1px !important;"> Ac. Ascórbico  </th>
                                        <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-sangre">
                                          
                                        </td>
                                    </tr>
                                </tbody>

                                <tr>
                                <th colspan="2">
                                SEDIMENTO URINARIO
                                </th>
                            </tr>
                                <tbody name="urinario">
                                <tr data-name="Cél. Epiteliales">
                                    <th style="padding: 1px !important;"> Cél. Epiteliales </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  >
                                    
                                    </td>
                                </tr>
                                <tr data-name="Leucocitos">
                                    <th style="padding: 1px !important;"> Leucocitos  </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control" list="list-tipo" >
                                    <datalist id="list-tipo">
                                        <option value="0 – 1  x campo"/>
                                        <option value="No se observa"/>
                                    </datalist>  
                                    </td>
                                </tr>
                                <tr data-name="Hematìes">
                                    <th style="padding: 1px !important;"> Hematìes  </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  list="list-tipo"  >
                                     
                                    </td>
                                </tr>
                                <tr data-name="Bacterias">
                                    <th style="padding: 1px !important;"> Bacterias  </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  list="list-tipo"  >
                                     
                                    </td>
                                </tr>

                                <tr data-name="Cilindros">
                                    <th style="padding: 1px !important;"> Cilindros  </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  list="list-tipo"  >
                                     
                                    </td>
                                </tr>

                                <tr data-name="Cristales">
                                    <th style="padding: 1px !important;"> Cristales  </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  list="list-tipo"  >
                                     
                                    </td>
                                </tr>
                                <tr data-name="levaduras">
                                    <th style="padding: 1px !important;"> levaduras  </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  list="list-tipo"  >
                                     
                                    </td>
                                </tr>
                                <tr data-name="Hifas">
                                    <th style="padding: 1px !important;"> Hifas  </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  list="list-tipo"  >
                                     
                                    </td>
                                </tr>
                                <tr data-name="Filamento mucoide">
                                    <th style="padding: 1px !important;"> Filamento mucoide  </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  list="list-tipo"  >
                                     
                                    </td>
                                </tr>
                                <tr data-name="Piocitos">
                                    <th style="padding: 1px !important;"> Piocitos  </th>
                                    <td style="padding: 1px !important;"> <input type="text" name="examen"  class="form-control"  list="list-tipo"  >
                                     
                                    </td>
                                </tr>

                            </tbody>

                            </table>

                            
                        </div>


               
                            <div class="col-md-12"  align="center" style="padding-top:10px;">
                               <label><input type="checkbox" name="confirmacion" required/>
                                   Confirmo realizar esta accion</label>
                               <p style="color:red;">Esta acción no se podrá revertir</p>
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


    <div class="modal inmodal fade" name="modal-firma" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4  class="modal-title"><i class="fa fa-check-circle" style="color:#19C467;"></i> impresión!</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-6">
                                    <button name="confirma"class="btn btn-primary" style="width:100%; margin-bottom:5px;"><i class="fa fa-print"></i> CON FIRMA</button>
                                </div>
                                <div class="col-md-6">
                                    <button name="sinfirma" class="btn btn-secondary" style="width:100%; margin-bottom:5px;"><i class="fa fa-print"></i>  SIN FIRMA</button>
                                </div>
                            </div> 
                        </div>                                                               
                    </div>
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
                 presion_arterial: {required: true},
                 temperatura: {required: true},
                 frecuencia_respiratoria: {required: true},
                 frecuencia_cardiaca: {required: true},
                 saturacion: {required: true},
                 peso: {required: true},
                 talla: {required: true},
             },
           
             messages: {
                 fecha: 'Fecha',
                 presion_arterial: 'Presión arterial',
                 temperatura: 'Temeratura',
                 frecuencia_respiratoria: 'Frecuencia respiratoria',
                 frecuencia_cardiaca: 'Frecuencia cardiaca',
                 saturacion: 'Saturación',
                 peso: 'Peso',
                 talla: 'Talla',
             },
 
             submitHandler: function() {
                 Componente.submit();
             }
           
         });
      
          DOM.find('form[name="inicio_atencion"]').validate({
            submitHandler: function() {
                Componente.submit_operacion_atencion();
            }
        });

        DOM.find('form[name="save_ematograma"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });
        DOM.find('form[name="save_orina"]').validate({
            submitHandler: function() {
                Componente.submit_orina();
            }
        });
        DOM.find('form[name="save_dengue"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        DOM.find('form[name="save_inmunologia"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        DOM.find('form[name="save_parasito"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        DOM.find('form[name="fin_atencion"]').validate({
            submitHandler: function() {
                Componente.submit_operacion_atencion();
            }
        });

         /* DATATABLE UPDATE*/
         DOM.on('click', 'button[name="update_datatable"]', function(e) {
             e.stopImmediatePropagation();
             Componente.table.ajax.reload(null, false);
         });

         DOM.on('keyup', 'input[data-name="numerico"]', function(e) {
            e.stopImmediatePropagation();
            let num = DOM.find('input[data-name="numerico"').val();

            // skip for arrow keys
            if(e.which >= 37 && e.which <= 40){
                e.preventDefault();
            }

            $(this).val(function(index, value) {
                return value
                .replace(/\D/g, "")
                .replace(/([0-9])([0-9]{2})$/, '$1.$2')  
                .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")
                ;
            });
        });
        DOM.on('keyup', 'input[data-name="resultado"]', function(e) {
            e.stopImmediatePropagation();
             let num = DOM.find('input[data-name="resultado"').val();

             let nume_new = HELPER.separador_miles(num);

            /*  DOM.find('input[data-name="resultado"').val(nume_new); */
        });
         DOM.on('click', 'a[name="icono"]', function(e) {
            e.stopImmediatePropagation();

             
            Componente.vista_eye($(this).data('id'));
        });
         DOM.on('change', 'select[name="id_tipo_filtro"]', function(e) {
            e.stopImmediatePropagation();
            Componente.table.ajax.reload(null, false);
        });

         DOM.on('click', 'button[name="imprimir"]', function(e) {
            e.stopImmediatePropagation();
            Componente.print(Componente.id_atencion);
        });

      
        DOM.on('click', 'button[name="inicio_atencion"]', function(e) {
            e.stopImmediatePropagation();
            Componente.inicio_atencion($(this));
        });

 
        DOM.on('click', 'button[name="fin_atencion"]', function(e) {
            e.stopImmediatePropagation();
            Componente.fin_atencion($(this));
        });
         /** SUBMIT DELETE */
         DOM.find('form[name="delete"]').validate({
             submitHandler: function() {
                 Componente.submit();
             }
         });
 
         /* EDITAR */
         DOM.on('click', 'a[name="row-edit"]', function(e) {
             e.stopImmediatePropagation();
             Componente.edit($(this));
         });
 
         DOM.on('click', 'button[name="row-resultado"]', function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));

            console.log(data);
            if (data.tipo_examen == 'HEMOGRAMA' || data.tipo_examen =='GRUPO EXAMEN') {
                
                Componente.new_ematograma($(this));

            }
            else if (data.tipo_examen == 'EXAMEN DE ORINA') {
                
                Componente.new_orina($(this));

            }
            else if (data.tipo_examen == 'INMUNOSEROLOGÍA') {
                
                Componente.new_dengue($(this));

            }
            else if (data.tipo_examen == 'INMUNOLOGÍA') {
                
                Componente.new_inmunologia($(this));

            }

            else if (data.tipo_examen == 'PARASITOLOGÍA') {
                
                Componente.new_parasito($(this));

            }

            else{

                Componente.new($(this));
            }
          
        });

         
 
 
         /* ELIMINAR */
         DOM.on('click', 'a[name="row-delete"]', function(e) {
             e.stopImmediatePropagation();
             Componente.delete($(this));
          //  
         });
         DOM.on('change', 'select[name="id_servicio"]', function(e) {
             e.stopImmediatePropagation();
             Componente.select_tarifa();
          
         });
 
         DOM.on('change', 'select[name="id_tipo"]', function(e) {
             e.stopImmediatePropagation();
 
             Componente.table.ajax.reload(null, false);     
          
         });
 
         /* PRINT */
         DOM.on('click', 'button[name="row-print"]', function(e) {
             e.stopImmediatePropagation();
 
             let data = HELPER.get_attr_json($(this));

             Componente.ver_analisis($(this));
 
         });
         DOM.on('click', 'button[name="row-print_examen"]', function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));

       /*      Componente.print_analisis(data.id); */
  
 
            Componente.tipoImprecion = 'GENERAL';
            Componente.imprecionid1 = data.id;

   

            DOM.find('div[name="modal-firma"]').modal('show');

        });



        DOM.on('click', 'button[name="row-print_linea"]', function(e) {
            e.stopImmediatePropagation();

            let data = HELPER.get_attr_json($(this));

            Componente.tipoImprecion = data.tipo_examen;
            Componente.imprecionid1 = $(this).data('id');
            Componente.imprecionid2 = data.id;

            DOM.find('div[name="modal-firma"]').modal('show');
          /*   if (data.tipo_examen == 'HEMOGRAMA' || data.tipo_examen =='GRUPO EXAMEN' ) {
                
                Componente.print_emograma($(this).data('id'),data.id);

            }
            else if (data.tipo_examen == 'EXAMEN DE ORINA') {
                
                Componente.print_orina($(this).data('id'),data.id);

            }
           
            else if (data.tipo_examen == 'INMUNOSEROLOGÍA') {
                
                Componente.print_dengue($(this).data('id'),data.id);

            }
            else if (data.tipo_examen == 'INMUNOLOGÍA') {
                
                Componente.print_inmunologia($(this).data('id'),data.id);

            }
            else if (data.tipo_examen == 'PARASITOLOGÍA') {
                
                Componente.print_parasito($(this).data('id'),data.id);

            }

            else
            {

                Componente.print_analisis($(this).data('id'),data.id);
            } */
           

        });

        DOM.on('click', 'button[name="confirma"]', function(e) {
            e.stopImmediatePropagation();

             Componente.imprecionFirma('CONFIRMA');
        });

        DOM.on('click', 'button[name="sinfirma"]', function(e) {
            e.stopImmediatePropagation();
            Componente.imprecionFirma('SINFIRMA');
        });


         DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
         DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
      

         Componente.tipo = tipo;
         Componente.select_paciente();
         Componente.select_personal();
         Componente.select_servicio();
         Componente.datatable();
         DOM.find('select[name="id_tipo_filtro"]').val('PENDIENTE').change();
 
         HELPER.load_component();
     },
 
     /**** DATA */
     id_atencion: null,
     action_submit: null,
     imagen_anterior: null,
     fl_auto_event: true,
     tipo: null,
     id_delete:null,
     tipoImprecion:'',
     imprecionid1:null,
     imprecionid2:null,
     /************ */

     imprecionFirma: async (firma) => {

        DOM.find('div[name="modal-firma"]').modal('hide');

                if (Componente.tipoImprecion== 'GENERAL') {

                    Componente.print_analisis(Componente.imprecionid1,0,firma);
                }
                else
                {

                    if (Componente.tipoImprecion == 'HEMOGRAMA' || Componente.tipoImprecion =='GRUPO EXAMEN' ) {
                
                        Componente.print_emograma(Componente.imprecionid1, Componente.imprecionid2,firma);
        
                    }
                    else if (Componente.tipoImprecion == 'EXAMEN DE ORINA') {
                        
                        Componente.print_orina(Componente.imprecionid1, Componente.imprecionid2,firma);
        
                    }
                   
                    else if (Componente.tipoImprecion == 'INMUNOSEROLOGÍA') {
                        
                        Componente.print_dengue(Componente.imprecionid1, Componente.imprecionid2,firma);
        
                    }
                    else if (Componente.tipoImprecion == 'INMUNOLOGÍA') {
                        
                        Componente.print_inmunologia(Componente.imprecionid1, Componente.imprecionid2,firma);
        
                    }
                    else if (Componente.tipoImprecion == 'PARASITOLOGÍA') {
                        
                        Componente.print_parasito(Componente.imprecionid1 ,Componente.imprecionid2,firma);
        
                    }
        
                    else
                    {
        
                        Componente.print_analisis(Componente.imprecionid1, Componente.imprecionid2,firma);
                    }

                }
        
              
               

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
 
     select_personal: function()
     {
         let select = DOM.find('select[data-select="PERSONAL"]');
         select.append($('<option></option>').attr('value', '').text('Seleccione...'));
         axios.get(BASE_API+'configuracion/personal/get_select')
         .then(function (response) {
             response.data.forEach(row => {
                 select.append('<option value="'+row.id+'">'+row.text+'</option>');
             });
             select.select2();   
         }).catch(error => {
             console.log(error);
         }); 
     },
 
     select_servicio: async (id_servicio_nuevo = null) =>
     {
         let select = DOM.find('select[data-select="SERVICIO"]');
         select.empty();
         select.append($('<option></option>').attr('value', '').text('Seleccione...'));
         
         await axios.get(BASE_API+'configuracion/tipo_servicio/get_select')
         .then(async function (response) {
             response.data.forEach(row => {
                 select.append('<option value="'+row.id+'">'+row.text+'</option>');
             });
 
             select.select2();
 
             if(id_servicio_nuevo != null)
             {
                 select.val(id_servicio_nuevo).change();
                 Componente.id_servicio_nuevo = id_servicio_nuevo;
             }
 
         }).catch(error => {
             console.log(error);
         }); 
     },
 
     select_tarifa: function()
     {
         let select = DOM.find('select[data-select="TARIFA"]');
         let id_servicio = DOM.find('select[name="id_servicio"]').val();
  
         axios.get(BASE_API+'configuracion/tarifa/get_select?id_servicio='+id_servicio)
         .then(function (response) {
             response.data.forEach(row => {
                 select.append('<option value="'+row.id+'">'+row.text+'</option>');
             });
             select.select2();   
         }).catch(error => {
             console.log(error);
         }); 
     },
 
     vista_eye: async (id) =>  
     {
        
      let value =   DOM.find('i[data-name="'+id+'"]').attr('class');

      console.log(value);

      if (value == 'far fa-eye') {

        DOM.find('i[data-name="'+id+'"]').removeClass('far fa-eye').addClass('fa fa-eye-slash');
        DOM.find('table[data-name="'+id+'"]').hide();
      }

      else
      {
        DOM.find('table[data-name="'+id+'"]').show();
        DOM.find('i[data-name="'+id+'"]').removeClass('fa fa-eye-slash').addClass('far fa-eye');
      }
       

        

     },


     datatable: function() {
 
         this.table = DOM.find('table[name="registros"]').DataTable({
             ajax:   {
                     url: BASE_API + 'operacion/analisis',
                     data: function (d) {
                         d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                         d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                         d.tipo_filtro = DOM.find('select[name="id_tipo_filtro"]').val();
                     }
             },
 
             columns: [
                {
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
    
                        let option = ` <button type="button" class="btn btn-default btn-sm" data-id="`+row.id+`" name="row-print"><i class="fa fa-print"></i></button> `;
    
                        if (row.fl_estado == 1) {
                             
                            if (row.estado != 'FINALIZADO') {
                                
                                option += `

                                
                                   
                                `;
    
    
                            }
                            
                        }
    
    
                        let html = `
                             
    
                            <div class="btn-group" style="width:180px;">
                            
                             <!--    <button type="button" class="btn btn-default btn-sm" data-id="`+row.id+`" name="row-print"><i class="fa fa-ticket"></i></button>  -->
                             `+option+`
                             <button type="button" class="btn btn-default btn-sm" data-id="`+row.id+`" name="row-print_examen"><i class="fa fa-print"></i> Imprimir</button>
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-left" role="menu">
                                    <li><a class="dropdown-item" name="row-edit" href="javascript:"><i class="far fa-pencil"></i> Editar</a></li>
                                    `;
                                    if (row.estado == 'REGISTRADO') {
                                        
                                        html += `
                                        <li><a class="dropdown-item" name="row-anular" href="javascript:"><i class="far fa-trash-alt"></i> Anular</a></li>
        
                                        `;
                                    }
                                   
                                    html += `
                                </ul>
                            </div>
    
                        `;
    
                        return html;
                    },
                    width: '100px',
                },
                 { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                 { title: '# ATENCIÓN', mData: 'atencion' }, 
              
                 {
                    title: 'OPERACIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {

                        let html = '';

                        if(row.estado != 'FINALIZADO')
                        {
                            if(row.estado == 'REGISTRADO' || row.estado == null)
                            {
                                let mostrar =  true;
                               

                                if(mostrar == true)
                                {
                                    html = `<button type="button" name="inicio_atencion" class="btn btn-success btn-sm"><i class="fa fa-play"></i> ATENDER</button>`;
                                }
                                
                            }
                            else if(row.estado == 'ATENDIENDO')
                            {
                              
                                    let mostrar = true;
                                   

                                    if(mostrar == true)
                                    {
                                        html = `<button type="button" name="fin_atencion" class="btn btn-primary btn-sm"><i class="fa fa-flag"></i> FINALIZAR</button>`;
                                    }
                                    
                                
                                
                            }
                          
                        }

                        return html;
                    },
                    width: '100px',
                },

                 { title: 'PERSONAL MEDICO', mData: 'personal' },
                 { title: 'PACIENTE', mData: 'paciente' },
                 
                  

                 { title: 'ESTADO', defaultContent: ``,                    
                     render: function(data, type, row) {
                         
                      let  html = `
                        <small class="label label-default"> REGISTRADO</small>
                    `;
 
                       
                        if(row.estado == 'ATENDIENDO')
                         {
                             html = `
                                 <small class="label label-success"> ATENDIENDO</small>
                             `;
                         }
                         else if(row.estado == 'FINALIZADO')
                         {
                             html = `
                                 <small class="label label-success"> FINALIZADO</small>
                             `;
                         }
 
                         if(row.fl_estado == 0)
                         {
                             html = `
                                 <small class="label label-danger"> ANULADO</small>
                             `;
                         }
                         return html;
                     }
                 },

                 { title: 'VISTA', defaultContent: ``,                    
                 render: function(data, type, row) {
                     
                 let  html = `
                     <a name="icono"  data-id="`+row.id+`"style="text-align:center;padding-left: 50%;font-size: 20px;color: #21c7ed;" class="dropdown-item"   href="javascript:"><i data-name="`+row.id+`"  class="fa fa-eye-slash"></i> </a>
                 `;

                 return html;
                  
                 }
             },
                 
             { title: 'EXAMENES  ', render: function(data, type, row)
             {
                 let html = '';

                 if (row.estado == 'ATENDIENDO' || row.estado == 'FINALIZADO') {

                    let table_name = '';
                    let style = '';

                    if (row.estado == 'ATENDIENDO') {
                    
                        table_name = 'detalle_examen_atendiendo';
                    }
                    else
                    {
                        style = 'display:none';
                        table_name = 'detalle_examen_final';
                    }


                    html = `<table name="`+table_name+`" data-name="`+row.id+`"  class="table tbl-detalle_orden" style="width:100%;margin-top: 0px;margin-bottom: 0px;`+style+`">
                        
                    <thead>
                        
                        <tr>
                            <th style="width:10%">CANT</th>
                            <th style="width:50%">NOMBRE</th>
                            <th style="width:20%">UM</th>
                            <th style="width:10%">RESULTADO</th>
                            <th style="width:10%"></th>
                        </tr>
                        </thead>
                        <tbody>
                    `;
            
                    row.servicio.forEach(row1 => {

                   

                        html += `
                            <tr data-json='`+JSON.stringify(row1)+`'>
                            
                                <td style="padding:2px ;">`+row1.cantidad+`</td>
                                <td style="padding:2px ;">`+row1.servicio+`</td>
                                <td  style="padding:2px ;">`+row1.unidad_medida+`</td>
                                <td  style="padding:2px ;">`+row1.resultado+`</td>
                                <td  style="padding:2px ;">
                                `;
                                if (row.estado == 'ATENDIENDO') {

                                    html += `
                                    <button type="button" class="btn btn-success btn-sm" data-id="`+row1.id+`" name="row-resultado"><i class="far fa-pencil"></i> </button> 


                                    `; 

                                }

                       
                                        if (row1.resultado != null) {
                                            
                                            html += `
                                            <button type="button" class="btn btn-primary btn-sm" data-id="`+row.id+`" name="row-print_linea"><i class="fa fa-print"></i> </button> 
        
        
                                            `; 
                                        }

                                html += `
                                </td>
                            </tr>
                        `;
                    });
            
                    html += '</tbody></table>';
                 }
                

                 return html;
             }
         },
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
 
         await axios.get(BASE_API+'operacion/triaje/get_correlativo')
         .then(function (response) {
 
             DOM.find('input[name="numero"]').val(response.data.numero);
             DOM.find('input[name="serie"]').val(response.data.serie);
 
         }).catch(error => {
             console.log(error);
         });
 
     },
 
     
     
    ver_analisis: function(row) {

        DOM.find('tbody[name="detalle-analisis"]').html('');
        
        let data = HELPER.get_attr_json(row);
 
        Componente.id_atencion = data.id;

        axios.get(BASE_API + 'operacion/analisis/get_analisis?id_atencion='+data.id)
        .then(function (response) {

            let data = response.data;
           let  html ='';
                data.forEach(row => {
                    
                    html += `
                        <tr>
                            <td style="width:100px; text-align:center; font-size:14px;">
                                <div>`+row.cantidad+`</div>
                            </td>
                            <td>
                                <div>`+row.servicio+`</div> 
                                
                            </td>
                            <td  >
                            <div>`+row.importe+`</div> 
                            </td>
                        </tr>
                    `;
                });
                        
                    

            DOM.find('tbody[name="detalle-analisis"]').html(html);
            DOM.find('div[name="modal-analisis"]').modal('show');

        }).catch(error => {
            console.log(error);
        });

        
    },


     new: async (row) => {
         
         let accion = 'save';
         let form = DOM.find('form[name="save"]');
 
         DOM.find('h4[name="'+accion+'"]').text('Resultado');
         DOM.find('tbody[name="detalle"]').html('');
         /** DATA */
         HELPER.reset_form(form);
 
         let data = HELPER.get_attr_json(row);
 
         form.find('input[name="resultado"]').val(data.resultado);
         Componente.fl_auto_event = true;
 
         Componente.id = data.id;
         Componente.action_submit = accion;
 
         DOM.find('div[name="modal-'+accion+'"]').modal('show');
     },
 
     new_orina: async (row) => {
         
        let accion = 'save_orina';
        let form = DOM.find('form[name="save_orina"]');

        DOM.find('h4[name="'+accion+'"]').text('Resultado');

        /** DATA */
        HELPER.reset_form(form);
        DOM.find('tbody[name="detalle"]').html('');
      /*   DOM.find('tbody[name="bioquimico"]').html('');
        DOM.find('tbody[name="caracteristicas"]').html(''); */
        let data = HELPER.get_attr_json(row);

      
        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

 
    verificar_columnas:async (data) => {
   
        DOM.find('div[name="dengue_igg"]').show('hide');
        DOM.find('div[name="dengue_igm"]').show('hide');
        DOM.find('div[name="dengue_ns1"]').show('hide');
        DOM.find('div[name="beta_cualitativo"]').show('hide');
        DOM.find('div[name="cuantitativo"]').show('hide');
        DOM.find('div[name="cualitativo"]').show('hide');
        DOM.find('div[name="grupo"]').show('hide');
        DOM.find('div[name="rh"]').show('hide');
        DOM.find('div[name="tifico_o"]').show('hide');
        DOM.find('div[name="tifico_h"]').show('hide');   
        DOM.find('div[name="paratifico_a"]').show('hide');
        DOM.find('div[name="paratifico_b"]').show('hide');
        DOM.find('div[name="brucelas"]').show('hide');


        data.forEach(row => {

                if(row.fl_estado == 1)
                {

                    DOM.find('div[name="'+row.nombre+'"]').hide('hide');
                    
                }

        });
           
 
    },


    new_dengue: async (row) => {
         
        let accion = 'save_dengue';
        let form = DOM.find('form[name="save_dengue"]');

        DOM.find('h4[name="'+accion+'"]').text('Resultado');
        DOM.find('tbody[name="detalle"]').html('');
        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        
        await axios.get(BASE_API+'configuracion/tipo_servicio/get_columnas?id='+data.id_tipo_servicio)
        .then(function (response) {

         
            Componente.verificar_columnas(response.data);
        

        }).catch(error => {
            console.log(error);
        });

        
        form.find('select[name="dengue_igg"]').val(data.dengue_igg).change();
        form.find('select[name="dengue_igm"]').val(data.dengue_igm).change();
        form.find('select[name="dengue_ns1"]').val(data.dengue_ns1).change();

        form.find('input[name="cualitativo"]').val(data.cualitativo);
        form.find('input[name="cuantitativo"]').val(data.cuantitativo);
        form.find('input[name="resultado"]').val(data.resultado);
        form.find('input[name="grupo"]').val(data.grupo);
        form.find('input[name="rh"]').val(data.rh);
        form.find('input[name="tifico_o"]').val(data.tifico_o);
        form.find('input[name="tifico_h"]').val(data.tifico_h);
        form.find('input[name="paratifico_a"]').val(data.paratifico_a);
        form.find('input[name="brucelas"]').val(data.brucelas);
        form.find('input[name="paratifico_b"]').val(data.paratifico_b);
 





        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    new_parasito: async (row) => {
         
        let accion = 'save_parasito';
        let form = DOM.find('form[name="save_parasito"]');

        DOM.find('h4[name="'+accion+'"]').text('Resultado');
        DOM.find('tbody[name="detalle"]').html('');
        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="color"]').val(data.color);
        form.find('input[name="aspecto"]').val(data.aspecto);
        form.find('input[name="consistencia"]').val(data.consistencia);
        form.find('input[name="moco_visible"]').val(data.moco_visible);
        form.find('input[name="sangre_visible"]').val(data.sangre_visible);

        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },


    new_inmunologia: async (row) => {
         
        let accion = 'save_inmunologia';
        let form = DOM.find('form[name="save_inmunologia"]');

        DOM.find('h4[name="'+accion+'"]').text('Resultado');
        DOM.find('tbody[name="detalle"]').html('');
        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('select[name="beta_cualitativo"]').val(data.beta_cualitativo).change();
        


    
        form.find('input[name="comentario"]').val(data.comentario);
        form.find('textarea[name="muestra"]').val(data.muestra);

        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },


     new_ematograma: async (row) => {
         
        let accion = 'save_ematograma';
        let form = DOM.find('form[name="save_ematograma"]');

        DOM.find('h4[name="'+accion+'"]').text('Resultado');

        /** DATA */
        HELPER.reset_form(form);
        DOM.find('tbody[name="detalle"]').html('');
        let data = HELPER.get_attr_json(row);

        await axios.get(BASE_API+'configuracion/tipo_servicio/get_tipo_examen?id='+data.id_tipo_servicio)
        .then(function (response) {

            response.data.forEach(row => {
                Componente.agregar_tipo(row);
            });
     
        

        }).catch(error => {
            console.log(error);
        });

        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },


    agregar_tipo: (data = null) => {
        
        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                examen :'',
                id:'',
                resultado:0,
            };
        }

     
        let html = `
            <tr data-codigo="`+codigo+`">
                <td style="display:none"><input type="text" step="any" data-name="id_tipo" class="form-control" value="`+data.id_tipo+`"  /></td>
                <td style="display:none"><input type="text" step="any" data-name="id" class="form-control" value="`+data.id+`"  /></td>
                <td><input type="text" step="any" data-name="examen" class="form-control" value="`+data.examen+`"  readonly/></td>
                <td><input type="number" step="any" data-name="resultado"  class="form-control" value="`+data.resultado+`"   required/></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle"]').append(html);
      /*   Componente.select_unidad(codigo, data.id_unidad); */
    },

    tipo_json: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle"] tr').each(function(){
           
            let item = {
                id : $(this).find('input[data-name="id"]').val(),
                examen : $(this).find('input[data-name="examen"]').val(),
                id_tipo : $(this).find('input[data-name="id_tipo"]').val(),
                resultado : $(this).find('input[data-name="resultado"]').val(),
 

            };
  
            detalle.push(item);
        });

        return detalle;
    },

     delete: function(row) {
 
         let accion = 'delete';
         let form = DOM.find('form[name="'+accion+'"]');
 
         DOM.find('h4[name="'+accion+'"]').text('Anular Caja');
 
         /** DATA */
         HELPER.reset_form(form);
         
         let data = HELPER.get_attr_json(row);
      

         form.find('div[name="texto"]').text(data.serie+'-'+data.numero);
 
         this.id_atencion = data.id_atencion;
         this.action_submit = accion;
         this.id_delete = data.id;
 
         DOM.find('div[name="modal-'+accion+'"]').modal('show');
     },
 
        

    inicio_atencion: (row) => {

        let accion = 'inicio_atencion';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Iniciar ');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('input[name="fecha_inicio_atencion"]').val(HELPER.fecha_actual());

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');

    },

   

    fin_atencion: (row) => {

        let accion = 'fin_atencion';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Finalizar ');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('input[name="fecha_fin_atencion"]').val(HELPER.fecha_actual());
 
        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');

    },

    submit_operacion_atencion: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

     

        if (this.id != null) { formData.append('id', this.id); } 

        axios({
            method: 'post',
            url: BASE_API + 'operacion/analisis/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
     submit: function() {
         
         let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
         let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));
 
 
         if (this.id != null) { formData.append('id', this.id); }
 
         formData.append('detalle_tipo', JSON.stringify(Componente.tipo_json()));
         formData.append('tipo', Componente.tipo);
 
         axios({
             method: 'post',
             url: BASE_API + 'operacion/analisis/' + this.action_submit,
             data: formData
         })
         .then(function(response) { 
             Componente.table.ajax.reload(null, false);
             DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
             HELPER.notificacion(response.data.mensaje, 'success');
  
             ladda.stop();
         }).catch(error => {
             ladda.stop();
         });
     },


     submit_orina: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }


        let detalle_1 = [];
        let index_1 = 0;

        let detalle_2 = [];
        let index_2 = 0;
        let detalle_3 = [];
        let index_3 = 0;

           /*   DOM.find('tbody[name="bioquimico"]').html('');
        DOM.find('tbody[name="caracteristicas"]').html(''); */

        DOM.find('tbody[name="caracteristicas"] tr').each(function(){
               
            detalle_1[index_1] = {
                 
                        nombre: $(this).attr('data-name'),
                        resultado :$(this).find('input[name="examen"]').val(),
                        fl_tipo:1,
                   };    
                   index_1++;
                     
          
        });

        DOM.find('tbody[name="bioquimico"] tr').each(function(){
               
            detalle_2[index_2] = {
                 
                        nombre: $(this).attr('data-name'),
                        resultado :$(this).find('input[name="examen"]').val(),
                        fl_tipo:2,
                   };    
                   index_2++;
                     
          
        });

        DOM.find('tbody[name="urinario"] tr').each(function(){
               
            detalle_3[index_3] = {
                 
                        nombre: $(this).attr('data-name'),
                        resultado :$(this).find('input[name="examen"]').val(),
                        fl_tipo:3,
                   };    
                   index_3++;
                     
          
        });

        formData.append('caracteristicas', JSON.stringify(detalle_1));
        formData.append('bioquimico', JSON.stringify(detalle_2));
        formData.append('urinario', JSON.stringify(detalle_3));

        axios({
            method: 'post',
            url: BASE_API + 'operacion/analisis/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

     print: async (id) => {

        await axios.get(BASE_API + 'operacion/atencion/print/'+id)
        .then(function (response) {
            
            let data = response.data;
            Componente.ticket(response.data);

        }).catch(error => {
            console.log(error);
        }); 
    },

    

    ticket: async (data) => {
       
        let html = `
            <style>
                td{
                    padding:1px;
                }

            </style>
            
            <table border="0" cellspacing="0" cellpadding="0" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; max-width:350px;">
                <tr>
                    <td style="text-align:center;">
                        <img src="`+BASE_FILES+`images/`+data.empresa.logo_factura+`" style="width:250px;" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="4">
                            <tr>
                                <td align="center">`+data.empresa.razon_social+`</td>
                            </tr>
                            <tr>
                                <td align="center">codigo IPRESS: `+data.empresa.numero_documento+`</td>
                            </tr>
                            <tr>
                                <td align="center">`+data.empresa.direccion+`</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" border="0" cellspacing="0" cellpadding="4">
                            <tr>
                                <td align="center" style="font-size:18px; font-weight:bold;">ATENCIÓN</td>
                            </tr>
                            <tr>
                                <td align="center" style="font-size:18px;">`+data.atencion+`</td>
                            </tr>
                        </table>
                    </td>
                </tr> 
                <tr>
                    <td style="text-align:center;">
                        Fecha de Registro: `+HELPER.fecha(data.fecha)+`
                    </td>
                </tr>              
                <tr>
                    <td style="padding-bottom:10px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="5">
                            <tr>
                                <td>Paciente: </td>
                                <td style="text-align:right;">`+data.paciente+`</td>
                            </tr>
                            <tr>
                                <td>Personal:</td>
                                <td style="text-align:right;">`+data.personal+`</td>
                            </tr>

                            <tr>
                                <td>Area:</td>
                                <td style="text-align:right;">`+data.tipo+`</td>
                            </tr>
                            <tr>
                                <td>Servicio:</td>
                                <td style="text-align:right;">`+data.servicio+`</td>
                            </tr>
                            <tr>
                                <td>Importe:</td>
                                <td style="text-align:right;">`+data.importe+`</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="border-top:dashed 1px #000;"></td>
                </tr>

               
                <tr>
                    <td style="text-align:center;">
                         
                     </td>
                </tr>`;
 
                
                html += `    
                <tr>
                    <td style="padding-top:10px; padding-bottom:10px;"><div style="border-top:dashed 1px #000;"></div></td>
                </tr>
 
                

            </table>
 
        `;

        await HELPER.print(html);
    },



    
    print_analisis:async (id,id_detalle = 0,firma) => {



         


        await axios.get(BASE_API + 'operacion/analisis/print/'+id+'/'+id_detalle)
        .then(function (response) {

           
             

            let data = response.data;

            let fecha_nacimiento =  data.fecha_nacimiento;
            let hoy = new Date()
            let fechaNacimiento = new Date(fecha_nacimiento)
    
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
            let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    
      
    
            if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < (fechaNacimiento.getDate()+1)) ) {
    
              edad--;
            }


            
        let     firmauser =`  ` ;

        if (firma=='CONFIRMA') {
            
            firmauser =` 
        
            <div style=" width: 260px; margin: auto; text-align: center; padding: 10px; margin-top:20px;">
                                        <span>`+((data.imagen_firma != null) ? '<img src="'+BASE_FILES+'images/'+data.imagen_firma+'" style="width:120px;" />' : '' )+`</span>
                          
                                     
                                    </div>
            ` ;
        }

         let html =` 
         <style>
            td, th,table,thead,tr,tbody{
                border-collapse: collapse;
                white-space:nowrap;
               height: 36px;
             
              
            }
            .contenedor__principal {
                max-width: 210mm;
                margin: auto;
                padding: 0 20px;
                margin-bottom: 200px;
                box-sizing: border-box;
            }

        </style>
        <div class="contenedor__principal">
                    <table  style="width:100%;">

                            <tr>
                                <td colspan="2">
                                    <table style="width:100%;">
                                        <tr>
                                            <td style="width:24%;">
                                                <img src="`+BASE_FILES+`images/`+data.empresa.logo_factura+`" style="width:100%;"/>
                                            </td>
                                            <td style="width:41%;">
                                                <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                                                <div>`+data.empresa.direccion+`</div>
                                                <div>`+data.empresa.telefono+`</div>
                                                <div>`+data.empresa.email+`</div>
                                            </td>
                                            <td style="width:33%;">
                                                
                                                <table    style="width:100%; border: 1px solid black;font-size: 10px; text-align:center;border-radius:15px; padding:8px;-moz-border-radius: 20px; 
                                                  -webkit-border-radius: 20px; ">
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div style="font-size:18px;text-align:center;" ><strong style="font-size:14px">codigo IPRESS : `+data.empresa.numero_documento+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px; background-color: #27b8dfdb;color: rgb(251, 255, 255);">
                                                            <div style="font-weight:bold; font-size:18px; text-align:center;">ATENCION</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div  style="font-weight:bold; font-size:18px;text-align:center;"><strong>N°  `+data.atencion+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;text-align:center;border: 1px solid #000000 !important; border-width:1px 1px 1px 1px !important;;"> `+HELPER.fecha(data.fecha)+`</td>
                                                    </tr>
                                                
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="2" vertical-align:top; >
                                    <div style="background-color:#fff !important; border: 1px solid #030303 !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                        <table style="width:100%;">
                                            <tr>
                                                <td style="width:20%;"><strong>PACIENTE:</strong></td>
                                                <td>`+data.paciente+`</td>
                                            </tr>
                                      
                                            <tr>
                                                <td style="width:20%;"><strong>EDAD:</strong></td>
                                                <td>`+edad + ` años </td>
                                            </tr>
                                            <tr>
                                                <td style="width:20%;"><strong>MEDICO:</strong></td>
                                                <td>`+data.personal+`</td>
                                            </tr>
                                          
                                        </table>
                                    </div>                    
                                </td>
                            </tr>
                            <tr>
                            <td colspan="2" vertical-align:top;  >
                                <div style="font-size:14px; text-align: center; font-weight: bold;">
                                    `+data.tipo_examen+`
                                </div>

                            </td>
                            </tr>
                           
                            <tr>
                                <td  colspan="2"  style=" padding-top: 8px;" >
                                        <table   style="width:100%;border-collapse: collapse;">
                                            <thead>
                                          
                                            

                                            <tr >
                                                <th  style="width:5%; background-color:#27b8dfdb; text-align: center; border: 0px solid black;">ITEM </th>
                                                <th  style="width:25%; background-color:#27b8dfdb; text-align: center; border: 0px solid black;">EXAMEN </th>
                                                <th  style="width:15%; background-color:#27b8dfdb; text-align: center; border: 0px solid black;">RESULTADO </th>
                                                <th  style="width:15%; background-color:#27b8dfdb; text-align: center; border: 0px solid black;">UNIDADES</th>
                                                <th  style="width:40%;background-color:#27b8dfdb; text-align: center; border: 0px solid black;">VALOR REFERNECIAL </th>
                                               
                                            </tr>
                                            </thead>
                                            <tbody>`;

                                            let index = 1 ;

                                                data.detalle.forEach(row => {         
                                              
                                                    let stl = "#FEFDFC";

                                                    if(index%2==0){
        
                                                        stl = "#E9E4E3";
                                                    
                                                    }else{
                                                        
                                                        stl = "#FEFDFC";
                                                        
                                                    }

                                                    html += `
                                                    <tr>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+index+`</td>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+row.servicio+`</td>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+row.resultado+`</td>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+row.unidad_medida+`</td>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+row.valor_referencial+`</td>
                                                    
                                                    </tr>
                                                    `;
                                                index ++;
                                                });
                                        html += `</tbody>
                                            
                                        </table>
                                    
                                </td>
                            </tr>
                        
                                
                            <tr>
                            <td style="padding-top:8px ;" >
                            
            
                            <table class="table-imprimir" style="margin-top: -1px; widght">
                            <tbody>
                                <tr class="tr-footer">
                                    <td colspan="3" style="font-weight: bold; text-align: center; width: 70%;">
                                        <p >            OBSERVACION : `+data.observacion+`</p>
                                    </td>
                                    <td colspan="2"   style="font-weight: bold; text-align: center; width: 70%;">
                                    
                                   
                                    `+firmauser+`
                                    </td>
                                </tr>
            
            
                            </tbody>
                            </table> 
            
                            </td>
                    </tr> 
                    
                      
                      

                    </table>
                    

                    </div>
                    
   
                </table>



                    </div>
         `;
 
         HELPER.print(html);
        }).catch(error => {
            console.log(error);
        }); 
     },

     


         
    print_dengue:async (id,id_detalle = 0,firma) => {


        await axios.get(BASE_API + 'operacion/analisis/print_dengue/'+id+'/'+id_detalle)
        .then(function (response) {

           
             

            let data = response.data;

            let fecha_nacimiento =  data.fecha_nacimiento;
            let hoy = new Date()
            let fechaNacimiento = new Date(fecha_nacimiento)
    
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
            let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    
      
    
            if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < (fechaNacimiento.getDate()+1)) ) {
    
              edad--;
            }

            
            
        let     firmauser =`  ` ;

        if (firma=='CONFIRMA') {
            
            firmauser =` 
        
        
  
            <div style=" width: 260px; margin: auto; text-align: center; padding: 10px; margin-top:20px;">
            <span>`+((data.imagen_firma != null) ? '<img src="'+BASE_FILES+'images/'+data.imagen_firma+'" style="width:120px;" />' : '' )+`</span>
          
        </div>
            ` ;
        }


         let html =` 
         <style>
            td, th,table,thead,tr,tbody{
                border-collapse: collapse;
                white-space:nowrap;
               height: 36px;
             
              
            }
            .contenedor__principal {
                max-width: 210mm;
                margin: auto;
                padding: 0 20px;
                margin-bottom: 200px;
                box-sizing: border-box;
            }

        </style>
        <div class="contenedor__principal">
                    <table  style="width:100%;">

                            <tr>
                                <td colspan="2">
                                    <table style="width:100%;">
                                        <tr>
                                            <td style="width:24%;">
                                                <img src="`+BASE_FILES+`images/`+data.empresa.logo_factura+`" style="width:100%;"/>
                                            </td>
                                            <td style="width:41%;">
                                                <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                                                <div>`+data.empresa.direccion+`</div>
                                                <div>`+data.empresa.telefono+`</div>
                                                <div>`+data.empresa.email+`</div>
                                            </td>
                                            <td style="width:33%;">
                                                
                                                <table    style="width:100%; border: 1px solid black;font-size: 10px; text-align:center;border-radius:15px; padding:8px;-moz-border-radius: 20px; 
                                                  -webkit-border-radius: 20px; ">
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div style="font-size:18px;text-align:center;" ><strong style="font-size:14px">codigo IPRESS : `+data.empresa.numero_documento+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px; background-color: #27b8dfdb;color: rgb(251, 255, 255);">
                                                            <div style="font-weight:bold; font-size:18px; text-align:center;">ATENCION</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div  style="font-weight:bold; font-size:18px;text-align:center;"><strong>N°  `+data.atencion+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;text-align:center;border: 1px solid #000000 !important; border-width:1px 1px 1px 1px !important;;"> `+HELPER.fecha(data.fecha)+`</td>
                                                    </tr>
                                                
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="2" vertical-align:top; >
                                    <div style="background-color:#fff !important; border: 1px solid #030303 !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                        <table style="width:100%;">
                                            <tr>
                                                <td style="width:20%;"><strong>PACIENTE:</strong></td>
                                                <td>`+data.paciente+`</td>
                                            </tr>
                                      
                                            <tr>
                                                <td style="width:20%;"><strong>EDAD:</strong></td>
                                                <td>`+edad + ` años </td>
                                            </tr>
                                            <tr>
                                                <td style="width:20%;"><strong>MEDICO:</strong></td>
                                                <td>`+data.personal+`</td>
                                            </tr>
                                          
                                        </table>
                                    </div>                    
                                </td>
                            </tr>
                            <tr>
                            <td colspan="2" vertical-align:top;  >
                                <div style="font-size:14px; text-align: center; font-weight: bold;">
                                    `+data.tipo_examen+`
                                </div>

                            </td>
                            </tr>
                            <td colspan="2" vertical-align:top;  >
                            <div style="font-size:12px; text-align: left; font-weight: bold;">
                              MUESTRA:  `+data.muestra+`
                            </div>

                        </td>
                   

                            <tr>
                            <td  colspan="2"  style=" padding-top: 8px;" >
                                    <table   style="width:100%;border-collapse: collapse; ">
                                        <thead>
                                            <tr>
                                            <div style="font-size:12px; text-align: left; font-weight: bold;">
                                           EXAMEN:   `+data.detalle.nombre+`
                                            </div>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>`;

                                     
                                                  
                                        
                                          

                                                if (data.detalle.dengue_igg != null && data.detalle.dengue_igg != '') {
                                                    html += `

                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;"> Dengue IgG  :   </td>
                                                        <td  style=" text-align: left;width: 20%;">`+data.detalle.dengue_igg+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>  `;
                                                }

                                                if (data.detalle.dengue_igm != null && data.detalle.dengue_igm != '') {
                                                    
                                                html += `
                                                <tr>
                                                    <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;"> Dengue IgM :     </td>
                                                    <td  style=" text-align: left;width: 20%;">`+data.detalle.dengue_igm+`</td>
                                                    <td  style=" text-align: left;width: 60%;"> </td>
                                                </tr>  `;
                                                }

                                                if (data.detalle.dengue_ns1 != null && data.detalle.dengue_ns1 != '') {
                                                    
                                                    html += `

                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Dengue NS1 :     </td>
                                                        <td  style=" text-align: left;width: 20%;">`+data.detalle.dengue_ns1+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>
                                                    `;
                                                }


                                                if (data.detalle.cualitativo != null && data.detalle.cualitativo != '') {
                                                    
                                                    
                                                    html += `

                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Cualitativo :     </td>
                                                        <td  style=" text-align: left;width: 20%;">`+data.detalle.cualitativo+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>
                                                    `;

                                                }

                                                if (data.detalle.cuantitativo != null && data.detalle.cuantitativo != '') {
                                                    
                                                     html += `

                                                <tr>
                                                    <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Cuántitativo:     </td>
                                                    <td  style=" text-align: left;width: 20%;">`+data.detalle.cuantitativo+`</td>
                                                    <td  style=" text-align: left;width: 60%;"> </td>
                                                </tr>
                                                `;
                                                }


 

                                                if (data.detalle.grupo != null && data.detalle.grupo != '') {
                                                    
                                                    html += `

                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Grupo:     </td>
                                                        <td  style=" text-align: left;width: 20%;">`+data.detalle.grupo+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>
                                                    `;
                                                    }

                                               if (data.detalle.rh != null && data.detalle.rh != '') {
                                                    
                                                html += `

                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">RH:     </td>
                                                        <td  style=" text-align: left;width: 20%;">`+data.detalle.rh+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>
                                                    `;
                                                    }


                                                if (data.detalle.tifico_o != null && data.detalle.tifico_o != '') {
                                                            
                                                    html += `

                                                        <tr>
                                                            <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Tifico O:     </td>
                                                            <td  style=" text-align: left;width: 20%;">`+data.detalle.tifico_o+`</td>
                                                            <td  style=" text-align: left;width: 60%;"> </td>
                                                        </tr>
                                                        `;
                                                        }



                                                        if (data.detalle.tifico_h != null && data.detalle.tifico_h != '') {
                                                    
                                                            html += `
        
                                                            <tr>
                                                                <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Tifico H:     </td>
                                                                <td  style=" text-align: left;width: 20%;">`+data.detalle.tifico_h+`</td>
                                                                <td  style=" text-align: left;width: 60%;"> </td>
                                                            </tr>
                                                            `;
                                                            }
        
                                                       if (data.detalle.paratifico_a != null && data.detalle.paratifico_a != '') {
                                                            
                                                        html += `
        
                                                            <tr>
                                                                <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Paratifico A:     </td>
                                                                <td  style=" text-align: left;width: 20%;">`+data.detalle.paratifico_a+`</td>
                                                                <td  style=" text-align: left;width: 60%;"> </td>
                                                            </tr>
                                                            `;
                                                            }
        
        
                                                        if (data.detalle.paratifico_b != null && data.detalle.paratifico_b != '') {
                                                                    
                                                        html += `
    
                                                            <tr>
                                                                <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Paratifico B:     </td>
                                                                <td  style=" text-align: left;width: 20%;">`+data.detalle.paratifico_b+`</td>
                                                                <td  style=" text-align: left;width: 60%;"> </td>
                                                            </tr>
                                                            `;
                                                            }
                                                            if (data.detalle.brucelas != null && data.detalle.brucelas != '') {
                                                            
                                                            html += `
        
                                                                <tr>
                                                                    <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Brucelas:     </td>
                                                                    <td  style=" text-align: left;width: 20%;">`+data.detalle.brucelas+`</td>
                                                                    <td  style=" text-align: left;width: 60%;"> </td>
                                                                </tr>
                                                                `;
                                                                }
                
                                       
                                            

                                        
                                    html += `</tbody>
                                    </table>
                            
                            </td>
                        </tr>

                        <tr>
                        <td style="padding-top:8px ;" >
                        
            
                        <table class="table-imprimir" style="margin-top: -1px; widght">
                        <tbody>
                            <tr class="tr-footer">
                                <td colspan="3" style="font-weight: bold; text-align: center; width: 70%;">
                                    <p >            OBSERVACION : `+data.observacion+`</p>
                                </td>
                                <td colspan="2"   style="font-weight: bold; text-align: center; width: 70%;">
                                ` +firmauser+`
                             
            
                                </td>
                            </tr>
            
            
                        </tbody>
                        </table>
            
            
                        </td>
                </tr>
                
             
                           
 
                 
                    </table>
                    

                    </div>
                    
   
                </table>



                    </div>
         `;
 
         HELPER.print(html);
        }).catch(error => {
            console.log(error);
        }); 
     },

    
     

         
    print_parasito:async (id,id_detalle = 0,firma) => {


        await axios.get(BASE_API + 'operacion/analisis/print_dengue/'+id+'/'+id_detalle)
        .then(function (response) {

           
             

            let data = response.data;

            let fecha_nacimiento =  data.fecha_nacimiento;
            let hoy = new Date()
            let fechaNacimiento = new Date(fecha_nacimiento)
    
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
            let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    
      
    
            if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < (fechaNacimiento.getDate()+1)) ) {
    
              edad--;
            }


            let     firmauser =`  ` ;

            if (firma=='CONFIRMA') {
                
                firmauser =` 
            
                
 
         
                <div style=" width: 260px; margin: auto; text-align: center; padding: 10px; margin-top:20px;">
                <span>`+((data.imagen_firma != null) ? '<img src="'+BASE_FILES+'images/'+data.imagen_firma+'" style="width:120px;" />' : '' )+`</span>
         
             
            </div>
        
                ` ;
            }


         let html =` 
         <style>
            td, th,table,thead,tr,tbody{
                border-collapse: collapse;
                white-space:nowrap;
               height: 36px;
             
              
            }
            .contenedor__principal {
                max-width: 210mm;
                margin: auto;
                padding: 0 20px;
                margin-bottom: 200px;
                box-sizing: border-box;
            }

        </style>
        <div class="contenedor__principal">
                    <table  style="width:100%;">

                            <tr>
                                <td colspan="2">
                                    <table style="width:100%;">
                                        <tr>
                                            <td style="width:24%;">
                                                <img src="`+BASE_FILES+`images/`+data.empresa.logo_factura+`" style="width:100%;"/>
                                            </td>
                                            <td style="width:41%;">
                                                <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                                                <div>`+data.empresa.direccion+`</div>
                                                <div>`+data.empresa.telefono+`</div>
                                                <div>`+data.empresa.email+`</div>
                                            </td>
                                            <td style="width:33%;">
                                                
                                                <table    style="width:100%; border: 1px solid black;font-size: 10px; text-align:center;border-radius:15px; padding:8px;-moz-border-radius: 20px; 
                                                  -webkit-border-radius: 20px; ">
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div style="font-size:18px;text-align:center;" ><strong style="font-size:14px">codigo IPRESS : `+data.empresa.numero_documento+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px; background-color: #27b8dfdb;color: rgb(251, 255, 255);">
                                                            <div style="font-weight:bold; font-size:18px; text-align:center;">ATENCION</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div  style="font-weight:bold; font-size:18px;text-align:center;"><strong>N°  `+data.atencion+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;text-align:center;border: 1px solid #000000 !important; border-width:1px 1px 1px 1px !important;;"> `+HELPER.fecha(data.fecha)+`</td>
                                                    </tr>
                                                
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="2" vertical-align:top; >
                                    <div style="background-color:#fff !important; border: 1px solid #030303 !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                        <table style="width:100%;">
                                            <tr>
                                                <td style="width:20%;"><strong>PACIENTE:</strong></td>
                                                <td>`+data.paciente+`</td>
                                            </tr>
                                      
                                            <tr>
                                                <td style="width:20%;"><strong>EDAD:</strong></td>
                                                <td>`+edad + ` años </td>
                                            </tr>
                                            <tr>
                                                <td style="width:20%;"><strong>MEDICO:</strong></td>
                                                <td>`+data.personal+`</td>
                                            </tr>
                                          
                                        </table>
                                    </div>                    
                                </td>
                            </tr>
                            <tr>
                            <td colspan="2" vertical-align:top;  >
                                <div style="font-size:14px; text-align: center; font-weight: bold;">
                                    `+data.tipo_examen+`
                                </div>

                            </td>
                            </tr>
                            <td colspan="2" vertical-align:top;  >
                            <div style="font-size:12px; text-align: left; font-weight: bold;">
                              MUESTRA:  `+data.muestra+`
                            </div>

                        </td>
                   

                            <tr>
                            <td  colspan="2"  style=" padding-top: 8px;" >
                                    <table   style="width:100%;border-collapse: collapse; ">
                                        <thead>
                                            <tr>
                                            <div style="font-size:12px; text-align: left; font-weight: bold;text-align: center;">
                                            EXAMEN MACROSCOPICO
                                            </div>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>`;

                                     
                                                  
                                        
                                          

                                         
                                                    html += `

                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">COLOR                    :   </td>
                                                        <td  style=" text-align: left;width: 20%;">`+data.detalle.color+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>  `;
                                             

                                             
                                                    
                                                html += `
                                                <tr>
                                                    <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;"> ASPECTO               :     </td>
                                                    <td  style=" text-align: left;width: 20%;">`+data.detalle.aspecto+`</td>
                                                    <td  style=" text-align: left;width: 60%;"> </td>
                                                </tr>  `;
                                            
 
                                                    html += `

                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">CONSISTENCIA     :     </td>
                                                        <td  style=" text-align: left;width: 20%;">`+data.detalle.consistencia+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>
                                                    `;
                                            


                                               
                                                    html += `

                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">MOCO VISIBLE     :     </td>
                                                        <td  style=" text-align: left;width: 20%;">`+data.detalle.moco_visible+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>
                                                    `;

                                             
                                                    html += `

                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">SANGRE VISIBLE     :     </td>
                                                        <td  style=" text-align: left;width: 20%;">`+data.detalle.sangre_visible+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>
                                                    `;
                                            

                                        
                                    html += `</tbody>
                                    </table>
                            
                            </td>
                        </tr>


                            <tr>
                            <td style="padding-top:8px ;text-align: center;" >
                            EXAMEN MICROSCOPICO
                          
    
    
                            </td>
                        </tr>
                        <tr>
                        <td style="padding-top:8px ;" >
                       
                    


                        </td>
                    </tr>
                        
                    <tr>
                    <td style="padding-top:8px ;" >
                    
        
                    <table class="table-imprimir" style="margin-top: -1px; widght">
                    <tbody>
                        <tr class="tr-footer">
                            <td colspan="3" style="font-weight: bold; text-align: center; width: 70%;">
                                <p >         1. Muestra : `+data.comentario+`</p>
                            </td>
                            <td colspan="2"   style="font-weight: bold; text-align: center; width: 70%;">
                           
                            `+firmauser + `
                            </td>
                        </tr>
    
    
                    </tbody>
                    </table>
    
    
                    </td>
              </tr>

       



                    </table>
                    

                    </div>
                    
   
                </table>



                    </div>
         `;
 
         HELPER.print(html);
        }).catch(error => {
            console.log(error);
        }); 
     },


     print_inmunologia:async (id,id_detalle = 0,firma) => {


        await axios.get(BASE_API + 'operacion/analisis/print/'+id+'/'+id_detalle)
        .then(function (response) {

           
             

            let data = response.data;

            let fecha_nacimiento =  data.fecha_nacimiento;
            let hoy = new Date()
            let fechaNacimiento = new Date(fecha_nacimiento)
    
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
            let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    
      
    
            if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < (fechaNacimiento.getDate()+1)) ) {
    
              edad--;
            }


                   
        let     firmauser =`  ` ;

        if (firma=='CONFIRMA') {
            
            firmauser =` 
        
                  
            <div style=" width: 260px; margin: auto; text-align: center; padding: 10px; margin-top:20px;">
            <span>`+((data.imagen_firma != null) ? '<img src="'+BASE_FILES+'images/'+data.imagen_firma+'" style="width:120px;" />' : '' )+`</span>
           
        </div>

    
    
            ` ;
        }


         let html =` 
         <style>
            td, th,table,thead,tr,tbody{
                border-collapse: collapse;
                white-space:nowrap;
               height: 36px;
             
              
            }
            
            .contenedor__principal {
                max-width: 210mm;
                margin: auto;
                padding: 0 20px;
                margin-bottom: 200px;
                box-sizing: border-box;
            }

        </style>
        <div class="contenedor__principal">
                    <table  style="width:100%;">

                            <tr>
                                <td colspan="2">
                                    <table style="width:100%;">
                                        <tr>
                                            <td style="width:24%;">
                                                <img src="`+BASE_FILES+`images/`+data.empresa.logo_factura+`" style="width:100%;"/>
                                            </td>
                                            <td style="width:41%;">
                                                <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                                                <div>`+data.empresa.direccion+`</div>
                                                <div>`+data.empresa.telefono+`</div>
                                                <div>`+data.empresa.email+`</div>
                                            </td>
                                            <td style="width:33%;">
                                                
                                                <table    style="width:100%; border: 1px solid black;font-size: 10px; text-align:center;border-radius:15px; padding:8px;-moz-border-radius: 20px; 
                                                  -webkit-border-radius: 20px; ">
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div style="font-size:18px;text-align:center;" ><strong style="font-size:14px">codigo IPRESS : `+data.empresa.numero_documento+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px; background-color: #27b8dfdb;color: rgb(251, 255, 255);">
                                                            <div style="font-weight:bold; font-size:18px; text-align:center;">ATENCION</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div  style="font-weight:bold; font-size:18px;text-align:center;"><strong>N°  `+data.atencion+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;text-align:center;border: 1px solid #000000 !important; border-width:1px 1px 1px 1px !important;;"> `+HELPER.fecha(data.fecha)+`</td>
                                                    </tr>
                                                
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                         
                           
                            `;

                                    let nombre = '';
                                        data.detalle.forEach(row => {         
                                    
                                            nombre = row.servicio;
                                          
                                        });
                                html += `

                              
                            <tr>
                                <td colspan="2" vertical-align:top; >
                                    <div style="background-color:#fff !important; border: 1px solid #030303 !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                        <table style="width:100%;">
                                            <tr>
                                                <td style="width:20%;"><strong>PACIENTE:</strong></td>
                                                <td>`+data.paciente+`</td>
                                            </tr>
                                      
                                            <tr>
                                                <td style="width:20%;"><strong>EDAD:</strong></td>
                                                <td>`+edad + ` años </td>
                                            </tr>
                                            <tr>
                                                <td style="width:20%;"><strong>MEDICO:</strong></td>
                                                <td>`+data.personal+`</td>
                                            </tr>
                                          
                                        </table>
                                    </div>                    
                                </td>
                            </tr>
                            <tr>
                            <td colspan="2" vertical-align:top;  >
                                <div style="font-size:14px; text-align: center; font-weight: bold;">
                                    `+data.tipo_examen+`
                                </div>

                            </td>
                            </tr>
                            <td colspan="2" vertical-align:top;  >
                            <div style="font-size:12px; text-align: left; font-weight: bold;">
                              MUESTRA:  `+data.muestra+`
                            </div>
                            <br>
                            <div style="font-size:12px; text-align: left; font-weight: bold;">
                            EXAMEN:  `+nombre+`
                          </div>
                        </td>
                   

                        

                            <tr>
                            <td  colspan="2"  style=" padding-top: 8px;" >
                                    <table   style="width:100%;border-collapse: collapse; ">
                                        <thead>
                                            <tr>
                                          
                                            
                                            </tr>
                                        </thead>
                                        <tbody>`;

                                        let comentario = 0;
                                            data.detalle.forEach(row => {         
                                        
                                                comentario = row.comentario;
                                                html += `
                                                <tr>
                                                    <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">Resultado:   </td>
                                                    <td  style=" text-align: left;width: 20%;">`+row.beta_cualitativo+`</td>
                                                    <td  style=" text-align: left;width: 60%;"> </td>
                                                </tr>
                                               
                                                `;
                                            });
                                    html += `</tbody>
                                    </table>
                            
                            </td>
                        </tr>


                            <tr>
                            <td style="padding-top:8px ;" >
                               
                          
    
    
                            </td>
                        </tr>
                           
                        <tr>
                        <td style="padding-top:8px ;" >
                        
            
                        <table class="table-imprimir" style="margin-top: -1px; widght">
                        <tbody>
                            <tr class="tr-footer">
                                <td colspan="3" style="font-weight: bold; text-align: center; width: 70%;">
                                    <p >          OBSERVACION : `+comentario+`</p>
                                </td>
                                <td colspan="2"   style="font-weight: bold; text-align: center; width: 70%;">
                                
                              
                                ` +firmauser+ `
                                </td>
                            </tr>
            
            
                        </tbody>
                        </table>
            
            
                        </td>
                </tr>


                    
                        
                        


                    </table>
                    

                    </div>
                    
   
                </table>



                    </div>
         `;
 
         HELPER.print(html);
        }).catch(error => {
            console.log(error);
        }); 
     },



    print_emograma:async (id,id_detalle = 0,firma) => {


        await axios.get(BASE_API + 'operacion/analisis/print_emograma/'+id+'/'+id_detalle)
        .then(function (response) {

           
             

            let data = response.data;

            let fecha_nacimiento =  data.fecha_nacimiento;
            let hoy = new Date()
            let fechaNacimiento = new Date(fecha_nacimiento)
    
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
            let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    
      
    
            if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < (fechaNacimiento.getDate()+1)) ) {
    
              edad--;
            }


            let     firmauser =`  ` ;

            if (firma=='CONFIRMA') {
                
                firmauser =` 
            
                <div style=" width: 260px; margin: auto; text-align: center; padding: 10px; margin-top:20px;">
                <span>`+((data.imagen_firma != null) ? '<img src="'+BASE_FILES+'images/'+data.imagen_firma+'" style="width:120px;" />' : '' )+`</span>
              
            </div>
                ` ;
            }


         let html =` 
         <style>
            td, th,table,thead,tr,tbody{
                border-collapse: collapse;
                white-space:nowrap;
               height: 36px;
             
              
            }
            .contenedor__principal {
                max-width: 210mm;
                margin: auto;
                padding: 0 20px;
                margin-bottom: 200px;
                box-sizing: border-box;
            }

        </style>
        <div class="contenedor__principal">
                    <table  style="width:100%;">

                            <tr>
                                <td colspan="2">
                                    <table style="width:100%;">
                                        <tr>
                                            <td style="width:24%;">
                                                <img src="`+BASE_FILES+`images/`+data.empresa.logo_factura+`" style="width:100%;"/>
                                            </td>
                                            <td style="width:41%;">
                                                <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                                                <div>`+data.empresa.direccion+`</div>
                                                <div>`+data.empresa.telefono+`</div>
                                                <div>`+data.empresa.email+`</div>
                                            </td>
                                            <td style="width:33%;">
                                                
                                                <table    style="width:100%; border: 1px solid black;font-size: 10px; text-align:center;border-radius:15px; padding:8px;-moz-border-radius: 20px; 
                                                  -webkit-border-radius: 20px; ">
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div style="font-size:18px;text-align:center;" ><strong style="font-size:14px">codigo IPRESS : `+data.empresa.numero_documento+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px; background-color: #27b8dfdb;color: rgb(251, 255, 255);">
                                                            <div style="font-weight:bold; font-size:18px; text-align:center;">ATENCION</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div  style="font-weight:bold; font-size:18px;text-align:center;"><strong>N°  `+data.atencion+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;text-align:center;border: 1px solid #000000 !important; border-width:1px 1px 1px 1px !important;;"> `+HELPER.fecha(data.fecha)+`</td>
                                                    </tr>
                                                
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            `;

                            
                            let nombre = data.detalle.servicio;
                             /*    data.detalle.forEach(row => {         
                            
                                    nombre = row.servicio;
                                  
                                }); */
                        html += `

                            <tr>
                                <td colspan="2" vertical-align:top; >
                                    <div style="background-color:#fff !important; border: 1px solid #030303 !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                        <table style="width:100%;">
                                            <tr>
                                                <td style="width:20%;"><strong>PACIENTE:</strong></td>
                                                <td>`+data.paciente+`</td>
                                            </tr>
                                      
                                            <tr>
                                                <td style="width:20%;"><strong>EDAD:</strong></td>
                                                <td>`+edad +` años</td>
                                            </tr>
                                            <tr>
                                                <td style="width:20%;"><strong>MEDICO:</strong></td>
                                                <td>`+data.personal+`</td>
                                            </tr>
                                          
                                        </table>
                                    </div>                    
                                </td>
                            </tr>
                            <tr>
                            <td colspan="2" vertical-align:top;  >
                                <div style="font-size:14px; text-align: center; font-weight: bold;">
                                    `+((data.tipo_examen == 'HEMOGRAMA') ? data.tipo_examen :nombre)+`
                                </div>

                            </td>
                            </tr>
                           
                            <td colspan="2" vertical-align:top;  >
                            <div style="font-size:12px; text-align: left; font-weight: bold;">
                              MUESTRA:  `+data.muestra+`
                            </div>

                        </td>
                        </tr>

                            <tr>
                                <td  colspan="2"  style=" padding-top: 8px;" >
                                        <table    style="width:100%;border-collapse: collapse; ">
                                            <thead>
                                          
                                            

                                            <tr >
                                                <th  style="width:5%; background-color:#27b8dfdb; text-align: center; border: 0px solid black;">ITEM </th>
                                                <th  style="width:25%; background-color:#27b8dfdb; text-align: center; border: 0px solid black;">EXAMEN </th>
                                                <th  style="width:15%; background-color:#27b8dfdb; text-align: center; border: 0px solid black;">RESULTADO </th>
                                                <th  style="width:15%; background-color:#27b8dfdb; text-align: center; border: 0px solid black;">UNIDADES</th>
                                                <th  style="width:40%;background-color:#27b8dfdb; text-align: center; border: 0px solid black;">VALOR REFERNECIAL </th>
                                               
                                            </tr>
                                            </thead>
                                            <tbody>`;

                                            let index = 1 ;

                                                data.analisis.forEach(row => {         
                                              
                                                    let stl = "#FEFDFC";

                                                    if(index%2==0){
        
                                                        stl = "#E9E4E3";
                                                    
                                                    }else{
                                                        
                                                        stl = "#FEFDFC";
                                                        
                                                    }


                                                    html += `
                                                    <tr>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+index+`</td>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+row.examen+`</td>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+row.resultado+`</td>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+row.unidad_medida+`</td>
                                                        <td  style=" text-align: center;background-color:`+stl+` ;">`+row.valor_referencial+`</td>
                                                    
                                                    </tr>
                                                    `;
                                                index ++;
                                                });
                                        html += `</tbody>

                                    
                                            
                                        </table>
                                
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" vertical-align:top;  >
                                    <div style="font-size:14px; text-align: center; font-weight: bold;">
                                    DIFERENCIACIÓN CELULAR
                                    </div>

                                </td>
                            </tr>
                            

                            <tr>
                            <td  colspan="2"  style=" padding-top: 8px;" >
                                    <table   style="width:100%;border-collapse: collapse; ">
                                       
                                     
                                        <tbody>`;

                                     

                                            data.analisis_df.forEach(row => {         
                                          
                                                let stl = "#FEFDFC";

                                                if(index%2==0){
    
                                                    stl = "#E9E4E3";
                                                
                                                }else{
                                                    
                                                    stl = "#FEFDFC";
                                                    
                                                }

                                                html += `
                                                <tr>
                                                    <td  style=" text-align: center;width:5%;background-color:`+stl+` ;">`+index+`</td>
                                                    <td  style=" text-align: center;width:25%;background-color:`+stl+` ; ">`+row.examen+`</td>
                                                    <td  style=" text-align: center;width:15%;background-color:`+stl+` ;">`+row.resultado+`</td>
                                                    <td  style=" text-align: center;width:15%;background-color:`+stl+` ;">`+row.unidad_medida+`</td>
                                                    <td  style=" text-align: center;width:40%;background-color:`+stl+` ;">`+row.valor_referencial+`</td>
                                                
                                                </tr>
                                                `;
                                            index ++;
                                            });
                                    html += `</tbody>

                                
                                        
                                    </table>
                            
                            </td>
                        </tr>

                            <tr>
                            <td style="padding-top:8px ;" >
                               
                           
    
    
                            </td>
                        </tr>
                              
                        
                        <tr>
                        <td style="padding-top:8px ;" >
                        
            
                        <table class="table-imprimir" style="margin-top: -1px; widght">
                        <tbody>
                            <tr class="tr-footer">
                                <td colspan="3" style="font-weight: bold; text-align: center; width: 70%;">
                                    <p >           OBSERVACION : `+data.comentario+`</p>
                                </td>
                                <td colspan="2"   style="font-weight: bold; text-align: center; width: 70%;">
                                
                         
                                `+firmauser+`
                                </td>
                            </tr>


                        </tbody>
                        </table>


                        </td>
        </tr>


                                           
                  

                        
        

                    </table>
                    

                    </div>
                    
   
                </table>



                    </div>
         `;
 
         HELPER.print(html);
        }).catch(error => {
            console.log(error);
        }); 
     },






     
    print_orina:async (id,id_detalle = 0,firma) => {


        await axios.get(BASE_API + 'operacion/analisis/print_orina/'+id+'/'+id_detalle)
        .then(function (response) {

            let data = response.data;

            let fecha_nacimiento =  data.fecha_nacimiento;
            let hoy = new Date()
            let fechaNacimiento = new Date(fecha_nacimiento)
    
            let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
            let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    
      
    
            if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < (fechaNacimiento.getDate()+1)) ) {
    
              edad--;
            }


            let     firmauser =`  ` ;

            if (firma=='CONFIRMA') {
                
                firmauser =` 
            
                <div style=" width: 260px; margin: auto; text-align: center; padding: 10px; margin-top:20px;">
                <span>`+((data.imagen_firma != null) ? '<img src="'+BASE_FILES+'images/'+data.imagen_firma+'" style="width:120px;" />' : '' )+`</span>
              
            </div>
           
                ` ;
            }


         let html =`
         <style>
         td, th,table,thead,tr,tbody{
             border-collapse: collapse;
             white-space:nowrap;
            height: 36px;
          
           
         }
         .contenedor__principal {
            max-width: 210mm;
            margin: auto;
            padding: 0 20px;
            margin-bottom: 200px;
            box-sizing: border-box;
        }

    </style>
    <div class="contenedor__principal">



                    <table  style="width:100%;">

                            <tr>
                                <td colspan="2">
                                    <table style="width:100%;">
                                        <tr>
                                            <td style="width:24%;">
                                                <img src="`+BASE_FILES+`images/`+data.empresa.logo_factura+`" style="width:100%;"/>
                                            </td>
                                            <td style="width:41%;">
                                                <div style="font-weight:bold; text-align:left;"><strong>`+data.empresa.razon_social+`</strong></div>
                                                <div>`+data.empresa.direccion+`</div>
                                                <div>`+data.empresa.telefono+`</div>
                                                <div>`+data.empresa.email+`</div>
                                            </td>
                                            <td style="width:33%;">
                                                
                                                <table    style="width:100%; border: 1px solid black;font-size: 10px; text-align:center;border-radius:15px; padding:8px;-moz-border-radius: 20px; 
                                                  -webkit-border-radius: 20px; ">
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div style="font-size:18px;text-align:center;" ><strong style="font-size:14px">Código IPRESS: `+data.empresa.numero_documento+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px; background-color: #27b8dfdb;color: rgb(251, 255, 255);">
                                                            <div style="font-weight:bold; font-size:18px; text-align:center;">ATENCION</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;">
                                                            <div  style="font-weight:bold; font-size:18px;text-align:center;"><strong>N°  `+data.atencion+`</strong></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td     style="height: 20px;text-align:left;font-size: 12px;text-align:center;border: 1px solid #000000 !important; border-width:1px 1px 1px 1px !important;;"> `+HELPER.fecha(data.fecha)+`</td>
                                                    </tr>
                                                
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td colspan="2" vertical-align:top; >
                                    <div style="background-color:#fff !important; border: 1px solid #030303 !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px;">
                                        <table style="width:100%;">
                                            <tr>
                                                <td style="width:20%;"><strong>PACIENTE:</strong></td>
                                                <td>`+data.paciente+`</td>
                                            </tr>
                                      
                                            <tr>
                                                <td style="width:20%;"><strong>EDAD:</strong></td>
                                                <td>`+edad +` años</td>
                                            </tr>
                                            <tr>
                                                <td style="width:20%;"><strong>MEDICO:</strong></td>
                                                <td>`+data.personal+`</td>
                                            </tr>
                                          
                                        </table>
                                    </div>                    
                                </td>
                            </tr>
                            <tr>
                            <td colspan="2" vertical-align:top;  >
                                <div style="font-size:14px; text-align: center; font-weight: bold;">
                                    `+data.tipo_examen+`
                                </div>

                            </td>
                            </tr>
                           
                            <td colspan="2" vertical-align:top;  >
                            <div style="font-size:12px; text-align: left; font-weight: bold;">
                              MUESTRA:  `+data.muestra+`
                            </div>

                        </td>
                        </tr>

                            <tr>
                                <td  colspan="2"  style=" padding-top: 8px;" >
                                        <table   style="width:100%;border-collapse: collapse; ">
                                            <thead>
                                                <tr>
                                                <th colspan="3"  style="text-align: left;">CARACTERÍSTICAS MACROSCÓPICAS</th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody>`;
                                                data.caracteristicas.forEach(row => {         
                                            
                                                    html += `
                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">`+row.nombre+` :</td>
                                                        <td  style=" text-align: left;width: 20%;">`+row.resultado+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    
                                                    </tr>
                                                    `;
                                                });
                                        html += `</tbody>
                                        </table>
                                
                                </td>
                            </tr>
                            <tr>
                                <td  colspan="2"  style=" padding-top: 8px;" >
                                        <table   style="width:100%;border-collapse: collapse; ">
                                            <thead>
                                                <tr>
                                                 <th colspan="3"  style="text-align: left;">ANALISIS BIOQUIMICO</th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody>`;
                                                data.bioquimico.forEach(row => {         
                                            
                                                    html += `
                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">`+row.nombre+` :</td>
                                                        <td  style=" text-align: left;width: 20%;">`+row.resultado+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    </tr>
                                                    `;
                                                });
                                        html += `</tbody>
                                        </table>
                                
                                </td>
                            </tr>
                            <tr>
                                <td  colspan="2"  style=" padding-top: 8px;" >
                                        <table   style="width:100%;border-collapse: collapse; ">
                                            <thead>
                                                <tr>
                                                <th colspan="3" style="text-align: left;">SEDIMENTO URINARIO</th>
                                                
                                                </tr>
                                            </thead>
                                            <tbody>`;
                                                data.urinario.forEach(row => {         
                                            
                                                    html += `
                                                    <tr>
                                                        <td  style=" text-align: left;width: 20%;font-weight: bold;padding: 5px;">`+row.nombre+` :</td>
                                                        <td  style=" text-align: left;width: 20%;">`+row.resultado+`</td>
                                                        <td  style=" text-align: left;width: 60%;"> </td>
                                                    
                                                    </tr>
                                                    `;
                                                });
                                        html += `</tbody>
                                        </table>
                                
                                </td>
                            </tr>

                       

                            <tr>
                            <td style="padding-top:8px ;" >
                               
                            
    
    
                            </td>
                        </tr>
                          
                        <tr>
                        <td style="padding-top:8px ;" >
                        
            
                        <table class="table-imprimir" style="margin-top: -1px; widght">
                        <tbody>
                            <tr class="tr-footer">
                                <td colspan="3" style="font-weight: bold; text-align: center; width: 70%;">
                                    <p >           OBSERVACION : `+data.comentario+`</p>
                                </td>
                                <td colspan="2"   style="font-weight: bold; text-align: center; width: 70%;">
                                
                            
                                `+firmauser+`
                                </td>
                            </tr>


                        </tbody>
                        </table>


                        </td>
        </tr>

                     
    
                   

                    </table>
                    

                    </div>
                    
   
                </table>



                    </div>
         `;
 
         HELPER.print(html);
        }).catch(error => {
            console.log(error);
        }); 
     }


 } 
 
 export default Componente;