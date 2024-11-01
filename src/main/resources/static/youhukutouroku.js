let colorOptions = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff']; // 初期の色
let selectedColor = null;

// モーダルを開く関数
function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('label-name').value = '';
    selectedColor = null;
    updateColorPalette();
}

// モーダルを閉じる関数
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// カラーパレットを更新する関数
function updateColorPalette() {
    const colorPalette = document.getElementById('colorPalette');
    colorPalette.innerHTML = '';

    colorOptions.forEach(color => {
        const colorElement = document.createElement('div');
        colorElement.classList.add('color');
        colorElement.style.backgroundColor = color;
        colorElement.onclick = function() {
            selectColor(this, color);
        };
        colorPalette.appendChild(colorElement);
    });

    const addColorDiv = document.createElement('div');
    addColorDiv.className = 'color add-color';
    addColorDiv.textContent = '+';
    addColorDiv.onclick = showColorPicker;
    colorPalette.appendChild(addColorDiv);
}

// カラーを選択する関数
function selectColor(element, color) {
    document.querySelectorAll('.color').forEach(colorEl => colorEl.classList.remove('selected'));
    element.classList.add('selected');
    selectedColor = color;
}

// カスタムカラーを追加する関数
function addCustomColor() {
    const customColor = document.getElementById('customColorPicker').value;
    if (!colorOptions.includes(customColor)) {
        colorOptions.push(customColor);
        updateColorPalette();
    }
}

// ラベルを保存する関数
function saveLabel() {
    const labelName = document.getElementById('label-name').value.trim();
    if (labelName && selectedColor) {
        displayLabelInMain({ name: labelName, color: selectedColor });
        closeModal();
    } else {
        alert("ラベル名とカラーを入力してください。");
    }
}

// メイン画面にラベルを表示する関数
function displayLabelInMain(label) {
    const labelDisplay = document.getElementById('labelDisplay');
    const labelElement = document.createElement('button');
    labelElement.textContent = label.name;
    labelElement.classList.add('tag');

    // CSS カスタムプロパティを使用してタグの色を設定
    labelElement.style.setProperty('--tag-bg-color', label.color);

    // タグのクリックイベントで選択・解除
    labelElement.addEventListener('click', function() {
        labelElement.classList.toggle('selected');
    });

    labelDisplay.appendChild(labelElement);
}

// カラーピッカーを表示する関数
function showColorPicker() {
    document.getElementById('customColorPicker').click();
}

// モーダル外を押したときにモーダルを閉じる
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};

// 選択されたタグを取得する関数
function getSelectedTags() {
    const selectedTags = [];
    const tags = document.querySelectorAll('.tag.selected');
    tags.forEach(tag => selectedTags.push(tag.textContent));
    return selectedTags;
}

// 初期化
document.getElementById('openModalButton').onclick = openModal;
document.querySelector('.close-btn').onclick = closeModal;
document.getElementById('customColorPicker').onchange = addCustomColor;

updateColorPalette();

// 画像の表示
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('image-preview');
            preview.src = e.target.result;
            preview.style.display = 'block'; // 画像が選択されたら表示
        };
        reader.readAsDataURL(file);
    }
}

// メイン画面の情報を保持するオブジェクト
let mainScreenData = {
    name: "",
    brand: "",
    location: "",
    memo: "",
    tags: []
};
  
  // 完了ボタンがクリックされたときの処理
document.getElementById("completeButton").addEventListener("click", function (event) {
    event.preventDefault(); // ページのリロードを防ぐ
    console.log("完了ボタンがクリックされました"); // この行でクリックイベントの確認

    // メイン画面からデータを取得
    mainScreenData.name = document.getElementById("name").value;
    mainScreenData.brand = document.getElementById("brand").value;
    mainScreenData.location = document.getElementById("location").value;
    mainScreenData.memo = document.getElementById("memo").value;

    // タグ情報も取得（すでに表示されているものを利用）
    mainScreenData.tags = Array.from(document.querySelectorAll("#labelDisplay .tag")).map(tag => {
        return { name: tag.textContent, color: tag.style.backgroundColor };
    });

    // 確認画面にデータを表示
    displayReviewScreen();

    // メイン画面を非表示にして確認画面を表示
    document.getElementById("screen1").style.display = "none";
    document.getElementById("screen2").style.display = "block";
});

  
  // 確認画面にデータを表示する関数
function displayReviewScreen() {
    console.log("確認画面にデータを表示"); // デバッグ用のログ

    document.getElementById("reviewName").textContent = `名前: ${mainScreenData.name}`;
    document.getElementById("reviewBrand").textContent = `ブランド名: ${mainScreenData.brand}`;
    document.getElementById("reviewLocation").textContent = `収納場所: ${mainScreenData.location}`;
    document.getElementById("reviewMemo").textContent = `メモ: ${mainScreenData.memo}`;
    
    const reviewTags = document.getElementById("reviewTags");
    reviewTags.innerHTML = ''; // タグ表示をクリア
  
    mainScreenData.tags.forEach(tag => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag.name;
        tagElement.style.backgroundColor = tag.color;
        tagElement.classList.add("tag-style");
        reviewTags.appendChild(tagElement);
    });
}

  
  
  // 登録ボタンがクリックされたときの処理
function registerData() {
    // ここで登録処理を実行（例: サーバーにデータを送信）
  
    alert("データが登録されました！");
    
    // 必要に応じてメイン画面に戻す処理
    document.getElementById("screen1").style.display = "block";
    document.getElementById("screen2").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const completeButton = document.getElementById("completeButton");

    // ボタンが存在するか確認する
    if (completeButton) {
        completeButton.addEventListener("click", function (event) {
            event.preventDefault(); // ページリロードを防止
            console.log("完了ボタンがクリックされました"); // デバッグ用
        });
    } else {
        console.log("完了ボタンが見つかりませんでした"); // デバッグ用
    }
});


  