document.documentElement.classList.add("js");

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector(".back-to-top");
const revealItems = document.querySelectorAll("[data-reveal]");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
        navigation.classList.toggle("is-open", !isOpen);
    });

    navigationLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            navigation.classList.remove("is-open");
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            navigation.classList.remove("is-open");
        }
    });
}

revealItems.forEach(item => item.classList.add("reveal-ready"));

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            navigationLinks.forEach(link => link.removeAttribute("aria-current"));
            activeLink?.setAttribute("aria-current", "location");
        });
    }, { rootMargin: "-20% 0px -65% 0px" });

    document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));
} else {
    revealItems.forEach(item => item.classList.add("is-visible"));
}

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
