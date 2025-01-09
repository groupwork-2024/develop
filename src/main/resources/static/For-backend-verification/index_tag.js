// タグをクリックするとページを遷移する処理
function goToClothesPage(tag,color){
  color = color.replace('#','%23');
  window.location.href = `detaile_tag.html?tag=${tag}&color=${color}`;
}
