$(window).on("load", () => {
    let long;
    let lat;
    let date;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            date = moment(position.timestamp).format("LLLL");
            console.log(date);

            lat = position.coords.latitude;
            long = position.coords.longitude;

            var settings = {
                async: true,
                crossDomain: true,
                url: `https://climacell-microweather-v1.p.rapidapi.com/weather/nowcast?fields=precipitation,temp,feels_like,visibility,humidity,wind_direction&unit_system=si&lat=${lat}&lon=${long}`,
                method: "GET",
                headers: {
                  "x-rapidapi-host": "climacell-microweather-v1.p.rapidapi.com",
                  "x-rapidapi-key":
                    "e7108ba390msh955bdeb74736d79p1475dajsn7947aa1dc155",
                },
              };

            $.ajax(settings).done((response) => {
                console.log(response[0]);
                const {temp, feels_like, humidity, visibility} = response[0];
                var tempDiv = $("<div>");
                var tempP = $("<p>").text(`Temp Actual: ${temp.value} C°`);
                var TermicaP = $("<p>").text(`La Termica: ${feels_like.value} C°`);
                var humedad = $("<p>").text(`Humedad: ${humidity.value} %`);
                var visibilidad = $("<p>").text(`visibility: ${visibility.value} Km`);
                
                tempDiv.append(tempP, TermicaP, humedad, visibilidad);
                $(".clima").append(tempDiv);
                $(".hora").append(date);

            })

        })
    }
})