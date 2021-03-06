google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawCharts);


function drawCharts(systemResources) {

    if (systemResources === undefined) {
        return;
    }

    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['CPU', 0],
        ['Memory', 0]
    ]);

    var options = {
        width: 400, height: 160,
        redFrom: 90, redTo: 100,
        yellowFrom:75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart-div'));

    data.setValue(0, 1, systemResources.cpu);
    data.setValue(1, 1, systemResources.memory);
    chart.draw(data, options);

}

var socket;
$.get("/port", function (data) {
    var port = data.port;
    socket = io.connect("http://localhost:" + port);

    socket.on("systemResources", function (data) {
        drawCharts(data);
    });
});

