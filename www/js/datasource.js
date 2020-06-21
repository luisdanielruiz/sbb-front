var listVelRetos = null;
var listForRetos = null;
var statusConected = false;
var dataSensor = {
  sensor: "acelerometer",
  data: []
};
var dataSensorHistory = [];
var listStats = null;

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
  myApp.showPreloader();
  $.ajax({
    type: "GET",
    url: appServices.SBBReadDataStatistics,
    data: "idUser=" + Juser.result.idUser,
    contentType: "application/json",
    sync: false,
    dataType: "JSON",
    success: function(data) {
      var parsedData = JSON.parse(data);
      if (parsedData.status === "ok") {
        listStats = parsedData.result;
        serializeStats(listStats);
        myApp.hidePreloader();
      } else {
        myApp.hidePreloader();
        myApp.alert("No se encontraron datos.", "SBB");
      }
    },
    error: function(data) {
      myApp.hidePreloader();
      myApp.alert("Problemas en la conexión a internet.", "SBB");
    }
  });
}

function serializeStats(stats) {
  var dataPrincipiante = [];
  var dataProfesional = [];
  var dataAmateur = [];
  var dataSerialized = {
    fuerza: {
      principiante: {
        hits: []
      },
      amateur: {
        hits: []
      },
      profesional: {
        hits: []
      }
    }
  };

  stats.forEach(listItem => {
    if (listItem.challengue === "Principiante") {
      var arr = JSON.parse(listItem.hits);
      dataSerialized.fuerza.principiante.hits = [
        ...dataSerialized.fuerza.principiante.hits,
        ...arr
      ];
      dataPrincipiante = dataSerialized.fuerza.principiante.hits;
    }
    if (listItem.challengue === "Amateur") {
      var arr = JSON.parse(listItem.hits);
      dataSerialized.fuerza.amateur.hits = [
        ...dataSerialized.fuerza.amateur.hits,
        ...arr
      ];
      dataAmateur = dataSerialized.fuerza.amateur.hits;
    }
    if (listItem.challengue === "Profesional") {
      var arr = JSON.parse(listItem.hits);
      dataSerialized.fuerza.profesional.hits = [
        ...dataSerialized.fuerza.profesional.hits,
        ...arr
      ];
      dataProfesional = dataSerialized.fuerza.profesional.hits;
    }
  });

  loadStatistics(dataPrincipiante, dataProfesional, dataAmateur);
}

function loadStatistics(dataPrincipiante, dataProfesional, dataAmateur) {
  var maxHitPrincipiante = Math.max(...dataPrincipiante);
  var mediaHitPrincipiante = getMediafromArr(dataPrincipiante);
  var totalHitsPrincipiante = dataPrincipiante.length;

  var maxHitAmateur = Math.max(...dataAmateur);
  var mediaHitAmateur = getMediafromArr(dataAmateur);
  var totalHitsAmateur = dataAmateur.length;

  var maxHitProfesional = Math.max(...dataProfesional);
  var mediaHitProfesional = getMediafromArr(dataProfesional);
  var totalHitsProfesional = dataProfesional.length;

  var ctx = $("#myChart");
  var myChart = new Chart(ctx, {
    type: "line",
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
    type: "bar",
    data: {
      labels: ["Principiante", "Amateur", "Profesional"],
      datasets: [
        {
          label: "Golpe promedio",
          data: [mediaHitPrincipiante, mediaHitAmateur, mediaHitProfesional],
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

  ctx4 = $("#myChart4");
  myChart4 = new Chart(ctx4, {
    type: "radar",
    data: {
      labels: ["Principiante", "Amateur", "Profesional"],
      datasets: [
        {
          label: "# de golpes",
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
      // Update UI
      updateUI();
      timer();
    }, 10);
  } 
  if(status == 1 && sec > retoTime) {    
    myApp.alert("Muy bien! Tomate un descanso.", "SBB");
  }  
}

function reset() {
  status = 0;
  time = 0;
  sec = 0;
  switch (userHistory[userHistory.length - 1]) {
    case "libre":
      try {
        document.getElementById("labelTimerLibre").innerHTML = "00:00:00";
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      break;
    case "retoVelocidad":
      try {
        document.getElementById("labelTimerVelocidad").innerHTML = "00:00:00";
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      break;
    default:
      break;
  }

  bluetoothSerial.clear(
    console.log("data clear"),
    console.log("data clear error")
  );
  dataSensor.data = [];
}

function getMediafromArr(arr) {
  var avg = arr.reduce(function(a, b) {
    return a + b;
  });
  return avg / arr.length;
}

function updateUI() {
  switch (userHistory[userHistory.length - 1]) {
    case "libre":
      try {
        document.getElementById("labelGolpeLibre").innerHTML =
          dataSensor.data.length;
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      try {
        document.getElementById("labelTimerLibre").innerHTML =
          min + ":" + sec + ":" + mSec;
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      break;
    case "retoVelocidad":
      try {
        document.getElementById("labelGolpeVelocidad").innerHTML =
          dataSensor.data.length;
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      try {
        document.getElementById("labelTimerVelocidad").innerHTML =
          min + ":" + sec + ":" + mSec;
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      break;
    default:
      break;
  }
}
