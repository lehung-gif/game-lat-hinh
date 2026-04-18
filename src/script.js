const board = document.getElementById('game-board');
let flippedCards = [];
let matchedCount = 0;
let isPreviewing = true;

// 18 cặp icon cho bảng 6x6
const icons = [
    '🍎','🍌','🍇','🍓','🥑','🍉','🍊','🍍','🥝','🍒',
    '🍑','🥥','🫐','🫒','🌽','🫑','🥦','🌶️'
];
const symbols = [...icons, ...icons];

function initGame() {
    board.innerHTML = '';
    flippedCards = [];
    matchedCount = 0;
    isPreviewing = true;
    
    symbols.sort(() => Math.random() - 0.5);
    
    symbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card', 'flipped');
        card.dataset.symbol = symbol;
        card.innerText = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    };

    // 10 giây ghi nhớ
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
        isPreviewing = false;
    }, 10000); 
}

function flipCard() {
    if (isPreviewing) return;
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);
        if (flippedCards.length === 2) checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        flippedCards = [];
        if (matchedCount === 36) setTimeout(() => alert('Chiến thắng!'), 500);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() { initGame(); }
initGame();
