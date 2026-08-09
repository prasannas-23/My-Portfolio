const themeToggleBtn = document.getElementById("theme-toggle");
const mobileToggleBtn = document.getElementById("mobile-toggle");
const navLinks = document.getElementById("nav-links");
const themeIcon = document.getElementById("theme-icon");

// ================================
// THEME MANAGEMENT
// ================================

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

const savedTheme = localStorage.getItem("theme") || systemTheme;

document.documentElement.setAttribute("data-theme", savedTheme);

if (themeIcon) {
  updateThemeIcon(savedTheme);
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (!themeIcon) return;

  if (theme === "dark") {
    // Sun icon
    themeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="20"
           height="20"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
           stroke-width="2">
        <circle cx="12" cy="12" r="4"></circle>
        <path stroke-linecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
      </svg>
    `;
  } else {
    // Moon icon
    themeIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="20"
           height="20"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
           stroke-width="2">
        <path stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12.79A9 9 0 1 1 11.21 3
                 7 7 0 0 0 21 12.79z">
        </path>
      </svg>
    `;
  }
}


// ================================
// MOBILE NAVIGATION TOGGLE
// ================================

if (mobileToggleBtn && navLinks) {

  mobileToggleBtn.addEventListener("click", () => {

    const isActive = navLinks.classList.toggle("active");

    document.body.style.overflow = isActive ? "hidden" : "";

    // Change hamburger ↔ X
    if (isActive) {

      mobileToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12">
          </path>
        </svg>
      `;

    } else {

      mobileToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16m-7 6h7">
          </path>
        </svg>
      `;

    }

  });


  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("active");

      document.body.style.overflow = "";

      mobileToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16m-7 6h7">
          </path>
        </svg>
      `;

    });

  });

}


// ================================
// FOOTER YEAR
// ================================

const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


// ================================
// ACTIVE NAV LINK
// ================================

const currentPage =
  location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach((link) => {

  link.classList.remove("active");

  const href = link.getAttribute("href");

  if (!href) return;

  const linkPage = href.split("/").pop();

  if (linkPage === currentPage) {
    link.classList.add("active");
  }

});


// ================================
// CAROUSEL
// ================================

const slideEls = document.querySelectorAll(".carousel-slide");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

if (slideEls.length && prevBtn && nextBtn) {

  let index = 0;

  slideEls[index].classList.add("active");

  function goTo(i) {

    slideEls[index].classList.remove("active");

    index = (i + slideEls.length) % slideEls.length;

    slideEls[index].classList.add("active");

  }

  prevBtn.addEventListener("click", () => {
    goTo(index - 1);
  });

  nextBtn.addEventListener("click", () => {
    goTo(index + 1);
  });

}

// // ================================
// // CONTACT FORM
// // ================================

// const contactForm = document.getElementById("contactForm");
// const formStatus = document.getElementById("formStatus");
// const submitBtn = document.getElementById("submitBtn");

// // Initialize EmailJS
// emailjs.init({
//   publicKey: "pWqA4cgeB_cVJJli5"
// });

// if (contactForm) {

//   contactForm.addEventListener("submit", async function (event) {

//     event.preventDefault();

//     if (!contactForm.checkValidity()) {
//       contactForm.reportValidity();
//       return;
//     }

//     const btnSpan = submitBtn.querySelector("span");
//     const originalText = btnSpan.textContent;

//     btnSpan.textContent = "Sending...";
//     submitBtn.disabled = true;

//     formStatus.textContent = "";
//     formStatus.className = "form-status";

//     try {

//       await emailjs.sendForm(
//         "service_wleb02u",
//         "template_5p5z36n",
//         contactForm
//       );

//       formStatus.textContent =
//         "Thanks for your message! I'll get back to you soon.";

//       formStatus.className =
//         "form-status success";

//       contactForm.reset();

//     } catch (error) {

//       console.error("EmailJS Error:", error);

//       formStatus.textContent =
//         "Unable to send your message. Please try again.";

//       formStatus.className =
//         "form-status error";

//     } finally {

//       btnSpan.textContent = originalText;
//       submitBtn.disabled = false;

//     }

//   });

// }
// ================================
// CONTACT FORM - EMAILJS
// ================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");
emailjs.init({
  publicKey: "pWqA4cgeB_cVJJli5"
});


if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        // IMPORTANT
        event.preventDefault();

        console.log("Contact form JavaScript is working.");

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const btnSpan = submitBtn.querySelector("span");
        const originalText = btnSpan.textContent;

        btnSpan.textContent = "Sending...";
        submitBtn.disabled = true;

        formStatus.textContent = "";
        formStatus.className = "form-status";

        try {

            const response = await emailjs.sendForm(
                 "service_wleb02u",
                 "template_5p5z36n",
                  contactForm
            );

            console.log("EmailJS response:", response);

            formStatus.textContent =
                "Thanks for your message! I'll get back to you soon.";

            formStatus.className =
                "form-status success";

            contactForm.reset();

        } catch (error) {

            console.error("EmailJS Error:", error);

            formStatus.textContent =
                "Unable to send your message. Please try again.";

            formStatus.className =
                "form-status error";

        } finally {

            btnSpan.textContent = originalText;
            submitBtn.disabled = false;

        }

    });

}