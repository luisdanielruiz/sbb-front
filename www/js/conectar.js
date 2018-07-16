/********************CONECTAR***************************/
var reto;
var macAddress = "00:21:13:02:C3:4D"; // 100% confirmed my mac address is correct.


function loadPageConectar(str){
    reto = str;

		$(".page").addClass("cached");

		if($(".conectar").length>0){
			$(".conectar").removeClass("cached");
			initializePageConectar();
		}else{	
			mainView.router.reloadPage("ES/conectar.html");

		}
}

function initializePageConectar(){

    if(userHistory[userHistory.length-1] != $(".page:not(.cached)").attr("data-page")){
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }
addActionsConectar();

}

function addActionsConectar(){

    connectBtl();
    sendSignal();

    $("#conectarBtn")[0].onclick = function enterKey(e) {
        myApp.alert("conectando...","SBB",function () {
            switch (reto){
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
                 // end of app
        });
    };
}

function connectBtl(){
    window.bluetooth.pair(
        function() {
            console.log('Pairing Successful');
            myApp.alert("Pairing Successful");
        },
        function(err) {
            console.log('There was an error Pairing to a device'+ JSON.stringify(err));
            myApp.alert("There was an error Pairing to a device"+ JSON.stringify(err));
        }, macAddress);
}

function sendSignal() {
    window.bluetooth.write(
        function() {
            myApp.alert("Pairing Successful");
        },
        function(err) {
            console.log('There was an error Pairing to a device'+ JSON.stringify(err));
            myApp.alert("There was an error Pairing to a device"+ JSON.stringify(err));
        },"t");
}

