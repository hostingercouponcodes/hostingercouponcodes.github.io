// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-container")) {
      navMenu?.classList.remove("active")
    }
  })
})

// Coupon Copy Function
function copyCoupon(button, code) {
  // Copy to clipboard
  navigator.clipboard
    .writeText(code)
    .then(() => {
      // Update button text
      const originalHTML = button.innerHTML
      button.innerHTML = `
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Copied!
        `
      button.classList.add("copied")

      // Show toast notification
      showToast("Coupon code copied to clipboard!")

      // Reset button after 2 seconds
      setTimeout(() => {
        button.innerHTML = originalHTML
        button.classList.remove("copied")
      }, 2000)
    })
    .catch((err) => {
      console.error("Failed to copy:", err)
      showToast("Failed to copy. Please try again.", "error")
    })
}

// Toast Notification
function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  toast.textContent = message
  toast.style.background = type === "error" ? "#ef4444" : "#1e293b"
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Newsletter Form
function subscribeNewsletter(event) {
  event.preventDefault()
  const form = event.target
  const email = form.querySelector('input[type="email"]').value

  // Simulate subscription (in real app, this would call an API)
  showToast("Successfully subscribed! Check your email for exclusive offers.")
  form.reset()

  return false
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  })
})

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".coupon-card, .feature-card, .pricing-card, .testimonial-card")
  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.5s, transform 0.5s"
    observer.observe(card)
  })
})

// Coupon code analytics (tracks usage)
function trackCouponUsage(code) {
  // In a real application, this would send analytics to your backend
  console.log("[v0] Coupon used:", code)

  // Update usage count in localStorage (for demo purposes)
  const usageKey = `coupon_${code}_usage`
  const currentUsage = Number.parseInt(localStorage.getItem(usageKey) || "0")
  localStorage.setItem(usageKey, (currentUsage + 1).toString())
}

// Call tracking when copying coupon
const originalCopyCoupon = copyCoupon
copyCoupon = (button, code) => {
  originalCopyCoupon(button, code)
  trackCouponUsage(code)
}
