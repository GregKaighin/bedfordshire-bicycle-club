function sendMail(contactForm) {
    emailjs.send('default_service', 'bedsbikeclub', {
            'from_name': contactForm.name.value,
            'from_email': contactForm.email.value,
            'phone': contactForm.phone.value,
            'message': contactForm.message.value
        })
        .then(
            function (response) {
                console.log('Success', response);
            },
            function (error) {
                console.log('Failed', error);
            }
        )
    return false;
}