//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
const savedClass = localStorage.getItem('colorClass');
if (savedClass) {
    //ログ
    console.log('クラス取得できたよ', savedClass);

    //ヘッダーに適用
    const header = document.querySelector('.header');
    header.classList.add(savedClass);
    //ヘッダーに文字適用
    const headerbtns = document.querySelectorAll('.title-button,.left-button,.right-button');
    headerbtns.forEach(button => {
        button.classList.add(savedClass);  // 各ボタンにクラスを追加
    });
    //背景の色変更
    const body = document.querySelector('body');
    body.classList.add(savedClass);

}