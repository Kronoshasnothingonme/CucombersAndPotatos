let money = 1000;

function show(id){
  document.querySelectorAll(".section").forEach(s=>s.style.display="none");
  document.getElementById(id).style.display="block";
}

// 🎰 BLACKJACK
function draw(){ return Math.floor(Math.random()*10)+1; }

function blackjack(){
  let p = draw()+draw();
  let d = draw()+draw();

  let result = "";

  if(p > d){
    money += 100;
    result = "Win!";
  } else {
    money -= 100;
    result = "Lose!";
  }

  document.getElementById("casinoOut").innerText =
  `You:${p} Dealer:${d}\n${result}\nMoney:$${money}`;
}

// 🏋️ FORGE FIT
function forgeFit(){
  let w = prompt("Weight?");
  let h = prompt("Height?");
  let a = prompt("Age?");
  let g = prompt("Gender?");

  document.getElementById("forgeOut").innerText =
`Workout:
Pushups, Situps, Cardio

Diet:
Protein, Water, Balanced meals

Hygiene:
Shower daily

(${w},${h},${a},${g})`;
}let money = 1000;

function show(id){
  document.querySelectorAll(".section").forEach(s=>s.style.display="none");
  document.getElementById(id).style.display="block";
}

// 🎰 BLACKJACK
function draw(){ return Math.floor(Math.random()*10)+1; }

function blackjack(){
  let p = draw()+draw();
  let d = draw()+draw();

  let result = "";

  if(p > d){
    money += 100;
    result = "Win!";
  } else {
    money -= 100;
    result = "Lose!";
  }

  document.getElementById("casinoOut").innerText =
  `You:${p} Dealer:${d}\n${result}\nMoney:$${money}`;
}

// 🏋️ FORGE FIT
function forgeFit(){
  let w = prompt("Weight?");
  let h = prompt("Height?");
  let a = prompt("Age?");
  let g = prompt("Gender?");

  document.getElementById("forgeOut").innerText =
`Workout:
Pushups, Situps, Cardio

Diet:
Protein, Water, Balanced meals

Hygiene:
Shower daily

(${w},${h},${a},${g})`;
}
