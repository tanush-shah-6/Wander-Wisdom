
var durationValue = document.getElementById("durationValue");
var durationRange = document.getElementById("durationRange");

durationValue.innerHTML = durationRange.value; 
    
durationRange.oninput = function() {
    durationValue.innerHTML = this.value;
}

var priceValue = document.getElementById("priceValue");
var priceRange = document.getElementById("priceRange");

priceValue.innerHTML = priceRange.value; 

priceRange.oninput = function() {
    priceValue.innerHTML = this.value;
}


var places = ["Amruteshwar", "Gateway of India", "Della Adventure Park", "Juhu", "Shirdi", 
"Sinhagad Fort", "Marine Drive", "Ellora Caves", "Imagica", "Trimbakeshwar"];
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
  
    
$(".directSearch").click(function()
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


document.getElementById("searchButton").addEventListener("click", function() {

    var purpose = document.getElementById("purposeFilter").value;
    var location = document.getElementById("locationFilter").value;
    var duration = document.getElementById("durationRange").value;
    var budget = document.getElementById("priceRange").value;

    fetch(`http://localhost:8800/api/places?purpose=${purpose}&location=${location}&duration=${duration}&budget=${budget}`)
    .then(response => response.json())
    .then(data => {
        const queryString = new URLSearchParams({ results: JSON.stringify(data) }).toString();
        const redirectUrl = `./result.html?${queryString}`;
        console.log("Redirecting to:", redirectUrl);
        window.location.href = redirectUrl;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

const token = localStorage.getItem('token');

if(token)
{
    $("#loginbutton").text("Logout");
    $("#loginbutton").click(function()
{
    var confirmation = confirm('Are you sure you want to logout?');
    if (confirmation) {
        localStorage.removeItem("token");
        alert("Logout successful!");
        window.location.href = "./login.html";
    }
    else{
        window.location.href = "./index.html";
    }
});
}
else{
    $("#preferencesbutton").click(function()
    {
        alert("Login to apply filters!");
        window.location.href = "./login.html";
    });
}