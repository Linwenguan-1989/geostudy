// GEO Training Camp - Main JavaScript
// 必火AI · GEO获客训练营

// ============================================
// 1. Smooth Scrolling Navigation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 2. FAQ Accordion - Removed (Static Display)
    // ============================================
    // FAQ items are now displayed statically without accordion functionality

    // ============================================
    // 3. Scroll Animations with Intersection Observer
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger number animations when visible
                if (entry.target.classList.contains('stat-card')) {
                    animateNumber(entry.target);
                }
                
                // Trigger value bar animations
                if (entry.target.classList.contains('value-bar')) {
                    animateValueBar(entry.target);
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.pain-card, .geo-card, .stat-card, .core-card, .shift-item, ' +
        '.authority-card, .case-card, .leader-card, .urgency-content, ' +
        '.audience-card, .value-item, .lesson-card, .instructor-card, ' +
        '.why-card, .success-card, .faq-item-qa, .pricing-card, .contact-info, ' +
        '.contact-qr, .value-bar'
    );
    
    animatableElements.forEach(el => observer.observe(el));

    // ============================================
    // 4. Number Animation on Scroll
    // ============================================
    function animateNumber(element) {
        const numberElements = element.querySelectorAll('.stat-number, .core-number, .shift-number');
        
        numberElements.forEach(numEl => {
            if (numEl.dataset.animated) return; // Skip if already animated
            
            const finalValue = numEl.textContent.trim();
            const hasPercent = finalValue.includes('%');
            const hasPlus = finalValue.includes('+');
            const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
            
            if (isNaN(numericValue)) return;
            
            const duration = 1500; // 1.5 seconds
            const steps = 60;
            const increment = numericValue / steps;
            let current = 0;
            let step = 0;
            
            numEl.dataset.animated = 'true';
            
            const timer = setInterval(() => {
                step++;
                current += increment;
                
                if (step >= steps) {
                    current = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.round(current * 10) / 10;
                if (numericValue < 10) {
                    displayValue = Math.round(current * 100) / 100;
                }
                
                numEl.textContent = displayValue + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
            }, duration / steps);
        });
    }

    // ============================================
    // 5. Value Bar Animations
    // ============================================
    function animateValueBar(bar) {
        if (bar.dataset.animated) return;
        
        const fill = bar.querySelector('.value-fill');
        if (fill) {
            setTimeout(() => {
                fill.style.transition = 'width 1.5s ease-out';
            }, 100);
        }
        
        bar.dataset.animated = 'true';
    }

    // ============================================
    // 6. Chart.js Configurations
    // ============================================
    
    // Chart 1: Xponent21 Growth Chart (Star Case)
    const xponentCtx = document.getElementById('xponentChart');
    if (xponentCtx) {
        const xponentChart = new Chart(xponentCtx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
                datasets: [{
                    label: 'GEO流量占比',
                    data: [2, 5, 12, 18, 23, 27, 27, 27, 27],
                    borderColor: '#BC1F1A',
                    backgroundColor: 'rgba(188, 31, 26, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#BC1F1A',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }, {
                    label: '传统SEO流量占比',
                    data: [95, 90, 80, 68, 55, 45, 40, 38, 35],
                    borderColor: '#ccc',
                    backgroundColor: 'rgba(200, 200, 200, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#999',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 13,
                                family: "'Noto Sans SC', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            family: "'Noto Sans SC', sans-serif"
                        },
                        bodyFont: {
                            size: 13,
                            family: "'Noto Sans SC', sans-serif"
                        },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: {
                                size: 12,
                                family: "'Noto Sans SC', sans-serif"
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 12,
                                family: "'Noto Sans SC', sans-serif"
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    // Chart 2: Traffic Trend Chart (3年流量趋势)
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        const trendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['2022.Q1', '2022.Q2', '2022.Q3', '2022.Q4', '2023.Q1', '2023.Q2', '2023.Q3', '2023.Q4', '2024.Q1', '2024.Q2', '2024.Q3', '2024.Q4'],
                datasets: [{
                    label: 'AI搜索流量',
                    data: [5, 8, 12, 18, 28, 42, 58, 78, 105, 142, 195, 268],
                    borderColor: '#BC1F1A',
                    backgroundColor: 'rgba(188, 31, 26, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#BC1F1A',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }, {
                    label: '传统搜索流量',
                    data: [320, 315, 305, 298, 285, 275, 260, 248, 232, 218, 205, 195],
                    borderColor: '#ccc',
                    backgroundColor: 'rgba(200, 200, 200, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#999',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 14,
                                family: "'Noto Sans SC', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            family: "'Noto Sans SC', sans-serif"
                        },
                        bodyFont: {
                            size: 13,
                            family: "'Noto Sans SC', sans-serif"
                        },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '万';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '万';
                            },
                            font: {
                                size: 12,
                                family: "'Noto Sans SC', sans-serif"
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 11,
                                family: "'Noto Sans SC', sans-serif"
                            },
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    // ============================================
    // 7. Parallax Effect on Scroll
    // ============================================
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleScroll() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
            }
        }

        // Sticky header effect
        const header = document.querySelector('.header');
        if (header) {
            if (scrolled > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // ============================================
    // 8. Event Tracking (Analytics Ready)
    // ============================================
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonLocation = this.closest('section')?.id || 'unknown';
            
            // Log for debugging (replace with actual analytics)
            console.log('CTA Click:', {
                text: buttonText,
                location: buttonLocation,
                timestamp: new Date().toISOString()
            });
            
            // Example: Google Analytics 4
            // gtag('event', 'cta_click', {
            //     button_text: buttonText,
            //     page_location: buttonLocation
            // });
        });
    });

    // Track section visibility for engagement
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                console.log('Section Viewed:', sectionId);
                
                // Example: Google Analytics 4
                // gtag('event', 'section_view', {
                //     section_name: sectionId
                // });
            }
        });
    }, {
        threshold: 0.5
    });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => sectionObserver.observe(section));

    // ============================================
    // 9. Mobile Menu Toggle (if needed in future)
    // ============================================
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                if (mobileMenuButton) {
                    mobileMenuButton.classList.remove('active');
                }
            });
        });
    }

    // ============================================
    // 10. Loading Animation Complete
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Initialize animations for elements in viewport
        const initialElements = document.querySelectorAll('.pain-card, .geo-card');
        initialElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    });

    // ============================================
    // 11. Countdown Timer (Optional - for urgency)
    // ============================================
    function initCountdown() {
        const countdownElement = document.querySelector('.countdown-timer');
        if (!countdownElement) return;

        // Set end date (example: 7 days from now)
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);
        endDate.setHours(23, 59, 59, 999);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = endDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = '<span class="countdown-expired">报名已结束</span>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-value">${days}</span>
                    <span class="countdown-label">天</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${hours}</span>
                    <span class="countdown-label">时</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${minutes}</span>
                    <span class="countdown-label">分</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value">${seconds}</span>
                    <span class="countdown-label">秒</span>
                </div>
            `;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Initialize countdown if element exists
    initCountdown();

    // ============================================
    // 12. Form Validation (if contact form added)
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            
            // Add your form submission logic here
            // Example: send to backend API
            
            // Show success message
            alert('提交成功！我们会尽快与您联系。');
            contactForm.reset();
        });
    }

    // ============================================
    // 13. Lazy Load Images (Performance Optimization)
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // ============================================
    // 14. Console Welcome Message
    // ============================================
    console.log('%c必火AI · GEO获客训练营', 'font-size: 24px; font-weight: bold; color: #BC1F1A;');
    console.log('%c让AI主动推荐你的品牌', 'font-size: 14px; color: #666;');
    console.log('%c网站技术栈: HTML5 + CSS3 + JavaScript + Chart.js', 'font-size: 12px; color: #999;');

}); // End of DOMContentLoaded
