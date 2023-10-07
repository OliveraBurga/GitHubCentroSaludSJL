import Autenticacion_view from '../views/autenticacion/Login.js';
import Recuperacion_view from '../views/autenticacion/Recuperacion.js';
import Restablecer_view from '../views/autenticacion/Restablecer.js';
import Registro_view from '../views/autenticacion/Registro.js';
import Activar_cuenta_view from '../views/autenticacion/Activar_cuenta.js';

let Obj_router = async (router, d, data_user) => {

    router.get('#/login', async function() {            
        $(document).off();
        Autenticacion_view.render(d, data_user);     
    });    
    
    router.get('#/recuperacion', async function() {            
        $(document).off();
        Recuperacion_view.render(d); 
    });    

    router.get('#/registro', async function() {            
        $(document).off();
        Registro_view.render(d); 
    });   

    /* RESTABLECER */
    router.get('#/restablecer/:salt', function() {
        $(document).off();
        Restablecer_view.render(d, this.params['salt']); 
    });

    /* ACTIVAR CUENTA */
    router.get('#/restablecer/:salt', function() {
        $(document).off();
        Activar_cuenta_view.render(d, this.params['salt']); 
    });
    router.run('#/login');

}

export default Obj_router;