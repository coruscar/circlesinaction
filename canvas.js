var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');

// c.fillRect(100,100,100,100);
// console.log(canvas)

class Circle {
    constructor(x,y,dx,dy,radius){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
    }
    draw(){
        c.beginPath();
        c.arc(x,y,radius,0, Math.PI * 2, false);
        // c.strokeStyle = 'white';
        // c.stroke();
        c.fillStyle = '#b57edc';
        c.fill();
    }
    update(){
        if (x + radius > innerWidth || x - radius < 0){
            dx = -dx;
        }
        if (y + radius > innerHeight || y - radius < 0) {
            dy = -dy;
        }
        x += dx;
        y += dy;
    }
}

var circle = new Circle(200,200,3,3,30);

var circleArr = [];

  
for (var i = 0; i < 10; i++){
    var radius = 30;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5 ) * 8;
    var dy = (Math.random() - 0.5 ) * 8;
    circleArr.push(new Circle(x,y,dx,dy,radius));
}

console.log(circleArr);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(var i = 0; i < circleArr.length; i++){
        circleArr[i].update();
        circleArr[i].draw();

    }
}

animate();
