let HELPER = {

        separador_miles: (number) => {
            const exp = /(\d)(?=(\d{3})+(?!\d))/g;
            const rep = '$1,';
            let arr = number.toString().split('.');
            arr[0] = arr[0].replace(exp,rep);
            return arr[1] ? arr.join('.'): arr[0];
        },
    abr_medida: (nombre) => {
        let abreviado = '';

        switch (nombre) {
            case 'UNIDADES':
                abreviado = 'UND';
            break;
        
            case 'PESO':
                abreviado = 'KG';
            break;

            case 'VOLUMEN':
                abreviado = 'VOL';
            break;
        }

        return abreviado;
    },

    esNumero: (dato) => {
        /*Definición de los valores aceptados*/
        var valoresAceptados = /^[0-9]+$/;
        if (dato.indexOf(".") === -1 ){
            if (dato.match(valoresAceptados)){
                return true;
            }else{
                return false;
            }
        }else{
            //dividir la expresión por el punto en un array
            var particion = dato.split(".");
            //evaluamos la primera parte de la división (parte entera)
            if (particion[0].match(valoresAceptados) || particion[0]==""){
                if (particion[1].match(valoresAceptados)){
                    return true;
                }else {
                    return false;
                }
            }else{
                return false;
            }
        }
    },

    currency:(value) => {

        value = parseFloat(HELPER.round(value, 2));
        return value.toLocaleString('es-PE', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    },

    round:(value, decimals) => {

        return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
    },

    array_unique: (array_data) => {

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        return array_data.filter(onlyUnique);
    },
    
    scanner_timer_waiting: (decodedText, time_interval = 1000) => {

        let fl_get_scanner = false;

        let tiempo_actual = moment().format('YYYY-MM-DD HH:mm:ss')

        if(localStorage.getItem('tiempo_ultimo_escaneo') === null)
        {  
            localStorage.setItem('tiempo_ultimo_escaneo', tiempo_actual);
            fl_get_scanner = true;
        }
        else
        {  
            let tiempo_ultimo_escaneo = moment(localStorage.getItem('tiempo_ultimo_escaneo'), "YYYY-MM-DD HH:mm:ss").format('YYYY-MM-DD HH:mm:ss');

            let diff  = moment(tiempo_actual).diff(moment(tiempo_ultimo_escaneo));

            let f = moment.utc(diff).format("x");

            if(f > time_interval)
            {
                /*console.log('Ultimo escaneo: '+localStorage.getItem('tiempo_ultimo_escaneo'));
                console.log('Ultimo: '+tiempo_ultimo_escaneo);
                console.log('Actual: '+tiempo_actual);
                console.log('Diferencia: '+f);
                console.log('*************');*/
                
                fl_get_scanner = true;
                localStorage.setItem('tiempo_ultimo_escaneo', tiempo_actual);
            }
            
        }

        if(fl_get_scanner == true)
        {
            let audio = document.getElementById("scanner_beep"); 
            audio.play(); 

            return decodedText;

            //console.log(`Code scanned = ${decodedText}`, decodedResult);
            //HELPER.notificacion(decodedText, 'success');      

        }   
        else
        {
            return null;
        }

    },

    scanner_camera: async (id_element = 'qrcode') => {

        let comp_scanner = await import(BASE_URL+'app/config/Scanner_camera.js');

        let html5QrCode = new Html5QrcodeScanner(
            "qr-reader", { fps: 10});

        html5QrCode.render(comp_scanner.default.onScanSuccess,);        
    },

    
    counter_animate: (speed = 200, cantidad_decimal = 0) => {

        const counters = document.querySelectorAll('.contador_animate');

        counters.forEach( counter => {
        const animate = () => {
            const value = +counter.getAttribute('value_contador_animate');
            const data = +counter.innerText;
            
            const time = value / speed;
            if(data < value) {
                counter.innerText = Math.ceil(data + time).toFixed(cantidad_decimal);
                setTimeout(animate, 1);
            }else{
                counter.innerText = parseFloat(value).toFixed(cantidad_decimal);
            }
            
        }
        
        animate();
        });
    },

    sleep: (milliseconds=500) => new Promise(resolve => setTimeout(resolve, milliseconds)),

    zero_fill: (value, width, complete = '0') => {

        width -= value.toString().length;

        if ( width > 0 )
        {
          return new Array( width + (/\./.test( value ) ? 2 : 1) ).join( complete ) + value;
        }

        return value + ""; // always return a string
    },
    
    show_window_float: () => {
        $('header[class="main-header"]').remove();
        $('aside[class="main-sidebar"]').remove();
        $('body').removeAttr('class');
        $('body').attr('class', 'skin-blue layout-top-nav');
    },
    
    set_column_datatable: (columnas_datatable, response_server) => {

        if(response_server.data.view_datatable != null && response_server.data.view_datatable != '[]')
        {
            let columnas_create = columnas_datatable;
            
            let json_config =JSON.parse(response_server.data.view_datatable);

            let new_obj_column = [];
            
            for (let i=0; i<json_config.length; i++) {

                Object.keys(columnas_create).forEach(function (key){
                    if(json_config[i].title == columnas_create[key].title)
                    {
                        new_obj_column[i] = columnas_create[key];
                    }
                });  
            }

            columnas_datatable = new_obj_column;
        }
        
        return columnas_datatable;

    },

    get_tipo_cambio: async (id_moneda) => {

        let response_return = 0;

        await axios.get(BASE_API + 'configuracion/tipo_cambio/get/'+id_moneda)
        .then(function (response) {

            response_return = response.data.tipo_cambio; 

        }).catch(error => {
            console.log(error);
        }); 

        return response_return;
    },
    
    get_location: () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            console.log(position);
            /*location['lat'] = position.coords.latitude;
            location['lng'] = position.coords.longitude;*/

        });

        } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
        }
    },

    print: async (content, fl_auto_print = false) =>{
        let codigo_aleatorio = Math.random().toString(36).substr(2);
        let html = `
            <html>
                <head>
                    <title>Impresión</title>    
                    <style>
                        body, td, tr, th, span, p{
                            font-family:Tahoma;
                            font-size:12px;
                        }

                        @media print
                        {
                            .noPrint{display:none;}
                        }

                        .btn_print {
                            margin-bottom:10px;
                            position:relative;
                            width: auto;
                            color:#ecf0f1;
                            text-decoration:none;
                            border-radius:5px;
                            border:solid 1px #f39c12;
                            background:#e67e22;
                            text-align:center;
                            padding:12px 18px 10px;
                            font-weight:bold;
                            font-size:14px !important;
                          
                            -webkit-transition: all 0.1s;
                            -moz-transition: all 0.1s;
                            transition: all 0.1s;
                          
                            -webkit-box-shadow: 0px 6px 0px #d35400;
                            -moz-box-shadow: 0px 6px 0px #d35400;
                            box-shadow: 0px 6px 0px #d35400;
                            cursor:pointer;
                          }

                          .btn_print:active{
                            -webkit-box-shadow: 0px 2px 0px #d35400;
                            -moz-box-shadow: 0px 2px 0px #d35400;
                            box-shadow: 0px 2px 0px #d35400;
                            position:relative;
                            top:4px;
                          }

                          @media all {
                            div.saltopagina{
                                display: none;
                            }
                          }
                            
                          @media print{
                            div.saltopagina{
                                display:block;
                                page-break-before:always;
                            }
                          }

                        .table-bordered {
                            border: 1px solid #f4f4f4;
                        }

                        .table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
                            border: 1px solid #ddd;
                        }

                        table {
                            border-collapse: collapse;
                            border-spacing: 0;
                        }


                    </style>   
                    
                </head>
                <body>
                    <div class="noPrint" style="text-align:center;"> <button class="btn_print" onclick="window.print();">CLICK PARA IMPRIMIR</button></div>
                    <div style="width:100%;">
                        `+content+`
                    </div>
                </body>
            </html>
        `;

        let ventana = window.open(' ', 'popimpr'+codigo_aleatorio);
        ventana.document.write(html);
        ventana.document.close();

        if(fl_auto_print == true)
        {
            ventana.onload = function() {
                ventana.print();
            };
        }        

        ventana.onafterprint =  function(){
            ventana.close();
        }

        ventana.focus();

    },

    fecha_hora: (fecha_hora = null, formato = 'DD/MM/YYYY HH:mm:ss') => {
        
        moment.locale('es');   

        let parsed = moment(fecha_hora, "YYYY-MM-DD HH:mm:ss").format(formato);

        if(fecha_hora == null)
        {
            parsed = moment().format(formato);
        }        

        return parsed;
    },

    fecha: (fecha = null, formato = 'DD/MM/YYYY') => {
        
        moment.locale('es');   

        let parsed = moment(fecha, "YYYY-MM-DD").format(formato);

        if(fecha == null)
        {
            parsed = moment().format(formato);
        }

        return parsed;
    },

    fecha_completo: (fecha_hora = null) => {
        
        moment.locale('es');   

        let parsed = moment(fecha_hora, "YYYY/MM/DD HH:mm:ss").format('LLLL');

        if(fecha_hora == null)
        {
            parsed = moment().format('LLLL');
        }
        

        return parsed;
    },

    fecha_ano: function()
    {
        moment.locale('es'); 

        let date = new Date();
        return date.getFullYear();
    },

    fecha_actual: function()
    {
        moment.locale('es'); 
        
        let date = new Date();

        let dia = date.getDate();
        let mes = date.getMonth()+1;

        if(dia<10){ dia='0'+dia; }
        if(mes<10){ mes='0'+mes; }

        return date.getFullYear()+'-'+mes+'-'+dia;
    },

    hora_actual: function()
    {
        moment.locale('es');   

        let parsed = moment().format('HH:mm');        

        return parsed;
    },

    primer_dia_mes: function()
    {
        moment.locale('es'); 
        
        let primerDia = new Date(new Date().getFullYear(), new Date().getMonth(), 1);   
        return moment(primerDia).format('YYYY-MM-DD');

    },

    primer_dia_semana: function()
    {
        moment.locale('es'); 
        let primerDia = moment().startOf('week').toDate();
        return moment(primerDia).format('YYYY-MM-DD');

    },

    ladda:(id_dom)  => {

        let ladda = Ladda.create(document.querySelector(id_dom));
        ladda.start();

        return ladda;

    },

    reset_form: function(d) {
        d.trigger("reset");
        d.get(0).reset();
        d.find('textarea').text('');
        d.find('select').val("").change();
    },

    load_component: function()
    {
        /** SCROLL 
        $('.modal-body').slimScroll({
            height: "auto"
        });

        $('.table-responsive').slimScroll({
            height: "auto"
        });
        */

        $('.select').select2({
            minimumResultsForSearch: -1
        });

        /** TODOS LOS INPUT A MAYÙSCULAS */

        $(document).on('keyup', 'input[type="text"]', function(e) {
            e.stopImmediatePropagation();
            let input=$(this);

            /** EN MAYUSCULAS ALGUNOS CAMPOS NO */
            if(input.data('mayus') != false)
            {
                input.val(input.val().toUpperCase());
            }
        });

        $('[data-toggle="tooltip"]').tooltip();
    },

    preview_image: function(input, dom) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                dom.attr('src', e.target.result);
                dom.hide();
                dom.fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    },

    get_attr_json: function(row) {
        let tr = row.parents('tr');
        let obj = JSON.parse(tr[0].dataset.json);

        return obj;
    },

    notificacion: function(mensaje, tipo = 'info', delay_forced = null) {

        let delay = 1000;
        let icono = '';
        let titulo = '';

        if (tipo == 'success') {
            icono = 'fa fa-check';
            titulo = 'Éxito';
        }
        if (tipo == 'info') {
            icono = 'fa fa-exclamation-circle';
            titulo = 'Información';
        }
        if (tipo == 'danger') {
            icono = 'fa fa-exclamation-triangle';
            titulo = 'Alerta Crítica';
            delay = 60000;
        }
        if (tipo == 'warning') {
            icono = 'fas fa-engine-warning';
            titulo = 'Adventencia';
            delay = 5000;
        }
        
        if(delay_forced != null)
        {
            delay = delay_forced;
        }

        

        $.notify({
            // options
            icon: icono,
            title: titulo,
            message: mensaje
        }, {
            // settings
            element: 'body',
            position: null,
            type: tipo,
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "center"
            },
            offset: 20,
            spacing: 10,
            z_index: 10000031,
            delay: delay,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onClosed: null,
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                '<div data-notify="title"><strong><span data-notify="icon"></span> {1}</strong></div> ' +
                '<span data-notify="message">{2}</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '<a href="{3}" target="{4}" data-notify="url"></a>' +
                '</div>'
        });

    },

    strtrunc: (str, max, add) => {
        add = add || '...';
        return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
    },

    download: function(url)
    {
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
              console.log(response.headers);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            var nombre_archivo = (response.headers["content-disposition"].split("filename=")[1]).slice(0, -1);
            nombre_archivo = nombre_archivo.substring(1)
            link.setAttribute('download', nombre_archivo);
            document.body.appendChild(link);
            link.click();
          });
    },

    isDark: function(color_hex) {
        
        var r = parseInt(((color_hex.charAt(0)=="#") ? color_hex.substring(1,7):color_hex).substring(0,2),16);
        var g = parseInt(((color_hex.charAt(0)=="#") ? color_hex.substring(1,7):color_hex).substring(2,4),16);
        var b = parseInt(((color_hex.charAt(0)=="#") ? color_hex.substring(1,7):color_hex).substring(4,6),16);

        var color_rgb = 'rgb('+r+','+g+','+b+')';

        var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(color_rgb);
        var result = ( match[1] & 255 )
             + ( match[2] & 255 )
             + ( match[3] & 255 )
               < 3 * 256 / 2;

        if(result)
        {
            return '#fff';
        }
        else
        {
            return '#000';
        }
    },

    active_sidebar: function(menu) {

        menu = 'sidebar-'+menu;

        $('#side-menu li').removeClass('active');
        $('#side-menu li').removeClass('menu-open');
        $('.treeview-menu').css('display', 'none');


        var particion = menu.split("-");

        switch (particion.length) {
            case 3:
                $('#' + particion[0] + '-' + particion[1]).addClass('active');
                $('#' + particion[0] + '-' + particion[1]).addClass('menu-open');
                $('#' + particion[0] + '-' + particion[1] + ' > .treeview-menu').css('display', 'block');
                break;

            case 4:
                $('#' + particion[0] + '-' + particion[1]).addClass('active');
                $('#' + particion[0] + '-' + particion[1]).addClass('menu-open');
                $('#' + particion[0] + '-' + particion[1] + ' > .treeview-menu').css('display', 'block');

                $('#' + particion[0] + '-' + particion[1] + '-' + particion[2]).addClass('active');
                $('#' + particion[0] + '-' + particion[1] + '-' + particion[2]).addClass('menu-open');
                $('#' + particion[0] + '-' + particion[1] + '-' + particion[2] + ' > .treeview-menu').css('display', 'block');
                break;
            default:

        }

        $('#' + menu).addClass('active');
    },


}

export default HELPER;