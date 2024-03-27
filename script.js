const passLen=document.querySelector("#passLen");
const passLenLabel=document.querySelector("#passLenLabel")
const upperCaseFlag=document.querySelector("#upp");
const lowerCaseFlag=document.querySelector("#lwr");
const numberFlag=document.querySelector("#nmb");
const symbolFlag=document.querySelector("#sym");
const checkBoxes=document.querySelectorAll(".checkbox")
const generateButton=document.querySelector("#generateButton");
const symbolSet="!@#$%*?,.+-_";
const passWordBox=document.querySelector("#pass");
const copyButton=document.querySelector("#copy");

let password="";
let defaultLen=8;
let checkBoxCount=0;
passLen.value=defaultLen;


function getRandomInt(min,max){
    // max excluded
    return Math.floor((Math.random()*(max-min))+min)
}
function generateDigit(){
    return getRandomInt(0,10);
}
function generateUpper(){
    return String.fromCharCode(getRandomInt(65,91));
}
function generateLower(){
    return String.fromCharCode(getRandomInt(97,123));
}
function generateSymbol(){
    return symbolSet[getRandomInt(0,symbolSet.length)];
}

function shufflePassword(){
    let arr=password.split("");
    //fisher yates method
    for(let i=arr.length-1;i>=0;i--){
        let j=getRandomInt(0,arr.length); 
        let temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
    password=arr.join("");
}
function countCheckBoxes(){
    checkBoxCount=0;
    checkBoxes.forEach((ch) => {
        if(ch.checked) checkBoxCount++;
    })
    if(passLen.value<checkBoxCount)passLen.value=checkBoxCount;
    passLenLabel.innerText=passLen.value;
}
checkBoxes.forEach((ch)=>{
    ch.addEventListener("change",countCheckBoxes)
})
passLen.addEventListener("input",(e)=>{
    passLenLabel.innerText=passLen.value;
})
generateButton.addEventListener("click",(e)=>{
    copyButton.value="Copy"
    password="";
    let arrOfFunction=[];
    checkBoxes.forEach((ch) => {
        if(ch.checked){
            if(ch==upperCaseFlag){
                arrOfFunction.push(generateUpper);
            }
            else if(ch==lowerCaseFlag){
                arrOfFunction.push(generateLower);
            }
            else if(ch==numberFlag){
                arrOfFunction.push(generateDigit);
            }
            else if(ch==symbolFlag){
                arrOfFunction.push(generateSymbol);
            }
        }
    })
    countCheckBoxes();
    if(checkBoxCount==0){
        return;
    }
    let k=Number(passLen.value);
    for(let i=0;i<arrOfFunction.length;i++){
        let char=arrOfFunction[i]();
        password+=char;
        k--;
    }
    for(let i=0;i<k;i++){
        let char=arrOfFunction[getRandomInt(0,arrOfFunction.length)]();
        password+=char;
    }
    shufflePassword();
    passWordBox.value=password;
    copyButton.addEventListener("click",(e)=>{
        navigator.clipboard.writeText(password);
        copyButton.value="Copied";
    })
})


