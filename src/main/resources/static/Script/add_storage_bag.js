// 写真リスト
const photos = [
    "../static/img/strage-bag1.png",
    "../static/img/strage-bag2.png",
    "../static/img/strage-bag3.png"
];
let currentPhotoIndex = 0;

// 初期表示時に最初の画像をアクティブにする
window.onload = function () {
    showPhoto(currentPhotoIndex);
};

// 写真を切り替える関数
function showPhoto(index) {
    const sliderPhoto = document.getElementById("slider-photo");
    sliderPhoto.src = photos[index];

    // サンプル画像のボタンにアクティブなクラスを付与
    const buttons = document.querySelectorAll(".thumbnail-buttons button");
    buttons.forEach((button, i) => {
        if (i === index) {
            button.classList.add("active");  // アクティブなボタンにクラスを追加
        } else {
            button.classList.remove("active");  // 他のボタンからはクラスを削除
        }
    });
}

// 前の写真へ
function previousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(currentPhotoIndex);
}

// 次の写真へ
function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(currentPhotoIndex);
}

// 写真を選択する関数
function selectPhoto(index) {
    currentPhotoIndex = index;
    showPhoto(currentPhotoIndex);
}

// フォームの内容をモーダルに表示
// モーダルを取得
var reviewModal = document.getElementById("reviewModal");
// モーダルを閉じるアイコンを取得
var closeBtn = document.getElementById("reviwCloseBtn");
// モーダルを開くボタン
var reviewOpenButton = document.getElementById("review-modal-button");

reviewOpenButton.onclick = function (event) {
    event.preventDefault();  // フォーム送信のデフォルト動作を防止
    event.stopPropagation();  // イベントの伝播を止める
    const name = document.getElementById('name').value;
    const reviewSyunouImage = document.getElementById('reviewSyunouImage');

    var selectedImageSrc = photos[currentPhotoIndex];

    // 入力欄に空白がないかチェック
    if (name === "") {
        alert("すべての項目を入力してください");
        return;  // 空欄があれば処理を中止
    }

    // フォームの内容をモーダルに表示
    document.getElementById('reviewName').innerHTML = `<a>名前</a><br>${name}`;

    reviewSyunouImage.innerHTML = `<img src="${selectedImageSrc}" alt="Selected Image" class="storageBoxImage">`;

    // モーダルを表示
    reviewModal.style.display = 'flex';
}

// ×を押したとき、閉じる
closeBtn.onclick = closeReviewModal;

// 確認画面を閉じる
function closeReviewModal() {
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

// ボタンのクリックイベント: 情報ボタンをクリックしたときの動作
document.getElementById('infoButton').addEventListener('click', function () {
    alert("収納ケースに名前を入力してください。\n例:季節物 夏服用 冬物衣類");
});

// ボタンのクリックイベント: 情報ボタンをクリックしたときの動作
document.getElementById('StorageBoxMemo').addEventListener('click', function () {
    alert("配置している場所や収納している物についての詳細を書き留めることができます。\n例:季節物 夏服用 \n　 12/1に衣替えした");
});

// セレクトボックスで選んだものによって遷移先を変更させる
const selectOption = document.getElementById('selectOption');

// セレクトボックスの選択肢が変更されたときの処理
selectOption.addEventListener('change', function () {
    const selectedValue = selectOption.value;

    setTimeout(function () {
        if (selectedValue === '2') {
            window.location.href = 'add_clothes.html';
        }
        else if (selectedValue === '3') {
            window.location.href = 'index_clothes.html';
        }
    }, 800); // （0.8秒）後に遷移
});


//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
var savedClass = localStorage.getItem('colorClass');
if (savedClass) {
    //ログ
    console.log('クラス取得できたよ', savedClass);

    //ボタンに適用（登録・一覧）
    const inputs = document.querySelectorAll('.input-container');
    inputs.forEach(input => {
        input.classList.add(savedClass);
    });
}