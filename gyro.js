let mean = null;
let orientationArray = null;
// websocket
const socket = new WebSocket('wss://jason27.uber.space/interface/');
// Establishing websocket connection, sending Array every 100ms to server
socket.addEventListener('open', (event) => {
  socket.addEventListener('message', (event) => {
    mean = JSON.parse(event.data);
  }, true);
  setInterval(() => {
    if (socket.readyState == socket.OPEN && orientationArray.length > 0) {
      socket.send(JSON.stringify(orientationArray))
    }
  }, 30);
});
function preload() {


}
//making var for sensor checking
let sensorsWorking = false;
let button;
let buttonII;
let permissionGranted = false;
let ios13 = false;
//making slider values
let sliderY;
let sliderX;
//fake Acc value for testing, replace with real Acc
let fakeAccA = 270;
let fakeAccB = 100;
// var for accX & accY
let accX;
let accY = window.innerWidth / 2;
//var for current state of Acc
let leftToRight = 0;
let rotateDegrees = 0;
// array for storing values of accelere
fakeAccB = accY;
//calc and store half of Screen
let mScreenW = window.innerWidth / 2;
let mScreenH = window.innerHeight / 2;
//define var for filling of circle
let arcFill = 0.5;
//making array for background
let storeValuesX = [];

//make canvas, store var with init value
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //check if sensors are available 
  if (window.DeviceOrientationEvent != undefined) {
    console.log('status_ready');
    sensorsWorking = true;
  }
  else {
    console.log('no_sensors');
    sensorsWorking = false;
  }
  //giving permission on ios13 for access to sensors
  if (typeof (DeviceOrientationEvent) !== 'undefined' && typeof (DeviceOrientationEvent.requestPermission) === 'function') {
    button = createButton('click to start');
    button.style("fontSize", "40px");
    button.center();
    button.mousePressed(requestAccess);
    console.log('ios 13');
    ios13 = true;
  }
  else {
    //non ios13
    buttonII = createButton('click to start');
    buttonII.style("fontSize", "40px");
    buttonII.position(window.innerWidth / 2, window.innerHeight / 2);
    buttonII.mousePressed(givePermission);
    console.log('no ios13');
  }
  if (!sensorsWorking) {
    sliderY = createSlider(0, window.innerWidth, window.innerWidth / 2);
    sliderY.position(window.innerWidth / 2, 0 + 20);
    sliderY.style('width', '160px');
    sliderX = createSlider(0, 100, 0);
    sliderX.position(window.innerWidth / 2, window.innerHeight / 4);
    sliderX.style('width', '160px');
  }
  accSensors();

}
function requestAccess() {
  button.hide();
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      }
    })
    .cartch(console.error);
}

function givePermission() {
  permissionGranted = true;
  buttonII.hide();
}
//draw and fill circle
function draw() {
  if (!permissionGranted) return;
  //make background with stored values
  //background(map(meanVal(storeValuesX)+random(-5,0),-180,180,0,255),map(meanVal(storeValuesX)+random(0,5),-180,180,255,0),0);
  background(20, 20, 100);
  //calc circle values
  if (!sensorsWorking) {
    let fakAccY = sliderY.value()
    let fakAccX = (sliderX.value() / 50);
    storeValuesX.push[fakAccX];
    while (storeValuesX.length >= 10) {
      storeValuesX.shift();
    }
    makeCircle(fakAccY, fakAccX, 0, 150, 0, 100);
    makeCircle(accX, accY, 100, 150, 0, 100);
    textSize(32);
    fill(255, 255, 255);
    textFont('Georgia');
    text('your value', window.innerWidth / 2 - 75, window.innerHeight - window.innerHeight / 4);
  }
  else {
    accX = (((leftToRight + 180) / 360) * window.innerWidth) * 2 - (window.innerWidth / 2);
    accY = ((rotateDegrees + 180) / 90);
    makeCircle(accX, accY, 100, 150, 0, 100);
    textSize(32);
    fill(255, 255, 255);
    textFont('Georgia');
    text('your value', window.innerWidth / 2 - 75, window.innerHeight - window.innerHeight / 4);
    storeValuesX.push[leftToRight];
    while (storeValuesX.length >= 10) {
      storeValuesX.shift();
    }
  }
  let meanX = (((mean[0] + 180) / 360) * window.innerWidth) * 2 - (window.innerWidth / 2);
  let meanY = ((mean[1] + 180) / 90);
  makeCircle(meanX, meanY, -200, 0, 255, 100);
  textSize(32);
  fill(0, 255, 100);
  textFont('Georgia');
  text('audience value', window.innerWidth / 2 - 100, window.innerHeight / 2 - 100);

}

function accSensors() {
  window.addEventListener("deviceorientation", (event) => {
    rotateDegrees = event.alpha; // alpha: rotation around z-axis -> y
    leftToRight = event.gamma; // gamma: left to right -> x
    frontToBack = event.beta; // beta: front back motion
    //storeAccX.push[rotateDegrees];
    // calc rotateDegrees with no border
    let tempStor = rotateDegrees + 180;
    tempStor = tempStor % 360;
    orientationArray = [leftToRight, tempStor];
  });
}
function makeCircle(ax, ay, y, r, g, b) {
  fill(r, g, b);
  circle(ax, window.innerHeight / 2 + y, 100);
  fill(20, 20, 100);
  arc(ax, window.innerHeight / 2 + y, 100, 100, 5 / 4 * PI + ay * PI, -1 / 4 * PI + ay * PI);
}
function calcValueA(a) {
  return let = posA = (((a + 180) / 360) * window.innerWidth) * 2 - (window.innerWidth / 2);
}

function calcValueB(b) {
  return posB = ((b + 180) / 90) * Math.PI - 1 / 2 * Math.PI;
}
function meanVal(array) {
  let tempStorage = 0;
  for (let i = 0; i < array.length; i++) {
    tempStorage += array[i];
  }
  return tempStorage / array.length;
}
