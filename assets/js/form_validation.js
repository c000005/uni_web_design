document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contact_form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name_input = document.getElementById('name');
            const email_input = document.getElementById('email');
            const subject_input = document.getElementById('subject');
            const message_input = document.getElementById('message');

            let isValid = true;

            if (!name_input.value.trim()) {
                showError(name_input, 'لطفا نام خود را وارد کنید');
                isValid = false;
            } else if (name_input.value.trim().length < 2) {
                showError(name_input, 'نام باید حداقل 2 کاراکتر باشد');
                isValid = false;
            } else {
                clearError(name_input);
            }

            if (!email_input.value.trim()) {
                showError(email_input, 'لطفا ایمیل خود را وارد کنید');
                isValid = false;
            } else if (!isValidEmail(email_input.value.trim())) {
                showError(email_input, 'لطفا یک ایمیل معتبر وارد کنید');
                isValid = false;
            } else {
                clearError(email_input);
            }

            if (!message_input.value.trim()) {
                showError(message_input, 'لطفا پیام خود را وارد کنید');
                isValid = false;
            } else if (message_input.value.trim().length < 10) {
                showError(message_input, 'پیام باید حداقل 10 کاراکتر باشد');
                isValid = false;
            } else {
                clearError(message_input);
            }

            if (isValid) {
                alert('پیام شما با موفقیت ارسال شد!');
                contactForm.reset();

                clearError(name_input);
                clearError(email_input);
                clearError(subject_input);
                clearError(message_input);
            }
        });

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    }
});

function validateField(input) {
    switch(input.id) {
        case 'name':
            if (!input.value.trim()) {
                showError(input, 'لطفا نام خود را وارد کنید');
            } else if (input.value.trim().length < 2) {
                showError(input, 'نام باید حداقل 2 کاراکتر باشد');
            } else {
                clearError(input);
            }
            break;

        case 'email':
            if (!input.value.trim()) {
                showError(input, 'لطفا ایمیل خود را وارد کنید');
            } else if (!isValidEmail(input.value.trim())) {
                showError(input, 'لطفا یک ایمیل معتبر وارد کنید');
            } else {
                clearError(input);
            }
            break;

        case 'message':
            if (!input.value.trim()) {
                showError(input, 'لطفا پیام خود را وارد کنید');
            } else if (input.value.trim().length < 10) {
                showError(input, 'پیام باید حداقل 10 کاراکتر باشد');
            } else {
                clearError(input);
            }
            break;
    }
}

function showError(input, message) {
    const errorDiv = document.getElementById(input.id + "Error");
    input.classList.add("invalid");
    if (errorDiv) {
        errorDiv.textContent = message;
    }
}

function clearError(input) {
    const errorDiv = document.getElementById(input.id + "Error");
    input.classList.remove("invalid");
    if (errorDiv) {
        errorDiv.textContent = "";
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^09\d{9}$/.test(phone);
}