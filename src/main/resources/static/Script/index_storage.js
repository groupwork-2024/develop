const cp_sl06 = document.querySelector(".cp_sl06"); //最初のclassの取得

// 収納を格納する配列を仮定
const storageArray = [
  {
    id:'1',
    name: '寝室',
    storage_type: 'DRESSER',
    image: '../img/DRESSER1.png',
    memo: '衣類や小物を収納'
  },
  {
    id:'2',
    name: 'リビングルーム',
    storage_type: 'DRESSER',
    image: '../img/DRESSER2.png',
    memo: 'ハンカチなどの小物を収納'
  },
  {
    id:'3',
    name: '寝室',
    storage_type: 'STORAGE_BAG',
    image: '../img/storagebox.png',
    memo: '季節物の収納場所 11/20に衣替えを実施'
  },
  {
    id:'4',
    name: '寝室',
    storage_type: 'STORAGE_BAG',
    image: '../img/storagebox2.png',
    memo: '毛布の収納場所'
  },
  {
    id:'5',
    name: '子供部屋',
    storage_type: 'CLOSET',
    image: '../img/clothes.png',
    memo: 'コート類'
  },
  {
    id:'6',
    name: '夫婦部屋',
    storage_type: 'CLOSET',
    image: '../img/clothes2.png',
    memo: 'スーツ類'
  }
];

//初期値の設定
const startfilteredStorage = storageArray.filter(item => item.storage_type === 'CLOSET');
// storageListを更新する処理
updateStorageList(startfilteredStorage);


//セレクトボックスが変更されたときの処理
cp_sl06.addEventListener('change', function() {
  const selectedValue = cp_sl06.value;
  const filteredStorage = storageArray.filter(item => item.storage_type === selectedValue.toUpperCase());
  // storageListを更新する処理
  updateStorageList(filteredStorage);
});

function updateStorageList(filteredStorage){
  // 収納一覧を表示する場所を取得
  const storageListContainer = document.getElementById('storageList');
  storageListContainer.innerHTML = ''; // 先にリストをクリア

  // タンスの情報を表示
  filteredStorage.forEach((storage) => {
    const clothesContent = document.createElement('div');
    clothesContent.classList.add('storage');
  
    // 種類によってidを振り分ける
    if(storage.storage_type === 'DRESSER'){
      clothesContent.id='dresser';
    }
    else if(storage.storage_type === 'STORAGE_BAG'){
      clothesContent.id='storage_bag';
    }
    else if(storage.storage_type === 'CLOSET'){
      clothesContent.id='closet';
    }

    // figureを生成
    const clothesFigure = document.createElement('figure');
    clothesFigure.classList.add('clothes_img');
  
    // imgを生成
    const clothesImage = document.createElement('img');
    clothesImage.src=storage.image;
    clothesImage.alt=storage.name;

    clothesFigure.appendChild(clothesImage);

    const clothesDetail = document.createElement('div');
    clothesDetail.innerHTML = 
      `<a>
        <strong>名前</strong>
        ${storage.name}
      </a>
      <a>
        <strong>メモ</strong>
        ${storage.memo}
      </a>
      `;
    
      clothesDetail.classList.add('storageDetail');

    // クリックしたときの処理
    clothesContent.addEventListener('click', function(event) {
      event.preventDefault();  // ページ遷移を防止（動的遷移に変更するため）
      goToClothesPage(storage);  // ページ遷移
  });

    clothesFigure.appendChild(clothesDetail);
    clothesContent.appendChild(clothesFigure);
    storageListContainer.appendChild(clothesContent);
  });

  //収納をクリックするとページを背にする処理
  function goToClothesPage(storage){
    storage_type=storage.storage_type.toLowerCase();
    // storageオブジェクトをJSON形式でエンコード
    const storageString = encodeURIComponent(JSON.stringify(storage));
    window.location.href = `detail_${storage_type}.html?location=${storageString}`;
  } 
}


