$(document).ready(function(){

  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    console.log(position)
    $.ajax({
      type: "POST",
      url: "https://geoboba.herokuapp.com/getlocation",
      // url: "http://localhost:3000/getlocation",
      data: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      dataType: 'json'
    });
  }

  getLocation();

  $("#boba-near").on('click', function(e){
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "https://geoboba.herokuapp.com/yelptests",
      // url: "http://localhost:3000/yelptest",
      success: function(data){

        var locations = [];
        var appendStr =
          "<table class='table'><thead><tr><th>Name</th><th>Rating</th><th>Address</th><th>Phone #</th></tr>";

        for(var i = 0; i < data.businesses.length; i++) {
          var name = "<tr scope='row'><td>" + data.businesses[i].name + "</td>";
          var rating = "<td>" + data.businesses[i].rating + "</td>";
          var address = "<td>" + data.businesses[i].location.display_address + "</td>";
          var number = "<td>" + data.businesses[i].display_phone + "</td></tr>";
          appendStr += (name + rating + address + number);

          locations.push([data.businesses[i].name, data.businesses[i].location.coordinate.latitude, data.businesses[i].location.coordinate.longitude])
        }
        $("#image").hide();
        $("#addresses").html(appendStr);
        $("#addresses").fadeIn("slow");
        $("#map-container").show();

        var centerCoordinate = data.region.center;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: new google.maps.LatLng(centerCoordinate.latitude, centerCoordinate.longitude),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
        $('#map').fadeIn("slow");
      }
    });
  });

// STart of the Address Form

$("#flip").click(function(){
  $("#panel").slideToggle("slow");
});

$("#boba-near").click(function(){
  $("#map").fadeIn("slow");
  $("#addresses").fadeIn(2000);
});

$("#ajaxform").submit(function(e){
  e.preventDefault();

  var postData = $(this).serialize();
  console.log(postData);
  $.ajax({
    type: "POST",
    url: "https://geoboba.herokuapp.com/address",
    // url: "http://localhost:3000/address",
    data: postData,
    success: function(data){
      var locations = [];
      var appendStr =
        "<table class='table'><thead><tr><th>Name</th><th>Rating</th><th>Address</th><th>Phone #</th></tr>";

      for(var i = 0; i < data.businesses.length; i++) {
        var name = "<tr scope='row'><td>" + data.businesses[i].name + "</td>";
        var rating = "<td>" + data.businesses[i].rating + "</td>";
        var address = "<td>" + data.businesses[i].location.display_address + "</td>";
        var number = "<td>" + data.businesses[i].display_phone + "</td></tr>";
        appendStr += (name + rating + address + number);

        locations.push([data.businesses[i].name, data.businesses[i].location.coordinate.latitude, data.businesses[i].location.coordinate.longitude])
      }
      $("#image").hide();
      $("#addresses").html(appendStr);
      $("#addresses").fadeIn("slow");
      $("#map-container").show();

      var centerCoordinate = data.region.center;
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(centerCoordinate.latitude, centerCoordinate.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
      $('#map').fadeIn("slow");
    }
  });
});





});
