//画面の色（モード）を反映
var savedClass = localStorage.getItem('colorClass');
if (savedClass) {
    //ログ
    console.log('クラス取得できたよ', savedClass);

    //ボタンに適用
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
    button.classList.add(savedClass);
    });
}