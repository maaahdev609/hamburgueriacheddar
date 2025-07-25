// Initialize AOS (Animate On Scroll)
import AOS from "aos"
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
})

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Add click event to all nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.98)"
  } else {
    header.style.background = "rgba(0, 0, 0, 0.95)"
  }
})

// Feedback Carousel
let currentSlide = 0
const slides = document.querySelectorAll(".feedback-card")
const totalSlides = slides.length

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active")
    if (i === index) {
      slide.classList.add("active")
    }
  })

  const track = document.querySelector(".feedback-track")
  track.style.transform = `translateX(-${index * 100}%)`
}

function changeSlide(direction) {
  currentSlide += direction

  if (currentSlide >= totalSlides) {
    currentSlide = 0
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1
  }

  showSlide(currentSlide)
}

// Auto-rotate feedback carousel
setInterval(() => {
  changeSlide(1)
}, 5000)

// Form Validation
const contactForm = document.getElementById("contactForm")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")

// Validation functions
function validateName(name) {
  return name.trim().length >= 2
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateMessage(message) {
  return message.trim().length >= 10
}

function showError(inputId, message) {
  const errorElement = document.getElementById(inputId + "Error")
  errorElement.textContent = message
  errorElement.style.display = "block"
}

function hideError(inputId) {
  const errorElement = document.getElementById(inputId + "Error")
  errorElement.textContent = ""
  errorElement.style.display = "none"
}

// Real-time validation
nameInput.addEventListener("blur", () => {
  if (!validateName(nameInput.value)) {
    showError("name", "Nome deve ter pelo menos 2 caracteres")
  } else {
    hideError("name")
  }
})

emailInput.addEventListener("blur", () => {
  if (!validateEmail(emailInput.value)) {
    showError("email", "Por favor, insira um e-mail válido")
  } else {
    hideError("email")
  }
})

messageInput.addEventListener("blur", () => {
  if (!validateMessage(messageInput.value)) {
    showError("message", "Mensagem deve ter pelo menos 10 caracteres")
  } else {
    hideError("message")
  }
})

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = nameInput.value
  const email = emailInput.value
  const message = messageInput.value

  let isValid = true

  // Validate all fields
  if (!validateName(name)) {
    showError("name", "Nome deve ter pelo menos 2 caracteres")
    isValid = false
  } else {
    hideError("name")
  }

  if (!validateEmail(email)) {
    showError("email", "Por favor, insira um e-mail válido")
    isValid = false
  } else {
    hideError("email")
  }

  if (!validateMessage(message)) {
    showError("message", "Mensagem deve ter pelo menos 10 caracteres")
    isValid = false
  } else {
    hideError("message")
  }

  if (isValid) {
    // Show loading state
    const submitBtn = document.querySelector(".submit-btn")
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<span class="loading"></span> Enviando...'
    submitBtn.disabled = true

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  }
})

// Menu item interactions
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateY(-10px) scale(1.02)"
  })

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) scale(1)"
  })
})

// Add click effect to menu items
document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", () => {
    // Add a subtle click animation
    item.style.transform = "scale(0.98)"
    setTimeout(() => {
      item.style.transform = "translateY(-10px) scale(1.02)"
    }, 100)
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".menu-item, .feedback-card, .contact-item").forEach((el) => {
  observer.observe(el)
})

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const heroImage = document.querySelector(".hero-image")

  if (hero && heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 80)
  }
})

// Add floating animation to social icons
document.querySelectorAll(".social-icon, .social-link").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.style.animation = "pulse 0.6s ease-in-out"
  })

  icon.addEventListener("animationend", () => {
    icon.style.animation = ""
  })
})

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll(".section-title, .section-subtitle")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.5 },
)

revealElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.6s ease"
  revealObserver.observe(el)
})
