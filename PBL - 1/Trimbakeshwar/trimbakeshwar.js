$(".content").hide();
$(".content").slideDown(1000);

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the CSV file
    fetch('../Reviews/triyam.csv')
        .then(response => response.text())
        .then(csv => {
            // Parse CSV data
            const reviews = parseCsv(csv);
            
            // Display reviews
            displayReviews(reviews);
        })
        .catch(error => console.error('Error fetching CSV file:', error));
});

function parseCsv(csv) {
    // Split CSV into rows
    const rows = csv.trim().split('\n');

    // Remove header row
    rows.shift();
    
    // Parse rows into objects
    const data = [];
    rows.forEach(row => {
        const review = {};
        review["review"] = row.trim();
        data.push(review);
    });

    return data;
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews');
    
    // Iterate over the first 10 reviews and create HTML elements
    for (let i = 0; i < Math.min(reviews.length, 10); i++) {
        const review = reviews[i];
        const reviewElement = document.createElement('div');
        reviewElement.innerHTML = `
            <p>${review.review}</p>
            <hr>
        `;
        reviewsContainer.appendChild(reviewElement);
    }
}


