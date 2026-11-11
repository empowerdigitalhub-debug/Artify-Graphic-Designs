

/* =====================================================
   ARTIFY DESIGNS
   PREMIUM CREATIVE AGENCY JAVASCRIPT ENGINE
   2026 EDITION
   ===================================================== */

"use strict";

/* =====================================================
   1. CONFIGURATION
   ===================================================== */

const ARTIFY_CONFIG = {
    whatsappNumber: "254700000000", // Replace with your real number
    animationSpeed: 800,
    revealThreshold: 0.12,
    enableMagneticButtons: true,
    enableTypingEffect: true,
    enablePortfolioFilter: true,
    enableImagePreview: true,
    enableSound: false
};


/* =====================================================
   2. GLOBAL ELEMENTS
   ===================================================== */

const body = document.body;
const header = document.querySelector("header");
const hero = document.querySelector("#hero");
const portfolio = document.querySelector("#portfolio");
const contactForm = document.querySelector(".contact-form form");


/* =====================================================
   3. ADD DYNAMIC ELEMENTS
   ===================================================== */

function createElement(tag, className, parent, text = "") {
    const element = document.createElement(tag);

    element.className = className;
    element.textContent = text;

    if (parent) {
        parent.appendChild(element);
    }

    return element;
}


/* =====================================================
   4. SCROLL PROGRESS BAR
   ===================================================== */

const progressBar = createElement(
    "div",
    "artify-scroll-progress",
    body
);

progressBar.setAttribute("aria-hidden", "true");

function updateScrollProgress() {
    const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

updateScrollProgress();


/* =====================================================
   5. RESPONSIVE MOBILE NAVIGATION
   ===================================================== */

if (header) {
    const nav = header.querySelector("nav");
    const navList = nav?.querySelector("ul");

    if (nav && navList) {

        const menuButton = createElement(
            "button",
            "artify-menu-toggle",
            header,
            "☰"
        );

        menuButton.type = "button";
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-controls", "artify-navigation");

        navList.id = "artify-navigation";

        function closeMenu() {
            nav.classList.remove("menu-open");
            menuButton.classList.remove("active");

            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
        }

        function toggleMenu() {
            const isOpen = nav.classList.toggle("menu-open");

            menuButton.classList.toggle("active", isOpen);

            menuButton.textContent = isOpen ? "✕" : "☰";

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        }

        menuButton.addEventListener("click", toggleMenu);

        navList.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {
            if (
                nav.classList.contains("menu-open") &&
                !nav.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

    }
}


/* =====================================================
   6. HEADER SCROLL EFFECT
   ===================================================== */

function updateHeader() {
    if (!header) return;

    header.classList.toggle(
        "header-scrolled",
        window.scrollY > 40
    );
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* =====================================================
   7. SMOOTH INTERNAL NAVIGATION
   ===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth",
            block: "start"
        });

        history.replaceState(null, "", targetId);

    });

});


/* =====================================================
   8. ACTIVE NAVIGATION HIGHLIGHTING
   ===================================================== */

const pageSections = document.querySelectorAll(
    "main section[id]"
);

const navigationLinks = document.querySelectorAll(
    'nav a[href^="#"]'
);

if ("IntersectionObserver" in window) {

    const navigationObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const activeId = entry.target.id;

                navigationLinks.forEach(link => {

                    const isActive =
                        link.getAttribute("href") === `#${activeId}`;

                    link.classList.toggle("active-link", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }

                });

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    pageSections.forEach(section => {
        navigationObserver.observe(section);
    });

}


/* =====================================================
   9. SCROLL REVEAL ANIMATIONS
   ===================================================== */

const revealElements = document.querySelectorAll(
    [
        ".section-heading",
        ".about-content",
        ".service-card",
        ".reasons article",
        ".portfolio-item",
        ".process-container article",
        ".testimonials-container article",
        ".contact-information",
        ".contact-form",
        "#vision-mission > div"
    ].join(",")
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("artify-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: ARTIFY_CONFIG.revealThreshold
        }
    );

    revealElements.forEach(element => {

        element.classList.add("artify-reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {
        element.classList.add("artify-visible");
    });

}


/* =====================================================
   10. HERO TYPING EFFECT
   ===================================================== */

if (hero && ARTIFY_CONFIG.enableTypingEffect) {

    const typingMessages = [
        "Creative Designs. Powerful Brands.",
        "Turning Ideas Into Visual Masterpieces.",
        "Your Vision. Our Creative Expertise.",
        "Design Beyond Imagination."
    ];

    const typingElement = createElement(
        "p",
        "artify-typing-text",
        hero.querySelector(".hero-content")
    );

    typingElement.setAttribute("aria-live", "polite");

    let messageIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeMessage() {

        if (document.hidden) {
            setTimeout(typeMessage, 500);
            return;
        }

        const currentMessage =
            typingMessages[messageIndex];

        if (deleting) {

            characterIndex--;

        } else {

            characterIndex++;

        }

        typingElement.textContent =
            currentMessage.substring(0, characterIndex);

        let delay = deleting ? 35 : 65;

        if (!deleting &&
            characterIndex === currentMessage.length) {

            deleting = true;
            delay = 1700;

        } else if (deleting && characterIndex === 0) {

            deleting = false;

            messageIndex =
                (messageIndex + 1) % typingMessages.length;

            delay = 350;

        }

        setTimeout(typeMessage, delay);

    }

    if (!reducedMotion) {
        typeMessage();
    } else {
        typingElement.textContent = typingMessages[0];
    }

}


/* =====================================================
   11. ANIMATED COUNTERS
   ===================================================== */

const statsSection = createElement(
    "section",
    "artify-stats",
    document.querySelector("main")
);

statsSection.setAttribute("aria-label", "Creative studio highlights");

const stats = [
    {
        number: 100,
        label: "Creative Possibilities",
        suffix: "+"
    },
    {
        number: 9,
        label: "Creative Service Areas",
        suffix: ""
    },
    {
        number: 100,
        label: "Commitment to Quality",
        suffix: "%"
    }
];

stats.forEach(stat => {

    const item = createElement(
        "div",
        "artify-stat-card",
        statsSection
    );

    const number = createElement(
        "strong",
        "artify-stat-number",
        item,
        "0"
    );

    number.dataset.target = stat.number;
    number.dataset.suffix = stat.suffix;

    createElement(
        "p",
        "artify-stat-label",
        item,
        stat.label
    );

});

function animateCounter(element) {

    const target = Number(element.dataset.target);
    const suffix = element.dataset.suffix || "";

    const duration = 1600;
    const start = performance.now();

    function update(now) {

        const progress = Math.min(
            (now - start) / duration,
            1
        );

        const eased = 1 - Math.pow(1 - progress, 4);

        const value = Math.floor(target * eased);

        element.textContent = value + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }

    }

    requestAnimationFrame(update);

}

if ("IntersectionObserver" in window && !reducedMotion) {

    const statsObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target
                        .querySelectorAll(".artify-stat-number")
                        .forEach(animateCounter);

                    observer.unobserve(entry.target);

                }

            });

        },
        { threshold: 0.4 }
    );

    statsObserver.observe(statsSection);

} else {

    statsSection.querySelectorAll(".artify-stat-number")
        .forEach(element => {
            element.textContent =
                element.dataset.target + element.dataset.suffix;
        });

}


/* =====================================================
   12. PORTFOLIO FILTERING
   ===================================================== */

if (portfolio && ARTIFY_CONFIG.enablePortfolioFilter) {

    const portfolioItems = [
        ...portfolio.querySelectorAll(".portfolio-item")
    ];

    if (portfolioItems.length) {

        const filterContainer = createElement(
            "div",
            "artify-portfolio-filters",
            portfolio.querySelector(".section-heading")
        );

        filterContainer.setAttribute(
            "aria-label",
            "Filter portfolio projects"
        );

        const categories = [
            "All",
            ...new Set(
                portfolioItems.map(item => {

                    const heading = item.querySelector("h3")
                        ?.textContent.toLowerCase() || "";

                    if (heading.includes("logo") ||
                        heading.includes("brand")) return "Branding";

                    if (heading.includes("poster")) return "Posters";

                    if (heading.includes("stationery")) return "Stationery";

                    if (heading.includes("social")) return "Social Media";

                    if (heading.includes("business")) return "Business Cards";

                    if (heading.includes("print")) return "Printing";

                    return "Other";

                })
            )
        ];

        categories.forEach(category => {

            const button = createElement(
                "button",
                "artify-filter-button",
                filterContainer,
                category
            );

            button.type = "button";

            button.setAttribute(
                "aria-pressed",
                String(category === "All")
            );

            button.addEventListener("click", () => {

                filterContainer.querySelectorAll("button")
                    .forEach(btn => {
                        btn.classList.remove("filter-active");
                        btn.setAttribute("aria-pressed", "false");
                    });

                button.classList.add("filter-active");
                button.setAttribute("aria-pressed", "true");

                portfolioItems.forEach(item => {

                    const heading = item.querySelector("h3")
                        ?.textContent.toLowerCase() || "";

                    const categoryMap = {
                        "Branding": ["logo", "brand"],
                        "Posters": ["poster"],
                        "Stationery": ["stationery"],
                        "Social Media": ["social"],
                        "Business Cards": ["business"],
                        "Printing": ["print"]
                    };

                    const matches = category === "All" ||
                        (categoryMap[category] || [])
                            .some(word => heading.includes(word));

                    item.classList.toggle(
                        "portfolio-hidden",
                        !matches
                    );

                });

            });

            if (category === "All") {
                button.classList.add("filter-active");
            }

        });

    }

}


/* =====================================================
   13. PROFESSIONAL IMAGE LIGHTBOX
   ===================================================== */

if (ARTIFY_CONFIG.enableImagePreview) {

    const lightbox = createElement(
        "div",
        "artify-lightbox",
        body
    );

    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Portfolio image preview");
    lightbox.setAttribute("aria-hidden", "true");

    const lightboxClose = createElement(
        "button",
        "artify-lightbox-close",
        lightbox,
        "×"
    );

    lightboxClose.type = "button";
    lightboxClose.setAttribute("aria-label", "Close image preview");

    const lightboxImage = createElement(
        "img",
        "artify-lightbox-image",
        lightbox
    );

    lightboxImage.alt = "";

    const lightboxCaption = createElement(
        "p",
        "artify-lightbox-caption",
        lightbox
    );

    let lastFocusedElement = null;

    function closeLightbox() {

        lightbox.classList.remove("lightbox-open");
        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage.removeAttribute("src");

        body.classList.remove("lightbox-active");

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

    }

    function openLightbox(image, caption) {

        lastFocusedElement = document.activeElement;

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || caption;

        lightboxCaption.textContent = caption;

        lightbox.classList.add("lightbox-open");
        lightbox.setAttribute("aria-hidden", "false");

        body.classList.add("lightbox-active");

        lightboxClose.focus();

    }

    portfolio?.querySelectorAll(".portfolio-item img")
        .forEach(image => {

            image.tabIndex = 0;
            image.setAttribute("role", "button");

            image.setAttribute(
                "aria-label",
                "Preview " + (image.alt || "portfolio image")
            );

            const open = () => {

                const caption = image.closest(".portfolio-item")
                    ?.querySelector("h3")?.textContent || "ARTIFY DESIGNS";

                openLightbox(image, caption);

            };

            image.addEventListener("click", open);

            image.addEventListener("keydown", event => {

                if (event.key === "Enter" || event.key === " ") {

                    event.preventDefault();
                    open();

                }

            });

        });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("lightbox-open")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "Tab") {

            event.preventDefault();
            lightboxClose.focus();

        }

    });

}


/* =====================================================
   14. MAGNETIC BUTTON EFFECTS
   ===================================================== */

if (ARTIFY_CONFIG.enableMagneticButtons && !reducedMotion) {

    const magneticElements = document.querySelectorAll(
        ".hero-buttons a, .header-action a, #cta a"
    );

    magneticElements.forEach(element => {

        element.addEventListener("mousemove", event => {

            if (window.matchMedia("(hover: none)").matches) return;

            const rect = element.getBoundingClientRect();

            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            element.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        });

        element.addEventListener("mouseleave", () => {
            element.style.transform = "";
        });

    });

}


/* =====================================================
   15. FLOATING CREATIVE DECORATIONS
   ===================================================== */

if (hero && !reducedMotion) {

    const decoration = createElement(
        "div",
        "artify-floating-decoration",
        hero
    );

    decoration.setAttribute("aria-hidden", "true");

    decoration.textContent = "✦";

    window.addEventListener("scroll", () => {

        if (window.scrollY < window.innerHeight) {

            decoration.style.transform =
                `translateY(${window.scrollY * 0.12}px) rotate(${window.scrollY * 0.1}deg)`;

        }

    }, { passive: true });

}


/* =====================================================
   16. BACK TO TOP BUTTON
   ===================================================== */

const backToTop = createElement(
    "button",
    "artify-back-to-top",
    body,
    "↑"
);

backToTop.type = "button";
backToTop.setAttribute("aria-label", "Back to top");

function updateBackToTop() {

    backToTop.classList.toggle(
        "back-to-top-visible",
        window.scrollY > 500
    );

}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
    });

});

updateBackToTop();


/* =====================================================
   17. DARK / LIGHT THEME SWITCHER
   ===================================================== */

const themeButton = createElement(
    "button",
    "artify-theme-toggle",
    header || body,
    "◐"
);

themeButton.type = "button";
themeButton.setAttribute("aria-label", "Switch to dark theme");
themeButton.setAttribute("title", "Switch colour theme");

function applyTheme(theme) {

    body.dataset.theme = theme;

    themeButton.textContent = theme === "dark" ? "☀" : "◐";

    themeButton.setAttribute(
        "aria-label",
        theme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme"
    );

    try {
        localStorage.setItem("artify-theme", theme);
    } catch (error) {
        console.warn("Theme preference could not be saved.");
    }

}

let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("artify-theme") || "light";
} catch (error) {
    console.warn("Saved theme is unavailable.");
}

applyTheme(savedTheme);

themeButton.addEventListener("click", () => {

    const nextTheme =
        body.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

});


/* =====================================================
   18. CONTACT FORM VALIDATION
   ===================================================== */

if (contactForm) {

    const nameInput = contactForm.querySelector("#name");
    const emailInput = contactForm.querySelector("#email");
    const phoneInput = contactForm.querySelector("#phone");
    const serviceInput = contactForm.querySelector("#service");
    const messageInput = contactForm.querySelector("#message");

    const formStatus = createElement(
        "p",
        "artify-form-status",
        contactForm
    );

    formStatus.setAttribute("role", "status");
    formStatus.setAttribute("aria-live", "polite");

    function showFormMessage(message, success = false) {

        formStatus.textContent = message;

        formStatus.classList.toggle("status-success", success);
        formStatus.classList.toggle("status-error", !success);

    }

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            showFormMessage(
                "Please complete all required fields correctly."
            );

            return;

        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const service = serviceInput.value;
        const message = messageInput.value.trim();

        if (name.length < 2 || message.length < 10) {

            showFormMessage(
                "Please enter your name and a project description of at least 10 characters."
            );

            return;

        }

        if (phone && !/^[+\d\s()-]{7,20}$/.test(phone)) {

            showFormMessage(
                "Please enter a valid phone number."
            );

            phoneInput.focus();

            return;

        }

        const enquiry = [
            "NEW PROJECT ENQUIRY - ARTIFY DESIGNS",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone || "Not provided"}`,
            `Service: ${service}`,
            "",
            "Project Details:",
            message
        ].join("\n");

        const whatsappURL =
            `https://wa.me/${ARTIFY_CONFIG.whatsappNumber}?text=` +
            encodeURIComponent(enquiry);

        showFormMessage(
            "Your enquiry is ready. Opening WhatsApp...",
            true
        );

        const whatsappWindow = window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

        if (!whatsappWindow) {

            showFormMessage(
                "WhatsApp could not open. Please check your browser's pop-up settings or contact us directly."
            );

        }

    });

}


/* =====================================================
   19. IMAGE LOADING EFFECT
   ===================================================== */

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("load", () => {

        image.classList.add("image-loaded");

    }, { once: true });

    image.addEventListener("error", () => {

        image.classList.add("image-error");

        console.warn(
            "ARTIFY image could not load:",
            image.getAttribute("src")
        );

    });

    if (image.complete && image.naturalWidth > 0) {
        image.classList.add("image-loaded");
    }

});


/* =====================================================
   20. YEAR AUTO UPDATE
   ===================================================== */

document.querySelectorAll(".footer-bottom p").forEach(paragraph => {

    if (paragraph.textContent.includes("2026")) {

        paragraph.textContent =
            paragraph.textContent.replace(
                /2026/g,
                new Date().getFullYear()
            );

    }

});


/* =====================================================
   21. PERFORMANCE AND INITIALIZATION
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    body.classList.add("artify-loaded");

    console.log(
        "%c ARTIFY DESIGNS ",
        "background:#7139B5;color:white;font-size:20px;font-weight:bold;padding:12px;"
    );

    console.log(
        "%c Creative Designs. Powerful Brands. ",
        "color:#A879E8;font-size:14px;font-weight:bold;"
    );

    console.log(
        "ARTIFY creative website engine initialized successfully."
    );

});


/* =====================================================
   END OF ARTIFY DESIGNS JAVASCRIPT ENGINE
   ===================================================== */
