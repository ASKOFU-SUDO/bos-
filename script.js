// script.js - Main JavaScript file

// DOM Elements
const terminalLoader = document.querySelector('.terminal-loader');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const mobileNavLinks = document.querySelector('.nav-links');
const form = document.getElementById('securityForm');
const statNumbers = document.querySelectorAll('.stat-number');

// Remove terminal loader after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        terminalLoader.style.opacity = '0';
        terminalLoader.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            terminalLoader.style.display = 'none';
            
            // Animate stats counting
            animateStats();
        }, 500);
    }, 2000); // 2 seconds delay for dramatic effect
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (mobileNavLinks.classList.contains('active')) {
            mobileNavLinks.classList.remove('active');
        }
    });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    mobileNavLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNavLinks.contains(e.target)) {
        mobileNavLinks.classList.remove('active');
    }
});

// Animate stats counting
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Create a terminal-style alert
    const terminalAlert = document.createElement('div');
    terminalAlert.className = 'terminal-alert';
    terminalAlert.innerHTML = `
        <div class="terminal-alert-header">
            <div class="terminal-alert-title">Message Sent</div>
            <div class="terminal-alert-close">&times;</div>
        </div>
        <div class="terminal-alert-body">
            <p>Message encrypted and sent successfully!</p>
            <p class="terminal-alert-sub">You will receive a response at: ${formData.email}</p>
        </div>
    `;
    
    document.body.appendChild(terminalAlert);
    
    // Add styles for the alert
    const style = document.createElement('style');
    style.textContent = `
        .terminal-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--dark);
            border: 2px solid var(--primary);
            border-radius: 8px;
            width: 300px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .terminal-alert-header {
            background: var(--dark-gray);
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--light-gray);
        }
        
        .terminal-alert-title {
            color: var(--primary);
            font-family: 'Orbitron', sans-serif;
            font-weight: bold;
        }
        
        .terminal-alert-close {
            color: var(--text);
            cursor: pointer;
            font-size: 1.5rem;
            transition: color 0.3s ease;
        }
        
        .terminal-alert-close:hover {
            color: var(--primary);
        }
        
        .terminal-alert-body {
            padding: 15px;
            color: var(--text);
        }
        
        .terminal-alert-sub {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
    
    // Close alert functionality
    const closeBtn = terminalAlert.querySelector('.terminal-alert-close');
    closeBtn.addEventListener('click', () => {
        terminalAlert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(terminalAlert);
        }, 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(terminalAlert)) {
            terminalAlert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(terminalAlert)) {
                    document.body.removeChild(terminalAlert);
                }
            }, 300);
        }
    }, 5000);
    
    // Clear form
    form.reset();
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Terminal typing effect
function initTerminalTyping() {
    const terminalLines = document.querySelectorAll('.terminal-line:last-child');
    terminalLines.forEach(line => {
        const cursor = line.querySelector('.blinking-cursor');
        if (cursor) {
            cursor.style.animation = 'blink 1s infinite';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initTerminalTyping();
    
    // Add glitch effect to hacker text
    const hackerText = document.querySelector('.hacker-text');
    setInterval(() => {
        hackerText.style.animation = 'none';
        setTimeout(() => {
            hackerText.style.animation = 'glitch 3s infinite';
        }, 10);
    }, 10000);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + / to toggle terminal theme
    if (e.ctrlKey && e.key === '/') {
        document.body.classList.toggle('light-mode');
        
        // Add light mode styles if not present
        if (!document.querySelector('#light-mode-styles')) {
            const lightModeStyles = document.createElement('style');
            lightModeStyles.id = 'light-mode-styles';
            lightModeStyles.textContent = `
                body.light-mode {
                    --dark: #f5f5f5;
                    --dark-gray: #e0e0e0;
                    --light-gray: #ccc;
                    --text: #333;
                    --text-secondary: #666;
                }
            `;
            document.head.appendChild(lightModeStyles);
        }
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        mobileNavLinks.classList.remove('active');
    }
});