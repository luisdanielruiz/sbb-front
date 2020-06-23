/******************** Libre ***************************/
var retoTimeLibre = 2160
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
    setTimeout(function() {
      start(retoTimeLibre);
    }, 1000);
  } catch (e) {
    myApp.alert(e, "SBB");
  }
}
