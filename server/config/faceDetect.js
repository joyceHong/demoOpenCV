var cv = require('opencv');
var fs=require('fs');
var camWidth = 320;
var camHeight = 240;
var camFps = 10;
var camInterval = 1000 / camFps;

// face detection properties
var rectColor = [0, 255, 0];
var rectThickness = 2;
var filename="./node_modules/opencv/tmp/image.png";
// initialize camera
var camera = new cv.VideoCapture(0);
camera.setWidth(camWidth);
camera.setHeight(camHeight);

module.exports = function (socket) {
  setInterval(function() {
    camera.read(function(err, im) {
      if (err) throw err;

      im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt2.xml', {}, function(err, faces) {
        if (err) console.log(err);

        for (var i = 0; i < faces.length; i++) {
          face = faces[i];
          im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness);
        }
        im.save("./node_modules/../../client/image.png");

        fs.readFile("./node_modules/../../client/image.png", function (err, data) {
          if (err) throw err;
          console.log(data);
          socket.emit('frame', { buffer: new Buffer(data).toString('base64') });
        });
      });
    });
  }, camInterval);
};