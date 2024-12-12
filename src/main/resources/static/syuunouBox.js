// 写真リスト
const photos = [
    "https://www.komeri.com/images/goods/014/396/16/1439616.jpg",
    "https://cdn.askul.co.jp/img/product/3L1/502432_3L1.jpg", 
    "https://jp.daisonet.com/cdn/shop/products/4549131611052_10.jpg?v=1640581210"
];
let currentPhotoIndex = 0;

// 初期表示時に最初の画像をアクティブにする
window.onload = function() {
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

reviewOpenButton.onclick = function(event){
    event.preventDefault();  // フォーム送信のデフォルト動作を防止
    event.stopPropagation();  // イベントの伝播を止める
    const name = document.getElementById('name').value;

    // フォームの内容をモーダルに表示
    document.getElementById('reviewName').innerText = `名前: ${name}`;


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
