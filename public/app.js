// Personal API Key for OpenWeatherMap API
const apiKey = '3e64024cf0bcec907367f22262bfbd7f&units=imperial'; // Replace with your actual API key

// Event listener for the generate button
document.getElementById('generate').addEventListener('click', performAction);

// Function to handle click event
async function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (zipCode) {
        try {
            const weatherData = await getWeatherByZip(zipCode);
            await postData('/add', {
                temperature: weatherData.main.temp,
                date: new Date().toLocaleDateString(),
                userResponse: feelings
            });
            await updateDOM();
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert('Please enter a zip code.');
    }
}

// Function to fetch weather data
async function getWeatherByZip(zip) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Function to post data
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Function to update the DOM
async function updateDOM() {
    try {
        const request = await fetch('/all');
        const allData = await request.json();
        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees';
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
}
