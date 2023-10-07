 

let prefijo = 'reporte/';

let Obj_router = async (router, d, data) => {
    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'reporte-diagnostico' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'diagnostico', async function() {
                HELPER.active_sidebar('reporte-diagnostico');
				let modulo = await import('../views/reporte/Diagnostico.js');
                modulo.default.render(d);
            });
        }
 

        if((permiso.menu == 'reporte-historia' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'historia', async function() {
                HELPER.active_sidebar('reporte-historia');
				let modulo = await import('../views/reporte/Historia.js');
                modulo.default.render(d);
            });
        }
 

        if((permiso.menu == 'reporte-rad' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'rad', async function() {
                HELPER.active_sidebar('reporte-rad');
				let modulo = await import('../views/reporte/Rad.js');
                modulo.default.render(d);
            });
        }
 
        if((permiso.menu == 'reporte-tipo_servicio' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'tipo_servicio', async function() {
                HELPER.active_sidebar('reporte-tipo_servicio');
				let modulo = await import('../views/reporte/Tipo_servicio.js');
                modulo.default.render(d);
            });
        }
 

    }); 
}

export default Obj_router;