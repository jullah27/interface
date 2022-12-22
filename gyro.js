//making var for sensor checking
let sensorsWorking=false;
let button;
let buttonII;
let permissionGranted = false;
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
    sliderY = createSlider(0, window.innerWidth, window.innerWidth/2);
    sliderY.position(0, window.innerHeight);
    sliderY.style('width', '80px');
    sliderX = createSlider(0, 100, 50);
    sliderX.position(window.innerWidth/2,window.innerHeigth);
    sliderX.style('width', '80px');
    //check if sensors are available 
    if(window.DeviceOrientationEvent != undefined) {
      console.log('status_ready');
        sensorsWorking=true;}
else {console.log('no_sensors');
     }
    //giving permission on ios13 for access to sensors
    if (typeof(DeviceOrientationEvent)!=='undefined'&& typeof(DeviceOrientationEvent.requestPermission) === 'function'){
  button = createButton('click to start');
  button.style("fontSize", "40px");
  button.center();
  button.mousePressed(requestAccess);
  console.log('ios 13');
    }
    else{
  //non ios13
  buttonII = createButton('click to start');
  buttonII.style("fontSize", "40px");
  buttonII.center;
  buttonII.mousePressed(givePermission);
console.log('no ios13');
    }
}
function requestAccess(){
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
}
//draw and fill circle
function draw (){
    //background
    if (!permissionGranted) return;
    background(00,200,200);
    let fakAccY= sliderY.value();
//calc X-value for red filling
    let fakAccX=(sliderX.value()/50)*PI-1/2*PI;
    accSensors();
    accX = ((leftToRight+180)/360)*window.innerWidth;
    accY = ((rotateDegrees+180)/90)*PI-1/2*PI;
    makeCircle(fakAccY,fakAccX,0,50,100,0);
    makeCircle(accX,accY,100,50,100,0);

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
    fill(255,0,0);
    arc(ax,window.innerHeight/2+y, 100, 100, -1/2*PI, ay);
    //

}
