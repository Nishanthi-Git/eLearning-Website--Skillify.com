/* index.html Specific Code */

/* Menu bar toggle */
document.querySelector('.ham-barbtn').addEventListener('click', function() {
    var navbar = document.querySelector('.nav');
    const menuIcon = document.getElementById('menu-icon');
    navbar.classList.toggle('active');
    if (menuIcon.src.includes('menu.png')) {
        menuIcon.src = 'images/cancel.png';
    } else {
        menuIcon.src = 'images/menu.png';
    }
    
});


/* Go-Up Button */
const goUpButton = document.getElementById('goup-btn');

// Show/hide the button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { 
        goUpButton.classList.add('show');
    } else {
        goUpButton.classList.remove('show');
    }
});

// Smooth scroll to the top on button click
goUpButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});





// Select Course Card Elements
const scrollContainer = document.querySelector(".course-card");
const scrollLeftButton = document.querySelector('.scroll-btn.left');
const scrollRightButton = document.querySelector('.scroll-btn.right');

// Select Review Card Elements
const reviewContainer = document.querySelector('.review-card-container');
const reviewLeftButton = document.querySelector('.review-btn.left');
const reviewRightButton = document.querySelector('.review-btn.right');

// Update Button States Function
function updateButtonState(container, leftButton, rightButton) {
    if (!container || !leftButton || !rightButton) return; // Ensure elements exist

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentScrollLeft = container.scrollLeft;

    // Disable Left Button if at Start
    leftButton.disabled = currentScrollLeft <= 0;
    leftButton.classList.toggle("disabled", currentScrollLeft <= 0);

    // Disable Right Button if at End
    rightButton.disabled = currentScrollLeft >= maxScrollLeft;
    rightButton.classList.toggle("disabled", currentScrollLeft >= maxScrollLeft);
}

// Add Event Listeners for Course Scroll Buttons
if (scrollContainer && scrollLeftButton && scrollRightButton) {
    scrollLeftButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -450, behavior: 'smooth' });
        setTimeout(() => updateButtonState(scrollContainer, scrollLeftButton, scrollRightButton), 500);
    });

    scrollRightButton.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 450, behavior: 'smooth' });
        setTimeout(() => updateButtonState(scrollContainer, scrollLeftButton, scrollRightButton), 500);
    });

    updateButtonState(scrollContainer, scrollLeftButton, scrollRightButton);
}

// Add Event Listeners for Review Scroll Buttons
if (reviewContainer && reviewLeftButton && reviewRightButton) {
    reviewLeftButton.addEventListener('click', () => {
        reviewContainer.scrollBy({ left: -470, behavior: 'smooth' });
        setTimeout(() => updateButtonState(reviewContainer, reviewLeftButton, reviewRightButton), 500);
    });

    reviewRightButton.addEventListener('click', () => {
        reviewContainer.scrollBy({ left: 470, behavior: 'smooth' });
        setTimeout(() => updateButtonState(reviewContainer, reviewLeftButton, reviewRightButton), 500);
    });

    updateButtonState(reviewContainer, reviewLeftButton, reviewRightButton);
}

/* Subscription Form Validation */
const form = document.getElementById('myForm');
if (form) {
    const emailInput = document.getElementById('mail');
    const emailError = document.getElementById('emailError');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let isValid = true;
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailError.textContent = "Email is required.";
            emailError.classList.add('active');
            isValid = false;
            
            setTimeout(() => {
                emailError.textContent = "";
                emailError.classList.remove('active');
            }, 3000);
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Enter a valid email address.";
            isValid = false;
        } else {
            emailError.textContent = "";
        }
    });

    // Clear error when user starts typing
    emailInput.addEventListener('input', () => {
        emailError.textContent = "";
        emailError.classList.remove('active');
    });
}



// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default jump-to behavior

        const targetId = this.getAttribute('href').substring(1); // Get the target ID
        const targetElement = document.getElementById(targetId); // Find the target element by ID

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100; // Adjust for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    });
});

/* Get start button*/
const myButton = document.getElementById("myButton");
if (myButton) {
    myButton.addEventListener("click", function () {
        window.location.href = "courses.html";
    });
} else {
    console.error("Button with ID 'myButton' not found!");
}

/* teacher.html Specific Code */
document.addEventListener("DOMContentLoaded", () => {
    const skillBars = document.querySelectorAll(".skill-bar");

    if (skillBars.length > 0) {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.7 }
        );

        skillBars.forEach((bar) => {
            observer.observe(bar);
        });
    }
});

// courses.html - slider
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');

slider.addEventListener('input', function () {
    const value = slider.value;
    const min = slider.min || 0;
    const max = slider.max || 100;

    // Update slider value display
    sliderValue.textContent = `Price: $${value}`;

    // Calculate percentage for background color
    const percentage = ((value - min) / (max - min)) * 100;

    // Update background style based on slider value
    slider.style.background = `linear-gradient(to right, #cc5dfb ${percentage}%, #ddd ${percentage}%)`;
});

// Select course filter button toggle
document.querySelector('.filter-button')?.addEventListener('click', function() {
    var filterContent = document.getElementById('filterContent');
    filterContent.classList.toggle('active');
});

document.querySelector('.filter-btn')?.addEventListener('click', function() {
    var filterContent = document.getElementById('filterContent');
    filterContent.classList.remove('active');
});

