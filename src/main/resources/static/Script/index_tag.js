// タグを格納する配列を仮定
let tags = [
  { name: '夏', color: '#ff6347' },
  { name: '冬', color: '#00bfff' },
  { name: 'ビジネス', color: '#90ee90' },
  { name: 'カジュアル', color: '#33FF57' },
  { name: 'ジーンズ', color: '#00509E' },
  { name: '秋冬', color: '#FF4500' },
  { name: 'フォーマル', color: '#4B0082' }
];

// タグ一覧を表示する場所を取得
const tagListDisplay = document.getElementById('tagListDisplay');
tagListDisplay.innerHTML = ''; // 一度リセット

// 既存のタグを表示
tags.forEach(tag => {
  const tagElement = document.createElement('a');
  tagElement.textContent = tag.name;
  tagElement.style.backgroundColor = tag.color;
  tagElement.classList.add('tag');
  tagElement.href = "#";

  // 左向き矢印の作成
  const arrowElement = document.createElement('div');
  // 矢印専用のクラスを追加
  arrowElement.classList.add('arrow');  
  // 矢印の色をタグの色に
  arrowElement.style.borderRightColor = tag.color; 

  // 矢印をタグに追加
  tagElement.appendChild(arrowElement);  

  // タグをクリックしたときの処理
  tagElement.addEventListener('click', function(event) {
    event.preventDefault();  // ページ遷移を防止（動的遷移に変更するため）
    goToClothesPage(tag.name,tag.color);  // タグ名を渡してページ遷移
  });

  // タグを画面に追加
  tagListDisplay.appendChild(tagElement);
  
});

// タグをクリックするとページを遷移する処理
function goToClothesPage(tag,color){
  color = color.replace('#','%23');
  window.location.href = `detaile_tag.html?tag=${tag}&color=${color}`;
}