$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideToggle("slow");
  });

  $("#boba-near").click(function(){
    $("#map").fadeIn("slow");
    $("#addresses").fadeIn(2000);
  });



});



function bobaNearMe() {
  document.getElementById("#map").style.display = 'none';
  document.getElementById("#addresses").style.display = 'none';
}
function locationForm() {
  document.getElementById("#map").style.display = 'none';
  document.getElementById("#addresses").style.display = 'none';
}
