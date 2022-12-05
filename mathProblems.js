const mj = function (tex) {
    return MathJax.tex2svg(tex, {em: 16, ex: 6, display: false});
  }

function solve(problemcase) {
    let ansHtml = document.getElementById("answer")
    let ans
    problem = problemcase.toLowerCase()
    console.log(problem.split("=").length - 1)
    if ((problem.split("=").length - 1) != 0) {
        ans = Algebrite.roots(problem).toString()
    }
    else {
        ans = Algebrite.simplify(problem).toString()
    }
    
    console.log(ans)
    console.log(typeof(ans))
    let ansn = math.parse(ans)
    MathJax.typesetClear();
    ansHtml.innerHTML = '';
    const latex = ansn ? ansn.toTex({'keep': 'keep', 'hide': 'hide'}) : ''
    ansHtml.appendChild(mj(latex));
}