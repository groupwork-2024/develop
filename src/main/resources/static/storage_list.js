const cp_sl06 = document.querySelector(".cp_sl06"); //最初のclassの取得
const clothes = document.querySelectorAll(".clothes"); 
const detail =  document.querySelector(".detail");

//初期値の設定
ProcessingInstruction(cp_sl06.value);

//収納選択後の処理
cp_sl06.addEventListener("change",function(){
  ProcessingInstruction(cp_sl06.value);
});

//データを取得※仮置き
fetch('')
.then(response=>response.json())
.then(data => {
  data.forEach(item=>{
    const option=document.createElement("option");
    option.value = item.id;
    option.textContent=item.name;
    cp_sl06.appendChild(option);
  });
});


//表示内容を変える処理
function ProcessingInstruction(){
  clothes.forEach(content => content.style.display="none");
  const selectedValue = cp_sl06.value;
  if(selectedValue){
    const selectedContent=document.getElementById(selectedValue)
    if (selectedContent) {
      selectedContent.style.display = 'block';
    }
  }
}