//タグ一覧関連
const taglistmodal = document.getElementById('tagListmodal');
const tagListClose = document.getElementById('TagListClose');
const addTagOpenButton = document.getElementById('addTagOpenButton');
const addButton = document.getElementById('addButton');

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
const colorPalette = document.getElementById('colorPalette');
const addColorBtn = document.getElementById('addColorBtn');
const colorPickerContainer = document.getElementById('colorPickerContainer');
const addSelectedColorBtn = document.getElementById('addSelectedColorBtn');
const colorDisplayArea = document.getElementById('colorDisplayArea');
const userId = document.getElementById('userId').value;

// タグの選択
let selectedTag = null;

document.addEventListener('DOMContentLoaded', () => {
    fetchTags(); // タグを取得して表示
});

// モーダルを開く共通
function openModal(modalId, reviewButton) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    //完了ボタンの動作
    reviewModalButton.disabled = reviewButton;
    reviewModalButton.style.display = 'none';
}

// モーダルを閉じる共通
function closeModal(modalId, reviewButton) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    //完了ボタンの動作
    reviewModalButton.disabled = reviewButton;
    reviewModalButton.style.display = 'flex';
}

// タグ一覧モーダルを開く
openModalButton.addEventListener('click', function() {
    openModal('tagListmodal', false);  // 完了ボタンを無効化
    displayTagList(tags);  // タグ一覧を表示
});

// タグ一覧モーダルを閉じる
tagListClose.addEventListener('click', function() {
    closeModal('tagListmodal');  // 完了ボタンを有効化
});

// タグ一覧モーダル外をクリックしたらモーダルを閉じる
window.addEventListener('click', function(event) {
    if (event.target === taglistmodal) {
        closeModal('tagListmodal');  // 完了ボタンを有効化
    }
});
//tag一覧を取得
async function fetchTags() {
    try {
        const response = await fetch(`/tags/${userId}`);
        if (!response.ok) {
            throw new Error('タグの取得に失敗しました');
        }
        const tags = await response.json(); // サーバーからのレスポンス
        displayTagList(tags); // データを渡して描画
    } catch (error) {
        console.error('タグ取得エラー:', error);
        alert('タグを取得できませんでした');
    }
}

//タグ一覧を表示する
function displayTagList(tags) {
    console.log('tags:', tags); // デバッグ用
    if (!tags || !Array.isArray(tags)) {
        console.error('tagsが正しくありません:', tags);
        return;
    }
    try {
        const tagListDisplay = document.getElementById('tagListDisplay');
        tagListDisplay.innerHTML = '';

        tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.textContent = tag.name;
            tagElement.style.backgroundColor = tag.color;
            tagElement.classList.add('tag');

            tagElement.addEventListener('click', () => {
                selectTag(tagElement, tag);
            });

            tagListDisplay.appendChild(tagElement);
        });
    } catch (error) {
        console.error('タグの描画中にエラーが発生しました:', error);
    }
}


// 現在選択されているタグ
function selectTag(tagElement,tag) {
    console.log('選択されたタグの要素:', tagElement);  // tagElement（選択されたdiv）を表示
    console.log('選択されたタグのデータ:', tag);

    // タグ選択状態をトグル
    if (selectedTag === tagElement) {
        // もし既に選択されているタグを再クリックした場合、選択解除
        selectedTag = null;
        //選択解除時にクラスを削除
        tagElement.classList.remove('selected');
    } else {
        // 新しくタグが選ばれた場合、選択
        if (selectedTag !== null) {
            // 以前選ばれていたタグのクラスを削除
            selectedTag.classList.remove('selected');
        }
        selectedTag = tagElement;
        tagElement.classList.add('selected');
    }
}

// タグのリストを更新する関数
function updateTagList() {
    const tagListDisplay = document.getElementById('tagListDisplay');
    const tags = tagListDisplay.querySelectorAll('.tag');
    tags.forEach(tagElement => {
        // タグの背景色をリセット
        tagElement.classList.remove('selected');
        if (tagElement === selectedTag) {
            tagElement.classList.add('selected');
        }
    });
};

// タグ登録ボタンを押したときの処理
addButton.addEventListener('click', function(event) {
    event.preventDefault();

    console.log('登録ボタンがクリックされました');
    console.log('選択されているタグ:', selectedTag);

    // tagElement（選択されたタグのHTML要素）からタグ名と色を取得
    const tagName = selectedTag.textContent; // タグ名
    const tagColor = selectedTag.style.backgroundColor; // 背景色（色）

    if (selectedTag) {
        // メイン画面にタグを表示
        displayLabelInMain(tagName,tagColor);
        //タグ一覧モーダルを閉じる
        //closeModal('tagListmodal');

    } else {
        alert('タグを選択してください。');
    }
});

// メイン画面にタグを表示する関数
function displayLabelInMain(tagName,tagColor) {
    console.log('タグが選択されました:', tagName,tagColor);  // ログを追加

    // メイン画面に表示するタグを作成
    const labelElement = document.createElement('div');
    // タグの名前を設定
    labelElement.textContent = tagName;
    // 必要に応じてクラスを追加
    labelElement.classList.add('addtag');
    // タグの背景色を設定
    labelElement.style.backgroundColor = tagColor;

    // 左向き矢印の作成
    const arrowElement = document.createElement('div');
    // 矢印専用のクラスを追加
    arrowElement.classList.add('arrow');
    // 矢印の色をタグの色に
    arrowElement.style.borderRightColor = tagColor;

    // 削除ボタンを作成
    const deleteButton = document.createElement('span');
    // Material Iconsと削除ボタンのクラスを追加
    deleteButton.classList.add('material-icons', 'delete-btn');
    // アイコン名を設定
    deleteButton.textContent = 'cancel';
    // サイズを30pxに指定
    deleteButton.style.fontSize = '20px';

    // 削除ボタンのクリックイベント
    deleteButton.addEventListener('click', function() {
        console.log('タグが削除されました:', tagName);
        labelElement.remove();  // タグを削除
    });

    // 矢印をタグに追加
    labelElement.appendChild(arrowElement);
    // タグの削除ボタンをタグ要素に追加
    labelElement.appendChild(deleteButton);

    // メイン画面のタグ表示領域に追加
    labelDisplay.appendChild(labelElement);
    console.log('タグがメイン画面に追加されました');
}

//タグ追加関連
// タグ追加モーダルを開く
addTagOpenButton.addEventListener('click', function(event) {
    event.stopPropagation();  // イベントの伝播を止める
    event.preventDefault();  // デフォルトの動作を防ぐ

    closeModal('tagListmodal');
    openModal('tagmodal', false);  // 完了ボタンを無効化
});
addTagOpenButton.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

// タグ追加モーダルを閉じる
closeModalButton.addEventListener('click', function() {
    closeModal('tagmodal');
    //タグ名とカラーのリセット
    resetTagInput();
});

// タグ追加モーダル外をクリックしたらモーダルを閉じる
window.addEventListener('click', function(event) {
    if (event.target === tagmodal) {
        closeModal('tagmodal');
        //タグ名とカラーのリセット
        resetTagInput();
    }
});

// プリセットカラー選択
colorPalette.addEventListener('click', (event) => {
    if (event.target.classList.contains('color-btn')) {
        selectedColor = event.target.dataset.color; // 色を選択
        updateColorDisplay();
    }
});

// 色追加ボタンをクリックするとカラーパレットを表示
addColorBtn.addEventListener('click', () => {
    colorPickerContainer.style.display = 'flex'; // カラーパレットを表示
});

// 色を選んで「色を追加」ボタンを押すと選択した色を追加
addSelectedColorBtn.addEventListener('click', () => {
    selectedColor = customColorPicker.value; // カスタムカラーを選択
    updateColorDisplay(); // 色を表示エリアに反映
    colorPickerContainer.style.display = 'none'; // カラーパレットを非表示にする
});

// タグ登録ボタン
addTagButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const tagName = tagInput.value.trim(); // タグ名を取得
    const tagColor = selectedColor; // 選択された色を取得

    if (!tagName || !tagColor) {
        alert('タグ名と色を入力してください。');
        return;
    }

try {
    // タグ情報をサーバーに送信
    const response = await fetch(`/tags/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: tagName, color: tagColor }),
    });

    if (response.ok) {
        const result = await response.json(); // サーバーからのレスポンス
        console.log('タグ登録成功:', result);


                    closeModal('tagmodal');

                    // 登録完了後、フロントエンドを更新する処理を追加
                    addTagToList(tagName, tagColor);

    } else {
        const error = await response.json();
        console.error('タグ登録失敗:', error);
    }
} catch (error) {
    console.error('タグ登録中にエラーが発生しました:', error);
}
});


// 色表示エリアを更新
function updateColorDisplay() {
    colorDisplayArea.innerHTML = ''; // 現在の色をリセット
    const colorBox = document.createElement('div');
    colorBox.style.backgroundColor = selectedColor;
    colorBox.classList.add('color-box');
    colorDisplayArea.appendChild(colorBox);
}

// 新しく追加されたタグを画面に表示する関数
function addTagToList(tagName, tagColor) {
    const tagListDisplay = document.getElementById('tagListDisplay');

    // 新しいタグを表示するためのdiv要素を作成
    const tagElement = document.createElement('div');
    tagElement.textContent = tagName;
    tagElement.style.backgroundColor = tagColor;
    tagElement.classList.add('tag');

    // タグがクリックされたときに選択できるようにする
    tagElement.addEventListener('click', () => {
        console.log(`選択されたタグ: ${tagName}`);
        selectTag(tagElement, { name: tagName, color: tagColor });
    });

    // 作成したタグをタグリストに追加
    tagListDisplay.appendChild(tagElement);
}

// タグ名入力をリセットする関数
function resetTagInput() {
    tagInput.value = '';  // 入力フィールドを空にする
    selectedColor = '';   // 選択した色をリセット
    updateColorDisplay(); // 色表示エリアをリセット
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
    const imageFile = document.getElementById('imagePreview');
    const brand = document.getElementById('brand').value;
      const locationSelect = document.getElementById('location');
       const locationName = locationSelect.options[locationSelect.selectedIndex].text;
    const memo = document.getElementById('memo').value;
    const imagePreviewModal = document.getElementById('reviewImage');
    const tags = Array.from(labelDisplay.children).map(tag => {
        return {
            name: tag.textContent.replace('cancel', '').trim(),
            color: tag.style.backgroundColor  // 色も取得
        };
    });
    const canvas = document.getElementById('imagePreview');
    ImageContent = canvas.src;

    // 入力欄に空白がないかチェック
    if (name === "" || imageFile === "" || brand === "" || location === " " || memo === "" || tags.length===0) {
        alert("すべての項目を入力してください");
        return;  // 空欄があれば処理を中止
        }

    // フォームの内容をモーダルに表示
    document.getElementById('reviewName').innerHTML = `<a>名前</a><br>${name}`;
    document.getElementById('reviewBrand').innerHTML = `<a>ブランド</a><br>${brand}`;
      document.getElementById('reviewLocation').innerHTML = `<a>収納場所</a><br>${locationName}`;
    document.getElementById('reviewMemo').innerHTML = `<a>メモ</a><br>${memo}`;

    // 画像の表示
    imagePreviewModal.innerHTML = `<img src="${ImageContent}" alt="画像" style="max-width: 100%; max-height: 200px;">`;


    // タグの表示
    const reviewTagsContainer = document.getElementById('reviewTags');
    reviewTagsContainer.innerHTML = '';  // 前のタグをリセット

    tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.textContent = tag.name;  // タグ名
        tagElement.style.backgroundColor = tag.color;  // タグ色
        tagElement.classList.add('rvtag');  // スタイルクラスを追加

        // 左向き矢印の作成
        const arrowElement = document.createElement('div');
        // 矢印専用のクラスを追加
        arrowElement.classList.add('rvarrow');
        // 矢印の色をタグの色に
        arrowElement.style.borderRightColor = tag.color;

        tagElement.appendChild(arrowElement);
        reviewTagsContainer.appendChild(tagElement);
    });

    // モーダルを表示
    document.getElementById('reviewModal').style.display = 'flex';
}

// フォームをリセットする関数
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('image').value = '';
    document.getElementById('brand').value = '';
    document.getElementById('location').value = '';
    document.getElementById('memo').value = '';
    // タグリストのリセットも行う
    labelDisplay.innerHTML = '';  // タグ一覧をクリア
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
registerButton.addEventListener("click", async () => {
const formData = new FormData();
formData.append("name", document.getElementById("reviewName").textContent.replace("名前", "").trim());
formData.append("brandName", document.getElementById("reviewBrand").textContent.replace("ブランド", "").trim());
formData.append("description", document.getElementById("reviewMemo").textContent.replace("メモ", "").trim());
formData.append("storageId", document.getElementById("location").value);


const tags = Array.from(document.querySelectorAll(".rvtag")).map(tag => ({
    id: tag.dataset.id,
    name: tag.textContent.trim()
}));
console.log("Final tags data:", JSON.stringify(tags)); // 最終的に送信するデータを確認
formData.append("tags", JSON.stringify(tags));

const imgElement = document.querySelector("#reviewImage img");
const imgResponse = await fetch(imgElement.src);
if (imgResponse.ok) {
    const imgBlob = await imgResponse.blob();
    formData.append("image", imgBlob);
} else {
    console.error("画像の取得に失敗しました");
    return;
}
console.log("User ID:", userId);
try {
    const response = await fetch(`/register/${userId}/clothes`, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const result = await response.json();
        console.log("服の登録成功:", result);
        // 確認画面を非表示にする
            reviewModal.style.display = 'none';

            // 登録完了メッセージを表示
            registerModal.style.display = 'flex';
    } else {
        const error = await response.json();
        console.error("服の登録失敗:", error);
    }
} catch (error) {
    console.error("登録中にエラーが発生:", error);
}
  resetForm();
});



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
