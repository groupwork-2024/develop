let ImageContent = '';
// 情報ボタンを押したときの処理
// 名前フィールドの情報ボタン
document.getElementById('closetName').addEventListener('click', function() {
    alert("クローゼットに名前を入力してください。\n例: 寝室のクローゼット");
});

//メモの情報ボタン
document.getElementById('closetMemo').addEventListener('click', function() {
    alert("配置している場所や収納している物についての詳細を書き留めることができます。\n例:寝室のクローゼット コート類");
});

// 完了ボタンが押された時にモーダルを表示し、フォームデータを表示する
function openReviewModal() {
    // フォームのデータを取得
    console.log("確認モーダルを開きました");
    const name = document.getElementById('name').value;
    const imageFile = document.getElementById('image').files[0];
    const imagePreviewModal = document.getElementById('reviewImage');
    const memo = document.getElementById('memo').value;
    const canvas = document.getElementById('imagePreview');

    ImageContent = canvas.src;

    // 入力欄に空白がないかチェック
    // if (name === "" || imageFile === "") {
    //     alert("すべての項目を入力してください");
    //     return;  // 空欄があれば処理を中止
    // }
    
    // モーダルの中にデータを埋め込む
    document.getElementById('reviewName').innerHTML = `<a>クローゼットの名前</a><br>${name}`;

    document.getElementById('reviewMemo').innerHTML = `<a>メモ</a>
    <textarea placeholder="メモなし" readonly>${memo}</textarea>`;

    // 画像の表示
    imagePreviewModal.innerHTML = `<a>写真</a>
    <img src="${ImageContent}" alt="画像" style="max-width: 100%; max-height: 200px;">`;

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

// セレクトボックスで選んだものによって遷移先を変更させる
const selectOption = document.getElementById('selectOption');

// セレクトボックスの選択肢が変更されたときの処理
selectOption.addEventListener('change', function() {
    const selectedValue = selectOption.value;

    setTimeout(function() {
        if (selectedValue === '2') {
        window.location.href = 'add_clothes.html'; 
        } 
        else if (selectedValue === '3') {
            window.location.href = 'index_clothes.html';
        }
    }, 800); // （0.8秒）後に遷移
});

