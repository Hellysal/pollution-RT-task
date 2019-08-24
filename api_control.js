
function getSortedKeys(cities) {
    var keys = keys = Object.keys(cities);
    return keys.sort(function(a,b){return cities[b]-cities[a]});
}

var cities =[];

$("#country").change(function(){ 
	var value = $(this).val();
	if(value == "Poland")
 		setCities("PL");
	if(value == "France")
 		setCities("FR");
 	if(value == "Spain")
 		setCities("ES");
 	if(value == "Germany")
 		setCities("DE");
});

function setCities(country) {
	cities=[];
	$("#list").html("");
	fetch("https://api.openaq.org/v1/latest?limit=2000&country="+country)
    .then(resp => resp.json())
	.then(resp => {
		var results = resp.results;
		for(var i = 0; i < results.length; i++){
  			var measurements = results[i].measurements;
  			cities[results[i].city]=0;
 			for(var j=0; j < measurements.length; j++){
    			if(measurements[j].parameter == "pm25" && measurements[j].value > cities[results[i].city]) {
       				cities[results[i].city]=measurements[j].value;
       			}
  			}
		}
		cities = getSortedKeys(cities);
		cities.slice(0, 10).map(city => {
			$("#list").append("<p>"+city+"</p>");
		});
		})
}
