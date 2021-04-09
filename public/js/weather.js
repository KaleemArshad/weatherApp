'use strict'

const day = document.getElementById("day");
const date = document.getElementById("date");

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let days = weekday[currentTime.getDay()];
    return days;
};

const getCurrentTime = () => {
    var months = [
        "January",
        "Feburary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    var now = new Date();
    var month = months[now.getMonth()];
    var dates = now.getDate();

    return `${dates} ${month}`;
};

date.innerText = getCurrentTime();
day.innerText = getCurrentDay();

const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const tempDeg = document.getElementsByClassName("tempDeg");
const weather = document.getElementById("weather");
const tempStatus = document.getElementsByClassName("fa");


const getInfo = async (event) => {
    event.preventDefault();
    let cityNameVal = cityName.value
    if (cityNameVal === "") {
        weather.classList.add('data_hide');
        city.innerText = "Please Type the Name of City first..."
    } else {
        try {
            let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameVal}&units=metric&appid=a179fd30b0703c164d8cdbbddcfbb2fa`;
            const response = await fetch(apiURL);
            const APIdata = await response.json();
            if (APIdata.cod === "404") {
                weather.classList.add('data_hide');
                city.innerText = "Please Type the Name of City Properly...";
            } else {
                city.innerText = `${APIdata.name}, ${APIdata.sys.country}`;
                tempDeg[0].innerText = APIdata.main.temp;
                if (APIdata.weather[0].main === "Clear" || APIdata.weather[0].main === "Sunny") {
                    tempStatus[0].classList.replace('fa-cloud', 'fa-sun');
                } else if (APIdata.weather[0].main === "Clouds") {
                    tempStatus[0].classList.replace('fa-sun', 'fa-cloud');
                } else { }
                weather.classList.remove('data_hide');
            };
        } catch (error) {
            console.log(error);
        };
    };
};

submitBtn.addEventListener('click', getInfo);
