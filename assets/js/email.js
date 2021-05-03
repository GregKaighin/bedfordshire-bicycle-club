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
                // Open the modal on submission of all completed form fields
                $('#thank-you-modal').modal('show');
                // Reset form fields on submission
                $('#form-reset')[0].reset();
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    // Stop the page from refreshing
    return false;
}