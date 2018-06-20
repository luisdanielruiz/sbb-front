/******************** Config ***************************/
function loadPageConfig(){
    $(".navbar").attr("style","");
    $(".page").addClass("cached");

    refreshFooterHome();

    if($(".home").length>0){
        $(".home").removeClass("cached");
        initializePageConfig();
    }else{
        mainView.router.reloadPage("ES/home.html");
    }
}

function initializePageConfig(){
    if(userHistory[userHistory.length-1] != $(".page:not(.cached)").attr("data-page")){
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }
    addActionsConfig();

}

function addActionsConfig(){

}






