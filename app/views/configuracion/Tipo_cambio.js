

let DOM, DOM_ID ;
let Componente = {
    render: (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            Moneda / Tipo Cambio
                            <small>Configuración</small>
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
                                <div class="col-md-12">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>MONEDA</th>
                                                <th>SÍMBOLO</th>
                                                <th>CÓDIGO</th>
                                                <th>TIPO CAMBIO</th>
                                                <th>VISTA PANEL</th>
                                            </tr>
                                        </thead>
                                        <tbody name="detalle"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light-grey btn-sm" data-dismiss="modal" style="float:left;">Cancelar</button>
                            <button type="button" name="submit" class="btn btn-primary btn-sm">Guardar</button>
                        </div>
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->



        </div>            
        `;

        Componente.after_render();
    },

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        DOM.on('click', 'button[name="submit"]', function(e) {
            e.stopImmediatePropagation();

            Componente.submit();
            
        });
      

        Componente.get();        

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,

    /************ */
    
    get: async function() {
        
        axios.get(BASE_API + 'configuracion/tipo_cambio')
        .then(function(response) {

            let data = response.data;

            let form = DOM.find('form[name="save"]');

            let html_table = '';

            data.forEach(row => {
                if(row.id != 1)
                {
                    html_table += `
                        <tr data-id="`+row.id+`">
                            <td>`+row.nombre+`</td>
                            <td>`+row.simbolo+`</td>
                            <td>`+row.codigo+`</td>
                            <td><input type="number" step="any" data-name="tipo_cambio" class="form-control" value="`+row.tipo_cambio+`" /></td>
                            <td><input type="radio" name="codigo_publico" value="`+row.id+`" `+((row.fl_publico == 1) ? 'checked' : '')+` /></td>
                        </tr>
                    `; 
                }
                   
            });

            DOM.find('tbody[name="detalle"]').html(html_table);
            
            Componente.action_submit = 'save';

        }).catch(error => {
            console.log(error);
        }); 
    },
    
    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' button[name="submit"]');
        let formData = new FormData();

        let obj_filas = [];
        DOM.find('tbody[name="detalle"] tr').each(function(){

            obj_filas.push({
                id: $(this).data('id'),
                tipo_cambio: $(this).find('input[data-name="tipo_cambio"]').val()
            });

        });

        formData.append('detalle', JSON.stringify(obj_filas));
        formData.append('id_publico', DOM.find('input[name="codigo_publico"]:checked').val());

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/tipo_cambio/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            Componente.get();
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;