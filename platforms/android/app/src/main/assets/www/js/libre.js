/******************** Libre ***************************/
function loadPageLibre() {
  $(".navbar").attr("style", "");
  $(".page").addClass("cached");

  if ($(".libre").length > 0) {
    $(".libre").removeClass("cached");
    initializePageLibre();
  } else {
    mainView.router.reloadPage("ES/libre.html");
  }
}

function initializePageLibre() {
  if (
    userHistory[userHistory.length - 1] !=
    $(".page:not(.cached)").attr("data-page")
  ) {
    userHistory.push($(".page:not(.cached)").attr("data-page"));
  }

  addActionsLibre();
}

function addActionsLibre() {
  try {
    reset();
  } catch (err) {
    console.log(err);
  }

  setTimeout(function() {
    start();
  }, 2000);

  myApp.alert(
    JSON.parse(localStorage.getItem("dataSensors")),
    "data sensors local"
  );
  myApp.alert(
    JSON.parse(localStorage.getItem("dataSensors"))[0][0].hitNumber,
    "data local .hitnumber"
  );
  myApp.alert(
    JSON.parse(localStorage.getItem("dataSensors"))[0].length,
    "data local.length"
  );
  myApp.alert(
    JSON.parse(localStorage.getItem("dataSensorsHistory")),
    "dataHistory.length"
  );
}
