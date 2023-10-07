

let DOM, DOM_ID ;
let Componente = {
    render: async (d, data) => {
        console.log(data);
        $('#main').off();
        d.innerHTML = `
       
    
       

        <style>
        

            h3{
                margin:0 !important;
            }

            p{
                margin:0 !important;
            }

            .main-part{
                width:100%;
                margin:0 auto;
                text-align: center;
           
                }
                .cpanel{
                width:100%;
                display: inline-block;
                background-color:#34495E;
                color:#fff;
                margin-top: 30px;
                }
                .icon-part i{
                font-size: 30px;
                padding:10px;
                border:1px solid #fff;
                border-radius:50%;
                margin-top:-25px;
                margin-bottom: 10px;
                background-color:#34495E;
                }
                .icon-part p{
                margin:0px;
                font-size: 20px;
                padding-bottom: 10px;
                }
                .card-content-part{
                background-color: #2F4254;
                padding: 5px 0px;
                }
                .cpanel .card-content-part:hover{
                background-color: #5a5a5a;
                cursor: pointer;
                }
                .card-content-part a{
                color:#fff;
                text-decoration: none;
                }
                .cpanel-green .icon-part,.cpanel-green .icon-part i{
                background-color: #16A085;
                }
                .cpanel-green .card-content-part{
                background-color: #149077;
                }
                .cpanel-orange .icon-part,.cpanel-orange .icon-part i{
                background-color: #F39C12;
                }
                .cpanel-orange .card-content-part{
                background-color: #DA8C10;
                }
                .cpanel-blue .icon-part,.cpanel-blue .icon-part i{
                background-color: #2980B9;
                }
                .cpanel-blue .card-content-part{
                background-color:#2573A6;
                }
                .cpanel-red .icon-part,.cpanel-red .icon-part i{
                background-color:#E74C3C;
                }
                .cpanel-red .card-content-part{
                background-color:#CF4436;
                }
                .cpanel-skyblue .icon-part,.cpanel-skyblue .icon-part i{
                background-color:#8E44AD;
                }
                .cpanel-skyblue .card-content-part{
                background-color:#803D9B;
                }
              

        </style>
        <div id="main" style="display:none;">

      
     

            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-12 content-header" style="padding-top:5px;">

                   
                    <div class="box box-widget widget-user">
                        <div class="widget-user-header bg-aqua-active">
                            <h3 class="widget-user-username">`+data.usuario.nombre+` `+data.usuario.apellido+`</h3>
                            <h5 class="widget-user-desc">`+data.usuario.tipo+`  </h5>
                        </div>
                        <div class="widget-user-image">
                            <img class="img-circle" src="${BASE_FILES}images/${data.usuario.imagen}" alt="User Avatar" />
                        </div>
                   
                    </div>
 


 
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content" name="contenedor-dashboard">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">


                            <div class="col-lg-6 col-xs-6">
                            <div class="main-part">
                                    <div class="cpanel">
                                        <div class="icon-part">
                                        <i class="fa fa-receipt" aria-hidden="true"></i><br />
                                            <small>ATENCION</small>
                                            <p  name="cantidad-atencion"  class="contador_animate"> </p>
                                        </div>
                                        <div class="card-content-part">
                                            <a href="#/operacion/atencion"  class="uppercase">Ver Las Atenciones </a>
                                        </div>
                                    </div>
                                    </div>
                            </div>

                            <div class="col-lg-6 col-xs-6">
                                <div class="main-part">
                                <div class="cpanel cpanel-red">
                                <div class="icon-part">
                                    <i class="fa fa-file-invoice" aria-hidden="true"></i><br />
                                    <small>PERSONAL MEDICO</small>
                                    <p name="cantidad_personal"  class="contador_animate"> </p>
                                </div>
                                <div class="card-content-part">
                                    <a ref="#/configuracion/personal"  class="uppercase">Ver el Personal Medico</a>
                                </div>
                            </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-xs-6">
                            <div class="main-part">
                                        <div class="cpanel cpanel-orange">
                                            <div class="icon-part">
                                                <i class="fa fa-clipboard-list"aria-hidden="true"></i><br />
                                                <small>HISTORIA CLINICA</small>
                                                <p name="cantidad-manifiesto"  class="contador_animate">   </p>
                                            </div>
                                            <div class="card-content-part">
                                                <a href="#/operacion/plan_atencion"  class="uppercase">Ver las   Historias clinicas</a>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            <div class="col-lg-6 col-xs-6">
                                <div class="main-part">
                                        <div class="cpanel cpanel-blue">
                                        <div class="icon-part">
                                        <i class="ion ion-person-add"></i><br />
                                            <small>PACIENTES</small>
                                            <p  name="cantidad-cliente"  class="contador_animate"> </p>
                                        </div>
                                        <div class="card-content-part">
                                            <a href="#/configuracion/socio" class="uppercase">Ver mas pacientes </a>
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>



                 
                            <div class="col-lg-8 col-xs-8" style="margin-top: 30px;">
                                <div class="row">

                                <div class="col-md-12">
                                    <div class="box box-danger">
                                        <div class="box-header with-border">
                                            <h3 class="box-title">Usuarios </h3>
                                            <div class="box-tools pull-right">
                                                <span class="label label-danger"> Usuarios</span>
                                         
                                            </div>
                                        </div>

                                        <div class="box-body no-padding">
                                            <ul class="users-list clearfix" name="usuarios">
                                           
                                                 
                                            </ul>
                                        </div>

                                        <div class="box-footer text-center">
                                            <a href="#/configuracion/usuario" class="uppercase">Ir</a>
                                        </div>
                                    </div>
                                </div>

                                </div>
                            </div>
                            <div class="col-lg-4 col-xs-4" style="margin-top: 30px;">
                                <div class="row"> 
                                 
                                        <div class="col-md-12 col-sm-12 col-xs-12">
                                            <div class="info-box">
                                                <span class="info-box-icon bg-aqua">   <i class="ion ion-person-add"></i></span>
                                                <div class="info-box-content">
                                                    <span class="info-box-text">Usuarios</span>
                                                    <span   class="contador_animate" name="user" style="    display: block;font-weight: bold;font-size: 18px;"> </span>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="col-md-12 col-sm-12 col-xs-12">
                                            <div class="info-box">
                                                <span class="info-box-icon bg-red">  <i class="fa fa-receipt" aria-hidden="true"></i></span>
                                                <div class="info-box-content">
                                                    <span class="info-box-text">Diagnostico</span>
                                                    <span   class="contador_animate" name="diagnostico" style="    display: block;font-weight: bold;font-size: 18px;"> </span>
                                                </div>
                                            </div>
                                        </div>


                                    

                                </div>

                            </div>


                            </div>

                        </div>
                        <div class="col-md-6" style="margin-top: 30px;">
                            <div class="row">
                                <div class="col-lg-12 col-xs-12">
                                    <div class="box box-primary">
                                        <div class="box-header with-border">
                                            <h3 class="box-title">Tipos de Servicio</h3>                    
                                        </div>
                                        <div class="box-body">                                    
                                            <div id="dash_tipo_entrega" style="height: 200px; max-width: 920px; margin: 0px auto;"></div>
                                        </div>                                
                                    </div>
                                </div>
                                <div class="col-lg-12 col-xs-12">
                                    <div class="box box-primary">
                                        <div class="box-header with-border">
                                            <h3 class="box-title">Atencion de los 3 ultimos Dias </h3>                    
                                        </div>
                                        <div class="box-body">                                    
                                            <div id="dash_resumen" style="height: 200px; max-width: 920px; margin: 0px auto;"></div>
                                        </div>                              
                                    </div>


                                </div>
                            </div>
                        </div>


                        

                            
                    </div>
               
                </section>

            </section>


 
       
          

        </div>            
        `;

        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        Componente.get_usuarios();
        Componente.dash_tipo_entrega();
        Componente.dash_resumen();
        Componente.get_cantidades();
    
        if(DATA_USER.usuario.fl_no_dashboard == 1)
        {
            DOM.find('section[name="contenedor-dashboard"]').remove();
        }

        $('#main').fadeIn(500);
        HELPER.load_component();
    },
    

    dash_tipo_entrega : () => {

        axios.get(BASE_API+'dashboard/dashboard/dash_tipo_entrega')
        .then(function (response) {
            
            console.log(response);
            let chart = new CanvasJS.Chart("dash_tipo_entrega", {
                theme: "light2", // "light1", "light2", "dark1", "dark2"
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: ""
                },
                data: [{
                    type: "pyramid",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: response.data,


                
                    /*dataPoints: [
                        { y: 51.08, label: "Entregados" },
                        { y: 27.34, label: "Registrados" },
                        { y: 10.62, label: "Pendientes de Entrega" },
                        { y: 5.02, label: "Microsoft Edge" },
                        { y: 4.07, label: "Safari" },
                        { y: 1.22, label: "Opera" },
                        { y: 0.44, label: "Others" }
                    ]*/
                }]
            });

            chart.render();

        }).catch(error => {
            console.log(error);
        }); 

    },

    dash_resumen : () => {

        axios.get(BASE_API+'dashboard/dashboard/dash_resumen')
        .then(function (response) {

            console.info(response.data);
            
            let chart = new CanvasJS.Chart("dash_resumen", {
                animationEnabled: true,
                theme: "light2", // "light1", "light2", "dark1", "dark2"
                title: {
                    text: ""
                },
                subtitles: [{
                    text: "",
                    fontSize: 16
                }],
                axisY: {
                    scaleBreaks: {
                        customBreaks: [{
                            startValue: 10000,
                            endValue: 35000
                        }]
                    }
                },
                data: [{
                    type: "column",
                    dataPoints: response.data
                }]
            });
            chart.render();
            

        }).catch(error => {
            console.log(error);
        }); 

    },

    get_cantidades : () => {

        axios.get(BASE_API+'dashboard/dashboard/get_cantidades')
        .then(function (response) {
            
            DOM.find('p[name="cantidad-atencion"]').attr('value_contador_animate', response.data.cantidad_atencion);
            DOM.find('p[name="cantidad_personal"]').attr('value_contador_animate', response.data.cantidad_personal);
     
            DOM.find('p[name="cantidad-cliente"]').attr('value_contador_animate', response.data.cantidad_cliente);

                    
            DOM.find('p[name="cantidad-manifiesto"]').attr('value_contador_animate', response.data.cantidad_atencion);

            DOM.find('span[name="user"]').attr('value_contador_animate', response.data.usuario);
            DOM.find('span[name="diagnostico"]').attr('value_contador_animate', response.data.diagnostico);


        /*     DOM.find('p[name="cantidad-atencion"]').text( response.data.cantidad_atencion);
            DOM.find('p[name="cantidad_personal"]').text( response.data.cantidad_personal);
     
            DOM.find('p[name="cantidad-cliente"]').text( response.data.cantidad_cliente); */

            HELPER.counter_animate(200, 0);

        }).catch(error => {
            console.log(error);
        }); 

    },

 
    get_usuarios : () => {

        axios.get(BASE_API+'dashboard/dashboard/usuarios')
        .then(function (response) {
            
            let html = '';
        
            response.data.forEach(row => {

                html+= ` 
                
                <li>
                    <img src="${BASE_FILES}images/${row.imagen}" alt="User Image" />
                    <a class="users-list-name" href="javascript:">${row.nombre}</a>
                    <span class="users-list-date">${row.tipo}</span>
                </li>`;

            
                

          });
         
          DOM.find('ul[name="usuarios"]').html(html);
        }).catch(error => {
            console.log(error);
        }); 

    },
    
   
} 

export default Componente;