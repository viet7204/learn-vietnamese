// Grade-specific Practice JavaScript
protectPage();

// Get grade and lesson parameters
const urlParams = new URLSearchParams(window.location.search);
const gradeLevel = urlParams.get('grade') || 'prek';
const lessonNum = parseInt(urlParams.get('lesson')) || null;

// Update header based on grade
document.getElementById('practiceTitle').textContent = `Practice - ${getGradeName(gradeLevel)}${lessonNum ? ` - Lesson ${lessonNum}` : ''}`;
document.getElementById('backLink').href = lessonNum ? `lesson.html?grade=${gradeLevel}&lesson=${lessonNum}` : `grade.html?level=${gradeLevel}`;

// Grade-specific vocabulary database
const gradeVocabulary = {
    prek: [
        // Colors
        { word: "màu đỏ", translation: "red", pronunciation: "màu đỏ" },
        { word: "màu xanh", translation: "blue", pronunciation: "màu xanh" },
        { word: "màu vàng", translation: "yellow", pronunciation: "màu vàng" },
        { word: "màu trắng", translation: "white", pronunciation: "màu trắng" },
        { word: "màu đen", translation: "black", pronunciation: "màu đen" },
        // Animals
        { word: "con gà", translation: "chicken", pronunciation: "kon gà" },
        { word: "con bò", translation: "cow", pronunciation: "kon bò" },
        { word: "con lợn", translation: "pig", pronunciation: "kon lợn" },
        { word: "con ngựa", translation: "horse", pronunciation: "kon ngựa" },
        { word: "con vịt", translation: "duck", pronunciation: "kon vịt" },
        // Numbers
        { word: "một", translation: "one", pronunciation: "một" },
        { word: "hai", translation: "two", pronunciation: "hai" },
        { word: "ba", translation: "three", pronunciation: "ba" },
        { word: "bốn", translation: "four", pronunciation: "bốn" },
        { word: "năm", translation: "five", pronunciation: "năm" }
    ],
    kindergarten: [
        // Greetings
        { word: "Xin chào", translation: "Hello", pronunciation: "sin chào" },
        { word: "Tạm biệt", translation: "Goodbye", pronunciation: "tạm biệt" },
        { word: "Cảm ơn", translation: "Thank you", pronunciation: "kảm ơn" },
        // Classroom
        { word: "bút", translation: "pen", pronunciation: "bút" },
        { word: "sách", translation: "book", pronunciation: "sách" },
        { word: "bảng", translation: "board", pronunciation: "bảng" },
        { word: "bàn", translation: "desk", pronunciation: "bàn" },
        { word: "ghế", translation: "chair", pronunciation: "ghế" },
        // Body parts
        { word: "đầu", translation: "head", pronunciation: "đầu" },
        { word: "tay", translation: "hand", pronunciation: "tay" },
        { word: "chân", translation: "foot", pronunciation: "chân" },
        { word: "mắt", translation: "eye", pronunciation: "mắt" },
        { word: "tai", translation: "ear", pronunciation: "tai" }
    ],
    grade1: [
        // Alphabet basics
        { word: "chữ cái", translation: "letter", pronunciation: "chữ kái" },
        { word: "bảng chữ cái", translation: "alphabet", pronunciation: "bảng chữ kái" },
        // At home
        { word: "nhà", translation: "house", pronunciation: "nhà" },
        { word: "phòng", translation: "room", pronunciation: "fòng" },
        { word: "cửa", translation: "door", pronunciation: "cửa" },
        { word: "cửa sổ", translation: "window", pronunciation: "cửa sổ" },
        // Daily life
        { word: "ăn", translation: "eat", pronunciation: "ăn" },
        { word: "uống", translation: "drink", pronunciation: "uống" },
        { word: "ngủ", translation: "sleep", pronunciation: "ngủ" },
        { word: "học", translation: "study", pronunciation: "hok" },
        { word: "chơi", translation: "play", pronunciation: "chơi" }
    ],
    grade2: [
        // Question words
        { word: "Ai?", translation: "Who?", pronunciation: "ai" },
        { word: "Gì?", translation: "What?", pronunciation: "zì" },
        { word: "Ở đâu?", translation: "Where?", pronunciation: "ở đâu" },
        { word: "Khi nào?", translation: "When?", pronunciation: "ki nào" },
        { word: "Tại sao?", translation: "Why?", pronunciation: "tại sao" },
        // Adjectives
        { word: "đẹp", translation: "beautiful", pronunciation: "đẹp" },
        { word: "xấu", translation: "ugly", pronunciation: "xấu" },
        { word: "lớn", translation: "big", pronunciation: "lớn" },
        { word: "nhỏ", translation: "small", pronunciation: "nhỏ" },
        { word: "tốt", translation: "good", pronunciation: "tốt" }
    ],
    grade3: [
        // Advanced conversation
        { word: "Tôi nghĩ", translation: "I think", pronunciation: "tôi nghĩ" },
        { word: "Tôi thích", translation: "I like", pronunciation: "tôi tích" },
        { word: "Theo tôi", translation: "In my opinion", pronunciation: "teo tôi" },
        // Food
        { word: "cơm", translation: "rice", pronunciation: "kơm" },
        { word: "phở", translation: "pho soup", pronunciation: "fở" },
        { word: "bánh mì", translation: "bread", pronunciation: "bánh mì" },
        { word: "nước", translation: "water", pronunciation: "nước" },
        // Sports
        { word: "bóng đá", translation: "soccer", pronunciation: "bóng đá" },
        { word: "bơi lội", translation: "swimming", pronunciation: "bơi lội" },
        { word: "chạy", translation: "running", pronunciation: "chạy" }
    ],
    advanced: [
        // Complex grammar
        { word: "mặc dù", translation: "although", pronunciation: "mặk zù" },
        { word: "bởi vì", translation: "because", pronunciation: "bởi vì" },
        { word: "do đó", translation: "therefore", pronunciation: "zo đó" },
        { word: "tuy nhiên", translation: "however", pronunciation: "tuy niên" },
        // Idioms
        { word: "có công mài sắt", translation: "hard work pays off", pronunciation: "kó kong mài sắt" },
        { word: "học hỏi", translation: "to learn", pronunciation: "hok hỏi" },
        { word: "kiên trì", translation: "perseverance", pronunciation: "kiên trì" }
    ]
};

// Grade-specific fill-in-the-blank questions
const gradeSentences = {
    prek: [
        { text: "Quả táo có màu ___ (red)", answer: "đỏ" },
        { text: "Con ___ (chicken) nói gà gà", answer: "gà" },
        { text: "Tôi đếm: một, hai, ___ (three)", answer: "ba" },
        { text: "Bầu trời có màu ___ (blue)", answer: "xanh" },
        { text: "Mặt trời có màu ___ (yellow)", answer: "vàng" }
    ],
    kindergarten: [
        { text: "___ (Hello)! Bạn khỏe không?", answer: "Xin chào" },
        { text: "Tôi viết bằng cái ___ (pen)", answer: "bút" },
        { text: "Tôi đọc cuốn ___ (book)", answer: "sách" },
        { text: "___ (Thank you) rất nhiều!", answer: "Cảm ơn" },
        { text: "Tôi ngồi trên cái ___ (chair)", answer: "ghế" }
    ],
    grade1: [
        { text: "Tiếng Việt có 29 ___ (letters)", answer: "chữ cái" },
        { text: "Tôi ___ (eat) cơm mỗi ngày", answer: "ăn" },
        { text: "Buổi tối tôi đi ___ (sleep)", answer: "ngủ" },
        { text: "Tôi ___ (study) bài mỗi ngày", answer: "học" },
        { text: "Tôi mở cái ___ (door) ra ngoài", answer: "cửa" }
    ],
    grade2: [
        { text: "___ (Who) là bạn thân của bạn?", answer: "Ai" },
        { text: "Bạn ở ___ (where)?", answer: "đâu" },
        { text: "Bạn học ___ (when)?", answer: "khi nào" },
        { text: "Hoa này rất ___ (beautiful)", answer: "đẹp" },
        { text: "Cái túi này quá ___ (big)", answer: "lớn" }
    ],
    grade3: [
        { text: "___ (I think) bài này khó", answer: "Tôi nghĩ" },
        { text: "Tôi ___ (like) ăn phở", answer: "thích" },
        { text: "Tôi thích chơi ___ (soccer)", answer: "bóng đá" },
        { text: "Tôi uống ___ (water) mỗi ngày", answer: "nước" },
        { text: "Tôi ___ (swim) mỗi tuần", answer: "bơi lội" }
    ],
    advanced: [
        { text: "___ (Although) trời mưa, tôi vẫn đi học", answer: "Mặc dù" },
        { text: "Tôi không đi ___ (because) tôi bận", answer: "bởi vì" },
        { text: "Phải ___ (persevere) mới thành công", answer: "kiên trì" },
        { text: "___ (However) tôi không đồng ý", answer: "Tuy nhiên" },
        { text: "Phải ___ (learn) hỏi mãi", answer: "học" }
    ]
};

// Get vocabulary for current grade
const currentVocab = gradeVocabulary[gradeLevel] || gradeVocabulary.prek;
const currentSentences = gradeSentences[gradeLevel] || gradeSentences.prek;

// Game state
let currentGame = null;
let gameScore = 0;
let selectedItems = [];

// Game selection
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', function() {
        const game = this.dataset.game;
        startGame(game);
    });
});

function startGame(gameName) {
    currentGame = gameName;
    document.getElementById('gameSelection').style.display = 'none';
    document.querySelectorAll('.game-area').forEach(area => area.classList.remove('active'));
    document.getElementById('game-' + gameName).classList.add('active');
    
    // Initialize game
    switch(gameName) {
        case 'matching': startMatching(); break;
        case 'fillblank': newFillBlanks(); break;
        case 'quiz': startQuiz(); break;
        case 'memory': startMemory(); break;
        case 'listening': newListening(); break;
    }
}

function backToSelection() {
    document.querySelectorAll('.game-area').forEach(area => area.classList.remove('active'));
    document.getElementById('gameSelection').style.display = 'grid';
    currentGame = null;
}

// MATCHING GAME
function startMatching() {
    gameScore = 0;
    selectedItems = [];
    document.getElementById('matchScore').textContent = '0';
    
    const vocab = shuffleArray([...currentVocab]).slice(0, 6);
    const vietnamese = shuffleArray(vocab.map(v => ({ word: v.word, id: v.word })));
    const english = shuffleArray(vocab.map(v => ({ word: v.translation, id: v.word })));
    
    const viCol = document.getElementById('vietnameseColumn');
    const enCol = document.getElementById('englishColumn');
    
    viCol.innerHTML = '';
    enCol.innerHTML = '';
    
    vietnamese.forEach(item => {
        const div = document.createElement('div');
        div.className = 'matching-item';
        div.textContent = item.word;
        div.dataset.id = item.id;
        div.dataset.lang = 'vi';
        div.onclick = () => selectMatchingItem(div);
        viCol.appendChild(div);
    });
    
    english.forEach(item => {
        const div = document.createElement('div');
        div.className = 'matching-item';
        div.textContent = item.word;
        div.dataset.id = item.id;
        div.dataset.lang = 'en';
        div.onclick = () => selectMatchingItem(div);
        enCol.appendChild(div);
    });
}

function selectMatchingItem(element) {
    if (element.classList.contains('matched')) return;
    
    if (selectedItems.length === 0) {
        element.classList.add('selected');
        selectedItems.push(element);
    } else if (selectedItems.length === 1) {
        if (selectedItems[0].dataset.lang === element.dataset.lang) {
            selectedItems[0].classList.remove('selected');
            selectedItems = [];
            element.classList.add('selected');
            selectedItems.push(element);
        } else {
            element.classList.add('selected');
            selectedItems.push(element);
            
            setTimeout(() => {
                if (selectedItems[0].dataset.id === selectedItems[1].dataset.id) {
                    selectedItems.forEach(item => {
                        item.classList.remove('selected');
                        item.classList.add('matched');
                    });
                    gameScore++;
                    document.getElementById('matchScore').textContent = gameScore;
                    
                    if (document.querySelectorAll('.matching-item.matched').length === 12) {
                        setTimeout(() => showResults(gameScore, 6), 500);
                    }
                } else {
                    selectedItems.forEach(item => item.classList.remove('selected'));
                }
                selectedItems = [];
            }, 600);
        }
    }
}

// FILL IN THE BLANK
function newFillBlanks() {
    const selected = shuffleArray([...currentSentences]).slice(0, 5);
    const container = document.getElementById('fillBlankQuestions');
    container.innerHTML = '';
    
    selected.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'fill-blank-question';
        const parts = q.text.split('___');
        div.innerHTML = `
            <strong>Question ${i + 1}:</strong><br>
            ${parts[0]}<input type="text" class="blank-input" data-answer="${q.answer}" id="blank-${i}">${parts[1] || ''}
        `;
        container.appendChild(div);
    });
    
    document.getElementById('fillTotal').textContent = selected.length;
    document.getElementById('fillScore').textContent = '0';
}

function checkFillBlanks() {
    let correct = 0;
    const inputs = document.querySelectorAll('.blank-input');
    
    inputs.forEach(input => {
        const answer = input.dataset.answer.toLowerCase().trim();
        const userAnswer = input.value.toLowerCase().trim();
        
        if (userAnswer === answer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correct++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
        }
    });
    
    document.getElementById('fillScore').textContent = correct;
    
    if (correct === inputs.length) {
        setTimeout(() => showResults(correct, inputs.length), 1000);
    }
}

// QUIZ GAME
let quizQuestions = [];
let currentQuizIndex = 0;
let quizCorrect = 0;

function startQuiz() {
    quizCorrect = 0;
    currentQuizIndex = 0;
    
    quizQuestions = [];
    const vocab = shuffleArray([...currentVocab]).slice(0, 10);
    
    vocab.forEach(v => {
        const wrongAnswers = shuffleArray(currentVocab.filter(w => w.translation !== v.translation))
            .slice(0, 3)
            .map(w => w.translation);
        const options = shuffleArray([v.translation, ...wrongAnswers]);
        
        quizQuestions.push({
            question: `What is "${v.word}" in English?`,
            options: options,
            correct: v.translation
        });
    });
    
    document.getElementById('quizTotal').textContent = quizQuestions.length;
    document.getElementById('quizScore').textContent = '0';
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizIndex >= quizQuestions.length) {
        showResults(quizCorrect, quizQuestions.length);
        return;
    }
    
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quizCurrent').textContent = currentQuizIndex + 1;
    
    const container = document.getElementById('quizQuestion');
    container.innerHTML = `
        <div class="quiz-question">
            <h3>${q.question}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option" onclick="selectQuizOption(this, '${opt}', '${q.correct}')">${opt}</div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('quizNextBtn').disabled = true;
    document.getElementById('quizNextBtn').style.opacity = '0.5';
}

function selectQuizOption(element, selected, correct) {
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (opt.textContent === correct) {
            opt.classList.add('correct');
        }
        if (opt === element && opt.textContent !== correct) {
            opt.classList.add('incorrect');
        }
    });
    
    if (selected === correct) {
        quizCorrect++;
        document.getElementById('quizScore').textContent = quizCorrect;
    }
    
    document.getElementById('quizNextBtn').disabled = false;
    document.getElementById('quizNextBtn').style.opacity = '1';
}

function nextQuizQuestion() {
    currentQuizIndex++;
    showQuizQuestion();
}

// MEMORY GAME
let memoryCards = [];
let flippedCards = [];
let memoryMoves = 0;
let memoryMatches = 0;

function startMemory() {
    memoryMoves = 0;
    memoryMatches = 0;
    flippedCards = [];
    
    document.getElementById('memoryMoves').textContent = '0';
    document.getElementById('memoryMatches').textContent = '0';
    
    const vocab = shuffleArray([...currentVocab]).slice(0, 8);
    memoryCards = [];
    
    vocab.forEach(v => {
        memoryCards.push({ text: v.word, id: v.word, type: 'vi' });
        memoryCards.push({ text: v.translation, id: v.word, type: 'en' });
    });
    
    memoryCards = shuffleArray(memoryCards);
    
    const grid = document.getElementById('memoryGrid');
    grid.innerHTML = '';
    
    memoryCards.forEach((card, i) => {
        const div = document.createElement('div');
        div.className = 'memory-card';
        div.textContent = '?';
        div.dataset.index = i;
        div.onclick = () => flipMemoryCard(div, i);
        grid.appendChild(div);
    });
}

function flipMemoryCard(element, index) {
    if (flippedCards.length === 2 || element.classList.contains('flipped') || element.classList.contains('matched')) {
        return;
    }
    
    element.classList.add('flipped');
    element.textContent = memoryCards[index].text;
    flippedCards.push({ element, index });
    
    if (flippedCards.length === 2) {
        memoryMoves++;
        document.getElementById('memoryMoves').textContent = memoryMoves;
        
        setTimeout(() => {
            const card1 = memoryCards[flippedCards[0].index];
            const card2 = memoryCards[flippedCards[1].index];
            
            if (card1.id === card2.id && card1.type !== card2.type) {
                flippedCards.forEach(fc => fc.element.classList.add('matched'));
                memoryMatches++;
                document.getElementById('memoryMatches').textContent = memoryMatches;
                
                if (memoryMatches === 8) {
                    setTimeout(() => showResults(memoryMatches, memoryMoves, 'moves'), 500);
                }
            } else {
                flippedCards.forEach(fc => {
                    fc.element.classList.remove('flipped');
                    fc.element.textContent = '?';
                });
            }
            
            flippedCards = [];
        }, 800);
    }
}

// LISTENING PRACTICE
let currentListeningWord = null;

function newListening() {
    const vocab = shuffleArray([...currentVocab]).slice(0, 1)[0];
    currentListeningWord = vocab;
    
    const wrong = shuffleArray(currentVocab.filter(v => v.word !== vocab.word)).slice(0, 3);
    const options = shuffleArray([vocab, ...wrong]);
    
    const container = document.getElementById('listeningOptions');
    container.innerHTML = '';
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = opt.translation;
        btn.onclick = () => checkListening(opt.word === vocab.word, btn);
        container.appendChild(btn);
    });
    
    playListeningWord();
}

function playListeningWord() {
    if (currentListeningWord && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(currentListeningWord.word);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
    }
}

function checkListening(correct, button) {
    const buttons = document.querySelectorAll('#listeningOptions .btn');
    buttons.forEach(btn => btn.disabled = true);
    
    if (correct) {
        button.style.background = '#4CAF50';
        const current = parseInt(document.getElementById('listenScore').textContent);
        document.getElementById('listenScore').textContent = current + 1;
    } else {
        button.style.background = '#f44336';
    }
    
    const total = parseInt(document.getElementById('listenTotal').textContent);
    document.getElementById('listenTotal').textContent = total + 1;
    
    setTimeout(newListening, 2000);
}

// TYPING CHALLENGE
let typingTimer = null;
let typingTimeLeft = 60;
let typingCurrentWord = null;

function startTyping() {
    clearInterval(typingTimer);
    typingTimeLeft = 60;
    gameScore = 0;
    
    document.getElementById('typingTime').textContent = '60';
    document.getElementById('typingScore').textContent = '0';
    document.getElementById('typingInput').disabled = false;
    document.getElementById('typingInput').value = '';
    document.getElementById('typingInput').focus();
    document.getElementById('typingFeedback').textContent = '';
    
    nextTypingWord();
    
    typingTimer = setInterval(() => {
        typingTimeLeft--;
        document.getElementById('typingTime').textContent = typingTimeLeft;
        
        if (typingTimeLeft <= 0) {
            endTyping();
        }
    }, 1000);
}

function nextTypingWord() {
    typingCurrentWord = shuffleArray([...currentVocab])[0];
    document.getElementById('typingWord').textContent = typingCurrentWord.word;
    document.getElementById('typingInput').value = '';
    document.getElementById('typingFeedback').textContent = '';
}

document.getElementById('typingInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const answer = this.value.toLowerCase().trim();
        const correct = typingCurrentWord.translation.toLowerCase();
        
        if (answer === correct) {
            gameScore++;
            document.getElementById('typingScore').textContent = gameScore;
            document.getElementById('typingFeedback').textContent = '✓ Correct!';
            document.getElementById('typingFeedback').style.color = '#4CAF50';
            nextTypingWord();
        } else {
            document.getElementById('typingFeedback').textContent = `✗ Wrong! Correct: ${typingCurrentWord.translation}`;
            document.getElementById('typingFeedback').style.color = '#f44336';
        }
    }
});

function endTyping() {
    clearInterval(typingTimer);
    document.getElementById('typingInput').disabled = true;
    showResults(gameScore, 60, 'time');
}

// RESULTS
function showResults(score, total, type = 'questions') {
    document.getElementById('finalScore').textContent = score;
    
    if (type === 'time') {
        document.getElementById('finalAccuracy').textContent = score + ' words';
        document.getElementById('finalTime').textContent = total + 's';
    } else if (type === 'moves') {
        document.getElementById('finalAccuracy').textContent = '8 pairs';
        document.getElementById('finalTime').textContent = total + ' moves';
    } else {
        const accuracy = Math.round((score / total) * 100);
        document.getElementById('finalAccuracy').textContent = accuracy + '%';
        document.getElementById('finalTime').textContent = total + ' ' + type;
    }
    
    document.getElementById('resultsModal').classList.add('active');
}

function closeResults() {
    document.getElementById('resultsModal').classList.remove('active');
}

// Helper functions
function getGradeName(level) {
    const names = {
        prek: 'Pre-Kindergarten',
        kindergarten: 'Kindergarten',
        grade1: 'Grade 1',
        grade2: 'Grade 2',
        grade3: 'Grade 3',
        advanced: 'Advanced (Grades 4-6)'
    };
    return names[level] || 'Unknown Grade';
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
