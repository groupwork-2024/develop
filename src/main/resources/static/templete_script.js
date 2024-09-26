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

function notice_transition(){
  window.location.href="notice.html"
}