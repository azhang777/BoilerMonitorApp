function drawGraph() {
  if (localStorage.getItem("tbRecords") === null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {
    setupCanvas();

    var tempArr = new Array();
    var pressArr = new Array();
    var Datearr = new Array();
    getHistory(tempArr, pressArr, Datearr);
    drawLines(tempArr, pressArr, Datearr);
    labelAxes();
  }
}

function setupCanvas() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 600, 600);
}

function getHistory(tempArr, pressArr, Datearr) {
  var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));

  tbRecords.sort(compareDates);

  for (var i = 0; i < tbRecords.length; i++) {
    var date = new Date(tbRecords[i].Date);

    /*These methods start at 0, must increment
     * by one to compensate
     */
    var m = date.getMonth() + 1;
    var d = date.getDate() + 1;

    //The x-axis label
    Datearr[i] = m + "/" + d;

    //The point to plot
    tempArr[i] = parseFloat(tbRecords[i].Temperature);
    pressArr[i] = parseFloat(tbRecords[i].Pressure);
  }
}

function drawLines(tempArr, pressArr, Datearr) {
  var line = new RGraph.Line("GraphCanvas", tempArr, pressArr, Datearr)
    .Set("labels", Datearr)
    .Set("colors", ["red", "blue"])
    .Set("shadow", false)
    .Set("linewidth", 1)
    .Set("numxticks", 5)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
    .Set("gutter.left", 60)
    .Set("tickmarks", "filledcircle")
    .Set("ticksize", 5)
    .Set("chart.labels.above", true)

    .Set("chart.title", "Boiler Monitor")
    .Draw();
}

function labelAxes() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "11px Georgia";
  ctx.fillStyle = "green";
  ctx.fillText("Date(MM/DD)", 850, 690);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("Temp(RED) & Pressure(BLUE) Value", -350, 10);
}
