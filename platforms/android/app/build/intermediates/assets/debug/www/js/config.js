/******************** Config ***************************/
function loadPageConfig() {
  $(".navbar").attr("style", "");
  $(".page").addClass("cached");

  refreshFooterHome();

  if ($(".config").length > 0) {
    $(".config").removeClass("cached");
    initializePageConfig();
  } else {
    mainView.router.reloadPage("ES/config.html");
  }
}

function initializePageConfig() {
  if (
    userHistory[userHistory.length - 1] !=
    $(".page:not(.cached)").attr("data-page")
  ) {
    userHistory.push($(".page:not(.cached)").attr("data-page"));
  }
  addActionsConfig();
}

function addActionsConfig() {
  $("#configBtn")[0].onclick = function enterKey(e) {
    setWeightBag();
  };
}

function setWeightBag() {
  var weightBag = JSON.parse($("#inputWeightBag").val());
  if (JSON.parse(weightBag) <= 0) {
    myApp.alert("EL valor no puede ser menor o igual a 0", "SBB");
  } else {
    localStorage.setItem("weightBag", weightBag);
    bluetoothSerial.disconnect(function() {
      statusConected = false;
      myApp.alert(
        "Conecta de vuelta tu SBB para finalizar la configuración.",
        "SBB",
        loadPageConectar()
      );
    }, console.log("error desconectando"));
  }
}
