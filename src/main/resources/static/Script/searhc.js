// URLパラメータから検索キーワードを取得
const urlParams = new URLSearchParams(window.location.search);
const searchTermFromUrl = urlParams.get('query'); // 'query'パラメータを取得

// アイテムリストのデータでとりあえずくん
const closetItems = [
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

//収納系(クローゼットと収納袋)のリスト
const storageItems = [
    {
        id:'3',
        name: '寝室',
        storage_type: 'STORAGE_BAG',
        image: '../static/img/strage-bag1.png',
        memo: '季節物の収納場所'
    },
    {
        id:'4',
        name: '寝室',
        storage_type: 'STORAGE_BAG',
        image: '../static/img/strage-bag2.png',
        memo: '夏服の収納場所\n24.11に衣替えを実施'
    },
    {
        id:'5',
        name: '子供部屋',
        storage_type: 'CLOSET',
        image: '../img/clothes.png',
        memo: '上着\n長袖\n制服'
    },
    {
        id:'6',
        name: '夫婦部屋',
        storage_type: 'CLOSET',
        image: '../img/clothes2.png',
        memo: 'スーツ類'
    },
    
];

//タンスのアイテムのリスト
const dresserItems = [
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
    name: 'タンス',
    storage_type: 'DRESSER',
    image: '../img/DRESSER2.png',
    memo: '',
    number_type: 'drawers',
    shape: [
        ['0'],
        ['0','1','2']
    ]
  },
];

//タグのリスト
const tagItems = [
    { name: '夏', color: '#ff6347' },
    { name: '冬', color: '#00bfff' },
    { name: 'ビジネス', color: '#90ee90' },
    { name: 'カジュアル', color: '#33FF57' },
    { name: 'ジーンズ', color: '#00509E' },
    { name: '秋冬', color: '#FF4500' },
    { name: 'フォーマル', color: '#4B0082' },
    { name: '長袖', color: '#923940' },
    { name: 'タートルネック', color: '#2F2F82' },
];

// 該当する洋服を表示する関数
function displayClothesItems(filteredItems) {
    const itemsListContainer = document.getElementById('itemsList');
    itemsListContainer.innerHTML = ''; // 既存のリストをクリア

    const sectionName = document.createElement('h3');
    sectionName.classList.add('sectionName');
    sectionName.innerText = "服";

    itemsListContainer.appendChild(sectionName);

    filteredItems.forEach((clothes, index) => {
        const clothesItem = document.createElement('div');
        clothesItem.classList.add('clothse_button');

        const imageElement = document.createElement('img');
        imageElement.src = clothes.image;
        imageElement.alt = clothes.name;

        const usuallyDisplayed = document.createElement('figure');
        usuallyDisplayed.classList.add('clothes_img');
        usuallyDisplayed.appendChild(imageElement);

        const detailsElement = document.createElement('div');
        detailsElement.classList.add('detail');
        detailsElement.innerHTML = `
            <strong>名前 </strong> ${clothes.name} <br>
            <strong>場所 </strong> ${clothes.location} <br>
            <strong>タグ </strong> <br>
            <div class="tags" id="tags"></div>
        `;
        usuallyDisplayed.appendChild(detailsElement);

        const usuallyHidden = document.createElement('div');
        usuallyHidden.classList.add('detail_en');
        usuallyHidden.innerHTML = `
            <strong>ブランド </strong> <br> ${clothes.brand} <br>
            <strong>メモ </strong> <br> ${clothes.memo} <br>
        `;

        const tagsElement = detailsElement.querySelector('.tags');
        clothes.tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.textContent = tag.name;
            tagElement.style.backgroundColor = tag.color;
            tagElement.classList.add('tag');
    
            const arrowElement = document.createElement('div');
            arrowElement.classList.add('arrow');
            arrowElement.style.borderRightColor = tag.color;
    
            tagElement.appendChild(arrowElement);
            tagsElement.appendChild(tagElement);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete_button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.textContent = '削除';
        deleteBtn.setAttribute('data-index', index);
    
        const editBtn = document.createElement('button');
        editBtn.setAttribute('type', 'button');
        editBtn.classList.add('editBtn');
        editBtn.textContent = '編集';
        editBtn.setAttribute('data-index', index);
        console.log(editBtn);

        usuallyHidden.appendChild(deleteBtn);
        usuallyHidden.appendChild(editBtn);
    
        clothesItem.appendChild(usuallyDisplayed);
        clothesItem.appendChild(usuallyHidden);
        itemsListContainer.appendChild(clothesItem);
    });

    // 再描画後に削除ボタンのイベントを再設定
    const deleteButtons = document.querySelectorAll('.delete_button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            // 押された編集のインデックスを取得
            const index = parseInt(this.getAttribute('data-index')); 
            console.log(index);

            const deleteItemId = filteredItems[index].id;

            // 確認ダイアログを表示
            const confirmDelete = confirm('本当に削除しますか？');  // 確認ダイアログ

            if (confirmDelete) {  // OK を選んだ場合
                // 配列からアイテムを削除
                closetItems = closetItems.filter(item => item.id !== deleteItemId); 

                console.log(closetItems);

                // 画面を再描画
                filterItems();
            } else {
                console.log('削除がキャンセルされました');
            }
        });
    });

    // 再描画後にクリックで詳細表示するイベントを再設定
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

    // 編集ボタンのイベントリスナー設定（再描画後に登録）
    const editButtons = document.querySelectorAll('.editBtn');
    console.log('編集します');
    editButtons.forEach(button => {
        // ボタンをクリックしたときの処理
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault(); 

        // 押された編集のインデックスを取得
        const editindex = parseInt(this.getAttribute('data-index'));
        showEditForm(editindex);
    });
});
}

// 編集フォームの取得
const editModal = document.getElementById('editModal');
const editContent = document.getElementById('editContent');
const editNameInput = document.getElementById('name');
const editImageInput = document.getElementById('image');
const editBrandInput = document.getElementById('brand');
const editLocationInput = document.getElementById('location');
const editMemoInput = document.getElementById('memo');
const saveButton = document.getElementById('saveButton');
const editClose = document.getElementById('editClose');
let editTags = '';

//モーダルを閉じる
editClose.addEventListener('click', function(){
    editModal.style.display = 'none';
});

// 編集中のアイテムを追跡するための変数
let editingIndex = '';

// 編集フォームを表示して入力内容をセットする
function showEditForm(index) {
    const clothes = closetItems[index];
    console.log(closetItems[index]);
    editNameInput.value = clothes.name;
    editBrandInput.value = clothes.brand;
    editLocationInput.value = clothes.location;
    editMemoInput.value = clothes.memo;
    editTags = clothes.tags;
    const labelDisplay = document.getElementById('labelDisplay');
    labelDisplay.innerHTML = ''; // 一度リセット

    console.log(editTags);

    //登録されているタグを表示
    editTags.forEach((tag,index) => {
        displayLabelInMain(tag.name,tag.color,index);
    });

    // 画像のプレビューを設定
    const imagePreview = document.getElementById('imagePreview');

    //画像が無かったらデフォルトにする
    imagePreview.src = clothes.image || "../img/youfuku_test.png"; 

    // 編集中のインデックスを記録
    editingIndex = index;

    // フォームを表示
    editModal.style.display = 'flex';
}

// 編集を保存してリストを更新
saveButton.addEventListener('click', function(event) {
    event.preventDefault(); 
    event.stopPropagation();
    const clothes = closetItems[editingIndex];  // 編集中のアイテム
    // 編集内容を配列に反映
    if (editingIndex !== null) {
        clothes.name = editNameInput.value;
        clothes.brand = editBrandInput.value;
        clothes.location = editLocationInput.value;
        clothes.memo = editMemoInput.value;

        //タグの編集内容を配列に反映
        clothes.tags = editTags;
    
        // 画像の新しい選択があれば反映
        const newImage = editImageInput.files[0] ? URL.createObjectURL(editImageInput.files[0]) : clothes.image;
        clothes.image = newImage;
    
        // フォームを非表示
        editModal.style.display = 'none';
    
        // リストを再描画
        filterItems();
    }
});

 //タグ一覧関連
const taglistmodal = document.getElementById('tagListmodal');
const tagListClose = document.getElementById('TagListClose');
const addTagOpenButton = document.getElementById('addTagOpenButton');
const addButton = document.getElementById('addButton');

//＋ボタンを取得
const openModalButton = document.getElementById('tagOpenButton');

// タグ追加関連
const tagmodal = document.getElementById('tagmodal');
const closeModalButton = document.getElementById('TagCloseModalButton');
const addTagButton = document.getElementById('addTagButton');
const tagInput = document.getElementById('tagInput');
const customColorPicker = document.getElementById('customColorPicker');
const colorButtons = document.querySelectorAll('.color-btn');
const labelDisplay = document.getElementById('labelDisplay');
const colorPalette = document.getElementById('colorPalette');
const addColorBtn = document.getElementById('addColorBtn');
const colorPickerContainer = document.getElementById('colorPickerContainer');
const addSelectedColorBtn = document.getElementById('addSelectedColorBtn');
const colorDisplayArea = document.getElementById('colorDisplayArea');

// タグの選択
let selectedTag = null;
let selectedColor = null;
let ImageContent = '';

// モーダルを開く共通
function openModal(modalId, keepButton) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    //完了ボタンの動作
    saveButton.disabled = keepButton;
    saveButton.style.display = 'none';
}

// モーダルを閉じる共通
function closeModal(modalId, keepButton) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    //完了ボタンの動作
    saveButton.disabled = keepButton;
    saveButton.style.display = 'flex';
}

// タグ一覧モーダルを開く
openModalButton.addEventListener('click', function() {
  openModal('tagListmodal', false);  // 完了ボタンを無効化
  displayTagList();  // タグ一覧を表示
});

// タグ一覧モーダルを閉じる
tagListClose.addEventListener('click', function() {
  closeModal('tagListmodal');  // 完了ボタンを有効化
});

//タグ一覧を表示する
function displayTagList(){
  const tagListDisplay = document.getElementById('tagListDisplay');
  tagListDisplay.innerHTML = ''; // 一度リセット

  // 既存のタグを表示
  tagItems.forEach(tag => {
    const tagElement = document.createElement('div');
    tagElement.textContent = tag.name;
    tagElement.style.backgroundColor = tag.color;
    tagElement.classList.add('indextag');

    // クリックで選択
    tagElement.addEventListener('click', () => {
      selectTag(tagElement, tag);  // タグを選択
      console.log(tag);
    });

    tagListDisplay.appendChild(tagElement);
  });
}

// 現在選択されているタグ
function selectTag(tagElement,tag) {
  console.log('選択されたタグの要素:', tagElement);  // tagElement（選択されたdiv）を表示
  console.log('選択されたタグのデータ:', tag); 
  
  // タグ選択状態をトグル
  if (selectedTag === tagElement) {
    // もし既に選択されているタグを再クリックした場合、選択解除
    selectedTag = null;
    //選択解除時にクラスを削除
    tagElement.classList.remove('selected'); 
  } else {
    // 新しくタグが選ばれた場合、選択
    if (selectedTag !== null) {
      // 以前選ばれていたタグのクラスを削除
      selectedTag.classList.remove('selected');
    }
    selectedTag = tagElement;
    tagElement.classList.add('selected'); 
  }
}

// タグのリストを更新する関数
function updateTagList() {
  const tagListDisplay = document.getElementById('tagListDisplay');
  const tags = tagListDisplay.querySelectorAll('.tag');
  tags.forEach(tagElement => {
    // タグの背景色をリセット
    tagElement.classList.remove('selected');
    if (tagElement === selectedTag) {
      tagElement.classList.add('selected');
    }
  });
};

// タグ一覧の登録ボタンを押したときの処理
addButton.addEventListener('click', function(event) {
  event.preventDefault(); 
  event.stopPropagation();  // イベントの伝播を止める
  
  console.log('登録ボタンがクリックされました');
  console.log('選択されているタグ:', selectedTag); 

  // tagElement（選択されたタグのHTML要素）からタグ名と色を取得
  const tagName = selectedTag.textContent; // タグ名
  const tagColor = selectedTag.style.backgroundColor; // 背景色（色）

  const newTag = { name: tagName, color: tagColor };

  //配列にタグを追加
  editTags.push(newTag);
  console.log(editTags);

  if (selectedTag) {
    // メイン画面にタグを表示
    displayLabelInMain(tagName,tagColor,editTags.length-1);  
  } else {
    alert('タグを選択してください。');
  }
});

// メイン画面にタグを表示する関数
function displayLabelInMain(tagName,tagColor,tagIndex) {
  console.log('タグが選択されました:', tagName,tagColor);  // ログを追加

  // メイン画面に表示するタグを作成
  const labelElement = document.createElement('div');
  // タグの名前を設定
  labelElement.textContent = tagName;  
  // 必要に応じてクラスを追加
  labelElement.classList.add('addtag');    
  // タグの背景色を設定
  labelElement.style.backgroundColor = tagColor;

  // 左向き矢印の作成
  const arrowElement = document.createElement('div');
  // 矢印専用のクラスを追加
  arrowElement.classList.add('arrow');  
  // 矢印の色をタグの色に
  arrowElement.style.borderRightColor = tagColor;   

  // 削除ボタンを作成 
  const deleteButton = document.createElement('span');
  // Material Iconsと削除ボタンのクラスを追加
  deleteButton.classList.add('material-icons', 'delete-btn'); 
  // アイコン名を設定 
  deleteButton.textContent = 'cancel';  
  // サイズを30pxに指定
  deleteButton.style.fontSize = '20px';  

  // 削除ボタンのクリックイベント
  deleteButton.addEventListener('click', function() {
    console.log('タグが削除されました:', tagName, tagIndex);
    // 配列から削除
    editTags.splice(tagIndex,1);
    console.log(editTags);

    // タグを画面から削除
    labelElement.remove();  
  });

  // 矢印をタグに追加
  labelElement.appendChild(arrowElement);  
  // タグの削除ボタンをタグ要素に追加
  labelElement.appendChild(deleteButton);
  
  // メイン画面のタグ表示領域に追加
  labelDisplay.appendChild(labelElement);
  console.log('タグがメイン画面に追加されました');
}

//タグ追加関連
// タグ追加モーダルを開く
addTagOpenButton.addEventListener('click', function(event) {
  event.stopPropagation();  // イベントの伝播を止める
  event.preventDefault();  // デフォルトの動作を防ぐ

  closeModal('tagListmodal');
  openModal('tagmodal', false);  // 完了ボタンを無効化
});

// タグ追加モーダルを閉じる
closeModalButton.addEventListener('click', function() {
  closeModal('tagmodal');
  //タグ名とカラーのリセット
  resetTagInput();
});

// プリセットカラー選択
colorPalette.addEventListener('click', (event) => {
  if (event.target.classList.contains('color-btn')) {
      selectedColor = event.target.dataset.color; // 色を選択
      updateColorDisplay();
  }
});

// 色追加ボタンをクリックするとカラーパレットを表示
addColorBtn.addEventListener('click', () => {
  colorPickerContainer.style.display = 'flex'; // カラーパレットを表示
});

// 色を選んで「色を追加」ボタンを押すと選択した色を追加
addSelectedColorBtn.addEventListener('click', () => {
  selectedColor = customColorPicker.value; // カスタムカラーを選択
  updateColorDisplay(); // 色を表示エリアに反映
  colorPickerContainer.style.display = 'none'; // カラーパレットを非表示にする
});

// タグ登録ボタン
addTagButton.addEventListener('click', (event) => {
  event.preventDefault();  // フォーム送信のデフォルト動作を防止
  event.stopPropagation();  // イベントの伝播を止める

  console.log(`色: ${selectedColor}`);

  const tagName = tagInput.value.trim();
  const finalColor = selectedColor || ''; 

  // タグ名と色が両方とも選ばれているか確認
  if (!tagName && !finalColor) {
      alert('タグ名と色を入力してください');
      return;  
  }
  else if (!finalColor) {
      alert('色を選んでください');
      return; 
  }
  else if (!tagName){
      alert('タグ名を入力してください');
      return;  
  }

  // 両方が有効な場合
  console.log(`タグ名: ${tagName}, 色: ${selectedColor}`);

  // タグを配列に追加
  tagItems.push({ name: tagName, color: finalColor });

  // 新しいタグを画面に追加
  addTagToList(tagName, finalColor);

  // タグ入力欄と色選択をリセット
  resetTagInput();

  // モーダルを閉じる
  closeModal('tagmodal');

  // タグ一覧のモーダルを開く
  // openModal('tagListmodal', false);
});

// 色表示エリアを更新
function updateColorDisplay() {
  colorDisplayArea.innerHTML = ''; // 現在の色をリセット
  const colorBox = document.createElement('div');
  colorBox.style.backgroundColor = selectedColor;
  colorBox.classList.add('color-box');
  colorDisplayArea.appendChild(colorBox);
}

// 新しく追加されたタグを画面に表示する関数
function addTagToList(tagName, tagColor) {
  const tagListDisplay = document.getElementById('tagListDisplay');

  // 新しいタグを表示するためのdiv要素を作成
  const tagElement = document.createElement('div');
  tagElement.textContent = tagName;
  tagElement.style.backgroundColor = tagColor;
  tagElement.classList.add('tag');

  // タグがクリックされたときに選択できるようにする
  tagElement.addEventListener('click', () => {
      console.log(`選択されたタグ: ${tagName}`);
  });

  // 作成したタグをタグリストに追加
  tagListDisplay.appendChild(tagElement);
}

// タグ名入力をリセットする関数
function resetTagInput() {
  tagInput.value = '';  // 入力フィールドを空にする
  selectedColor = '';   // 選択した色をリセット
  updateColorDisplay(); // 色表示エリアをリセット
}

// 画像関連
// 画像プレビューを表示する関数
function previewImage() {
  const file = document.getElementById('image').files[0];  // 選択されたファイル
  const preview = document.getElementById('imagePreview');  // 画像プレビュー用のimgタグ
  
  if (file) {
      const reader = new FileReader();
      
      // 画像が読み込まれたときに呼ばれる
      reader.onload = function(e) {
          preview.src = e.target.result;  // 画像のsrc属性に読み込んだデータURLをセット
          preview.style.display = 'block';  // プレビューを表示
      }

      reader.readAsDataURL(file);  // 画像をDataURLとして読み込み
  } else {
      preview.src = '';  // ファイルが選択されていない場合はsrcを空に
      preview.style.display = 'none';  // プレビューを非表示
  }
}

// 「＋」ボタンをクリックしたときにファイルダイアログを開く
document.getElementById('addImageButton').addEventListener('click', function() {
  document.getElementById('image').click();  // 隠れているファイル入力要素をクリック
});

// カメラ起動用の関数
function openCamera() {
  const video = document.getElementById('video');
  const fileInput = document.getElementById('addImageButton'); // ファイル入力ボタン
  const addPhotoButton = document.getElementById('addPhoto'); // カメラ起動ボタン
  const imagePreview = document.getElementById('imagePreview'); // 画像プレビューの要素
  const stopCameraButton = document.getElementById('stopCameraButton'); // ×ボタン

  // カメラ起動
  navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
          video.srcObject = stream;
          video.style.display = 'flex'; // カメラの映像を表示
          imagePreview.style.display = 'none'; // 画像プレビューを非表示
          stopCameraButton.style.display='flex'; //×ボタンを表示
          fileInput.disabled = true; // ファイル選択ボタンを無効化
          fileInput.style.display='none'; // ファイル選択ボタンを非表示
          addPhotoButton.disabled = true; // カメラ起動ボタンを無効化（重複起動防止）
          addPhotoButton.style.display='none'; // カメラ起動ボタンを非表示
        document.getElementById('capture').style.display = 'block';  // 撮影ボタンを表示
      })
      .catch(function (error) {
          console.error('カメラの取得に失敗しました:', error);
      });
}

// 撮影処理
function captureImage() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // 撮影した画像をキャンバスに描画
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 画像プレビュー表示
  const imagePreview = document.getElementById('imagePreview');
  imagePreview.src = canvas.toDataURL('image/png');
  imagePreview.style.display = 'flex'; // 撮影した画像をプレビューとして表示
  video.style.display = 'none'; // カメラ映像を非表示

  // カメラストリームを停止
  const stream = video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());

  // カメラ停止後、ファイル選択ボタンを再度有効化
  const fileInput = document.getElementById('addImageButton');
  const addPhotoButton = document.getElementById('addPhoto');
  const stopCameraButton = document.getElementById('stopCameraButton'); // ×ボタン
  fileInput.disabled = false;
  fileInput.style.display='flex';
  addPhotoButton.disabled = false
  addPhotoButton.style.display='flex';
document.getElementById('capture').style.display = 'none';  // 撮影ボタンを非表示
  stopCameraButton.style.display='none'; //×ボタンを非表示
}

// カメラ停止用
function stopCamera() {
  const video = document.getElementById('video');
  const stopCameraButton = document.getElementById('stopCameraButton'); // ×ボタン
  const imagePreview = document.getElementById('imagePreview');
  const fileInput = document.getElementById('addImageButton');
  const addPhotoButton = document.getElementById('addPhoto');
  const capture = document.getElementById('capture');

  // カメラストリームを停止
  const stream = video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());

  // カメラ映像を非表示
  video.style.display = 'none';
  imagePreview.style.display = 'flex'; // 画像プレビューを再表示

  // ×ボタンと撮影ボタンを非表示
  stopCameraButton.style.display = 'none';
  capture.style.display='none';

  // ファイル選択ボタンとカメラ起動ボタンを再表示
  fileInput.disabled = false;
  addPhotoButton.disabled = false;
  fileInput.style.display='flex';
  addPhotoButton.style.display='flex';
}

//該当する収納(クローゼットと収納袋)を表示する
function displayStorageItems(filteredItems) {
  const itemsListContainer = document.getElementById('itemsList');

  const sectionName = document.createElement('h3');
  sectionName.classList.add('sectionName');
  sectionName.innerText = "クローゼット・収納袋";

  itemsListContainer.appendChild(sectionName);

  filteredItems.forEach((storage) => {
    const clothesContent = document.createElement('div');
    clothesContent.classList.add('storage');

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
      <a class="storageMemo">
        <strong>メモ</strong>
        <textarea placeholder="メモなし" readonly>${storage.memo}</textarea>
      </a>
    `;

    //収納詳細にクラス追加
    clothesDetail.classList.add('storageDetail');

    clothesFigure.appendChild(clothesDetail);

    clothesContent.appendChild(clothesFigure);

    itemsListContainer.appendChild(clothesContent);

    // クリックしたときの処理
    clothesContent.addEventListener('click', function(event) {
      event.preventDefault();  // ページ遷移を防止（動的遷移に変更するため）
      goToClothesPage(storage);  // ページ遷移
    });
  });

  //収納をクリックするとページを背にする処理
  function goToClothesPage(storage){
    storage_type=storage.storage_type.toLowerCase();
    // storageオブジェクトをJSON形式でエンコード
    const storageString = encodeURIComponent(JSON.stringify(storage));
    window.location.href = `detail_${storage_type}.html?location=${storageString}`;
  } 
}

//該当するタンスを表示する
function displayDresserItems(filteredItems) {
  const itemsListContainer = document.getElementById('itemsList');

  const sectionName = document.createElement('h3');
  sectionName.classList.add('sectionName');
  sectionName.innerText = "タンス";

  itemsListContainer.appendChild(sectionName);

  filteredItems.forEach((storage) => {
    const clothesContent = document.createElement('div');
    clothesContent.classList.add('storage');

    // figureを生成
    const clothesFigure = document.createElement('figure');
    clothesFigure.classList.add('clothes_img');
  
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

    const clothesDetail = document.createElement('div');
    
    // 詳細部分
    clothesDetail.innerHTML = 
      `<a>
        <strong>名前</strong>
        ${storage.name}
      </a>
      <a>
        <strong>${type}</strong>
        ${storage.shape.length}
      </a>
      <a class="dresserMemo">
        <strong>メモ</strong>
        <textarea placeholder="メモなし" readonly>${storage.memo}</textarea>
      </a>
    `;

    //収納詳細にクラス追加
    clothesDetail.classList.add('storageDetail');

    // figureのところに収納詳細を入れ込む
    clothesFigure.appendChild(clothesDetail);

    clothesContent.appendChild(clothesFigure);

    itemsListContainer.appendChild(clothesContent);

    // クリックしたときの処理
    clothesContent.addEventListener('click', function(event) {
      event.preventDefault();  // ページ遷移を防止（動的遷移に変更するため）
      goToClothesPage(storage);  // ページ遷移
    });
  });

  //収納をクリックするとページを背にする処理
  function goToClothesPage(storage){
    storage_type=storage.storage_type.toLowerCase();
    // storageオブジェクトをJSON形式でエンコード
    const storageString = encodeURIComponent(JSON.stringify(storage));
    window.location.href = `detail_${storage_type}.html?location=${storageString}`;
  } 
  console.log(itemsListContainer);
}

//該当するタグを表示する
//該当するタグを表示する
function displayTagItems(filteredItems) {
  const itemsListContainer = document.getElementById('itemsList');

  const sectionName = document.createElement('h3');
  sectionName.classList.add('sectionName');
  sectionName.innerText = "タグ";

  itemsListContainer.appendChild(sectionName);


  filteredItems.forEach((tag) => {
    const tagElement = document.createElement('a');
    tagElement.textContent = tag.name;
    tagElement.style.backgroundColor = tag.color;
    tagElement.classList.add('displayTag');
    tagElement.href = "#";

    // 左向き矢印の作成
    const arrowElement = document.createElement('div');
    // 矢印専用のクラスを追加
    arrowElement.classList.add('displayArrow');  
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
    itemsListContainer.appendChild(tagElement);
  });
  // タグをクリックするとページを遷移する処理
  function goToClothesPage(tag,color){
  color = color.replace('#','%23');
  window.location.href = `detaile_tag.html?tag=${tag}&color=${color}`;
  }
}

// 検索フィルタリング処理
function filterItems() {
    // 検索の値を変数に代入
    const searchTerm = document.getElementById('searchInput').value;

    console.log(searchTerm);
    console.log(closetItems);

    // 洋服のフィルタリング
    const clothesFilteredItems = closetItems.filter(item => {
        return item.name.includes(searchTerm) ||
                item.location.includes(searchTerm) ||
                item.tags.some(tag => tag.name.includes(searchTerm));
    });

    // クローゼットと収納袋のフィルタリング
    const storageFilteredItems = storageItems.filter(storage => {
      return storage.name.includes(searchTerm);
    });

    // タンスのフィルタリング
    const dresserFilteredItems = dresserItems.filter(dresser =>{
      return dresser.name.includes(searchTerm);
    });

    // タグのフィルタリング
    const tagFilteredItems = tagItems.filter(tag =>{
      return tag.name.includes(searchTerm);
    });

    // フィルタリングした配列に中身があるかどうか
    let listCount = clothesFilteredItems.length + storageFilteredItems.length + dresserFilteredItems.length + tagFilteredItems.length;

    console.log(clothesFilteredItems);
    console.log(storageFilteredItems);
    console.log(dresserFilteredItems);
    console.log(tagFilteredItems);

    if(listCount > 0){
        const itemsListContainer = document.getElementById('itemsList');
        itemsListContainer.innerHTML = '';

        if(clothesFilteredItems.length > 0){
          displayClothesItems(clothesFilteredItems);
        }

        if(storageFilteredItems.length > 0){
          displayStorageItems(storageFilteredItems);
        }

        if(dresserFilteredItems.length > 0){
          displayDresserItems(dresserFilteredItems);
        }

        if(tagFilteredItems.length > 0){
          displayTagItems(tagFilteredItems);
        }  
    }
    else if(searchTerm == null || listCount == 0){
        console.log('配列の要素ないよ');
        const itemsListContainer = document.getElementById('itemsList');
        itemsListContainer.innerHTML = '';

        const noItemDisplay = document.createElement('div');
        noItemDisplay.classList.add('noItemDisplay');

        const noItem = document.createElement('h4');
        noItem.textContent = '該当するアイテムがありません。';

        noItemDisplay.appendChild(noItem);
        itemsListContainer.appendChild(noItemDisplay);

        console.log(noItemDisplay);
    }
}

// 検索キーワードがURLパラメータにある場合、検索ボックスに表示
if (searchTermFromUrl) {
  document.getElementById('searchInput').value = searchTermFromUrl;
  filterItems();
} else {
  document.getElementById('searchInput').value = ' ';
  filterItems();
}

// ローカルストレージから履歴を取得、ない場合は空の配列
let searchHistoryList = JSON.parse(localStorage.getItem('searchHistory')) || [];

// 履歴クリック時にその検索語で検索画面に遷移
function handleHistoryClick(query) {
  // 検索画面に遷移 (検索語をURLパラメータとして渡す)
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
}

// 検索履歴を画面に表示する関数
function updateSearchHistory() {
    const searchHistoryElement = document.getElementById('searchHistory');
    searchHistoryElement.innerHTML = '';  // 履歴の内容をクリア

    // 履歴がある場合はリストを生成
    searchHistoryList.forEach(query => {
        const li = document.createElement('li');
        li.textContent = query;
        li.onclick = () => performSearch(query);  // 履歴をクリックしたときにその検索を実行
        searchHistoryElement.appendChild(li);
    });
}

// 検索を実行する関数
function performSearch(query) {
    if (!query) {
        query = document.getElementById('searchInput').value.trim();  // 引数がない場合は入力フィールドの内容を使用
    }

    if (query) {
        // 履歴に検索語を追加
        if (!searchHistoryList.includes(query)) {
            searchHistoryList.unshift(query);  // 新しい検索語を先頭に追加
            if (searchHistoryList.length > 5) {
                searchHistoryList.pop();  // 履歴が5件を超えたら古いものを削除
            }
            localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));  // ローカルストレージに保存
        };

        // 検索画面に遷移 (検索語をURLパラメータとして渡す)
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    } else {
        alert("検索語を入力してください");
    }
}

// ページ読み込み時に履歴を表示
updateSearchHistory();

// ドロップダウンリストの表示・非表示
const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('dropdown');
let listCount = 0;

searchInput.addEventListener('focus', function() {
    dropdown.style.display = 'block';  // 検索欄がフォーカスされたときに履歴を表示
});

searchInput.addEventListener('blur', function() {
    setTimeout(() => {
        dropdown.style.display = 'none';  // 検索欄からフォーカスが外れたときに履歴を非表示
    }, 100);  // 少し遅延させてから非表示にする
});

document.addEventListener('click', function (event) {
    const isClickInside = searchInput.contains(event.target) || dropdown.contains(event.target);
    if (!isClickInside) {
        dropdown.style.display = 'none';  // 検索欄や履歴以外がクリックされた場合、非表示にする
    }
});

// セレクトボックスの処理
const cp_sl06 = document.querySelector(".cp_sl06");

//セレクトボックスが変更されたときの処理
cp_sl06.addEventListener('change', function(event) {
  console.log('変更しました');
  const cp_sl06Value = cp_sl06.value;
  const searchTerm = document.getElementById('searchInput').value;

  // 検索の値を変数に代入
  console.log(searchTerm);
  console.log(closetItems);

  const itemsListContainer = document.getElementById('itemsList');
  itemsListContainer.innerHTML = '';

  if(cp_sl06Value == 0){
    filterItems();
  }
  else if(cp_sl06Value == 1){
    // 洋服のフィルタリング
    const clothesFilteredItems = closetItems.filter(item => {
        return item.name.includes(searchTerm) ||
                item.location.includes(searchTerm) ||
                item.tags.some(tag => tag.name.includes(searchTerm));
    });

    listCount = clothesFilteredItems.length;

    const itemsListContainer = document.getElementById('itemsList');
    itemsListContainer.innerHTML = '';

    if(listCount > 0){
      displayClothesItems(clothesFilteredItems);
    }

  }
  if(cp_sl06Value == 2){
    // クローゼットと収納袋のフィルタリング
    const storageFilteredItems = storageItems.filter(storage => {
      return storage.name.includes(searchTerm);
    });

    // タンスのフィルタリング
    const dresserFilteredItems = dresserItems.filter(dresser =>{
      return dresser.name.includes(searchTerm);
    });

    listCount = storageFilteredItems.length + dresserFilteredItems.length;

    if(listCount > 0){
      if(storageFilteredItems.length > 0){
        displayStorageItems(storageFilteredItems);
      }
      else if(dresserFilteredItems.length > 0){
        displayDresserItems(dresserFilteredItems);
      }
    }

  }
  if(cp_sl06Value == 3){
    // タグのフィルタリング
    const tagFilteredItems = tagItems.filter(tag =>{
      return tag.name.includes(searchTerm);
    });

    listCount = tagFilteredItems.length;

    if(listCount > 0){
      displayTagItems(tagFilteredItems);  
    }
  }

  if(listCount == 0){
    console.log('配列の要素ないよ');

    const noItemDisplay = document.createElement('div');
    noItemDisplay.classList.add('noItemDisplay');

    const noItem = document.createElement('h4');
    noItem.textContent = '該当するアイテムがありません。';

    noItemDisplay.appendChild(noItem);
    itemsListContainer.appendChild(noItemDisplay);

    console.log(noItemDisplay);
  }
  
});


//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
var savedClass = localStorage.getItem('colorClass');
if (savedClass) {
  //ログ
  console.log('クラス取得できたよ', savedClass);

  //検索バー
  const search = document.querySelector('.search-container');
  search.classList.add(savedClass);
  //検索欄
  const searches = document.querySelectorAll('.search-button,.search-input');
  searches.forEach(search => {
    search.classList.add(savedClass);
  });
  //表示種類
  const sectionNames = document.querySelectorAll('.sectionName');
  sectionNames.forEach( sectionName=> {
    sectionName.classList.add(savedClass);
  });
}