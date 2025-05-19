

var currentColour = "white"; //default 
let isDrawing = false; //this prevents the user from draging the brush and lets them click or hold to drag
const pixels = []; //create an array to put the pixels in so we can interact with them


export function populateCanvas(){
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cnv = canvas.getContext("2d");

    currentColour = "white";

    const cols = 216; //num of columns
    const rows = 80;
    const pixelSize = 10;

    // draws the pixls in a grid row * col
    for(let row = 0; row < rows; row++){ 
        for(let col = 0; col < cols; col++ ){

            const x = col * pixelSize;
            const y = row * pixelSize

            cnv.fillStyle = "black"
            cnv.fillRect(x, y, pixelSize, pixelSize);
            pixels.push({ x, y, width: pixelSize, height: pixelSize, color: "blue" }); //appends the pixels to the array made at the top so i can access them
        }
    }
    //click any .. then checks if the mouse was on a pixel and if so chnages the colour of the pixel to getcolour() which returns white or a different chosen colour
    canvas.addEventListener("click", (e) => { 
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            for (let pixel of pixels) {
                if (
                    mouseX >= pixel.x &&
                    mouseX < pixel.x + pixel.width &&
                    mouseY >= pixel.y &&
                    mouseY < pixel.y + pixel.height
                ) {
                    //onclick changes colour and redraws the pixel
                    pixel.color = pixel.color === getColour();
                    cnv.fillStyle = pixel.color;
                    cnv.fillRect(pixel.x, pixel.y, pixel.width, pixel.height);
                    break;
                }
            }
        });

    canvas.addEventListener("mousedown", () => isDrawing = true);
    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mouseleave", () => isDrawing = false);
    canvas.addEventListener("mousemove", (e) => drawIfDragging(e, canvas, cnv));
    canvas.addEventListener("click", (e) => drawIfDragging(e, canvas, cnv));

}

function drawIfDragging(e, canvas, cnv) {
    if (!isDrawing && e.type !== "click") return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let pixel of pixels) {
        if (
            mouseX >= pixel.x &&
            mouseX < pixel.x + pixel.width &&
            mouseY >= pixel.y &&
            mouseY < pixel.y + pixel.height
        ) {
            pixel.color = currentColour;
            cnv.fillStyle = pixel.color;
            cnv.fillRect(pixel.x, pixel.y, pixel.width, pixel.height);
            break;
        }
    }
}



function getColour(){
    const red = document.getElementById("red")
    red.addEventListener("click", () =>{currentColour = "red"})

    const green = document.getElementById("green")
    green.addEventListener("click", () =>{currentColour = "green"})

    const blue = document.getElementById("blue")
    blue.addEventListener("click", () =>{currentColour = "blue"})
    return currentColour;
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () =>{
        populateCanvas()
    })