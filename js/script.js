// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.innerHTML = navList.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Donation modal functionality
    const donateLink = document.getElementById('donateLink');
    const donationModal = document.getElementById('donationModal');
    const closeModal = document.querySelector('.close-modal');
    const donationOptions = document.querySelectorAll('.donation-option');
    const customAmountInput = document.getElementById('customAmount');
    const donateButton = document.getElementById('donateButton');
    
    if (donateLink && donationModal) {
        donateLink.addEventListener('click', function(e) {
            e.preventDefault();
            donationModal.style.display = 'flex';
        });
        
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                donationModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === donationModal) {
                donationModal.style.display = 'none';
            }
        });
    }
    
    // Donation options selection
    if (donationOptions) {
        donationOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                donationOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Clear custom amount input
                if (customAmountInput) {
                    customAmountInput.value = '';
                }
            });
        });
    }
    
    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            // Remove active class from all options when custom amount is entered
            donationOptions.forEach(opt => opt.classList.remove('active'));
        });
    }
    
    // Donate button functionality
    if (donateButton) {
        donateButton.addEventListener('click', function() {
            let amount = 0;
            
            // Check if a donation option is selected
            const activeOption = document.querySelector('.donation-option.active');
            if (activeOption) {
                amount = activeOption.getAttribute('data-amount');
            } else if (customAmountInput && customAmountInput.value) {
                amount = customAmountInput.value;
            }
            
            if (amount > 0) {
                // In a real project, this would redirect to a payment gateway
                alert(`Спасибо за вашу поддержку в размере ${amount} ₽! В реальном проекте здесь будет переход на страницу оплаты.`);
                donationModal.style.display = 'none';
                
                // Clear selection
                if (activeOption) activeOption.classList.remove('active');
                if (customAmountInput) customAmountInput.value = '';
                
                // Save donation to localStorage (for demo purposes)
                const donations = JSON.parse(localStorage.getItem('ecotrackDonations')) || [];
                donations.push({
                    amount: amount,
                    date: new Date().toISOString()
                });
                localStorage.setItem('ecotrackDonations', JSON.stringify(donations));
            } else {
                alert('Пожалуйста, выберите сумму пожертвования или введите свою');
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showFormMessage('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Пожалуйста, введите корректный email адрес', 'error');
                return;
            }
            
            // In a real project, here would be AJAX request to server
            // For demo, we'll simulate successful submission
            
            // Get form data
            const formData = {
                name: name,
                email: email,
                subject: document.getElementById('subject').value,
                message: message,
                subscribe: document.getElementById('subscribe').checked,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage (for demo purposes)
            const messages = JSON.parse(localStorage.getItem('ecotrackMessages')) || [];
            messages.push(formData);
            localStorage.setItem('ecotrackMessages', JSON.stringify(messages));
            
            // Show success message
            showFormMessage('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    function showFormMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                faqItem.classList.toggle('active');
                
                // Rotate chevron icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = faqItem.classList.contains('active') 
                        ? 'rotate(180deg)' 
                        : 'rotate(0deg)';
                }
            });
        });
    }
    
    // Load more articles for blog page
    const loadMoreButton = document.getElementById('loadMore');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // In a real project, this would load more articles from server
            // For demo, we'll simulate loading more articles
            
            // Create a loading indicator
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
            this.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Create a new article (for demo)
                const blogPosts = document.querySelector('.blog-posts');
                
                const newArticle = document.createElement('article');
                newArticle.className = 'blog-post';
                newArticle.innerHTML = `
                    <div class="post-image">
                        <img src="https://images.unsplash.com/photo-1575408264798-b50b252663e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Экологическое образование">
                        <div class="post-date">
                            <span class="day">05</span>
                            <span class="month">Мар</span>
                        </div>
                    </div>
                    <div class="post-content">
                        <h2>Экологическое образование для детей: новые методики</h2>
                        <div class="post-meta">
                            <span><i class="fas fa-user"></i> Ольга Иванова</span>
                            <span><i class="fas fa-tag"></i> Образование</span>
                            <span><i class="fas fa-comments"></i> 0 комментариев</span>
                        </div>
                        <p>В этой статье мы расскажем о новых методиках экологического образования для детей, которые были разработаны совместно с педагогами и психологами. Эти методики помогают привить детям любовь к природе через игру и практическую деятельность...</p>
                        <a href="#" class="read-more">Читать далее</a>
                    </div>
                `;
                
                // Insert before the load more button container
                blogPosts.insertBefore(newArticle, loadMoreButton.parentElement);
                
                // Reset button
                this.innerHTML = 'Загрузить больше статей';
                this.disabled = false;
                
                // Show notification
                showNotification('Новая статья загружена!', 'success');
                
            }, 1500);
        });
    }
    
    // Load news on homepage
    const newsGrid = document.getElementById('newsGrid');
    
    if (newsGrid) {
        // Sample news data
        const newsData = [
            {
                title: 'Запуск нового проекта по очистке рек',
                date: '10 мая 2023',
                image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                excerpt: 'Мы запускаем новый проект по очистке малых рек в Подмосковье. Присоединяйтесь к волонтерской акции!'
            },
            {
                title: 'Партнерство с крупным экобрендом',
                date: '28 апреля 2023',
                image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80',
                excerpt: 'EcoTrack заключил партнерское соглашение с ведущим производителем экологичной продукции.'
            },
            {
                title: 'Обновление мобильного приложения',
                date: '15 апреля 2023',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                excerpt: 'Вышло обновление мобильного приложения EcoTrack с новыми функциями и улучшенным интерфейсом.'
            }
        ];
        
        // Clear loading placeholder if any
        newsGrid.innerHTML = '';
        
        // Generate news cards
        newsData.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <div class="news-image">
                    <img src="${news.image}" alt="${news.title}">
                </div>
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <div class="news-date">
                        <i class="far fa-calendar"></i> ${news.date}
                    </div>
                    <p>${news.excerpt}</p>
                </div>
            `;
            newsGrid.appendChild(newsCard);
        });
    }
    
    // Active link highlighting based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-list a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            link.classList.remove('active');
            
            // Check if this link corresponds to current page
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
            
            // Special case for index.html which might be just "/"
            if (currentPage === '' && linkHref === 'index.html') {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // Theme switcher (optional - for future enhancement)
    const themeSwitcher = document.createElement('button');
    themeSwitcher.id = 'themeSwitcher';
    themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    themeSwitcher.title = 'Переключить тему';
    themeSwitcher.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 999;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    // Add theme switcher to page
    document.body.appendChild(themeSwitcher);
    
    themeSwitcher.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('ecotrackTheme', 'dark');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('ecotrackTheme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('ecotrackTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add dark theme styles
    const darkThemeStyles = document.createElement('style');
    darkThemeStyles.textContent = `
        .dark-theme {
            --light-color: #1a1a1a;
            --dark-color: #f5f5f5;
            --text-color: #e0e0e0;
            --text-light: #b0b0b0;
            --border-color: #444;
            background-color: #121212;
            color: #e0e0e0;
        }
        
        .dark-theme .header,
        .dark-theme .news-card,
        .dark-theme .sidebar-widget,
        .dark-theme .team-card,
        .dark-theme .goal-card,
        .dark-theme .stat-card,
        .dark-theme .link-card,
        .dark-theme .blog-post,
        .dark-theme .timeline-content,
        .dark-theme .modal-content {
            background-color: #1e1e1e;
            color: #e0e0e0;
        }
        
        .dark-theme h1,
        .dark-theme h2,
        .dark-theme h3,
        .dark-theme h4,
        .dark-theme h5,
        .dark-theme h6 {
            color: #f5f5f5;
        }
        
        .dark-theme .footer {
            background-color: #0a0a0a;
        }
        
        .dark-theme .search-box input,
        .dark-theme .form-group input,
        .dark-theme .form-group select,
        .dark-theme .form-group textarea {
            background-color: #2a2a2a;
            border-color: #444;
            color: #e0e0e0;
        }
    `;
    document.head.appendChild(darkThemeStyles);
    
    // Notification function
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Add animations
        const style = document.createElement('style');
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
    
    // Visitor counter (using localStorage)
    function updateVisitorCounter() {
        const visitorData = JSON.parse(localStorage.getItem('ecotrackVisitors')) || {
            count: 0,
            lastVisit: null
        };
        
        // Increment count if this is a new session
        const currentTime = new Date().getTime();
        const lastVisitTime = visitorData.lastVisit ? new Date(visitorData.lastVisit).getTime() : 0;
        
        // Consider a new visit if last visit was more than 30 minutes ago
        if (currentTime - lastVisitTime > 30 * 60 * 1000) {
            visitorData.count += 1;
            visitorData.lastVisit = new Date().toISOString();
            localStorage.setItem('ecotrackVisitors', JSON.stringify(visitorData));
        }
        
        // Display visitor count on homepage (optional)
        const visitorCounter = document.getElementById('visitorCounter');
        if (visitorCounter) {
            visitorCounter.textContent = visitorData.count.toLocaleString();
        }
    }
    
    updateVisitorCounter();
    
    // Add animation on scroll
    function initScrollAnimations() {
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.stat-card, .goal-card, .team-card, .news-card, .link-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial state for animated elements
        const animatedElements = document.querySelectorAll('.stat-card, .goal-card, .team-card, .news-card, .link-card');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Run on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', animateOnScroll);
    }
    
    initScrollAnimations();
});

// Service worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}