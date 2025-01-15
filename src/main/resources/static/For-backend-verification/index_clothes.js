// 洋服一覧を表示する場所を取得
const clothesListContainer = document.getElementById('clothseListDisplay');
const userId = document.getElementById('userId').value;

  setEventListeners();
  deleteClothes();
  editButtonHandler();
  // 再描画後に削除ボタンのイベントを再設定
function deleteClothes() {
  document.querySelectorAll('.delete_button').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const clothesId = this.getAttribute('data-id');
      if (confirm('本当に削除しますか？')) {
        fetch(`/api/clothes/${clothesId}`, { method: 'POST' })
          .then(response => {
            if (response.ok) {
              alert('削除が成功しました。');
              renderClothes(); // 再描画
            } else {
              alert('削除に失敗しました。');
            }
          })
          .catch(error => {
            console.error('エラーが発生しました:', error);
          });
      }
    });
  });
}


function renderClothes() {
  // サーバーからデータを取得
  fetch(`/api/clothes/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }
      return response.json();
    })
    .then(data => {
      // サーバーから取得したデータでリストを再描画
      clothesListContainer.innerHTML = ''; // リストをクリア

      data.forEach((clothes, index) => {
        const clothesItem = document.createElement('div');
        clothesItem.classList.add('clothse_button');

        const imageElement = document.createElement('img');
        imageElement.src = clothes.imageUrl || '../img/youfuku_test.png';
        imageElement.alt = clothes.name;

        const usuallyDisplayed = document.createElement('figure');
        usuallyDisplayed.classList.add('clothes_img');
        usuallyDisplayed.appendChild(imageElement);

        const detailsElement = document.createElement('div');
        detailsElement.classList.add('detail');
        detailsElement.innerHTML = `
          <strong>名前 </strong> ${clothes.name} <br>
          <strong>場所 </strong> ${clothes.storage?.name || '未指定'} <br>
          <strong>タグ </strong> <br>
          <div class="tags" id="tags-${index}"></div>
        `;
        usuallyDisplayed.appendChild(detailsElement);

        const tagsElement = detailsElement.querySelector(`#tags-${index}`);
        clothes.tags.forEach(tag => {
          const tagElement = document.createElement('div');
          tagElement.classList.add('tag');
          tagElement.style.backgroundColor = tag.color;
          tagElement.textContent = tag.name;

          const arrowElement = document.createElement('div');
          arrowElement.classList.add('arrow');
          arrowElement.style.borderRightColor = tag.color;

          tagElement.appendChild(arrowElement);
          tagsElement.appendChild(tagElement);
        });

        const usuallyHidden = document.createElement('div');
        usuallyHidden.classList.add('detail_en');
        usuallyHidden.innerHTML = `
          <strong>ブランド </strong> ${clothes.brandName || '未指定'} <br>
          <strong>メモ </strong> ${clothes.description || '未指定'} <br>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete_button');
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.textContent = '削除';
        deleteBtn.setAttribute('data-id', clothes.id);

        const editBtn = document.createElement('button');
        editBtn.setAttribute('type', 'button');
        editBtn.classList.add('editBtn');
        editBtn.textContent = '編集';
        editBtn.setAttribute('data-id', clothes.id);

        usuallyHidden.appendChild(deleteBtn);
        usuallyHidden.appendChild(editBtn);

        clothesItem.appendChild(usuallyDisplayed);
        clothesItem.appendChild(usuallyHidden);
        clothesListContainer.appendChild(clothesItem);
      });

      // 各ボタンにイベントリスナーを再設定
      setEventListeners();
      deleteClothes();
      editButtonHandler();
    })
    .catch(error => {
      console.error('エラー:', error);
      alert('データの読み込みに失敗しました');
    });
}


  //これが編集ボタンを表示
   // 再描画後にクリックで詳細表示するイベントを再設定
function setEventListeners() {
  // .clothse_button にクリックイベントを設定
  const buttons = document.querySelectorAll('.clothse_button');
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const display = this.querySelector(".detail_en"); // このボタンに対応する .detail_en を取得

      // 現在の表示状態を取得
      if (display.style.display === 'none' || display.style.display === '') {
        display.style.display = 'block'; // 表示
      } else {
        display.style.display = 'none'; // 非表示
      }
    });
  });
}

  // 初期状態を設定（すべての.detail_enを非表示にする）
  document.querySelectorAll(".detail_en").forEach(detail => {
    detail.style.display = 'none';
  });

function editButtonHandler() {
  const editButtons = document.querySelectorAll('.editBtn');

  // 既存のイベントリスナーを削除
  editButtons.forEach(button => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
  });

  // 新しいイベントリスナーを設定
  document.querySelectorAll('.editBtn').forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      event.preventDefault();

      const clothesId = event.target.getAttribute('data-id');
      console.log('Clicked edit button for clothesId:', clothesId);
      showEditForm(userId, clothesId);
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

let originalImageUrl = ''; // 現在の画像URLを保持する変数

async function showEditForm(userId, clothesId) {
    try {
    editModal.style.display = 'flex';
        // APIにPOSTリクエストを送信
        const response = await fetch('/api/clothes/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, clothesId }),
        });

        // レスポンスのエラーチェック
        if (!response.ok) {
            throw new Error('データの取得に失敗しました');
        }

        // JSONデータをパース
        const clothes = await response.json();


        // 現在の画像URLを保存
        originalImageUrl = clothes.imageUrl || '../img/youfuku_test.png';


        // フォームに値をセット
        editNameInput.value = clothes.name;
        editBrandInput.value = clothes.brandName; // エンティティでbrandNameになっている
        editLocationInput.value = clothes.storage?.name || ''; // storageがnullの場合に対応
        editMemoInput.value = clothes.description || '';
        editTags = clothes.tags || []; // nullを防ぐ

        // タグ表示
        const labelDisplay = document.getElementById('labelDisplay');
        if (!labelDisplay) {
            console.error('labelDisplay 要素が見つかりません');
            return;
        }
        labelDisplay.innerHTML = '';
        editTags.forEach((tag, index) => {
            displayLabelInMain(tag.name, tag.color, index);
        });

        // 画像プレビューの設定
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.src = clothes.imageUrl || "../img/youfuku_test.png";
         // 保存ボタンに data-id を設定
        const saveButton = document.getElementById('saveButton');
        saveButton.setAttribute('data-id', clothesId);
        // 編集モーダルを表示

    } catch (error) {
        console.error('エラー:', error.message);
    }
}

saveButton.addEventListener('click', async function(event) { // async を追加
    event.preventDefault();

    const clothesId = saveButton.getAttribute('data-id'); // 保存ボタンから直接取得
    console.log("Clothes ID:", clothesId);

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('brandName', document.getElementById('brand').value);
    formData.append('description', document.getElementById('memo').value);
    const storageId = document.getElementById('location').value;
    formData.append('storageId', storageId);

        if (!clothesId) {
            console.error("Clothes ID is missing");
            return;
        }

    const tags = Array.from(document.querySelectorAll('.addtag')).map(tag => ({
        id: tag.dataset.id,
        name: tag.textContent.trim(),
    }));
    formData.append('tags', JSON.stringify(tags));


    // 現在の画像URLを比較し、異なる場合のみ画像データを追加
       const imgElement = document.getElementById('imagePreview');
       if (imgElement.src !== originalImageUrl) {
           const imgResponse = await fetch(imgElement.src);
           if (imgResponse.ok) {
               const imgBlob = await imgResponse.blob();
               formData.append('image', imgBlob);
           }
       }

          console.log('服の更新リクエスト:', {
               name: document.getElementById('name').value,
               brandName: document.getElementById('brand').value,
               storageId,
               description: document.getElementById('memo').value,
               tags,
           });

    try {
        const response = await fetch(`/api/clothes/${userId}/edit/${clothesId}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('データ更新に失敗しました');

        const updatedData = await response.json();
        console.log('更新成功:', updatedData);

        // モーダルを閉じる
        document.getElementById('editModal').style.display = 'none';
        window.location.reload();
    } catch (error) {
        console.error('データ更新中にエラーが発生:', error);
        alert('データの更新に失敗しました');
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
   fetchTags();
  openModal('tagListmodal', false);  // 完了ボタンを無効化
});

// タグ一覧モーダルを閉じる
tagListClose.addEventListener('click', function() {
  closeModal('tagListmodal');  // 完了ボタンを有効化
});

//タグ一覧を表示する
function displayTagList(tags){
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
// タグ一覧を取得
async function fetchTags() {
    try {
        const response = await fetch(`/tags/${userId}`); // userId を使用してタグを取得
        if (!response.ok) {
            throw new Error('タグの取得に失敗しました');
        }
        const tags = await response.json(); // サーバーから取得したタグデータをパース
        displayTagList(tags); // タグ一覧を描画する関数にデータを渡す
    } catch (error) {
        console.error('タグ取得エラー:', error);
        alert('タグを取得できませんでした');
    }
}

// タグ登録ボタンを押したときの処理
addButton.addEventListener('click', function(event) {
    event.preventDefault();

    console.log('登録ボタンがクリックされました');
    console.log('選択されているタグ:', selectedTag);

    // tagElement（選択されたタグのHTML要素）からタグ名と色を取得
    const tagName = selectedTag.textContent; // タグ名
    const tagColor = selectedTag.style.backgroundColor; // 背景色（色）

    if (selectedTag) {
        // メイン画面にタグを表示
        displayLabelInMain(tagName,tagColor);
        //タグ一覧モーダルを閉じる
        //closeModal('tagListmodal');

    } else {
        alert('タグを選択してください。');
    }
});

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

// タグ追加モーダルを開く
addTagOpenButton.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
     // タグ一覧モーダルを閉じる
    closeModal('tagListmodal');
    openModal('tagmodal', false);  // タグ追加モーダルを表示
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


// 色表示エリアを更新
function updateColorDisplay() {
  colorDisplayArea.innerHTML = ''; // 現在の色をリセット
  const colorBox = document.createElement('div');
  colorBox.style.backgroundColor = selectedColor;
  colorBox.classList.add('color-box');
  colorDisplayArea.appendChild(colorBox);
}

// タグ登録ボタン
addTagButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const tagName = tagInput.value.trim(); // タグ名を取得
    const tagColor = selectedColor; // 選択された色を取得

    if (!tagName || !tagColor) {
        alert('タグ名と色を入力してください。');
        return;
    }

try {
    // タグ情報をサーバーに送信
    const response = await fetch(`/tags/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: tagName, color: tagColor }),
    });

    if (response.ok) {
        const result = await response.json(); // サーバーからのレスポンス
        console.log('タグ登録成功:', result);


                    closeModal('tagmodal');

                    // 登録完了後、フロントエンドを更新する処理を追加
                    addTagToList(tagName, tagColor);

    } else {
        const error = await response.json();
        console.error('タグ登録失敗:', error);
    }
} catch (error) {
    console.error('タグ登録中にエラーが発生しました:', error);
}
});
