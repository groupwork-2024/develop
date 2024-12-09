// タンスのレベル（段）を生成する関数
function generateTansuLevels(levels) {
  const tansuContainer = document.getElementById('tansu-container');
  tansuContainer.innerHTML = ''; // タンスコンテナをクリア

  //各段を生成
  for (let i = 0; i < levels; i++) {
    const tansuLevel  = document.createElement('div');
    tansuLevel.classList.add('tansu-level');
    tansuLevel.innerHTML = `<span class="backStr">${i + 1}</span>`;
    tansuLevel.addEventListener('dragover', allowDrop);
    tansuLevel.addEventListener('drop', drop);
    tansuContainer.appendChild(tansuLevel);
  }
}

// タンスの引き出しの最大数
const drawer_max = document.getElementById("drawer_max");

// レイアウト部分に表示させる
function generateTansudrawer(){
  const tansuContainer = document.getElementById('tansu-container');
  tansuContainer.innerHTML = ''; // タンスコンテナをクリア

  //各行？を生成
  for(let i = 0; i < drawer_max; i++){
    const tansuDrawer = document.createElement('div');
    tansuDrawer.classList.add('tansu-drawer');
    tansuDrawer.innerHTML = `${i + 1}</span>`;
    tansuContainer.appendChild(tansuDrawer);
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
        droppedPart.textContent = data === 'square' ? '□' : '｜';
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
  const levelsInput = document.getElementById('levels');
  const partsContainer = document.getElementById('parts-container');
  const trash = document.getElementById('trash');

  //ダンスの段数の表示の処理
  levelsInput.addEventListener('change', () => {
    const levels = parseInt(levelsInput.value, 10);
    if (levels > 0 && levels <= 10) {
      generateTansuLevels(levels);
    }
  });

  //タンスの素材を追加する処理
  partsContainer.querySelectorAll('.part').forEach(part => {
    part.addEventListener('dragstart', drag);
  });

  //ごみ箱のときの処理
  trash.addEventListener('dragover', allowDrop);
  trash.addEventListener('drop', trashDrop);
});

//確認モーダル
// 完了ボタンが押された時にモーダルを表示し、フォームデータを表示する
function openReviewModal() {
  const name = document.getElementById("name").value;
  const levels = document.getElementById("levels").value;
  const tansuLayout = document.getElementById("tansu-container").innerHTML; // タンスのレイアウト

  // モーダル内にフォームデータを表示
  document.getElementById("reviewName").innerHTML = `名前<br>${name}`;
  document.getElementById("reviewImage").innerHTML = `段数<br>${levels}`;
  document.getElementById("reviewTags").innerHTML = `レイアウト<br>${tansuLayout}`;

  // モーダルを表示
  document.getElementById("reviewModal").style.display = "flex";
}

// モーダルを閉じる処理
var reviwModal = document.getElementById("reviewModal");
var span = document.getElementById("reviwCloseBtn");

span.onclick = function() {
  reviwModal.style.display = "none";
}

// モーダル外クリックで閉じる
window.onclick = function(event) {
  if (event.target == reviwModal) {
    reviwModal.style.display = "none";
  }
}

// 登録データを保存し、完了メッセージを表示
function registerData() {
  const reviewModal = document.getElementById('reviewModal');
  const registerModal = document.getElementById('registerModal');

  // モーダルを非表示に
  reviewModal.style.display = 'none';

  // 登録完了メッセージを表示
  registerModal.style.display = 'flex';
}

