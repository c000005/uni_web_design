document.addEventListener('DOMContentLoaded', function () {

    if (document.getElementById('contact_form')) {
        document.getElementById('contact_form').addEventListener('submit', function (e) {
            e.preventDefault();

            const name_input = document.getElementById('name');
            const email_input = document.getElementById('email');
            const subject_input = document.getElementById('subject');
            const message_input = document.getElementById('message');

            let isValid = true;

            if (!name_input.value.trim()) {
                show_error(name_input, 'لطفا نام خود را وارد کنید');
                isValid = false;
            } else if (name_input.value.trim().length < 2) {
                show_error(name_input, 'نام باید حداقل 2 کاراکتر باشد');
                isValid = false;
            } else {
                clearError(name_input);
            }

            if (!email_input.value.trim()) {
                show_error(email_input, 'لطفا ایمیل خود را وارد کنید');
                isValid = false;
            } else if (!isValidEmail(email_input.value.trim())) {
                show_error(email_input, 'لطفا یک ایمیل معتبر وارد کنید');
                isValid = false;
            } else {
                clearError(email_input);
            }

            if (!message_input.value.trim()) {
                show_error(message_input, 'لطفا پیام خود را وارد کنید');
                isValid = false;
            } else if (message_input.value.trim().length < 10) {
                show_error(message_input, 'پیام باید حداقل 10 کاراکتر باشد');
                isValid = false;
            } else {
                clearError(message_input);
            }

            if (isValid) {
                alert('پیام شما با موفقیت ارسال شد!');
                document.getElementById('contact_form').reset();

                clearError(name_input);
                clearError(email_input);
                clearError(subject_input);
                clearError(message_input);
            }
        });

        const inputs = document.getElementById('contact_form').querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                clearError(this);
            });
        });


    } else if (document.getElementById('forgot_form')) {
        document.getElementById("forgot_form").addEventListener("submit", function (e) {
            const email = document.getElementById("email");
            clearError(email);

            if (!isValidEmail(email.value)) {
                show_error(email, "ایمیل وارد شده معتبر نیست");
                e.preventDefault();
            }
        });
    } else if (document.getElementById('login_form')) {
        document.querySelector("#login_form").addEventListener("submit", function (e) {
            let isValid = true;

            const email = document.getElementById("email");
            const password = document.getElementById("password");

            clearError(email);
            clearError(password);

            if (!isValidEmail(email.value)) {
                show_error(email, "ایمیل معتبر وارد کنید");
                isValid = false;
            }

            if (password.value.length < 8) {
                show_error(password, "رمز عبور حداقل ۸ کاراکتر است");
                isValid = false;
            }

            if (!isValid) e.preventDefault();
        });
    } else if (document.getElementById('register_form')) {
        document.getElementById("register_form").addEventListener("submit", function (e) {
            let isValid = true;

            const fullname = document.getElementById("fullname");
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const password2 = document.getElementById("password2");

            [fullname, email, password, password2].forEach(clearError);

            if (fullname.value.trim().length < 3) {
                show_error(fullname, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد");
                isValid = false;
            }

            if (!isValidEmail(email.value)) {
                show_error(email, "ایمیل وارد شده معتبر نیست");
                isValid = false;
            }

            if (password.value.length < 8) {
                show_error(password, "رمز عبور باید حداقل ۸ کاراکتر باشد");
                isValid = false;
            }

            if (password.value !== password2.value) {
                show_error(password2, "رمز عبور و تکرار آن یکسان نیست");
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }
});

function clearError(input) {
    const errorDiv = document.getElementById(input.id + "_error");
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

function validateField(input) {
    switch (input.id) {
        case 'name':
            if (!input.value.trim()) {
                show_error(input, 'لطفا نام خود را وارد کنید');
            } else if (input.value.trim().length < 2) {
                show_error(input, 'نام باید حداقل 2 کاراکتر باشد');
            } else {
                clearError(input);
            }
            break;

        case 'email':
            if (!input.value.trim()) {
                show_error(input, 'لطفا ایمیل خود را وارد کنید');
            } else if (!isValidEmail(input.value.trim())) {
                show_error(input, 'لطفا یک ایمیل معتبر وارد کنید');
            } else {
                clearError(input);
            }
            break;

        case 'message':
            if (!input.value.trim()) {
                show_error(input, 'لطفا پیام خود را وارد کنید');
            } else if (input.value.trim().length < 10) {
                show_error(input, 'پیام باید حداقل 10 کاراکتر باشد');
            } else {
                clearError(input);
            }
            break;
    }
}

function show_error(input, message) {
    const errorDiv = document.getElementById(input.id + "_error");
    input.classList.add("invalid");
    if (errorDiv) {
        errorDiv.textContent = message;
    }
}

function go_to_next_input() {

    const otp = document.querySelector("input[name='otp1']");
    otp.onkeyup = function () {
        document.querySelector(`input[name='otp${otp.name.split("otp")[1] + 1}']`).focus();
    }
}

if (document.querySelector("input[name='otp1']")) {
    let otp = document.querySelector("input[name='otp6']");
    console.log(otp.name.split("otp"));
    otp.onkeyup = function focus_on_next () {
        otp = document.querySelector(`input[name='otp${parseInt(otp.name.split("otp")[1]) - 1}']`);
        if (!otp) {
            document.getElementById("otp_button").click();
        }
        otp.onkeyup = focus_on_next;
        otp.focus();
    }
}