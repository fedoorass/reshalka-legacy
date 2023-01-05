let cvs = document.getElementById("cvs")
let ctx = cvs.getContext("2d")

let funcArr = []

function drawGraph(func) {
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    drawAxes(cvs, ctx);

    let funcSimp = Algebrite.roots(replaceFloatingPointWithFraction(func.toLowerCase()), "y").toString()
    funcSimp = funcSimp.replace("[", "").replace("]", "")
    funcSimpArr = funcSimp.split(",")
    ctx.strokeStyle = 'red'

    for (let funcSimpThis of funcSimpArr) {
        let yOld = Algebrite.simplify(funcSimpThis.replaceAll("x", "(-100)")).toString()
        if (yOld.indexOf("i") == -1) {
            if (yOld[yOld.length - 1] == ".") {
                yOld = yOld.slice(0, -4)
            }
        }
        yOld = math.evaluate(yOld)
        for (let x = -100; x <= 100; x += 0.5) {
            let y = Algebrite.simplify(funcSimpThis.replaceAll("x", "(" + x + ")")).toString()

            if (y.indexOf("i") == -1) {
                if (y[y.length - 1] == ".") {
                    y = y.slice(0, -4)
                }
                y = math.evaluate(y)

                ctx.beginPath();
                ctx.moveTo(x - 0.5 + cvs.width / 2, -yOld + cvs.height / 2);
                ctx.lineTo(x + cvs.width / 2, -y + cvs.height / 2);
                ctx.lineWidth = 1;
                ctx.stroke();
                yOld = y
            }
        }
    }
}

function drawAxes(canvas, context) {
    context.lineWidth = 1;
    context.strokeStyle = 'grey'

    context.beginPath();
    context.moveTo(canvas.width / 2, -canvas.height);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();

    context.beginPath();
    context.moveTo(-canvas.width, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.stroke();
}

function replaceFloatingPointWithFraction(expression) {
    const isDigit = (char) => char >= '0' && char <= '9'

    let result = expression

    while (result.indexOf('.') !== -1) {

        const dotIndex = result.indexOf('.');

        let numberStart = dotIndex;
        while (numberStart > 0 && isDigit(result[numberStart - 1])) {
            numberStart -= 1;
        }

        let numberEnd = dotIndex;
        while (numberEnd < result.length - 1 && isDigit(result[numberEnd + 1])) {
            numberEnd += 1;
        }

        const leftPart = result.substring(numberStart, dotIndex);
        const rightPart = result.substring(dotIndex + 1, numberEnd + 1);

        const numerator = parseInt(leftPart) * Math.pow(10, rightPart.length) + parseInt(rightPart);
        const denominator = Math.pow(10, rightPart.length);

        result = result.slice(0, numberStart) + `(${numerator}/${denominator})` + result.slice(numberEnd + 1);;
    }

    console.log(result);

    return result;
}
