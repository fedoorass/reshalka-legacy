let cvs=document.getElementById("cvs")
let ctx = cvs.getContext("2d")
function drawGraph(func) {
    let funcr = func.split("=")[1].toLowerCase()
    console.log(funcr)
    let y, oldX = 0, oldY = 0
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let x = -200; x<200; x+=0.5) {
        y = parseInt(Algebrite.simplify(funcr.replaceAll("x", "("+x+")")).toString())
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(x+cvs.width/2, -y+cvs.height/2);
        ctx.stroke();
        oldX = x+cvs.width/2
        oldY = -y+cvs.height/2
    }
}