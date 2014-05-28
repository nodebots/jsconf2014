## Welcome to JSConf 2014!

How do I get started with with [Node](http://nodejs.org/) on [Spark](https://www.spark.io/)?

If you don't have [node.js](http://nodejs.org/), download the [installer](http://nodejs.org/) for your platform, and run it!

You will need the [spark-cli](https://github.com/spark/spark-cli) package installed to control the spark core over serial. Run this command:

`npm install -g spark-cli`

Then, **plug in your spark core** and type the following to create an account and claim your spark.

`spark setup`

Follow the directions. Take note of your token and core id and save it for later:

```Got an access token! CAFED00DCAFED00DCAFED00DCAFED00DCAFED00D```

```Your core id is: DEADBEEFDEADBEEFDEADBEEF```

It will ask you for WiFi information, so enter the following

```
SSID: ??????
Security: WPA2
Wifi Password: ??????
```

* Next, in order for spark to be able to talk to node, you should flash it with the [voodoospark](https://github.com/voodootikigod/voodoospark) firmware.

```spark cloud flash YOUR_CORE_ID voodoospark.cpp```

If that succeeded, you are now ready to talk to your spark via node!

Try this simple program to blink an LED:

```
var five = require("johnny-five");
var Spark = require("spark-io");
var board = new five.Board({
  io: new Spark({
    token: 'YOUR_TOKEN',
    deviceId: 'YOUR_CORE_ID'
  })
});

board.on("ready", function() {
  var led = new five.Led("D7");
  led.blink();
});
```

Did it work? Awesome! You can find more examples on how to use things like [Servo Motors](https://github.com/rwaldron/johnny-five/wiki/Servo) at the [Johnny-Five Docs](https://github.com/rwaldron/johnny-five/wiki). Remember that servos can only be used on PWM pins - on Spark, this means: A0, A1, D0, D1.

Didn't work? Things to check:

* Is the light on the spark core slowly fading on and off (breathing) in cyan? If not something went wrong at the connection stage. Try the `spark setup` step again.


