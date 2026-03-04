// Enhanced Lecture Interactive Features

// Study Mode Management
let currentMode = 'learn';
let completedTabs = new Set();
let currentTab = 'basics';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeStudyModes();
    initializeDragDrop();
    initializeMatchingGame();
    updateProgress();
    
    // Load voices for speech
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
});

// Tab Navigation
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            currentTab = tabId;
            markTabVisited(tabId);
            updateProgress();
            
            // Scroll to top of content
            document.querySelector('.tabs-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// Mark tab as visited
function markTabVisited(tabId) {
    completedTabs.add(tabId);
}

// Study Mode Toggle
function initializeStudyModes() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.getAttribute('data-mode');
            
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            currentMode = mode;
            applyStudyMode(mode);
        });
    });
}

function applyStudyMode(mode) {
    const phraseCards = document.querySelectorAll('.phrase-card');
    
    phraseCards.forEach(card => {
        const english = card.querySelector('.phrase-english');
        const pronunciation = card.querySelector('.phrase-pronunciation');
        
        if (mode === 'learn') {
            // Show everything
            if (english) english.style.display = 'block';
            if (pronunciation) pronunciation.style.display = 'block';
            card.classList.remove('practice-mode', 'quiz-mode');
        } else if (mode === 'practice') {
            // Hide English translation initially
            if (english) {
                english.style.display = 'none';
                english.classList.add('hidden-answer');
            }
            if (pronunciation) pronunciation.style.display = 'block';
            card.classList.add('practice-mode');
            card.classList.remove('quiz-mode');
            
            // Click to reveal
            card.addEventListener('click', function revealAnswer() {
                if (english && english.classList.contains('hidden-answer')) {
                    english.style.display = 'block';
                    english.classList.remove('hidden-answer');
                    english.classList.add('revealed');
                }
            }, { once: true });
        } else if (mode === 'quiz') {
            // Hide both English and pronunciation
            if (english) {
                english.style.display = 'none';
                english.classList.add('hidden-answer');
            }
            if (pronunciation) {
                pronunciation.style.display = 'none';
                pronunciation.classList.add('hidden-answer');
            }
            card.classList.add('quiz-mode');
            card.classList.remove('practice-mode');
            
            // Click to reveal both
            card.addEventListener('click', function revealAll() {
                if (english && english.classList.contains('hidden-answer')) {
                    english.style.display = 'block';
                    english.classList.remove('hidden-answer');
                }
                if (pronunciation && pronunciation.classList.contains('hidden-answer')) {
                    pronunciation.style.display = 'block';
                    pronunciation.classList.remove('hidden-answer');
                }
            }, { once: true });
        }
    });
}

// Text-to-Speech Function
function speakPhrase(text, card) {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    
    // Add visual feedback
    card.classList.add('speaking');
    setTimeout(() => card.classList.remove('speaking'), 500);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.7;
    
    const voices = window.speechSynthesis.getVoices();
    const vietnameseVoice = voices.find(voice => voice.lang.startsWith('vi'));
    if (vietnameseVoice) {
        utterance.voice = vietnameseVoice;
    }
    
    window.speechSynthesis.speak(utterance);
}

// Sentence Builder - Drag and Drop
function initializeDragDrop() {
    const wordTiles = document.querySelectorAll('.word-tile');
    const dropSlots = document.querySelectorAll('.drop-slot');
    
    wordTiles.forEach(tile => {
        tile.addEventListener('dragstart', handleDragStart);
        tile.addEventListener('dragend', handleDragEnd);
    });
    
    dropSlots.forEach(slot => {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('dragleave', handleDragLeave);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    if (draggedElement) {
        // Move the tile to the drop slot
        this.innerHTML = '';
        this.appendChild(draggedElement.cloneNode(true));
        draggedElement.style.display = 'none';
    }
    
    return false;
}

function checkSentence() {
    const dropSlots = document.querySelectorAll('.drop-slot');
    const correctOrder = ['Tôi', 'ăn', 'cơm'];
    let userOrder = [];
    
    dropSlots.forEach(slot => {
        const tile = slot.querySelector('.word-tile');
        if (tile) {
            userOrder.push(tile.getAttribute('data-word'));
        }
    });
    
    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
        showFeedback('Correct! Excellent work! 🎉', 'success');
        speakPhrase('Tôi ăn cơm', document.querySelector('.sentence-builder'));
    } else {
        showFeedback('Not quite right. Try again! The order is Subject-Verb-Object.', 'error');
    }
}

// Fill in the Blank
function checkFillBlank(inputId, correctAnswer) {
    const input = document.getElementById(inputId);
    const feedback = document.getElementById(inputId + '-feedback');
    const userAnswer = input.value.trim().toLowerCase();
    const correct = correctAnswer.toLowerCase();
    
    if (userAnswer === correct) {
        feedback.textContent = '✓ Correct!';
        feedback.className = 'fb-feedback correct';
        input.classList.add('correct');
    } else {
        feedback.textContent = '✗ Try again. The answer is: ' + correctAnswer;
        feedback.className = 'fb-feedback incorrect';
        input.classList.add('incorrect');
    }
    
    setTimeout(() => {
        feedback.textContent = '';
        input.classList.remove('correct', 'incorrect');
    }, 3000);
}

// Matching Game
let firstCard = null;
let secondCard = null;
let matchedPairs = 0;

function initializeMatchingGame() {
    const cards = document.querySelectorAll('.match-card');
    
    // Shuffle cards
    const parent = document.getElementById('matchingGame');
    if (parent) {
        const cardsArray = Array.from(cards);
        cardsArray.sort(() => Math.random() - 0.5);
        cardsArray.forEach(card => parent.appendChild(card));
        
        cards.forEach(card => {
            card.addEventListener('click', handleCardClick);
        });
    }
}

function handleCardClick() {
    if (this.classList.contains('matched') || this.classList.contains('selected')) {
        return;
    }
    
    this.classList.add('selected');
    
    if (!firstCard) {
        firstCard = this;
    } else if (!secondCard) {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    const pair1 = firstCard.getAttribute('data-pair');
    const pair2 = secondCard.getAttribute('data-pair');
    
    if (pair1 === pair2) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.classList.remove('selected');
        secondCard.classList.remove('selected');
        matchedPairs++;
        
        if (matchedPairs === 3) {
            setTimeout(() => {
                showFeedback('All matched! Great job! 🎊', 'success');
            }, 500);
        }
        
        firstCard = null;
        secondCard = null;
    } else {
        setTimeout(() => {
            firstCard.classList.remove('selected');
            secondCard.classList.remove('selected');
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

// Progress Tracking
function updateProgress() {
    const totalTabs = 6;
    const progress = (completedTabs.size / totalTabs) * 100;
    
    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
    
    // Update progress circle
    const progressCircle = document.getElementById('progressCircle');
    const progressPercent = document.getElementById('progressPercent');
    if (progressCircle && progressPercent) {
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (progress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressPercent.textContent = Math.round(progress);
    }
}

function markComplete() {
    completedTabs.add(currentTab);
    updateProgress();
    
    if (completedTabs.size === 6) {
        showFeedback('🎉 Lesson Complete! You\'ve mastered Vietnamese sentence structure!', 'success');
    } else {
        showFeedback('✓ Section marked as complete!', 'success');
    }
}

// Feedback Toast
function showFeedback(message, type) {
    const toast = document.createElement('div');
    toast.className = `feedback-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Tab navigation with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const tabs = Array.from(document.querySelectorAll('.tab-btn'));
        const currentIndex = tabs.findIndex(tab => tab.classList.contains('active'));
        
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            tabs[currentIndex - 1].click();
        } else if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
            tabs[currentIndex + 1].click();
        }
    }
});
