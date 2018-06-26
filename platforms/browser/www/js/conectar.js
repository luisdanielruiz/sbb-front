/********************CONECTAR***************************/
var reto;
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

                    break;

            }
        });
    };


}
