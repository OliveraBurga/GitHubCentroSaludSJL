<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
   </head>
   <body>
      <div>
         <style>
         </style>
         <div class="rps_b894">
            <div>
               <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  bgcolor="#ffffff"
                  align="center"
                  style="
                  font-family: Helvetica neue, Helvetica, Arial, Verdana, sans-serif;
                  "
                  >
                  <tbody>
                     <tr>
                        <td rowspan="1" colspan="1">
                           <table
                              width="520px"
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              bgcolor="#ffffff"
                              align="center"
                              >
                              <tbody>
                                 <tr>
                                    <td valign="top" rowspan="1" colspan="1">
                                       <table
                                          width="100%"
                                          cellpadding="0"
                                          cellspacing="0"
                                          border="0"
                                          bgcolor="#ffffff"
                                          >
                                          <tbody>
                                             <tr>
                                                <td
                                                   valign="top"
                                                   align="left"
                                                   rowspan="1"
                                                   colspan="1"
                                                   style="
                                                   color: #007be8;
                                                   font-size: 20px;
                                                   line-height: 32px;
                                                   text-align: left;
                                                   font-weight: bold;
                                                   "
                                                   >
                                                   <span
                                                      >HISTORIA CLINICA N°  <?= $atencion->historia_clinica; ?></span
                                                      >
                                                </td>
                                             </tr>
                                             <tr>
                                                <td
                                                   valign="top"
                                                   rowspan="1"
                                                   colspan="1"
                                                   style="color: #cccccc; padding-bottom: 15px"
                                                   >
                                                   <hr color="#cccccc" size="1" />
                                                </td>
                                             </tr>
                                             <tr
                                                valign="top"
                                                align="left"
                                                rowspan="1"
                                                colspan="1"
                                                >
                                                <td>
                                                   <div style="padding: 10px 0">
                                                      Estimado <?= $atencion->paciente; ?>,
                                                   </div>
                                                </td>
                                             </tr>
                                             <tr
                                                valign="top"
                                                align="left"
                                                rowspan="1"
                                                colspan="1"
                                                >
                                                <td>
                                                   <div style="padding: 10px 0">
                                                      Se hace presente el historial de su atencion
                                                   </div>
                                                </td>
                                             </tr>
                                             <tr
                                                valign="top"
                                                align="left"
                                                rowspan="1"
                                                colspan="1"
                                                >
                                                <td>
                                                   <div style="padding: 5px 0">
                                                      <ul>
                                                         <li>
                                                            <b
                                                               ><?= $atencion->historia_clinica; ?>
                                                            </b>
                                                         </li>
                                                         <li>
                                                            Fecha de Atención: <b><?= date("d/m/Y", strtotime($atencion->fecha)); ?></b>
                                                         </li>
                                                         <li>
                                                            Dr Atención: <b><?= $atencion->personal; ?></b>
                                                         </li>
                                                      </ul>
                                                   </div>
                                           
                                                
                                 
                                                   <div style="margin-top:20px; font-size:14px;"><strong>DIAGNOSTICO</strong></div>
                                                      <div style="font-size:11px;">
                                                            <table style="width:100%; border-collapse:collapse;">
                                                               <thead>
                                                                  <tr>
                                                                  
                                                                        <th style="text-align:left; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>DESCRIPCIÓN</strong></th>
                                                                        <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>TIPO</strong></th>
                                                                  </tr>
                                                               </thead>
                                                               <tbody>
                                                                  <?php   foreach ($atencion->diagnostico  as $row): ?>
                                                                  <tr>
                                                                        <td style="text-align:left; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->enfermedad; ?></td>
                                                                     
                                                                        <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->tipo; ?></td>
                                                                  </tr>                    
                                                                  <?php endforeach; ?>
                                                               </tbody>
                                                            </table>
                                                      </div>



                                                      <div style="margin-top:20px; font-size:14px;"><strong>RECETA</strong></div>
                                                      <div style="font-size:11px;">
                                                            <table style="width:100%; border-collapse:collapse;">
                                                               <thead>
                                                                  <tr>
                                                                  
                                                                        <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>MEDICAMENTO</strong></th>
                                                                        <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>CANT.</strong></th>
                                                                        <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>UM</strong></th>
                                                                        <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>FRECUENCIA</strong></th>
                                                                        <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>PERIODO</strong></th>
                                                                        <th style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><strong>UT.</strong></th>
                                                                  </tr>
                                                               </thead>
                                                               <tbody>
                                                                  <?php   foreach ($atencion->receta  as $row): ?>
                                                                  <tr>
                                                                        <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->medicamento; ?></td>
                                                                        <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->cantidad; ?></td>
                                                                     
                                                                     <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->unidad_medida; ?></td> 
                                                                     <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->frecuencia; ?></td>
                                                                     
                                                                     <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->periodo; ?></td>
                                                                        <td style="text-align:center; border: 1px solid #bebdbd !important; border-width:1px 1px 1px 1px !important;"><?= $row->unidad_tiempo; ?></td>
                                                                  </tr>                    
                                                                  <?php endforeach; ?>
                                                               </tbody>
                                                            </table>
                                                      </div>



                                                </td>
                                             </tr>
                                             <tr
                                                valign="top"
                                                align="left"
                                                rowspan="1"
                                                colspan="1"
                                                >
                                                <td>
                                                   <div>
                                                      <table
                                                         width="100%"
                                                         cellpadding="0"
                                                         cellspacing="0"
                                                         border="0"
                                                         bgcolor="#ffffff"
                                                         >
                                                         <tbody>
                                                            <tr valign="top">
                                                               <td
                                                                  valign="top"
                                                                  align="left"
                                                                  rowspan="1"
                                                                  colspan="1"
                                                                  style="
                                                                  padding-top: 10px;
                                                                  text-align: left;
                                                                  "
                                                                  >
                                                                  <span>Atentamente,</span
                                                                     ><br clear="none" /><span
                                                                     ><b
                                                                     ><?= $atencion->empresa; ?></b
                                                                     ></span
                                                                     ><br clear="none" /><span
                                                                     ><b>Código IPRESS <?= $atencion->ruc_empresa; ?></b></span
                                                                     ><br clear="none" />
                                                               </td>
                                                            </tr>
                                                         </tbody>
                                                      </table>
                                                   </div>
                                                </td>
                                             </tr>
                                             <tr>
                                                <td rowspan="1" colspan="1">
                                                   <table
                                                      width="100%"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      border="0"
                                                      bgcolor="#ffffff"
                                                      align="center"
                                                      >
                                                      <tbody>
                                                         <tr>
                                                            <td
                                                               valign="top"
                                                               width="100%"
                                                               rowspan="1"
                                                               colspan="1"
                                                               style="color: #cccccc"
                                                               >
                                                               <hr color="#cccccc" size="1" />
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td rowspan="1" colspan="1">
                                                               <div>
                                                                  <table
                                                                     width="100%"
                                                                     cellpadding="0"
                                                                     cellspacing="0"
                                                                     border="0"
                                                                     bgcolor="#ffffff"
                                                                     align="center"
                                                                     >
                                                                     <tbody>
                                                                        <tr>
                                                                           <td
                                                                              valign="top"
                                                                              align="left"
                                                                              rowspan="1"
                                                                              colspan="1"
                                                                              style="
                                                                              padding-top: 10px;
                                                                              color: #707070;
                                                                              font-size: 12px;
                                                                              line-height: 14px;
                                                                              text-align: left;
                                                                              "
                                                                              >
                                                                              <span
                                                                                 style="
                                                                                 width: 100px !important;
                                                                                 "
                                                                                 ><a
                                                                                 href=" "
                                                                                 target="_blank"
                                                                                 rel="noopener noreferrer"
                                                                                 data-auth="NotApplicable"
                                                                                 data-linkindex="2"
                                                                                 ><img
                                                                                 src="<?= $_ENV['BASE_URL_FRONTEND']; ?>assets/images/logo_login.png"
                                                                                 alt="PoliclinicoLemarSalud"
                                                                                 style="width: 100px"></a
                                                                                 ></span>
                                                                              <br clear="none" />
                                                                              <div style="color: #828282">
                                                                                 <b
                                                                                    ></b
                                                                                    >
                                                                              </div>
                                                                           
                                                                              <br clear="none" />
                                                                           </td>
                                                                        </tr>
                                                                     </tbody>
                                                                  </table>
                                                               </div>
                                                            </td>
                                                         </tr>
                                                      </tbody>
                                                   </table>
                                                </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   </body>
</html>