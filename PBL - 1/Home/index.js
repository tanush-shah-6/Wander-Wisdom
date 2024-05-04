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


var places = ["Amruteshwar","Gateway of India", "Juhu", "Raigad Fort", "Shirdi", 
"Sinhagad Fort", "Marine Drive", "Ajanta Caves", "Ganapatipule", "Trimbakeshwar"];
$("#searchResults").removeClass("p-2");
  
$(".form-control").on("input", function() {
    var query = $(this).val().toLowerCase();
    if (query !== '') {
    var filteredOptions = places.filter(function(option) {
        return option.toLowerCase().includes(query);
    });

    displayResults(filteredOptions);
    } else {
    $("#searchResults").empty();
    }
});

function displayResults(results) {
    var resultList = $("#searchResults");
    resultList.empty();
    resultList.hide();
    $.each(results, function(index, result) {
    resultList.append("<li>" + result + "</li>");
    });
    $("#searchResults").addClass("p-2");
    resultList.slideDown();

}

$(document).on('click', '#searchResults li', function() {
    $(".form-control").val($(this).text());
    $("#searchResults").empty();
    $("#searchResults").hide();
    $("#searchResults").removeClass("p-2"); 
    
});
  
    
$(".input-group-text").click(function()
{
    var destination = $(".form-control").val();
    destinationLength = destination.length;
    var firstWord = destination.split(" ");
    if(destinationLength !== 0)
    {
        window.location.href = "../"+destination+"/"+firstWord[0].toLowerCase()+".html";
    }
});


$(".preferences").hide();
$(".or button").click(function()
{
    $(".preferences").slideToggle();
});