function sendMail(contactForm) {
    emailjs.send('default_service', 'bedsbikeclub', {
            'from_name': contactForm.name.value,
            'from_email': contactForm.email.value,
            'phone': contactForm.phone.value,
            'message': contactForm.message.value
        })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                $('#thank-you-modal').modal('show'); // Opens the modal on submission of all completed form fields
                $('#form-reset')[0].reset(); // Resets form fields on submission
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false; // Stops the page from refreshing
}