const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const rectangle = document.querySelector('.header__rectangle');
if (burger) {
    burger.addEventListener('click', function () {
        burger.classList.toggle('_active');
        nav.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    })
}



$(document).ready(function(){
    $('.slider').slick({
        slidesToShow: 2,
        responsive: [
            {
                breakpoint: 1221,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    });
});



function scrollTo(element) {
    window.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: 'smooth'
    })
}

const btnServices = document.querySelector('.goto-services');
const services = document.querySelector('#services');

btnServices.addEventListener('click', () => {
    scrollTo(services);
    burger.classList.remove('_active');
    nav.classList.remove('_active');
    document.body.classList.remove('_lock');
})

const btnPortfolio = document.querySelector('.goto-portfolio');
const portfolio = document.querySelector('#portfolio');

btnPortfolio.addEventListener('click', () => {
    scrollTo(portfolio);
    burger.classList.remove('_active');
    nav.classList.remove('_active');
    document.body.classList.remove('_lock');
})

const btnWork = document.querySelector('.goto-work');
const work = document.querySelector('#work');

btnWork.addEventListener('click', () => {
    scrollTo(work);
    burger.classList.remove('_active');
    nav.classList.remove('_active');
    document.body.classList.remove('_lock');
})

const btnContacts = document.querySelector('.goto-contacts');
const contacts = document.querySelector('#contacts');

btnContacts.addEventListener('click', () => {
    scrollTo(contacts);
    burger.classList.remove('_active');
    nav.classList.remove('_active');
    document.body.classList.remove('_lock');
})

const btnConnect = document.querySelector('.goto-connect');

btnConnect.addEventListener('click', () => {
    scrollTo(contacts);
    burger.classList.remove('_active');
    nav.classList.remove('_active');
    document.body.classList.remove('_lock');
})

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if(error === 0) {
            form.classList.add('_sending');
            let response = await fetch('../../PHPMailer-6.6.4/sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert("error");
                form.classList.remove('_sending');
            }
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
    
        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_phone')) {
                if (phoneTest(input)) {
                    formAddError(input);
                    error++;
                }else{
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }

            if (input.classList.contains('_name')) {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    function phoneTest(input) {
        return /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(input.value);
    }
});