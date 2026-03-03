// Comments System with Admin Moderation
class CommentSystem {
    constructor(pageId) {
        this.pageId = pageId;
        this.comments = this.loadComments();
        this.pendingComments = this.loadPendingComments();
        this.adminPassword = 'admin123'; // Change this in production!
        this.isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    }

    loadComments() {
        const stored = localStorage.getItem(`comments_${this.pageId}`);
        return stored ? JSON.parse(stored) : [];
    }

    loadPendingComments() {
        const stored = localStorage.getItem(`pending_comments_${this.pageId}`);
        return stored ? JSON.parse(stored) : [];
    }

    saveComments() {
        localStorage.setItem(`comments_${this.pageId}`, JSON.stringify(this.comments));
    }

    savePendingComments() {
        localStorage.setItem(`pending_comments_${this.pageId}`, JSON.stringify(this.pendingComments));
    }

    addComment(name, email, text) {
        const comment = {
            id: Date.now(),
            name: name,
            email: email,
            text: text,
            date: new Date().toISOString(),
            approved: false
        };

        this.pendingComments.push(comment);
        this.savePendingComments();
        return comment;
    }

    approveComment(commentId) {
        const index = this.pendingComments.findIndex(c => c.id === commentId);
        if (index !== -1) {
            const comment = this.pendingComments.splice(index, 1)[0];
            comment.approved = true;
            this.comments.push(comment);
            this.saveComments();
            this.savePendingComments();
            return true;
        }
        return false;
    }

    rejectComment(commentId) {
        const index = this.pendingComments.findIndex(c => c.id === commentId);
        if (index !== -1) {
            this.pendingComments.splice(index, 1);
            this.savePendingComments();
            return true;
        }
        return false;
    }

    deleteComment(commentId) {
        const index = this.comments.findIndex(c => c.id === commentId);
        if (index !== -1) {
            this.comments.splice(index, 1);
            this.saveComments();
            return true;
        }
        return false;
    }

    getComments() {
        return this.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    getPendingComments() {
        return this.pendingComments.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    checkAdmin(password) {
        if (password === this.adminPassword) {
            this.isAdmin = true;
            sessionStorage.setItem('isAdmin', 'true');
            return true;
        }
        return false;
    }

    logout() {
        this.isAdmin = false;
        sessionStorage.removeItem('isAdmin');
    }

    renderComments(containerId, lang = 'vi') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        // Render comment form
        const formHtml = `
            <div class="comment-form-wrapper">
                <h3 class="comment-section-title" data-en="Leave a Comment" data-vi="Để Lại Bình Luận">
                    ${lang === 'vi' ? 'Để Lại Bình Luận' : 'Leave a Comment'}
                </h3>
                <form id="commentForm" class="comment-form">
                    <div class="form-row">
                        <input type="text" id="commentName" placeholder="${lang === 'vi' ? 'Tên của bạn *' : 'Your Name *'}" required>
                        <input type="email" id="commentEmail" placeholder="${lang === 'vi' ? 'Email của bạn *' : 'Your Email *'}" required>
                    </div>
                    <textarea id="commentText" placeholder="${lang === 'vi' ? 'Viết bình luận của bạn... *' : 'Write your comment... *'}" rows="4" required></textarea>
                    <button type="submit" class="comment-submit-btn">
                        ${lang === 'vi' ? 'Gửi Bình Luận' : 'Submit Comment'}
                    </button>
                    <p class="comment-note">
                        ${lang === 'vi' ? '* Bình luận của bạn sẽ được xem xét trước khi hiển thị.' : '* Your comment will be reviewed before being displayed.'}
                    </p>
                </form>
            </div>
        `;

        container.innerHTML = formHtml;

        // Render approved comments
        const comments = this.getComments();
        if (comments.length > 0) {
            const commentsHtml = `
                <div class="comments-list">
                    <h3 class="comment-section-title" data-en="Comments" data-vi="Bình Luận">
                        ${lang === 'vi' ? 'Bình Luận' : 'Comments'} (${comments.length})
                    </h3>
                    ${comments.map(comment => this.renderCommentHTML(comment, lang)).join('')}
                </div>
            `;
            container.innerHTML += commentsHtml;
        }

        // Render admin panel if logged in
        if (this.isAdmin) {
            this.renderAdminPanel(container, lang);
        } else {
            // Add admin login button
            const loginBtn = `
                <div class="admin-login-section">
                    <button id="showAdminLogin" class="admin-login-btn">
                        ${lang === 'vi' ? 'Đăng nhập Admin' : 'Admin Login'}
                    </button>
                </div>
            `;
            container.innerHTML += loginBtn;
        }

        // Attach event listeners
        this.attachEventListeners(lang);
    }

    renderCommentHTML(comment, lang) {
        const date = new Date(comment.date);
        const formattedDate = date.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="comment-item" data-comment-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-author">
                        <i class="fas fa-user-circle"></i>
                        <strong>${this.escapeHtml(comment.name)}</strong>
                    </div>
                    <div class="comment-date">${formattedDate}</div>
                </div>
                <div class="comment-body">
                    <p>${this.escapeHtml(comment.text)}</p>
                </div>
                ${this.isAdmin ? `
                    <div class="comment-admin-actions">
                        <button class="delete-comment-btn" data-id="${comment.id}">
                            <i class="fas fa-trash"></i> ${lang === 'vi' ? 'Xóa' : 'Delete'}
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderAdminPanel(container, lang) {
        const pending = this.getPendingComments();
        
        const adminHtml = `
            <div class="admin-panel">
                <div class="admin-header">
                    <h3><i class="fas fa-shield-alt"></i> ${lang === 'vi' ? 'Bảng Quản Trị' : 'Admin Panel'}</h3>
                    <button id="adminLogout" class="admin-logout-btn">
                        ${lang === 'vi' ? 'Đăng xuất' : 'Logout'}
                    </button>
                </div>
                <div class="pending-comments">
                    <h4>${lang === 'vi' ? 'Bình Luận Chờ Duyệt' : 'Pending Comments'} (${pending.length})</h4>
                    ${pending.length === 0 
                        ? `<p class="no-pending">${lang === 'vi' ? 'Không có bình luận chờ duyệt' : 'No pending comments'}</p>`
                        : pending.map(comment => `
                            <div class="pending-comment-item">
                                <div class="comment-header">
                                    <strong>${this.escapeHtml(comment.name)}</strong>
                                    <span>(${this.escapeHtml(comment.email)})</span>
                                </div>
                                <p>${this.escapeHtml(comment.text)}</p>
                                <div class="pending-actions">
                                    <button class="approve-btn" data-id="${comment.id}">
                                        <i class="fas fa-check"></i> ${lang === 'vi' ? 'Duyệt' : 'Approve'}
                                    </button>
                                    <button class="reject-btn" data-id="${comment.id}">
                                        <i class="fas fa-times"></i> ${lang === 'vi' ? 'Từ chối' : 'Reject'}
                                    </button>
                                </div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;

        container.innerHTML += adminHtml;
    }

    attachEventListeners(lang) {
        // Comment form submission
        const form = document.getElementById('commentForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('commentName').value.trim();
                const email = document.getElementById('commentEmail').value.trim();
                const text = document.getElementById('commentText').value.trim();

                if (name && email && text) {
                    this.addComment(name, email, text);
                    alert(lang === 'vi' 
                        ? 'Cảm ơn bình luận của bạn! Nó sẽ được hiển thị sau khi được duyệt.'
                        : 'Thank you for your comment! It will be displayed after approval.');
                    form.reset();
                    this.renderComments('comments-section', lang);
                }
            });
        }

        // Admin login
        const loginBtn = document.getElementById('showAdminLogin');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                const password = prompt(lang === 'vi' ? 'Nhập mật khẩu admin:' : 'Enter admin password:');
                if (password && this.checkAdmin(password)) {
                    alert(lang === 'vi' ? 'Đăng nhập thành công!' : 'Login successful!');
                    this.renderComments('comments-section', lang);
                } else if (password) {
                    alert(lang === 'vi' ? 'Mật khẩu không đúng!' : 'Incorrect password!');
                }
            });
        }

        // Admin logout
        const logoutBtn = document.getElementById('adminLogout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
                this.renderComments('comments-section', lang);
            });
        }

        // Approve buttons
        document.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (this.approveComment(id)) {
                    this.renderComments('comments-section', lang);
                }
            });
        });

        // Reject buttons
        document.querySelectorAll('.reject-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (this.rejectComment(id)) {
                    this.renderComments('comments-section', lang);
                }
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-comment-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (confirm(lang === 'vi' ? 'Bạn có chắc muốn xóa bình luận này?' : 'Are you sure you want to delete this comment?')) {
                    if (this.deleteComment(id)) {
                        this.renderComments('comments-section', lang);
                    }
                }
            });
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommentSystem;
}
