// 洋服一覧を表示する場所を取得
const clothesListContainer = document.getElementById('clothseListDisplay');
const userId = document.getElementById('userId').value;

  setEventListeners();
  deleteClothes();
  // 再描画後に削除ボタンのイベントを再設定
  function deleteClothes() {
  document.querySelectorAll('.delete_button').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const clothesId = this.getAttribute('data-id');
      if (confirm('本当に削除しますか？')) {
        fetch(`/api/clothes/${clothesId}`, { method: 'POST' })
          .then(response => {
              console.log(response);
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


// サーバーからデータを取得してリストを再描画する関数
function renderClothes() {
  // サーバーからデータを取得
  fetch(`/api/clothes/${userId}`) // APIエンドポイントを指定
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
        imageElement.src = clothes.imageUrl || '../img/youfuku_test.png'; // サーバー側のプロパティ名に合わせる
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

      // 各ボタンのイベントリスナーを再設定
        setEventListeners();
        deleteClothes();
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
  editLocationInput.value = clothes.location;
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
    clothes.location = editLocationInput.value;
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

