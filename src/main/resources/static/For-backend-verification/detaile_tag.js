// 詳細の表示/非表示を切り替えるスクリプト
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.clothse_button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const detailEn = this.querySelector('.detail_en');
            if (detailEn.style.display === 'none' || detailEn.style.display === '') {
                detailEn.style.display = 'block';
            } else {
                detailEn.style.display = 'none';
            }
        });
    });

    // 初期状態を設定（すべての.detail_enを非表示にする）
    document.querySelectorAll(".detail_en").forEach(detail => {
        detail.style.display = 'none';
    });
});
