// $(document).ready(function(){
//   $("#flip").click(function(){
//     $("#panel").slideToggle("slow");
//   });
//
//   $("#boba-near").click(function(){
//     $("#map").fadeIn("slow");
//     $("#addresses").fadeIn(2000);
//   });
//
//
//
// });

$(document).ready(function(){
  $("#boba-near").on('click', function(e){
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/yelptest",
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
        // appendStr += "</tr>";

         console.log(appendStr)

        $("#addresses").html(appendStr);
        $("#addresses").fadeIn("slow");
        // var mapScript ='<script>var map;function initMap() {map = new google.maps.Map(document.getElementById(\'map\'), {center: {lat: -34.397, lng: 150.644},zoom: 8});}</script><script async defersrc=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyB2Podi0-zST8mYSdTCzlwVxDu_6xVAeR8&callback=initMap\"></script>';
        // $('body').append(mapScript);

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

function locationForm() {

}
