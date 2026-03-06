// Simple authentication for Vietnamese learning pages
// Default credentials: username: "viet" password: "T1engViet!"

const AUTH = {
    // Default credentials (in production, this should be server-side)
    defaultUsers: {
        "viet": "T1engViet!"
    },
    
    // Check if user is logged in
    isLoggedIn() {
        return sessionStorage.getItem('vietnameseAuth') === 'true';
    },
    
    // Login function
    login(username, password) {
        if (this.defaultUsers[username] && this.defaultUsers[username] === password) {
            sessionStorage.setItem('vietnameseAuth', 'true');
            sessionStorage.setItem('vietnameseUser', username);
            return true;
        }
        return false;
    },
    
    // Logout function
    logout() {
        sessionStorage.removeItem('vietnameseAuth');
        sessionStorage.removeItem('vietnameseUser');
        window.location.href = 'login.html';
    },
    
    // Get current user
    getCurrentUser() {
        return sessionStorage.getItem('vietnameseUser');
    },
    
    // Protect page - redirect to login if not authenticated
    protectPage() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
        } else {
            // Add logout button to page
            this.addLogoutButton();
        }
    },
    
    // Add logout button to navigation
    addLogoutButton() {
        const navbar = document.querySelector('.navbar .nav-links');
        if (navbar && !document.getElementById('logout-btn')) {
            const logoutLi = document.createElement('li');
            logoutLi.innerHTML = `<a href="#" id="logout-btn" style="color: #e74c3c; font-weight: 600;">
                <i class="fas fa-sign-out-alt"></i> <span data-en="Logout (${this.getCurrentUser()})" data-vi="Đăng Xuất (${this.getCurrentUser()})">Logout (${this.getCurrentUser()})</span>
            </a>`;
            navbar.appendChild(logoutLi);
            
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }
};

// Auto-protect all pages except login.html
if (!window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        AUTH.protectPage();
    });
}
