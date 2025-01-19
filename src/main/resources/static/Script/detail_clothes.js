// クエリパラメータからlocationを取得し、デコードしてJSONにパース
const urlParams = new URLSearchParams(window.location.search);
const clothesString = urlParams.get('location');
const clothes = JSON.parse(decodeURIComponent(clothesString));

// 中身の確認
console.log(clothes); 

// 素材宣言
const nameInput = document.getElementById('name');
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');
const brandInput = document.getElementById('brand');
const locationInput = document.getElementById('location');
const memoInput = document.getElementById('memo');
let tagsInput = '';

//初期起動
display();
judgmenttype(true);

function display(){
  nameInput.value = clothes.name;
  brandInput.value = clothes.brand;
  locationInput.value = clothes.location;
  memoInput.value = clothes.memo;
  tagsInput = clothes.tags;

  judgmenttype(true);

  labelDisplay.innerHTML = '';

  //登録されているタグを表示
  tagsInput.forEach((tag,index) => {
    displayLabelInMain(tag.name,tag.color,index);
  });

  imagePreview.src = clothes.image || "../img/youfuku_test.png"; 
}

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
  // idをふる
  deleteButton.id = 'deletebtn';

  console.log(deleteButton);

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
  labelElement.appendChild(deleteButton);
  
  // メイン画面のタグ表示領域に追加
  labelDisplay.appendChild(labelElement);
  console.log('タグがメイン画面に追加されました');
  
  console.log(imagePreview);
}

// 状態に応じて入力可能かどうか
function judgmenttype(type) {
  console.log("レイアウト変更します");
  nameInput.disabled = type;
  brandInput.disabled = type;
  locationInput.disabled = type;
  memoInput.disabled = type;

  if(type == true){
    nameInput.style.color = 'black';
    nameInput.style.backgroundColor = 'transparent';
    brandInput.style.color = 'black';
    brandInput.style.backgroundColor = 'transparent';
    locationInput.style.color = 'black';
    locationInput.style.backgroundColor = 'transparent';
    memoInput.style.color = 'black';
    memoInput.style.backgroundColor = 'transparent';
  
    const tagOpenButton = document.getElementById('tagOpenButton');
    tagOpenButton.style.display = 'none';
    const addImageButton = document.getElementById('addImageButton');
    addImageButton.style.display = 'none';
    const addPhoto = document.getElementById('addPhoto');
    addPhoto.style.display = 'none';

    // タグの削除ボタンも非表示にする
    const deletebtn = document.querySelectorAll('#deletebtn');
    console.log(deletebtn);
    deletebtn.forEach(function(btn) {
      btn.style.display = 'none';
    });

    //ボタンの表示表示を変える
    const reviwBtn = document.getElementById('review-modal-button');
    reviwBtn.style.display = 'flex';

    const keepBtn = document.getElementById('keepBtn');
    keepBtn.style.display = 'none';

    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.style.display = 'none';
  }
  else{
    nameInput.style.color = 'black';
    nameInput.style.backgroundColor = 'transparent';
    brandInput.style.color = 'black';
    brandInput.style.backgroundColor = 'transparent';
    locationInput.style.color = 'black';
    locationInput.style.backgroundColor = 'transparent';
    memoInput.style.color = 'black';
    memoInput.style.backgroundColor = 'transparent';
  
    const tagOpenButton = document.getElementById('tagOpenButton');
    tagOpenButton.style.display = 'flex';
    const addImageButton = document.getElementById('addImageButton');
    addImageButton.style.display = 'flex';
    const addPhoto = document.getElementById('addPhoto');
    addPhoto.style.display = 'flex';

    // タグの削除ボタンも表示にする
    const deletebtn = document.querySelectorAll('#deletebtn');
    deletebtn.forEach(btn => {
      btn.style.display = 'flex';
    });

    //ボタンの表示表示を変える
    const reviwBtn = document.getElementById('review-modal-button');
    reviwBtn.style.display = 'none';

    const keepBtn = document.getElementById('keepBtn');
    keepBtn.style.display = 'flex';

    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.style.display = 'flex';
  }
}

function showEdit(){
  console.log('編集します');
  judgmenttype(false);
}

function showCansel(){
  console.log('キャンセルします');
  judgmenttype(true);
  display();

  // タグの削除ボタンも表示にする
  const deletebtn = document.querySelectorAll('#deletebtn');
  deletebtn.forEach(btn => {
    btn.style.display = 'none';
  });

}

function showKeep(){
  console.log('保存します');
  judgmenttype(true);
}