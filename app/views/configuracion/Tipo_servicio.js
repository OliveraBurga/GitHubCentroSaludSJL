

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
                            Tipos de Servicio
                            <small>Configuración</small>
                        </h1>
                    </div>
                    <div class="col-md-4" align="right">
                        <button type="button" class="btn btn-sm btn-info" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content">


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
            
            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="row"> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Area </label>
                                            <select name="tipo" class="form-control form-control-sm"   >
                                            <option value="LABORATORIO">LABORATORIO</option>
                                            <option value="CONSULTA MEDICA">CONSULTA MEDICA</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6"   >
                                        <div class="form-group">
                                            <label>Nombre </label>
                                            <input type="text" name="nombre" class="form-control" autocomplete="off" placeholder="NORMAL">
                                        </div>
                                    </div>
                                    <div class="col-md-6" name="analisis">
                                        <div class="form-group">
                                            <label>Costo</label>
                                            <input type="number" name="costo" class="form-control" autocomplete="off"  >
                                        </div>
                                    </div>
                                    <div class="col-md-6"  name="analisis">
                                    <div class="form-group">
                                        <label>Unidad de Medida <span class="text-red">(*)</span></label>
                                        <select name="id_unidad_medida" data-select="UNIDAD_MEDIDA" class="form-control select2"></select>
                                    </div>
                                    </div>
                                    <div class="col-md-12"  name="analisis">
                                        <div class="form-group">
                                            <label>Valor referencial</label>
                                            <textarea name="valor_referencial" class="form-control"></textarea>
                                        </div>
                                    </div>
                                   
                                    <div class="col-md-12"  name="analisis">
                                    <div class="form-group">
                                        <label>Tipo Examen <span class="text-red">(*)</span></label>
                                        <select name="tipo_examen" class="form-control select" autocomplete="off">
                                            <option value="">seleccione...</option>
                                            <option value="BIOQUIMICA">BIOQUIMICA</option>
                                            <option value="HEMOGRAMA">HEMOGRAMA</option>
                                            <option value="INMUNOSEROLOGÍA">INMUNOSEROLOGÍA</option>
                                            <option value="INMUNOLOGÍA">INMUNOLOGÍA</option>
                                            <option value="PARASITOLOGÍA">PARASITOLOGÍA</option>
                                            <option value="EXAMEN DE ORINA">EXAMEN DE ORINA</option>
                                            <option value="GRUPO EXAMEN">GRUPO EXAMEN</option>
                                        </select>
                                    </div>
                                    </div>

                                  

                                    <div class="col-md-12" data-name="detalle"  name="analisis">
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>EXAMEN</th>
                                                        <th>UNIDAD MEDIDA</th>
                                                        <th>VR</th>
                                                        <th>DC</th>
                                                        <th style="width:10px;"></th>
                                                    </tr>
                                                </thead>
                                                <tbody name="detalle-tipo"></tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td><button type="button" name="agregar_tipo" class="btn btn-secondary"><i class="fa fa-plus"></i> Agregar</button></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="col-md-12" data-name="detalle_campo"  name="analisis">
                                       

                                        <div class="box box-widget widget-user-2">
                                            <div class="widget-user-header bg-green">
                                             
                                            </div>
                                            <div class="box-footer no-padding">
                                                <ul class="nav nav-stacked">
                                                    <li> 
                                                        <samp style="margin-left:20px ;font-size: 16px; font-weight: bold;">Marcar las casillar para ocultar</samp>   
                                                    </li>

                                                    <table style="margin-left:20px ;font-size: 16px; font-weight: bold;color: #000 !important;">
                                                        <tbody name ="detalle_atencion" >
                                                            <tr data-name="cualitativo">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna" /> cualitativo</label></a></li>
                                                                </td>
                                                            </tr>
                                                            <tr data-name="cuantitativo">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> cuantitativo</label></a></li>
                                                                </td>
                                                            </tr>

                                                            <tr data-name="grupo">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> grupo</label></a></li>
                                                                </td>
                                                            </tr>
                                                        
                                                            <tr data-name="rh">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> RH </label></a></li>
                                                                </td>
                                                            </tr>
                                                            <tr data-name="dengue_igg">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> IgG </label></a></li>
                                                                </td>
                                                            </tr>
                                                            <tr data-name="dengue_igm">
                                                                <td  style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> Igm</label></a></li>
                                                                </td>
                                                            </tr>
                                                            <tr data-name="dengue_ns1">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> Ns1 </label></a></li>
                                                                </td>
                                                            </tr>
                                                            <tr data-name="beta_cualitativo">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> Beta Cualitativo</label></a></li>
                                                                </td>
                                                            </tr>

                                                            <tr data-name="tifico_o">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> Tifico O</label></a></li>
                                                                </td>
                                                            </tr>


                                                            <tr data-name="tifico_h">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> Tifico H</label></a></li>
                                                                </td>
                                                            </tr>
                                                            <tr data-name="paratifico_a">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> Paratifico A</label></a></li>
                                                                </td>
                                                            </tr>
                                                            <tr data-name="paratifico_b">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> Paratifico B</label></a></li>
                                                                </td>
                                                            </tr>
                                                            <tr data-name="brucelas">
                                                                <td style="margin-top: 10px;">
                                                                    <li><a href="javascript:"><label style="color: #181717 !important;"><input type="checkbox"  name="columna"/> Brucelas</label></a></li>
                                                                </td>
                                                            </tr>
                                                              
                                                  

                                                        </tbody>
                                                    </table>
                                                
                                                    
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>



                                    <div class="col-md-12" style="padding-top:30px;" >
                                        <div class="form-group">
                                            <label><input type="checkbox" name="fl_default" /> Selección automática</label>                                            
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
                                        Confirmo realizar la eliminación</label>
                                    <p style="color:red;">Esta acción no se podrá revertir</p>
                                </div>
                                <div class="col-md-12" name="texto" align="center">

                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        

        </div>            
        `;

        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                nombre: {required: true},
             /*    id_unidad_medida: {required: true}, */
            },
          
            messages: {
                nombre: 'Nombre',
          /*       id_unidad_medida: 'Unidad de Medida', */
            },

            submitHandler: function() {
                Componente.submit();
            }
          
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

        /* EDITAR */
        DOM.on('click', 'button[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit($(this));
        });
/* 
        DOM.on('keyup', 'select[name="tipo_examen"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_detalle();
        }); */

        DOM.on('change', 'select[name="tipo_examen"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_detalle();
        });

        
        DOM.on('change', 'select[name="tipo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_tipo_consulta(this.value);
        });

          /* AGREGAR MODELO */
          DOM.find('button[name="agregar_tipo"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_tipo();
        });

        /* QUITAR MODELO */
        DOM.on('click', 'button[name="quitar-tipo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_tipo($(this));
        });

  
    /* AGREGAR MODELO */
    DOM.find('button[name="agregar_campo"]').click(function(e) {
        e.stopImmediatePropagation();
        Componente.agregar_campo();
    });

    /* QUITAR MODELO */
    DOM.on('click', 'button[name="quitar_campo"]', function(e) {
        e.stopImmediatePropagation();
        Componente.quitar_campo($(this));
    });



        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
        });
        
        Componente.datatable();
        Componente.select_unidad_medida();
        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,

    /************ */

    change_tipo_consulta: async (val)  =>
    {

        if(val == 'LABORATORIO') {
            
        
            DOM.find('div[name="analisis"]').show('hide');
            DOM.find('div[name="consulta"]').hide('hide');
        }
       
        else{
            DOM.find('div[name="consulta"]').show('hide');
            DOM.find('div[name="analisis"]').hide('hide');
        }
    
    },



    change_detalle: async () =>
    {
        let tipo = DOM.find('select[name="tipo_examen"]').val();
    

        if (tipo == 'HEMOGRAMA' || tipo ==  'GRUPO EXAMEN') {
            
        
            DOM.find('div[data-name="detalle"]').show('hide');
            DOM.find('div[data-name="detalle_campo"]').hide('hide');
        }
        else if(tipo == 'INMUNOSEROLOGÍA'){

            DOM.find('div[data-name="detalle_campo"]').show('hide');
            DOM.find('div[data-name="detalle"]').hide('hide');
        }

        else{

            DOM.find('div[data-name="detalle"]').hide('hide');
              DOM.find('div[data-name="detalle_campo"]').hide('hide');
        }
    
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

    
    agregar_tipo: (data = null) => {
        
        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                id_unidad: '',
                examen :'',
                valor_referencial:'',
                id:'',
                fl_ecelular:0,
            };
        }

     
        let html = `
            <tr data-codigo="`+codigo+`">
               <td style="display:none"><input type="text" step="any" data-name="id" class="form-control" value="`+data.id+`"  /></td>
                <td><input type="text" step="any" data-name="examen" class="form-control" value="`+data.examen+`"  /></td>
                <td><select data-select="UNIDAD" data-name="id_unidad" class="form-control"></select> </td>
                <td><textarea data-name="valor_referencial" style="width:300px;" class="form-control">`+data.valor_referencial+`</textarea></td>

                <td>   
                    <input type="checkbox" `+((data.fl_ecelular == 1) ? 'checked' : '')+` data-name="fl_ecelular" />
                </td>

                <td> <button type="button" name="quitar-tipo" class="btn btn-danger"><i class="fa fa-times"></i></button>  </td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-tipo"]').append(html);
        Componente.select_unidad(codigo, data.id_unidad);
    },

    quitar_tipo: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

    },

    tipo_json: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-tipo"] tr').each(function(){
           
            let item = {
                id : $(this).find('input[data-name="id"]').val(),
                examen : $(this).find('input[data-name="examen"]').val(),
                id_unidad : $(this).find('select[data-name="id_unidad"]').val(),
                valor_referencial : $(this).find('textarea[data-name="valor_referencial"]').val(),
 
                fl_ecelular: ($(this).find('input[data-name="fl_ecelular"]').is(':checked')) ? 1 : 0, 
 

            };
  
            detalle.push(item);
        });

        return detalle;
    },


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


    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:BASE_API + 'configuracion/tipo_servicio',
            columns: [{
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group">
                                <button type="button" class="btn btn-default btn-sm" name="row-edit">EDITAR</button>     
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                      <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-left" role="menu">
                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-trash-alt"></i> Eliminar</a></li>
                                </ul>
                            </div>
                        `;

                        return html;
                    },
                    width: '100px',
                },       
                { title: 'AREA', mData: 'tipo' },         
                { title: 'NOMBRE', mData: 'nombre' },
                { title: 'UNIDAD MEDIDA', mData: 'unidad_medida' },
                { title: 'VALOR REFERENCIA', mData: 'valor_referencial' },   
                { title: 'TIPO EXAMEN', mData: 'tipo_examen' }, 
                { title: 'COSTO', mData: 'costo' },
            ],
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Tipo de Servicio');

        /** DATA */
        HELPER.reset_form(form);
        DOM.find('tbody[name="detalle-tipo"]').html('');
        this.id = null;
        this.action_submit = accion;
        Componente.change_detalle();
        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Tipo de Servicio');

        /** DATA */
        HELPER.reset_form(form);
        DOM.find('tbody[name="detalle-tipo"]').html('');
        let data = HELPER.get_attr_json(row);

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="costo"]').val(data.costo);
        form.find('select[name="tipo"]').val(data.tipo).change();
        form.find('select[name="tipo_examen"]').val(data.tipo_examen).change();
        form.find('textarea[name="valor_referencial"]').html(data.valor_referencial);
        form.find('input[name="fl_default"]').prop('checked', parseInt(data.fl_default));
        form.find('select[name="id_unidad_medida"]').val(data.id_unidad_medida).change();

        Componente.change_tipo_consulta(data.tipo);

        data.detalle.forEach(row => {
            Componente.agregar_tipo(row);
        });
 
        let tabla = DOM.find('tbody[name="detalle_atencion"]');
        data.columnas.forEach(row => {
         
            var fila = tabla.find('tr[data-name="'+row.nombre+'"]');
                fila.find('input[name="columna"]').prop('checked', true);

                console.log(row);
             
        });


       Componente.change_detalle();

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Tipo de Servicio');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        formData.append('detalle_tipo', JSON.stringify(Componente.tipo_json()));

        if (this.id != null) { formData.append('id', this.id); }

        
        let actividad = [];
        let index = 0;

        DOM.find('tbody[name="detalle_atencion"] tr').each(function(){
                 
               var activida = false;

               if($(this).find('input[name="columna"]').is(':checked'))
               {
                   activida = true;   
               }

               if(activida === true )
               {
                   actividad[index] = {
                 
                        nombre: $(this).attr('data-name'),
                        fl_estado :1,
                   };    
                   index++;
               }         
          
        });

        formData.append('columnas', JSON.stringify(actividad));

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/tipo_servicio/' + this.action_submit,
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
} 

export default Componente;