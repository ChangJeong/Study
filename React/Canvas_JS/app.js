// Canvase
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

// Mode Buttons
const modeBtn = document.querySelector("#mode-btn");
const resetBtn = document.querySelector("#reset-btn");
const eraseBtn = document.querySelector("#erase-btn");
const fileInput = document.querySelector("#file-btn");
const textInput = document.querySelector("#text-btn");
const textLabel = document.querySelector(".text-btn");
const saveBtn = document.querySelector("#save-btn");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "brown",
  "pink",
  "gray",
  "black",
];

let isPainting = false;
let isFilling = false;

function onMousemove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.beginPath();
}

function startPainting(e) {
  isPainting = true;
}

function cancelPainting(e) {
  isPainting = false;
}

function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
}

function onColorChange(e) {
  ctx.fillStyle = e.target.value;
  ctx.strokeStyle = e.target.value;
}

function onColorClick(e) {
  const colorValue = e.target.dataset.color;
  ctx.fillStyle = e.target.dataset.color;
  ctx.strokeStyle = colorValue;
  color.value = colorValue;
}

function onModeBtnClick(e) {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🖌️";
  } else {
    isFilling = true;
    modeBtn.innerText = "🪣";
  }
}

function onCanvasPainting(e) {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onResetBtnClick(e) {
  //ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseBtnClick(e) {
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = e.target.value;
  isFilling = false;
  modeBtn.innerText = "🖌️";
}

function onFileChange(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onTextLabelClick() {
  if (textInput.classList.contains("open-text")) {
    textInput.classList.remove("open-text");
  } else {
    textInput.classList.add("open-text");
  }
}

function onDoubleClick(e) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "24px sans-serif";
    ctx.fillText(text, e.offsetX, e.offsetY);
    ctx.restore();
  }
}

function onSaveBtnClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "canvas.png";
  a.click();
}

canvas.addEventListener("mousemove", onMousemove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasPainting);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => {
  color.addEventListener("click", onColorClick);
});
modeBtn.addEventListener("click", onModeBtnClick);
resetBtn.addEventListener("click", onResetBtnClick);
eraseBtn.addEventListener("click", onEraseBtnClick);
textLabel.addEventListener("click", onTextLabelClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveBtnClick);
