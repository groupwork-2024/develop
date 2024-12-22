const cp_sl06 = document.querySelector(".cp_sl06"); //最初のclassの取得

//初期値の設定
const startfilteredStorage = storageArray.filter(item => item.storage_type === 'CLOSET');
// storageListを更新する処理
updateStorageList(startfilteredStorage);


//セレクトボックスが変更されたときの処理
cp_sl06.addEventListener('change', function() {
  const selectedValue = cp_sl06.value;
  const filteredStorage = storageArray.filter(item => item.storage_type === selectedValue.toUpperCase());
  // storageListを更新する処理
  updateStorageList(filteredStorage);
});

  //収納をクリックするとページを背にする処理
  function goToClothesPage(name,storage_type){
    storage_type=storage_type.toLowerCase();
    window.location.href = `detail_${storage_type}.html?name=${name}`;
  } 
}


