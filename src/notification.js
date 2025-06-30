// Notification Banner System
class NotificationBanner {
    constructor() {
        this.banner = document.getElementById('notification-banner');
        this.message = document.getElementById('notification-message');
        this.closeBtn = document.getElementById('notification-close');
        this.body = document.body;
        this.autoHideTimeout = null;
        
        // Permanent banner elements
        this.permanentBanner = document.getElementById('permanent-banner');
        this.permanentMessage = document.getElementById('permanent-banner-message');
        this.permanentCloseBtn = document.getElementById('permanent-banner-close');
        
        this.init();
    }
    
    init() {
        // Close button event listener
        this.closeBtn.addEventListener('click', () => {
            this.hide();
        });
        
        // Permanent banner close button event listener
        this.permanentCloseBtn.addEventListener('click', () => {
            this.hidePermanent();
        });
        
        // Auto-hide on page load if there's a stored notification
        this.checkStoredNotification();
        this.checkStoredPermanentBanner();
    }
    
    /**
     * Show notification banner
     * @param {string} message - The message to display
     * @param {string} type - Type of notification: 'info', 'success', 'warning', 'error', 'default'
     * @param {number} autoHide - Auto hide after milliseconds (0 = no auto hide)
     * @param {boolean} persistent - Store in localStorage to show across page reloads
     */
    show(message, type = 'default', autoHide = 0, persistent = false) {
        if (!message) return;
        
        // Clear existing timeout
        if (this.autoHideTimeout) {
            clearTimeout(this.autoHideTimeout);
        }
        
        // Set message
        this.message.textContent = message;
        
        // Remove existing type classes
        this.banner.classList.remove('info', 'success', 'warning', 'error');
        
        // Add new type class
        if (type !== 'default') {
            this.banner.classList.add(type);
        }
        
        // Show banner
        this.banner.style.display = 'block';
        this.body.classList.add('notification-active');
        
        // Store in localStorage if persistent
        if (persistent) {
            localStorage.setItem('notification', JSON.stringify({
                message,
                type,
                autoHide,
                timestamp: Date.now()
            }));
        }
        
        // Auto hide if specified
        if (autoHide > 0) {
            this.autoHideTimeout = setTimeout(() => {
                this.hide();
            }, autoHide);
        }
    }
    
    /**
     * Hide notification banner
     */
    hide() {
        this.banner.classList.add('slide-up');
        
        setTimeout(() => {
            this.banner.style.display = 'none';
            this.banner.classList.remove('slide-up');
            this.body.classList.remove('notification-active');
            
            // Clear stored notification
            localStorage.removeItem('notification');
        }, 300);
        
        // Clear timeout
        if (this.autoHideTimeout) {
            clearTimeout(this.autoHideTimeout);
            this.autoHideTimeout = null;
        }
    }
    
    /**
     * Check for stored notification and display it
     */
    checkStoredNotification() {
        const stored = localStorage.getItem('notification');
        if (stored) {
            try {
                const notification = JSON.parse(stored);
                const { message, type, autoHide, timestamp } = notification;
                
                // Check if notification is not too old (24 hours)
                const twentyFourHours = 24 * 60 * 60 * 1000;
                if (Date.now() - timestamp < twentyFourHours) {
                    this.show(message, type, autoHide, false);
                } else {
                    localStorage.removeItem('notification');
                }
            } catch (e) {
                localStorage.removeItem('notification');
            }
        }
    }
    
    /**
     * Convenience methods for different notification types
     */
    showInfo(message, autoHide = 5000, persistent = false) {
        this.show(message, 'info', autoHide, persistent);
    }
    
    showSuccess(message, autoHide = 5000, persistent = false) {
        this.show(message, 'success', autoHide, persistent);
    }
    
    showWarning(message, autoHide = 5000, persistent = false) {
        this.show(message, 'warning', autoHide, persistent);
    }
    
    showError(message, autoHide = 5000, persistent = false) {
        this.show(message, 'error', autoHide, persistent);
    }
    
    /**
     * Permanent Banner Methods - Static banner that doesn't overlap content
     */
    
    /**
     * Show permanent banner
     * @param {string} message - The message to display
     * @param {string} type - Type of banner: 'info', 'success', 'warning', 'error', 'promotion', 'default'
     * @param {boolean} persistent - Store in localStorage to show across page reloads
     */
    showPermanent(message, type = 'success', persistent = true) {
        if (!message) return;
        
        // Set message
        this.permanentMessage.textContent = message;
        
        // Remove existing type classes
        this.permanentBanner.classList.remove('info', 'success', 'warning', 'error', 'promotion');
        
        // Add new type class
        if (type !== 'default') {
            this.permanentBanner.classList.add(type);
        }
        
        // Show banner
        this.permanentBanner.style.display = 'block';
        
        // ADD THESE LINES FOR NEW POSITIONING SYSTEM:
        // Add class to body to adjust margins
        document.body.classList.add('permanent-banner-active');
        
        // Push navbar down
        const navbar = document.querySelector('.main-navbar');
        if (navbar) {
            navbar.classList.add('navbar-pushed-down');
        }
        
        // Adjust notification banner position if it exists
        const notificationBanner = document.getElementById('notification-banner');
        if (notificationBanner && notificationBanner.style.display !== 'none') {
            notificationBanner.classList.add('navbar-pushed');
        }
        
        // Store in localStorage if persistent
        if (persistent) {
            localStorage.setItem('permanentBanner', JSON.stringify({
                message,
                type,
                timestamp: Date.now()
            }));
        }
    }
    
    /**
     * Hide permanent banner
     */
    hidePermanent() {
        this.permanentBanner.classList.add('collapse');
        
        setTimeout(() => {
            this.permanentBanner.style.display = 'none';
            this.permanentBanner.classList.remove('collapse');
            
            // ADD THESE LINES FOR NEW POSITIONING SYSTEM:
            // Remove body class
            document.body.classList.remove('permanent-banner-active');
            
            // Reset navbar position
            const navbar = document.querySelector('.main-navbar');
            if (navbar) {
                navbar.classList.remove('navbar-pushed-down');
            }
            
            // Reset notification banner position
            const notificationBanner = document.getElementById('notification-banner');
            if (notificationBanner) {
                notificationBanner.classList.remove('navbar-pushed');
            }
            
            // Clear stored permanent banner
            localStorage.removeItem('permanentBanner');
        }, 400);
    }
    
    /**
     * Check for stored permanent banner and display it
     */
    checkStoredPermanentBanner() {
        const stored = localStorage.getItem('permanentBanner');
        if (stored) {
            try {
                const banner = JSON.parse(stored);
                const { message, type, timestamp } = banner;
                
                // Check if banner is not too old (7 days for permanent banners)
                const sevenDays = 7 * 24 * 60 * 60 * 1000;
                if (Date.now() - timestamp < sevenDays) {
                    this.showPermanent(message, type, false);
                } else {
                    localStorage.removeItem('permanentBanner');
                }
            } catch (e) {
                localStorage.removeItem('permanentBanner');
            }
        }
    }
    
    /**
     * Convenience methods for different permanent banner types
     */
    showPermanentInfo(message, persistent = true) {
        this.showPermanent(message, 'info', persistent);
    }
    
    showPermanentSuccess(message, persistent = true) {
        this.showPermanent(message, 'success', persistent);
    }
    
    showPermanentWarning(message, persistent = true) {
        this.showPermanent(message, 'warning', persistent);
    }
    
    showPermanentError(message, persistent = true) {
        this.showPermanent(message, 'error', persistent);
    }
    
    showPermanentPromotion(message, persistent = true) {
        this.showPermanent(message, 'promotion', persistent);
    }
}

// Initialize notification system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.notificationBanner = new NotificationBanner();
    
    // Example usage (uncomment to test):
    // setTimeout(() => {
    //     window.notificationBanner.showInfo('Welcome to Wide Open Throttle! Book your appointment today.', 0, true);
    // }, 1000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationBanner;
}
