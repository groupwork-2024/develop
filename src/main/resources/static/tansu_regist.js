// タンスのレベル（段）を生成する関数
function generateTansuLevels(levels) {
    const tansuContainer = document.getElementById('tansu-container');
    tansuContainer.innerHTML = '';
    for (let i = 0; i < levels; i++) {
      const level = document.createElement('div');
      level.className = 'tansu-level';
      level.innerHTML = `<span>段 ${i + 1}</span>`;
      level.addEventListener('dragover', allowDrop);
      level.addEventListener('drop', drop);
      tansuContainer.appendChild(level);
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
  
      if ((data === 'square' && squareCount < 2) || (data === 'divider' && dividerCount < 5) || sourceId) {
        let droppedPart;
        if (sourceId) {
          droppedPart = document.getElementById(sourceId);
          if (droppedPart.parentElement === targetLevel) {
            // 同じ段内での移動の場合
            const rect = event.target.getBoundingClientRect();
            const dropX = event.clientX - rect.left;
            const dropPosition = dropX < rect.width / 2 ? 'before' : 'after';
            
            if (dropPosition === 'before') {
              targetLevel.insertBefore(droppedPart, event.target);
            } else {
              targetLevel.insertBefore(droppedPart, event.target.nextSibling);
            }
          } else {
            // 異なる段への移動の場合
            targetLevel.appendChild(droppedPart);
          }
        } else {
          droppedPart = document.createElement('div');
          droppedPart.className = 'dropped-part';
          droppedPart.textContent = data === 'square' ? '□' : '｜';
          droppedPart.draggable = true;
          droppedPart.dataset.type = data;
          droppedPart.id = 'part-' + Date.now(); // ユニークなIDを付与
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
  document.addEventListener('DOMContentLoaded', () => {
    const levelsInput = document.getElementById('levels');
    const partsContainer = document.getElementById('parts-container');
    const completeButton = document.getElementById('complete');
    const trash = document.getElementById('trash');
  
    levelsInput.addEventListener('change', () => {
      const levels = parseInt(levelsInput.value, 10);
      if (levels > 0 && levels <= 10) {
        generateTansuLevels(levels);
      }
    });
  
    partsContainer.querySelectorAll('.part').forEach(part => {
      part.addEventListener('dragstart', drag);
    });
  
    trash.addEventListener('dragover', allowDrop);
    trash.addEventListener('drop', trashDrop);
  
    completeButton.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const levels = document.getElementById('levels').value;
      alert(`タンス「${name}」（${levels}段）の設計が完了しました！`);
    });
  });

  // イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    const levelsInput = document.getElementById('levels');
    const partsContainer = document.getElementById('parts-container');
    const completeButton = document.getElementById('complete');
    const trash = document.getElementById('trash');
    const backButton = document.getElementById('back-button');
  
    levelsInput.addEventListener('change', () => {
      const levels = parseInt(levelsInput.value, 10);
      if (levels > 0 && levels <= 10) {
        generateTansuLevels(levels);
      }
    });
  
    partsContainer.querySelectorAll('.part').forEach(part => {
      part.addEventListener('dragstart', drag);
    });
  
    trash.addEventListener('dragover', allowDrop);
    trash.addEventListener('drop', trashDrop);
  //完了ボタンおしたあとの処理
    completeButton.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const levels = document.getElementById('levels').value;
      alert(`タンス「${name}」（${levels}段）の設計が完了しました！`);
    });
  
    backButton.addEventListener('click', () => {
      // 前のページに戻る処理
      window.history.back();
    });
  });