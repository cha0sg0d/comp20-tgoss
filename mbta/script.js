var map;
      
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: 42.352271, lng: -71.05524200000001},
        zoom: 11
    });

    var SouthStation = new google.maps.Marker({
    position: {lat: 42.352271, lng: -71.05524200000001},
    title: "South Station",
    icon: 'metro.png'
  });

    var Andrew = new google.maps.Marker({
    position: {lat: 42.330154, lng: -71.057655},
    title: "Andrew Station",
    icon: 'metro.png'
  });


    var flightPlanCoordinates = [
      {lat: 42.352271, lng: -71.05524200000001},
      {lat: 42.330154, lng: -71.057655},

    ];

    var trainPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
    });

    trainPath.setMap(map);
  
    SouthStation.setMap(map);
    Andrew.setMap(map);
 }
  