/******************** History ***************************/
function loadPageHistory() {

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
    if (userHistory[userHistory.length - 1] != $(".page:not(.cached)").attr("data-page")) {
        userHistory.push($(".page:not(.cached)").attr("data-page"));
    }

    addActionsHistory();
}

function addActionsHistory() {

    var dataChart = [12, 19, 3];
    var labelsChart = ["Principiante", "Amateur", "Profesional"];
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsChart,
            datasets: [{
                label: 'Media de Fuerza',
                data: dataChart,
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
    // $('#myChart').remove();
}