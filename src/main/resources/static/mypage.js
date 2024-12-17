// 初期状態の設定
window.addEventListener('DOMContentLoaded', () => {
    //すべての一覧を非表示にする
    document.querySelectorAll('.item-grid').forEach(section => section.style.display = 'none');
    //洋服一覧のみを表示する
    document.getElementById('youhuku-grid').style.display = 'grid';
  });
  

// タブ切り替え（クリックイベント）
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      //すべての一覧のアクティブ状態を解除
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      //クリックされた一覧をアクティブにする
      tab.classList.add('active');
  
      //すべての一覧を非表示にする
      document.querySelectorAll('.item-grid').forEach(section => section.style.display = 'none');
  
      //クリックされたタブに対応する一覧を表示
      if (tab.classList.contains('youhuku')) {
        document.getElementById('youhuku-grid').style.display = 'grid';
      } 
      else {
        if (tab.classList.contains('closet')) {
        document.getElementById('closet-grid').style.display = 'grid';
        }
        else{
            if (tab.classList.contains('tag')) {
                document.getElementById('tag-grid').style.display = 'block';
              }
        }
      } 
    });
});


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
document.querySelectorAll('.color-btn').forEach(button => {
  button.addEventListener('click', event => {
      // すべてのカラーボタンからselectedクラスを削除
      document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('selected'));
      
      // クリックされたボタンにselectedクラスを追加
      const selectedColor = event.target.getAttribute('data-color');
      event.target.classList.add('selected'); // クリックしたボタンに選択状態を追加

      // モードに応じた処理
      switch (selectedColor) {
        case 'white':
          //ヘッダーの色
          document.querySelectorAll('.header').forEach(header => {
              header.style.backgroundColor = '#f0f0f0'; 
          });
          //ヘッダーの文字色
          document.querySelectorAll('.header a,.header button').forEach(header1 => {
            header1.style.color = 'darkblue'; 
          });
          break;

        case 'black':
          //ヘッダーの色
          document.querySelectorAll('.header').forEach(header => {
              header.style.backgroundColor = '#333'; 
          });
          //ヘッダーの文字色
          document.querySelectorAll('.header a,.header button').forEach(header1 => {
            header1.style.color = 'white'; 
          });
          break;

        case 'natural':
          //ヘッダーの色
          document.querySelectorAll('.header').forEach(header => {
              header.style.backgroundColor = '#f5deb3';
          });
          //ヘッダーの文字色
          document.querySelectorAll('.header a,.header button').forEach(header1 => {
            header1.style.color = '#8b4513'; 
          });
          break;

        default:
          break;
      }
  });
});
