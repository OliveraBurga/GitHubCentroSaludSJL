

 import Numero_letra from '../recursivo/Numero_letras.js'
 
 let Componente = {
 
	print: async (data) => {

        try {


            let html = '<div style="max-width:842px; margin:auto;">';

            if(data.fl_estado == 0)
            {
                html += `
                
                <style>
                    #marca_agua_anulado {
                        position: relative;
                    }

                    .rotar_texto
                    {                
                        position: absolute;
                        margin-top:30%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-size:60px;
                        opacity: 0.5;
                    }

					.round {
						border-collapse: separate;
						border-spacing: 5;
						border: 1px solid #2cb2ff;
						border-radius: 8px;
						-moz-border-radius: 8px;
						padding: 2px;
					}

					td{
						font-size: 10px; 
					}

					th{
						font-size: 10px; 
					}

                </style>       

                <div id="marca_agua_anulado">
                    <span class="rotar_texto" style="color:#d5062a; font-weight:bold;">ANULADO</span>
                </div>`;
            }else{


				html += `
				<style>
					.round {
						border-collapse: separate;
						border-spacing: 5;
						border: 1px solid #2cb2ff;
						border-radius: 8px;
						-moz-border-radius: 8px;
						padding: 2px;
					}

					td{
						font-size: 10px; 
					}

					th{
						font-size: 10px; 
					}

				</style>`;
			}        
            
            html += `
 
             <table class="round" style="width:100%;">
                 <tr>
					<td style="width:25%; text-align:center;">
						<div><img src="`+BASE_FILES+`images/`+data.empresa.logo+`" style="max-height:80px;" width="150px"/></div>
						<div style="font-weight: bold;font-size:13px; text-align:center;">`+data.empresa.razon_social+`<span style="font-size:9px;">S.R.L</span></div>
						<div style="font-size:8px; text-align:center;">`+data.empresa.direccion+`</div>
						<div style="font-size:8px; text-align:center;">BAGUA GRANDE - UTCUBAMBA - AMAZONAS</div>
					</td>
					<td style="width:50%; text-align:center;">
						<div style="padding-bottom: 10px; padding-top: 5px;"><strong style="font-size:20px"> HISTORIA CLINICA</div>	
                        <div style="padding-bottom: 10px; padding-top: 5px;"><strong style="font-size:18px"> `+HELPER.fecha(data.fecha)+`</div>	

					</td>
					<td style="width:25%;text-align:center;">
						<div style="text-align:center; background-color:#2cb2ff !important; border: 1px solid #eeeeee !important; border-radius:8px;">
                             <div style="font-size:18px; padding-bottom: 10px; padding-top: 5px;display:none"><strong style="font-size:14px">Código IPRESS : `+data.empresa.numero_documento+`</strong></div>
                             <div style="font-weight:bold; font-size:20px; text-align:center; background-color:#2cb2ff !important; border: 2px solid #eeeeee !important; padding-left: 0px; box-shadow: 0px 0px 5px 1px #cecdcd; color: #fff;">HC:   `+data.historia_clinica+`</div>
                             <div style="font-weight:bold; font-size:18px; padding-top: 10px; padding-bottom: 5px;display:none"><strong>`+data.plan_atencion+`</strong></div>
                        </div>
					</td>
                 </tr>
                 <tr>
                     <td colspan="3" style="vertical-align:top;">
                         <!-- <div style="background-color:#fff !important; border: 1px solid #2cb2ff !important; border-radius:8px; margin-top:10px; padding:5px; min-height:80px; text-align:left;"> -->
                             <table style="width:100%; border-spacing: 0; padding: 0px;" class="round">
								<tr>
									<td class="round" colspan="4" style="padding: 0;background-color: #2cb2ff; color: #fff;text-align:center; font-weight: bold;font-size:12px; padding-top: 6px; padding-bottom: 6px;">DATOS DEL PACIENTE</td> 
								</tr>	
							 	<tr>
                                    <th style="width:15%;text-align:left;">NOMBRES</th>
                                    <td style="width:35%;">: `+data.nombre_paciente+`</td>
									<th style="width:15%;text-align:left;">APELLIDOS</th>
                                    <td style="width:35%;">: `+data.apellido_paciente+`</td>
                                </tr>
                                <tr>
                                    <th style="text-align:left;">TELÉFONO</th>
                                    <td>: `+data.telefono+`</td>
                                    <th style="text-align:left;">DNI</th>
                                    <td>: `+data.numero_documento+`</td>
                                </tr>
                            
                                <tr>
                                     <th style="text-align:left;">FECHA NACIMIENTO</th>
                                     <td>: `+HELPER.fecha(data.fecha_nacimiento)+`</td>
									 <th style="text-align:left;">EDAD</th>
                                     <td>: `+data.edad+`</td>
                                </tr>
                                <tr>
                                     <th style="text-align:left;">PESO</th>
                                     <td>: `+data.triaje.peso+`</td>
									 <th style="text-align:left;">TALLA</th>
                                     <td>: `+data.triaje.talla+`</td>
                                </tr>
                                 
                            
                                 
                             </table>
                         <!-- </div>                     -->
                     </td>
                 </tr>

                 <tr>
                     <td colspan="3">  
                         <table style="width:100%; border-spacing: 0; padding: 0px;" class="round">                           
                             <tbody>
                                <tr>
                                    <td class="round" colspan="6" style="padding: 0;background-color: #2cb2ff; color: #fff;text-align:center; font-weight: bold;font-size:12px; padding-top: 6px; padding-bottom: 6px;">DATOS DEL TRIAJE</td> 
                                </tr>
                                <tr>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#2cb2ff !important; border: 1px solid #2cb2ff !important; border-radius: 8px 0 0px 8px; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold; color: #eeeeee;">PRESIÓN ARTERIAL</div>
                                        </div> 
                                    </td>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#eeeeee !important; border: 1px solid #2cb2ff !important; border-radius: 0px 8px 8px 0px; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold;">`+data.triaje.presion_arterial+`</div>
                                        </div>
                                    </td>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#2cb2ff !important; border: 1px solid #2cb2ff !important; border-radius: 8px 0 0px 8px; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold; color: #eeeeee;">TEMPERATURA</div>
                                        </div>
                                    </td>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#eeeeee !important; border: 1px solid #2cb2ff !important; border-radius: 0px 8px 8px 0px; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold;">`+data.triaje.temperatura+`</div>
                                        </div>
                                    </td>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#2cb2ff !important; border: 1px solid #2cb2ff !important; border-radius: 8px 0 0px 8px; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold; color: #eeeeee;">FRECUENCIA RESPIRATORIA</div>
                                        </div>
                                    </td>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#eeeeee !important; border: 1px solid #2cb2ff !important; border-radius: 0px 8px 8px 0px;; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold;">`+data.triaje.frecuencia_respiratoria+`</div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#2cb2ff !important; border: 1px solid #2cb2ff !important; border-radius: 8px 0 0px 8px; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold; color: #eeeeee;">FRECUENCIA CARDIACA</div>
                                        </div> 
                                    </td>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#eeeeee !important; border: 1px solid #2cb2ff !important; border-radius: 0px 8px 8px 0px; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold;">`+data.triaje.frecuencia_cardiaca+`</div>
                                        </div>
                                    </td>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#2cb2ff !important; border: 1px solid #2cb2ff !important; border-radius: 8px 0 0px 8px; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold; color: #eeeeee;">SATURACIÓN</div>
                                        </div>
                                    </td>
                                    <td style="text-align:center;">
                                        <div style="text-align: center; background-color:#eeeeee !important; border: 1px solid #2cb2ff !important; border-radius: 0px 8px 8px 0px; margin-top:10px; padding:5px;">
                                            <div style="font-weight:bold;">`+data.triaje.saturacion+`</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                         </table>
                     </td>
                 </tr>
                 <tr>                      
                    <td colspan="3" style="vertical-align:top;">
                        <table class="round" style="width:100%;border-spacing: 0px; padding: 0px;">             
                            <tr>
                                <th style="width: 15%;border: 1px solid #2cb2ff; border-radius: 6px 0px 0px 0px; color: white;background-color: #2cb2ff;text-align:left;">MOTIVO</th>
                                <td style="width: 85%;border: 1px solid #2cb2ff; border-radius: 0px 6px 0px 0px;text-align:left;">: `+ data.motivo +`</td>
                            </tr>
                            <tr>
                                <th style="border: 1px solid #2cb2ff; color: white;background-color: #2cb2ff;text-align:left;">ANTECEDENTE</th>
                                <td style="border: 1px solid #2cb2ff; text-align:left;">: `+ data.antecedente +`</td>
                            </tr>
                            <tr>
                                <th style="border: 1px solid #2cb2ff; color: white;background-color: #2cb2ff;text-align:left;">EXAMEN FÍSICO</th>
                                <td style="border: 1px solid #2cb2ff; text-align:left;">: `+ data.examen_fisico +`</td>
                            </tr>
                            
                        </table>
                    </td>
                </tr>
                <tr>                      
                    <td colspan="3" style="width:100%;padding-right:6px;padding-left:6px;padding-top: 6px;">
                        <table class="round" style="width:100%;border-spacing: 0px; padding: 0px;">
                            <thead>
                                <tr>
                                    <th colspan="3" style="color: white;background-color: #2cb2ff; border-radius: 6px 6px 0px 0px; text-align:center;">DIAGNÓSTICO CIE10</th>
                                </tr>
                                <tr>
                                    <th style="width: 5%;color: white;background-color: #2cb2ff; text-align:center;">N°</th>
                                    <th style="width: 85%;color: white;background-color: #2cb2ff; text-align:left;">DESCRIPCIÓN</th>
                                    <th style="width: 10%;color: white;background-color: #2cb2ff; text-align:center;">TIPO</th>
                                </tr>
                            </thead>
                            <tbody>`;

                            let cont_d = 1;


                            data.diagnostico.forEach(row => {

                                html +=
                                    `<tr>
                                        <td style="border: 1px solid #2cb2ff;text-align:center;">`+ cont_d +`</td>
                                        <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.enfermedad +`</td>
                                        <td style="border: 1px solid #2cb2ff;text-align:center;">`+ row.tipo +`</td>
                                    </tr>`;

                                    cont_d++;

                            });

                            html +=
                            `</tbody>
                        </table>
                    </td>
                </tr>

                <tr>                      
                    <td colspan="3" style="width:100%;padding-right:6px;padding-left:6px;padding-top: 6px;">
                        <table class="round" style="width:100%;border-spacing: 0px; padding: 0px;">
                            <thead>
                                <tr>
                                    <th colspan="3" style="color: white;background-color: #2cb2ff; border-radius: 6px 6px 0px 0px; text-align:center;">PATOLOGIA CLINICA</th>
                                </tr>
                                <tr>
                                    <th style="width: 5%;color: white;background-color: #2cb2ff; text-align:center;">N°</th>
                                    <th style="width: 85%;color: white;background-color: #2cb2ff; text-align:left;">ANALISIS</th>
                                
                                </tr>
                            </thead>
                            <tbody>`;

                            let cont_a = 1;


                            data.patologia_clinica.forEach(row => {

                                html +=
                                    `<tr>
                                        <td style="border: 1px solid #2cb2ff;text-align:center;">`+ cont_a +`</td>
                                        <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.servicio +`</td>
                                     
                                    </tr>`;

                                    cont_a++;

                            });

                            html +=
                            `</tbody>
                            <tfoot> 
                                <tr>
                                    <td colspan="2" ><strong><div>Observación: </strong></div><div>`+data.observacion+`</div>  </td>
                                </tr>
                            </tfoot>


                        </table>
                    </td>
                </tr>



                <tr>                      
                    <td colspan="3" style="width:100%;padding-right:6px;padding-left:6px;padding-top: 6px;">
                        <table class="round" style="width:100%;border-spacing: 0px; padding: 0px;">
                            <thead>
                                <tr>
                                    <th colspan="2" style="color: white;background-color: #2cb2ff; border-radius: 6px 6px 0px 0px; text-align:center;">ANATOMIA PATOLOGICA</th>
                                </tr>
                                <tr>
                                    <th style="width: 5%;color: white;background-color: #2cb2ff; text-align:center;">N°</th>
                                    <th style="width: 85%;color: white;background-color: #2cb2ff; text-align:left;">NOMBRE</th>
                                
                                </tr>
                            </thead>
                            <tbody>`;

                            let cont_an = 1;


                            data.diagnostico_config.forEach(row => {

                                if (row.tipo == 'ANATOMIA PATOLOGICA') {
                                    
                                    html +=
                                    `<tr>
                                        <td style="border: 1px solid #2cb2ff;text-align:center;">`+ cont_an +`</td>
                                        <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.nombre +`</td>
                                     
                                    </tr>`;

                                    cont_a++;

                                }
                              

                            });

                            html +=
                            `</tbody>

                            <tfoot> 
                                <tr>
                                    <td colspan="2" ><strong><div>Observación: </strong></div><div>`+data.observacion_anatomia_patologica+`</div>  </td>
                                </tr>
                            </tfoot>



                        </table>
                    </td>
                </tr>


                <tr>                      
                    <td colspan="3" style="width:100%;padding-right:6px;padding-left:6px;padding-top: 6px;">
                        <table class="round" style="width:100%;border-spacing: 0px; padding: 0px;">
                            <thead>
                                <tr>
                                    <th colspan="3" style="color: white;background-color: #2cb2ff; border-radius: 6px 6px 0px 0px; text-align:center;">DIAGNOSTICO POR IMAGENES</th>
                                </tr>
                                <tr>
                                    <th style="width: 5%;color: white;background-color: #2cb2ff; text-align:center;">N°</th>
                                    <th style="width: 85%;color: white;background-color: #2cb2ff; text-align:left;">NOMBRE</th>
                                
                                </tr>
                            </thead>
                            <tbody>`;

                            let cont_anA = 1;


                            data.diagnostico_config.forEach(row => {

                                if (row.tipo == 'DIAGNOSTICO POR IMAGENES') {
                                    
                                    html +=
                                    `<tr>
                                        <td style="border: 1px solid #2cb2ff;text-align:center;">`+ cont_anA +`</td>
                                        <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.nombre +`</td>
                                    
                                    </tr>`;

                                    cont_anA++;

                                }
                            

                            });

                            html +=
                            `</tbody>
                            <tfoot> 
                                <tr>
                                    <td colspan="2" ><strong><div>Observación: </strong></div><div>`+data.observacion_diagnostico_imagenes+`</div>  </td>
                                </tr>
                            </tfoot>
                        </table>
                    </td>
                </tr>


                <tr>                      
                    <td colspan="3" style="width:100%;padding-right:6px;padding-left:6px;padding-top: 6px;">
                        <table class="round" style="width:100%;border-spacing: 0px; padding: 0px;">
                            <thead>
                                <tr>
                                    <th colspan="3" style="color: white;background-color: #2cb2ff; border-radius: 6px 6px 0px 0px; text-align:center;">INTERVENCION QUIRURGICA</th>
                                </tr>
                                <tr>
                                    <th style="width: 5%;color: white;background-color: #2cb2ff; text-align:center;">N°</th>
                                    <th style="width: 85%;color: white;background-color: #2cb2ff; text-align:left;">NOMBRE</th>
                                
                                </tr>
                            </thead>
                            <tbody>`;

                            let cont_ado = 1;


                            data.diagnostico_config.forEach(row => {

                                if (row.tipo == 'INTERVENCION QUIRURGICA') {
                                    
                                    html +=
                                    `<tr>
                                        <td style="border: 1px solid #2cb2ff;text-align:center;">`+ cont_ado +`</td>
                                        <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.nombre +`</td>
                                    
                                    </tr>`;

                                    cont_ado++;

                                }
                            

                            });

                            html +=
                            `</tbody>

                            <tfoot> 
                                <tr>
                                    <td colspan="2" ><strong><div>Observación: </strong></div><div>`+data.observacion_intervencion_quirurjica+`</div>  </td>
                                </tr>
                            </tfoot>

                        </table>
                    </td>
                </tr>




 
                <tr>                      
                <td colspan="3" style="width:100%;padding-right:6px;padding-left:6px;padding-top: 6px;">
                    <table class="round" style="width:100%;border-spacing: 0px; padding: 0px;">
                        <thead>
                            <tr>
                                <th colspan="7" style="color: white;background-color: #2cb2ff; border-radius: 6px 6px 0px 0px; text-align:center;">RECETA MEDICA</th>
                            </tr>
                            <tr>
                                <th style="width: 5%;color: white;background-color: #2cb2ff; text-align:center;">N°</th>
                                <th style="width: 20%;color: white;background-color: #2cb2ff; text-align:left;">Medicamento</th>
                                <th style="width: 10%;color: white;background-color: #2cb2ff; text-align:left;">Cantidad</th>
                                <th style="width: 10%;color: white;background-color: #2cb2ff; text-align:left;">Unidad de Medida </th>
                                <th style="width: 20%;color: white;background-color: #2cb2ff; text-align:left;">Frecuencia</th>
                                <th style="width: 15%;color: white;background-color: #2cb2ff; text-align:center;">Periodo </th>
                                <th style="width: 15%;color: white;background-color: #2cb2ff; text-align:center;">Unidad de tiempo </th>
                            </tr>
                        </thead>
                        <tbody>`;

                        let cont_r = 1;


                        data.receta.forEach(row => {

                            html +=
                                `<tr>
                                    <td style="border: 1px solid #2cb2ff;text-align:center;">`+ cont_r +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.medicamento +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:center;">`+row.cantidad +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:left;">`+ row.unidad_medida +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.frecuencia +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:left;">`+ row.periodo +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:center;">`+row.unidad_tiempo +`</td>
                                </tr>`;

                                cont_r++;

                        });

                        html +=
                        `</tbody>
                    </table>
                </td>
            </tr>
                 



            
            <tr>                      
            <td colspan="3" style="width:100%;padding-right:6px;padding-left:6px;padding-top: 6px;">
                <table class="round" style="width:100%;border-spacing: 0px; padding: 0px;">
                    <thead>
                        <tr>
                            <th colspan="3" style="color: white;background-color: #2cb2ff; border-radius: 6px 6px 0px 0px; text-align:center;">SIGNO DE PELIGRO </th>
                        </tr>
                        <tr>
                            <th style="width: 5%;color: white;background-color: #2cb2ff; text-align:center;">N°</th>
                            <th style="width: 85%;color: white;background-color: #2cb2ff; text-align:left;">SIGNO</th>
                            <th style="width: 10%;color: white;background-color: #2cb2ff; text-align:center;">SI/NO</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <th colspan="3" style="border: 1px solid #2cb2ff;text-align:center;">A) MENOR A 2 MESES</th>
                           
                            </tr>
                    
                    
                    `;

                    let cond = 1;


                    data.signo_peligro.forEach(row => {

                        if (row.tipo == 1 ) {
                            html +=
                            `<tr>
                                <td style="border: 1px solid #2cb2ff;text-align:center;">`+ cond +`</td>
                                <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.signo +`</td>
                                <td style="border: 1px solid #2cb2ff;text-align:center;">${ row.fl_estado ==1 ? 'SI' : 'NO' }</td>
                            </tr>`;

                            cond++;
                        }
                       

                    });

                    html +=
                    `
                        <tr>
                            <th colspan="3" style="border: 1px solid #2cb2ff;text-align:center;">B) DE DOS MESES A 4 AÑOS</th>
                    
                        </tr>
                    
                        `;

                        let cont_d1 = 1;


                        data.signo_peligro.forEach(row => {

                            if (row.tipo == 2 ) {
                                html +=
                                `<tr>
                                    <td style="border: 1px solid #2cb2ff;text-align:center;">`+ cont_d1 +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.signo +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:center;">${ row.fl_estado ==1 ? 'SI' : 'NO' }</td>
                                </tr>`;

                                cont_d1++;
                            }
                           

                        });

                        html +=
                        `
                        <tr>
                            <th  colspan="3" style="border: 1px solid #2cb2ff;text-align:center;"> C) DE DOS MESES A 4 AÑOS</th>
                    
                        </tr>

                        `;

                        let cont_d2 = 1;


                        data.signo_peligro.forEach(row => {
                            if (row.tipo == 3 ) {
                                html +=
                                `<tr>
                                    <td style="border: 1px solid #2cb2ff;text-align:center;">`+ cont_d2 +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:left;">`+row.signo +`</td>
                                    <td style="border: 1px solid #2cb2ff;text-align:center;">${ row.fl_estado ==1 ? 'SI' : 'NO' }</td>
                                </tr>`;

                                cont_d2++;
                            }
                           
                        });

                        html +=
                        `

                    </tbody>
                </table>
            </td>
        </tr>


            <tr>
                <td style="padding-right:20px;padding-left:20px;padding-top: 40px;" colspan="3">
                    <table  style="width:100%;border-collapse: collapse;" >
                        <tr>
                        <td style="width:33% ;text-align: center;font-weight: bold;font-size: 11px;">  </td>
                        <td style="width:33% ;text-align: center;font-weight: bold;font-size: 11px;">  </td>

                            <td style="width:34% ;text-align: center;font-weight: bold;font-size: 11px;">
                         
                            <div style="border: 0px solid #000; border-radius: 10px; width: 260px; margin: auto; text-align: center; padding: 10px; margin-top:20px;">
                                <span>`+((data.imagen_firma != null) ? '<img src="'+BASE_FILES+'images/'+data.imagen_firma+'" style="width:120px;" />' : '' )+`</span>
                                <p style="margin-top:0px;">-------------------------------</p>
                                <div style="line-height: 5px;">
                                    <p>${data.personal}</p>
                                </div>
                            </div>

                            </td>
                            
                        </tr>

                    </table>
                </td>
            </tr>


             </table>`;

            HELPER.print(html);

        }catch (error) {
            console.error(error);
        }
    },







 } 
 
 export default Componente;