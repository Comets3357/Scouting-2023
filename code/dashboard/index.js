const { ipcRenderer } = require('electron');

const statusLabel = document.getElementById("statusLabel");
const submitButton = document.getElementById("submitButton");

var matchKey = "";

submitButton.addEventListener("click", setMatchKey);

function displayStatus(status) {
  statusLabel.innerHTML = status;
}

function setMatchKey() {
  var input = document.getElementById("inputText").value;
  displayStatus("Match key set to '" + input + "'");
  matchKey = input + ",";

  ipcRenderer.send('key', matchKey);
}