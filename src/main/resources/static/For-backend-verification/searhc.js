// URLパラメータから検索キーワードを取得
const urlParams = new URLSearchParams(window.location.search);
const searchTermFromUrl = urlParams.get('query'); // 'query'パラメータを取得
 const userId = document.getElementById('userId').value;

document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('categorySelect');
    const itemsList = document.getElementById('itemsList');
    // 初期表示
    fetchAndDisplayItems(userId, 'clothes');
});

    // プルダウンの変更時にデータを取得
    categorySelect.addEventListener('change', function () {
         const categorySelect = document.getElementById('categorySelect');
        const selectedCategory = categorySelect.value;
        fetchAndDisplayItems(userId, selectedCategory);
    });

function fetchAndDisplayItems(userId, category) {
    fetch(`/others/${userId}/ajax/search?category=${category}`, {
        method: 'GET',
          headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest', // AJAXリクエストであることを通知
                },
    })
        .then(response => {
            if (response.headers.get('content-type').includes('application/json')) {
                return response.json(); // JSON形式の場合
            } else {
                throw new Error("サーバーレスポンスがJSONではありません");
            }
        })
        .then(data => {
            console.log("サーバーレスポンス:", data);
            updateItemsList(data, category); // JSONデータを基にHTMLを生成
        })
        .catch(error => console.error("エラー:", error));
}


    // HTMLを生成して表示する
    function updateItemsList(data, category) {
        itemsList.innerHTML = ""; // 表示領域をクリア

        if (category === "clothes") {
            data.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("clothse_button");
                div.innerHTML = `
                    <a href="/item_detail.html?id=${item.id}" class="detail_url">
                        <figure class="clothes_img flex">
                            <img src="${item.imageUrl}" alt="${item.name}">
                            <div class="detail">
                                <p>名前: ${item.name}</p>
                                <p>ブランド: ${item.brandName}</p>
                                <p>${item.description}</p>
                            </div>
                        </figure>
                    </a>
                `;
                itemsList.appendChild(div);
            });
        } else if (category === "storage") {
          // 収納用のHTML生成
                 const storageListDiv = document.createElement("div");
                 storageListDiv.classList.add("main-content");
                 storageListDiv.id = "storageList";

                 data.forEach(storage => {
                     const storageDiv = document.createElement("div");
                     storageDiv.classList.add("clothse_button");
                     storageDiv.id = storage.id;

                     storageDiv.innerHTML = `
                         <a href="/section/${userId}/storages/${storage.id}?storageType=${storage.storageType}" class="detail_url">
                             <figure class="clothes_img">
                                 <img src="${storage.imageUrl}" alt="storage img">
                                 <div class="detail">
                                     <br>名前: <span>${storage.name}</span></br>
                                 </div>
                             </figure>
                         </a>
                     `;
                     storageListDiv.appendChild(storageDiv);
                 });

                 itemsList.appendChild(storageListDiv);
        } else if (category === "tags") {
            data.forEach(tag => {
               const tagElement = document.createElement('a');
                       tagElement.textContent = tag.name; // タグ名を設定
                       tagElement.style.backgroundColor = tag.color; // 背景色をタグの色に設定
                       tagElement.classList.add('tag'); // タグ用のクラスを追加
                       tagElement.href = "#"; // リンク先を設定（必要に応じて変更）

                       // 矢印用の <div> 要素を生成
                       const arrowElement = document.createElement('div');
                       arrowElement.classList.add('arrow'); // 矢印用のクラスを追加
                       arrowElement.style.borderRightColor = tag.color; // 矢印の色をタグの色に設定

                       // 矢印をタグに追加
                       tagElement.appendChild(arrowElement);

                       // タグ要素を表示エリアに追加
                       const div = document.createElement('div');
                       div.classList.add('tag-container'); // 必要ならコンテナ用のクラスを追加
                       div.appendChild(tagElement);
                       itemsList.appendChild(div); // タグ要素をリストに追加
            });
        }
    }

// 検索フィルタリング処理
function filterItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase(); // 入力値を小文字に変換
    const filteredItems = items.filter(item => {
        return item.name.toLowerCase().includes(searchTerm) ||
               item.location.toLowerCase().includes(searchTerm) ||
               item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });
    displayItems(filteredItems);
}

// 検索キーワードがURLパラメータにある場合、検索ボックスに表示
if (searchTermFromUrl) {
    document.getElementById('searchInput').value = searchTermFromUrl;
    filterItems(); // URLパラメータに基づきフィルタリング
} else {
    displayItems(items); // 初期状態で全アイテムを表示
}

// ローカルストレージから履歴を取得、ない場合は空の配列
let searchHistoryList = JSON.parse(localStorage.getItem('searchHistory')) || [];

// 履歴クリック時にその検索語で検索画面に遷移
function handleHistoryClick(query) {
  // 検索画面に遷移 (検索語をURLパラメータとして渡す)
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
}

// 検索履歴を画面に表示する関数
function updateSearchHistory() {
    const searchHistoryElement = document.getElementById('searchHistory');
    searchHistoryElement.innerHTML = '';  // 履歴の内容をクリア

    // 履歴がある場合はリストを生成
    searchHistoryList.forEach(query => {
        const li = document.createElement('li');
        li.textContent = query;
        li.onclick = () => performSearch(query);  // 履歴をクリックしたときにその検索を実行
        searchHistoryElement.appendChild(li);
    });
}

// 検索を実行する関数
function performSearch(query) {
    if (!query) {
        query = document.getElementById('searchInput').value.trim();  // 引数がない場合は入力フィールドの内容を使用
    }

    if (query) {
        // 履歴に検索語を追加
        if (!searchHistoryList.includes(query)) {
            searchHistoryList.unshift(query);  // 新しい検索語を先頭に追加
            if (searchHistoryList.length > 5) {
                searchHistoryList.pop();  // 履歴が5件を超えたら古いものを削除
            }
            localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));  // ローカルストレージに保存
        }

        // 検索画面に遷移 (検索語をURLパラメータとして渡す)
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    } else {
        alert("検索語を入力してください");
    }
}

// ページ読み込み時に履歴を表示
updateSearchHistory();

// ドロップダウンリストの表示・非表示
const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('dropdown');

searchInput.addEventListener('focus', function() {
    dropdown.style.display = 'block';  // 検索欄がフォーカスされたときに履歴を表示
});

searchInput.addEventListener('blur', function() {
    setTimeout(() => {
        dropdown.style.display = 'none';  // 検索欄からフォーカスが外れたときに履歴を非表示
    }, 100);  // 少し遅延させてから非表示にする
});

document.addEventListener('click', function (event) {
    const isClickInside = searchInput.contains(event.target) || dropdown.contains(event.target);
    if (!isClickInside) {
        dropdown.style.display = 'none';  // 検索欄や履歴以外がクリックされた場合、非表示にする
    }
});
