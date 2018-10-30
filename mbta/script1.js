function getContent (place_id, infowindow)
{
  /* Step 1: Make instance of XHR object...
  ...to make HTTP request after page is loaded*/
  request = new XMLHttpRequest();
  console.log("Hit me 1");
  // Step 2: Open the JSON file at remote location
  request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + place_id, true);
  console.log("Hit me 2");
  // Step 3: set up callback for when HTTP response is returned (i.e., you get the JSON file back)
  request.onreadystatechange = function() {
    console.log("Hit me 3");
    if (request.readyState == 4 && request.status == 200) {
      // Step 5: when we get all the JSON data back, parse it and use it
      theData = request.responseText;
      stop_info = JSON.parse(theData);
      infowindow.setContent(theData);
    }
    else if (request.readyState == 4 && request.status != 200) {
      // document.getElementById("messages").innerHTML = "Whoops, something went terribly wrong!";
    }
    else if (request.readyState == 3) {
      // document.getElementById("messages").innerHTML = "Come back soon!";
    }
  }
  // Step 4: fire off the HTTP request
  request.send();
  console.log("Hit me 4");
}