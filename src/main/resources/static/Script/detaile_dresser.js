// 洋服を格納する配列を仮定
const clothesArray = [
  {
    name: '襟付きシャツ',
    image: '../img/youfuku1.png',
    brand: 'CHIP CLIP',
    location_id:'7',
    memo: '薄手の襟付きシャツ',
    tags: [
      { name: 'カジュアル', color: '#33FF57' },
      { name: '長袖', color: '#923940' }
    ]
  },
  {
    name: 'ジーンズ',
    image: '../img/youfuku_test.png',
    brand: 'Levi\'s',
    location_id:'1',
    memo: '定番のジーンズ',
    tags: [
      { name: 'ジーンズ', color: '#00509E' }, 
      { name: 'カジュアル', color: '#33FF57' }
    ]
  },
  {
    name: 'ジャケット',
    image: '../img/youfuku_test.png',
    brand: 'ZARA',
    location_id:'2',
    memo: '秋冬用ジャケット',
    tags: [
      { name: '秋冬', color: '#FF4500' },
      { name: 'フォーマル', color: '#4B0082' }
    ]
  },
  {
    name: '裾ボタン付きタートルネック',
    image: '../img/youfuku2.png',
    brand: 'Java',
    location_id:'7',
    memo: 'ちょっと生地薄め',
    tags: [
      { name: '長袖', color: '#923940' },
      { name: 'タートルネック', color: '#2F2F82' },
    ]
  },
  {
    name: 'ニット',
    image: '../img/youfuku3.png',
    brand: 'Java',
    location_id:'7',
    memo: '',
    tags: [
      { name: '長袖', color: '#923940' },
      { name: 'タートルネック', color: '#2F2F82' }
    ]
  }
];

// クエリパラメータからlocationを取得し、デコードしてJSONにパース
const urlParams = new URLSearchParams(window.location.search);
const storageString = urlParams.get('location');
const storage = JSON.parse(decodeURIComponent(storageString));

// 中身の確認
console.log(storage); 

// クローゼットの名前追加
const storageName = document.getElementById('heder_name');
const dresserShapeErea = document.getElementById('dresserShapeErea');
const storageContent = document.getElementById('container');
const storageMemo = document.getElementById('heder_memo');
const storageLevel = document.getElementById('heder_level');
let type = '';

//形を作る場所
const dresserShape = document.createElement('div');
dresserShape.classList.add('dresserShape');

//各段を形成するところのスタイル変更
if(storage.number_type === 'levels'){
  dresserShape.style.flexDirection = 'column';
}
else{
  dresserShape.style.flexDirection = 'row';
}

//各段生成していく
storage.shape.forEach(shape => {
  console.log(shape);

  //各段
  const dresserPart = document.createElement('div');
  dresserPart.classList.add('dresserPart');

  if(storage.number_type === 'levels'){
    console.log("段数です");
    dresserPart.style.flexDirection = 'row';
    dresserPart.style.width = '100%';
    type = '段数';
  }
  else{
    console.log("列数です");
    dresserPart.style.flexDirection = 'column';
    type = '列数';
  }

  for(let i = 0; i<shape.length; i++){
    //引き出しの素材を追加
    const square = document.createElement('div');
    square.id='square';

    square.classList.add('square-'+i);
    square.innerHTML = `　　`;
    console.log(square);
    dresserPart.appendChild(square);
  };

  dresserShape.appendChild(dresserPart);
});

dresserShapeErea.appendChild(dresserShape);

const storageIcons = document.getElementById('icons');

storageName.innerHTML = `<strong style="font-size:20px;">名前</strong>　${storage.name}`;
storageLevel.innerHTML = `<strong style="font-size:20px;">${type}</strong>　${storage.shape.length}`;
storageMemo.innerHTML = `<strong style="font-size:20px;">メモ</strong>　${storage.memo}`;

// 洋服一覧を表示する場所を取得
const clothesListContainer = document.getElementById('clothseListDisplay');
clothesListContainer.innerHTML = ''; // 先にリストをクリア

// 収納Idがあっているものをフィルタリング
const filteredClothes = clothesArray.filter(item =>
  item.location_id === storage.id
);

console.log(filteredClothes);

// 該当するものがなかったら
if(filteredClothes.length === 0){
  clothesListContainer.innerHTML='該当するものはありません'
}

// 洋服の情報をリストとして表示
filteredClothes.forEach((clothes) => {
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