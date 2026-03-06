// Interactive Flashcards JavaScript
let currentCategory = 'animals';
let currentIndex = 0;
let currentCards = [];
let isFlipped = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCategory(currentCategory);
    setupEventListeners();
});

function setupEventListeners() {
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            loadCategory(currentCategory);
        });
    });

    // Flashcard flip
    document.getElementById('flashcard').addEventListener('click', flipCard);

    // Navigation buttons
    document.getElementById('prevBtn').addEventListener('click', previousCard);
    document.getElementById('nextBtn').addEventListener('click', nextCard);
    document.getElementById('shuffleBtn').addEventListener('click', shuffleCards);
    document.getElementById('audioBtn').addEventListener('click', pronounceWord);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') previousCard();
        if (e.key === 'ArrowRight') nextCard();
        if (e.key === ' ') {
            e.preventDefault();
            flipCard();
        }
    });
}

function loadCategory(category) {
    currentCards = [...flashcardData[category]];
    currentIndex = 0;
    isFlipped = false;
    updateCard();
}

function updateCard() {
    const card = currentCards[currentIndex];
    const flashcard = document.getElementById('flashcard');
    
    // Update content
    document.getElementById('cardWord').textContent = card.word;
    document.getElementById('cardPronunciation').textContent = card.pronunciation;
    document.getElementById('cardTranslation').textContent = card.translation;
    
    // Handle image
    const cardImage = document.getElementById('cardImage');
    if (card.image) {
        cardImage.src = card.image;
        cardImage.style.display = 'block';
    } else {
        cardImage.style.display = 'none';
    }
    
    // Reset flip
    if (isFlipped) {
        flashcard.classList.remove('flipped');
        isFlipped = false;
    }
    
    // Update progress
    updateProgress();
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

function nextCard() {
    if (currentIndex < currentCards.length - 1) {
        currentIndex++;
        updateCard();
    }
}

function previousCard() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
}

function shuffleCards() {
    // Fisher-Yates shuffle
    for (let i = currentCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentCards[i], currentCards[j]] = [currentCards[j], currentCards[i]];
    }
    currentIndex = 0;
    updateCard();
}

function updateProgress() {
    const progress = ((currentIndex + 1) / currentCards.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('cardCounter').textContent = `Card ${currentIndex + 1} of ${currentCards.length}`;
}

function pronounceWord() {
    const card = currentCards[currentIndex];
    
    // Try to use Web Speech API
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(card.word);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Sorry, your browser does not support text-to-speech.');
    }
}

// Auto-save progress to localStorage
function saveProgress() {
    const progress = {
        category: currentCategory,
        index: currentIndex,
        completed: currentCards.slice(0, currentIndex + 1).map(c => c.word)
    };
    localStorage.setItem('flashcardProgress', JSON.stringify(progress));
}

// Load saved progress
function loadProgress() {
    const saved = localStorage.getItem('flashcardProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        currentCategory = progress.category;
        currentIndex = progress.index;
        loadCategory(currentCategory);
    }
}

// Call saveProgress when moving to next card
document.getElementById('nextBtn').addEventListener('click', saveProgress);
document.getElementById('prevBtn').addEventListener('click', saveProgress);
