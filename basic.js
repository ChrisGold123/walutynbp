function giveDate(id) {
  var data = new Date;
switch (id) {
  case "rokStart":
    document.getElementById(id).value = data.getFullYear();
    break;
  case "miesiacStart":
    document.getElementById(id).value = data.getMonth();
    break;
  case "rok":
    document.getElementById(id).value = data.getFullYear();
    break;
  case "miesiac":
    document.getElementById(id).value = data.getMonth() + 1;
    break;
  case "dzien":
    document.getElementById(id).value = data.getDate();
    break;
  default:
    console.log("nie działa pobieranie dzisiejszej daty do formularza");;
  }
}

function deleteColor() {
  $('#demo .unselectable').css('background-color', '#FFFFFF');
}

function checkTheBoxes(bool) {
  $('#demo tr').each(function() {
    $("input[type='checkbox']").prop('checked', bool);
  });
}

function colorIfChecked(bool, boolIfChecked) {
  $('#demo tr').each(function() {
    if($(this).is("[id]")) {
      var parentId = '#' + this.id;
      var ifChecked = $(parentId + " input").is(":checked");
      if (boolIfChecked) {
        if(ifChecked) {
        $(parentId + " .unselectable").css('background-color', (bool) ? document.getElementById('paletaKolorow').value : "#FFFFFF");
        }
      } else {
        if(ifChecked) {
          $(parentId + '.unselectable').css('background-color', (bool) ? "#FFFFFF" : document.getElementById('paletaKolorow').value)
        } else {
          $(parentId + " .unselectable").css('background-color', (bool) ? document.getElementById('paletaKolorow').value : "#FFFFFF");
          console.log('lol');
        }
      }
    }
  });
}

function loadXMLDoc() {
  var tabela = document.getElementById("tabela").value;
  console.log(tabela);
  var currency = document.getElementById("waluta").value;
  var yearStart = document.getElementById("rokStart").value;
  var monthStart = document.getElementById("miesiacStart").value;
  var dayStart = document.getElementById("dzienStart").value;
  if(dayStart < 10) {dayStart = "0" + dayStart};
  if(monthStart < 10) {monthStart = "0" + monthStart};
  var yearEnd = document.getElementById("rok").value;
  var monthEnd = document.getElementById("miesiac").value;
  var dayEnd = document.getElementById("dzien").value;
  if(dayEnd < 10) {dayEnd = "0" + dayEnd};
  if(monthEnd < 10) {monthEnd = "0" + monthEnd};
  switch (tabela) {
    case 'a':
      var combinedURL = "https://api.nbp.pl/api/exchangerates/rates/" + tabela + "/" + currency + "/" + yearStart + "-" + monthStart + "-" + dayStart + "/" + yearEnd + "-" + monthEnd + "-" + dayEnd + "/?format=xml";
      break;
    case 'b':
      var combinedURL = "https://api.nbp.pl/api/exchangerates/tables/" + tabela + "/" + thatYear + "-" + thatMonth + "-" + thatDay + "/?format=xml";
      break;
    case 'c':
      var combinedURL = "https://api.nbp.pl/api/exchangerates/rates/" + tabela + "/" + currency + "/" + yearStart + "-" + monthStart + "-" + dayStart + "/" + yearEnd + "-" + monthEnd + "-" + dayEnd + "/?format=xml";
      break;
    default:
  }
  console.log(combinedURL);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xmlhttp.open("GET", combinedURL, true);
  xmlhttp.send();
}

function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var tabela = document.getElementById('tabela').value;
  switch (tabela) {
    case 'a':
      var table="<tr><th><span class=\"glyphicon glyphicon-check\"></span></th><th>Waluta</th><th>Numer</th><th>Data publikacji</th><th>kurs</th></tr>";
      var x = xmlDoc.getElementsByTagName("Rate");
      for (i = 1; i <x.length; i++) {
        table += "<tr><td><input type=\"checkbox\" id=\"trcheck" + i + "\"><td class=\"unselectable\">" +
        xmlDoc.getElementsByTagName("Code")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("No")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("EffectiveDate")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("Mid")[0].childNodes[0].nodeValue +
        "</td></tr>";
      }
      break;
    case 'b':
      var table="<tr><th><span class=\"glyphicon glyphicon-check\"></span></th><th>Waluta</th><th>Numer</th><th>Data publikacji</th><th>kurs</th></tr>";
      var x = xmlDoc.getElementsByTagName("Rate");
      for (i = 1; i <x.length; i++) {
        table += "<tr><td><input type=\"checkbox\" id=\"trcheck" + i + "\"><td class=\"unselectable\">" +
        xmlDoc.getElementsByTagName("Code")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("No")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("EffectiveDate")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("Mid")[0].childNodes[0].nodeValue +
        "</td></tr>";
      }
      break;
    case 'c':
      var table = "<tr><th><span class=\"glyphicon glyphicon-check\"></span></th><th>Waluta</th><th>Numer</th><th>Data publikacji</th><th>Kurs Kupna</th><th>Kurs Sprzedaży</th></tr>";
      var x = xmlDoc.getElementsByTagName("Rate");
      for (i = 1; i <x.length; i++) {
        table += "<tr><td><input type=\"checkbox\" id=\"trcheck" + i + "\"><td class=\"unselectable\">" +
        xmlDoc.getElementsByTagName("Code")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("No")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("EffectiveDate")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("Bid")[0].childNodes[0].nodeValue +
        "</td><td class=\"unselectable\">" +
        x[i].getElementsByTagName("Ask")[0].childNodes[0].nodeValue +
        "</td></tr>";
      }
      break;
    default:
  }
  document.getElementById("demo").innerHTML = table;
  var addshithere = document.getElementById("demo");
  var addshit = addshithere.getElementsByTagName("tr");
  for (var i = 1; i < addshit.length; i++) {
    addshit[i].id = "tr" + i;
  }
  $("td.unselectable").click(function() {
    var parentId = '#' + $(this).parent().get(0).id;
    console.log(parentId);
    var targetColor = $(parentId + " > .unselectable").css('background-color')
    var plannedColor = document.getElementById('paletaKolorow').value;
    console.log('1. teraz - ' + targetColor + ' zaraz: ' + plannedColor);
    $(parentId + " > .unselectable").css("background-color",(targetColor == "" || targetColor == "rgba(0, 0, 0, 0)") ? plannedColor :( targetColor != "rgb(255, 255, 255)") ? "rgb(255, 255, 255)" : plannedColor);
    console.log('2. mialo byc' + plannedColor + ' jest: ' + targetColor);
  });
}

$(document).ready(function() {
  giveDate("rok");
  giveDate("rokStart");
  giveDate("miesiac");
  giveDate("miesiacStart");
  giveDate("dzien");
});

$(".btn").mouseup(function(){
    $(this).blur();
})
