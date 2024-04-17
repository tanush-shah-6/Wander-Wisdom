// JavaScript to display the selected value of the range slider
var durationValue = document.getElementById("durationValue");
var durationRange = document.getElementById("durationRange");


durationValue.innerHTML = durationRange.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
durationRange.oninput = function() {
    durationValue.innerHTML = this.value;
}

 // JavaScript to display the selected value of the range slider
 var priceValue = document.getElementById("priceValue");
 var priceRange = document.getElementById("priceRange");
 

 priceValue.innerHTML = priceRange.value; // Display the default slider value

 // Update the current slider value (each time you drag the slider handle)
 priceRange.oninput = function() {
     priceValue.innerHTML = this.value;
 }

$(".preferences").hide();
$(".or button").click(function()
{
    $(".preferences").slideToggle();
});