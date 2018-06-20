String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var appConfig = {
    lang:"ES"
    
};

// Initialize your app
var myApp = new Framework7({
    precompileTemplates: true
});

 
// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

var userHistory = [];


function loadEventReady(){
    document.addEventListener("deviceready", appReady, false);
}


function appReady(){
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 10000);
    document.addEventListener("backbutton", masterBack);
}

function masterBack(e) {
    $$('body').removeClass('with-popup');
    $$("div").removeClass('modal-overlay-visible');
    myApp.closeModal('.popup');

    userHistory.pop();

    if(userHistory.length===0){
        myApp.confirm('Querés salir de la aplicación?',"Plenus",
            function () {
                navigator.app.exitApp();
            },
            function () {

            }
        );
    }else{

        switch (userHistory[userHistory["length"]-1] ) {

            case 'index':
                myApp.confirm('Querés salir de la aplicación?',"Plenus",
                    function () {
                        navigator.app.exitApp();
                    },
                    function () {
                    }
                );
                break;
            case 'home':
                loadPageHome();
                break;
            case 'myAccount':
                loadPageMyAccount();
                break;
            case 'register':
                loadPageRegister();
                break;
            case 'contact':
                loadPageContact();
                break;
            case 'recovery':
                loadPageRecovery();
                break;
            case 'conectar':
                loadPageConectar();
                break;
            case 'history':
                loadPageHistory();
                break;
            default:
                break;
        }
        return false;
    }
}

var $ = Framework7.$;

/* Funcion que contiene render de Templates*/
runTemplates();
actualizarListaLocales();

var compiledListProductTemplate;
var compiledMyAccountTemplate;
var compiledListTipoPlace;
var compiledBusquedaTemplate;


$$(document).on("pageInit", function (e) {
    
    var page = e.detail.page;

    if (page.name === 'index') {
        
    }

    if (page.name === 'home') {
        initializePageHome();
    }

    if (page.name === 'myAccount') {
        initializePageMyAccount();
    }

    if (page.name === 'history') {
        initializePageHistory();
    }
    
    if (page.name === 'register') {
        initializePageRegister();
    }
    
     if (page.name === 'contact') {
        initializePageContact();
    }

    if (page.name === 'config') {
        initializePageConfig();
    }
    
     if (page.name === 'login') {
        initializePageLogin();
    }
    if (page.name === 'conectar') {
        initializePageConectar();
    }
    
     if (page.name === 'recovery') {
        initializePageRecovery();
    }
});


/* buttons nav */

    $("#button_home").click(function() {
        loadPageHome();
    });

    $("#button_myAccount").click(function() {
        loadPageMyAccount();
    });

    $("#button_history").click(function() {
        loadPageHistory();
    });

    $("#button_config").click(function() {
        loadPageConfig();
    });

    $("#button_contact").click(function() {
    titleMessaje = null;
    messaje = null;
    $("#asuntoInput").val(titleMessaje);
    $("#mensajeInput").val(messaje);
    loadPageContact();
    });

    $("#loginPage").click(function() {
        loadPageLogin();
    });

    $("#button_logIn").click(function() {
        location.reload();
        loadPageLogin();
    });

    $("#button_logOut").click(function() {
        localStorage.clear();
        location.reload();
        loadPageLogin();
    });

    if(localStorage.localUser){
        $('#menu-logIn').css('display','none');
        $('#menu-logOut').css('display','block');
    }else{
        $('#menu-logIn').css('display','block');
        $('#menu-logOut').css('display','none');

    }

if(Juser !=null && Juser.result.idUser){
   loadAll();
   loadPageHome();
   $(".name-user").html("¡Hola "+Juser.result.name+"!");
}else{
	loadPageLogin();
}