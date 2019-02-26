/********************CONECTAR***************************/
var reto;
var macAddress = "00:21:13:02:C3:4D"; //Arduino MAC

function loadPageConectar(str) {
    reto = str;

    $(".page").addClass("cached");

    if ($(".conectar").length > 0) {
        $(".conectar").removeClass("cached");
        initializePageConectar();
    } else {
        mainView.router.reloadPage("ES/conectar.html");
    }
}

function initializePageConectar() {

    if (userHistory[userHistory.length - 1] != $(".page:not(.cached)").attr("data-page")) {
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }
    addActionsConectar();

}

function addActionsConectar() {
    $("#conectarBtn")[0].onclick = function enterKey(e) {
        if (statusConected === true) {
            myApp.alert("ya esta conectado.", "SBB");
        } else {
            myApp.showPreloader("Loading...", connectBtl());
        }
    };
}
/** descomentar cuando se esten haciendo pruebas en navegador */
//statusConected = true;
function connectBtl() {
    var weigthBagLocal;
    if(localStorage.getItem('weightBag')){
        weigthBagLocal = localStorage.getItem('pesoBolsa');
    }else{
        weigthBagLocal = "40";
    }
    bluetoothSerial.connect(
        macAddress,
        function () {
            statusConected = true;
            bluetoothSerial.write(weigthBagLocal, console.log("conected btl...."), console.log("error btl...."));
            userHistory.pop();
            myApp.hidePreloader();
            switch (reto) {
                case "retoVelocidad":
                loadPageVelocidad();
                    break;
                case "retoFuerza":
                loadPageFuerza();
                    break;
                case "libre":
                    loadPageLibre();
                    break;
            default:
            loadPageHome();
            break;
            }
        },
        function (err) {
            statusConected = false;
            myApp.hidePreloader();
            myApp.alert("error conectando, intenta nuevamente", "SBB");
        }
    );
}

