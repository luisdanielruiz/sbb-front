/******************** Reto Velocidad ***************************/
var retoTime1;

function loadPageRetoVelocidad(retoTime){
retoTime1= retoTime;

    $(".navbar").attr("style","");
    $(".page").addClass("cached");

    if($(".retoVelocidad").length>0){
        $(".retoVelocidad").removeClass("cached");
        initializePageRetoVelocidad();

    }else{
        mainView.router.reloadPage("ES/retoVelocidad.html");

    }
}


function initializePageRetoVelocidad(){
    if(userHistory[userHistory.length-1] != $(".page:not(.cached)").attr("data-page")){
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }

    addActionsRetoVelocidad();
}

function addActionsRetoVelocidad(){
    try {
        reset();
    }
    catch(err) {

    }
    setTimeout(function(){ start(); }, 2000);

}


function stopAut (sec){
    if(sec === retoTime1 ){
        stop();
    }
}