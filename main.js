//
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const btns = document.querySelectorAll('.btn');
const shapes = Object.freeze({circle: 'circle', rectangle: 'rectangle' });
const canvasHeightInput = document.getElementById('canvasHeightInput');
const canvasWidthInput = document.getElementById('canvasWidthInput');
const canvasClearBtn = document.getElementById('canvasClear');
const listContainer = document.querySelector('[data-shapeList]');
const circleIcon = document.querySelector('circleTemplate');
const rectIcon = document.querySelector('rectTemplate');

let currentShape;
let shapeList = ['circle','rect'];  //shapes that have been drawn

let canvasHeight = 100;
let canvasWidth = 100;

function renderCircle() {
    const circleBtn = document.importNode(circleIcon.content, true);
    listContainer.appendChild(circleBtn);
}

function renderRect() {
    const rectBtn = document.importNode(rectIcon.content, true);
    listContainer.appendChild(rectBtn);
}

// function clearRenders(container) {} will clear the left icon tray (when canvas is reset)
 

//rectangle class
class Rectangle {
    constructor(mousex, mousey, w, h) {
        this.mousex = mousex;
        this.mousey = mousey;
        this.w = w;
        this.h = h;
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.mousex - 20, this.mousey - 30, 40, 60);
    }
}

//circle class
class Circle {
    constructor(mousex, mousey, startAng, endAng, clockwise){
        this.mousex = mousex;
        this.mousey = mousey;
        this.startAng = startAng;
        this.endAng = endAng;
        this.clockwise = clockwise;
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.mousex, this.mousey, 25, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

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
const canvasClear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
canvasClear();

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
        let newCircle = new Circle(mousex, mousey, 25, 0, Math.PI * 2, false);
        shapeList.push(newCircle);
        newCircle.draw();
        renderCircle();
    } else if (currentShape === shapes.rectangle) {
        let newRect = new Rectangle(mousex, mousey);
        shapeList.push(newRect);
        newRect.draw();
        renderRect();
    }
});


canvasHeightInput.addEventListener('input', canvasResize);

canvasWidthInput.addEventListener('input', canvasResize);

canvasClearBtn.addEventListener('click', canvasClear);

console.log(shapeList);
