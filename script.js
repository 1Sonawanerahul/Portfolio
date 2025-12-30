// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Create mobile menu
function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    // Clone navigation links
    const links = navLinks.cloneNode(true);
    links.classList.remove('nav-links');
    links.classList.add('mobile-nav-links');
    
    // Create hire button for mobile
    const hireBtn = document.createElement('a');
    hireBtn.href = '#contact';
    hireBtn.className = 'mobile-hire-btn';
    hireBtn.textContent = 'Hire Me';

    hireBtn.addEventListener('click', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
    }
    
    // Agar navbar ke parent pe active class hai toh
    const nav = document.querySelector('nav');
    if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});
    
    mobileMenu.appendChild(links);
    mobileMenu.appendChild(hireBtn);
    
    document.querySelector('nav').appendChild(mobileMenu);
    
    return mobileMenu;
}

let mobileMenu = null;

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    
    if (!mobileMenu) {
        mobileMenu = createMobileMenu();
    }
    
    mobileMenu.classList.toggle('active');
    
    // Toggle menu icon animation
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && mobileMenu && mobileMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ========== TYPEWRITER EFFECT ==========
class Typewriter {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.options = {
            typeSpeed: 100,
            deleteSpeed: 50,
            delayBetween: 2000,
            ...options
        };
        
        this.currentTextIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        if (this.isPaused) return;
        
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            this.isDeleting = true;
            setTimeout(() => this.type(), this.options.delayBetween);
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            setTimeout(() => this.type(), 500);
        } else {
            const speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
            setTimeout(() => this.type(), speed);
        }
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
        this.type();
    }
}

// Initialize typewriter
const typedTextElement = document.querySelector('.typed-text');
if (typedTextElement) {
    const typewriter = new Typewriter(typedTextElement, [
        'Full Stack Developer',
        'Web Developer',
        'Software Engineer'
    ], {
        typeSpeed: 100,
        deleteSpeed: 50,
        delayBetween: 2000
    });
}

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-link, .mobile-nav-links a');

function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ========== EMAILJS INITIALIZATION ==========

(function() {
    emailjs.init("O7qlyy5lEZaexhJC8");
})();

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            subject: this.querySelectorAll('input[type="text"]')[1].value,
            message: this.querySelector('textarea').value
        };
        
        // Validation check
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill all fields!');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const originalWidth = submitBtn.offsetWidth;
        const originalBg = submitBtn.style.background;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.style.width = `${originalWidth}px`;
        submitBtn.disabled = true;
        
        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                "service_memqhxg",   
                "template_va5cui7",   
                {
                    to_name: "Rahul Sonawane", 
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    reply_to: formData.email
                }
            );
            
            console.log('Email sent successfully:', response);
            
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#10b981';
            submitBtn.style.color = 'white';
            
            // Reset form
            this.reset();
            
            // Show success notification
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = originalBg;
                submitBtn.style.width = '';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('Email sending failed:', error);
            
            // Show error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed!';
            submitBtn.style.background = '#ef4444';
            submitBtn.style.color = 'white';
            
            // Show error notification
            showNotification('Failed to send message. Please try again later.', 'error');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = originalBg;
                submitBtn.style.width = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// ========== NOTIFICATION FUNCTION ==========
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
    
    // Add CSS animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========== NEWSLETTER FORM ==========
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        
        // Show loading state
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        // Simulate subscription
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = '#10b981';
            
            // Clear input
            this.querySelector('input[type="email"]').value = '';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
                button.disabled = false;
            }, 2000);
            
            console.log('Newsletter subscription:', email);
        }, 1000);
    });
}

// ========== GALLERY IMAGE MODAL ==========
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const imgAlt = this.querySelector('img').alt;
        const title = this.querySelector('.gallery-info h4').textContent;
        const description = this.querySelector('.gallery-info p').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-image">
                    <img src="${imgSrc}" alt="${imgAlt}">
                </div>
                <div class="modal-content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(5px);
            }
            
            .modal-container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                animation: zoomIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes zoomIn {
                from { transform: translate(-50%, -50%) scale(0.8); }
                to { transform: translate(-50%, -50%) scale(1); }
            }
            
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                transition: background 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(0, 0, 0, 0.8);
            }
            
            .modal-image {
                width: 100%;
                height: 400px;
                overflow: hidden;
            }
            
            .modal-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .modal-content {
                padding: 30px;
            }
            
            .modal-content h3 {
                font-size: 1.8rem;
                margin-bottom: 10px;
                color: #1f2937;
            }
            
            .modal-content p {
                color: #6b7280;
                line-height: 1.6;
            }
            
            @media (max-width: 768px) {
                .modal-container {
                    width: 95%;
                }
                
                .modal-image {
                    height: 300px;
                }
                
                .modal-content {
                    padding: 20px;
                }
            }
        `;
        document.head.appendChild(modalStyle);
        
        // Close modal functionality
        const closeModal = () => {
            modal.remove();
            modalStyle.remove();
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        
        // Close on Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    });
});

// ========== SKILL BARS ANIMATION ==========
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Animate skill bars when section is in view
const skillsSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

if (skillsSection) {
    observer.observe(skillsSection);
}

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add fade-in animations to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ========== PROJECT CARDS HOVER EFFECT ==========
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
});

// ========== ANIMATE ELEMENTS ON SCROLL ==========
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, {
    threshold: 0.1
});

// Observe elements to animate
document.querySelectorAll('.project-card, .skill-category, .gallery-item, .stat-card').forEach(el => {
    animateOnScroll.observe(el);
});