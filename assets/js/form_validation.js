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
                clear_error(name_input);
            }

            if (!email_input.value.trim()) {
                show_error(email_input, 'لطفا ایمیل خود را وارد کنید');
                isValid = false;
            } else if (!isValidEmail(email_input.value.trim())) {
                show_error(email_input, 'لطفا یک ایمیل معتبر وارد کنید');
                isValid = false;
            } else {
                clear_error(email_input);
            }

            if (!subject_input.value.trim()) {
                show_error(subject_input, 'لطفا موضوع خود را وارد کنید');
                isValid = false;
            } else if (!isValidEmail(subject_input.value.trim())) {
                show_error(subject_input, 'لطفا یک موضوع معتبر وارد کنید');
                isValid = false;
            } else {
                clear_error(subject_input);
            }

            if (!message_input.value.trim()) {
                show_error(message_input, 'لطفا پیام خود را وارد کنید');
                isValid = false;
            } else if (message_input.value.trim().length < 10) {
                show_error(message_input, 'پیام باید حداقل 10 کاراکتر باشد');
                isValid = false;
            } else {
                clear_error(message_input);
            }

            if (isValid) {
                alert('پیام شما با موفقیت ارسال شد!');
                document.getElementById('contact_form').reset();

                clear_error(name_input);
                clear_error(email_input);
                clear_error(subject_input);
                clear_error(message_input);
            }
        });

        const inputs = document.getElementById('contact_form').querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                clear_error(this);
            });
        });


    } else if (document.getElementById('forgot_form')) {
        document.getElementById("forgot_form").addEventListener("submit", function (e) {
            const email = document.getElementById("email");
            clear_error(email);

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

            clear_error(email);
            clear_error(password);

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
            const username = document.getElementById("username");
            const email = document.getElementById("email");
            const password = document.getElementById("password");
            const password2 = document.getElementById("password2");

            [fullname, email, password, password2].forEach(clear_error);

            if (fullname.value.trim().length < 3) {
                show_error(fullname, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد");
                isValid = false;
            }

            if (username.value.trim().length < 3) {
                show_error(username, "نام کاربری باید حداقل ۳ کاراکتر باشد");
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
    } else if (document.getElementById('otp_form')) {
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
    } else if (document.getElementById('reset_form')) {
        document.getElementById("reset_form").addEventListener("submit", function (e) {
            let isValid = true;

            const password = document.getElementById("password");
            const password2 = document.getElementById("password2");

            [password, password2].forEach(clear_error);

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

function clear_error(input) {
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
                clear_error(input);
            }
            break;

        case 'email':
            if (!input.value.trim()) {
                show_error(input, 'لطفا ایمیل خود را وارد کنید');
            } else if (!isValidEmail(input.value.trim())) {
                show_error(input, 'لطفا یک ایمیل معتبر وارد کنید');
            } else {
                clear_error(input);
            }
            break;

        case 'message':
            if (!input.value.trim()) {
                show_error(input, 'لطفا پیام خود را وارد کنید');
            } else if (input.value.trim().length < 10) {
                show_error(input, 'پیام باید حداقل 10 کاراکتر باشد');
            } else {
                clear_error(input);
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