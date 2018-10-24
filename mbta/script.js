var map;
      
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 42.352271, lng: -71.05524200000001},
        zoom: 11
    });

    buildMarkers(map);

    buildPolyline(map);

    buildMe(map);
}

function buildMarkers(map)
{
	var marker;
	var infowindow = new google.maps.InfoWindow({
		content: "Loading stop data ..."
	});

	for (i = 0; i < stations.length; i++) {  
	    marker = new google.maps.Marker({
	        position: new google.maps.LatLng(stations[i][1]),
	        map: map,
	       	icon: 'metro.png'
	    });

	    google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        return function() {

	        	/* Content is type JSON parsed data */
	        	// getContent(stations[i][2], infowindow);
				infowindow.open(map, marker);
	        }
    	})(marker, i));
	}
}

function buildPolyline (map)
{
    var locations1 = stations.slice(0,18).map(x => x[1]);
    var locations2 = stations.slice(18,22).map(x => x[1]);
    locations2.unshift(stations[12][1]);

    var trainPath1 = new google.maps.Polyline({
          path: locations1,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
    });

    var trainPath2 = new google.maps.Polyline({
          path: locations2,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
    });

    trainPath1.setMap(map);
    trainPath2.setMap(map);
}

function buildMe(map) 
{
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};

			var me = new google.maps.Marker({
			    position: myLatLng,
			    title: "Me"
			});

			me.setMap(map);
			map.setCenter(myLatLng);

			findClosest(me, map);
		});
	}
}

function findClosest (me, map)
{
	var closest_station;
	var smallest_distance = Number.MAX_VALUE;

	for (var i = stations.length - 1; i >= 0; i--) {

		var latLngB = new google.maps.LatLng(stations[i][1]);

		var num = google.maps.geometry.spherical.computeDistanceBetween(me.position, latLngB);

		if (num < smallest_distance) {
			smallest_distance = num;
			closest_station = stations[i][0];
		}
	}

	//Put information in an infowindow
	printClosest(me, map, smallest_distance, closest_station);

}

function printClosest (me, map, smallest_distance, closest_station)
{
	var miles = meters_to_Miles(smallest_distance);

	var stuff = 'Closest: ' + closest_station + '<div>Distance:</div>' + miles + ' mile'; 

	var infowindow = new google.maps.InfoWindow({
    	content: stuff
  	});

	// Open info window on click of marker
	google.maps.event.addListener(me, 'click', function() {
		infowindow.open(map, me);
	});
}

function meters_to_Miles(smallest_distance)
{
	var miles = (smallest_distance / 1609.344);

	console.log(miles);

	miles = Math.round(miles);

	return miles;
}


var stations = [
	['Alewife', {lat: 42.395428, lng: -71.142483}, 'place-alfcl'],
	['Davis', {lat: 42.39674, lng: -71.121815}, 'place-davis'],
	['Porter Square', {lat: 42.3884, lng: -71.11914899999999}, 'place-portr'],
	['Harvard Square', {lat: 42.3733, lng: -71.118956}, 'place-harsq'],
	['Central Square', {lat: 42.365486, lng: -71.103802}, 'place-cntsq'],
	['Kendall/MIT', {lat: 42.36249079, lng: -71.08617653}, 'place-knncl'],
	['Charles/MGH', {lat: 42.361166, lng: -71.070628}, 'place-chmnl'],
	['Park Street', {lat: 42.35639457, lng: -71.0624242}, 'place-pktrm'],
	['Downtown Crossing', {lat: 42.355518, lng: -71.060225}, 'place-dwnxg'],
	['SouthStation', {lat: 42.352271, lng: -71.05524200000001}, 'place-sstat'],
	['Broadway', {lat: 42.342622, lng: -71.056967}, 'place-brdwy'],
	['Andrew', {lat: 42.330154, lng: -71.057655}, 'place-sstat'],
	['JFK/UMass', {lat: 42.320685, lng: -71.052391}, 'place-jfk'],
	['North Quincy', {lat: 42.275275, lng: -71.029583}, 'place-nqncy'],
	['Wollaston', {lat: 42.2665139, lng: -71.0203369}, 'place-wlsta'],
	['Quincy Center', {lat: 42.251809, lng: -71.005409}, 'place-qnctr'],
	['Quincy Adams', {lat: 42.233391, lng: -71.007153}, 'place-qamnl'],
	['Braintree', {lat: 42.2078543, lng: -71.0011385}, 'place-brntn'],
	['Savin Hill', {lat: 42.31129, lng: -71.053331}, 'place-shmnl'],
	['Fields Corner', {lat: 42.300093, lng: -71.061667}, 'place-fldcr'],
	['Shawmut', {lat: 42.29312583, lng: -71.06573796000001}, 'place-smmnl'],
	['Ashmont', {lat: 42.284652, lng: -71.06448899999999}, 'place-asmnl'],
];
  