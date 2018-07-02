/******************** Fuerza ***************************/
function loadPageFuerza(){

    $(".navbar").attr("style","");
    $(".page").addClass("cached");

    if($(".fuerza").length>0){
        $(".fuerza").removeClass("cached");
        initializePageFuerza();

    }else{
        mainView.router.reloadPage("ES/fuerza.html");

    }
}


function initializePageFuerza(){
    if(userHistory[userHistory.length-1] != $(".page:not(.cached)").attr("data-page")){
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }

    addActionsFuerza();
}

function addActionsFuerza(){

    $(".challengueFuerza").click(function() {
        loadPageConectar("retoFuerza");
    });

}



