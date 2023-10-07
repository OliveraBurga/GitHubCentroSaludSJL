 

let prefijo = 'documento/';

let Obj_router = async (router, d, data) => {
    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'documento-documento_personal' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'documento_personal', async function() {
                HELPER.active_sidebar('documento-documento_personal');
				let modulo = await import('../views/documento/Personal.js');
                modulo.default.render(d);
            });
        }
 

    }); 
}

export default Obj_router;