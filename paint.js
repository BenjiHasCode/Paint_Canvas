const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let painting = false;

function draw(e){
    if(painting) {
        //define our variables
        const x = e.clientX;
        const y = e.clientY;
        const color = document.getElementById("color").value;
        const size = document.getElementById("range").value;

        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
  
        //draw line
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        //save line
        // we initialize an empty line (array) when we click mouse.
        // Here we populate that line with data (so we can redraw it if needed)
        lines[lines.length-1].push({
            color,
            size,
            x,
            y
        });
    }
}



canvas.addEventListener("mousedown", (e) => {
   // check if mousedown was left mouse button
    if (e.button == 0) {
        painting = true;
        //ready next line to draw
        lines.push([]);
    
        ctx.beginPath();
        draw(e);
    } 
});

canvas.addEventListener("mouseup", () => painting = false);
canvas.addEventListener("mousemove", draw);

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', () => {
    resizeCanvas();
    redraw();
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
