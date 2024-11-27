function toggleSidebar() {
    //document.getElementById:HTML内の特定の要素を取得するためのメソッド
    //const:再代入できない変数を宣言するためのもの
    const sidebar = document.getElementById('sidebar'); 

    //サイドバーを閉じる作業
    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';

        // document.querySelectorAll：すべての <li> 要素を取得
        const listItems = document.querySelectorAll('li');
        // 各 <li> 要素に対して display: none を設定(表示を消す作業)
         listItems.forEach(item => {
            item.style.display = 'none';
         });
    } 
    //サイドバーを開く作業
    else {
        sidebar.style.width = '250px';

        // すべての <li> 要素を取得
        const listItems = document.querySelectorAll('li');
        //各 <li> 要素に対して display: block を設定(表示を元に戻す作業)
        listItems.forEach(item => {
            item.style.display = 'block';
         });
    }
}

// 写真リスト
const photos = ["https://thumb.ac-illust.com/bb/bb155844e2d3b16f4342bad7a96e8847_w.jpeg", 
                "photo2.jpg", 
                "photo3.jpg"];
let currentPhotoIndex = 0;

// 写真を切り替える関数
function showPhoto(index) {
    const sliderPhoto = document.getElementById("slider-photo");
    sliderPhoto.src = photos[index];
}

// 前の写真へ
function previousPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(currentPhotoIndex);
}

// 次の写真へ
function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(currentPhotoIndex);
}

// 写真を選択する関数
function selectPhoto(index) {
    currentPhotoIndex = index;
    showPhoto(currentPhotoIndex);
}
