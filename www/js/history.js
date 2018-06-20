/******************** History ***************************/
function loadPageHistory(){
    $(".navbar").attr("style","");
    $(".page").addClass("cached");

    refreshFooterHome();

    if($(".home").length>0){
        $(".home").removeClass("cached");
        initializePageHistory();
    }else{
        mainView.router.reloadPage("ES/home.html");
    }
}

function initializePageHistory(){
    if(userHistory[userHistory.length-1] != $(".page:not(.cached)").attr("data-page")){
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }
    addActionsHistory();

}

function addActionsHistory(){

}






