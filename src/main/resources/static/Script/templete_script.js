function toggleSidebar() { //サイドバーの表示に関係する関数
  //document.getElementById:HTML内の特定の要素を取得するためのメソッド
  //const:再代入できない変数を宣言するためのもの
  const sidebar = document.getElementById('sidebar'); 

  //サイドバーを閉じる作業
  if (sidebar.style.width === '250px') {
      sidebar.style.width = '0';

      // document.querySelectorAll：すべての <li> 要素を取得
      const listItems = document.querySelectorAll('li');
      // 各 <li> 要素に対して display: none を設定(表示を消す作業)
      listItems.forEach(item => {
          item.style.display = 'none';
      });
  } 
  //サイドバーを開く作業
  else {
      sidebar.style.width = '250px';

      // すべての <li> 要素を取得
      const listItems = document.querySelectorAll('li');
      //各 <li> 要素に対して display: block を設定(表示を元に戻す作業)
      listItems.forEach(item => {
          item.style.display = 'block';
      });
  }
}

function notice_transition(){ //ベルを押したときの処理でお知らせに飛ぶようにする
  window.location.href="notice.html"
}

function back(){
  window.location.href="mypage.html"
}


//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
var savedClass = localStorage.getItem('colorClass');
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