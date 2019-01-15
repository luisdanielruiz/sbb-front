/******************** Config ***************************/
function loadPageConfig(){
    $(".navbar").attr("style","");
    $(".page").addClass("cached");

    refreshFooterHome();

    if($(".config").length>0){
        $(".config").removeClass("cached");
        initializePageConfig();
    }else{
        mainView.router.reloadPage("ES/config.html");
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






