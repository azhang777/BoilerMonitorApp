function advicePage() {
  if (localStorage.getItem("tbRecords") === null) {
    alert("No records exist.");

    $(location).attr("href", "#pageMenu");
  } else {
    var user = JSON.parse(localStorage.getItem("user"));
    var PrefTemp = user.PrefTemp;
    var PrefPressure = user.PrefPressure;
    var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
    tbRecords.sort(compareDates);
    var i = tbRecords.length - 1;
    var TSH = tbRecords[i].Temperature;
    var Pressure = tbRecords[i].Pressure;

    var c = document.getElementById("AdviceCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 600, 600);
    ctx.font = "22px Arial";
    drawAdviceCanvas(ctx, TSH, Pressure, PrefTemp, PrefPressure);
    writeAdvice(ctx, PrefTemp, PrefPressure, TSH, Pressure);
  }
}

function drawAdviceCanvas(ctx, TSH, Pressure, PrefTemp, PrefPressure) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(
    "The current temperature and pressure for the boiler is " +
      TSH +
      " °F and " +
      Pressure +
      " PSI.",
    10,
    60
  );
  ctx.fillText(
    "The preferred temperature and pressure for the boiler is " +
      PrefTemp +
      " °F and " +
      PrefPressure +
      " PSI.",
    10,
    100
  );
}

function writeAdvice(ctx, PrefTemp, PrefPressure, TSH, Pressure) {
  var adviceLine1 = "";
  var adviceLine2 = "";
  var img = new Image();
  img.src = "./assets/safe.png";
  if (TSH > PrefTemp) {
    adviceLine1 = "Lower the temperature for the boiler.";
    img.src = "./assets/warning.png";
  } else if (TSH < PrefTemp) {
    adviceLine1 = "Increase the temperature for the boiler.";
    img.src = "./assets/safe.png";
  } else {
    adviceLine1 = "Temperature is normal";
  }
  if (Pressure > PrefPressure) {
    adviceLine2 = "Lower the PSI for the boiler.";
    img.src = "./assets/safe.png";
  } else if (Pressure < PrefPressure) {
    adviceLine2 = "Increase the PSI for the boiler";
    img.src = "./assets/safe.png";
  } else {
    adviceLine2 = "Pressure is normal";
  }

  img.onload = () => {
    ctx.drawImage(img, 250, 230, 100, 100);
  };
  ctx.fillText("ADVICE: ", 10, 380);
  ctx.fillText(adviceLine1, 10, 410);
  ctx.fillText(adviceLine2, 10, 440);
}
