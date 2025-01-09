// 写真リスト
const photos = [
    "https://thumb.ac-illust.com/bb/bb155844e2d3b16f4342bad7a96e8847_w.jpeg",
    "photo2.jpg", 
    "photo3.jpg"
];
let currentPhotoIndex = 0;

// 写真を切り替える関数
function showPhoto(index) {
    const sliderPhoto = document.getElementById("slider-photo");
    sliderPhoto.src = photos[index];
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
// モーダル内に画像を表示
function openReviewModal() {
    const name = document.getElementById('name').value;

    // フォームの内容をモーダルに表示
    document.getElementById('reviewName').innerText = `名前: ${name}`;

    // モーダルを表示
    document.getElementById('reviewModal').style.display = 'flex';
}

// モーダルを取得
var reviewModal = document.getElementById("reviewModal");
// モーダルを閉じるアイコンを取得
var closeBtn = document.getElementById("reviwCloseBtn");

// ×を押したとき、閉じる
closeBtn.onclick = closeReviewModal;

// モーダルの範囲外が押された場合も閉じる
window.onclick = function(event) {
    if (event.target == reviewModal) {
        closeReviewModal();
    }
}

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
