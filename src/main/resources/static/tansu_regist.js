// タンスのレベル（段）を生成する関数
function generateTansuLevels(levels) {
  const tansuContainer = document.getElementById('tansu-container');
  tansuContainer.innerHTML = ''; // タンスコンテナをクリア

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
document.addEventListener('DOMContentLoaded', () => {
  const levelsInput = document.getElementById('levels');
  const partsContainer = document.getElementById('parts-container');
  const completeButton = document.getElementById('complete-button');
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
    // 既に確認画面が存在する場合、置き換える
    const existingConfirmationScreen = document.getElementById('confirmation-screen');
    if (existingConfirmationScreen) {
      existingConfirmationScreen.remove();
    }

    const name = document.getElementById('name').value;
    const levels = document.getElementById('levels').value;

    const tansuLevels = document.querySelectorAll('.tansu-level');
    const levelParts = Array.from(tansuLevels).map(level => {
      return Array.from(level.querySelectorAll('.dropped-part')).map(part => part.dataset.type);
    });

    const confirmationHTML = `
      <div id="confirmation-screen">
        <header>
          <button id="back-button-confirm" class="back-button">＜</button>
        </header>
        <main>
          <div class="confirmation-item">
            <h2>名前</h2>
            <p>${name}</p>
          </div>
          <div class="tansu-preview">
            <svg viewBox="0 0 200 300" class="tansu-svg">
              <rect x="40" y="40" width="120" height="220" fill="none" stroke="black" stroke-width="2"/>
              ${Array.from({length: levels}, (_, i) => {
                const levelPart = levelParts[i] || [];
                const totalWidth = levelPart.length * 20;
                const startX = (200 - totalWidth) / 2;

                return `
                  <line x1="40" y1="${40 + ((220/levels) * (i+1))}" 
                        x2="160" y2="${40 + ((220/levels) * (i+1))}" 
                        stroke="black" stroke-width="1"/>
                  ${levelPart.map((part, j) => {
                    const y = 40 + ((220/levels) * i) + (220/levels/2);
                    const x = startX + (j * 20);
                    return part === 'square' 
                      ? `<rect x="${x-5}" y="${y-5}" width="10" height="10" fill="none" stroke="black" stroke-width="1"/>`
                      : `<line x1="${x}" y1="${y-5}" x2="${x}" y2="${y+5}" stroke="black" stroke-width="1"/>`;
                  }).join('')}`
              }).join('')}
            </svg>
          </div>
          <div class="confirmation-item">
            <h2>段数</h2>
            <p>${levels}段</p>
          </div>
        </main>
        <footer>
          <button id="done-button">完了</button>
        </footer>
      </div>
    `;

    document.getElementById('app').innerHTML = confirmationHTML;

    const doneButton = document.getElementById('done-button');
    if (doneButton) {
      doneButton.addEventListener('click', () => alert("タンスが登録されました！"));
    }
    document.getElementById('back-button-confirm').addEventListener('click', () => location.reload());
  });
});
