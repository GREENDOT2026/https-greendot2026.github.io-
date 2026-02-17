// DEFAULTS
if(!localStorage.pin) localStorage.pin="1234";
if(!localStorage.balance) localStorage.balance=5000;
if(!localStorage.frozen) localStorage.frozen="false";

function rand4(){ return Math.floor(1000+Math.random()*9000); }

if(!localStorage.cardNumber)
  localStorage.cardNumber=`${rand4()} ${rand4()} ${rand4()} ${rand4()}`;

if(!localStorage.cvv)
  localStorage.cvv=Math.floor(100+Math.random()*900);

if(!localStorage.expiry){
  let y=new Date().getFullYear()+3;
  localStorage.expiry="12/"+y.toString().slice(-2);
}

// LOGIN
const form=document.getElementById("loginForm");
if(form){
form.onsubmit=e=>{
 e.preventDefault();
 location="pin.html";
};
}

// PIN PAD
let pinBuffer="";

function pinPress(n){
 if(pinBuffer.length>=4) return;
 pinBuffer+=n;
 pinDisplay.value="•".repeat(pinBuffer.length);
}

function pinClear(){
 pinBuffer="";
 pinDisplay.value="";
}

function pinSubmit(){
 if(pinBuffer===localStorage.pin)
   location="dashboard.html";
 else alert("Wrong PIN");
}

// DASHBOARD LOAD
setTimeout(()=>{
 if(balance){
  balance.innerText=Number(localStorage.balance).toLocaleString();
  cardNumber.innerText=localStorage.cardNumber;
  cvv.innerText=localStorage.cvv;
  expiry.innerText="EXP "+localStorage.expiry;
  updateFreezeUI();
 }
},50);

// CARD FLIP
function flipCard(){
 bankCard.classList.toggle("flipped");
}

// FREEZE TOGGLE
function toggleFreeze(){
 localStorage.frozen =
   localStorage.frozen==="true" ? "false":"true";
 updateFreezeUI();
}

function updateFreezeUI(){
 const frozen = localStorage.frozen==="true";
 cardStatus.innerText = frozen ? "FROZEN" : "ACTIVE";
 freezeBtn.innerText = frozen ? "Unfreeze Card" : "Freeze Card";
 freezeBtn.style.background = frozen ? "#ef4444" : "#22c55e";
}

// LOGOUT
function logout(){
 location="index.html";
}
function generateCard(){
  function block(){
    return Math.floor(1000 + Math.random()*9000);
  }
  return `${block()} ${block()} ${block()} ${block()}`;
}

if(!localStorage.cardNumber){
  localStorage.cardNumber = generateCard();
}
if(!localStorage.pin){
  localStorage.pin = "1234"; // demo default
}

function checkPin(){
  if(pin.value === localStorage.pin){
    window.location = "dashboard.html";
  } else {
    alert("Wrong PIN");
  }
}
form.onsubmit = e => {
  e.preventDefault();
  window.location = "pin.html";
};
// DEMO DEFAULT DATA
if(!localStorage.balance){
  localStorage.balance = 5000;
  localStorage.txs = JSON.stringify([]);
}

// LOGIN
const form = document.getElementById("loginForm");
if(form){
form.onsubmit = e => {
  e.preventDefault();
  window.location = "dashboard.html";
};
}

// DASHBOARD LOAD
function loadDashboard(){
  const bal = document.getElementById("balance");
  if(!bal) return;

  bal.innerText = "$" + Number(localStorage.balance).toLocaleString();

  const list = document.getElementById("txList");
  list.innerHTML = "";
  JSON.parse(localStorage.txs).reverse().forEach(t=>{
    list.innerHTML += `<li>${t}</li>`;
  });
}

setTimeout(loadDashboard,100);

// SEND
function sendMoney(){
  let amt = Number(sendAmount.value);
  if(amt <= 0) return alert("Invalid amount");

  if(amt > localStorage.balance)
    return alert("Insufficient funds");

  localStorage.balance -= amt;
  addTx("Sent $" + amt + " to " + sendTo.value);
  location.reload();
}

// WITHDRAW
function withdrawMoney(){
  let amt = Number(withdrawAmount.value);
  if(amt <= 0) return alert("Invalid amount");

  if(amt > localStorage.balance)
    return alert("Insufficient funds");

  localStorage.balance -= amt;
  addTx("Withdrew $" + amt);
  location.reload();
}

// TX HELPER
function addTx(t){
  let arr = JSON.parse(localStorage.txs);
  arr.push(new Date().toLocaleString() + " — " + t);
  localStorage.txs = JSON.stringify(arr);
}

// LOGOUT
function logout(){
  window.location = "index.html";
}
