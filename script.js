// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.classList.toggle('no-scroll');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Funcionalidad de las pestañas de productos
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Agregar clase active al botón clickeado y su contenido correspondiente
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Smooth scroll mejorado para navegación
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Efecto parallax suave para el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero && window.innerWidth > 768) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.team-card, .producto-card, .servicio-card, .info-item');
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// Validación y envío del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validación básica
            if (validateForm(formObject)) {
                // Simular envío del formulario
                submitForm(formObject);
            }
        });
    }
});

function validateForm(data) {
    const errors = [];
    
    // Validar nombre
    if (!data.nombre || data.nombre.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Por favor ingresa un email válido');
    }
    
    // Validar teléfono
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
    if (!data.telefono || !phoneRegex.test(data.telefono)) {
        errors.push('Por favor ingresa un teléfono válido');
    }
    
    // Mostrar errores si los hay
    if (errors.length > 0) {
        showNotification('Por favor corrige los siguientes errores:\n' + errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

function submitForm(data) {
    // Mostrar estado de carga
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Simular envío (en producción aquí iría la llamada al servidor)
    setTimeout(() => {
        // Restaurar botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        // Mostrar mensaje de éxito
        showNotification('¡Gracias por tu consulta! Te contactaremos pronto.', 'success');
        
        // Limpiar formulario
        document.getElementById('contact-form').reset();
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Agregar estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                background: #27ae60;
                color: white;
            }
            
            .notification-error {
                background: #e74c3c;
                color: white;
            }
            
            .notification-info {
                background: #3498db;
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-icon {
                font-weight: bold;
                font-size: 1.2rem;
            }
            
            .notification-message {
                flex: 1;
                white-space: pre-line;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Configurar cierre automático
    const autoClose = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Configurar cierre manual
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        clearTimeout(autoClose);
        closeNotification(notification);
    });
    
    function closeNotification(element) {
        element.classList.remove('show');
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 300);
    }
}

// Actualizar header en scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = 'none';
    }
});

// Contador animado para las estadísticas del hero
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const prefix = counter.textContent.match(/^[^\d]*/)[0];
        const suffix = counter.textContent.match(/[^\d]*$/)[0];
        
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                counter.textContent = prefix + target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = prefix + Math.floor(current) + suffix;
            }
        }, 20);
    });
}

// Ejecutar contador cuando el hero sea visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }
});

// Mejorar accesibilidad con navegación por teclado
document.addEventListener('DOMContentLoaded', function() {
    // Navegación por teclado en las pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            let nextIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    nextIndex = (index + 1) % tabButtons.length;
                    tabButtons[nextIndex].focus();
                    tabButtons[nextIndex].click();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                    tabButtons[nextIndex].focus();
                    tabButtons[nextIndex].click();
                    break;
                case 'Home':
                    e.preventDefault();
                    tabButtons[0].focus();
                    tabButtons[0].click();
                    break;
                case 'End':
                    e.preventDefault();
                    tabButtons[tabButtons.length - 1].focus();
                    tabButtons[tabButtons.length - 1].click();
                    break;
            }
        });
    });
});

// Lazy loading para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Evitar scroll del body cuando el menú móvil está abierto
const style = document.createElement('style');
style.textContent = `
    .no-scroll {
        overflow: hidden;
        height: 100vh;
    }
`;
document.head.appendChild(style);