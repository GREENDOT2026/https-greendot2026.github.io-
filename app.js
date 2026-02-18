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
