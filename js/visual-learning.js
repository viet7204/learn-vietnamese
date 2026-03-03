// Visual Vietnamese Learning Script

class VisualLearning {
    constructor() {
        this.currentScene = 'market';
        this.currentItem = null;
        this.learnedItems = new Set();
        this.synthesis = window.speechSynthesis;
        this.voices = [];
        
        this.vocabularyData = {
            // Market items
            pho: {
                icon: '🍜',
                vietnamese: 'Phở',
                pronunciation: 'fở',
                english: 'Vietnamese noodle soup',
                usage: 'A famous Vietnamese dish. Try: "Tôi muốn ăn phở" (I want to eat pho)'
            },
            banhmi: {
                icon: '🥖',
                vietnamese: 'Bánh mì',
                pronunciation: 'bánh mì',
                english: 'Vietnamese sandwich',
                usage: 'Popular street food. "Cho tôi một bánh mì" (Give me one banh mi)'
            },
            cafe: {
                icon: '☕',
                vietnamese: 'Cà phê',
                pronunciation: 'cà fê',
                english: 'Coffee',
                usage: 'Vietnam is famous for coffee! "Một cà phê sữa đá" (One iced milk coffee)'
            },
            com: {
                icon: '🍚',
                vietnamese: 'Cơm',
                pronunciation: 'cơm',
                english: 'Rice (cooked)',
                usage: 'Staple food. "Ăn cơm chưa?" (Have you eaten rice yet? = How are you?)'
            },
            bun: {
                icon: '🍝',
                vietnamese: 'Bún',
                pronunciation: 'bún',
                english: 'Vietnamese rice vermicelli',
                usage: 'Thin rice noodles. Popular in "bún chả" and "bún bò Huế"'
            },
            xoai: {
                icon: '🥭',
                vietnamese: 'Xoài',
                pronunciation: 'xoài',
                english: 'Mango',
                usage: 'Tropical fruit. "Xoài chín" (ripe mango), "Xoài xanh" (green mango)'
            },
            chuoi: {
                icon: '🍌',
                vietnamese: 'Chuối',
                pronunciation: 'chuối',
                english: 'Banana',
                usage: 'Common fruit. "Chuối rất rẻ" (Bananas are very cheap)'
            },
            nuoc: {
                icon: '💧',
                vietnamese: 'Nước',
                pronunciation: 'nước',
                english: 'Water',
                usage: 'Essential word! Also means "country". "Cho xin nước" (Water please)'
            },
            banh: {
                icon: '🧁',
                vietnamese: 'Bánh',
                pronunciation: 'bánh',
                english: 'Cake/pastry',
                usage: 'General term for cakes and pastries. "Bánh ngọt" (sweet cake)'
            },
            
            // Restaurant items
            thucdon: {
                icon: '📋',
                vietnamese: 'Thực đơn',
                pronunciation: 'thực đơn',
                english: 'Menu',
                usage: 'At restaurants: "Cho tôi xem thực đơn" (Show me the menu please)'
            },
            dia: {
                icon: '🍽️',
                vietnamese: 'Dĩa',
                pronunciation: 'zĩa',
                english: 'Plate',
                usage: 'Dining item. "Một dĩa cơm" (One plate of rice)'
            },
            coc: {
                icon: '🥤',
                vietnamese: 'Cốc',
                pronunciation: 'gốc',
                english: 'Glass/cup',
                usage: 'For drinks. "Một cốc nước" (One glass of water)'
            },
            muong: {
                icon: '🥄',
                vietnamese: 'Muỗng',
                pronunciation: 'muỗng',
                english: 'Spoon',
                usage: 'Utensil. "Cho thêm muỗng" (Give me another spoon)'
            },
            dua: {
                icon: '🥢',
                vietnamese: 'Đũa',
                pronunciation: 'đũa',
                english: 'Chopsticks',
                usage: 'Essential utensil! "Tôi không biết dùng đũa" (I don\'t know how to use chopsticks)'
            },
            phache: {
                icon: '🍨',
                vietnamese: 'Pha chế',
                pronunciation: 'fa chế',
                english: 'Mixed dessert',
                usage: 'Desserts and drinks. "Pha chế đá" (Iced blended drink)'
            },
            che: {
                icon: '🍧',
                vietnamese: 'Chè',
                pronunciation: 'chè',
                english: 'Sweet soup dessert',
                usage: 'Traditional Vietnamese dessert. Many varieties: "Chè bà ba", "Chè ba màu"'
            },
            
            // Street items
            xemay: {
                icon: '🛵',
                vietnamese: 'Xe máy',
                pronunciation: 'xe máy',
                english: 'Motorcycle/scooter',
                usage: 'Most common transport in Vietnam! "Tôi đi xe máy" (I go by motorbike)'
            },
            xebus: {
                icon: '🚌',
                vietnamese: 'Xe buýt',
                pronunciation: 'xe buých',
                english: 'Bus',
                usage: 'Public transport. "Xe buýt số mấy?" (Which bus number?)'
            },
            taxi: {
                icon: '🚕',
                vietnamese: 'Taxi',
                pronunciation: 'taxi',
                english: 'Taxi',
                usage: 'Same as English! "Gọi taxi giúp tôi" (Call me a taxi please)'
            },
            cho: {
                icon: '🏪',
                vietnamese: 'Chợ',
                pronunciation: 'chợ',
                english: 'Market',
                usage: 'Shopping place. "Chợ Bến Thành" is famous in Saigon'
            },
            nhahang: {
                icon: '🍽️',
                vietnamese: 'Nhà hàng',
                pronunciation: 'nhà hàng',
                english: 'Restaurant',
                usage: 'Dining place. "Nhà hàng Việt" (Vietnamese restaurant)'
            },
            duong: {
                icon: '🛣️',
                vietnamese: 'Đường',
                pronunciation: 'đường',
                english: 'Street/road',
                usage: 'Also means "sugar"! "Đường Lê Lợi" (Le Loi Street)'
            },
            cay: {
                icon: '🌳',
                vietnamese: 'Cây',
                pronunciation: 'cây',
                english: 'Tree/plant',
                usage: 'Nature. "Cây xanh" (green tree), classifier for long objects'
            }
        };
        
        this.init();
    }
    
    init() {
        this.loadVoices();
        this.bindEvents();
        this.updateProgress();
    }
    
    loadVoices() {
        this.voices = this.synthesis.getVoices();
        if (this.voices.length === 0) {
            this.synthesis.onvoiceschanged = () => {
                this.voices = this.synthesis.getVoices();
            };
        }
    }
    
    bindEvents() {
        // Scene tab switching
        document.querySelectorAll('.scene-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const scene = e.currentTarget.dataset.scene;
                this.switchScene(scene);
            });
        });
        
        // Hotspot clicks
        document.querySelectorAll('.hotspot').forEach(hotspot => {
            hotspot.addEventListener('click', (e) => {
                const itemId = e.currentTarget.dataset.item;
                this.showItemInfo(itemId);
            });
        });
    }
    
    switchScene(sceneName) {
        // Update tabs
        document.querySelectorAll('.scene-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.closest('.scene-tab').classList.add('active');
        
        // Update scenes
        document.querySelectorAll('.interactive-scene').forEach(scene => {
            scene.classList.remove('active');
        });
        document.getElementById(`${sceneName}-scene`).classList.add('active');
        
        this.currentScene = sceneName;
        
        // Close info card
        document.getElementById('info-card').classList.add('hidden');
    }
    
    showItemInfo(itemId) {
        const item = this.vocabularyData[itemId];
        if (!item) return;
        
        this.currentItem = itemId;
        
        // Update info card
        document.getElementById('info-icon').textContent = item.icon;
        document.getElementById('info-vietnamese').textContent = item.vietnamese;
        document.getElementById('info-pronunciation').textContent = `/${item.pronunciation}/`;
        document.getElementById('info-english').textContent = item.english;
        document.getElementById('info-usage').textContent = item.usage;
        
        // Show card
        document.getElementById('info-card').classList.remove('hidden');
        
        // Mark as learned
        if (!this.learnedItems.has(itemId)) {
            this.learnedItems.add(itemId);
            this.updateProgress();
        }
        
        // Auto-play pronunciation
        setTimeout(() => this.speakWord(), 300);
    }
    
    speakWord() {
        if (!this.currentItem) return;
        
        const item = this.vocabularyData[this.currentItem];
        
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(item.vietnamese);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.7;
        
        // Try to get Vietnamese voice
        const vietnameseVoice = this.voices.find(voice => voice.lang.startsWith('vi'));
        if (vietnameseVoice) {
            utterance.voice = vietnameseVoice;
        }
        
        this.synthesis.speak(utterance);
    }
    
    updateProgress() {
        const totalItems = Object.keys(this.vocabularyData).length;
        const learned = this.learnedItems.size;
        
        document.getElementById('items-learned').textContent = learned;
        document.getElementById('total-items').textContent = totalItems;
        
        // Calculate scenes completed (all items in scene learned)
        const marketItems = ['pho', 'banhmi', 'cafe', 'com', 'bun', 'xoai', 'chuoi', 'nuoc', 'banh'];
        const restaurantItems = ['thucdon', 'dia', 'coc', 'muong', 'dua', 'phache', 'che'];
        const streetItems = ['xemay', 'xebus', 'taxi', 'cho', 'nhahang', 'duong', 'cay'];
        
        let completed = 0;
        if (marketItems.every(item => this.learnedItems.has(item))) completed++;
        if (restaurantItems.every(item => this.learnedItems.has(item))) completed++;
        if (streetItems.every(item => this.learnedItems.has(item))) completed++;
        
        document.getElementById('scenes-completed').textContent = completed;
    }
}

// Close info card
function closeInfoCard() {
    document.getElementById('info-card').classList.add('hidden');
}

// Speak current word
function speakWord() {
    if (window.visualLearning) {
        window.visualLearning.speakWord();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.visualLearning = new VisualLearning();
});
