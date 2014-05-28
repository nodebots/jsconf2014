var Spark = require("spark-io");
var five = require("johnny-five");

var spark = new Spark({

// Get this from https://www.spark.io/build and click on settings
  token: "YOUR TOKEN",

// Get this from the cli or https://www.spark.io/build
// It can be the device ID or friendly name
  deviceId: "YOUR DEVICE ID"
});

var board = new five.Board({
  io: spark
});

board.on("ready", function() {
  // Create a new led object using the built in LED on D7
  var led = new five.Led("D7");
  led.blink(1000);
});