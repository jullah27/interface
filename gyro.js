// websocket
const socket = new WebSocket('wss://avior.uber.space/interface/');
// connectin every 3 seconds to server
socket.addEventListener('open', (event) => {
  setInterval(() => {
    if (socket.readyState == socket.OPEN) {
      socket.send('');
    }
  }, 30000);
});
// listen to message from server
socket.addEventListener('message', (event) => {
  const mean = JSON.parse(event.data);
makeCircle(calcValueA(mean[1]), calcValueB(mean[2]),200,200,0,100);
});

//making var for sensor checking
let sensorsWorking=false;
let button;
let buttonII;
let permissionGranted = false;
let ios13 = false;
//making slider values
let sliderY;
let sliderX;
//fake Acc value for testing, replace with real Acc
let fakeAccA = 270;
let fakeAccB= 100;
// var for accX & accY
let accX;
let accY = window.innerWidth/2;
//var for current state of Acc
let leftToRight = 100;
let rotateDegrees = 100;
fakeAccB = accY;
//calc and store half of Screen
let mScreenW = window.innerWidth/2;
let mScreenH = window.innerHeight/2;
//define var for filling of circle
let arcFill = 0.5;

//make canvas, store var with init value
function setup () {
    createCanvas (window.innerWidth, window.innerHeight);
    //check if sensors are available 
    if(window.DeviceOrientationEvent != undefined) {
      console.log('status_ready');
        sensorsWorking=true;}
else {console.log('no_sensors');
sensorsWorking = false;
     }
    //giving permission on ios13 for access to sensors
    if (typeof(DeviceOrientationEvent)!=='undefined'&& typeof(DeviceOrientationEvent.requestPermission) === 'function'){
  button = createButton('click to start');
  button.style("fontSize", "40px");
  button.center();
  button.mousePressed(requestAccess);
  console.log('ios 13');
  ios13 = true;
    }
    else{
  //non ios13
  buttonII = createButton('click to start');
  buttonII.style("fontSize", "40px");
  buttonII.position(window.innerWidth/2,window.innerHeight/2);
  buttonII.mousePressed(givePermission);
console.log('no ios13');
    }
if (!sensorsWorking){
    sliderY = createSlider(0, window.innerWidth, window.innerWidth/2);
    sliderY.position(window.innerWidth/2,0+20);
    sliderY.style('width', '160px');
    sliderX = createSlider(0, 100, 0);
    sliderX.position(window.innerWidth/2,window.innerHeight/4);
    sliderX.style('width', '160px');
}
}
function requestAccess(){
    button.hide();
    DeviceOrientationEvent.requestPermission()
    .then(response => {
    if (response =='granted'){
      permissionGranted = true;
      
    }
     })
    .cartch(console.error);
}

function givePermission(){
    permissionGranted = true;
    buttonII.hide();
}
//draw and fill circle
function draw (){
    //background(20);
    if (!permissionGranted) return;
    background(41,70,70);
//calc X-value for red filling
    accSensors();
    accX = (((leftToRight+180)/360)*window.innerWidth)*2-(window.innerWidth/2);
    accY = ((rotateDegrees+180)/90)*PI-1/2*PI;
    if (!sensorsWorking){
    let fakAccY= sliderY.value()
    let fakAccX=(sliderX.value()/100)+1;
    makeCircle(fakAccY,fakAccX,0,150,0,100);
        
    }
    else{
      //making circle with momentary values
    makeCircle(accY,accX,100,150,0,100);
      //sending values to server
    socket.send(`[${leftToRight}, ${rotateDegrees}]`)
    }
}

function accSensors(){
 window.addEventListener("deviceorientation", (event) => {
        rotateDegrees = event.alpha; // alpha: rotation around z-axis
        leftToRight = event.gamma; // gamma: left to right
        frontToBack = event.beta; // beta: front back motion


}, true);
}

function makeCircle(ax,ay,y,r,g,b){
    fill(r,g,b);
    circle (ax,window.innerHeight/2+y,100);
    fill(20,20,100);
    arc(ax,window.innerHeight/2+y, 100, 100, -ay*5/4*PI, ay*-1/4*PI);
    //

}
function calcValueA (a){
  return let = posA = (((a+180)/360)*window.innerWidth)*2-(window.innerWidth/2);

}

function calcValueB (b){
  return posB = ((b+180)/90)*Math.PI-1/2*Math.PI;
}

