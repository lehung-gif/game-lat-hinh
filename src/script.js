const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const wrongDisplay = document.getElementById('wrong-count');
let flippedCards = [];
let matchedCount = 0;
let isPreviewing = true;
let timeLeft = 120; // Tổng thời gian 120 giây
let gameInterval;
let wrongConsecutive = 0; // Đếm số lần sai liên tiếp

const icons = ['🍎','🍌','🍇','🍓','🥑','🍉','🍊','🍍','🥝','🍒','🍑','🥥','🫐','🫒','🌽','🫑','🥦','🌶️'];
const symbols = [...icons, ...icons];

function initGame() {
    clearInterval(gameInterval);
    board.innerHTML = ''; 
    flippedCards = [];
    matchedCount = 0;
    isPreviewing = true;
    timeLeft = 120;
    wrongConsecutive = 0;
    
    updateDisplay();

    // Xáo trộn và tạo các ô hình
    symbols.sort(() => Math.random() - 0.5);
    symbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card', 'flipped');
        card.dataset.symbol = symbol;
        card.innerText = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

    // 20 giây xem trước trước khi bắt đầu
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
        isPreviewing = false;
        startCountdown();
    }, 20000); 
}

function updateDisplay() {
    if(timerDisplay) timerDisplay.innerText = `Thời gian: ${timeLeft}s`;
    if(wrongDisplay) wrongDisplay.innerText = `Sai liên tiếp: ${wrongConsecutive}/5`;
}

function startCountdown() {
    gameInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert("HẾT GIỜ! Bạn đã thua cuộc.");
            resetGame();
        }
    }, 1000);
}

function flipCard() {
    if (isPreviewing || timeLeft <= 0 || flippedCards.length >= 2 || this.classList.contains('flipped')) return;
    this.classList.add('flipped');
    flippedCards.push(this);
    if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        wrongConsecutive = 0; // Đúng thì reset đếm sai liên tiếp
        flippedCards = [];
        updateDisplay();
        if (matchedCount === 36) {
            clearInterval(gameInterval);
            setTimeout(() => alert(`CHIẾN THẮNG! Bạn còn dư ${timeLeft}s`), 500);
        }
    } else {
        wrongConsecutive++;
        if (wrongConsecutive >= 5) {
            timeLeft = Math.max(0, timeLeft - 10); // Phạt trừ 10 giây
            wrongConsecutive = 0; // Reset sau khi phạt
            if(timerDisplay) {
                timerDisplay.classList.add('penalty'); // Hiệu ứng đỏ (nếu có CSS)
                setTimeout(() => timerDisplay.classList.remove('penalty'), 500);
            }
        }
        updateDisplay();
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() { initGame(); }
initGame();
