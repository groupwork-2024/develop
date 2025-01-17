var lat = sessionStorage.getItem('lat');
if (lat) {
  getWeather(); // 天気情報を取得する関数を呼び出し
}
else {
  // Geolocation APIが使用可能か確認
  // 現在地情報を取得し、成功時には位置情報を処理する関数(showPosition)を呼び出し、
  // 失敗時にはエラー処理関数(showError)を呼び出す。
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
  else {
    // Geolocation APIがサポートされていない場合に警告を表示
    alert("Geolocation APIがサポートされていない");
  }
}


// 現在地取得が成功した場合に実行される関数
// 緯度(latitude)と経度(longitude)を取得し、天気情報を取得する関数(getWeather)に渡す。
function showPosition(position) {
  const lat = position.coords.latitude; // 緯度を取得
  const lon = position.coords.longitude; // 経度を取得

  //sessionStorageに緯度、経度を保存
  sessionStorage.setItem('lat', lat);
  sessionStorage.setItem('lon', lon);

  getWeather(); // 天気情報を取得する関数を呼び出し
}

// 現在地取得が失敗した場合に実行されるエラー処理関数
// エラーの種類に応じたメッセージをアラートで表示する。
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED: // ユーザーが位置情報取得を拒否した場合
      alert("位置情報取得を拒否しました");
      break;
    case error.POSITION_UNAVAILABLE: // 位置情報が取得できなかった場合
      alert("位置情報が取得できませんでした");
      break;
    case error.TIMEOUT: // 位置情報取得がタイムアウトした場合
      alert("位置情報取得がタイムアウトしました");
      break;
    case error.UNKNOWN_ERROR: // その他の不明なエラーが発生した場合
      alert("不明なエラーが発生しました");
      break;
  }
}

// 天気情報を取得する関数
// 引数として緯度(lat)と経度(lon)を受け取り、Open-Meteo APIを使用して天気データを取得する。
function getWeather() {
  var lat = sessionStorage.getItem('lat');
  var lon = sessionStorage.getItem('lon');
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`; // APIのエンドポイントを生成

  // fetchを使用してAPIリクエストを送信
  fetch(apiUrl)
    .then(response => response.json()) // レスポンスをJSON形式に変換
    .then(data => {
      // APIから返された天気情報を取得
      const temp = data.current_weather.temperature; // 現在の気温
      const weatherCode = data.current_weather.weathercode; // 天気のコード
      displayWeather(temp, weatherCode); // 取得した情報を画面に表示する関数を呼び出し
    })
    .catch(error => {
      // APIリクエストが失敗した場合にエラーをログに出力
      console.error('Error fetching weather data:', error);
    });
}

// 天気情報を画面に表示する関数
// 気温(temp)と天気コード(weatherCode)を受け取り、HTML要素に反映する。
function displayWeather(temp, weatherCode) {
  const weatherIcon = getWeatherIcon(weatherCode); // 天気コードに基づいた天気アイコンのURLを取得

  // 気温をHTMLに表示
  document.getElementById('temperature').textContent = temp;

  // 天気アイコンをHTMLに表示
  const iconElement = document.getElementById('weather-icon'); // アイコン要素を取得
  iconElement.src = weatherIcon; // アイコンの画像ソースを設定
  iconElement.style.display = 'block'; // アイコンを表示
}

// 天気コードに基づいて天気アイコンのURLを返す関数
function getWeatherIcon(code) {
  const iconMap = {
    0: "https://aws-infra-group2024.s3.ap-northeast-1.amazonaws.com/weatherIcons/kaisei.png",   // 天気コード0: 快晴アイコン
    1: "https://aws-infra-group2024.s3.ap-northeast-1.amazonaws.com/weatherIcons/hare.png",    // 天気コード1: 晴れアイコン
    2: "https://aws-infra-group2024.s3.ap-northeast-1.amazonaws.com/weatherIcons/kumori.png",  // 天気コード2: 曇りアイコン
    3: "https://aws-infra-group2024.s3.ap-northeast-1.amazonaws.com/weatherIcons/ame.png",     // 天気コード3: 雨アイコン
  };
  return iconMap[code] || "https://aws-infra-group2024.s3.ap-northeast-1.amazonaws.com/weatherIcons/hare.png"; // 指定されたコードが存在しない場合は晴れアイコンを返す
}

//カルーセル
// 変数の初期化
let currentSlideIndex = 0;  // スライドのインデックス
const slideInterval = 5000;   //5秒間隔

// カルーセル
function moveSlide(step) {
  const slides = document.querySelectorAll('.osusume-slide');
  const totalSlides = slides.length;

  // スライドのインデックスを更新
  currentSlideIndex += step;

  // インデックスが範囲外にならないように調整
  if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1;
  }
  else if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0;
  }

  // スライドを動かす
  const carousel = document.querySelector('.osusume-carousel');
  carousel.style.transform = `translateX(${-currentSlideIndex * 100}%)`;
}

// 「次へ」「前へ」ボタンのクリックイベントに渡す
document.querySelector('.prev').addEventListener('click', (event) => moveSlide(-0.5));
document.querySelector('.next').addEventListener('click', (event) => moveSlide(0.5));

// 初期設定で最初のスライドを表示
document.addEventListener("DOMContentLoaded", () => {
  moveSlide(0); // 最初のスライドを表示

  // 自動的にスライドを進める
  setInterval(() => {
    moveSlide(1);  // 次のスライドに進む
  }, slideInterval); // 5秒ごとに次のスライド
});


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
    listItem.addEventListener("click", function () {
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
document.getElementById("searchInput").addEventListener("input", function () {
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
window.onload = function () {
  document.getElementById("dropdown").style.display = "none"; // ページ読み込み時にプルダウンを非表示にする
};

// 検索欄をクリックしたときにプルダウンを表示/非表示
document.getElementById("searchInput").addEventListener("click", function (event) {
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
document.addEventListener("click", function (event) {
  const searchInput = document.getElementById("searchInput");
  const dropdown = document.getElementById("dropdown");

  // クリックした場所が検索欄またはその内部であれば、プルダウンを表示し続ける
  if (!searchInput.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = "none";
  }
});


//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
var savedClass = localStorage.getItem('colorClass');
if (savedClass) {
  //ログ
  console.log('クラス取得できたよ', savedClass);

  //ラベルに適用
  const label = document.getElementById('label');
  label.classList.add(savedClass);
  //ボタンに適用（登録・一覧）
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.classList.add(savedClass);
  });
  //検索バー
  const search = document.querySelector('.search-container');
  search.classList.add(savedClass);
  //検索欄
  const searches = document.querySelectorAll('.search-button,.search-input');
  searches.forEach(search => {
    search.classList.add(savedClass);
  });

}
