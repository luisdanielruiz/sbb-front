/******************** Velocidad ***************************/
function loadPageVelocidad(){

    $(".navbar").attr("style","");
    $(".page").addClass("cached");

    if($(".velocidad").length>0){
        $(".velocidad").removeClass("cached");
        initializePageVelocidad();

    }else{
        mainView.router.reloadPage("ES/velocidad.html");

    }
}


function initializePageVelocidad(){
    if(userHistory[userHistory.length-1] != $(".page:not(.cached)").attr("data-page")){
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }

    addActionsVelocidad();
    loadVelocidadRetos();
}

function addActionsVelocidad(){

    $(".challengueVelocidad").click(function() {
        loadPageConectar("retoVelocidad");
    });
}



