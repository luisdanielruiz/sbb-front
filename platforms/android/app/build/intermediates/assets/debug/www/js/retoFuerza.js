/******************** Reto Fuerza ***************************/
function loadPageRetoFuerza() {
    $(".navbar").attr("style", "");
    $(".page").addClass("cached");

    if ($(".retoFuerza").length > 0) {
        $(".retoFuerza").removeClass("cached");
        initializePageRetoFuerza();

    } else {
        mainView.router.reloadPage("ES/retoFuerza.html");
    }
}


function initializePageRetoFuerza() {
    if (userHistory[userHistory.length - 1] != $(".page:not(.cached)").attr("data-page")) {
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }

    addActionsRetoFuerza();
}


function addActionsRetoFuerza() {

}
