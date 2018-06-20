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
    $("#conectarHome")[0].onclick = function enterKey(e) {
        loadPageConectar();
    };

    /* buttons nav  footer
    $("#iconHome")[0].onclick = function enterKey(e) {
        loadPageHome();
    };

    $("#iconHeart")[0].onclick = function enterKey(e) {
        loadPageFavorites();
    };

    $("#iconCar")[0].onclick = function enterKey(e) {
        loadPageCart();
    };

    $("#iconUser")[0].onclick = function enterKey(e) {
        loadPageMyAccount();
    };

    $("#iconCatalog")[0].onclick = function enterKey(e) {
        onceCatalog = false;
        loadPageCatalog(0);
    };*/
}

function refreshFooterHome() {
    $(".icon-home").addClass("selectedIcon");
    $(".icon-list").removeClass("selectedIcon");
    $(".icon-heart").removeClass("selectedIcon");
    $(".icon-user").removeClass("selectedIcon");
    $(".icon-tag").removeClass("selectedIcon");
    $(".icon-basket").removeClass("selectedIcon");

}




