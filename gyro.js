const acl = new Accelermeter({ frequency: 60});
//fake Acc value for testing, replace with real Acc
let fakeAcc = 270;
//calc and store half of Screen
let mScreenW = window.innerWidth/2;
let mScreenH = window.innerHeight/2;
//define var for filling of circle
let gyroFill = fakeAcc;

//make canvas, store var with init value
function setup () {
    createCanvas (window.innerWidth, window.innerHeight);
    
}

//draw and fill circle
function draw (){
    //background
    background(00,200,200);

    //make circle in the middle of screen
    fill(50,100,0);
    circle (window.innerWidth/2,window.innerHeight/2,100);
    //def var which cut the first border
    let rotCirc = 2;
    // def var which fill the circle in a equal way
    let scndFill = rotCirc*1.4;
    //make shape for the filled circle
    fill(255,0,0);
    arc(window.innerWidth/2,window.innerHeight/2, 100, 100, rotCirc, scndFill);


}
