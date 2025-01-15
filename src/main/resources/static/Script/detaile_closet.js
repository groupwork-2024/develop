// 洋服を格納する配列を仮定
const clothesArray = [
  {
    name: 'Tシャツ',
    image: '../img/youfuku_test.png',
    brand: 'ユニクロ',
    location_id:'5',
    memo: '夏に最適なTシャツ',
    tags: [
      { name: '夏', color: '#FF6347' },
      { name: 'カジュアル', color: '#33FF57' }
    ]
  },
  {
    name: 'ジーンズ',
    image: '../img/youfuku_test.png',
    brand: 'Levi\'s',
    location_id:'6',
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
    location_id:'6',
    memo: '秋冬用ジャケット',
    tags: [
      { name: '秋冬', color: '#FF4500' },
      { name: 'フォーマル', color: '#4B0082' }
    ]
  },
  {
    name: '半袖シャツ',
    image: '../img/youfuku_test.png',
    brand: 'GU',
    location_id:'5',
    memo: '秋冬用ジャケット',
    tags: [
      { name: '夏', color: '#FF6347' },  // 色を追加
    ]
  }
];

// クエリパラメータからlocationを取得し、デコードしてJSONにパース
const urlParams = new URLSearchParams(window.location.search);
const storageString = urlParams.get('location');
const storage = JSON.parse(decodeURIComponent(storageString));

// 中身の確認
console.log(storage); 

// クローゼットの写真追加
const storageDetaile = document.getElementById('list_heder');
const storageFigure = document.getElementById('clothes_img');
const storageImg = document.createElement('img');
storageImg.src = storage.image;
storageImg.alt = storage.name;
storageFigure.appendChild(storageImg);

// クローゼットの名前追加
const storageName = document.getElementById('heder_name');
const storageContent = document.getElementById('container');
const storageMemo = document.getElementById('heder_memo');
const storageIcons = document.getElementById('icons');
storageName.innerHTML = `<strong style="font-size:20px;">名前</strong>　${storage.name}`;
storageMemo.innerHTML = `<strong style="font-size:20px;">メモ</strong>　
<textarea placeholder="メモなし" readonly>${storage.memo}</textarea>`;

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
// 洋服を再描画する関数
function renderClothes() {
  clothesListContainer.innerHTML = '';  // 先にリストをクリア

  filteredClothes.forEach((clothes, index) => {
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
    clothesListContainer.appendChild(clothesItem);
  });

  // 再描画後に削除ボタンのイベントを再設定
  const deleteButtons = document.querySelectorAll('.delete_button');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      // 押された編集のインデックスを取得
      const index = parseInt(this.getAttribute('data-index')); 

      // 確認ダイアログを表示
      const confirmDelete = confirm('本当に削除しますか？');  // 確認ダイアログ

      if (confirmDelete) {  // OK を選んだ場合
        // 配列からアイテムを削除
        filteredClothes.splice(index, 1);

        // 画面を再描画
        renderClothes(); // 再描画関数を呼び出す
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
  const clothes = clothesArray[index];
  console.log(clothesArray[index]);
  editNameInput.value = clothes.name;
  editBrandInput.value = clothes.brand;
  editLocationInput.value = storageName.textContent.substring(3);
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
  const clothes = clothesArray[editingIndex];  // 編集中のアイテム
  // 編集内容を配列に反映
  if (editingIndex !== null) {
    clothes.name = editNameInput.value;
    clothes.brand = editBrandInput.value;
    clothes.memo = editMemoInput.value;

    //タグの編集内容を配列に反映
    clothes.tags = editTags;
    
    // 画像の新しい選択があれば反映
    const newImage = editImageInput.files[0] ? URL.createObjectURL(editImageInput.files[0]) : clothes.image;
    clothes.image = newImage;
    
    // フォームを非表示
    editModal.style.display = 'none';
    
    // リストを再描画
    renderClothes();
  }
});

// 初回描画
renderClothes();

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
  tags.forEach(tag => {
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

// タグを格納する配列を(仮)
let tags = [
  { name: '夏', color: '#ff6347' },
  { name: '冬', color: '#00bfff' },
  { name: 'ビジネス', color: '#90ee90' }
];

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
  tags.push({ name: tagName, color: finalColor });

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