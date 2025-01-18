//アイコンに画像を設定
function iconImage(event) {
  const file = event.target.files[0]; // 選択されたファイル
  if (file) {
    const reader = new FileReader(); // ファイルを読み込むオブジェクト
    reader.onload = function (e) {
      const profileImage = document.getElementById('profile-image');
      profileImage.src = e.target.result; // 読み込んだ画像のURLを設定
      profileImage.style.display = 'block'; // 画像を表示
    };
    reader.readAsDataURL(file); // ファイルをデータURLとして読み込む
  }
}  


// カラーボタンがクリックされたときのイベント
// クラス名をlocalStorageに保存
function saveClassToLocalStorage(event) {
  // クリックされたボタン要素を取得
  const target = event.target;
  // data-color属性の値を取得
  const selectedColor = target.getAttribute('data-color');
  // 値を確認 (デバッグ用)
  console.log('選択されたモード：', selectedColor);
  
  //追加したいクラス名を入れるclassName
  let className='';

  switch(selectedColor){
    case 'white':
      className = 'white'; // 追加したいクラス名
      break;
    case 'black':
      className = 'black'; // 追加したいクラス名
      break;
    case 'natural':
      className = 'natural'; // 追加したいクラス名
      break;  
    }

  // クラス名をlocalStorageに保存
  localStorage.setItem('colorClass', className);
  
  // ページをリロードして、すぐに反映させる
  location.reload();  // ページをリロード
}


// 一覧初期状態の設定
window.addEventListener('DOMContentLoaded', () => {
    //すべての一覧を非表示にする
    document.querySelectorAll('.item-grid').forEach(section => section.style.display = 'none');
    //洋服一覧のみを表示する
    document.getElementById('youhuku-grid').style.display = 'grid';
  });

// タブ切り替え（クリックイベント）
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      //すべての一覧のアクティブ状態を解除
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      //クリックされた一覧をアクティブにする
      tab.classList.add('active');
  
      //すべての一覧を非表示にする
      document.querySelectorAll('.item-grid').forEach(section => section.style.display = 'none');
  
      //クリックされたタブに対応する一覧を表示
      if (tab.classList.contains('youhuku')) {
        document.getElementById('youhuku-grid').style.display = 'grid';
      } 
      else {
        if (tab.classList.contains('closet')) {
        document.getElementById('closet-grid').style.display = 'grid';
        }
        else{
            if (tab.classList.contains('tag')) {
                document.getElementById('tag-grid').style.display = 'block';
              }
        }
      } 
    });
});


//洋服写真を格納する配列（洋服一覧）
const clothesArray=[
  {
    id: '1',
    name: '襟付きシャツ',
    image: '../img/youfuku1.png',
    brand: 'CHIP CLIP',
    location: 'タンス',
    memo: '薄手の襟付きシャツ',
    tags: [
      { name: 'カジュアル', color: '#33FF57' },
      { name: '長袖', color: '#923940' }
    ]
  },
  {
    id: '2',
    name: 'ジーンズ',
    image: '../img/clothesTest.jpg',
    brand: 'Levi\'s',
    location: 'クローゼット2段目',
    memo: '定番のジーンズ',
    tags: [
      { name: 'ジーンズ', color: '#00509E' },
      { name: 'カジュアル', color: '#33FF57' }
    ]
  },
  {
    id: '3',
    name: '裾ボタン付きタートルネック',
    image: '../img/youfuku2.png',
    brand: 'Java',
    location: 'タンス',
    memo: 'ちょっと生地薄め',
    tags: [
      { name: '長袖', color: '#923940' },
      { name: 'タートルネック', color: '#2F2F82' },
    ]
  },
  {
    id : '4',
    name: 'ニット',
    image: '../img/youfuku3.png',
    brand: 'Java',
    location: 'クローゼット',
    memo: '',
    tags: [
      { name: '長袖', color: '#923940' },
      { name: 'タートルネック', color: '#2F2F82' }
    ]
  }
];

// 洋服一覧を表示する場所を取得
const clothesListContainer = document.getElementById('youhuku-grid');
clothesListContainer.innerHTML = ''; // 先にリストをクリア

//洋服画像を表示
clothesArray.forEach((clothes)=>{
  // <a> タグを作成
  const linkElement = document.createElement('a');
  linkElement.href = '#'; // リンク先の URL を設定

  // 洋服詳細、個々の表示域
  const clothesItem = document.createElement('div');
  clothesItem.classList.add('youhuku-item'); 

  // 画像表示
  const imageElement = document.createElement('img');
  imageElement.src = clothes.image;
  imageElement.alt = clothes.name;

  clothesItem.appendChild(imageElement);
  clothesListContainer.appendChild(clothesItem);

  // <a> タグに clothesItem を追加
  linkElement.appendChild(clothesItem);

  // クリックされたときの処理
  linkElement.addEventListener('click',function(event){
    event.preventDefault();  // ページ遷移を防止（動的遷移に変更するため）
    goTodetaileClothes(clothes);
  });

  // 最後にclothesListContainerにlinkElement を追加
  clothesListContainer.appendChild(linkElement);

});

//収納写真を格納する配列（収納一覧）
const strageArray=[
  {
    name:'収納1',
    image:'../img/clothes.png'
  },
  {
    name:'収納2',
    image:'../img/clothes.png'
  },
  {
    name:'収納3',
    image:'../img/clothes.png'
  },
  {
    name:'収納4',
    image:'../img/clothes.png'
  },
  {
    name:'収納5',
    image:'../img/clothes.png'
  },
  {
    name:'収納6',
    image:'../img/clothes.png'
  },
];

// 収納一覧を表示する場所を取得
const stragesListContainer = document.getElementById('closet-grid');
stragesListContainer.innerHTML = ''; // 先にリストをクリア

//収納画像を表示
strageArray.forEach((strage)=>{
  // <a> タグを作成
  const linkElement = document.createElement('a');
  linkElement.href = ''; // リンク先の URL を設定

  // 収納詳細、個々の表示域
  const strageItem = document.createElement('div');
  strageItem.classList.add('closet-item'); 

  // 画像表示
  const imageElement = document.createElement('img');
  imageElement.src = strage.image;
  imageElement.alt = strage.name;

  strageItem.appendChild(imageElement);
  stragesListContainer.appendChild(strageItem);

  // <a> タグに strageItem を追加
  linkElement.appendChild(strageItem);
  // 最後にstragesListContainerにlinkElement を追加
  stragesListContainer.appendChild(linkElement);
});


//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
var savedClass = localStorage.getItem('colorClass');
if (savedClass) {
  //ログ
  console.log('クラス取得できたよ', savedClass);

  //一覧背景色
  const grids = document.querySelectorAll('#closet-grid,#youhuku-grid');
  grids.forEach(grid => {
  grid.classList.add(savedClass);
  //ユーザーアイコン
  const circle=document.querySelector('.profile-circle');
  circle.classList.add(savedClass);
  });
  //＋ボタン
  const plus=document.querySelector('.plus-buttom');
  plus.classList.add(savedClass);
  //タブのアイコン
  const icons= document.querySelectorAll('#icon');
  icons.forEach(icon=>{
    icon.classList.add(savedClass);
  })
  //タブの背景
  const tab=document.querySelector('.tab-list');
  tab.classList.add(savedClass);
}

// 洋服の遷移先
function goTodetaileClothes(clothes){
  const clothesString = encodeURIComponent(JSON.stringify(clothes));
  window.location.href = `detail_clothes.html?location=${clothesString}`;
}