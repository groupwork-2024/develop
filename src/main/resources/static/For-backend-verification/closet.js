document.addEventListener("DOMContentLoaded", () => {
    // 「？」ボタンのクリックで説明を表示
    const infoButtons = document.querySelectorAll(".info-button");
    infoButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            let message = index === 0
                ? "名前を入力してください。"
                : "ハンガーの個数を入力してください。";
            alert(message);
        });
    });

    const hangerInput = document.getElementById("hanger-count");
    const closetPreview = document.querySelector(".closet-preview");

    hangerInput.addEventListener("input", () => {
        const hangerCount = parseInt(hangerInput.value) || 0;

        // プレビューをリセット
        closetPreview.innerHTML = "";

        for (let i = 0; i < hangerCount; i++) {
            // ハンガー画像を作成
            const hanger = document.createElement("div");
            hanger.className = "hanger";
            hanger.style.top = `${i * 40}px`;  // ハンガーの縦位置
            hanger.style.left = `${i * 20}px`; // ハンガーの横位置
            hanger.style.backgroundImage = "url('../img/file.png')"; // ハンガー画像

            // プレビューに追加
            closetPreview.appendChild(hanger);
        }
    });

});    

// 完了ボタンが押された時にモーダルを表示し、フォームデータを表示する
window.openReviewModal = function () {
    // フォームのデータを取得
    console.log("確認モーダルを開きました");
    const name = document.getElementById('name').value;
    const hangerCount = document.getElementById('hanger-count').value;
    const selectedCloset = document.querySelectorAll('.closet-slide')[currentSlideIndex];
    const closetImage = selectedCloset.querySelector('img').src;
    
    // モーダルの中にデータを埋め込む
    document.getElementById('reviewName').innerText = `名前: ${name}`;
    document.getElementById('reviewHangerCount').innerText = `ハンガーの個数:${hangerCount}`;
    document.getElementById('reviewLayout').innerHTML = `<p>クローゼット:</p><br><img src="${closetImage}" alt="選ばれたクローゼット">`;

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

//完了確認メッセージ関連
// 登録データを登録後に完了メッセージを表示
function registerData() {
    const reviewModal = document.getElementById('reviewModal');
    const registerModal = document.getElementById('registerModal');


    const userId = document.getElementById('userId').value;  
  
    //送信データをオブジェクト化  
    const addStorage = {  
        name:document.getElementById('name').value,  
        hanger_count:document.getElementById('hanger-count').value,  
        imageData:"C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/clothes.png", 
    };
//サーバーに送信  
fetch(`/register/${userId}/storages/closet`, {  
         method: 'POST',  
         headers: { 'Content-Type': 'application/json' },  
         body: JSON.stringify(addStorage),  
    })  
     .then(response => {  
            if (response.ok) {  
                // 確認画面を非表示にする  
                reviewModal.style.display = 'none';  
  
                // 登録完了メッセージを表示  
                registerModal.style.display = 'flex';  
                console.log('登録が完了しました');  
            } else {  
                console.log('エラーが発生しました');  
            }  
        })  
        .catch(error => console.error('Error:', error));
}
// 「登録完了」メッセージを閉じて、次の画面に移動
function closeRegisterModal() {
    const registerModal = document.getElementById('registerModal');
    registerModal.style.display = 'none';
}

let currentSlideIndex = 0;

// 右左ボタンがクリックされたときにスライドを動かす処理
function moveSlide(step, event) {
    event.preventDefault();  // ボタンのクリックによるフォーム送信を防ぐ

    const slides = document.querySelectorAll('.closet-slide');
    const totalSlides = slides.length;

    // スライドのインデックスを更新
    currentSlideIndex += step;

    // インデックスが範囲外にならないように調整
    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    } else if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }

    // スライドを動かす
    const carousel = document.querySelector('.closet-carousel');
    carousel.style.transform = `translateX(${-currentSlideIndex * 100}%)`;
}

// 「次へ」「前へ」ボタンのクリックイベントに渡す
document.querySelector('.prev').addEventListener('click', (event) => moveSlide(-1, event));
document.querySelector('.next').addEventListener('click', (event) => moveSlide(1, event));

// 初期設定で最初のスライドを表示
document.addEventListener("DOMContentLoaded", () => {
    moveSlide(0); // 最初のスライドを表示
});
