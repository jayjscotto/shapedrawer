//
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const btns = document.querySelectorAll('.btn');
const shapes = {circle: 'circle', rectangle: 'rectangle' };
const canvasHeightInput = document.getElementById('canvasHeightInput');
const canvasWidthInput = document.getElementById('canvasWidthInput');

let canvasHeight = 100;
let canvasWidth = 100;

canvasHeightInput.value = canvasHeight;
canvasWidthInput.value = canvasWidth;

//canvas resize function
const canvasResize = () => {
    canvasWidth = canvasWidthInput.value;
    canvasHeight = canvasHeightInput.value;
    //take input from height and width fields and resize when clicked.
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

canvasResize();

canvas.style.display = 'initial';

//const resizeCanvasBtn = document.getElementById('canvasResizeBtn');
let currentShape;

//circle drawing function
const drawCircle = (mousex, mousey) => {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(mousex, mousey, 10, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
}

//rectangle drawing function
const drawRectangle = (mousex, mousey) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(mousex - 5, mousey - 10, 10, 20);
}

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
        drawCircle(mousex, mousey);
    } else if (currentShape === shapes.rectangle) {
        drawRectangle(mousex, mousey);
    }
});

canvasHeightInput.addEventListener('input', function() {
    canvasResize();
});

canvasWidthInput.addEventListener('input', function() {
    canvasWidth = canvasWidthInput.value;
    canvasHeight = canvasHeightInput.value;
    canvasResize();
});
