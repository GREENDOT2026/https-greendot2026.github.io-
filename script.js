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
