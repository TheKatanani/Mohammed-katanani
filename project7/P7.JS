
//////////////////////momaryGame

// localStorage.setItem("rank",JSON.stringify(rank)); 
topRankpage();
class topRank{

    constructor(pName,time,tries){
        this.pName=pName;
        this.time=time;
        this.tries=tries;
    }
}
//tries and pName
let tries = document.querySelector(".wrong span");
let pName =document.querySelector(".front .hello span");
let time = document.querySelector(".front  .timeDawn");

//start audio//
let wellDone=document.getElementById("well-done");
let success=document.getElementById("success");
let fail=document.getElementById("fail");
let gameOverAudio=document.getElementById("game-over");
//end audio//
let start =document.querySelector(".control-buttons span");

let timeDawn=document.querySelector(".timeDawn");
let countar;
function cuntDown(){
  timeDawn.innerHTML -=1;
  if( timeDawn.innerHTML =="0")
  clearInterval(countar);}
//
//gameOver
let momaryGame =document.querySelector(".momaryGame ");
function addGameOver(){
    let gameOver=document.createElement("div");
    gameOver.classList.add("gameOver");
    momaryGame.appendChild(gameOver);
}
function gameOver(){
  gameOverAudio.play();
    addGameOver();
   setInterval(()=>window.location.reload(),3000);
}
//good
function addWellDone(){
    wellDone.play();
    let WellDone=document.createElement("div");
    WellDone.classList.add("WellDone");
    momaryGame.appendChild(WellDone);
}
function WellDone(){

    let  rank= JSON.parse(localStorage.getItem("rank")) || [];
    let tries = document.querySelector(".wrong span");
    let pName =document.querySelector(".front .hello span");
    let time = document.querySelector(".front  .timeDawn");
    let player=new topRank(pName.innerHTML,time.innerHTML,tries.innerHTML);
    rank.push(player);
    localStorage.setItem("rank",JSON.stringify(rank)); 
       addWellDone();
       topRankpage();

    setInterval(()=>window.location.reload(),3000);
}
//
let contenar =document.querySelector(".momaryGame .contenar");
let boxes =Array.from(contenar.children);
// let orderRange=Array.from(Array(boxes.length).keys());
let orderRange=[...Array(boxes.length).keys()];
//start game
start.addEventListener('click',function() {
    let pName =prompt("what your pName");
     if(pName==null||pName=="")
     document.querySelector(".front .hello span").innerHTML="unKnow";
     else 
     document.querySelector(".front .hello span").innerHTML=pName;

     document.querySelector(".control-buttons").style.display="none";
     countar=setInterval(cuntDown,1000);
     setTimeout(gameOver,60000);
     boxes.forEach(box=>box.classList.add("flipped"));
     setTimeout(()=>boxes.forEach(box=>box.classList.remove("flipped")),5000);
});

shuffle(orderRange);
boxes.forEach((b,i)=>{
    b.style.order=orderRange[i];
    b.addEventListener("click",function(){
    flipbox(b);
    });
 
})
function flipbox(sBox){
    sBox.classList.add("flipped");
    let flippedAll=[...document.querySelectorAll(".flipped")];
    if(flippedAll.length==2){
      stopClicking();
      combern(flippedAll[0],flippedAll[1]);
    }

}
let hasMath=0;

function combern(f,s){

    if(f.dataset.social===s.dataset.social){
       success.play();
        f.classList.remove("flipped");
        s.classList.remove("flipped");

        f.classList.add("has-math");
        s.classList.add("has-math");
        hasMath++;
        if(hasMath==10){
            WellDone();
        }
    }
 
    else{
      fail.play();
        setTimeout(()=>{
            f.classList.remove("flipped");
            s.classList.remove("flipped");
        },700);
        tries.innerHTML=parseInt(tries.innerHTML)+1;
    }
}
function stopClicking(){
    boxes.forEach(box=>box.classList.add("no-click"));
    setTimeout(()=>{
        boxes.forEach(box=>box.classList.remove("no-click")) ;
    },800);
}
  
function shuffle(array){
    let current=array.length, random;
    while(current>0){
        random = Math.floor(Math.random() * current);
        current--;
      [array[random],array[current]]=[array[current],array[random]]
    }
}
function topRankpage(){
  //  localStoreg
  let one=document.querySelectorAll(".topRecord tr .one");
  let two=document.querySelectorAll(".topRecord tr .two");
  let three=document.querySelectorAll(".topRecord tr .three");
let  rank= JSON.parse(localStorage.getItem("rank"))||[] ;
 //  rank=JSON.parse(localStorage.getItem("rank"));
  rank.sort((a,b)=>a.tries-b.tries);
  rank.sort((a,b)=>b.time-a.time);
  console.log(rank);
  if(rank.length>2){

  one[0].innerHTML=rank[0].pName ;
  one[1].innerHTML=rank[0].tries ;
  one[2].innerHTML=rank[0].time ;

  two[0].innerHTML=rank[1].pName ;
  two[1].innerHTML=rank[1].tries ;
  two[2].innerHTML=rank[1].time ;

  three[0].innerHTML=rank[2].pName ;
  three[1].innerHTML=rank[2].tries ;
  three[2].innerHTML=rank[2].time ;
  }
}
//   console.log();
