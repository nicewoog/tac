var canvas01;
var context;

var oldX;
var oldY

$(document).ready(function(){
  console.log('canvas.js loaded');
  canvas01 = document.getElementById('canvas01'); // 내부적으로 캔버스 타입이 된다.
  context = canvas01.getContext("2d");

  canvas01.addEventListener("touchstart", onTouchStart, false);
  canvas01.addEventListener("touchmove", onTouchMove, false);
  canvas01.addEventListener("touchend", onTouchEnd, false);
});

function onTouchStart(event) { // event 객체를 브라우저가 알아서 넘겨준다.
  event.preventDefault(); // 객체의 기본동작을 중지시킨다.
  var touch = event.touches[0] || event.changedTouches[0];

  var curX = touch.pageX - canvas01.offsetLeft;
  var curY = touch.pageY - canvas01.offsetTop;

  console.log('onTouchStart : ' + curX + ', ' + curY);

  oldX = curX;
  oldY = curY;
}

function onTouchMove(event) {
  event.preventDefault();
  var touch = event.touches[0] || event.changedTouches[0];

  var curX = touch.pageX - canvas01.offsetLeft;
  var curY = touch.pageY - canvas01.offsetTop;

  //console.log('onToucheMove : ' + curX + ', ' + curY);

  context.beginPath();
  context.moveTo(oldX, oldY);
  context.lineTo(curX, curY);
  context.closePath();

  context.stroke();

  oldX = curX;
  oldY = curY;
}

function onTouchEnd(event) {
  event.preventDefault();
  var touch = event.touches[0] || event.changedTouches[0];

  var curX = touch.pageX - canvas01.offsetLeft;
  var curY = touch.pageY - canvas01.offsetTop;

  console.log('onTouchEnt : ' + curX + ', ' + curY);
}
