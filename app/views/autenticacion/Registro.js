

 let Login = {

    render: async (d) => {  

        d.innerHTML = await `<div name="login">
                            <div class="wrapper fadeInDown">
                                <div id="formContent">
                                <!-- Tabs Titles -->                              
                            
                                <!-- Icon -->
                                <div class="fadeIn first">
                                    <img src="assets/images/logo_login.png" id="icon" alt="User Icon" style="max-width:200px; margin-top:40px;" />
                                </div>
                                
                                <h2 style="margin-top:10px;"> Comienza tu prueba ahora.
                                Es totalmente gratis.</h2>
                                
                                <div id="mensaje_final"></div>
                                <!-- Login Form -->
                                <form id="formulario_registro">
                                    <input type="text" class="fadeIn second" name="nombre" placeholder="Nombre" autocomplete="off" required>
                                    <input type="text" class="fadeIn second" name="apellido" placeholder="Apellido" autocomplete="off" required>
                                    <input type="text" class="fadeIn second" name="email" placeholder="Correo electrónico" autocomplete="off" required>
                                    <input type="text" class="fadeIn second" name="telefono" placeholder="Telefono" autocomplete="off" required>
                                    <input type="text" class="fadeIn second" name="numero_documento" placeholder="RUC" autocomplete="off" required>
                                    <input type="password" class="fadeIn third" name="password" placeholder="Contraseña" autocomplete="off" required>
                                    <button type="submit" id="btn-login" class="fadeIn fourth" data-style="zoom-in" >Registrarse</button>
                                </form>
                            
                                <!-- Remind Passowrd -->
                                <div id="formFooter">
                                    <a class="underlineHover" href="#/login">Tengo mi cuenta</a>
                                </div>
                                </div>
                            </div>
                        </div>`;
        
        Login.after_render();

    },

    submit: () => {

        const ladda = HELPER.ladda('#btn-login');

        let form = document.querySelector('#formulario_registro');
        var formData = new FormData(form);
        
        axios({
            method: 'post',
            url: BASE_API+'autenticacion/registrar',
            data: formData
        })
        .then(function(response) {
            
            $('#mensaje_final').text(response.data.mensaje);
            $('#formulario_registro').remove();
            
        }).catch(error => {
            ladda.stop();
        });

    },

    after_render: async () => {

        /** SUBMIT SAVE */
        $('#formulario_registro').validate({
            submitHandler: function() {
                Login.submit()
            }
        });      
        
    }
}


export default Login;