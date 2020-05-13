
$("#BuscarPais").on("click", function(event){

    event.preventDefault();
    $(".pais").empty();
    $(".clima").empty();

    var pais= $("#paisInput").val().trim();

    var country = {
        url: `https://restcountries.eu/rest/v2/name/${pais}?fullText=true`,
        method: "GET"
    };

    $.ajax(country).done((response) => {
        console.log(response);
        const{name, capital, subregion, population, latlng} = response[0];
        var paisDiv = $("<div>");
        var paisNameDiv = $("<p>").text(name);
        var capitalDiv = $("<p>").text(`Capital: ${capital}`);
        var regionDiv = $("<p>").text(`Region: ${subregion}`);
        var populationDiv = $("<p>").text(`Poblacion: ${population}`);
        var lat = latlng[0];
        var long = latlng[1];

        paisDiv.append(paisNameDiv, capitalDiv, regionDiv, populationDiv);
        $(".pais").append(paisDiv);

        $("#paisInput").val("");

        var climaAPI = {
            url: `https://api.climacell.co/v3/weather/realtime?fields=precipitation,temp,feels_like,visibility,humidity,wind_direction&apikey=ipXtA13qS9UyzFJGU4B0C7xC3VHy52Cw&lat=${lat}&lon=${long}`,
            method: "GET"
        
            };

            
            
            $.ajax(climaAPI).done((response) => {
                console.log(response);
                const {temp, feels_like, humidity, visibility} = response;
                var tempDiv = $("<div>");
                var tempP = $("<p>").text(`Temp Actual: ${temp.value} C°`);
                var TermicaP = $("<p>").text(`La Termica: ${feels_like.value} C°`);
                var humedad = $("<p>").text(`Humedad: ${humidity.value} %`);
                var visibilidad = $("<p>").text(`visibility: ${visibility.value} Km`);
                
                tempDiv.append(tempP, TermicaP, humedad, visibilidad);
                $(".clima").append(tempDiv);
                // $(".hora").append(date);
                
            })
        
    })
})
        