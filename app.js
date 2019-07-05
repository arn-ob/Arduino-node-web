var express = require('express');
var path = require('path');
var five = require("johnny-five"),
  board;

// serialport
var serialPort = require("serialport");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 8080;

var router = express.Router();

router.get('/', function (request, response) {
  response.render('index', { title: 'Welcome!' });
});

serialPort.list(function(err, ports) {
    // console.log(setPost)
    let setPost = ports[1].comName
    board = new five.Board({
      port: setPost,
      repl: false,
      debug: false,
    });

  board.on("ready", function() {
    var led = new five.Led(13);

    router.get('/on', function (request, response) {
      led.on();
      response.render('index', { title: 'Welcome!' });
    });

    router.get('/off', function (request, response) {
      led.off();
      response.render('index', { title: 'Welcome!' });
    });
  })
});




app.use('/', router);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
