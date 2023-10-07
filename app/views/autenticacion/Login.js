

let Login = {

    render: async (d, data) => {  

        // PERSONALIZACIÓN GENERAL DEL SISTEMA
        let logo = 'assets/images/logo_login.png';
        
        if(data.general.fl_logo_login == 1)
        {
            logo = BASE_FILES+'images/'+data.general.logo_login;
        }

        
        let _style = '';

        if(data.general.color_button_login != null && data.general.color_button_login != '')
        {
            _style += `

                h2.active {
                    color: `+data.general.color_button_login+` !important;
                }

                .underlineHover:after {
                    background-color: `+data.general.color_button_login+`  !important;
                }

                button, input[type=reset] {
                    background-color: `+data.general.color_button_login+`  !important;
                }

                .underlineHover:hover {
                    color: `+data.general.color_button_login+`  !important;
                }

                input[type="reset"]:hover {
                    background-color: `+data.general.color_button_login+`  !important;
                }

                input[type="text"]:focus {
                    border-bottom: 2px solid `+data.general.color_button_login+` !important;
                }

                input[type="password"]:focus {
                    border-bottom: 2px solid `+data.general.color_button_login+` !important;
                }

                a {
                    color:`+data.general.color_button_login+`  !important;
                }

                h2 {
                    color: `+data.general.color_button_login+`  !important;
                }

            `;
        }

        d.innerHTML = await `<div name="login" style="height: 900px;  overflow-y: auto;">
                             



                            <section  class="ftco-section">
                                <div class="container">
                             
                                    <div class="row justify-content-center">
                                        <div class="col-md-7 col-lg-5">
                                            <div class="wrap">
                                                <div class="img" style="text-align: center;">
                                                    <img src="`+logo+`" id="icon" alt="User Icon" style="max-width:200px; margin-top:40px;text-align: center;" />
                                                </div>
                                                <div class="login-wrap p-4 p-md-5">
                                            <div class="d-flex">
                                                <div class="w-100">
                                                    <h3 class="mb-4">Iniciar sesión</h3>
                                                </div>
                                                        <div class="w-100">
                                                            <p class="social-media d-flex justify-content-end">
                                                                <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class="fa fa-facebook"></span></a>
                                                                <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span class="fa fa-twitter"></span></a>
                                                            </p>
                                                        </div>
                                            </div>
                                                    <form  name="formulario_login"  id="formulario_login" class="signin-form">
                                                <div class="form-group mt-3">
                                                    <input type="text" class="form-control"   placeholder="Usuario" name="usuario" required style="width: 100%;">
                                           
                                                </div>
                                            <div class="form-group">
                                            <input id="password-field" type="password"  placeholder="Contraseña" name="password" class="form-control" required  style="width: 100%;">
                                          
                                           
                                            </div>
                                            <div class="form-group">
                                                <button type="submit" id="btn-login" class="form-control btn btn-primary rounded submit px-3">INICIAR SESION</button>
                                            </div>
                                            <div class="form-group d-md-flex">
                                                <div class="w-50 text-left">
                                                    <label class="checkbox-wrap checkbox-primary mb-0">Recordarme
                                                            <input type="checkbox" checked>
                                                            <span class="checkmark"></span>
                                                                </label>
                                                            </div>
                                                           <!--  <div class="w-50 text-md-right">
                                                                <a  href="#/recuperacion">¿Olvidaste tu Contraseña?</a>
                                                            </div> -->
                                            </div>
                                        </form> 
                                       <p class="text-center">  <a data-toggle="tab" href="#/recuperacion">¿Olvidaste tu Contraseña?</a></p> 
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>`;
        
        Login.after_render();

    },


    after_render: async () => {

        document.querySelector('form[name="formulario_login"]').addEventListener('submit', function(e){
            e.preventDefault();

            const ladda = HELPER.ladda('#btn-login');

            var formData = new FormData(this);
            
            axios({
                method: 'post',
                url: BASE_API+'autenticacion/login',
                data: formData
            })
            .then(function(response) {
                
                localStorage.setItem('Token', response.data.Token);
                location.href = BASE_URL;
                
            }).catch(error => {
                ladda.stop();
            });
        });
        
    }
}


export default Login;