/******************** Home ***************************/
function loadPageHome(){
    $('#toolBarBottom').removeClass('hideFooter');
    $('#navBarIos').removeClass('hideFooter');
    $(".navbar").attr("style","");
    $(".page").addClass("cached");

    refreshFooterHome();

    if($(".home").length>0){
        $(".home").removeClass("cached");
        initializePageHome();
    }else{
        mainView.router.reloadPage("ES/home.html");
    }
}

function initializePageHome(){
    if(userHistory[userHistory.length-1] != $(".page:not(.cached)").attr("data-page")){
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }
    addActionsHome();

}

function addActionsHome(){
    $("#libre")[0].onclick = function enterKey(e) {
        if(statusConected == true){
            loadPageLibre();
        }else {
            loadPageConectar("libre");
        }
    };

    $("#velocidad")[0].onclick = function enterKey(e) {
        if(statusConected == true){
            loadPageVelocidad();
        }else {
            loadPageConectar("retoVelocidad");
        }
    };

    $("#fuerza")[0].onclick = function enterKey(e) {
        if(statusConected == true){
            loadPageFuerza();
        }else {
            loadPageConectar("retoFuerza");
        }
    };
}

function refreshFooterHome() {
    $(".icon-home").addClass("selectedIcon");
    $(".icon-list").removeClass("selectedIcon");
    $(".icon-heart").removeClass("selectedIcon");
    $(".icon-user").removeClass("selectedIcon");
    $(".icon-tag").removeClass("selectedIcon");
    $(".icon-basket").removeClass("selectedIcon");

}




