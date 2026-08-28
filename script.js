/* ==========================================================================
   INTERACCIONES JS — SKATEPARK VILLA LURO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú móvil hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }

    // 2. Simulación de copiar Alias de Donación
    const copyAliasBtn = document.getElementById('copy-alias-btn');
    if (copyAliasBtn) {
        copyAliasBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText('[PENDIENTE.ALIAS]').then(() => {
                const originalText = copyAliasBtn.textContent;
                copyAliasBtn.textContent = '¡Alias copiado!';
                setTimeout(() => {
                    copyAliasBtn.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar el alias: ', err);
            });
        });
    }

    // 3. Manejo de formularios (Solicitud de clase y Comentarios)
    const claseForm = document.getElementById('clase-form');
    if (claseForm) {
        claseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const dia = document.getElementById('dia').value;
            const horario = document.getElementById('horario').value;
            
            // Constante para el número oficial de WhatsApp (reemplazar cuando esté disponible)
            const WHATSAPP_NUMBER = '54911XXXXXXXX'; 
            
            const mensaje = `Hola! Quiero solicitar una clase de skate para el día ${dia} a las ${horario}.`;
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
            
            window.open(url, '_blank');
            claseForm.reset();
        });
    }

    const comentarioForm = document.getElementById('comentario-form');
    if (comentarioForm) {
        comentarioForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu comentario! Tu opinión ayuda a construir la comunidad.');
            comentarioForm.reset();
        });
    }

    // 4. Autoplay continuo, infinito y suave para el carrusel de filosofía
    const principlesCarousel = document.getElementById('principles-carousel');
    if (principlesCarousel) {
        // Clonar tarjetas de forma controlada para lograr cinta continua infinita
        const cards = Array.from(principlesCarousel.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            principlesCarousel.appendChild(clone);
        });

        let isPaused = false;
        let lastAutoScrollTime = 0;
        const speed = 1.2; // Velocidad solicitada de 1.2

        principlesCarousel.addEventListener('mouseenter', () => { isPaused = true; });
        principlesCarousel.addEventListener('mouseleave', () => { isPaused = false; });
        principlesCarousel.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
        principlesCarousel.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

        let userScrollTimeout;
        principlesCarousel.addEventListener('scroll', () => {
            const halfWidth = principlesCarousel.scrollWidth / 2;
            if (principlesCarousel.scrollLeft >= halfWidth) {
                principlesCarousel.scrollLeft -= halfWidth;
            } else if (principlesCarousel.scrollLeft <= 0) {
                principlesCarousel.scrollLeft += halfWidth;
            }

            if (Date.now() - lastAutoScrollTime < 100) {
                return;
            }
            isPaused = true;
            clearTimeout(userScrollTimeout);
            userScrollTimeout = setTimeout(() => {
                isPaused = false;
            }, 1500);
        });

        function autoplayMarquee() {
            if (!isPaused) {
                lastAutoScrollTime = Date.now();
                principlesCarousel.scrollLeft += speed;

                const halfWidth = principlesCarousel.scrollWidth / 2;
                if (principlesCarousel.scrollLeft >= halfWidth) {
                    principlesCarousel.scrollLeft -= halfWidth;
                }
            }
            requestAnimationFrame(autoplayMarquee);
        }
        requestAnimationFrame(autoplayMarquee);
    }

    // 5. Rotación automática de fotografías en el Hero (cada 5 segundos)
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // 6. Initial Loader removal
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('fade-out');
                setTimeout(() => {
                    pageLoader.remove();
                }, 400);
            }, 300);
        });
        setTimeout(() => {
            if (pageLoader && !pageLoader.classList.contains('fade-out')) {
                pageLoader.classList.add('fade-out');
                setTimeout(() => { pageLoader.remove(); }, 400);
            }
        }, 2000);
    }
});