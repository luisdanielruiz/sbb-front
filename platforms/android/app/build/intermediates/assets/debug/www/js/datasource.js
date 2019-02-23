var listVelRetos = null;
var listForRetos = null;
var statusConected = false;
var isSensing = false;
var dataSensor = [];
var dataSensorHistory = [];

function stopSensing() {
    isSensing = false;
}

function startSensing() {
    isSensing = true;
}

function loadVelocidadRetos() {
    $('.feedVelocidad').children("div").remove();
    $.ajax({
        type: "POST",
        url: appServices.SBBListarRetos,
        contentType: "application/json",
        sync: false,
        dataType: "JSON",
        success: function (data) {
            var parsedData = JSON.parse(data);
            if (parsedData.status === "ok") {
                listVelRetos = parsedData.result;
                for (var i = 0; i < listVelRetos.length; i++) {
                    if (listVelRetos[i].tipoChallengue === "Velocidad") {
                        var velocidadRetoHTML = compiledListVelocidadTemplate(listVelRetos[i]);
                        $('.feedVelocidad').append(velocidadRetoHTML);
                    }
                }
            }
        }, error: function (data) {
            myApp.alert("Problemas en la conexión a internet", "SBB");
        }
    });
}

function loadFuerzaRetos() {

    $('.feedFuerza').children("div").remove();
    $.ajax({
        type: "POST",
        url: appServices.SBBListarRetos,
        contentType: "application/json",
        sync: false,
        dataType: "JSON",
        success: function (data) {
            var parsedData = JSON.parse(data);
            if (parsedData.status === "ok") {
                listForRetos = parsedData.result;

                for (var i = 0; i < listForRetos.length; i++) {

                    if (listForRetos[i].tipoChallengue === "Fuerza") {
                        //console.log(listForRetos[i]);
                        var profileHTML = compiledListFuerzaTemplate(listForRetos[i]);
                        $('.feedFuerza').append(profileHTML);
                    }
                }
            }

        }, error: function (data) {
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
    $('#loading').css('z-index', 9999);
    $('#loading').css('display', 'block');
    $('#loading').css('display', 'none');
}

var ctx;
var myChart;
var ctx2;
var myChart2;
var ctx3;
var myChart3;
var ctx4;
var myChart4;

function removeCharts() {
    $('.chartContainer').children("div").remove();
}

function addCharts() {
    $('#chartContainer').append('<div class="chartHistory">\n' +
        '<canvas id="myChart"></canvas>\n' +
        '</div>');

    $('#chartContainer').append('<div class="chartHistory">\n' +
        '<canvas id="myChart2"></canvas>\n' +
        '</div>');

    $('#chartContainer').append('<div class="chartHistory">\n' +
        '<canvas id="myChart3"></canvas>\n' +
        '</div>');

    loadStatistics();

}



function loadStatistics() {

    ctx = $("#myChart");
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Principiante", "Amateur", "Profesional"],
            datasets: [{
                label: 'Media de Fuerza',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }, layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 10
                }
            }
        }
    });

    ctx2 = $("#myChart2");
    myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ["Principiante", "Amateur", "Profesional"],
            datasets: [{
                label: 'Media de Velocidad',
                data: [180, 300, 120],
                backgroundColor: [

                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 500
                    }
                }]
            }, layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 10
                }
            }
        }
    });

    ctx3 = $("#myChart3");
    myChart3 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: ["Principiante", "Amateur", "Profesional"],
            datasets: [{
                label: 'Cantidad de golpes',
                data: [260, 290, 260],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 800
                    }
                }]
            }, layout: {
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

function stop() {
    status = 0;
    stopSensing();
    dataSensorHistory.push([dataSensor]);
    localStorage.setItem('dataSensorsHistory', JSON.stringify(dataSensorHistory));
    dataSensor = [];
}

function reset() {
    status = 0;
    time = 0;
    try {
        document.getElementById('timerLabel').innerHTML = '00:00:00';
    } catch (e) {

    }
    try {
        document.getElementById('timerLabel2').innerHTML = '00:00:00';
    } catch (e) {

    }
}

function timer() {
    if (status == 1 && sec <= retoTime) {
        bluetoothSerial.read(function (data) {
            var isDataEmpty = !Object.keys(data).length;
            if (!isDataEmpty){
                dataSensor.push([data]);
                localStorage.setItem('dataSensors', JSON.stringify(dataSensor));
            }
        }, function (err) {
            myApp.alert("error al leer datos", "SBB");
        });
        setTimeout(function () {
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
                document.getElementById('timerLabel').innerHTML = min + ":" + sec + ":" + mSec;
            } catch (e) {

            }

            try {
                document.getElementById('timerLabel2').innerHTML = min + ":" + sec + ":" + mSec;
            } catch (e) {

            }
                timer();
        }, 10);
    }
}

function loadStatistics2() {

    ctx = $("#myChart");
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Principiante", "Amateur", "Profesional"],
            datasets: [{
                label: 'Media de Fuerza',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }, layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 10
                }
            }
        }
    });

    ctx2 = $("#myChart2");
    myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ["Principiante", "Amateur", "Profesional"],
            datasets: [{
                label: 'Media de Velocidad',
                data: [280, 300, 320],
                backgroundColor: [

                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 500
                    }
                }]
            }, layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 10
                }
            }
        }
    });

    ctx3 = $("#myChart3");
    myChart3 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: ["Principiante", "Amateur", "Profesional"],
            datasets: [{
                label: 'Cantidad de golpes',
                data: [260, 290, 260],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 800
                    }
                }]
            }, layout: {
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
        type: 'radar',
        data: {
            labels: ["Principiante", "Amateur", "Profesional"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 13],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }, layout: {
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


