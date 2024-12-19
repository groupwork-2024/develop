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
registerButton.addEventListener("click", () => {
    const reviewModal = document.getElementById('reviewModal');
    const registerModal = document.getElementById('registerModal');
    const userId = document.getElementById('userId').value;

    // データの準備
    const name = document.getElementById("name").value;
    const imgElement = document.querySelector("#reviewSyunouImage img");
    const imageUrl = imgElement.src; // 画像のURLを取得

    fetch(`/proxy/image?imageUrl=${encodeURIComponent(imageUrl)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("画像取得に失敗しました");
            }
            return response.blob(); // Blobに変換
        })
        .then(blob => {
            const fileName = imageUrl.split('/').pop().split('?')[0]; // ファイル名をURLから取得

            // BlobをFileオブジェクトに変換
            const file = new File([blob], fileName, { type: blob.type });

            // FormDataを作成し、Fileオブジェクトとその他のデータを追加
            const formData = new FormData();
            formData.append("image", file); // ファイルデータ
            formData.append("name", name); // 名前データ

            // fetchでサーバーにデータを送信
            return fetch(`/register/${userId}/storages/bags`, {
                method: "POST",
                body: formData
            });
        })
        .then(response => {
            if (response.ok) {
                // 成功時の処理
                reviewModal.style.display = 'none';
                registerModal.style.display = 'flex';
                console.log("データ送信成功");
            } else {
                throw new Error("サーバーでエラーが発生しました");
            }
        })
        .catch(error => {
            console.error("エラー:", error);
        });
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
