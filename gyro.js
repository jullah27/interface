let acl = new Accelermeter({ frequency: 60});
let sensorsWorking=false;
//fake Acc value for testing, replace with real Acc
let fakeAccA = 270;
let fakeAccB= 100;
// var for accX & accY
let accX;
let accY;
//var for current state of Acc
let accAX;
let accAY;
fakeAccB = AccB;
//calc and store half of Screen
let mScreenW = window.innerWidth/2;
let mScreenH = window.innerHeight/2;
//define var for filling of circle
let gyroFill = fakeAcc;

//make canvas, store var with init value
function setup () {
    createCanvas (window.innerWidth, window.innerHeight);
  //check if sensors are available 
    if(window.DeviceMotionEvent != undefined) {
       print('status_ready');
        sensorsWorking=true;}
else {print('no_sensors');
     }
    
}

//draw and fill circle
function draw (){
    //background
    background(00,200,200);
    //make circle in the middle of screen
    fill(50,100,0);
    circle (accB,window.innerHeight/2,100);
    //def var which cut the first border
    let rotCirc = 2;
    // def var which fill the circle in a equal way
    let scndFill = rotCirc*1.4;
    //make shape for the filled circle
    fill(255,0,0);
    arc(accB,fakeAccB, 100, 100, rotCirc, scndFill);
    //


}

function accSensors(){
    accAX=DeviceMotionEvent.accelerationIncludingGravity.x*5;
    accAY=DeviceMotionEvent.accelerationIncludingGravity.y*5;
}
    
