/* Global Variables */
const apiKey =
  '&appid=392db0addd606b4e95b31ba9a187e87d&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeatherData(baseUrl, zip, apiKey).then(function(data) {
    updateUI();
    // add data to POST request
    console.log(data);
    postData('/add', {
      temp: data.list[0].main.temp,
      date: newDate,
      content: feelings,
    });
  });
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseUrl, zip, apiKey) => {
  const res = await fetch(baseUrl + zip + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

// console.log( userDate, userTemp, userContent);
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
    console.log(allData);  
} catch (error) {
    console.log('error', error);
  }
};
