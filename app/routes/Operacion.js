
let prefijo = 'operacion/';

let Obj_router = async (router, d, data) => {
    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'operacion-atencion' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'atencion', async function() {
                HELPER.active_sidebar('operacion-atencion');
				let modulo = await import('../views/operacion/Atencion.js');
                modulo.default.render(d);
            });
        }
        if((permiso.menu == 'operacion-triaje' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'triaje', async function() {
                HELPER.active_sidebar('operacion-triaje');
				let modulo = await import('../views/operacion/Triaje.js');
                modulo.default.render(d);
            });
        }
 
        if((permiso.menu == 'operacion-plan_atencion' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'plan_atencion', async function() {
                HELPER.active_sidebar('operacion-plan_atencion');
				let modulo = await import('../views/operacion/Plan_atencion.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'operacion-analisis' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'analisis', async function() {
                HELPER.active_sidebar('operacion-analisis');
				let modulo = await import('../views/operacion/Analisis.js');
                modulo.default.render(d);
            });
        }


    }); 
}

export default Obj_router;