let cvs = document.getElementById("cvs")
let ctx = cvs.getContext("2d")

let funcArr = []

function drawGraph(func) {
    ctx.beginPath();
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    let funcSimp = Algebrite.roots(func.toLowerCase(), "y").toString()
    funcSimp = funcSimp.replace("[", "").replace("]", "")
    funcSimpArr = funcSimp.split(",")

    for (let funcSimpThis of funcSimpArr) {
        let yOld = Algebrite.simplify(funcSimpThis.replaceAll("x", "(-100)")).toString()
        for (let x = -100; x <= 100; x += 0.5) {
            let y = Algebrite.simplify(funcSimpThis.replaceAll("x", "(" + x + ")")).toString()

            if (y.indexOf("i") == -1) {
                if (y[y.length - 1] == ".") {
                    y = y.slice(0, -4)
                }
                y = math.evaluate(y)

                ctx.fillRect(x + cvs.width / 2, -y + cvs.height / 2, 2, 2);
                ctx.moveTo(x - 0.5 + cvs.width / 2, -yOld + cvs.height / 2);
                ctx.lineTo(x + cvs.width / 2, -y + cvs.height / 2);
                ctx.lineWidth = 1;
                ctx.stroke();
                yOld = y
            }
        }
    }
}