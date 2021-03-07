const lines = [];
let deletedLines = [];


function redo() {
    if(deletedLines.length != 0) {
        //we remove the latest deletedLine, and sent it to lines
        lines.push(deletedLines.pop());
        //redraw scene
        redraw();
    }
}

function undo() {
    if(lines.length != 0) {
        deletedLines.push(lines.pop()); 
        redraw();
    }
}

function redraw(){
    //clear scene
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    //draw all lines up to now
    lines.forEach(line => {
        //move to first point in line
        ctx.moveTo(line[0].x, line[0].y);

        line.forEach(point => {
            const x = point.x;
            const y = point.y;
            ctx.lineWidth = point.size;
            ctx.lineCap = "round";
            ctx.strokeStyle = point.color;
    
            //draw line
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        });
    });
}

//add input
window.addEventListener("keydown", (e) => {
    //check if CTRL + Z or CTRL + Y
    if (e.key == 'z' && (e.metaKey || e.ctrlKey)) { //metaKey = macs command key
        undo();
    } else if (e.key == 'y' && (e.metaKey || e.ctrlKey)) {
        redo();
    }
});