const mj = function (tex) {
    return MathJax.tex2svg(tex, {em: 16, ex: 6, display: false});
  }

function solve(problemcase) {
    let ansHtml = document.getElementById("answer")
    let ans, ansArr
    problem = problemcase.toLowerCase()
    if ((problem.split("=").length - 1) != 0) {
        ans = Algebrite.roots(problem).toString()
        ans = ans.replace("[", "")
        ans = ans.replace("]", "")
        ansArr = ans.split(",")
        ansArrFinal = []

        for (let a of ansArr) {
            ansArrFinal.push(Algebrite.simplify(a).toString())
        }

        ans="["
        for (let a of ansArrFinal) {
            if (a.indexOf("i") == -1) {
                ans+=a
                ans+=","
            }
        }
        ans = ans.slice(0, -1) + ']'
        console.log(ansArrFinal)
        console.log(ans)
    }
    else {
        ans = Algebrite.simplify(problem).toString()
    }

    let ansn = math.parse(ans)
    MathJax.typesetClear();
    ansHtml.innerHTML = '';
    const latex = ansn ? ansn.toTex({'keep': 'keep', 'hide': 'hide'}) : ''
    ansHtml.appendChild(mj(latex));
}