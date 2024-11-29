// タグ追加関連
const tagmodal = document.getElementById('tagmodal');
const openModalButton = document.getElementById('tagOpenButton');
const closeModalButton = document.getElementById('TagCloseModalButton');
const addTagButton = document.getElementById('addTagButton');
const tagInput = document.getElementById('tagInput');
const customColorPicker = document.getElementById('customColorPicker');
const colorButtons = document.querySelectorAll('.color-btn');
const labelDisplay = document.getElementById('labelDisplay');
const reviewModalButton = document.getElementById('review-modal-button');

let selectedColor = '#000000';  // 初期カラーは黒

// モーダルを開く
openModalButton.addEventListener('click', function() {
    tagmodal.style.display = 'flex';
    reviewModalButton.disabled = true;  // 完了ボタンを無効化
    reviewModalButton.style.display='none';
});

// モーダルを閉じる
closeModalButton.addEventListener('click', function() {
    tagmodal.style.display = 'none';
    reviewModalButton.disabled = false;  // 完了ボタンを有効化
    reviewModalButton.style.display='flex';
});

// モーダル外をクリックしたらモーダルを閉じる
window.addEventListener('click', function(event) {
    if (event.target === tagmodal) {
        tagmodal.style.display = 'none';
        reviewModalButton.disabled = false;  // 完了ボタンを有効化
        reviewModalButton.style.display='flex';
    }
});

// プリセットカラーの選択
colorButtons.forEach(button => {
    button.addEventListener('click', function() {
        selectedColor = button.getAttribute('data-color');  // クリックされた色を選択
        customColorPicker.value = selectedColor;  // カスタムカラー選択にも反映
    });
});

// カスタムカラーピッカーで色を選択したとき
customColorPicker.addEventListener('input', function() {
    selectedColor = customColorPicker.value;  // 選択した色を反映
});

// タグ追加ボタンがクリックされたとき
document.getElementById('addTagButton').addEventListener('click', function() {
    const tagName = document.getElementById('tagInput').value; // タグ名を取得
    const selectedColor = document.getElementById('customColorPicker').value; // カスタムカラーを取得

    if (tagName) {
        addTagToDisplay(tagName, selectedColor); // タグを表示エリアに追加
        document.getElementById('tagInput').value = ''; // 入力フィールドをクリア
        document.getElementById('customColorPicker').value = '#000000'; // カラー選択をリセット
    }
});

// カラーパレットの色が選択されたとき
document.querySelectorAll('.color-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const selectedColor = button.getAttribute('data-color');
        document.getElementById('customColorPicker').value = selectedColor; // カラーをカスタムカラー選択に反映
    });
});

// タグを画面に追加する関数
function addTagToDisplay(tagName, tagColor) {
    const labelDisplay = document.getElementById('labelDisplay');
    const tagElement = document.createElement('div');
    tagElement.classList.add('tag');
    tagElement.style.backgroundColor = tagColor; // 色を設定

    const tagText = document.createElement('span');
    tagText.classList.add('tag-text');
    tagText.textContent = tagName; // タグ名を設定

    // タグ要素にタグ名を追加
    tagElement.appendChild(tagText);
    labelDisplay.appendChild(tagElement);
}

// 「＋ボタン」クリックでカラーパレットを表示
document.getElementById('addColorBtn').addEventListener('click', function() {
    const colorPickerContainer = document.getElementById('colorPickerContainer');
    
    // カラーパレットを表示/非表示
    if (colorPickerContainer.style.display === 'none' || colorPickerContainer.style.display === '') {
        colorPickerContainer.style.display = 'block'; // 表示
    } else {
        colorPickerContainer.style.display = 'none'; // 非表示
    }
});

// プリセットカラーをクリックしたとき
document.querySelectorAll('.color-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        const selectedColor = button.getAttribute('data-color');
        addColorToDisplay(selectedColor);
    });
});

// 「色を追加」ボタンをクリックしたとき
document.getElementById('addSelectedColorBtn').addEventListener('click', function() {
    const selectedColor = document.getElementById('customColorPicker').value;
    addColorToDisplay(selectedColor);
    document.getElementById('colorPickerContainer').style.display = 'none'; // カラーパレットを非表示にする
});

// 色を画面に追加する関数
function addColorToDisplay(color) {
    const colorDisplayArea = document.getElementById('colorDisplayArea');

    // 新しい色を追加
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color; // 背景色に選ばれた色を設定

    // 色ボックスをクリックしたときに色をフォームに反映
    colorBox.addEventListener('click', function() {
        alert(`選択された色: ${color}`); // ここで必要な処理（フォームに反映など）を実行できます
    });

    // 色ボックスをプリセットカラーの後ろに追加
    colorDisplayArea.appendChild(colorBox);
}


// 画像関連
// 画像プレビューを表示する関数
function previewImage() {
    const file = document.getElementById('image').files[0];  // 選択されたファイル
    const preview = document.getElementById('imagePreview');  // 画像プレビュー用のimgタグ
    
    if (file) {
        const reader = new FileReader();
        
        // 画像が読み込まれたときに呼ばれる
        reader.onload = function(e) {
            preview.src = e.target.result;  // 画像のsrc属性に読み込んだデータURLをセット
            preview.style.display = 'block';  // プレビューを表示
        }

        reader.readAsDataURL(file);  // 画像をDataURLとして読み込み
    } else {
        preview.src = '';  // ファイルが選択されていない場合はsrcを空に
        preview.style.display = 'none';  // プレビューを非表示
    }
}

// 「＋」ボタンをクリックしたときにファイルダイアログを開く
document.getElementById('addImageButton').addEventListener('click', function() {
    document.getElementById('image').click();  // 隠れているファイル入力要素をクリック
});

// フォームの内容をモーダルに表示
// モーダル内に画像を表示
function openReviewModal() {
    const name = document.getElementById('name').value;
    const imageFile = document.getElementById('image').files[0];
    const brand = document.getElementById('brand').value;
    const location = document.getElementById('location').value;
    const memo = document.getElementById('memo').value;
    const imagePreviewModal = document.getElementById('reviewImage');
    const tags = Array.from(labelDisplay.children).map(tag => tag.textContent).join(', '); // タグを取得

    // フォームの内容をモーダルに表示
    document.getElementById('reviewName').innerText = `名前: ${name}`;
    document.getElementById('reviewTags').innerText = `タグ: ${tags}`;
    document.getElementById('reviewBrand').innerText = `ブランド: ${brand}`;
    document.getElementById('reviewLocation').innerText = `収納場所: ${location}`;
    document.getElementById('reviewMemo').innerText = `メモ: ${memo}`;

    // 画像の表示
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreviewModal.innerHTML = `<img src="${e.target.result}" alt="画像" style="max-width: 100%; max-height: 200px;">`;
        }
        reader.readAsDataURL(imageFile);
    } else {
        imagePreviewModal.innerText = '画像なし';
    }

    // モーダルを表示
    document.getElementById('reviewModal').style.display = 'block';
}

// モーダルを取得
var reviwModal = document.getElementById("reviewModal");
// モーダルを開くボタンを取得
var reviwbtn = document.getElementById("review-modal-button");
// モーダルを閉じるアイコンを取得
var span = document.getElementById("reviwCloseBtn");

// ×を押したとき、閉じる
span.onclick = function() {
    reviwModal.style.display = "none";
}

// モーダルの範囲外が押された場合も閉じる
window.onclick = function(event) {
    if (event.target == reviwModal) {
        reviwModal.style.display = "none";
    }
}

// 登録ボタンの仮処理
function registerData() {
    alert('データが登録されました！');
    closeReviewModal();
}

// モーダルを閉じる関数
function closeReviewModal() {
    reviwModal.style.display = "none";
}

// カメラを起動する関数
function openCamera() {
    // カメラを起動
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            var video = document.getElementById('video');
            video.style.display = 'block';  // ビデオ要素を表示
            video.srcObject = stream;
            document.getElementById('capture').style.display = 'block';  // 撮影ボタンを表示
        })
        .catch(function(error) {
            alert('カメラを開けませんでした。');
            console.error(error);
        });
}

// 撮影した画像をキャンバスに描画してプレビューを表示
function captureImage() {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var imagePreview = document.getElementById('imagePreview');

    // キャンバスのサイズをビデオと同じに設定
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // ビデオから画像を描画
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // キャンバスの画像をプレビューに表示
    var dataUrl = canvas.toDataURL('image/png');
    imagePreview.src = dataUrl;

    // カメラを停止
    var stream = video.srcObject;
    var tracks = stream.getTracks();
    tracks.forEach(function(track) {
        track.stop();  // ストリームを停止
    });

    // ビデオを非表示にする
    video.style.display = 'none';
    document.getElementById('capture').style.display = 'none';
}

// 画像を選択した際のプレビュー
function previewImage() {
    const file = document.getElementById('image').files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}