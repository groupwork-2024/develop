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
      tansuPart.innerHTML = `<span class="backStr">${i + 1}</span>`;
      tansuPart.addEventListener('dragover', allowDrop);
      tansuPart.addEventListener('drop', drop);
      tansuContainer.appendChild(tansuPart);
  }
}


// ドラッグ開始時の処理
function drag(event) {
  event.dataTransfer.setData('text', event.target.dataset.type || event.target.textContent);
  event.dataTransfer.setData('sourceId', event.target.id);
}

// ドロップを許可する処理
function allowDrop(event) {
  event.preventDefault();
}

// ドロップ時の処理
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text');
  const sourceId = event.dataTransfer.getData('sourceId');
  const targetLevel = event.target.closest('.tansu-level');

  if (targetLevel) {
    const squareCount = targetLevel.querySelectorAll('.dropped-part[data-type="square"]').length;
    const dividerCount = targetLevel.querySelectorAll('.dropped-part[data-type="divider"]').length;

    if ((data === 'square' && squareCount < 5) || (data === 'divider' && dividerCount < 5) || sourceId) {
      let droppedPart;
      if (sourceId) {
        droppedPart = document.getElementById(sourceId);
        targetLevel.appendChild(droppedPart);
      } else {
        droppedPart = document.createElement('div');
        droppedPart.className = 'dropped-part';
        droppedPart.textContent = '　　';
        droppedPart.draggable = true;
        droppedPart.dataset.type = data;
        droppedPart.id = 'part-' + Date.now();
        droppedPart.addEventListener('dragstart', drag);
        targetLevel.appendChild(droppedPart);
      }
    }
  }
}

// ゴミ箱にドロップされた時の処理
function trashDrop(event) {
  event.preventDefault();
  const sourceId = event.dataTransfer.getData('sourceId');
  if (sourceId) {
    const draggedElement = document.getElementById(sourceId);
    if (draggedElement) {
      draggedElement.remove();
    }
  }
}

// イベントリスナーの設定
//確認画面でのタンスレイアウト
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
  document.getElementById("reviewModal").style.display = "flex";
  reviewModal.style.display = "flex";
}

// モーダルを閉じる処理
span.onclick = function() {
  reviewModal.style.display = "none";
}

// モーダル外クリックで閉じる
window.onclick = function(event) {
  if (event.target == reviewModal) {
    reviewModal.style.display = "none";
  }
}

// 登録データを保存し、完了メッセージを表示
function registerData() {
  const registerModal = document.getElementById('registerModal');

  // モーダルを非表示に
  reviewModal.style.display = 'none';

  // 登録完了メッセージを表示
  registerModal.style.display = 'flex';
}

