//
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const btns = document.querySelectorAll('.btn');
const shapes = Object.freeze({circle: 'circle', rectangle: 'rectangle' });
const canvasHeightInput = document.getElementById('canvasHeightInput');
const canvasWidthInput = document.getElementById('canvasWidthInput');
let currentShape;

let canvasHeight = 100;
let canvasWidth = 100;

class rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(mousex, mousey) {
        ctx.fillStyle = 'black';
        ctx.fillRect(mousex - 20, mousey - 30, 40, 60);
    }
}

class circle {
    constructor(x, y, startAng, endAng, clockwise){
        this.x = x;
        this.y = y;
        this.startAng = startAng;
        this.endAng = endAng;
        this.clockwise = clockwise;
    }

    draw(mousex, mousey) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(mousex, mousey, 25, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

let shapeList = [];

//////////////////////////////////////////////

canvasHeightInput.value = canvasHeight;
canvasWidthInput.value = canvasWidth;
canvas.style.display = 'initial';

//canvas resize function
const canvasResize = () => {
    canvasWidth = canvasWidthInput.value;
    canvasHeight = canvasHeightInput.value;
    //take input from height and width fields and resize when clicked.
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}
canvasResize();

//canvas clear function
//const canvasClear = () => {
//    ctx.clearRect(0, 0, canvasHeightInput.value, CanvasWidthInput.value);
//}
//canvasClear();


//for loop for each button that assigns currentShape variable to the shape data attribute
for (let btn of btns) {
    btn.addEventListener('click', e => {
        currentShape = e.currentTarget.dataset.shape;
    });
}

//event listener for the canvas, event handler will act based on value of currentShape
canvas.addEventListener('click', e => {
    // getting position of mouse
    let rect = e.target.getBoundingClientRect();
    let mousex = e.clientX - rect.left;
    let mousey = e.clientY - rect.top;

    if (currentShape === shapes.circle) {
        let newCircle = new circle(mousex, mousey, 25, 0, Math.PI * 2, false);
        shapeList.push(newCircle);
        circle.draw(mousex, mousey);
    } else if (currentShape === shapes.rectangle) {
        let newRect = new rectangle(mousex, mousey);
        shapeList.push(newRect);
        rectangle.draw(mousex, mousey);
    }
});


canvasHeightInput.addEventListener('input', function() {
    canvasResize();
});

canvasWidthInput.addEventListener('input', function() {
    canvasResize();
});


console.log(shapeList);