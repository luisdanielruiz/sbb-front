/********************CONECTAR***************************/
function loadPageConectar(){
    $('#toolBarBottom').removeClass('hideFooter');

		$(".page").addClass("cached");
		refreshFooterMyAccount();
		
		
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
        myApp.alert("conectando...","SBB");
    };


}

function refreshFooterMyAccount() {
    $(".icon-home").removeClass("selectedIcon");
    $(".icon-list").removeClass("selectedIcon");
    $(".icon-heart").removeClass("selectedIcon");
    $(".icon-user").addClass("selectedIcon");
    $(".icon-tag").removeClass("selectedIcon");
    $(".icon-basket").removeClass("selectedIcon");

}