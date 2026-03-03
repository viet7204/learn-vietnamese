// Lectures page filtering and sorting functionality

document.addEventListener('DOMContentLoaded', () => {
    const levelFilter = document.getElementById('level-filter');
    const topicFilter = document.getElementById('topic-filter');
    const sortFilter = document.getElementById('sort-filter');
    const lectureCards = document.querySelectorAll('.lecture-card');
    const loadMoreBtn = document.querySelector('.btn-load-more');
    
    // Filter lectures
    function filterLectures() {
        const selectedLevel = levelFilter.value;
        const selectedTopic = topicFilter.value;
        
        lectureCards.forEach(card => {
            const cardLevel = card.dataset.level;
            const cardTopic = card.dataset.topic;
            
            const levelMatch = selectedLevel === 'all' || cardLevel === selectedLevel;
            const topicMatch = selectedTopic === 'all' || cardTopic === selectedTopic;
            
            if (levelMatch && topicMatch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Sort lectures
    function sortLectures() {
        const sortType = sortFilter.value;
        const container = document.querySelector('.lectures-grid');
        const cardsArray = Array.from(lectureCards);
        
        cardsArray.sort((a, b) => {
            if (sortType === 'newest') {
                // Sort by date (newest first)
                const dateA = new Date(a.querySelector('.lecture-date').textContent.replace(/.*(\w+ \d+, \d+).*/, '$1'));
                const dateB = new Date(b.querySelector('.lecture-date').textContent.replace(/.*(\w+ \d+, \d+).*/, '$1'));
                return dateB - dateA;
            } else if (sortType === 'popular') {
                // Sort by number of learners
                const learnersA = parseInt(a.querySelector('.lecture-stats span:nth-child(2)').textContent.match(/\d+/)[0]);
                const learnersB = parseInt(b.querySelector('.lecture-stats span:nth-child(2)').textContent.match(/\d+/)[0]);
                return learnersB - learnersA;
            } else if (sortType === 'rating') {
                // Sort by rating
                const ratingA = parseFloat(a.querySelector('.lecture-stats span:nth-child(3)').textContent.match(/[\d.]+/)[0]);
                const ratingB = parseFloat(b.querySelector('.lecture-stats span:nth-child(3)').textContent.match(/[\d.]+/)[0]);
                return ratingB - ratingA;
            }
            return 0;
        });
        
        // Re-append cards in sorted order
        cardsArray.forEach(card => container.appendChild(card));
    }
    
    // Event listeners
    if (levelFilter) {
        levelFilter.addEventListener('change', filterLectures);
    }
    
    if (topicFilter) {
        topicFilter.addEventListener('change', filterLectures);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', sortLectures);
    }
    
    // Load more functionality (placeholder)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            alert('Loading more lectures... (This would fetch more content from your database)');
        });
    }
    
    // Add entrance animations
    lectureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
