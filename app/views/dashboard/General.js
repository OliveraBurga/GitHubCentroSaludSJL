

let DOM, DOM_ID ;
let Componente = {
    render: async (d, data) => {
        
        $('#main').off();
        d.innerHTML = `
        <style>
            h3{
                margin:0 !important;
            }

            p{
                margin:0 !important;
            }
        </style>
        <div id="main" style="display:none;">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            Hola <strong>`+data.usuario.nombre+`,</strong> te damos la bienvenida.
                        </h1>
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content" name="contenedor-dashboard">
                    <div class="row">
                        <div class="col-lg-3 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-aqua">
                            <div class="inner">
                            <h3 name="cantidad-atencion" class="contador_animate">0</h3>

                            <p>ATENCION</p>
                            </div>
                            <div class="icon">
                            <i class="fa fa-receipt"></i>
                            </div>
                            <a href="#/operacion/atencion" class="small-box-footer">Ver más <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-green">
                            <div class="inner">
                            <h3 name="cantidad_personal" class="contador_animate">0</h3>

                            <p>PERSONAL</p>
                            </div>
                            <div class="icon">
                            <i class="fa fa-file-invoice"></i>
                            </div>
                            <a href="#/configuracion/personal" class="small-box-footer">Ver más <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                        <!-- small box -->
                        <div class="small-box bg-yellow">
                            <div class="inner">
                            <h3 name="cantidad-manifiesto" class="contador_animate">0</h3>

                            <p>HISTORIA CLINICA</p>
                            </div>
                            <div class="icon">
                            <i class="fa fa-clipboard-list"></i>
                            </div>
                            <a href="#/configuracion/socio" class="small-box-footer">Ver más <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                        </div>
                        <!-- ./col -->
                   

                        

                      

                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-green">
                                <div class="inner">
                                <h3 name="cantidad-cliente" class="contador_animate">0</h3>
                                <p>CLIENTES  </p>
                                </div>
                                <div class="icon">
                                <i class="ion ion-person-add"></i>
                                </div>
                                <a href="#/configuracion/socio" class="small-box-footer">Ver más <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div> 

                            
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="box box-primary">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Tipos de Servicio</h3>                    
                                </div>
                                <div class="box-body">                                    
                                    <div id="dash_tipo_entrega" style="height: 200px; max-width: 920px; margin: 0px auto;"></div>
                                </div>                                
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="box box-primary">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Estado </h3>                    
                                </div>
                                <div class="box-body">                                    
                                    <div id="dash_resumen" style="height: 200px; max-width: 920px; margin: 0px auto;"></div>
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
                    type: "pie",
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
            
            DOM.find('h3[name="cantidad-atencion"]').attr('value_contador_animate', response.data.cantidad_atencion);
            DOM.find('h3[name="cantidad_personal"]').attr('value_contador_animate', response.data.cantidad_personal);
     
            DOM.find('h3[name="cantidad-cliente"]').attr('value_contador_animate', response.data.cantidad_cliente);

            
            HELPER.counter_animate(200, 0);

        }).catch(error => {
            console.log(error);
        }); 

    },

 
    
   
} 

export default Componente;