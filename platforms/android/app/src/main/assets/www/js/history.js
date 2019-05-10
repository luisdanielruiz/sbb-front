/******************** History ***************************/
function loadPageHistory() {
  $("#myChart").remove();
  $("#myChart2").remove();
  $("#myChart3").remove();

  $(".navbar").attr("style", "");
  $(".page").addClass("cached");

  if ($(".history").length > 0) {
    $(".history").removeClass("cached");
    initializePageHistory();
  } else {
    mainView.router.reloadPage("ES/history.html");
  }
}

function initializePageHistory() {
  if (
    userHistory[userHistory.length - 1] !=
    $(".page:not(.cached)").attr("data-page")
  ) {
    userHistory.push($(".page:not(.cached)").attr("data-page"));
  }

  addActionsHistory();
}

function addActionsHistory() {
  fetchStatistics();
}
