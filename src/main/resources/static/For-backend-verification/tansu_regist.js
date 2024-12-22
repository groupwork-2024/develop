// セレクトボックスの要素を取得
const storageTypeSelect = document.getElementById('storageType');
// 数の入力値
const levelsInput = document.getElementById('levels');

// タンスへの素材にIDを追加するカウンタ
let uniqueIdCounter = 0;
var tansuData = new Array;
const singleItemId = 'square-item';

// 削除モードの状態を管理
let isDeleteMode = false;

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

// 名前フィールドの情報ボタン
document.getElementById('infoButton-name').addEventListener('click', function() {
  alert("タンスに名前を付けることができます。\n例: 下着, 靴下, 肌着");
});

// ボタンのクリックイベント: 情報ボタンをクリックしたときの動作
document.getElementById('infoButton-levels').addEventListener('click', function() {
  //段数か引き出しの最大数を選んでいるかを格納する
  const selectedValue = storageTypeSelect.value;

  if (selectedValue === 'levels') {
    alert("タンスの段数を入力してください。\n段数は1から10の範囲で指定できます。");
  } else if (selectedValue === 'drawers') {
    alert("タンスの幅に対して、一番多い引き出しの個数を入力してください。\n引き出しの最大数は1から5の範囲で指定できます。");
  }
});

// 素材をクリックしたときの処理
function handlePartClick() {
  console.log(`Selected item with ID: ${singleItemId}`);
}


// 段か追加されたとき、素材も追加する処理
function FarstPart(targetLevel,levelIndex) {
  //段数か引き出しか今選ばれているやつを取得
  const selectedValue = storageTypeSelect.value;

  if (targetLevel) {
    // 素材を複製
    const newItem = document.getElementById(singleItemId).cloneNode(true);

    //選ばれてる奴によってスタイルを変更させる
    newItem.classList.add(selectedValue === 'levels' ? 'dropped-part' : 'drawers-dropped-part');
    targetLevel.style.flexDirection = selectedValue === 'levels' ? 'row' : 'column';

    // 段ごとの配列にIDを追加
    if (!tansuData[levelIndex]) {
      console.log("配列を生成しました")
      tansuData[levelIndex] = []; // 配列がなければ作成
    }

    // 段に素材を追加
    targetLevel.appendChild(newItem);

    //配列の個数でアイテムのidを設定
    newItem.id = tansuData[levelIndex].length;

    //配列にidを追加
    tansuData[levelIndex].push(newItem.id);

    console.log(`Item ${newItem.id} added to level ${levelIndex + 1}`);
    console.log(tansuData[levelIndex]);
  }
}

// 段をクリックしたとき,素材を追加する処理
function handleLevelClick(event, levelIndex) {
  //削除モードのときは何もさせない
  if(isDeleteMode==true){
    handleDeliteClick(event, levelIndex);
    console.log("削除モードなので追加しないです")
    return;
  }
  console.log(isDeleteMode);

  // 素材を追加する対象の段
  const targetLevel = event.target.closest('.tansu-level');

  //段数か引き出しか今選ばれているやつを取得
  const selectedValue = storageTypeSelect.value;

  if (targetLevel) {
    // 素材を複製
    const newItem = document.getElementById(singleItemId).cloneNode(true);

    //選ばれてる奴によってスタイルを変更させる
    newItem.classList.add(selectedValue === 'levels' ? 'dropped-part' : 'drawers-dropped-part');
    targetLevel.style.flexDirection = selectedValue === 'levels' ? 'row' : 'column';

    if(tansuData[levelIndex].length >= 5){
      alert("引き出しがこれ以上はいりません");
      return;
    }

    // 段に素材を追加
    targetLevel.appendChild(newItem);

    //配列の個数でアイテムのidを設定
    newItem.id = tansuData[levelIndex].length;
    console.log(newItem.id);

    //配列にidを追加
    tansuData[levelIndex].push(newItem.id);

    console.log(`Item ${newItem.id} added to level ${levelIndex + 1}`);
    console.log(tansuData[levelIndex]);
  }
}

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
      tansuPart.innerHTML = `<span class="backStr">${i + 1}</span>`

      // 段にクリックイベントを追加
      tansuPart.addEventListener('click', (event) => handleLevelClick(event, i));

      // 段ごとのデータ配列を初期化
      tansuData[`${i}`] = []; // ここで各段の配列を作成

      //段数に一段デフォルトで設定させる関数呼び出し
      FarstPart(tansuPart,i);

      //タンス表示エリアに追加
      tansuContainer.appendChild(tansuPart);
  }
}

// 素材をクリックして選択するためのイベント設定
function initializeParts() {
  const partsContainer = document.getElementById('parts-container');

  // 素材をクリックした時のイベントリスナーを追加
  partsContainer.querySelectorAll('.part').forEach(part => {
    part.addEventListener('click', handlePartClick);
  });
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
  const selectedValue = storageTypeSelect.value;

  // 初期のセレクトボックスの値に基づいて処理を変更
  storageTypeChenfe(selectedValue);

  // セレクトボックスを変更したとき、情報を再び取得する
  storageTypeSelect.addEventListener('change', function() {
    const selectedValue = storageTypeSelect.value;
    console.log('選択された値:', selectedValue);
    storageTypeChenfe(selectedValue);
  });

  // 素材をクリックして選択するためのイベント設定
  initializeParts();
});

//セレクトボックスを変更したときに行う処理
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

// ごみ箱アイコンをクリックした時に削除モードを切り替え
document.getElementById('trash').addEventListener('click', function() {
  isDeleteMode = !isDeleteMode;
  if (isDeleteMode) {
    console.log('削除モードに入りました');
    this.style.color = 'red';
  } else {
    console.log('削除モードを解除しました');
    // ごみ箱アイコンを元に戻す
    this.style.color = 'rgb(69, 69, 69)'; // 元の色に戻す
  }
});

//削除モードのときに段をクリックしたときアイテムをけす
function handleDeliteClick(event, levelIndex){
  // 素材を削除する対象の段
  const targetLevel = event.target.closest('.tansu-level');
  console.log(targetLevel);

  // 段にアイテムが存在する場合
  if (tansuData[levelIndex].length > 1) {
    // 段の最後のアイテムを入れる
    const itemToDelete = targetLevel.children[targetLevel.children.length - 1];
    console.log(itemToDelete);

    // アイテムを削除
    targetLevel.removeChild(itemToDelete);

    //配列からデータを一つ削除
    tansuData[levelIndex].pop();

    console.log(tansuData[levelIndex]);
  }
  else{
    alert("これ以上は消せません");
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

  // 入力欄に空白がないかチェック
  if (name === "" || levels === "" || tansuContainer === "") {
    alert("すべての項目を入力してください");
    return;  // 空欄があれば処理を中止
  }

  // 複製した要素に新しいIDを設定
  // 確認画面のタンスのレイアウト部分
  tansuLayout.id = "review-tansu-layout";

  // モーダル内にフォームデータを表示
  document.getElementById("reviewName").innerHTML = `<a>名前</a><br>${name}`;
  document.getElementById("reviewLevel").innerHTML = `<a>段数</a><br>${levels}`;
  document.getElementById("reviewlayout").innerHTML = `<a>レイアウト</a><br>`;

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

//完了確認メッセージ関連
// 登録データを登録後に完了メッセージを表示
registerButton.addEventListener("click", () => {
    console.log("registerData関数が呼び出されました");
    const userId = document.getElementById('userId').value;

    // データの準備
    const formData = new FormData();
    const name = document.getElementById("name").value;

    const storageType = document.getElementById("storageType").value; // "levels"または"drawers"
    let drawerCount;
    if (storageType === "levels") {
      drawerCount = parseInt(document.getElementById("levels").value, 10); // 段数を取得
    } else if (storageType === "drawers") {
      drawerCount = parseInt(document.getElementById("levels").value, 10); // 引き出しの数を取得
    }
    // 画像要素を生成
    let imgElement = document.createElement("img");
    imgElement.src = "/img/clothes.png";

// imgElement.src のURLからバイナリデータに変換
fetch(imgElement.src)
  .then(response => response.blob()) // Blobに変換
  .then(blob => {
    formData.append("image", blob); // ファイル名も指定する
    formData.append("name", name);
    formData.append("drawer-count", drawerCount);

    // fetchでデータを送信
    fetch(`/register/${userId}/storages/dresser`, {
      method: "POST",
      body: formData
    })
    .then(response => {
    console.log(response);
      if (response.ok) {
       // 確認画面を非表示にする
        reviewModal.style.display = 'none';

                      // 登録完了メッセージを表示
        registerModal.style.display = 'flex';

        console.log("データ送信成功");
      } else {
        console.error("データ送信中にエラーが発生しました");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  })
  .catch(error => console.error("Blob変換エラー:", error));
});

// セレクトボックスで選んだものによって遷移先を変更させる
const selectOption = document.getElementById('selectOption');

// セレクトボックスの選択肢が変更されたときの処理
selectOption.addEventListener('change', function() {
  const selectedValue = selectOption.value;

  setTimeout(function() {
    if (selectedValue === '2') {
      window.location.href = 'add_clothes.html';
    }
    else if (selectedValue === '3') {
      window.location.href = 'index_clothes.html';
    }
  }, 800); // （0.8秒）後に遷移
});
