// タグをクリックするとページを遷移する処理
function goToClothesPage(tag,color){
  color = color.replace('#','%23');
  window.location.href = `detaile_tag.html?tag=${tag}&color=${color}`;
}


//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
var savedClass = localStorage.getItem('colorClass');
if (savedClass) {
  //ログ
  console.log('クラス取得できたよ', savedClass);

  //ラベルに適用
  const name = document.querySelector('.list_name');
  name.classList.add(savedClass);
}