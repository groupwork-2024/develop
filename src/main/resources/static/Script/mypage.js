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
    name:'洋服1',
    image:'../img/youfuku_test.png'
  },
  {
    name:'洋服2',
    image:'../img/youfuku_test.png'
  },
  {
    name:'洋服3',
    image:'../img/youfuku_test.png'
  },
  {
    name:'洋服4',
    image:'../img/youfuku_test.png'
  },
  {
    name:'洋服5',
    image:'../img/youfuku_test.png'
  },
  {
    name:'洋服6',
    image:'../img/youfuku_test.png'
  },
];

// 洋服一覧を表示する場所を取得
const clothesListContainer = document.getElementById('youhuku-grid');
clothesListContainer.innerHTML = ''; // 先にリストをクリア

//洋服画像を表示
clothesArray.forEach((clothes)=>{
  // <a> タグを作成
  const linkElement = document.createElement('a');
  linkElement.href = ''; // リンク先の URL を設定

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
const savedClass = localStorage.getItem('colorClass');
if (savedClass) {
  //ログ
  console.log('クラス取得できたよ', savedClass);
  //ヘッダーに適用
  const header = document.querySelector('.header');
  header.classList.add(savedClass);
  console.log('ヘッダーの色：', savedClass);
}