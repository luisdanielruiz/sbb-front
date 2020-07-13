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
  var dataFuerzaPrincipiante = [];
  var dataVelocidadPrincipiante = [];
  var dataFuerzaProfesional = [];
  var dataVelocidadProfesional = [];
  var dataFuerzaAmateur = [];
  var dataVelocidadAmateur = [];
  var dataFuerzaLibre = [];
  var dataVelocidadLibre = [];
  var dataSerialized = {
    fuerza: {
      principiante: {
        hits: [],
      },
      amateur: {
        hits: [],
      },
      profesional: {
        hits: [],
      }
    },
    libre: {
      hits: [],
    }
  };

  stats.forEach(listItem => {
    if (listItem.challengue === "Principiante") {
      var arr = JSON.parse(listItem.hits);
      var velocidadItem = arr.length / parseInt(listItem.time);
      dataSerialized.fuerza.principiante.hits = [
        ...dataSerialized.fuerza.principiante.hits,
        ...arr
      ];
      dataVelocidadPrincipiante.push(velocidadItem);
      dataFuerzaPrincipiante = dataSerialized.fuerza.principiante.hits;
    }
    if (listItem.challengue === "Amateur") {
      var arr = JSON.parse(listItem.hits);
      var velocidadItem = arr.length / parseInt(listItem.time);
      dataSerialized.fuerza.amateur.hits = [
        ...dataSerialized.fuerza.amateur.hits,
        ...arr
      ];
      dataVelocidadAmateur.push(velocidadItem);
      dataFuerzaAmateur = dataSerialized.fuerza.amateur.hits;
    }
    if (listItem.challengue === "Profesional") {
      var arr = JSON.parse(listItem.hits);
      var velocidadItem = arr.length / parseInt(listItem.time);
      dataSerialized.fuerza.profesional.hits = [
        ...dataSerialized.fuerza.profesional.hits,
        ...arr
      ];
      dataVelocidadProfesional.push(velocidadItem);
      dataFuerzaProfesional = dataSerialized.fuerza.profesional.hits;
    }
    if (listItem.challengue === "Libre") {
      var arr = JSON.parse(listItem.hits);
      var velocidadItem = arr.length / parseInt(listItem.time);
      dataSerialized.libre.hits = [
        ...dataSerialized.libre.hits, 
        ...arr
      ];
      dataVelocidadLibre.push(velocidadItem);
      dataFuerzaLibre = dataSerialized.libre.hits;
    }
  });

  loadStatistics(dataFuerzaPrincipiante, dataVelocidadPrincipiante, dataFuerzaAmateur, dataVelocidadAmateur,  dataFuerzaProfesional, dataVelocidadProfesional, dataFuerzaLibre, dataVelocidadLibre);
}

function loadStatistics(
  dataFuerzaPrincipiante,
  dataVelocidadPrincipiante,
  dataFuerzaAmateur,
  dataVelocidadAmateur,
  dataFuerzaProfesional,
  dataVelocidadProfesional,
  dataFuerzaLibre,
  dataVelocidadLibre
) {
  if (dataFuerzaPrincipiante && dataFuerzaPrincipiante.length > 0) {
    var maxHitPrincipiante = Math.max(...dataFuerzaPrincipiante);
    var minHitPrincipiante = Math.min(...dataFuerzaPrincipiante);
    var mediaHitPrincipiante = getMediafromArr(dataFuerzaPrincipiante);
    var totalHitsPrincipiante = dataFuerzaPrincipiante.length;
    var mediaVelocidadPrincipiante = getMediafromArr(dataVelocidadPrincipiante);
  } else {
    var maxHitPrincipiante = 0;
    var minHitPrincipiante = 0;
    var mediaHitPrincipiante = 0;
    var totalHitsPrincipiante = 0;
    var mediaVelocidadPrincipiante = 0;
  }

  if (dataFuerzaAmateur && dataFuerzaAmateur.length > 0) {
    var maxHitAmateur = Math.max(...dataFuerzaAmateur);
    var minHitAmateur = Math.min(...dataFuerzaAmateur);
    var mediaHitAmateur = getMediafromArr(dataFuerzaAmateur);
    var totalHitsAmateur = dataFuerzaAmateur.length;
    var mediaVelocidadAmateur = getMediafromArr(dataVelocidadAmateur);
  } else {
    var maxHitAmateur = 0;
    var minHitAmateur = 0;
    var mediaHitAmateur = 0;
    var totalHitsAmateur = 0;
    var mediaVelocidadAmateur = 0;
  }

  if (dataFuerzaAmateur && dataFuerzaAmateur.length > 0) {
    var maxHitProfesional = Math.max(...dataFuerzaProfesional);
    var minHitProfesional = Math.min(...dataFuerzaProfesional);
    var mediaHitProfesional = getMediafromArr(dataFuerzaProfesional);
    var totalHitsProfesional = dataFuerzaProfesional.length;
    var mediaVelocidadProfesional = getMediafromArr(dataVelocidadProfesional);
  } else {
    var maxHitProfesional = 0;
    var minHitProfesional = 0;
    var mediaHitProfesional = 0;
    var totalHitsProfesional = 0;
    var mediaVelocidadProfesional = 0;
  }

  if (dataFuerzaLibre && dataFuerzaLibre.length > 0) {
    var maxHitLibre = Math.max(...dataFuerzaLibre);
    var minHitLibre = Math.min(...dataFuerzaLibre);
    var mediaHitLibre = getMediafromArr(dataFuerzaLibre);
    var totalHitsLibre = dataFuerzaLibre.length;
    var mediaVelocidadLibre = getMediafromArr(dataVelocidadLibre);
  } else {
    var maxHitLibre = 0;
    var minHitLibre = 0;
    var mediaHitLibre = 0;
    var totalHitsLibre = 0;
    var mediaVelocidadLibre = 0;
  }

  var maxHitData = {
    labels: ["Principiante", "Amateur", "Profesional", "Libre"],
    datasets: [
      {
        label: "Maximo",
        data: [
          maxHitPrincipiante,
          maxHitAmateur,
          maxHitProfesional,
          maxHitLibre
        ],
        lineTension: 0.3,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255,99,132,1)"],
      },
      {
        label: "Minimo",
        data: [
          minHitPrincipiante,
          minHitAmateur,
          minHitProfesional,
          minHitLibre
        ],
        lineTension: 0.3,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
      }
    ]
  };

  var ctx = $("#myChart");
  var myChart = new Chart(ctx, {
    type: "radar",
    data: maxHitData,
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
      labels: ["Media de golpes"],
      datasets: [
        {
          label: ["Principiante"],
          data: [mediaHitPrincipiante],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255,99,132,1)"],
          borderWidth: 1
        },
        {
          label: ["Amateur"],
          data: [mediaHitAmateur],
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1
        },
        {
          label: ["Profesional"],
          data: [mediaHitProfesional],
          backgroundColor: ["rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 1
        },
        {
          label: ["Libre"],
          data: [mediaHitLibre],
          backgroundColor: ["rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(75, 192, 192, 1)"],
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
      labels: ["Principiante", "Amateur", "Profesional", "Libre"],
      datasets: [
        {
          data: [
            totalHitsPrincipiante,
            totalHitsAmateur,
            totalHitsProfesional,
            totalHitsLibre
          ],
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

  var ctx4 = $("#myChart4");
  var myChart4 = new Chart(ctx4, {
    type: "bar",
    data: {
      labels: ["Golpes por segundo"],
      datasets: [
        {
          label: ["Principiante"],
          data: [mediaVelocidadPrincipiante],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255,99,132,1)"],
          borderWidth: 1
        },
        {
          label: ["Amateur"],
          data: [mediaVelocidadAmateur],
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1
        },
        {
          label: ["Profesional"],
          data: [mediaVelocidadProfesional],
          backgroundColor: ["rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255, 206, 86, 1)"],
          borderWidth: 1
        },
        {
          label: ["Libre"],
          data: [mediaVelocidadLibre],
          backgroundColor: ["rgba(75, 192, 192, 0.2)"],
          borderColor: ["rgba(75, 192, 192, 1)"],
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
var challengeName;
var dataFuerzaGolpe;

function start(secs, retoChallengeName) {
  status = 1;
  retoTime = secs - 1;
  challengeName = retoChallengeName;
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
          dataFuerzaGolpe = JSON.parse(data);
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
  if (status == 1 && sec > retoTime) {
    sendDataToServer();
    myApp.alert("Reto terminado", "SBB");
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
      try {
        if(dataSensor.data.length){
          document.getElementById("labelFuerzaLibre").innerHTML = dataFuerzaGolpe;
        } else {
          document.getElementById("labelFuerzaLibre").innerHTML = "000";
        }
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
    case "retoFuerza":
      try {
        document.getElementById("labelGolpeFuerza").innerHTML =
          dataSensor.data.length;
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      try {
        if(dataSensor.data.length){
          document.getElementById("labelFuerza").innerHTML = dataFuerzaGolpe;
        } else {
          document.getElementById("labelFuerza").innerHTML = "000";
        }

      } catch (e) {
        myApp.alert(e, "SBB");
      }
      break;
    default:
      break;
  }
}

function sendDataToServer() {
  switch (userHistory[userHistory.length - 1]) {
    case "retoVelocidad":
      try {
        serializeDataSensorVel(challengeName, "Velocidad");
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      break;
    case "retoFuerza":
      try {
        serializeDataSensorVel(challengeName, "Fuerza");
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      break;
    case "libre":
      try {
        serializeDataSensorVel("Libre", "Libre");
      } catch (e) {
        myApp.alert(e, "SBB");
      }
      break;
    default:
      break;
  }
}

function serializeDataSensorVel(challenge, tipoChallenge) {
  try {
    var localDataSensor = JSON.parse(localStorage.getItem("dataSensors"));
    if (localDataSensor) {
      parseDataSensorVel(localDataSensor, challenge, tipoChallenge);
    }
  } catch (e) {
    myApp.alert(e, "SBB");
  }
}

function parseDataSensorVel(sensorData, challenge, tipoChallenge) {
  var dataHits;
  var dataFinal;
  try {
    dataHits = sensorData.data.join().split(",");
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
        Juser.result.idUser +
        "&challengue=" +
        challenge +
        "&tipoChallengue=" +
        tipoChallenge +
        "&hits=[" +
        dataFinal +
        "]" +
        "&time=" +
        retoTime,
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
