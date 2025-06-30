// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }

    async function handleFormSubmission(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || 'Not provided',
            vehicle: formData.get('vehicle') || 'Not provided',
            service: formData.get('service') || 'Not specified',
            message: formData.get('message')
        };

        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Option 1: Using EmailJS (recommended)
            await sendEmailWithEmailJS(data);
            
            // Option 2: Using a backend service (uncomment if you have a backend)
            // await sendEmailToBackend(data);
            
            showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Error sending email:', error);
            showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // EmailJS integration (free email service)
    async function sendEmailWithEmailJS(data) {
        // You'll need to sign up at https://www.emailjs.com/ and replace these with your actual IDs
        const serviceID = 'service_968234f'; // Replace with your EmailJS service ID
        const templateID = 'template_rh1wtig'; // Replace with your EmailJS template ID
        const publicKey = 'GMZ3z6A7Bg0YZx-6T'; // Replace with your EmailJS public key

        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded. Please include the EmailJS script.');
        }

        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone,
            vehicle: data.vehicle,
            service: data.service,
            message: data.message,
            to_email: 'ibarj08@gmail.com' // Replace with your actual email
        };

        return emailjs.send(serviceID, templateID, templateParams, publicKey);
    }

    // Alternative: Send to your own backend
    // async function sendEmailToBackend(data) {
    //     const response = await fetch('/api/contact', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     });

    //     if (!response.ok) {
    //         throw new Error('Failed to send email');
    //     }

    //     return response.json();
    // }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Highlight current day in business hours
    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const today = new Date().getDay();
    const businessHoursItems = document.querySelectorAll('.business-hours-list li');
    businessHoursItems.forEach(li => {
        const daySpan = li.querySelector('.day');
        if (daySpan && daySpan.textContent.trim().startsWith(days[today])) {
            li.classList.add('today');
        }
    });
});
