const cp_sl06 = document.querySelector(".cp_sl06"); //最初のclassの取得
const clothes = document.querySelectorAll(".clothse_button");
const detail =  document.querySelector(".detail");
const userId = document.getElementById('userId').value;

document.addEventListener("DOMContentLoaded", function () {
    fetchData("DRESSER"); // デフォルトでクローゼットを表示
});

    document.getElementById("storageTypeSelect").addEventListener("change", function () {
    const selectedValue = this.value; // セレクトボックスの値を取得
    console.log("Selected Value:", selectedValue);
    fetchData(selectedValue); // 新しいデータを取得
});

function fetchData(storageType) {
      console.log("Selected Value:", storageType);
      fetch(`/section/${userId}/storages?storageType=${storageType}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
 .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        return response.text(); // HTMLを取得
    })
    .then(html => {
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, 'text/html'); // HTMLをパース
        const newContent = newDocument.querySelector('#storageList'); // 差し替える部分を取得
        document.querySelector('#storageList').innerHTML = newContent.innerHTML; // 差し替え
    })
    .catch(error => console.error("Error:", error));
}

function ProcessingInstruction() {
    const clothes = document.querySelectorAll(".clothse_button"); // すべてのアイテムを取得
    clothes.forEach(content => content.style.display = "none"); // 全て非表示

    const selectedValue = cp_sl06.value; // セレクトボックスの値を取得
    if (selectedValue) {
        const selectedContent = document.getElementById(selectedValue);
        if (selectedContent) {
            selectedContent.style.display = "block"; // 選択された要素を表示
        }
    }
}
  //収納をクリックするとページを背にする処理
  function goToClothesPage(name,storage_type){
    storage_type=storage_type.toLowerCase();
    window.location.href = `detail_${storage_type}.html?name=${name}`;
}


//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
var savedClass = localStorage.getItem('colorClass');
if (savedClass) {
  //ログ
  console.log('クラス取得できたよ', savedClass);

  //ラベルに適用
  const name = document.querySelector('.list_name');
  name.classList.add(savedClass);
}