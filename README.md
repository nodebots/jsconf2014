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

* Do you have a servo that's not turning? Make sure it's plugged in to one of the PWM pins - A0, A1, D0 and D1.

* If the spark core is blinking green for a really long time during the WiFi connection phase, it's possible that the WiFi network is saturated and the spark can't connect. Try a different WiFi network, or wait a little while. 

* If your spark is not connecting to the node program, it's possible the firmware flash didn't take. You can debug this with curl command:

```
curl -m 3 "https://api.spark.io/v1/devices/{YOUR_CORE_ID}/endpoint?access_token={YOUR_TOKEN}"
```

* ..if it was a success, you should see a JSON document returned with the local IP address of your spark. You can ping this address to further debug. If you can hit it, the problem might be with your node script!


