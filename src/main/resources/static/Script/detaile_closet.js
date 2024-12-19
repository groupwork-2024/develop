// 洋服を格納する配列を仮定
const clothesArray = [
  {
    name: 'Tシャツ',
    image: '../img/youfuku_test.png',
    brand: 'ユニクロ',
    location: 'クローゼット1段目',
    memo: '夏に最適なTシャツ',
    tags: [
      { name: '夏', color: '#FF6347' },  // 色を追加
      { name: 'カジュアル', color: '#33FF57' }
    ]
  },
  {
    name: 'ジーンズ',
    image: '../img/youfuku_test.png',
    brand: 'Levi\'s',
    location: 'クローゼット2段目',
    memo: '定番のジーンズ',
    tags: [
      { name: 'ジーンズ', color: '#00509E' },  // 色を追加
      { name: 'カジュアル', color: '#33FF57' }
    ]
  },
  {
    name: 'ジャケット',
    image: '../img/youfuku_test.png',
    brand: 'ZARA',
    location: 'クローゼット3段目',
    memo: '秋冬用ジャケット',
    tags: [
      { name: '秋冬', color: '#FF4500' },  // 色を追加
      { name: 'フォーマル', color: '#4B0082' }
    ]
  }
];

// 洋服一覧を表示する場所を取得
const clothesListContainer = document.getElementById('clothseListDisplay');
clothesListContainer.innerHTML = ''; // 先にリストをクリア

// 洋服の情報をリストとして表示
clothesArray.forEach((clothes) => {
  // 洋服詳細、個々の表示域
  const clothesItem = document.createElement('div');
  clothesItem.classList.add('clothse_button');

  // 画像表示
  const imageElement = document.createElement('img');
  imageElement.src = clothes.image;
  imageElement.alt = clothes.name;

  // 画像を追加
  const usuallyDisplayed = document.createElement('figure');
  usuallyDisplayed.classList.add('clothes_img');
  usuallyDisplayed.appendChild(imageElement);

  // 詳細情報表示
  const detailsElement = document.createElement('div');
  detailsElement.classList.add('detail');
  detailsElement.innerHTML = `
    <strong>名前 </strong> ${clothes.name} <br>
    <strong>場所 </strong> ${clothes.location} <br>
    <strong>タグ </strong> <br>
    <div class="tags"></div>
  `;

  // 詳細情報を追加
  usuallyDisplayed.appendChild(detailsElement);

  // 追加の詳細情報
  const usuallyHidden = document.createElement('div');
  usuallyHidden.classList.add('detail_en');
  usuallyHidden.innerHTML = `
    <strong>ブランド </strong> <br> ${clothes.brand} <br>
    <strong>メモ </strong> <br> ${clothes.memo} <br>
  `;

  // タグ表示
  const tagsElement = detailsElement.querySelector('.tags');
  clothes.tags.forEach(tag => {
    const tagElement = document.createElement('div');
    tagElement.textContent = tag.name;
    tagElement.style.backgroundColor = tag.color;  // タグの色を設定
    tagElement.classList.add('tag');

    // 左向き矢印の作成
    const arrowElement = document.createElement('div');
    arrowElement.classList.add('arrow');  // 矢印専用のクラスを追加
    arrowElement.style.borderRightColor = tag.color;  // 矢印の色をタグの色に

    // 矢印をタグに追加
    tagElement.appendChild(arrowElement);
    //表示エリアに追加  
    tagsElement.appendChild(tagElement);  
  });

  // 削除と編集ボタンを追加
  const  deliteBtn = document.createElement('button');
  deliteBtn.classList.add('delete_button');
  // type 属性を 'button' に設定
  deliteBtn.setAttribute('type', 'button');
  deliteBtn.textContent = '削除';

  const editBtn = document.createElement('a');
  editBtn.href = '.html';
  editBtn.textContent = '編集';

  usuallyHidden.appendChild(deliteBtn);
  usuallyHidden.appendChild(editBtn);

  // 各要素を組み合わせてリストに追加
  clothesItem.appendChild(usuallyDisplayed);
  clothesItem.appendChild(usuallyHidden);
  clothesListContainer.appendChild(clothesItem);
});

// すべての.clothse_button要素を取得
const buttons = document.querySelectorAll('.clothse_button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const display = this.querySelector(".detail_en"); // このボタンに対応する.detail_enを取得
        
        // 現在の表示状態を取得
        if (display.style.display === 'none' || display.style.display === '') {
          display.style.display = 'block'; // 表示
        } else {
          display.style.display = 'none'; // 非表示
        }
    });
});

// 初期状態を設定（すべての.detail_enを非表示にする）
document.querySelectorAll(".detail_en").forEach(detail => {
    detail.style.display = 'none';
});

