const userId = document.getElementById('userId').value;
async function iconImage(event) {
  const file = event.target.files[0]; // 選択されたファイル
  const profileImage = document.getElementById('profile-image');

  if (!file) {
    console.error("ファイルが選択されていません");
    return;
  }

  const formData = new FormData();
  formData.append("image", file); // 選択した画像をフォームデータに追加

  // サーバーに画像をアップロード
  try {
    const response = await fetch(`/my_page/${userId}/icon`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload user icon');
    }

    const data = await response.json();
    console.log('User icon uploaded successfully:', data);

    if (data.url) {
      // 新しい画像URLを即時設定し、キャッシュを回避
      profileImage.src = `${data.url}?timestamp=${new Date().getTime()}`;
      profileImage.style.display = 'block'; // 非表示を解除
    } else {
      console.error("サーバーから新しい画像のURLが返されませんでした");
    }
  } catch (error) {
    console.error('Error uploading user icon:', error);
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
  let className = '';

  switch (selectedColor) {
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


// 一覧初期状態の設定
window.addEventListener('DOMContentLoaded', () => {
  //すべての一覧を非表示にする
  document.querySelectorAll('.item-grid').forEach(section => section.style.display = 'none');
  //洋服一覧のみを表示する
  document.getElementById('youhuku-grid').style.display = 'grid';
});

// タブ切り替え（クリックイベント）
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // すべての一覧のアクティブ状態を解除
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // クリックされた一覧をアクティブにする
    tab.classList.add('active');

    // すべての一覧を非表示にする
    document.querySelectorAll('.item-grid').forEach(section => section.style.display = 'none');

    // ユーザーIDを取得（動的に設定可能）
    const userId = document.getElementById('userId').value;

    // タブに応じてfetchでデータを取得し、対応するセクションを表示
    if (tab.classList.contains('youhuku')) {
      fetchData(`/my_page/${userId}`, 'youhuku-grid', 'clothes');
    } else if (tab.classList.contains('closet')) {
      fetchData(`/my_page/${userId}`, 'closet-grid', 'closet');
    } else if (tab.classList.contains('tag')) {
      fetchData(`/my_page/${userId}`, 'tag-grid', 'tags');
    }
  });
});

function fetchData(baseApiUrl, gridId, resourceType) {
  const apiUrl = `${baseApiUrl}/${resourceType}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('データの取得に失敗しました: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      const grid = document.getElementById(gridId);
      grid.innerHTML = ''; // 既存の内容をクリア

      if (resourceType === "clothes") {
        // 洋服データを表示
        data.forEach(item => {
          const link = document.createElement('a');
          link.href = `/clothes/detail/${item.id}`;

          const div = document.createElement('div');
          div.classList.add('youhuku-item');

          const img = document.createElement('img');
          img.src = item.imageUrl;
          img.alt = item.name;

          div.appendChild(img);
          link.appendChild(div);
          grid.appendChild(link);
        });
      } else if (resourceType === "closet") {
        // 収納データを表示
        data.forEach(item => {
          // ルーティングURLを動的に生成
          const storageUrl = `/section/${userId}/storages/${item.id}?storageType=${item.storageType}`;
          // <a>タグを生成
          const link = document.createElement('a');
          link.href = storageUrl; // ルーティング用のリンク
          link.classList.add('storage-link'); // 必要に応じてCSSクラスを追加

          const div = document.createElement('div');
          div.classList.add('youhuku-item');

          const img = document.createElement('img');
          img.src = item.imageUrl;
          img.alt = item.name;

          div.appendChild(img);
          link.appendChild(div);
          grid.appendChild(link);
        });
      } else if (resourceType === "tags") {
        data.forEach(item => {
          // 外部リンクを作成
          const link = document.createElement('a');
          link.href = `/section/${userId}/tag/${item.id}`; // タグの詳細ページリンク

          // 外部リンク内のラッパー（youhuku-item）を作成
          const div = document.createElement('div');
          div.classList.add('youhuku-item');

          // タグとして表示する部分を作成
          const tag = document.createElement('div');
          tag.classList.add('tag_list'); // タグのスタイルを適用
          tag.textContent = item.name; // タグ名を設定
          tag.style.backgroundColor = item.color || '#4CAF50'; // サーバーから取得した色を適用

          // 矢印部分
          const arrow = document.createElement('div');
          arrow.classList.add('arrow');
          arrow.style.borderRightColor = item.color || '#4CAF50'; // 矢印の色を設定

          // タグに矢印を追加
          tag.appendChild(arrow);

          // タグをyouhuku-item内に追加
          div.appendChild(tag);

          // youhuku-itemをリンクに追加
          link.appendChild(div);

          // リンクをグリッドに追加
          grid.appendChild(link);
        });
      }

      grid.style.display = 'grid'; // セクションを表示
    })
    .catch(error => {
      console.error('エラー:', error);
    });
}



//画面の色（モード）を反映
// 保存されたクラス名を取得してMypageに適用
var savedClass = localStorage.getItem('colorClass');
if (savedClass) {
  //ログ
  console.log('クラス取得できたよ', savedClass);

  //一覧背景色
  const grids = document.querySelectorAll('#closet-grid,#youhuku-grid');
  grids.forEach(grid => {
    grid.classList.add(savedClass);
    //ユーザーアイコン
    const circle = document.querySelector('.profile-circle');
    circle.classList.add(savedClass);
  });
  //＋ボタン
  const plus = document.querySelector('.plus-buttom');
  plus.classList.add(savedClass);
  //タブのアイコン
  const icons = document.querySelectorAll('#icon');
  icons.forEach(icon => {
    icon.classList.add(savedClass);
  })
  //タブの背景
  const tab = document.querySelector('.tab-list');
  tab.classList.add(savedClass);
}
