  //カルーセル
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const images = carousel.querySelectorAll('img');

    let currentIndex = 0;
    const totalImages = images.length;

    function showImage(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        showImage(currentIndex);
    }

    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // 自動切り替え
    let autoSlide = setInterval(nextImage, 5000);

    // マウスオーバーで自動切り替えを停止
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    // マウスアウトで自動切り替えを再開
    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextImage, 5000);
    });

    // 初期表示
    showImage(currentIndex);
});

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
    0: "../img/icons/kaisei.png",   
    1: "../img/icons/hare.png",   
    2: "../img/icons/kumori.png",
    3: "../img/icons/ame.png",
  };
  return iconMap[code] || "../img/icons/hare.png"; 
}

//検索
// 検索履歴をローカルストレージに保存する関数
function getSearchHistory() {
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  return history;
}

// 検索履歴を表示する関数
function displaySearchHistory() {
  const searchHistory = getSearchHistory();
  const historyContainer = document.getElementById("searchHistory");

  // プルダウンリストをクリア
  historyContainer.innerHTML = "";

  searchHistory.forEach((historyItem) => {
      const listItem = document.createElement("li");
      listItem.textContent = historyItem;
      listItem.classList.add("dropdown-item");

      // クリック時に入力欄に履歴をセット
      listItem.addEventListener("click", function() {
          document.getElementById("searchInput").value = historyItem;
          document.getElementById("dropdown").style.display = "none"; // プルダウンを非表示
      });

      historyContainer.appendChild(listItem);
  });

  // 履歴が存在しない場合は非表示
  if (searchHistory.length > 0) {
      document.getElementById("dropdown").style.display = "block";
  } else {
      document.getElementById("dropdown").style.display = "none";
  }
}

// 検索履歴の追加と更新
document.getElementById("searchInput").addEventListener("input", function() {
  const query = document.getElementById("searchInput").value.trim();

  if (query !== "") {
      // 既存の履歴を取得
      let searchHistory = getSearchHistory();

      // 履歴が既に存在しない場合は新しい履歴を追加
      if (!searchHistory.includes(query)) {
          searchHistory.unshift(query); // 新しい履歴を先頭に追加
          if (searchHistory.length > 5) {
              searchHistory.pop(); // 5件以上の履歴は削除
          }
          localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
  }

  // プルダウンに履歴を表示
  displaySearchHistory();
});

// ページ読み込み時に履歴を表示しないようにする
window.onload = function() {
  document.getElementById("dropdown").style.display = "none"; // ページ読み込み時にプルダウンを非表示にする
};

// 検索欄をクリックしたときにプルダウンを表示/非表示
document.getElementById("searchInput").addEventListener("click", function(event) {
  const dropdown = document.getElementById("dropdown");
  
  // 既に表示されていれば非表示にし、非表示であれば表示
  if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
  } else {
      dropdown.style.display = "block";
  }

  // イベントの伝播を停止して、他のクリックイベントが発生しないようにする
  event.stopPropagation();
});

// ページ上の他の部分をクリックしたらプルダウンが閉じる
document.addEventListener("click", function(event) {
  const searchInput = document.getElementById("searchInput");
  const dropdown = document.getElementById("dropdown");

  // クリックした場所が検索欄またはその内部であれば、プルダウンを表示し続ける
  if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = "none";
  }
});