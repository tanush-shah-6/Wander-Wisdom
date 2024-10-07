document.addEventListener('DOMContentLoaded', function() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const results = JSON.parse(urlParams.get('results'));

    const placesList = document.getElementById('placesList');
    if (results && results.length > 0) {
      results.forEach(place => {
        const listButton = document.createElement('button');
        listButton.innerHTML=`${place.name}`;

        listButton.addEventListener('click', function() {
            window.location.href = `../${place.name}/${place.name.split(' ')[0]}.html`;
        });

        const listItem = document.createElement('li');
        listItem.innerHTML = `Location: ${place.location} <br> Purpose: ${place.purpose} <br>
        Duration: ${place.duration} days <br> Total Budget: Rs. ${place.budget}`;
        placesList.appendChild(listButton);
        placesList.appendChild(listItem);
      });
    } else {
      const message = document.createElement('p');
      message.textContent = 'No places found.';
      placesList.appendChild(message);
    }
});

