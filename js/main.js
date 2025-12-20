// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
        // Animation simple de l'icône hamburger
        mobileMenu.style.transform = navList.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
        mobileMenu.style.transition = 'transform 0.3s ease';
    });
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // On arrête d'observer une fois animé
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(section => {
    // REMOVED opacity = 0 to prevent blank page issues if JS fails or styles are blocked.
    // section.style.opacity = '0';
    // section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    observer.observe(section);
});

// Classe Fade-in utilisée par le JS ci-dessus
// Note: Le CSS devrait avoir .fade-in { opacity: 1; transform: translateY(0); }
// Ajout dynamique du style pour ces animations si manquant (fallback)
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);


// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('span');

        // Toggle current
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.textContent = '+';
            question.style.color = ''; // Reset color
        } else {
            // Optionnel : fermer les autres
            document.querySelectorAll('.faq-answer').forEach(item => item.style.maxHeight = null);
            document.querySelectorAll('.faq-question span').forEach(i => i.textContent = '+');
            document.querySelectorAll('.faq-question').forEach(q => q.style.color = '');

            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = '-';
            question.style.color = 'var(--color-secondary)';
        }
    });
});

// Services Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.content-section');

if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all content
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Show target content
            const targetId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Canal+ Accordion Logic
const canalItems = document.querySelectorAll('.canal-item-header');

if (canalItems.length > 0) {
    canalItems.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.canal-item-body');

            // Toggle current item
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                body.style.maxHeight = null;
            } else {
                // Optional: Close others
                document.querySelectorAll('.canal-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherBody = otherItem.querySelector('.canal-item-body');
                    if (otherBody) otherBody.style.maxHeight = null;
                });

                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });
}
// Email Sending Logic
// WhatsApp Sending Logic
function sendToWhatsapp(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Construct WhatsApp Message
    // Format: "Bonjour, je suis [Nom] ([Email]). [Message]"
    const text = `*Nouveau message du site web*\n\n*Nom:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;

    // WhatsApp API URL (Phone: +229 61856138)
    const whatsappUrl = `https://wa.me/22961856138?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank');

    // Show success message on site
    const successMsg = document.getElementById('email-success');
    successMsg.style.display = 'block';
    successMsg.innerText = "Redirection vers WhatsApp...";

    // Optional: Reset form
    document.getElementById('contact-form').reset();
}

// Service Search Logic
const searchInput = document.getElementById('service-search');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;

        // Only filter visible cards if in overview, or filter items in specific sections if implemented?
        // User asked to filter "ce la personne tape".
        // Simplest: Filter the CARDS in the current view or Global search.
        // Given structure, let's filter .service-card in #overview AND items in other sections if possible?
        // Let's stick to filtering the CARD LIST in the #overview section as that's where the search bar is most relevant.
        // If user wants global search, it's more complex. We will filter cards in #overview for now.

        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const text = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(query) || text.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Also auto-switch to 'overview' tab if searching to show results?
        if (query.length > 0) {
            const overviewTab = document.querySelector('[data-tab="overview"]');
            if (overviewTab && !overviewTab.classList.contains('active')) {
                overviewTab.click();
            }
        }
    });
}
