const slides = document.querySelectorAll(".c-carousel__activator-main");
let currentSlide = 0;

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].checked = true;
}, 3000); // 3000 milliseconds = 3 seconds


//天気

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  alert("Geolocation is not supported by this browser.");
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeather(lat, lon);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function getWeather(lat, lon) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temp = data.current_weather.temperature;
      const weatherCode = data.current_weather.weathercode;
      displayWeather(temp, weatherCode);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(temp, weatherCode) {
  const weatherDescription = getWeatherDescription(weatherCode);
  const weatherIcon = getWeatherIcon(weatherCode);

  document.getElementById('weather-description').textContent = weatherDescription;
  document.getElementById('temperature').textContent = temp;

  const iconElement = document.getElementById('weather-icon');
  iconElement.src = weatherIcon;
  iconElement.style.display = 'block';
}

function getWeatherDescription(code) {
  const weatherMap = {
    0: "快晴",
    1: "晴れ",
    2: "曇り",
    3: "雨",
  };
  return weatherMap[code] || "晴れ";
}

function getWeatherIcon(code) {
  const iconMap = {
    0: "./icons/kaisei.png",   
    1: "./icons/hare.png",   
    2: "./icons/kumori.png",
    3: "./icons/ame.png",
  };
  return iconMap[code] || "./icons/hare.png"; 
}
      
  //検索欄
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const dropdown = document.getElementById('dropdown');
    const searchHistoryList = document.getElementById('searchHistory');
  
    // サンプルの検索履歴
    const searchHistory = ['Apple', 'Banana', 'Cherry', 'Date', 'Eggfruit'];
  
    // 検索履歴を表示
    function showSearchHistory() {
      searchHistoryList.innerHTML = ''; // リストをリセット
      searchHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => {
          searchInput.value = item;
          dropdown.style.display = 'none'; // リストを非表示にする
        });
        searchHistoryList.appendChild(li);
      });
      dropdown.style.display = 'block'; // ドロップダウンを表示
    }
  
    // 入力欄がフォーカスされたときに履歴を表示
    searchInput.addEventListener('focus', showSearchHistory);
  
    // 入力欄の外がクリックされた場合、履歴を非表示にする
    document.addEventListener('click', function (event) {
      if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
      }
    });
  });
