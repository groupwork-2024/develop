// URLパラメータから検索キーワードを取得
const urlParams = new URLSearchParams(window.location.search);
const searchTermFromUrl = urlParams.get('query'); // 'query'パラメータを取得

// アイテムリストのデータでとりあえずくん
const items = [
    { id: 1, name: "クローゼット", location: "リビング", tags: ["収納", "洋服"] },
    { id: 2, name: "タンス", location: "寝室", tags: ["収納"] },
    { id: 3, name: "収納袋", location: "倉庫", tags: ["収納", "布"] },
    { id: 4, name: "洋服", location: "クローゼット", tags: ["夏", "ワンピース"] }
];

// アイテムをHTMLに表示する関数
function displayItems(filteredItems) {
    const itemsListContainer = document.getElementById('itemsList');
    itemsListContainer.innerHTML = ''; // 既存のリストをクリア

    filteredItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('clothse_button');
        itemDiv.innerHTML = `
            <a href="item_detail.html?id=${item.id}" class="detail_url">
                <figure class="clothes_img">
                    <img src="../img/clothes.png" alt="${item.name}">
                    <div class="detail">
                        <br>名前: ${item.name}</br>
                        <br>収納場所: ${item.location}</br>
                        <br>タグ: ${item.tags.join(', ')}</br>
                    </div>
                </figure>
            </a>
        `;
        itemsListContainer.appendChild(itemDiv);
    });
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