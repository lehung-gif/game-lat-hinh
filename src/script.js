const board = document.getElementById('game-board');
let flippedCards = [];
let matchedCount = 0;
let isPreviewing = true; // Biến chặn không cho người chơi nhấn khi đang xem trước

// Tạo 25 ô: 12 cặp (1-12) và 1 ô số 0
const symbols = [];
for (let i = 1; i <= 12; i++) {
    symbols.push(i, i);
}
symbols.push(0); 

function initGame() {
    board.innerHTML = '';
    flippedCards = [];
    matchedCount = 0;
    isPreviewing = true; 
    
    // Trộn ngẫu nhiên
    symbols.sort(() => Math.random() - 0.5);
    
    symbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        // Mặc định lật lên để xem trước
        card.classList.add('flipped'); 
        card.dataset.symbol = symbol;
        card.innerText = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

    // Sau 10 giây thì úp hết bài lại để bắt đầu chơi
    setTimeout(() => {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.remove('flipped'));
        isPreviewing = false; // Cho phép người chơi bắt đầu lật
        alert("Het 10 giay! Bat dau choi.");
    }, 10000); // 10000ms = 10 giây
}

function flipCard() {
    // Không cho lật nếu đang trong thời gian xem trước hoặc lật quá 2 ô
    if (isPreviewing) return;
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        // Logic ô số 0 (giống bản Java)
        if (this.dataset.symbol === "0") {
            this.classList.add('matched');
            matchedCount++;
            flippedCards = flippedCards.filter(c => c !== this);
            checkWin();
            return;
        }

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        flippedCards = [];
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function checkWin() {
    if (matchedCount === 25) {
        setTimeout(() => alert('Chuc mung! Ban da thang.'), 300);
    }
}

function resetGame() {
    initGame();
}

// Khoi chay game
initGame();
