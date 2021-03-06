var socket = io.connect('http://localhost');
var canvas = document.getElementById('canvas-video');
var context = canvas.getContext('2d');
var img = new Image();
// show loading notice
context.fillStyle = '#333';
context.fillText('Loading...', canvas.width/2-30, canvas.height/3);

socket.on('frame', function (data) {
  console.log(data);
  img.onload = function () {
      context.drawImage(this, 0, 0, canvas.width, canvas.height);
  };
  img.src = 'data:image/png;base64,' + data.buffer;
});