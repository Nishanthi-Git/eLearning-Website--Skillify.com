


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



/* Login Button */


/* Button Handlers */

// Handle the Login button
const loginButton = document.getElementById("log-in");
if (loginButton) {
    loginButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });
} else {
    console.error("Login button not found!");
}

// Handle the Sign-Up button
const signUpButton = document.getElementById("sign-up");
if (signUpButton) {
    signUpButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });
} else {
    console.error("Sign-Up button not found!");
}




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













// FAQ

const quesBtns = document.querySelectorAll('.quesbtn');

quesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const answer = btn.parentElement.nextElementSibling; 
        const img = btn.querySelector('img'); 

        answer.classList.toggle('active'); // Toggle the 'active' class

        if (answer.classList.contains('active')) {
            img.src = 'minus.png'; 
        } else {
            img.src = 'add.png'; 
        }
    });
});





/* index.html Specific Code */


// Login form submission logic
async function loginSubmit() {
    // Get form data
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    console.log("Form submitted. Sending data to backend...");

    try {
        // Send data to the backend
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Send as JSON
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login successful:", data);
            showAlert("Login successful!");
            localStorage.setItem('authToken', data.token); // Save token securely
        } else {
            console.error("Login failed. Status:", response.status);
            showAlert("Invalid email or password.");
        }
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        showAlert("An error occurred. Please try again.");
    }
}

// Signup form submission logic
async function signupSubmit() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    console.log("Sign-up form submitted. Sending data to backend...");

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Sign-up successful:", data);
            showAlert("Sign-up successful! Please log in.");
        } else {
            console.error("Sign-up failed. Status:", response.status);
            showAlert("Sign-up failed. Please try again.");
        }
    } catch (error) {
        console.error("Error occurred while signing up:", error);
        showAlert("An error occurred. Please try again.");
    }
}  

// Toggle password visibility
function togglePassword(inputId, button) {
    const passwordField = document.getElementById(inputId);
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        button.textContent = '🙈'; // Change icon to "hide"
    } else {
        passwordField.type = 'password';
        button.textContent = '👁️'; // Change icon to "show"
    }
}

// Show login form
function showLogin() {
    document.getElementById('login').addEventListener('click', () => {
        document.getElementById('login-content').style.display = 'flex';
        document.getElementById('signup-content').style.display = 'none';
    });
}

// Show signup form
function showSignUp() {
    document.getElementById('signup').addEventListener('click', () => {
        document.getElementById('signup-content').style.display = 'flex';
        document.getElementById('login-content').style.display = 'none';
    });
}

// Initialize login/signup forms
window.onload = () => {
    showLogin();
    showSignUp();
};

// Login Validation
document.getElementById('log-in').addEventListener('click', (event) => {
    // Prevent form submission
    event.preventDefault();

    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');

    const email = emailInput.value.trim();  // Trim spaces from email input
    const password = passwordInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regex for email validation

    // Validate email and password
    if (!email) {
        showAlert('Please enter your email.', 'error');
        return;
    } else if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    } else if (!password) {
        showAlert('Please enter your password.', 'error');
        return;
    }

    // If validation passes, call the login function
    loginSubmit();

    // Clear the input fields after successful login
    emailInput.value = '';
    passwordInput.value = '';
});

// Signup Validation
document.getElementById('sign-up').addEventListener('click', (event) => {
    // Prevent form submission
    event.preventDefault();

    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate email and password
    if (!email) {
        showAlert('Please enter your email.', 'error');
        return;
    } else if (!password) {
        showAlert('Please enter your password.', 'error');
        return;
    }

    // Password length validation
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long.', 'error');
        return;
    }

    // If validation passes, call the signup function
    signupSubmit();

    // Clear the input fields after successful signup
    emailInput.value = '';
    passwordInput.value = '';
});

// Function to create a styled alert box
function showAlert(message, type) {
    // Create a new div element for the alert box
    const alertBox = document.createElement('div');
    
    // Add the appropriate class based on the type (success, warning, error)
    alertBox.classList.add('alert-box', type);

    // Set the message content
    alertBox.textContent = message;

    // Style the alert box directly in JavaScript
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50px';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.padding = '20px';
    alertBox.style.color = 'black';
    alertBox.style.backgroundColor = 'white';
    alertBox.style.fontSize = '16px';
    alertBox.style.borderRadius = '5px';
    alertBox.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    alertBox.style.zIndex = '1000';

    // Apply different background colors based on alert type
    if (type === 'success') {
        alertBox.style.backgroundColor = '#4CAF50'; // Green for success
    } else if (type === 'warning') {
        alertBox.style.backgroundColor = '#FF9800'; // Orange for warning
    } else if (type === 'error') {
        alertBox.style.backgroundColor = '#f44336'; // Red for error
    }

    // Add the alert box to the body of the document
    document.body.appendChild(alertBox);

    // Automatically remove the alert after 5 seconds
    setTimeout(() => {
        alertBox.style.transition = 'opacity 0.5s ease-out';
        alertBox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 500);
    }, 5000);
}




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



