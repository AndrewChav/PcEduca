/**
 * ============================================
 * PC LEARNING - JAVASCRIPT PRINCIPAL
 * Sitio Web Educativo sobre Hardware PC
 * ============================================
 */

// Variables globales
let currentSlideIndex = 0;
let slideInterval;


// Datos de imágenes para la galería (simulados)
const galleryImages = [
    { src: '../images/gallery/cpu-1.jpg', category: 'cpu', title: 'Intel Core i7' },
    { src: '../images/gallery/cpu-2.jpg', category: 'cpu', title: 'AMD Ryzen 7' },
    { src: '../images/gallery/cpu-3.jpg', category: 'cpu', title: 'Socket LGA1700' },
    { src: '../images/gallery/ram-1.jpg', category: 'ram', title: 'RAM DDR4 RGB' },
    { src: '../images/gallery/ram-2.jpg', category: 'ram', title: 'Kit Dual Channel' },
    { src: '../images/gallery/ram-3.jpg', category: 'ram', title: 'Ranuras DIMM' },
    { src: '../images/gallery/mobo-1.jpg', category: 'motherboard', title: 'Placa Madre ATX' },
    { src: '../images/gallery/mobo-2.jpg', category: 'motherboard', title: 'Chipset y VRM' },
    { src: '../images/gallery/mobo-3.jpg', category: 'motherboard', title: 'Panel de E/S' },
    { src: '../images/gallery/gpu-1.jpg', category: 'gpu', title: 'RTX 3070 Gaming' },
    { src: '../images/gallery/gpu-2.jpg', category: 'gpu', title: 'Cooler de GPU' },
    { src: '../images/gallery/gpu-3.jpg', category: 'gpu', title: 'Conectores de Video' },
    { src: '../images/gallery/ssd-1.jpg', category: 'storage', title: 'SSD SATA' },
    { src: '../images/gallery/ssd-2.jpg', category: 'storage', title: 'SSD NVMe M.2' },
    { src: '../images/gallery/hdd-1.jpg', category: 'storage', title: 'HDD 3.5"' },
    { src: '../images/gallery/psu-1.jpg', category: 'psu', title: 'PSU Modular 750W' },
    { src: '../images/gallery/psu-2.jpg', category: 'psu', title: 'Cables de Alimentación' },
    { src: '../images/gallery/cooler-1.jpg', category: 'cooling', title: 'Cooler de Aire' },
    { src: '../images/gallery/cooler-2.jpg', category: 'cooling', title: 'AIO Líquida' },
    { src: '../images/gallery/fans-1.jpg', category: 'cooling', title: 'Ventiladores RGB' },
    { src: '../images/gallery/case-1.jpg', category: 'case', title: 'Gabinete ATX Gaming' },
    { src: '../images/gallery/case-2.jpg', category: 'case', title: 'Interior del Gabinete' },
    { src: '../images/gallery/case-3.jpg', category: 'case', title: 'Mini-ITX Case' },
    { src: '../images/gallery/pc-complete-1.jpg', category: 'all', title: 'PC Gamer Completa' },
    { src: '../images/gallery/pc-complete-2.jpg', category: 'all', title: 'PC Workstation' }
];

// ============================================
// PANTALLA DE BIENVENIDA
// ============================================

function initializeWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    if (!welcomeScreen || !mainContent) return;

    // Mostrar prompt para nombre después de 1 segundo
    setTimeout(() => {
        showNamePrompt();
    }, 1000);

    // Ocultar pantalla de bienvenida después de 5 segundos
    setTimeout(() => {
        hideWelcomeScreen();
    }, 7000);
}

function showNamePrompt() {
    // Solicitar nombre
    const name = prompt('¿Cuál es tu nombre?');

    if (name && name.trim() !== '') {
        userName = name.trim();
        localStorage.setItem('userName', userName);
    } else {
        userName = 'Estudiante';
    }

    updateWelcomeMessage();
}

function updateWelcomeMessage() {
    const welcomeTitle = document.getElementById('welcome-title');
    const welcomeMessage = document.getElementById('welcome-message');

    if (welcomeTitle) {
        welcomeTitle.textContent = `¡Bienvenido/a, ${userName}!`;
        welcomeTitle.style.animation = 'pulse 2s ease-in-out';
    }

    if (welcomeMessage) {
        welcomeMessage.textContent = 'Tu aventura de aprendizaje sobre hardware PC comienza...';
    }
}

function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    if (welcomeScreen && mainContent) {
        // Añadir fade-out a la pantalla de bienvenida
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 1s ease';
            
            // Mostrar contenido principal con fade-in
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 50);
        }, 1000);
    }
}

// ============================================
// NAVEGACIÓN
// ============================================

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Cerrar menú al hacer clic en un enlace (móvil)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });
    }
    
    // Destacar sección activa en el scroll
    initializeScrollSpy();
}

function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `${current}.html` || 
                link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// BANNER ANIMADO
// ============================================

function initializeBanner() {
    const bannerSlider = document.querySelector('.banner-slider');
    if (!bannerSlider) return;
    
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Iniciar carrusel automático
    startAutoSlide();
    
    // Agregar eventos a los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide(index + 1);
        });
    });
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Ocultar slide actual
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Calcular nuevo índice
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Mostrar nuevo slide
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
    
    // Reiniciar temporizador
    stopAutoSlide();
    startAutoSlide();
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Ocultar slide actual
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Mostrar slide seleccionado
    currentSlideIndex = index - 1;
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
    
    // Reiniciar temporizador
    stopAutoSlide();
    startAutoSlide();
}

// ============================================
// GALERÍA INTERACTIVA
// ============================================

function initializeGallery() {
    initializeGalleryFilters();
    initializeLightbox();
}

function initializeGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar elementos
            filterGalleryItems(filter);
        });
    });
}

function filterGalleryItems(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
        } else {
            item.style.display = 'none';
        }
    });
}

function initializeLightbox() {
    // No es necesario agregar eventos aquí ya que se usan onclick en el HTML
    console.log('Lightbox inicializado');
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    if (lightbox && lightboxImage) {
        lightboxImage.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Cerrar con ESC
        document.addEventListener('keydown', handleLightboxKeydown);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleLightboxKeydown);
    }
}

function handleLightboxKeydown(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    } else if (event.key === 'ArrowLeft') {
        previousImage();
    } else if (event.key === 'ArrowRight') {
        nextImage();
    }
}

function previousImage() {
    // Implementar navegación de imágenes
    console.log('Imagen anterior');
}

function nextImage() {
    // Implementar navegación de imágenes
    console.log('Imagen siguiente');
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.component-card, .compatibility-card, .feature-card, .resource-card');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// ELEMENTOS INTERACTIVOS
// ============================================

function initializeInteractiveElements() {
    initializeTooltips();
    initializeProgressBars();
    initializeInteractiveCards();
}

function initializeTooltips() {
    // Agregar tooltips a elementos con data-tooltip
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltip.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const element = event.target;
    const tooltipText = element.getAttribute('data-tooltip');
    
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
        position: absolute;
        background: #1e293b;
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    element.tooltip = tooltip;
}

function hideTooltip(event) {
    const element = event.target;
    const tooltip = element.tooltip;
    
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
        element.tooltip = null;
    }
}

function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width || '0%';
                
                // Animar barra de progreso
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 200);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

function initializeInteractiveCards() {
    // Agregar efectos hover a las tarjetas
    const cards = document.querySelectorAll('.component-card, .compatibility-card, .feature-card, .resource-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para copiar al portapapeles
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('¡Copiado al portapapeles!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showNotification('¡Copiado al portapapeles!', 'success');
}

// Función para formatear números
function formatNumber(num) {
    return new Intl.NumberFormat('es-ES').format(num);
}

// Función para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// MANEJO DE ERRORES
// ============================================

window.addEventListener('error', function(event) {
    console.error('Error capturado:', event.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Promesa rechazada no manejada:', event.reason);
    showNotification('Ha ocurrido un error inesperado.', 'error');
});

// ============================================
// FUNCIONES PARA RECURSOS EDUCATIVOS
// ============================================

// Función para simular inicio de quiz (placeholder)
function startQuiz(quizType) {
    showNotification(`El quiz "${quizType}" estará disponible próximamente.`, 'info');
}

// Función para simular inicio de juego (placeholder)
function startGame(gameType) {
    showNotification(`El juego "${gameType}" estará disponible próximamente.`, 'info');
}

// Función para simular descarga de material (placeholder)
function downloadMaterial(materialType) {
    showNotification(`El material "${materialType}" estará disponible para descarga próximamente.`, 'info');
}

// ============================================
// COMPATIBILIDAD DEL NAVEGADOR
// ============================================

// Verificar características del navegador
function checkBrowserCompatibility() {
    const features = {
        cssGrid: CSS.supports('display', 'grid'),
        cssFlexbox: CSS.supports('display', 'flex'),
        cssCustomProperties: CSS.supports('color', 'var(--test)'),
        intersectionObserver: 'IntersectionObserver' in window,
        serviceWorker: 'serviceWorker' in navigator,
        localStorage: checkLocalStorageSupport()
    };
    
    const unsupportedFeatures = Object.keys(features).filter(key => !features[key]);
    
    if (unsupportedFeatures.length > 0) {
        console.warn('Características no soportadas:', unsupportedFeatures);
        showNotification('Tu navegador no soporta algunas características. Actualiza para una mejor experiencia.', 'info');
    }
}

function checkLocalStorageSupport() {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Verificar compatibilidad al cargar
document.addEventListener('DOMContentLoaded', checkBrowserCompatibility);

// ============================================
// MÉTRICAS Y ANÁLISIS (Placeholder)
// ============================================

function trackEvent(eventName, eventData = {}) {
    // Placeholder para futura implementación de analytics
    console.log('Evento:', eventName, eventData);
}

// Rastrear interacciones importantes
document.addEventListener('click', function(event) {
    const target = event.target;
    
    if (target.matches('.nav-link')) {
        trackEvent('navigation_click', { href: target.getAttribute('href') });
    } else if (target.matches('.feature-link')) {
        trackEvent('feature_link_click', { href: target.getAttribute('href') });
    } else if (target.matches('.view-btn')) {
        trackEvent('gallery_image_view', { src: target.getAttribute('onclick') });
    }
});

// ============================================
// FIN DEL ARCHIVO JAVASCRIPT
// ============================================

// Mensaje de consola para desarrolladores
console.log('%c PC Learning - Sitio Web Educativo ', 'background: #2563eb; color: white; padding: 10px; border-radius: 5px; font-size: 16px;');
console.log('%c Desarrollado para estudiantes de Bachillerato Técnico en Informática ', 'color: #64748b; font-size: 14px;');
console.log('%c Proyecto Educativo - Hardware PC ', 'color: #64748b; font-size: 12px;');