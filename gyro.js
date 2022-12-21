let sensorsWorking=false;
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
let accAX;
let accAY;
fakeAccB = accY;
//calc and store half of Screen
let mScreenW = window.innerWidth/2;
let mScreenH = window.innerHeight/2;
//define var for filling of circle
let arcFill = 0.5;

//make canvas, store var with init value
function setup () {
    createCanvas (window.innerWidth, window.innerHeight);
    sliderY = createSlider(0, window.innerWidth, window.innerWidht/2);
    sliderY.position(0, window.innerHeight);
    sliderY.style('width', '80px');
    sliderX = createSlider(0, 100, 50);
    sliderX.position(window.innerWidth/2,window.innerHeigth);
    sliderX.style('width', '80px');
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
    let fakAccY= sliderY.value();
    circle (fakAccY,window.innerHeight/2,100);
    //def var which cut the first border
    let fakAccX=(sliderX.value()/50)*PI-1/2*PI;
    let rotCirc = fakAccX;
    // def var which fill the circle in a equal way
    let scndFill = fakAccX*1.4;
    //make shape for the filled circle
    fill(255,0,0);
    arc(fakAccY,window.innerHeight/2, 100, 100, -1/2*PI, fakAccX);
    //


}

function accSensors(){
    accAX=DeviceMotionEvent.accelerationIncludingGravity.x*5;
    accAY=DeviceMotionEvent.accelerationIncludingGravity.y*5;
}
    
