const elemBusca = document.querySelector("#busca");
const elemSugestoes = document.querySelector(".sugestoes");

elemBusca.addEventListener("keyup", function (event) {
    if (elemBusca.value == "") {
        LimparSugestoes();
    }

    if (event.key != "Backspace" && event.key != " ") {
        criarSugestao(elemBusca.value)
    }
    console.log(event)
})

function LimparSugestoes() {
    elemSugestoes.innerHTML = ""
}


async function criarSugestao(texto) {
    const palavras = await fetch("./palavras.json").then(async (dados) => {
        const r = await dados.json();
        return r.palavras;
    })
    console.log(palavras);

    let sugestoes = palavras.filter(palavra => {
        if (palavra.startsWith(texto)) return true;
        else return false;
    })
    criarElementos(sugestoes);
}

function criarElementos(sugestoes) {
    LimparSugestoes();
    sugestoes.forEach(function (sugestao) {
        const elemDiv = document.createElement("div");
        elemDiv.setAttribute("class", "sugestao");
        elemDiv.innerHTML = sugestao
        elemDiv.addEventListener("click", function () {
            elemBusca.value = sugestao;
            LimparSugestoes();
        });
        elemSugestoes.appendChild(elemDiv);
    })


}