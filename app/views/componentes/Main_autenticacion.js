


import Helper from '../../config/Helper.js'

window.HELPER = Helper;

let Main = {
    render: (data) => {
                
        let html = `                
                

                <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
                
                <link rel="stylesheet" href="assets/style_login/css/style.css">

                
                <link rel="stylesheet" href="assets/library/ladda/ladda.min.css">
                

                <div id="app"></div>

                                
       
 
                

              <!--   <script src="assets/style_login/js/jquery.min.js"></script>
                <script src="assets/style_login/js/popper.js"></script>
                <script src="assets/style_login/js/bootstrap.min.js"></script>
                <script src="assets/style_login/js/main.js"></script>
 -->

                <style>
                    
                    .alert {
                        width:450px !important;
                        border-radius:10px;
                        padding:15px;
                        text-align:center;
                    }

                    .alert button{
                        width:40px;
                        margin:0;
                        padding:5px;
                        font-size:18px;
                        float:right;
                    }
                    
                    .alert-warning {
                        color: #8a6d3b;
                        background-color: #fcf8e3;
                        border-color: #faebcc
                    }
                    
                    .alert-warning hr {
                        border-top-color: #f7e1b5
                    }
                    
                    .alert-warning .alert-link {
                        color: #66512c
                    }
                    `;

                    if(data.general.fl_bg_login == 1)
                    {
                        html += `
                        html{
                            background: -webkit-linear-gradient(rgba(234,90,38,.1),rgba(234,90,38,.1)),url(`+BASE_FILES+'images/'+data.general.bg_login+`);
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            background-color: #fff
                        }
                        `
                    }
                    
                   html += `

                </style>

        `;  

        return html;

    },

    after_render: async () => {
        
        
    }
}
export default Main;
