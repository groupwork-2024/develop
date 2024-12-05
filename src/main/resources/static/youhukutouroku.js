//タグ一覧関連
const taglistmodal = document.getElementById('tagListmodal');
const tagListClose = document.getElementById('TagListClose');
const addTagOpenButton = document.getElementById('addTagOpenButton');

//＋ボタンを取得
const openModalButton = document.getElementById('tagOpenButton');

// タグ追加関連
const tagmodal = document.getElementById('tagmodal');
const closeModalButton = document.getElementById('TagCloseModalButton');
const addTagButton = document.getElementById('addTagButton');
const tagInput = document.getElementById('tagInput');
const customColorPicker = document.getElementById('customColorPicker');
const colorButtons = document.querySelectorAll('.color-btn');
const labelDisplay = document.getElementById('labelDisplay');
const reviewModalButton = document.getElementById('review-modal-button');

// タグ一覧モーダルを開く
openModalButton.addEventListener('click', function() {
    taglistmodal.style.display = 'flex';
    reviewModalButton.disabled = true;  // 完了ボタンを無効化
    reviewModalButton.style.display='none';
});

// タグ一覧モーダルを閉じる
tagListClose.addEventListener('click', function() {
    taglistmodal.style.display = 'none';
    reviewModalButton.disabled = false;  // 完了ボタンを有効化
    reviewModalButton.style.display='flex';
});

// タグ一覧モーダル外をクリックしたらモーダルを閉じる
window.addEventListener('click', function(event) {
    if (event.target === taglistmodal) {
        taglistmodal.style.display = 'none';
        reviewModalButton.disabled = false;  // 完了ボタンを有効化
        reviewModalButton.style.display='flex';
    }
});

// タグ追加モーダルを開く
addTagOpenButton.addEventListener('click', function() {
    tagmodal.style.display = 'flex';
    taglistmodal.style.display = 'none';
    reviewModalButton.disabled = true;  // 完了ボタンを無効化
    reviewModalButton.style.display='none';
});

// タグ追加モーダルを閉じる
closeModalButton.addEventListener('click', function() {
    tagmodal.style.display = 'none';
    reviewModalButton.disabled = false;  // 完了ボタンを有効化
    reviewModalButton.style.display='flex';
});

// タグ追加モーダル外をクリックしたらモーダルを閉じる
window.addEventListener('click', function(event) {
    if (event.target === tagmodal) {
        tagmodal.style.display = 'none';
        reviewModalButton.disabled = false;  // 完了ボタンを有効化
        reviewModalButton.style.display='flex';
    }
});

//カラーパレット関連
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
    const tagName = document.getElementById('tagInput').value.trim(); // タグ名を取得
    //色の取得
    const color = getSelectedColor();

    if (!tagName) {
        alert("タグの名前を追加してください")
        return;
    }

    //タグを追加
    addtagToList(tagName,color);

    // タグをlocalStorageに保存
    saveTagToLocalStorage(tagName, color);

    //タグ追加モーダルを閉じる
    tagmodal.style.display = 'none';

    //タグ一覧モーダルを表示する
    taglistmodal.style.display = 'none';

    //タグ名入力をリセット
    document.getElementById("tagInput").value = '';

});

// タグをタグ一覧に追加する関数
function addTagToList(tagName, color) {
    const tagList = document.querySelector('.tagList'); // タグ一覧を取得

    if (!tagList) {
        console.error("タグ一覧の場所が見つかりませんでした。");
        return;
    }

    // 新しいタグ要素を作成
    const tagDiv = document.createElement('div');
    tagDiv.classList.add('tag');
    tagDiv.style.backgroundColor = color;  // 選択した色をタグの背景色に設定

    // タグ名を表示するためのspan要素を作成
    const tagNameElement = document.createElement('span');
    tagNameElement.textContent = tagName;
    tagDiv.appendChild(tagNameElement);

    // 削除ボタンを作成
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', function() {
        tagList.removeChild(tagDiv); // タグを削除
        removeTagFromLocalStorage(tagName); // localStorageから削除
    });

    tagDiv.appendChild(deleteBtn);
    tagList.appendChild(tagDiv);  // タグ一覧に追加
}

// タグをlocalStorageに保存する関数
function saveTagToLocalStorage(tagName, color) {
    let tags = JSON.parse(localStorage.getItem('tags')) || [];  // 保存されているタグを取得（なければ空の配列）
    tags.push({ name: tagName, color: color });  // 新しいタグを追加
    localStorage.setItem('tags', JSON.stringify(tags));  // localStorageに保存
}

// タグをlocalStorageから削除する関数
function removeTagFromLocalStorage(tagName) {
    let tags = JSON.parse(localStorage.getItem('tags')) || [];  // 保存されているタグを取得
    tags = tags.filter(tag => tag.name !== tagName);  // 削除したいタグを除外
    localStorage.setItem('tags', JSON.stringify(tags));  // 更新されたタグを保存
}

// ページが読み込まれたときにタグを表示する処理
window.addEventListener('DOMContentLoaded', function() {
    // localStorageから保存されたタグを取得
    console.log('DOMContentLoaded event fired'); 
    const storedTags = JSON.parse(localStorage.getItem('tags')) || [];  // もし保存されていなければ空の配列
    console.log(storedTags);  // localStorageから取得したタグが正しいか確認

    // 保存されたタグをタグ一覧に追加
    storedTags.forEach(tag => {
        addTagToList(tag.name, tag.color);  // タグをUIに追加する関数
    });
});

// プリセットカラーまたはカスタムカラーの取得
function getSelectedColor() {
    // プリセットカラーを選択した場合
    const presetColor = document.querySelector('.color-btn.selected');
    if (presetColor) {
        return presetColor.getAttribute('data-color');  // プリセットカラーを返す
    }

    // カスタムカラーが選ばれている場合
    const customColor = document.getElementById('customColorPicker').value;
    return customColor;
}

// プリセットカラーの選択を管理
document.querySelectorAll('.color-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        // すべてのプリセットカラーから選択状態を解除
        document.querySelectorAll('.color-btn').forEach(function(btn) {
            btn.classList.remove('selected');
        });
        button.classList.add('selected');  // 選択されたカラーにselectedクラスを追加
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
    const selectedColor = document.getElementById('customColorPicker').value; // カスタムカラーを取得
    addColorToDisplay(selectedColor); //カラーパレットに追加
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
        alert(`選択された色: ${color}`); 
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
    document.getElementById('reviewModal').style.display = 'flex';
}

// モーダルを取得
var reviwModal = document.getElementById("reviewModal");
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

// 確認画面を閉じる
function closeReviewModal() {
    const reviewModal = document.getElementById('reviewModal');
    reviewModal.style.display = 'none';
}

//完了確認メッセージ関連
// 登録データを登録後に完了メッセージを表示
function registerData() {
    const reviewModal = document.getElementById('reviewModal');
    const registerModal = document.getElementById('registerModal');

    // 確認画面を非表示にする
    reviewModal.style.display = 'none';

    // 登録完了メッセージを表示
    registerModal.style.display = 'flex';
}

// 「登録完了」メッセージを閉じて、次の画面に移動
function closeRegisterModal() {
    const registerModal = document.getElementById('registerModal');
    registerModal.style.display = 'none';
}

// カメラ起動用の関数
function openCamera() {
    const video = document.getElementById('video');
    const fileInput = document.getElementById('addImageButton'); // ファイル入力ボタン
    const addPhotoButton = document.getElementById('addPhoto'); // カメラ起動ボタン
    const imagePreview = document.getElementById('imagePreview'); // 画像プレビューの要素
    const stopCameraButton = document.getElementById('stopCameraButton'); // ×ボタン

    // カメラ起動
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.style.display = 'flex'; // カメラの映像を表示
            imagePreview.style.display = 'none'; // 画像プレビューを非表示
            stopCameraButton.style.display='flex'; //×ボタンを表示
            fileInput.disabled = true; // ファイル選択ボタンを無効化
            fileInput.style.display='none'; // ファイル選択ボタンを非表示
            addPhotoButton.disabled = true; // カメラ起動ボタンを無効化（重複起動防止）
            addPhotoButton.style.display='none'; // カメラ起動ボタンを非表示
	        document.getElementById('capture').style.display = 'block';  // 撮影ボタンを表示
        })
        .catch(function (error) {
            console.error('カメラの取得に失敗しました:', error);
        });
}

// 撮影処理
function captureImage() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // 撮影した画像をキャンバスに描画
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 画像プレビュー表示
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = canvas.toDataURL('image/png');
    imagePreview.style.display = 'flex'; // 撮影した画像をプレビューとして表示
    video.style.display = 'none'; // カメラ映像を非表示

    // カメラストリームを停止
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    // カメラ停止後、ファイル選択ボタンを再度有効化
    const fileInput = document.getElementById('addImageButton');
    const addPhotoButton = document.getElementById('addPhoto');
    const stopCameraButton = document.getElementById('stopCameraButton'); // ×ボタン
    fileInput.disabled = false;
    fileInput.style.display='flex';
    addPhotoButton.disabled = false
    addPhotoButton.style.display='flex';
	document.getElementById('capture').style.display = 'none';  // 撮影ボタンを非表示
    stopCameraButton.style.display='none'; //×ボタンを非表示
}

// カメラ停止用
function stopCamera() {
    const video = document.getElementById('video');
    const stopCameraButton = document.getElementById('stopCameraButton'); // ×ボタン
    const imagePreview = document.getElementById('imagePreview');
    const fileInput = document.getElementById('addImageButton');
    const addPhotoButton = document.getElementById('addPhoto');
    const capture = document.getElementById('capture');

    // カメラストリームを停止
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    // カメラ映像を非表示
    video.style.display = 'none';
    imagePreview.style.display = 'flex'; // 画像プレビューを再表示

    // ×ボタンと撮影ボタンを非表示
    stopCameraButton.style.display = 'none';
    capture.style.display='none';

    // ファイル選択ボタンとカメラ起動ボタンを再表示
    fileInput.disabled = false;
    addPhotoButton.disabled = false;
    fileInput.style.display='flex';
    addPhotoButton.style.display='flex';
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

//タグのデータベース関連
