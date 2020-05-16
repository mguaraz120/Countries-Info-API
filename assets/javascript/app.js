function ochoPaises() {
  return {
    argentina: {
      name: "argentina",
      imagen: "assets/images/Argentina.jpg",
    },
    australia: {
      name: "australia",
      imagen: "assets/images/Australia.jpg",
    },
    china: {
      name: "china",
      imagen: "assets/images/China.jpg",
    },
    egypt: {
      name: "egypt",
      imagen: "assets/images/Egypt.jpg",
    },
    france: {
      name: "france",
      imagen: "assets/images/France.jpg",
    },
    iceland: {
      name: "iceland",
      imagen: "assets/images/iceland.jpg",
    },
    peru: {
      name: "peru",
      imagen: "assets/images/peru.jpg",
    },
    usa: {
      name: "usa",
      imagen: "assets/images/USA.jpg",
    },
  };
}
var paisName;
function actualizar(dataPais) {
  paisName = primerosPaises[dataPais.attr("data-name")].name;
}

var primerosPaises = ochoPaises();

function mostrarPaises() {
  for (var key in primerosPaises) {
    var paisDiv = $(
      `<div class='pais-boton' data-name='${primerosPaises[key].name}'>`
    );
    var paisImg = $(
      `<img alt='imagen' class='paisImg' width='25%' height='260px'>`
    ).attr("src", primerosPaises[key].imagen);
    paisDiv.append(paisImg);
    $(".paisesArea").append(paisDiv);
  }
}
mostrarPaises();

$(".pais-boton").on("click", function () {
  actualizar($(this)), $(".pais").empty();
  $(".clima").empty();
  $(".flag").empty();
  $(".paisArea").empty();
  $(".historia").empty();
  pais = paisName;
  api(pais);
});

$("#BuscarPais").on("click", function (event) {
  event.preventDefault();
  $(".pais").empty();
  $(".clima").empty();
  $(".flag").empty();
  $(".historia").empty();

  var pais = $("#paisInput").val().trim();

  api(pais);
});

function api(pais) {
  var country = {
    url: `https://restcountries.eu/rest/v2/name/${pais}?fullText=true`,
    method: "GET",
  };

  $.ajax(country).done((response) => {
    console.log(response);
    const {
      name,
      capital,
      subregion,
      population,
      latlng,
      flag,
      currencies,
    } = response[0];
    var paisDiv = $("<div>");
    var paisNameDiv = $("<h3>").text(name);
    var capitalDiv = $("<p>").text(`Capital: ${capital}`);
    var regionDiv = $("<p>").text(`Region: ${subregion}`);
    var flagDiv = $("<div>");
    var populationDiv = $("<p>").text(`Population: ${population}`);
    var currencyDiv = $("<p>").text(`Currency: ${currencies[0].name}`);
    var flagImg = $("<div>").html(
      `<img src=${flag} width='80%' height = 'auto'/>`
    );
    var lat = latlng[0];
    var long = latlng[1];

    paisDiv.append(capitalDiv, regionDiv, populationDiv, currencyDiv);
    $(".pais").append(paisDiv);
    flagDiv.append(flagImg);
    $(".flag").append(flagDiv, paisNameDiv);

    $("#paisInput").val("");

    var climaAPI = {
      url: `https://api.climacell.co/v3/weather/realtime?fields=precipitation,temp,feels_like,visibility,humidity,wind_direction&apikey=ipXtA13qS9UyzFJGU4B0C7xC3VHy52Cw&lat=${lat}&lon=${long}`,
      method: "GET",
    };

    $.ajax(climaAPI).done((response) => {
      console.log(response);
      const { temp, feels_like, humidity, visibility } = response;
      var tempDiv = $("<div>");
      var tempP = $("<p>").text(`Temperature: ${temp.value} C°`);
      var TermicaP = $("<p>").text(`Feels like: ${feels_like.value} C°`);
      var humedad = $("<p>").text(`Humidity: ${humidity.value} %`);
      var visibilidad = $("<p>").text(`Visibility: ${visibility.value} Km`);

      tempDiv.append(tempP, TermicaP, humedad, visibilidad);
      $(".clima").append(tempDiv);
    });

    var wikiAPI = {
      url: `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${pais}+culture`,
      method: "GET",
    };

    $.ajax(wikiAPI).done((response) => {
      console.log(response);
      var wikiDiv = $("<div>");
      for (let i = 0; i < 20; i++) {
        var snippet = response.query.search[i].snippet;
        wikiDiv.append(snippet);
      }
      var about = $("<div>").html(`<h3>Learn more about this country:</h3>`);
      $(".historia").append(about, wikiDiv);
    });
  });
}
