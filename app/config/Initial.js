"use strict";

import Loader from './loaderStatic.js';
import Config    from '../../config.js'
import Main    from './Main.js'

const init = async () => { 

    window.BASE_URL = Config.base_url;
    window.BASE_API = Config.base_api;
    window.BASE_FILES = Config.base_files;
    window.BASE_ASSETS = Config.base_assets;
    window.GLOBAL = {};
    console.log(BASE_ASSETS);
    const rutas = [
        BASE_ASSETS+'library/jquery/jquery-1.11.1.js',
        BASE_ASSETS+'library/axios/axios.min.js',
        BASE_ASSETS+'library/sammy/sammy.min.js',
        
        `${BASE_ASSETS}library/ladda/spin.min.js`,
        `${BASE_ASSETS}library/ladda/ladda.min.js`,   
        `${BASE_ASSETS}library/ladda/ladda.min.css`,    
    ];
    console.log(2222222);
    
    Loader.requireFiles(rutas, async function(){
        
        if(window.opener && !window.opener.closed)
        {
            document.querySelector('#href_loader').remove();
        }           

        $.fn.html = (function($html) {
            return function() {
                var cache = $.ajaxSetup()['cache'];
                $.ajaxSetup({cache: true});
                var ret = $html.apply($(this), arguments);
                $.ajaxSetup({cache: cache});
                return ret;
            };
        }($.fn.html));
console.log(33333333333);
        Main.initialize(); 
    }); 




  
} 

// Al cargar página
window.addEventListener('load', init);