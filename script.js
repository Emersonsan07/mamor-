document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize Swiper
    new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // Destination Chips Logic
    const chips = document.querySelectorAll('.chip');
    const destinyInput = document.getElementById('destiny');
    if (destinyInput) {
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                destinyInput.value = chip.textContent;
            });
        });
    }

    // Option Cards Logic (Steps 2, 3, 4)
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const step = card.closest('.step');
            const hiddenInput = step.querySelector('input[type="hidden"]');

            // Remove active from peers in the same step
            step.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            if (hiddenInput) {
                hiddenInput.value = card.dataset.value;
            }

            // Special case for step 4 (Date vs Planning)
            if (step.dataset.step === "4") {
                const dateInput = document.getElementById('travel-date');
                if (card.dataset.value === "Estou apenas planejando") {
                    dateInput.value = "";
                }
            }
        });
    });

    // Date Input Logic (Step 4)
    const travelDateInput = document.getElementById('travel-date');
    if (travelDateInput) {
        travelDateInput.addEventListener('change', () => {
            const step = travelDateInput.closest('.step');
            const hiddenInput = step.querySelector('input[type="hidden"]');
            step.querySelectorAll('.option-card').forEach(c => c.classList.remove('active'));
            if (hiddenInput) {
                hiddenInput.value = travelDateInput.value;
            }
        });
    }

    // Multi-step Form Logic
    const steps = document.querySelectorAll('.step');
    const dots = document.querySelectorAll('.dot');
    const nextBtns = document.querySelectorAll('.btn-next');
    const form = document.getElementById('multi-step-form');

    let currentStep = 0;

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStepEl = steps[currentStep];
            const requiredInputs = currentStepEl.querySelectorAll('input[required]');
            let valid = true;

            requiredInputs.forEach(input => {
                if (!input.value || !input.checkValidity()) {
                    input.reportValidity();
                    valid = false;
                }
            });

            if (valid) {
                goToStep(currentStep + 1);
            }
        });
    });

    function goToStep(index) {
        if (index >= steps.length || index < 0) return;

        steps[currentStep].classList.remove('active');
        if (dots[currentStep]) dots[currentStep].classList.remove('active');

        currentStep = index;

        steps[currentStep].classList.add('active');
        if (dots[currentStep]) dots[currentStep].classList.add('active');

        // Update Progress Bar
        const progressBar = document.getElementById('form-progress-bar');
        if (progressBar) {
            const progress = ((currentStep + 1) / steps.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    // Form Submission to WhatsApp
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const destination = document.getElementById('destiny').value;
            const group = document.getElementById('travel-group').value;
            const style = document.getElementById('travel-style').value;
            const timing = document.getElementById('travel-timing').value;
            const name = document.getElementById('user-name').value;
            const phone = document.getElementById('whatsapp').value;

            const message = `Olá! Meu nome é ${name}. Gostaria de uma curadoria personalizada:
- Destino: ${destination}
- Acompanhantes: ${group}
- Estilo: ${style}
- Quando: ${timing}
- Contato: ${phone}`;

            const whatsappUrl = `https://wa.me/5500000000000?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');
        });
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Exit Intent Modal Logic
    const modal = document.getElementById('exit-modal');
    const closeBtn = document.querySelector('.close-modal');
    const exitForm = document.getElementById('exit-form');
    let modalShown = false;

    if (modal) {
        document.documentElement.addEventListener('mouseleave', (e) => {
            if (e.clientY < 0 && !modalShown) {
                modal.style.display = 'flex';
                modalShown = true;
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        if (exitForm) {
            exitForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Obrigado! Seu guia será enviado em breve.');
                modal.style.display = 'none';
            });
        }
    }
});
