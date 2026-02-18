const users = {
  michelle: {
    name: "Michelle Ann",
    balance: 175000,
    transactions: []
  },
  david: {
    name: "David Brooks",
    balance: 82000,
    transactions: []
  }
};

if (!localStorage.getItem("currentUser")) {
  localStorage.setItem("currentUser", "michelle");
}

function getUser() {
  const key = localStorage.getItem("currentUser");
  return users[key];
}

function saveUser(user) {
  const key = localStorage.getItem("currentUser");
  users[key] = user;
}
// Default data
if (!localStorage.getItem("balance")) {
  localStorage.setItem("balance", "175000");
}

if (!localStorage.getItem("transactions")) {
  localStorage.setItem("transactions", JSON.stringify([]));
}

// Helpers
function getBalance() {
  return parseFloat(localStorage.getItem("balance"));
}

function setBalance(amount) {
  localStorage.setItem("balance", amount.toFixed(2));
}

function addTransaction(title, amount) {
  const tx = JSON.parse(localStorage.getItem("transactions"));
  tx.unshift({
    title,
    amount,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem("transactions", JSON.stringify(tx));
}
<button onclick="switchUser()">Switch User</button>

<script>
function switchUser() {
  const current = localStorage.getItem("currentUser");
  localStorage.setItem(
    "currentUser",
    current === "michelle" ? "david" : "michelle"
  );
  location.reload();
}
</script>
