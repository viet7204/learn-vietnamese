// Vietnamese Speaking Practice with Web Speech API

// Practice vocabulary data
const practiceData = {
    beginner: {
        words: [
            { vietnamese: "Xin chào", english: "Hello", pronunciation: "sin chao" },
            { vietnamese: "Cảm ơn", english: "Thank you", pronunciation: "gam un" },
            { vietnamese: "Tạm biệt", english: "Goodbye", pronunciation: "tam biet" },
            { vietnamese: "Vâng", english: "Yes", pronunciation: "vung" },
            { vietnamese: "Không", english: "No", pronunciation: "khong" },
            { vietnamese: "Xin lỗi", english: "Sorry", pronunciation: "sin loy" },
            { vietnamese: "Tôi", english: "I/Me", pronunciation: "toy" },
            { vietnamese: "Bạn", english: "You", pronunciation: "ban" },
            { vietnamese: "Nước", english: "Water", pronunciation: "nuoc" },
            { vietnamese: "Cơm", english: "Rice", pronunciation: "com" }
        ],
        phrases: [
            { vietnamese: "Xin chào bạn", english: "Hello you", pronunciation: "sin chao ban" },
            { vietnamese: "Cảm ơn bạn", english: "Thank you", pronunciation: "gam un ban" },
            { vietnamese: "Xin lỗi, làm ơn chỉ đường về quận 3", english: "Excuse me, please show me the way to District 3", pronunciation: "sin loy, lam un chi duong ve quan 3" },
            { vietnamese: "Tôi muốn đi chợ Bến Thành", english: "I want to go to Ben Thanh Market", pronunciation: "toy muon di cho ben thanh" },
            { vietnamese: "Bạn có nói tiếng Anh không", english: "Do you speak English?", pronunciation: "ban co noi tieng anh khong" },
            { vietnamese: "Cái này bao nhiêu tiền", english: "How much is this?", pronunciation: "cai nay bao nhieu tien" },
            { vietnamese: "Tôi không hiểu tiếng Việt", english: "I don't understand Vietnamese", pronunciation: "toy khong hieu tieng viet" },
            { vietnamese: "Làm ơn nói chậm hơn", english: "Please speak slower", pronunciation: "lam un noi cham hon" },
            { vietnamese: "Cho tôi một ly cà phê", english: "Give me one coffee", pronunciation: "cho toy mot ly ca phe" },
            { vietnamese: "Gần đây có nhà vệ sinh không", english: "Is there a restroom nearby?", pronunciation: "gan day co nha ve sinh khong" }
        ],
        tones: [
            { vietnamese: "ma", english: "ghost (flat tone)", pronunciation: "ma" },
            { vietnamese: "má", english: "mother (rising tone)", pronunciation: "ma↗" },
            { vietnamese: "mà", english: "but (falling tone)", pronunciation: "ma↘" },
            { vietnamese: "mả", english: "tomb (curve tone)", pronunciation: "ma↗↘" },
            { vietnamese: "mã", english: "horse (wavy tone)", pronunciation: "ma~" },
            { vietnamese: "mạ", english: "rice seedling (drop tone)", pronunciation: "ma." }
        ]
    },
    intermediate: {
        words: [
            { vietnamese: "Thời tiết", english: "Weather", pronunciation: "thoi tiet" },
            { vietnamese: "Gia đình", english: "Family", pronunciation: "za dinh" },
            { vietnamese: "Công việc", english: "Work", pronunciation: "cong viec" },
            { vietnamese: "Học tập", english: "Study", pronunciation: "hoc tap" },
            { vietnamese: "Bệnh viện", english: "Hospital", pronunciation: "benh vien" },
            { vietnamese: "Nhà hàng", english: "Restaurant", pronunciation: "nha hang" },
            { vietnamese: "Sân bay", english: "Airport", pronunciation: "san bay" },
            { vietnamese: "Ngân hàng", english: "Bank", pronunciation: "ngan hang" }
        ],
        phrases: [
            { vietnamese: "Tôi muốn đi siêu thị", english: "I want to go to the supermarket", pronunciation: "toy muon di sieu thi" },
            { vietnamese: "Bao nhiêu tiền một kg", english: "How much per kilogram", pronunciation: "bao nhieu tien mot kg" },
            { vietnamese: "Bưu điện ở đâu", english: "Where is the post office?", pronunciation: "buu dien o dau" },
            { vietnamese: "Làm sao đi đến sân bay", english: "How to get to the airport", pronunciation: "lam sao di den san bay" },
            { vietnamese: "Làm ơn giúp tôi gọi taxi", english: "Please help me call a taxi", pronunciation: "lam un zip toy goi taxi" },
            { vietnamese: "Tôi bị lạc đường rồi", english: "I am lost", pronunciation: "toy bi lac duong roi" },
            { vietnamese: "Cho tôi xem menu", english: "Show me the menu please", pronunciation: "cho toy xem menu" },
            { vietnamese: "Có phòng trống không", english: "Do you have available rooms?", pronunciation: "co phong trong khong" },
            { vietnamese: "Bao giờ xe buýt đến", english: "When does the bus arrive?", pronunciation: "bao gio xe buyt den" },
            { vietnamese: "Tôi cần đổi tiền", english: "I need to exchange money", pronunciation: "toy can doi tien" }
        ],
        tones: [
            { vietnamese: "đi", english: "go", pronunciation: "di" },
            { vietnamese: "dĩ", english: "fork", pronunciation: "zi" },
            { vietnamese: "bán", english: "sell", pronunciation: "ban" },
            { vietnamese: "bàn", english: "table", pronunciation: "ban" }
        ]
    },
    advanced: {
        words: [
            { vietnamese: "Kinh nghiệm", english: "Experience", pronunciation: "kinh nghiem" },
            { vietnamese: "Phát triển", english: "Development", pronunciation: "phat trien" },
            { vietnamese: "Thành công", english: "Success", pronunciation: "thanh cong" },
            { vietnamese: "Trách nhiệm", english: "Responsibility", pronunciation: "trach nhiem" },
            { vietnamese: "Văn hóa", english: "Culture", pronunciation: "van hoa" }
        ],
        phrases: [
            { vietnamese: "Tôi rất vui được gặp bạn", english: "I'm very happy to meet you", pronunciation: "toy rat vui duoc gap ban" },
            { vietnamese: "Xin vui lòng giúp tôi điền vào giấy tờ này", english: "Please help me fill out this form", pronunciation: "sin vui long zip toy dien vao giay to nay" },
            { vietnamese: "Tôi đang học tiếng Việt", english: "I'm learning Vietnamese", pronunciation: "toy dang hoc tieng viet" },
            { vietnamese: "Làm ơn cho tôi xem hộ chiếu", english: "Please show me your passport", pronunciation: "lam un cho toy xem ho chieu" },
            { vietnamese: "Tôi muốn gặp bác sĩ", english: "I want to see a doctor", pronunciation: "toy muon gap bac si" },
            { vietnamese: "Chúc mừng năm mới", english: "Happy New Year", pronunciation: "chuc mung nam moi" },
            { vietnamese: "Món này có cay không", english: "Is this dish spicy?", pronunciation: "mon nay co cay khong" }
        ],
        tones: [
            { vietnamese: "làm việc", english: "work", pronunciation: "lam viec" },
            { vietnamese: "học hành", english: "study", pronunciation: "hoc hanh" }
        ]
    }
};

class VietnamesePractice {
    constructor() {
        this.currentLevel = 'beginner';
        this.currentMode = 'words';
        this.currentIndex = 0;
        this.practiceCount = 0;
        this.correctCount = 0;
        this.streak = 0;
        this.maxPractice = 10;
        
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.voices = [];
        this.selectedVoice = null;
        
        this.initElements();
        this.initSpeechRecognition();
        this.loadVoices();
        this.bindEvents();
        this.loadWord();
    }
    
    initElements() {
        this.targetWord = document.getElementById('target-word');
        this.wordMeaning = document.getElementById('word-meaning');
        this.wordPronunciation = document.getElementById('word-pronunciation');
        this.listenBtn = document.getElementById('listen-btn');
        this.recordBtn = document.getElementById('record-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.recognitionResult = document.getElementById('recognition-result');
        this.recognizedText = document.getElementById('recognized-text');
        this.matchIndicator = document.getElementById('match-indicator');
        this.progressFill = document.getElementById('progress-fill');
        this.practiceCountEl = document.getElementById('practice-count');
        this.accuracyScore = document.getElementById('accuracy-score');
        this.streakCount = document.getElementById('streak-count');
        this.totalCorrect = document.getElementById('total-correct');
        this.browserNotice = document.getElementById('browser-notice');
        this.voiceSelect = document.getElementById('voice-select');
    }
    
    loadVoices() {
        this.voices = this.synthesis.getVoices();
        
        if (this.voices.length === 0) {
            // Voices not loaded yet, wait for event
            this.synthesis.onvoiceschanged = () => {
                this.voices = this.synthesis.getVoices();
                this.populateVoiceList();
            };
        } else {
            this.populateVoiceList();
        }
    }
    
    populateVoiceList() {
        if (!this.voiceSelect) return;
        
        // Filter Vietnamese voices
        const vietnameseVoices = this.voices.filter(voice => voice.lang.startsWith('vi'));
        
        // Clear existing options
        this.voiceSelect.innerHTML = '';
        
        if (vietnameseVoices.length === 0) {
            this.voiceSelect.innerHTML = '<option>No Vietnamese voices found</option>';
            // Fall back to any available voice
            if (this.voices.length > 0) {
                vietnameseVoices.push(...this.voices.slice(0, 5));
            }
        }
        
        // Add Vietnamese voices first
        vietnameseVoices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            option.dataset.voiceName = voice.name;
            option.dataset.voiceLang = voice.lang;
            this.voiceSelect.appendChild(option);
            
            // Set first Vietnamese voice as default
            if (index === 0) {
                this.selectedVoice = voice;
            }
        });
        
        // Add divider and other voices
        if (vietnameseVoices.length > 0 && this.voices.length > vietnameseVoices.length) {
            const divider = document.createElement('option');
            divider.disabled = true;
            divider.textContent = '--- Other Voices ---';
            this.voiceSelect.appendChild(divider);
        }
        
        // Add some other voices as alternative
        const otherVoices = this.voices.filter(v => !v.lang.startsWith('vi')).slice(0, 10);
        otherVoices.forEach(voice => {
            const option = document.createElement('option');
            option.value = this.voices.indexOf(voice);
            option.textContent = `${voice.name} (${voice.lang})`;
            this.voiceSelect.appendChild(option);
        });
    }
    
    initSpeechRecognition() {
        // Check browser support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            this.browserNotice.classList.remove('hidden');
            this.recordBtn.disabled = true;
            return;
        }
        
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'vi-VN';
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.handleRecognitionResult(transcript);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.recordBtn.classList.remove('recording');
            this.recordBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Record</span>';
        };
        
        this.recognition.onend = () => {
            this.recordBtn.classList.remove('recording');
            this.recordBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Record</span>';
        };
    }
    
    bindEvents() {
        // Level selection
        document.querySelectorAll('.level-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.level-select-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentLevel = btn.dataset.level;
                this.resetPractice();
            });
        });
        
        // Mode selection
        document.querySelectorAll('.mode-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-select-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentMode = btn.dataset.mode;
                this.resetPractice();
            });
        });
        
        // Control buttons
        this.listenBtn.addEventListener('click', () => this.speakWord());
        this.recordBtn.addEventListener('click', () => this.startRecording());
        this.nextBtn.addEventListener('click', () => this.nextWord());
        
        // Voice selection
        if (this.voiceSelect) {
            this.voiceSelect.addEventListener('change', (e) => {
                const selectedIndex = parseInt(e.target.value);
                this.selectedVoice = this.voices[selectedIndex];
            });
        }
    }
    
    getCurrentData() {
        const data = practiceData[this.currentLevel][this.currentMode];
        return data || practiceData[this.currentLevel].words;
    }
    
    loadWord() {
        const data = this.getCurrentData();
        const word = data[this.currentIndex];
        
        this.targetWord.textContent = word.vietnamese;
        this.wordMeaning.textContent = word.english;
        this.wordPronunciation.textContent = `/${word.pronunciation}/`;
        this.recognitionResult.classList.add('hidden');
    }
    
    speakWord() {
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        
        const word = this.getCurrentData()[this.currentIndex];
        
        // For tones, speak slower and repeat for clarity
        if (this.currentMode === 'tones') {
            this.speakTone(word.vietnamese);
        } else {
            const utterance = this.createUtterance(word.vietnamese, 0.75);
            this.synthesis.speak(utterance);
        }
    }
    
    speakTone(text) {
        // Speak tone 3 times slowly for better learning
        const utterance1 = this.createUtterance(text, 0.5);
        utterance1.pitch = 1.2; // Slightly higher pitch to emphasize tones
        
        const utterance2 = this.createUtterance(text, 0.5);
        utterance2.pitch = 1.2;
        
        const utterance3 = this.createUtterance(text, 0.5);
        utterance3.pitch = 1.2;
        
        // Speak first time
        this.synthesis.speak(utterance1);
        
        // Speak second time after a pause
        utterance1.onend = () => {
            setTimeout(() => {
                this.synthesis.speak(utterance2);
            }, 300);
        };
        
        // Speak third time after another pause
        utterance2.onend = () => {
            setTimeout(() => {
                this.synthesis.speak(utterance3);
            }, 300);
        };
    }
    
    createUtterance(text, rate) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = rate;
        utterance.volume = 1.0;
        
        // Use selected voice or fall back to Vietnamese voice
        if (this.selectedVoice) {
            utterance.voice = this.selectedVoice;
        } else {
            const vietnameseVoice = this.voices.find(voice => voice.lang.startsWith('vi'));
            if (vietnameseVoice) {
                utterance.voice = vietnameseVoice;
            }
        }
        
        return utterance;
    }
    
    startRecording() {
        if (!this.recognition) return;
        
        try {
            this.recordBtn.classList.add('recording');
            this.recordBtn.innerHTML = '<i class="fas fa-circle"></i><span>Recording...</span>';
            this.recognition.start();
        } catch (error) {
            console.error('Recording error:', error);
        }
    }
    
    handleRecognitionResult(transcript) {
        const currentWord = this.getCurrentData()[this.currentIndex];
        const targetText = this.normalizeVietnamese(currentWord.vietnamese);
        const spokenText = this.normalizeVietnamese(transcript);
        
        this.recognizedText.textContent = transcript;
        this.recognitionResult.classList.remove('hidden');
        
        // Check match
        const isExactMatch = spokenText === targetText;
        const similarity = this.calculateSimilarity(spokenText, targetText);
        
        if (isExactMatch || similarity > 0.8) {
            this.matchIndicator.className = 'match-indicator correct';
            this.matchIndicator.textContent = '✓ Correct! Xuất sắc!';
            this.correctCount++;
            this.streak++;
        } else if (similarity > 0.5) {
            this.matchIndicator.className = 'match-indicator partial';
            this.matchIndicator.textContent = '~ Close! Try again';
            this.streak = 0;
        } else {
            this.matchIndicator.className = 'match-indicator incorrect';
            this.matchIndicator.textContent = '✗ Try again';
            this.streak = 0;
        }
        
        this.updateStats();
    }
    
    normalizeVietnamese(text) {
        // Remove diacritics for comparison (optional - makes it easier)
        return text.toLowerCase().trim();
    }
    
    calculateSimilarity(str1, str2) {
        // Simple Levenshtein distance
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }
    
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }
    
    nextWord() {
        this.practiceCount++;
        const data = this.getCurrentData();
        this.currentIndex = (this.currentIndex + 1) % data.length;
        
        if (this.practiceCount >= this.maxPractice) {
            this.showResults();
            return;
        }
        
        this.loadWord();
        this.updateProgress();
    }
    
    updateProgress() {
        const progress = (this.practiceCount / this.maxPractice) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.practiceCountEl.textContent = this.practiceCount;
    }
    
    updateStats() {
        const accuracy = this.practiceCount > 0 
            ? Math.round((this.correctCount / this.practiceCount) * 100) 
            : 0;
        
        this.accuracyScore.textContent = `${accuracy}%`;
        this.streakCount.textContent = this.streak;
        this.totalCorrect.textContent = this.correctCount;
    }
    
    showResults() {
        const accuracy = Math.round((this.correctCount / this.practiceCount) * 100);
        alert(`Practice Complete!\n\nAccuracy: ${accuracy}%\nCorrect: ${this.correctCount}/${this.practiceCount}\nBest Streak: ${this.streak}\n\nGreat job! Keep practicing!`);
        this.resetPractice();
    }
    
    resetPractice() {
        this.currentIndex = 0;
        this.practiceCount = 0;
        this.correctCount = 0;
        this.streak = 0;
        this.loadWord();
        this.updateProgress();
        this.updateStats();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load voices for speech synthesis
    if (window.speechSynthesis) {
        speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            speechSynthesis.getVoices();
        };
    }
    
    // Initialize practice
    new VietnamesePractice();
});
