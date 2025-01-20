// 写真リスト
const photos = [
    "https://aws-infra-group2024.s3.ap-northeast-1.amazonaws.com/storagebag/strage-bag3.png",
    "https://aws-infra-group2024.s3.ap-northeast-1.amazonaws.com/storagebag/strage-bag2.png",
    "https://aws-infra-group2024.s3.ap-northeast-1.amazonaws.com/storagebag/strage-bag3.png"
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
registerButton.addEventListener("click", async () => {
    const reviewModal = document.getElementById('reviewModal');
    const registerModal = document.getElementById('registerModal');
    const userId = document.getElementById('userId').value;

    try {
        // データの準備
        const name = document.getElementById("name").value;
        const memo = document.getElementById("memo").value;
        const imgElement = document.querySelector("#reviewSyunouImage img");

        if (!imgElement || !imgElement.src) {
            console.error("画像が選択されていません");
            return;
        }

        const imageUrl = imgElement.src;

        // プロキシ経由で画像を取得
        const imgResponse = await fetch(`/proxy/image?imageUrl=${encodeURIComponent(imageUrl)}`);
        if (!imgResponse.ok) {
            throw new Error("画像取得に失敗しました");
        }

        const imgBlob = await imgResponse.blob(); // Blobに変換
        const fileName = imageUrl.split('/').pop().split('?')[0]; // ファイル名をURLから取得
        const file = new File([imgBlob], fileName, { type: imgBlob.type }); // BlobをFileオブジェクトに変換

        // フォームデータの作成
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", name); // 名前データ
        formData.append("memo", memo);

        // fetchでサーバーにデータを送信
        const response = await fetch(`/register/${userId}/storages/bags`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            // 成功時の処理
            reviewModal.style.display = 'none';
            registerModal.style.display = 'flex';
            console.log("データ送信成功");
        } else {
            throw new Error("サーバーでエラーが発生しました");
        }
    } catch (error) {
        console.error("エラー:", error);
    }
});




// 「登録完了」メッセージを閉じて、次の画面に移動
function closeRegisterModal() {
    const registerModal = document.getElementById('registerModal');
    registerModal.style.display = 'none';
}

// ボタンのクリックイベント: 情報ボタンをクリックしたときの動作
document.getElementById('infoButton').addEventListener('click', function() {
    alert("収納ケースに名前を付けることができます。\n例:季節物 夏服用 冬物衣類");
});

// セレクトボックスで選んだものによって遷移先を変更させる
const selectOption = document.getElementById('selectOption');

selectOption.addEventListener('change', function() {
    const selectedValue = selectOption.value;
    const userId = document.getElementById('userId').value;

    setTimeout(function() {
        if (selectedValue === '2') {
            window.location.href = `http://localhost:8080/register/${userId}/clothes`;
        }
        else if (selectedValue === '3') {
            window.location.href = `http://localhost:8080/section/${userId}/clothes`;
        }
    }, 800); // （0.8秒）後に遷移
});
