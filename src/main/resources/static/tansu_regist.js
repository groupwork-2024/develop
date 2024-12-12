// セレクトボックスの要素を取得
const storageTypeSelect = document.getElementById('storageType');
// 数の入力値
const levelsInput = document.getElementById('levels');

// 初期処理: セレクトボックスの選択肢に基づいて処理を切り替える
storageTypeSelect.addEventListener('change', function() {
  handleStorageTypeInput(storageTypeSelect.value);
});

//セレクトボックスで選択されたものによって制限を変える
function handleStorageTypeInput(storageType) {
  if (storageType === 'levels') {
    levelsInput.setAttribute('min', '1');
    levelsInput.setAttribute('max', '10');
  } else if (storageType === 'drawers') {
    levelsInput.setAttribute('min', '1');
    levelsInput.setAttribute('max', '5');
  }

  levelsInput.value = ''; // 入力フィールドをリセット
  const tansuContainer = document.getElementById('tansu-container');
  tansuContainer.innerHTML = ''; // タンスコンテナをクリア
}

// ボタンのクリックイベント: 情報ボタンをクリックしたときの動作
document.getElementById('infoButton').addEventListener('click', function() {
    const selectedValue = storageTypeSelect.value;

    if (selectedValue === 'levels') {
        alert("段数は1から10の範囲で指定できます。");
    } else if (selectedValue === 'drawers') {
        alert("引き出しの最大数は1から5の範囲で指定できます。");
    }
});

//タンスの棚等の生成関連
function generateTansuLayout(count, isLevel) {
  const tansuContainer = document.getElementById('tansu-container');
  tansuContainer.innerHTML = '';  // タンスコンテナをクリア

  tansuContainer.style.display = 'flex';
  tansuContainer.style.flexDirection = isLevel ? 'column' : 'row';

  for (let i = 0; i < count; i++) {
      const tansuPart = document.createElement('div');
      tansuPart.classList.add('tansu-level');
      //各段に番号をつける
      tansuPart.innerHTML = `<span class="backStr">${i + 1}</span>`;
      //ドロップを可能にする
      tansuPart.addEventListener('dragover', allowDrop);
      //ドロップ時の処理
      tansuPart.addEventListener('drop', drop);
      //タンス表示エリアに追加
      tansuContainer.appendChild(tansuPart);
  }
}

// ドラッグ開始時の処理
function drag(event) {
  // アイテムのIDを設定
  event.dataTransfer.setData('id', event.target.id);
}

// ドロップを許可する処理
function allowDrop(event) {
  // デフォルトの動作を防止
  event.preventDefault();
}

// ドロップされたときの処理
function drop(event) {
  event.preventDefault();

  // ドロップされたアイテムのIDを取得
  const itemId = event.dataTransfer.getData('id');
  
  // ドラッグされたアイテムを取得
  const draggedItem = document.getElementById(itemId);
  
  // ドロップ先のタンス段を取得
  const targetLevel = event.target.closest('.tansu-level');

  //段数か引き出しか今選ばれているやつを取得
  const selectedValue = storageTypeSelect.value;

  // ドロップ先がタンス段なら
  // タンス段にアイテムを追加
  if (targetLevel) {
    // アイテムのコピーを作成
    const newItem = draggedItem.cloneNode(true);  
    // 不要なクラスを削除
    newItem.classList.remove('dragging');   

    //選ばれてる奴によってスタイルを変更させる
    if (selectedValue === 'levels') {
      // 追加されたアイテムにクラスを付与
      newItem.classList.add('dropped-part'); 
      targetLevel.style.flexDirection = 'row';
    } else if (selectedValue === 'drawers') {
      // 追加されたアイテムにクラスを付与
    newItem.classList.add('drawers-dropped-part'); 
      targetLevel.style.flexDirection = 'column'; 
    }

     // タンス段に追加
    targetLevel.appendChild(newItem); 
  }
}

// ゴミ箱にドロップされた時の処理
function trashDrop(event) {
  // デフォルトの動作を防ぐ
  event.preventDefault();

  // ドラッグされたアイテムのIDを取得
  const itemId = event.dataTransfer.getData('id');
  
  // アイテムを取得
  const draggedItem = document.getElementById(itemId);

  // アイテムが存在する場合、削除する
  if (draggedItem) {
    draggedItem.remove();  // DOMからアイテムを削除
  }
  
}

// ごみ箱のイベントリスナー設定
document.getElementById('trash').addEventListener('dragover', function(event) {
  event.preventDefault();
  this.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';  // ごみ箱の色を変更
});

document.getElementById('trash').addEventListener('dragleave', function(event) {
  this.style.backgroundColor = '';  // ごみ箱から離れたら色を元に戻す
});

document.getElementById('trash').addEventListener('drop', function(event) {
  event.preventDefault();
  // ごみ箱にドロップ後に色を元に戻す
  this.style.backgroundColor = '';
  // 実際にアイテムを削除
  trashDrop(event);
});

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
  const partsContainer = document.getElementById('parts-container');
  const trash = document.getElementById('trash');
  const selectedValue = storageTypeSelect.value;

  // 初期のセレクトボックスの値に基づいて処理を変更
  storageTypeChenfe(selectedValue);

  // セレクトボックスを変更したとき、情報を再び取得する
  storageTypeSelect.addEventListener('change', function() {
    const selectedValue = storageTypeSelect.value;
    console.log('選択された値:', selectedValue);
    storageTypeChenfe(selectedValue);
  });
  
  //タンスの素材を追加する処理
  partsContainer.querySelectorAll('.part').forEach(part => {
    part.addEventListener('dragstart', drag);
  });

  //ごみ箱のときの処理
  trash.addEventListener('dragover', allowDrop);
  trash.addEventListener('drop', trashDrop);
});

function storageTypeChenfe(selectedValue){
  const levelsInput = document.getElementById('levels');
  // 既存のイベントリスナーを削除
  levelsInput.removeEventListener('change', levelsInputChangeHandler);
  
  if (selectedValue === 'levels') {
    // 段数の処理
    levelsInput.addEventListener('change', levelsInputChangeHandler);
  } else if (selectedValue === 'drawers') {
    // 引き出しの処理
    levelsInput.addEventListener('change', levelsInputChangeHandler);
  }
}

// levelsInput の change イベントに対する共通のハンドラ
function levelsInputChangeHandler() {
  const levels = parseInt(levelsInput.value, 10);
  const selectedValue = storageTypeSelect.value;

  if (selectedValue === 'levels') {
    generateTansuLayout(levels, true); // レベルのレイアウト
  } else if (selectedValue === 'drawers') {
    generateTansuLayout(levels, false); // 引き出しのレイアウト
  }
}

//確認モーダル
var reviewModal = document.getElementById("reviewModal");
var reviewOpenButton = document.getElementById("review-modal-button");
var span = document.getElementById("reviwCloseBtn");

// 完了ボタンが押された時にモーダルを表示し、フォームデータを表示する
reviewOpenButton.onclick = function(event){
  event.preventDefault();  // フォーム送信のデフォルト動作を防止
  event.stopPropagation();  // イベントの伝播を止める
  const name = document.getElementById("name").value;
  const levels = document.getElementById("levels").value;
  const tansuContainer = document.getElementById("tansu-container"); // タンスのレイアウト
  const tansuLayout = tansuContainer.cloneNode(true);  // 複製

  // 複製した要素に新しいIDを設定
  // 確認画面のタンスのレイアウト部分
  tansuLayout.id = "review-tansu-layout"; 

  // モーダル内にフォームデータを表示
  document.getElementById("reviewName").innerHTML = `名前<br>${name}`;
  document.getElementById("reviewLevel").innerHTML = `段数<br>${levels}`;
  document.getElementById("reviewlayout").innerHTML = `レイアウト<br>`;

  // モーダルにレイアウトを追加
  const reviewLayout = document.getElementById("reviewlayout");
  reviewLayout.appendChild(tansuLayout);  // 複製したレイアウトを追加

  // モーダルを表示
  reviewModal.style.display = "flex";
}

// モーダルを閉じる処理
span.onclick = function() {
  reviewModal.style.display = "none";
}

// 登録データを保存し、完了メッセージを表示
function registerData() {
  const registerModal = document.getElementById('registerModal');

  // モーダルを非表示に
  reviewModal.style.display = 'none';

  // 登録完了メッセージを表示
  registerModal.style.display = 'flex';
}

