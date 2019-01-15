/********************CONECTAR***************************/
var reto;
var macAddress = "00:21:13:02:C3:4D"; //Arduino MAC
var statusConected = false;


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
        if(statusConected === true){
            myApp.alert("ya esta conectado el dispositivo","SBB");
        }else{
            myApp.showPreloader("Loading", connectBtl());
        }
    };
}

function connectBtl() {
    bluetoothSerial.connect(
        macAddress,
        function () {
            statusConected = true;
            bluetoothSerial.write("1234", console.log("conected btl...."), console.log("error btl...."));
            myApp.hidePreloader();
            switch (reto) {
                case "retoVelocidad":
                    loadPageRetoVelocidad();
                    break;
                case "retoFuerza":
                    loadPageRetoFuerza();
                    break;
                case "libre":
                    loadPageLibre();
                    break;
            }
        },
        function (err) {
            statusConected = false;
            myApp.hidePreloader();
            myApp.alert("error conecting", "SBB");
        }
    );
}

// function sendSignal() {
//     window.bluetooth.write(
//         function () {
//             myApp.alert("Pairing Successful");
//         },
//         function (err) {
//             console.log('There was an error Pairing to a device' + JSON.stringify(err));
//             myApp.alert("There was an error Pairing to a device" + JSON.stringify(err));
//         }, "t");
// }

