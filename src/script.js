const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
let flippedCards = [];
let matchedCount = 0;
let isPreviewing = true;
let timeLeft = 90; // Tổng thời gian chơi
let gameInterval; // Biến quản lý bộ đếm

const icons = ['🍎','🍌','🍇','🍓','🥑','🍉','🍊','🍍','🥝','🍒','🍑','🥥','🫐','🫒','🌽','🫑','🥦','🌶️'];
const symbols = [...icons, ...icons];

function initGame() {
    // Reset các thông số
    clearInterval(gameInterval);
    board.innerHTML = '';
    flippedCards = [];
    matchedCount = 0;
    isPreviewing = true;
    timeLeft = 90;
    timerDisplay.innerText = `Thời gian: ${timeLeft}s`;
    timerDisplay.style.color = '#f1c40f';

    symbols.sort(() => Math.random() - 0.5);
    
    symbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card', 'flipped');
        card.dataset.symbol = symbol;
        card.innerText = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

    // 10 giây xem trước
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
        isPreviewing = false;
        startCountdown(); // Bắt đầu đếm ngược sau khi hết thời gian xem trước
    }, 10000); 
}

function startCountdown() {
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Thời gian: ${timeLeft}s`;

        if (timeLeft <= 10) {
            timerDisplay.style.color = '#e74c3c'; // Chuyển màu đỏ khi sắp hết giờ
        }

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert("HẾT GIỜ! Bạn đã thua cuộc.");
            resetGame();
        }
    }, 1000);
}

function flipCard() {
    if (isPreviewing || timeLeft <= 0) return;
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
        if (matchedCount === 36) {
            clearInterval(gameInterval); // Dừng đồng hồ khi thắng
            setTimeout(() => alert(`CHIẾN THẮNG! Bạn còn dư ${timeLeft} giây.`), 500);
        }
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
