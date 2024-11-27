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
            hanger.style.backgroundImage = "url('file.png')"; // ハンガー画像

           

            // プレビューに追加
            closetPreview.appendChild(hanger);
        }
    });

    // モーダル関連の要素を取得
    const modalOverlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("modal");
    const returnButton = document.getElementById("return-button");

    // モーダルを表示する関数
    function openModal() {
    modalOverlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    }

    // モーダルを閉じる関数
    function closeModal() {
    modalOverlay.classList.add("hidden");
    modal.classList.add("hidden");
    }

    // 「完了」ボタン押下時にモーダルを表示（例として完了ボタンに紐づけ）
    const toConfirmButton = document.querySelector(".submit-button");
    if (toConfirmButton) {
    toConfirmButton.addEventListener("click", openModal);
    } else {
    console.error("完了ボタンが見つかりません。");
    }

    // 「戻る」ボタン押下時にモーダルを閉じる
    returnButton.addEventListener("click", closeModal);

    // 背景をクリックしてもモーダルを閉じる
    modalOverlay.addEventListener("click", closeModal);

});    

