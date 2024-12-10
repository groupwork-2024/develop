// タグを格納する配列を仮定
let tags = [
  { name: '夏', color: '#ff6347' },
  { name: '冬', color: '#00bfff' },
  { name: 'ビジネス', color: '#90ee90' }
];

// タグ一覧を表示する場所を取得
const tagListDisplay = document.getElementById('tagListDisplay');
tagListDisplay.innerHTML = ''; // 一度リセット

// 既存のタグを表示
tags.forEach(tag => {
  const tagElement = document.createElement('a');
  tagElement.textContent = tag.name;
  tagElement.style.backgroundColor = tag.color;
  tagElement.href=".html";
  tagElement.classList.add('tag');

  // 左向き矢印の作成
  const arrowElement = document.createElement('div');
  // 矢印専用のクラスを追加
  arrowElement.classList.add('arrow');  
  // 矢印の色をタグの色に
  arrowElement.style.borderRightColor = tag.color; 

  // 矢印をタグに追加
  tagElement.appendChild(arrowElement);  
  tagListDisplay.appendChild(tagElement);
});
