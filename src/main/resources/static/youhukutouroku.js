//タグ登録関係
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

// 完了ボタンが押されたときの処理
//確認画面の表示
//モーダル要素を取得
var reviwModal = document.getElementById("reviewModalScreen");
//モーダルを開くボタンを取得
var reviwbtn = document.getElementById("review-modal-button");
//モーダルを閉じるアイコンを取得
var span = document.getElementById("reviwCloseBtn");

//ボタンがクリックされたとき、モーダルを表示
reviwbtn.onclick = function(){
    reviwModal.style.display="flex";
}

//×を押したとき、閉じる
span.onclick=function(){
    reviwModal.style.display="none";
}

//モーダルの範囲外が押された場合も閉じる
window.onclick = function(event){
    if(event.target == reviwModal){
        reviwModal.style.display="none";
    }
}