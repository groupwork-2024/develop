const userId = document.getElementById('userId').value;
//アイコンに画像を設定
function iconImage(event) {
  const file = event.target.files[0]; // 選択されたファイル
  if (file) {
    const reader = new FileReader(); // ファイルを読み込むオブジェクト
    reader.onload = function (e) {
      const profileImage = document.getElementById('profile-image');
      profileImage.src = e.target.result; // 読み込んだ画像のURLを設定
      profileImage.style.display = 'block'; // 画像を表示
    };
    reader.readAsDataURL(file); // ファイルをデータURLとして読み込む
  }
}


// カラーボタンがクリックされたときのイベント
// クラス名をlocalStorageに保存
function saveClassToLocalStorage(event) {
  // クリックされたボタン要素を取得
  const target = event.target;
  // data-color属性の値を取得
  const selectedColor = target.getAttribute('data-color');
  // 値を確認 (デバッグ用)
  console.log('選択されたモード：', selectedColor);

  //追加したいクラス名を入れるclassName
  let className='';

  switch(selectedColor){
    case 'white':
      className = 'white'; // 追加したいクラス名
      break;
    case 'black':
      className = 'black'; // 追加したいクラス名
      break;
    case 'natural':
      className = 'natural'; // 追加したいクラス名
      break;
    }

  // クラス名をlocalStorageに保存
  localStorage.setItem('colorClass', className);

  // ページをリロードして、すぐに反映させる
  location.reload();  // ページをリロード
}


// ページロード時に初期設定
window.addEventListener('DOMContentLoaded', () => {
    // タブのクリックイベントを設定
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => handleTabClick(tab));
    });

    // URLクエリパラメータから初期表示を設定
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view') || 'clothes'; // デフォルトは 'clothes'
    showSection(view); // 初期表示
});

// タブクリック時の処理
function handleTabClick(tab) {
    // すべてのタブを非アクティブ化
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // クリックされたタブをアクティブ化
    tab.classList.add('active');

    // 対応するセクションIDを取得
    let sectionId = '';
    if (tab.classList.contains('youhuku')) {
        sectionId = 'youhuku-grid';
    } else if (tab.classList.contains('closet')) {
        sectionId = 'closet-grid';
    } else if (tab.classList.contains('tag')) {
        sectionId = 'tag-grid';
    }

    // セクションを表示切り替え
    showSection(sectionId.replace('-grid', ''));
}

// 指定したセクションを表示し、それ以外を非表示
function showSection(section) {
    // すべてのセクションを非表示
    document.querySelectorAll('.item-grid').forEach(grid => {
        grid.style.display = 'none';
    });

    // 対応するセクションを表示
    const activeGrid = document.getElementById(`${section}-grid`);
    if (activeGrid) {
        activeGrid.style.display = 'grid';
    }

    // データ取得（必要に応じて実行）
    if (section === 'youhuku') {
        fetchClothesList();
    } else if (section === 'closet') {
        fetchClosetList();
    } else if (section === 'tag') {
        fetchTagList();
    }

    // クエリパラメータを更新（ブラウザのアドレスバー）
    history.replaceState(null, '', `${window.location.pathname}?view=${section}`);
}

// サーバーから洋服データを取得
function fetchClothesList() {
    fetch(`/others/{userId}/ajax/clothes`) // 必要に応じてURLやuserIdを動的に変更
        .then(response => {
            if (!response.ok) {
                throw new Error('サーバーエラー: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            renderClothesList(data); // データを描画
        })
        .catch(error => {
            console.error('データ取得エラー:', error);
        });
}

// サーバーから収納データを取得
function fetchClosetList() {
    fetch(`/others/{userId}/ajax/storage`) // 必要に応じてURLやuserIdを動的に変更
        .then(response => {
            if (!response.ok) {
                throw new Error('サーバーエラー: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            renderClosetList(data); // データを描画
        })
        .catch(error => {
            console.error('データ取得エラー:', error);
        });
}

// サーバーからタグデータを取得
function fetchTagList() {
    fetch(`/others/{userId}/ajax/tag`) // 必要に応じてURLやuserIdを動的に変更
        .then(response => {
            if (!response.ok) {
                throw new Error('サーバーエラー: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            renderTagList(data); // データを描画
        })
        .catch(error => {
            console.error('データ取得エラー:', error);
        });
}

// 洋服データを描画
function renderClothesList(clothesArray) {
    const container = document.getElementById('youhuku-grid');
    container.innerHTML = ''; // 現在の表示をクリア

    clothesArray.forEach(clothes => {
        const item = document.createElement('div');
        item.classList.add('youhuku-item');

        const img = document.createElement('img');
        img.src = clothes.image;
        img.alt = clothes.name;

        const name = document.createElement('p');
        name.textContent = clothes.name;

        item.appendChild(img);
        item.appendChild(name);
        container.appendChild(item);
    });
}

// 収納データを描画
function renderClosetList(closetArray) {
    const container = document.getElementById('closet-grid');
    container.innerHTML = ''; // 現在の表示をクリア

    closetArray.forEach(closet => {
        const item = document.createElement('div');
        item.classList.add('closet-item');

        const img = document.createElement('img');
        img.src = closet.image;
        img.alt = closet.name;

        const name = document.createElement('p');
        name.textContent = closet.name;

        item.appendChild(img);
        item.appendChild(name);
        container.appendChild(item);
    });
}

// タグデータを描画
function renderTagList(tagArray) {
    const container = document.getElementById('tag-grid');
    container.innerHTML = ''; // 現在の表示をクリア

    tagArray.forEach(tag => {
        const item = document.createElement('div');
        item.classList.add('tag-item');

        const color = document.createElement('div');
        color.style.backgroundColor = tag.color;
        color.classList.add('tag-color');

        const name = document.createElement('p');
        name.textContent = tag.name;

        item.appendChild(color);
        item.appendChild(name);
        container.appendChild(item);
    });
}

//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
const savedClass = localStorage.getItem('colorClass');
if (savedClass) {
  //ログ
  console.log('クラス取得できたよ', savedClass);
  //ヘッダーに適用
  const header = document.querySelector('.header');
  header.classList.add(savedClass);
  console.log('ヘッダーの色：', savedClass);
}
