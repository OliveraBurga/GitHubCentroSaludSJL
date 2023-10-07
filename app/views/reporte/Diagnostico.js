
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
                            Diagnóstico
                            <small>Reporte</small>
                        </h1>
                    </div>
                    
                </div>
                </section>

                <!-- Main content -->
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
                          <label>Diagnostico <small> </small></label>
                          <div class="form-group">
                          <select name="id_diagnostico" data-select="DIAGNOSTICO" class="form-control"></select>
                          </div>                              
                      </div>
                  </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <label>Paciente </label>
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
                <div class="box box-info">
                    <div class="box-body">
                    <div class="table-responsive">
                        <table name="registros" class="table table-striped" style="width:100%;"></table>
                    </div>
                    </div>
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->

           
            

        </div>            
        `;

        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        
        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());

                /* DATATABLE UPDATE*/
                DOM.on('click', 'button[name="update_datatable"]', function(e) {
                    e.stopImmediatePropagation();
                    Componente.table.ajax.reload(null, false);
                });
        

        Componente.select_paciente();
        Componente.select_diagnostico();
        Componente.datatable();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,

    /************ */
     

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:   {
                url: BASE_API + 'reporte/diagnostico',
                data: function (d) {
                    
                    d.id_paciente =  DOM.find('select[name="id_paciente_filtro"]').val();
                    d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                    d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                    d.id_diagnostico= DOM.find('select[name="id_diagnostico"]').val();
                }
        },


          
            columns: [         

                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'CÓDIGO', mData: 'codigo' },
                { title: 'DIAGNOSTICO', mData: 'enfermedad' },
                { title: 'N° ATENCION', mData: 'atencion' },
 
                { title: 'PERSONAL MEDICO', mData: 'personal' },
        
                { title: 'PACIENTE', render: function(data, type, row) { 


                    let html =row.numero_documento +' | '+row.paciente ;

                        

                        return html;
                    }, class: 'text-center'
                
                },

                { title: 'SERVICIO', mData: 'servicio' },
       
            ],
            order: [
                [2, 'desc']
            ]
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

    select_diagnostico: function()
    {
        let select = DOM.find('select[data-select="DIAGNOSTICO"]');
        select.append($('<option></option>').attr('value', '').text('TODO'));
         axios.get(BASE_API+'configuracion/diagnostico/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();   
        }).catch(error => {
            console.log(error);
        }); 
    },


} 

export default Componente;