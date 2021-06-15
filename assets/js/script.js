function getHeroData(numeroDelHero) {

    $.ajax({
        type: "GET",
        url: "https://superheroapi.com/api.php/10158403197203067/" + numeroDelHero,
        dataType: "json",
        success: function (infoDelHero) {  
            $("article").show();
            const imgHero = infoDelHero.image;
            $("#img_hero").attr("src", imgHero.url);
            const nombreDelHero = infoDelHero.name;
            $("#name").text("Nombre: " + nombreDelHero);
            const conexionesDelHero = infoDelHero.connections;
            $("#conexiones").text("Conexiones: " + conexionesDelHero["group-affiliation"]);
            const publicadoPorHero = infoDelHero.biography;
            $("#publicado").text("Publicado por: " + publicadoPorHero.publisher);
            const ocupacionDelhero = infoDelHero.work;
            $("#ocupacion").text("Ocupación: " + ocupacionDelhero.occupation);
            const primeraAparicionDelHero = infoDelHero.biography;
            $("#pAparicion").text("Primera Aparición: " + primeraAparicionDelHero["first-appearance"]);
            const alturaDelHero = infoDelHero.appearance;
            $("#altura").text("Altura: " + alturaDelHero.height);
            const pesoDelHero = infoDelHero.appearance;
            $("#peso").text("Peso: " + pesoDelHero.weight);
            const aliasDelHero = infoDelHero.biography;
            $("#alias").text("Alias: " + aliasDelHero.aliases);
            //debugger;
            const stats = infoDelHero.powerstats;
            const statPuntosIntelligence = {
                y: stats.intelligence,
                label: "Intelligence"
            };
            const statPuntosStrength = {
                y: stats.strength,
                label: "Strength"
            };
            const statPuntosSpeed = {
                y: stats.speed,
                label: "Speed"
            };
            const statPuntosDurability = {
                y: stats.durability,
                label: "Durability"
            };
            const statPuntosPower = {
                y: stats.power,
                label: "Power"
            };
            const statPuntosCombat = {
                y: stats.combat,
                label: "Combat"
            };
            const dataPoints = [
                statPuntosIntelligence,
                statPuntosStrength,
                statPuntosSpeed,
                statPuntosDurability,
                statPuntosPower,
                statPuntosCombat
            ];
            renderChart(dataPoints, nombreDelHero);
        }
    });
}

$("#boton").click(function () {
    const valorInput = $("input").val();
    getHeroData(valorInput);

    const validacionDelInput = /\d/gim;                 //sólo para números
    if(validacionDelInput.test(valorInput) == true) {  
        $("input").val("")
    } else {
        alert("Sólo debes ingresar números")
    } return false 
});

const renderChart = (dataPoints , nombreDelHero) => {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `Estadísticas de Poder para ${nombreDelHero}`
        },
        data: [{
            type: "pie",
            startAngle: 25,
            showInLegend: "true",
            legendText: "{label}",
            indexLabel: "{label} - {y}%",
            dataPoints: dataPoints
        }]
    });
    chart.render();
};