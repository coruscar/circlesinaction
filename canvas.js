var CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];


var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.onmousedown = myDown;
// canvas.onmouseup = myUp;
// canvas.ondblclick = myDblClick;


var c = canvas.getContext('2d');
var colorInc = 0;

// c.fillRect(100,100,100,100);
// console.log(canvas)
var mouse = {
    x: undefined,
    y: undefined,
    click: undefined
}

window.addEventListener('mousemove', 
    function(event){
    // console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
})



class Circle {
    constructor(x,y,dx,dy,radius,colorInc){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.colorInc = colorInc;
        // this.l10 = [3,3,3,3,3,3,3,3,3,3];
        // var ovel = [this.dx,this.dy]
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0, Math.PI * 2, false);
        // c.strokeStyle = 'black';
        // c.stroke();
        c.fillStyle = CSS_COLOR_NAMES[this.colorInc];
        c.fill();
    }
}



class Rectangle {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        // this.dx = dx;
        // this.dy = dy;
    }
    draw(){
        c.beginPath();
        c.rect(this.x, this.y, this.w, this.h)
        // c.strokeStyle = 'black';
        // c.stroke();
        c.fillStyle = 'grey';
        c.fill();
    }
    update(){
    }
}

var circleArr = [];
var mouseCircle = new Circle(undefined,undefined,0,0,30);


//first rectangle used as ground for testing
var rectArr = [];
rectArr.push(rectangle = new Rectangle(0,canvas.height-50,canvas.width,50));
// rectArr.push(rectangle = new Rectangle(0,canvas.height,canvas.width,50));


for (var i = 0; i < 1; i++){
    var radius = 30;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5 ) * 8;
    var dy = (Math.random() - 0.5 ) * 8;
    colorInc++;
    var rcolor = Math.floor(Math.random()*CSS_COLOR_NAMES.length);
    if (colorInc > CSS_COLOR_NAMES.length){
        colorInc = 0;
    }
    circleArr.push(new Circle(x,y,dx,dy,radius,rcolor));

    //init array of previous values
}

console.log(circleArr);

function hitdetection(i){
    for (var j = 0; j < rectArr.length-1; j++){
        // console.log("hiteded2")
        // if (circleArr[i].x + circleArr[i].radius > (rectArr[j].x + rectArr[j].width) || circleArr[i].x - circleArr[i].radius < 0){
        //     circleArr[i].dx = -circleArr[i].dx;
        // }
        // console.log("triggereed")
        if (circleArr[i].y + circleArr[i].radius > (rectArr[j].y) || circleArr[i].y - circleArr[i].radius < 0) {
            // console.log("rigget")
            circleArr[i].dy = -circleArr[i].dy;
        }
    }
}

console.log(circleArr[0].x);

//failed collision detection
// var reversedThisCycle = false;


function getDistance(x1, y1, x2, y2){
    //TODO let
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
}


var cantChangeColor = new Array(circleArr.length).fill(0);
// console.log(cantChangeColor);

function update(){

    mouseCircle.y = mouse.y;
    mouseCircle.x = mouse.x;

    for (var i = 0; i < circleArr.length; i++){
        
        //failed collision detection        
        // if (i == 0){
        //     reversedThisCycle = false;
        // }

        // circleArr[i].l10.push(circleArr[i].dx);
        // circleArr[i].l10.push(circleArr[i].dy);
        // circleArr[i].l10.shift();
        // circleArr[i].l10.shift();

        if (circleArr[i].x + circleArr[i].radius > innerWidth || circleArr[i].x - circleArr[i].radius < 0){
            // console.log("What's going on: " + circleArr[i].l10[5])
            circleArr[i].dx = -circleArr[i].dx;
        }
        if (circleArr[i].y + circleArr[i].radius > innerHeight || circleArr[i].y - circleArr[i].radius < 0) {
            circleArr[i].dy = -circleArr[i].dy;
        }
        
        if (cantChangeColor[i] == 0){
            if (getDistance(circleArr[i].x,circleArr[i].y,mouseCircle.x,mouseCircle.y) < circleArr[i].radius + mouseCircle.radius){
                circleArr[i].colorInc = circleArr[i].colorInc = Math.floor(Math.random()*CSS_COLOR_NAMES.length);
                cantChangeColor[i] = 1;
            }
            console.log("cantChangeColor[" + i + "]" + "= " + cantChangeColor[i]);
        }
        if (cantChangeColor[i] != 0){
            cantChangeColor[i]++;
        }
        if(cantChangeColor[i] > 10){
            cantChangeColor[i] = 0;
        }

        // console.log("jankTickImplementation = " + jankTickImplementation);
        circleArr[i].x += circleArr[i].dx;
        circleArr[i].y += circleArr[i].dy;
        // circleArr[i].l10x.push(circleArr[i].x);
        // if (circleArr[i].y + circleArr[i].radius < rectArr[i].x )

        //mouse functionality
        if (mouse.x - circleArr[i].x < 50 && mouse.x - circleArr[i].x > -50 && mouse.y - circleArr[i].y < 50 && mouse.y - circleArr[i].y > -50) {
            if (circleArr[i].radius < 40){
                circleArr[i].radius += 1;
            }
        } else if (circleArr[i].radius > radius){
            circleArr[i].radius -= 1;
        }

        
    }
}
var jankTickImplementation = 0;
function animate() {
    jankTickImplementation++;
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    update();
    mouseCircle.draw();
    // console.log(getDistance(circleArr[0].x,circleArr[0].y,mouseCircle.x,mouseCircle.y));
    for(var i = 0; i < circleArr.length; i++){
        circleArr[i].draw();
        // hitdetection(i);
        // rectangle.update();
    }
    for (var i = 0; i < rectArr.length; i++){
        rectArr[i].draw();
    }
}

// for(var i = 0; i < 4; i++){
//     circleArr[i].l10.push(4);
//     circleArr[i].l10.push(4);
// }  

animate();
