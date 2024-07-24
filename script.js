// Seleciona todos os botões com o atributo data-key e os armazena em um array
let btns = [...document.querySelectorAll("[data-key]")];

// Seleciona todos os elementos de áudio na página
let sounds = document.querySelectorAll("audio");

// Mapeia os botões para encontrar o áudio correspondente a cada um
sounds = btns.map((btn) => document.getElementById(`s_${btn.getAttribute("data-key")}`));

// Adiciona um ouvinte de evento para a tecla solta (keyup)
document.addEventListener("keyup", (event) => {
    btns.forEach((btn, i) => {
        let dataKey = btn.getAttribute("data-key");
        // Verifica se a tecla solta corresponde ao data-key do botão
        if (dataKey === `key${event.key.toLowerCase()}`) {
            changeColor(btn);
            // Chama uma função para alterar a cor do botão pressionado
            sounds[i].currentTime = 0
            sounds[i].play();
        }
    });
});


// Função para alterar a cor do botão quando pressionado
function changeColor(btn) {
    btn.style.borderColor = "yellow";
    btn.style.color = "yellow";
    setTimeout(() => {
        btn.style.borderColor = "white";
        btn.style.color = "white";
    }, 500); // A cor volta ao normal após 500ms
}

// Seleciona o botão de play da área de composição e adiciona um ouvinte de evento
let btnPlay = document.querySelector(".composer button");
btnPlay.addEventListener("click", makeComposition);

// Array de letras que correspondem aos sons disponíveis
let letters = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

// Função para criar uma composição a partir do valor do input
function makeComposition() {
    let input = document.getElementById("input");
    let value = input.value.split(""); // Divide o valor do input em um array de caracteres
    let wait = 0; // Inicializa o temporizador

    value.forEach((char) => {
        if (letters.includes(char)) {
            setTimeout(() => {
                let index = letters.indexOf(char);
                sounds[index].currentTime = 0
                sounds[index].play(); // Reproduz o som correspondente à letra
            }, wait);
            wait += 200; // Incrementa o tempo de espera para o próximo som
        }
    });
}
