/******************** Reto Velocidad ***************************/
var retoTime1;
var retoVelocidadChallenge;
var categoriaVelocidad;

function loadPageRetoVelocidad(retoTime, categoria) {
  categoriaVelocidad = categoria;
  console.log("************ --> ", categoriaVelocidad);
  retoTime1 = retoTime;
  $(".navbar").attr("style", "");
  $(".page").addClass("cached");

  if ($(".retoVelocidad").length > 0) {
    $(".retoVelocidad").removeClass("cached");
    initializePageRetoVelocidad();
  } else {
    mainView.router.reloadPage("ES/retoVelocidad.html");
  }
}

function initializePageRetoVelocidad() {
  if (
    userHistory[userHistory.length - 1] !=
    $(".page:not(.cached)").attr("data-page")
  ) {
    userHistory.push($(".page:not(.cached)").attr("data-page"));
  }

  addActionsRetoVelocidad();
}

function addActionsRetoVelocidad() {
  try {
    reset();
    setTimeout(function() {
      start(retoTime1, categoriaVelocidad);
    }, 1000);
  } catch (e) {
    myApp.alert(e, "SBB");
  }
}
