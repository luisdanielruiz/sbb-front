var listVelRetos = null;
var listForRetos = null;
var statusConected = false;
var dataSensor = {
  sensor: "acelerometer",
  data: []
};
var dataSensorHistory = [];
var idUserGlobal = JSON.parse(localStorage.getItem("localUser")).result.idUser;
var dataPrincipiante = [];
var dataProfesional = [];
var dataAmateur = [];

function loadVelocidadRetos() {
  $(".feedVelocidad")
    .children("div")
    .remove();
  $.ajax({
    type: "POST",
    url: appServices.SBBListarRetos,
    contentType: "application/json",
    sync: false,
    dataType: "JSON",
    success: function(data) {
      var parsedData = JSON.parse(data);
      if (parsedData.status === "ok") {
        listVelRetos = parsedData.result;
        for (var i = 0; i < listVelRetos.length; i++) {
          if (listVelRetos[i].tipoChallengue === "Velocidad") {
            var velocidadRetoHTML = compiledListVelocidadTemplate(
              listVelRetos[i]
            );
            $(".feedVelocidad").append(velocidadRetoHTML);
          }
        }
      }
    },
    error: function(data) {
      myApp.alert("Problemas en la conexión a internet", "SBB");
    }
  });
}

function loadFuerzaRetos() {
  $(".feedFuerza")
    .children("div")
    .remove();
  $.ajax({
    type: "POST",
    url: appServices.SBBListarRetos,
    contentType: "application/json",
    sync: false,
    dataType: "JSON",
    success: function(data) {
      var parsedData = JSON.parse(data);
      if (parsedData.status === "ok") {
        listForRetos = parsedData.result;

        for (var i = 0; i < listForRetos.length; i++) {
          if (listForRetos[i].tipoChallengue === "Fuerza") {
            //console.log(listForRetos[i]);
            var profileHTML = compiledListFuerzaTemplate(listForRetos[i]);
            $(".feedFuerza").append(profileHTML);
          }
        }
      }
    },
    error: function(data) {
      myApp.alert("Problemas en la conexión a internet", "SBB");
    }
  });
}

function retoVel() {
  loadPageConectar("retoVelocidad");
}

function retoFor() {
  loadPageConectar("retoFuerza");
}

function loadAll() {
  $("#loading").css("z-index", 9999);
  $("#loading").css("display", "block");
  $("#loading").css("display", "none");
}

function fetchStatistics() {
  $.ajax({
    type: "GET",
    url: appServices.SBBReadDataStatistics,
    data: "idUser=" + idUserGlobal,
    contentType: "application/json",
    sync: false,
    dataType: "JSON",
    success: function(data) {
      var parsedData = JSON.parse(data);
      if (parsedData.status === "ok") {
        listStats = parsedData.result;
        for (var i = 0; i < listStats.length; i++) {
          if (listStats[i].tipoChallengue === "Fuerza") {
            if (listStats[i].challengue === "Principiante") {
              var arr = JSON.parse(listStats[i].hits);
              dataPrincipiante = dataPrincipiante.concat(arr);
            } else if (listStats[i].challengue === "Profesional") {
              var arr = JSON.parse(listStats[i].hits);
              dataProfesional = dataProfesional.concat(arr);
            } else if (listStats[i].challengue === "Amateur") {
              var arr = JSON.parse(listStats[i].hits);
              dataAmateur = dataAmateur.concat(arr);
            }
          }
        }
        loadStatistics(dataPrincipiante, dataProfesional, dataAmateur);
      } else {
        myApp.alert("Aun no tienes información para mostrar", "SBB");
      }
    },
    error: function(data) {
      myApp.alert("Problemas en la conexión a internet", "SBB");
    }
  });
}

function loadStatistics(dataPrincipiante, dataProfesional, dataAmateur) {
  var maxHitPrincipiante = Math.max(...dataPrincipiante);
  var minHitPrincipiante = Math.min(...dataPrincipiante);
  var totalHitsPrincipiante = dataPrincipiante.length;

  var maxHitProfesional = Math.max(...dataProfesional);
  var minHitProfesional = Math.min(...dataProfesional);
  var totalHitsProfesional = dataProfesional.length;

  var maxHitAmateur = Math.max(...dataAmateur);
  var minHitAmateur = Math.min(...dataAmateur);
  var totalHitsAmateur = dataAmateur.length;

  var ctx = $("#myChart");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Principiante", "Amateur", "Profesional"],
      datasets: [
        {
          label: "Golpe mas fuerte",
          data: [maxHitPrincipiante, maxHitAmateur, maxHitProfesional],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 5,
          bottom: 10
        }
      }
    }
  });

  var ctx2 = $("#myChart2");
  var myChart2 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["Principiante", "Amateur", "Profesional"],
      datasets: [
        {
          label: "Golpe menos fuerte",
          data: [minHitPrincipiante, minHitAmateur, minHitProfesional],
          backgroundColor: ["rgba(153, 102, 255, 0.2)"],
          borderColor: ["rgba(153, 102, 255, 1)"],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 100
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 5,
          bottom: 10
        }
      }
    }
  });

  var ctx3 = $("#myChart3");
  var myChart3 = new Chart(ctx3, {
    type: "doughnut",
    data: {
      labels: ["Principiante", "Amateur", "Profesional"],
      datasets: [
        {
          label: "Golpes totales",
          data: [totalHitsPrincipiante, totalHitsAmateur, totalHitsProfesional],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 800
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 5,
          bottom: 10
        }
      }
    }
  });

  ctx4 = $("#myChart4");
  myChart4 = new Chart(ctx4, {
    type: "radar",
    data: {
      labels: ["Principiante", "Amateur", "Profesional"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 13],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 5,
          bottom: 10
        }
      }
    }
  });
}
/**STOPWATCH */
var status = 0; //0:stop 1:running
var time = 0;
var min;
var sec = 0;
var mSec;
var retoTime;

function start(secs) {
  status = 1;
  retoTime = secs - 1;
  timer();
}

// function stop() {
//   status = 0;
//   stopSensing();
//   dataSensor = [];
//   bluetoothSerial.clear(
//     console.log("data clear"),
//     console.log("data clear error")
//   );
// }

function timer() {
  if (status == 1 && sec <= retoTime) {
    bluetoothSerial.read(
      function(data) {
        var isDataEmpty = !Object.keys(data).length;
        if (!isDataEmpty) {
          dataSensor.data.push(JSON.parse(data));
          localStorage.setItem("dataSensors", JSON.stringify(dataSensor));
        }
      },
      function(err) {
        myApp.alert("error al leer datos", "SBB");
      }
    );
    setTimeout(function() {
      time++;
      min = Math.floor(time / 100 / 60);
      sec = Math.floor(time / 100);
      mSec = time % 100;

      if (min < 10) {
        min = "0" + min;
      }
      if (sec >= 60) {
        sec = sec % 60;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }

      try {
        document.getElementById("timerLabel").innerHTML =
          min + ":" + sec + ":" + mSec;
      } catch (e) {}

      try {
        document.getElementById("timerLabel2").innerHTML =
          min + ":" + sec + ":" + mSec;
      } catch (e) {}
      timer();
    }, 10);
  }
}

function reset() {
  status = 0;
  time = 0;
  try {
    document.getElementById("timerLabel").innerHTML = "00:00:00";
  } catch (e) {}
  try {
    document.getElementById("timerLabel2").innerHTML = "00:00:00";
  } catch (e) {}
  bluetoothSerial.clear(
    console.log("data clear"),
    console.log("data clear error")
  );
  dataSensor.data = [];
}


