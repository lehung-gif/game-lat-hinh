const board = document.getElementById('game-board');
let flippedCards = [];
let matchedCount = 0;
let isPreviewing = true;

// Tạo 32 cặp hình (tổng 64 ô)
const icons = [
    '🍎','🍌','🍇','🍓','🥑','🍉','🍊','🍍',
    '🐱','🐶','🐭','🐹','🐰','🦊','🐻','🐼',
    '🚗','🚀','✈️','🚢','🚲','🛵','🚁','🚜',
    '⚽','🏀','🎾','🏐','🎱','⛳','🥊','🏹'
];
const symbols = [...icons, ...icons]; // Nhân đôi để tạo cặp

function initGame() {
    board.innerHTML = '';
    flippedCards = [];
    matchedCount = 0;
    isPreviewing = true;
    
    // Trộn bài cực kỹ
    symbols.sort(() => Math.random() - 0.5);
    
    symbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('flipped'); // Mở lên để xem trước
        card.dataset.symbol = symbol;
        card.innerText = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

    // 10 giây ghi nhớ cho bảng 8x8
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
        isPreviewing = false;
        console.log("Bat dau!");
    }, 10000); 
}

function flipCard() {
    if (isPreviewing) return;
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

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
        if (matchedCount === 64) setTimeout(() => alert('THANG CUOC! Ban co tri nho thien tai.'), 500);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 800); // Rút ngắn thời gian úp bài để game nhanh hơn
    }
}

function resetGame() {
    initGame();
}

initGame();
