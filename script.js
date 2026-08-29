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

    // Configuración de Supabase
    const SUPABASE_URL = 'https://gwjfynjqeqeahgcskpex.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_Hqh_4mtT31oh849TiTTFdA_HmZlQF35';
    const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

    const comentariosLista = document.getElementById('comentarios-lista');

    // Función para cargar y renderizar comentarios desde Supabase
    async function cargarComentarios() {
        if (!supabaseClient || !comentariosLista) return;
        try {
            const { data, error } = await supabaseClient
                .from('Comentarios')
                .select('id, Comentarios, created_at')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error al cargar comentarios:', error);
                return;
            }

            comentariosLista.innerHTML = '';
            if (data && data.length > 0) {
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'comentario-item';
                    
                    const pTexto = document.createElement('p');
                    pTexto.className = 'comentario-texto';
                    pTexto.textContent = item.Comentarios;

                    const pFecha = document.createElement('p');
                    pFecha.className = 'comentario-fecha';
                    const fechaObj = new Date(item.created_at);
                    pFecha.textContent = !isNaN(fechaObj) ? fechaObj.toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' }) : '';

                    div.appendChild(pTexto);
                    if (pFecha.textContent) div.appendChild(pFecha);
                    comentariosLista.appendChild(div);
                });
            } else {
                comentariosLista.innerHTML = '<div class="comentario-item"><p class="comentario-texto" style="color: var(--text-secondary); text-align: center;">Sé el primero en dejar tu comentario.</p></div>';
            }
        } catch (err) {
            console.error('Error inesperado al cargar comentarios:', err);
        }
    }

    cargarComentarios();

    const comentarioForm = document.getElementById('comentario-form');
    if (comentarioForm) {
        comentarioForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const textarea = document.getElementById('comentario-texto');
            const submitBtn = comentarioForm.querySelector('button[type="submit"]');
            const texto = textarea ? textarea.value.trim() : '';

            if (!texto || !supabaseClient) return;

            if (submitBtn) submitBtn.disabled = true;

            try {
                const { error } = await supabaseClient
                    .from('Comentarios')
                    .insert([{ Comentarios: texto }]);

                if (error) {
                    console.error('Error al guardar comentario:', error);
                    alert('Hubo un error al enviar tu comentario. Intenta nuevamente.');
                    if (submitBtn) submitBtn.disabled = false;
                    return;
                }

                const exitoMsg = document.getElementById('comentario-exito');
                if (exitoMsg) {
                    exitoMsg.classList.add('show');
                    setTimeout(() => {
                        exitoMsg.classList.remove('show');
                    }, 4000);
                }
                comentarioForm.reset();
                await cargarComentarios();
            } catch (err) {
                console.error('Error inesperado al enviar comentario:', err);
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
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

    // 7. Animación typewriter para el placeholder del textarea de comentarios
    const comentarioTextarea = document.getElementById('comentario-texto');
    if (comentarioTextarea) {
        const frasesSugeridas = [
            "¿Y los baños para cuándo?",
            "Estaría bueno tener más luces...",
            "¿Podrían poner más bancos?",
            "Antes de patinar, una buena idea...",
            "¿Qué cambiarías de la pista?"
        ];

        let fraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimeout = null;

        function typePlaceholder() {
            if (document.activeElement === comentarioTextarea || comentarioTextarea.value.trim() !== '') {
                return;
            }

            const currentPhrase = frasesSugeridas[fraseIndex];

            if (isDeleting) {
                charIndex--;
                comentarioTextarea.placeholder = currentPhrase.substring(0, charIndex);
                if (charIndex === 0) {
                    isDeleting = false;
                    fraseIndex = (fraseIndex + 1) % frasesSugeridas.length;
                    typingTimeout = setTimeout(typePlaceholder, 300);
                    return;
                }
                typingTimeout = setTimeout(typePlaceholder, 25);
            } else {
                charIndex++;
                comentarioTextarea.placeholder = currentPhrase.substring(0, charIndex);
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    typingTimeout = setTimeout(typePlaceholder, 1200);
                    return;
                }
                typingTimeout = setTimeout(typePlaceholder, 45);
            }
        }

        function startTypewriter() {
            if (comentarioTextarea.value.trim() === '' && document.activeElement !== comentarioTextarea) {
                typePlaceholder();
            }
        }

        function stopTypewriter() {
            clearTimeout(typingTimeout);
            comentarioTextarea.placeholder = "";
        }

        comentarioTextarea.addEventListener('focus', () => {
            stopTypewriter();
        });

        comentarioTextarea.addEventListener('blur', () => {
            if (comentarioTextarea.value.trim() === '') {
                charIndex = 0;
                isDeleting = false;
                startTypewriter();
            }
        });

        comentarioTextarea.addEventListener('input', () => {
            if (comentarioTextarea.value.trim() !== '') {
                stopTypewriter();
            } else if (document.activeElement !== comentarioTextarea) {
                startTypewriter();
            }
        });

        startTypewriter();
    }
});