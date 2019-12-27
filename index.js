const mqtt = require("mqtt")
const SerialPort = require("serialport")

const ADD_TOPIC = "addBall"
const REMOVE_TOPIC = "removeBall"
const DEVICE_TOPIC = "deviceCount"

const PORT_NAME = "COM13"
const BAUD_RATE = 115200

const CHAR_DEVICE_ADDED = "+"
const CHAR_DEVICE_REMOVED = "-"

const mqttClient = mqtt.connect("mqtt://localhost:1883")

const port = new SerialPort(PORT_NAME, {
  baudRate: BAUD_RATE
})


port.on("data", function (rawData) {
  checkDeviceCount(rawData[0])
  printDeviceCount(rawData)
})


function checkDeviceCount(data) {
  if (String.fromCharCode(data) === CHAR_DEVICE_ADDED) {
    console.log("+ Add Device +")
    mqttClient.publish(ADD_TOPIC);
  }
  if (String.fromCharCode(data) === CHAR_DEVICE_REMOVED) {
    console.log("- Remove Device -")
    mqttClient.publish(REMOVE_TOPIC);
  }
}

function printDeviceCount(rawData) {
  const deviceCount = parseInt(rawData)
    if (deviceCount) {
      console.log("Devices: " + deviceCount)
      mqttClient.publish(DEVICE_TOPIC, deviceCount.toString());
    }
}

mqttClient.on("connect", function () {
  console.log("Mqtt connection established.");
});

mqttClient.on("close", function () {
  console.log("Can't connect to mqtt broker.");
});
