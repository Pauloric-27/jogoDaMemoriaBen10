// Constante para criar a grid
const grid = document.querySelector('.grid');

// Contador de cliques
let contadorCliques = 0;

// Lista com o nome das imagens das cartas
const aliens = [
    'enormossauro',
    'ecoeco',
    'arraiaajato',
    'swampfire',
    'cromatico',
    'spidermonkey',
];

// Const para criar um elemento div
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Criando variaveis para primeira e segunda carta
let firstCard = '';
let secondCard = '';

// Checa se o jogo foi finalizado
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 12){
        alert(`Parabéns, você ganhou em ${cont.innerHTML} jogadas!`);
    }
}

// Const para checar se foi feito um par
const checkCards = () => {
    const firstAlien = firstCard.getAttribute('data-alien');
    const secondAlien = secondCard.getAttribute('data-alien');

    if (firstAlien === secondAlien){

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {

        setTimeout(() =>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 700)
    }
}

// Checa se as cartas nao foram viradas e vira as mesmas
const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
    }

    contadorCliques++; // Incrementa o contador de cliques
    document.getElementById('cont').textContent = contadorCliques; // Atualiza o número de cliques no span

    checkCards();
}

// Const para criar uma carta
const createCard = (alien) => {
    
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    // Atribui o nome da carta dependendo do nome escrito na array
    front.style.backgroundImage = `url('./imagens/${alien}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-alien', alien);

    return card;
}

// Variavel para fazer o iniciamento do jogo
const loadGame = () => {

    // Duplica os aliens para poder existir um par de cartas iguais
    const duplicateAliens = [ ...aliens, ...aliens ];

    // Embaralha a posição das cartas
    const shuffledArray = duplicateAliens.sort(() => Math.random() - 0.5);

    // Cria as cartas e coloca as mesmas no grid
    duplicateAliens.forEach((alien) =>{
        const card = createCard(alien);
        grid.appendChild(card);
    })
}

// Inicia o jogo
loadGame();
