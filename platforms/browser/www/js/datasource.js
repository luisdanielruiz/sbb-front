var tySVersion = "tySVersion";

function actualizarListaLocales(){
    $.ajax({
        url: appServices.TySVersionLocal,
		success:function (data){
            if (localStorage.getItem(tySVersion) == null || localStorage.getItem(tySVersion) != data) {//miro version
                tempVersion = data;
                $.ajax({
                    url: appServices.TySListarRubrosLocal,
                    success: function (data3) {

                        //localStorage.setItem(listRubrosLocal, data3);
                        //loadListarRubros();
                    	}, error: function (jqXHR, textStatus, errorThrown) {
                        //loadListarRubros();
                   		 }
                		});
			   }
            }

    });
}

function loadListarProduct(){
    var dataProduct =null;
    dataProduct = JSON.parse(localStorage.listProductLocal);
    //carga de imagenes en array
                    for (var i = 0; i < dataProduct.length; i++) {
                    dataProduct[i].posProduct = i;
                    if (dataProduct[i].imageProduct == null || dataProduct[i].imageProduct == "") {
                        dataProduct[i].imageProduct = "img/noImageDirectory.png";
                        dataProduct[i].arrayImageProduct= ["img/noImage2.png"];
                    } else {

                        dataProduct[i].arrayImageProduct = dataProduct[i].imageProduct.split("|");

                        for (var j =0; j< dataProduct[i].arrayImageProduct.length;j++){
                            dataProduct[i].arrayImageProduct[j] = appServices.TySImg+dataProduct[i].arrayImageProduct[j];
                        }
                        if (dataProduct[i].arrayImageProduct[dataProduct[i].arrayImageProduct.length-1] == appServices.TySImg){
                            dataProduct[i].arrayImageProduct.pop();
                        }

                        dataProduct[i].imageProduct=dataProduct[i].arrayImageProduct[0];
                        //dataProduct[i].arrayImageProduct.pop();
                        //armar variable img directory

                        // armar array imagenes para tomar con for de template
                        
                    }
                    
                }

    $('#loading').remove();
    
}

function loadAll(){
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
    $(".chartHistory").remove()
}

function addCharts() {
    $('#chartContainer').append('<div class="chartHistory">\n' +
        '                        <canvas id="myChart"></canvas>\n' +
        '                    </div>') ;

    $('#chartContainer').append('<div class="chartHistory">\n' +
        '                        <canvas id="myChart2"></canvas>\n' +
        '                    </div>') ;

    $('#chartContainer').append('<div class="chartHistory">\n' +
        '                        <canvas id="myChart3"></canvas>\n' +
        '                    </div>') ;

    $('#chartContainer').append('<div class="chartHistory">\n' +
        '                        <canvas id="myChart4"></canvas>\n' +
        '                    </div>') ;

    loadStatistics();

}



function loadStatistics(){

    ctx = $("#myChart");
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: 'Media de Fuerza',
                data: [12, 19, 3, 5, 2, 3],
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
                        beginAtZero:true
                    }
                }]
            },layout: {
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
            labels: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"],
            datasets: [{
                label: 'Velocidad media de golpes por dia M/seg',
                data: [280, 300, 320, 290, 310, 300],
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
                        beginAtZero:true,
                        max: 500
                    }
                }]
            },layout: {
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
            labels: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"],
            datasets: [{
                label: 'Cantidad de golpes por dia',
                data: [260, 290, 260, 300, 300, 250],
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
                        beginAtZero:true,
                        max:800
                    }
                }]
            },layout: {
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
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
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
                        beginAtZero:true
                    }
                }]
            },layout: {
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
var sec;
var mSec;

function start(){
    status = 1;
    timer();
}

function stop(){
    status = 0;
}

function reset(){
    status = 0;
    time = 0;
    try {
        document.getElementById('timerLabel').innerHTML = '00:00:00';
    }catch (e) {

    }
    try {
        document.getElementById('timerLabel2').innerHTML = '00:00:00';
    }catch (e) {

    }


}

function timer(){
    if(status == 1){
        setTimeout(function(){
            time++;

            min = Math.floor(time/100/60);
            sec = Math.floor(time/100);
            mSec = time % 100;
            stopAut (sec);

            if(min < 10) {
                min = "0" + min;
            }
            if(sec >= 60) {
                sec = sec % 60;

            }
            if(sec < 10) {
                sec = "0" + sec;
            }

            try{
                document.getElementById('timerLabel').innerHTML = min + ":" + sec + ":" + mSec;
            }catch (e) {

            }

            try{
                document.getElementById('timerLabel2').innerHTML = min + ":" + sec + ":" + mSec;
            }catch (e) {

            }

            timer();

        }, 10);
    }
}

