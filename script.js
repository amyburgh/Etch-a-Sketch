// Colors
const LIGHT_GREY = '#D3D3D3';
const GREY = '#808080';
const DEFAULT_SIZE = 24;

const grid = document.querySelector('.grid');
const sizeSlider = document.querySelector('input[type=range]');
const sizeInfo = document.querySelector('label[for=slider]');
const colorPkr = document.querySelector('input[type=color]');
const clearBtn = document.querySelector('button[type=clear]');

let mouseToggle = false;
let currentSize = DEFAULT_SIZE;
let currentColor = colorPkr.value;

clearBtn.onclick = () => createGrid(currentSize);
sizeSlider.oninput = (e) => updateSize(e.target.value);
sizeSlider.onmouseup = (e) => createGrid(e.target.value);
colorPkr.oninput = (e) => { currentColor = e.target.value };
grid.onmousedown = () => { mouseToggle = true };
grid.onmouseup = () => { mouseToggle = false };

function updateSize(size) {
    currentSize = size;
    sizeInfo.textContent = `${size} X ${size}`;
}

function addColor(e) {
    if (e.type === 'mouseover' && mouseToggle === false) return;
    e.target.style.backgroundColor = currentColor;
}

function createGrid(size) {
    while (grid.firstChild)
        grid.removeChild(grid.firstChild);
    for (let items = size * size; items; items--) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.addEventListener('mouseover', addColor);
        div.addEventListener('mousedown', addColor);
        grid.appendChild(div);
    }
    grid.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
}

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    updateSize(DEFAULT_SIZE);
    sizeSlider.value = DEFAULT_SIZE;
}