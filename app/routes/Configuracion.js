
let prefijo = 'configuracion/';

let Obj_router = async (router, d, data) => {
    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'configuracion-usuario' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'usuario', async function() {
                HELPER.active_sidebar('configuracion-usuario');
                let modulo = await import('../views/configuracion/Usuario.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'configuracion-rol' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'rol', async function() {     
                HELPER.active_sidebar('configuracion-rol');   
                let modulo = await import('../views/configuracion/Rol.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'configuracion-empresa' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'empresa', async function() {     
                HELPER.active_sidebar('configuracion-empresa');   
                let modulo = await import('../views/configuracion/Empresa.js');
                modulo.default.render(d);
            });
        }       
        
        if((permiso.menu == 'configuracion-personal' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'personal', async function() {     
                HELPER.active_sidebar('configuracion-personal');   
                let modulo = await import('../views/configuracion/Personal.js');
                modulo.default.render(d);
            });
        } 

        
        if((permiso.menu == 'configuracion-cuenta_bancaria_empresa' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'cuenta_bancaria_empresa', async function() {     
                HELPER.active_sidebar('configuracion-cuenta_bancaria_empresa');   
                let modulo = await import('../views/configuracion/Cuenta_bancaria_empresa.js');
                modulo.default.render(d);
            });
        } 

        if((permiso.menu == 'configuracion-socio' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'socio', async function() {     
                HELPER.active_sidebar('configuracion-socio');   
                let modulo = await import('../views/configuracion/Socio.js');
                modulo.default.render(d, 'socio');
            });
        } 

        if((permiso.menu == 'configuracion-tarifa' && permiso.view == 1) || data.all_permiso)
        { 
            router.get('#/'+prefijo+'tarifa', async function() {     
                HELPER.active_sidebar('configuracion-tarifa');   
                let modulo = await import('../views/configuracion/Tarifa.js');
                modulo.default.render(d);
            });   
        } 
 
        if((permiso.menu == 'configuracion-tipo_documento' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'tipo_documento', async function() {     
                HELPER.active_sidebar('configuracion-tipo_documento');   
                let modulo = await import('../views/configuracion/Tipo_documento.js');
                modulo.default.render(d);
            });            
        } 

        if((permiso.menu == 'configuracion-notificacion' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'notificacion', async function() {     
                HELPER.active_sidebar('configuracion-notificacion');   
                let modulo = await import('../views/configuracion/Notificacion.js');
                modulo.default.render(d);
            });            
        } 

        if((permiso.menu == 'configuracion-ajuste_avanzado' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'ajuste_avanzado', async function() {     
                HELPER.active_sidebar('configuracion-ajuste_avanzado');   
                let modulo = await import('../views/configuracion/Ajuste_avanzado.js');
                modulo.default.render(d);
            });            
        } 

 
        if((permiso.menu == 'configuracion-local' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'local', async function() {     
                HELPER.active_sidebar('configuracion-local');   
                let modulo = await import('../views/configuracion/Local.js');
                modulo.default.render(d);
            });            
        } 


        if((permiso.menu == 'configuracion-lugar' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'lugar', async function() {     
                HELPER.active_sidebar('configuracion-lugar');   
                let modulo = await import('../views/configuracion/Lugar.js');
                modulo.default.render(d);
            });
             
        }         

        if((permiso.menu == 'configuracion-tipo_cambio' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'tipo_cambio', async function() {     
                HELPER.active_sidebar('configuracion-tipo_cambio');   
                let modulo = await import('../views/configuracion/Tipo_cambio.js');
                modulo.default.render(d);
            });            
        } 

        if((permiso.menu == 'configuracion-unidad_medida' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'unidad_medida', async function() {     
                HELPER.active_sidebar('configuracion-unidad_medida');   
                let modulo = await import('../views/configuracion/Unidad_medida.js');
                modulo.default.render(d);
            });            
        } 

        if((permiso.menu == 'configuracion-tipo_servicio' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'tipo_servicio', async function() {     
                HELPER.active_sidebar('configuracion-tipo_servicio');   
                let modulo = await import('../views/configuracion/Tipo_servicio.js');
                modulo.default.render(d);
            });            
        } 

        if((permiso.menu == 'configuracion-tipo_entrega' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'tipo_entrega', async function() {     
                HELPER.active_sidebar('configuracion-tipo_entrega');   
                let modulo = await import('../views/configuracion/Tipo_entrega.js');
                modulo.default.render(d);
            });            
        } 
 

        if((permiso.menu == 'configuracion-unidad_medida' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'unidad_medida', async function() {     
                HELPER.active_sidebar('configuracion-unidad_medida');   
                let modulo = await import('../views/configuracion/Unidad_medida.js');
                modulo.default.render(d);
            });            
        } 
 
  
        if((permiso.menu == 'configuracion-forma_pago' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'forma_pago', async function() {     
                HELPER.active_sidebar('configuracion-forma_pago');   
                let modulo = await import('../views/configuracion/Forma_pago.js');
                modulo.default.render(d);
            });            
        } 

        if((permiso.menu == 'configuracion-diagnostico' && permiso.view == 1) || data.all_permiso)
        { 
            router.get('#/'+prefijo+'diagnostico', async function() {     
                HELPER.active_sidebar('configuracion-diagnostico');   
                let modulo = await import('../views/configuracion/Diagnostico.js');
                modulo.default.render(d);
            });   
        } 

        if((permiso.menu == 'configuracion-diagnostico_config' && permiso.view == 1) || data.all_permiso)
        { 
            router.get('#/'+prefijo+'diagnostico_config', async function() {     
                HELPER.active_sidebar('configuracion-diagnostico_config');   
                let modulo = await import('../views/configuracion/Diagnostico_config.js');
                modulo.default.render(d);
            });   
        } 


    }); 
}

export default Obj_router;