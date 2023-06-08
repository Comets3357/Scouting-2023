const { ipcRenderer } = require("electron");

const SERVICE_UUID = "974f9e8a-124d-43a8-8896-9a5ba15526be";
const CHARACTERISTIC_UUID = "03029100-6d76-46c9-b233-7614d893a6ac";

const statusLabel = document.getElementById("statusLabel");
const connectButton = document.getElementById("connectButton");

let matchKey = "";
let lastValue = "";
let convert = false;

var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "Scouter",
  password: "Data2Banner",
  database: "2023_scouting",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

ipcRenderer.on("key", (event, arg) => {
  matchKey = arg;
});

connectButton.addEventListener("click", connect);

function displayStatus(status) {
  statusLabel.innerHTML = status;
}

async function connect() {
  displayStatus("Searching devices for service " + SERVICE_UUID);

  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "COMET4" }],
      optionalServices: ["974f9e8a-124d-43a8-8896-9a5ba15526be"],
    });
    displayStatus("Found device " + device.name + " with service");

    const server = await device.gatt.connect();
    displayStatus("Connected to GATT server");

    const service = await server.getPrimaryService(SERVICE_UUID);
    displayStatus("Connected to service " + SERVICE_UUID);

    const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);
    setInterval(async () => {
      try {
        let readData = await characteristic.readValue();
        let value = "'" + matchKey.substring(0, matchKey.length - 1) + "_qm"; // set up matchKey to format in the style of 2023mimus_qm69 - "69", the match number, will add first thing in the loop below
        if (readData.byteLength > 0) {
          for (let i = 0; i < readData.byteLength; i++) {
            if (readData.getUint8(i) == 255) {
              value = value + "','";
            } else if (readData.getUint8(i) == 253) {
              convert = true;
            } else if (readData.getUint8(i) == 254) {
              convert = false;
            } else {
              if (convert == true) {
                value = value + String.fromCharCode(readData.getUint8(i));
              } else {
                value = value + readData.getUint8(i);
              }
            }
          }
          value = value + "'";
          if (value != lastValue) {
            console.log("Tablet 4: " + value);
            lastValue = value;
            displayStatus(value);

            var sql = `INSERT INTO match_data (matchNumber, tablet, teamnumber, scouter, timestamp, gamepiecepreload, automove, autogamepiecesaqquired, autoplacetr, autoplacemr, autoplacebr, autochargestation, automidline, telegamepiecesaqquired, teleplacetr, teleplacemr, teleplacebr, chargestation, playeddefense, wasdefended) VALUES (${value})`;
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("Tablet 4: Data inserted to database");
            });
          } else {
            console.log("Tablet 4: Repeat");
          }
        }
      } catch (error) {
        displayStatus("Error: " + error);
      }
    }, 10000);
  } catch (error) {
    displayStatus("Error: " + error);
  }
}
