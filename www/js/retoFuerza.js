/******************** Reto Fuerza ***************************/
var categoriaFuerza;
var timeFuerza;

function loadPageRetoFuerza(retoTime,categoriaReto) {
  console.log("************ --> ", categoriaReto);
  categoriaFuerza = categoriaReto;
  timeFuerza = retoTime;
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
  if (
    userHistory[userHistory.length - 1] !=
    $(".page:not(.cached)").attr("data-page")
  ) {
    userHistory.push($(".page:not(.cached)").attr("data-page"));
  }

  addActionsRetoFuerza();
}

function addActionsRetoFuerza() {
  try {
    reset();
    setTimeout(function() {
      start(timeFuerza, categoriaFuerza);
    }, 1000);
  } catch (e) {
    myApp.alert(e, "SBB");
  }
}
