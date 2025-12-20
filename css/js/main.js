document.addEventListener('DOMContentLoaded', () => {
    // Animations Scroll (limité à quelques éléments)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll-limited').forEach(el => observer.observe(el));

    // Recherche Services
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };
    const searchInput = document.getElementById('service-search');
    if (searchInput) {
        const services = document.querySelectorAll('.service-card');
        const filterServices = debounce(query => {
            const lowerQuery = query.toLowerCase().trim();
            services.forEach(service => {
                const title = service.querySelector('h3').textContent.toLowerCase();
                service.style.display = title.includes(lowerQuery) ? 'block' : 'none';
            });
        }, 300);
        searchInput.addEventListener('input', e => filterServices(e.target.value));
    }

    // Toggle "Voir Plus"
    document.querySelectorAll('.see-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const more = btn.nextElementSibling;
            more.style.display = more.style.display === 'none' ? 'block' : 'none';
        });
    });
});