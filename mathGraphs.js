let cvs = document.getElementById("cvs")
let ctx = cvs.getContext("2d")

let graphScale = 64,
    graphOffsetX = 0,
    graphOffsetY = 0


function drawGraph(func) {
    ctx.clearRect(0, 0, cvs.width, cvs.height)

    drawNumbers()
    drawAxes(cvs, ctx)
    drawGrid(cvs, ctx)
    // drawNumbers(cvs, ctx)

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
        for (let x = -512 / graphScale; x <= 512 / graphScale; x += 8 / graphScale) {
            let y = Algebrite.simplify(funcSimpThis.replaceAll("x", "(" + x + ")")).toString()

            if (y.indexOf("i") == -1) {
                if (y[y.length - 1] == ".") {
                    y = y.slice(0, -4)
                }
                y = math.evaluate(y)

                ctx.beginPath();
                ctx.moveTo(x * graphScale - 8 + (cvs.width / 2), (-yOld) * graphScale + (cvs.height / 2));
                ctx.lineTo(x * graphScale + (cvs.width / 2), -y * graphScale + (cvs.height / 2));
                ctx.lineWidth = 1;
                ctx.stroke();
                yOld = y
            }
        }
    }
}

function drawGrid(canvas, context) {
    context.lineWidth = 0.5;
    context.strokeStyle = 'grey'
    ctx.font = "12px serif";
    for (let x = -512 / graphScale; x <= 512 / graphScale; x += 32 / graphScale) {
        context.beginPath();
        context.moveTo(x * graphScale + (cvs.width / 2), -canvas.height);
        context.lineTo(x * graphScale + (cvs.width / 2), canvas.height);
        context.stroke();
    }
    for (let y = -512 / graphScale; y <= 512 / graphScale; y += 32 / graphScale) {
        context.beginPath();
        context.moveTo(-canvas.width, (cvs.height / 2) - y * graphScale);
        context.lineTo(canvas.width, (cvs.height / 2) - y * graphScale);
        context.stroke();
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

function addOnWheel(elem, handler) {
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            elem.addEventListener("wheel", handler)
        } else if ('onmousewheel' in document) {
            elem.addEventListener("mousewheel", handler)
        } else {
            elem.addEventListener("MozMousePixelScroll", handler)
        }
    } else {
        elem.attachEvent("onmousewheel", handler)
    }
}

addOnWheel(cvs, function (e) {

    var delta = e.deltaY || e.detail || e.wheelDelta
    if (delta > 0) graphScale *= 0.5
    else graphScale *= 2
    drawGraph(document.getElementById('ura').value)
    e.preventDefault()
});

function drawNumbers() {
    ctx.font = "12px serif";
    for (let x = -512 / graphScale; x <= 512 / graphScale; x += 1 / graphScale * 64) {
        ctx.fillText(x, x * graphScale + (cvs.width / 2), cvs.height / 2);
    }
    for (let y = -512 / graphScale; y <= 512 / graphScale; y += 1 / graphScale * 64) {
        ctx.fillText(y, cvs.width / 2, (cvs.height / 2) - y * graphScale);
    }
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

    return result;
}