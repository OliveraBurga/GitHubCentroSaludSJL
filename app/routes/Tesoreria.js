
let prefijo = 'tesoreria/';

let Obj_router = async (router, d, data) => {
    data.permisos.forEach(permiso => {
        
        if((permiso.menu == 'tesoreria-pago_atencion' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'pago_atencion', async function() {
                HELPER.active_sidebar('tesoreria-pago_atencion');
				let modulo = await import('../views/tesoreria/Pago_atencion.js');
                modulo.default.render(d);
            });
        }
     
 
        if((permiso.menu == 'tesoreria-caja_chica' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'caja_chica', async function() {
                HELPER.active_sidebar('tesoreria-caja_chica');
				let modulo = await import('../views/tesoreria/Caja_chica.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'tesoreria-caja' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'caja', async function() {
                HELPER.active_sidebar('tesoreria-caja');
				let modulo = await import('../views/tesoreria/Caja.js');
                modulo.default.render(d);
            });
        }

        if((permiso.menu == 'tesoreria-caja_rapida' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'caja_rapida', async function() {
                HELPER.active_sidebar('tesoreria-caja_rapida');
                let modulo = await import('../views/tesoreria/Caja.js');
                modulo.default.render(d, 'CAJA_RAPIDA');
            });
        }
 
        if((permiso.menu == 'tesoreria-autorizacion_gasto' && permiso.view == 1) || data.all_permiso)
        {
            router.get('#/'+prefijo+'autorizacion_gasto', async function() {
                HELPER.active_sidebar('tesoreria-autorizacion_gasto');
                let modulo = await import('../views/tesoreria/Autorizacion_gasto.js');
                modulo.default.render(d);
            });
        }


              // REPORTES
              if((permiso.menu == 'tesoreria-reporte-caja_chica' && permiso.view == 1) || data.all_permiso)
              {
                  router.get('#/'+prefijo+'reporte/caja_chica', async function() {
                      HELPER.active_sidebar('tesoreria-reporte-caja_chica');
                      let modulo = await import('../views/tesoreria/reporte/Caja_chica.js');
                      modulo.default.render(d);
                  });
              }
      
              if((permiso.menu == 'tesoreria-reporte-flujo_caja' && permiso.view == 1) || data.all_permiso)
              {
                  router.get('#/'+prefijo+'reporte/flujo_caja', async function() {
                      HELPER.active_sidebar('tesoreria-reporte-flujo_caja');
                      let modulo = await import('../views/tesoreria/reporte/Flujo_caja.js');
                      modulo.default.render(d);
                  });
              }



    }); 
}

export default Obj_router;