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
    serializeDataSensor();
  } catch (e) {
    myApp.alert(e, "SBB");
  }
}

function serializeDataSensor() {
  try {
    var localDataSensor = JSON.parse(localStorage.getItem("dataSensors"));
    if (localDataSensor) {
      parseDataSensor(localDataSensor);
    }
  } catch (e) {
    myApp.alert(e, "SBB");
  }
}

function parseDataSensor(arr) {
  var dataHits;
  var dataFinal;
  try {
    dataHits = arr.data.join().split(",");
    dataFinal = dataHits.map(item => JSON.parse(item));
  } catch (e) {
    myApp.alert(e, "SBB");
  }
  try {
    $.ajax({
      type: "GET",
      url: appServices.SBBWriteStatistics,
      data:
        "user=" +
        idUserGlobal +
        "&challengue=Principiante" +
        "&tipoChallengue=Fuerza" +
        "&hits=[" + dataFinal + "]",
      contentType: "application/json",
      sync: false,
      dataType: "JSON",
      success: function(data) {
        $("#loading").css("display", "none");
      },
      error: function(data) {
        $("#loading").remove();
        myApp.alert("Problemas en la conexión a internet", "SBB");
      }
    });
  } catch (e) {
    myApp.alert(e, "SBB");
  }
}
