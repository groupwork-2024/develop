const cp_sl06 = document.querySelector(".cp_sl06"); //最初のclassの取得

// 収納を格納する配列を仮定
const storageArray = [
  {
    id:'1',
    name: '寝室',
    storage_type: 'DRESSER',
    image: '../img/DRESSER1.png',
    memo: '衣類や小物を収納',
    number_type: 'levels',
    shape: [
      ['0','1'],
      ['0','1','2']
    ]
  },
  {
    id:'2',
    name: 'リビングルーム',
    storage_type: 'DRESSER',
    image: '../img/DRESSER2.png',
    memo: 'ハンカチなどの小物を収納',
    number_type: 'levels',
    shape: [
      ['0'],
      ['0','1'],
      ['0','1']
    ]
  },
  {
    id:'3',
    name: '寝室',
    storage_type: 'STORAGE_BAG',
    image: '../img/storagebox.png',
    memo: '季節物の収納場所'
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
    hangcount: '5',
    memo: 'コート類'
  },
  {
    id:'6',
    name: '夫婦部屋',
    storage_type: 'CLOSET',
    image: '../img/clothes2.png',
    hangcount: '10',
    memo: 'スーツ類'
  },
  {
    id:'7',
    name: 'タンス',
    storage_type: 'DRESSER',
    image: '../img/DRESSER2.png',
    memo: '',
    number_type: 'drawers',
    shape: [
      ['0'],
      ['0','1','2']
    ]
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

    // figureを生成
    const clothesFigure = document.createElement('figure');
    clothesFigure.classList.add('clothes_img');
  
    // imgを生成
    const clothesImage = document.createElement('img');
    clothesImage.src=storage.image;
    clothesImage.alt=storage.name;
  
    // 種類によってidを振り分ける
    //タンスの処理
    if(storage.storage_type === 'DRESSER'){
      clothesContent.id='dresser';

      //配列で作成してるからタンスだけ別
      //形の表示エリアを作成
      const dresserShapeErea = document.createElement('div');
      dresserShapeErea.classList.add('dresserShapeErea');

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

      //段数か列数かの判定用
      let type = '';

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

      clothesFigure.appendChild(dresserShapeErea);
      
      //収納の詳細内容 個々で違うから注意
      const clothesDetail = document.createElement('div');
    
      clothesDetail.innerHTML = 
        `<a>
          <strong>名前</strong>
          ${storage.name}
        </a>
        <a>
          <strong>${type}</strong>
          ${storage.shape.length}
        </a>
        <a>
          <strong>メモ</strong>
          ${storage.memo}
        </a>
      `;

      //収納詳細にクラス追加
      clothesDetail.classList.add('storageDetail');

      // figureのところに収納詳細を入れ込む
      clothesFigure.appendChild(clothesDetail);

    }
    //収納袋の処理
    else if(storage.storage_type === 'STORAGE_BAG'){
      clothesContent.id='storage_bag';

      //写真管理だからfigureに写真を追加しとく
      clothesFigure.appendChild(clothesImage);

      //収納の詳細内容 個々で違うから注意
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

      //収納詳細にクラス追加
      clothesDetail.classList.add('storageDetail');

      // figureのところに収納詳細を入れ込む
      clothesFigure.appendChild(clothesDetail);
    }
    //クローゼットの処理
    else if(storage.storage_type === 'CLOSET'){
      clothesContent.id='closet';

      //写真管理だからfigureに写真を追加しとく
      clothesFigure.appendChild(clothesImage);

      //収納の詳細内容 個々で違うから注意
      const clothesDetail = document.createElement('div');
    
      clothesDetail.innerHTML = 
        `<a>
          <strong>名前</strong>
          ${storage.name}
        </a>
        <a>
          <strong>ハンガーの個数</strong>
          ${storage.hangcount}
        </a>
        <a>
          <strong>メモ</strong>
          ${storage.memo}
        </a>
      `;

      // 収納詳細にクラス追加
      clothesDetail.classList.add('storageDetail');

      // figureのところに収納詳細を入れ込む
      clothesFigure.appendChild(clothesDetail);

    }

    // クリックしたときの処理
    clothesContent.addEventListener('click', function(event) {
      event.preventDefault();  // ページ遷移を防止（動的遷移に変更するため）
      goToClothesPage(storage);  // ページ遷移
  });

    
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


