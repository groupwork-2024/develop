// すべての.clothse_button要素を取得
const buttons = document.querySelectorAll('.clothse_button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const hyouji = this.querySelector(".detail_en"); // このボタンに対応する.detail_enを取得
        
        // 現在の表示状態を取得
        if (hyouji.style.display === 'none' || hyouji.style.display === '') {
            hyouji.style.display = 'block'; // 表示
        } else {
            hyouji.style.display = 'none'; // 非表示
        }
    });
});

// 初期状態を設定（すべての.detail_enを非表示にする）
document.querySelectorAll(".detail_en").forEach(detail => {
    detail.style.display = 'none';
});
