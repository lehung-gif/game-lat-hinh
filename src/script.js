const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const wrongDisplay = document.getElementById('wrong-count');
let flippedCards = [];
let matchedCount = 0;
let isPreviewing = true;
let timeLeft = 120; // Tăng lên 120 giây
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
    symbols.sort(() => Math.random() - 0.5);
    
    symbols.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card', 'flipped');
        card.dataset.symbol = symbol;
        card.innerText = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
        isPreviewing = false;
        startCountdown();
    }, 10000); 
}

function updateDisplay() {
    timerDisplay.innerText = `Thời gian: ${timeLeft}s`;
    wrongDisplay.innerText = `Sai liên tiếp: ${wrongConsecutive}/5`;
    timerDisplay.style.color = timeLeft <= 20 ? '#e74c3c' : '#f1c40f';
}

function startCountdown() {
    gameInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert("HẾT GIỜ! Bạn đã thất bại.");
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
        // ĐÚNG: Reset số lần sai liên tiếp về 0
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        wrongConsecutive = 0; 
        flippedCards = [];
        updateDisplay();
        
        if (matchedCount === 36) {
            clearInterval(gameInterval);
            setTimeout(() => alert(`XUẤT SẮC! Bạn thắng khi còn ${timeLeft}s`), 500);
        }
    } else {
        // SAI: Tăng số lần sai liên tiếp
        wrongConsecutive++;
        if (wrongConsecutive >= 5) {
            timeLeft = Math.max(0, timeLeft - 10); // Trừ 10 giây
            wrongConsecutive = 0; // Reset sau khi đã phạt
            showPenaltyEffect(); // Hiệu ứng đỏ màn hình nếu muốn
        }
        
        updateDisplay();
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function showPenaltyEffect() {
    timerDisplay.style.fontSize = "40px";
    setTimeout(() => timerDisplay.style.fontSize = "28px", 500);
}

function resetGame() { initGame(); }
initGame();
}

function resetGame() { initGame(); }
initGame();
