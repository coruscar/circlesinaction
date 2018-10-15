var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext('2d');

// c.fillRect(100,100,100,100);
// console.log(canvas)
var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', 
    function(event){
    // console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
})

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
        c.arc(this.x,this.y,this.radius,0, Math.PI * 2, false);
        // c.strokeStyle = 'black';
        // c.stroke();
        c.fillStyle = '#b57edc';
        c.fill();
    }
    update(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //mouse functionality
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 40){
                this.radius += 1; 

            }
        } else if (this.radius > radius){
            this.radius -= 1;
        }
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
