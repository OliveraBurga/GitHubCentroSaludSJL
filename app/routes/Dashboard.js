import Dashboard from '../views/dashboard/Dashboard.js';

let Obj_router = async (router, d, permisos) => {

    router.get('#/dashboard', async function() {
        HELPER.active_sidebar('dashboard');
        Dashboard.render(d, permisos);     
    });    
    
}

export default Obj_router;