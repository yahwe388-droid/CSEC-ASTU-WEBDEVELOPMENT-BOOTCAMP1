
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function hideError(element) {
        element.style.display = 'none';
    }

    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim().length >= 2) {
            hideError(nameError);
            nameInput.style.borderColor = '#4CAF50';
        } else {
            nameInput.style.borderColor = '#ddd';
        }
    });

    emailInput.addEventListener('input', function() {
        if (isValidEmail(emailInput.value.trim())) {
            hideError(emailError);
            emailInput.style.borderColor = '#4CAF50';
        } else {
            emailInput.style.borderColor = '#ddd';
        }
    });

    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim().length >= 10) {
            hideError(messageError);
            messageInput.style.borderColor = '#4CAF50';
        } else {
            messageInput.style.borderColor = '#ddd';
        }
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;

        if (nameInput.value.trim().length < 2) {
            showError(nameError, 'Please enter your name (minimum 2 characters).');
            nameInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            hideError(nameError);
            nameInput.style.borderColor = '#4CAF50';
        }

        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address.');
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            hideError(emailError);
            emailInput.style.borderColor = '#4CAF50';
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageError, 'Please enter a message (minimum 10 characters).');
            messageInput.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            hideError(messageError);
            messageInput.style.borderColor = '#4CAF50';
        }

        if (isValid) {
 
            alert(`Thank you, ${nameInput.value.trim()}! Your message has been sent successfully. I'll get back to you soon!`);

            contactForm.reset();

            nameInput.style.borderColor = '#ddd';
            emailInput.style.borderColor = '#ddd';
            messageInput.style.borderColor = '#ddd';

            console.log(`Form submitted successfully. Message from ${nameInput.value.trim()} (${emailInput.value.trim()}): "${messageInput.value.trim().substring(0, 50)}..."`);
        }
    });

    const header = document.querySelector('header');
    header.style.opacity = '0';
    header.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        header.style.transition = 'opacity 1s ease, transform 1s ease';
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 300);

    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});