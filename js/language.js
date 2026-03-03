// Language switching functionality
let currentLang = 'vi'; // Default language is Vietnamese

document.addEventListener('DOMContentLoaded', function() {
    // Get language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Check if there's a saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
        switchLanguage(currentLang);
    } else {
        // Set Vietnamese as default on first visit
        switchLanguage('vi');
    }
    // Add click event listeners to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
            
            // Save preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });
});

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update all elements with language data attributes
    const elements = document.querySelectorAll('[data-en][data-vi]');
    elements.forEach(element => {
        const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-vi');
        
        // Check if it's a placeholder or value attribute (for inputs)
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'BUTTON' || element.tagName === 'A' || element.tagName === 'OPTION') {
            element.textContent = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { switchLanguage, currentLang };
}
