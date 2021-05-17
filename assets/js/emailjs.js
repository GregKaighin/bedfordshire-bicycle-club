function sendMail(contactForm) {
    emailjs.send("default_service", "gkpianolessons", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "phone": contactForm.phone.value,
        "message": contactForm.message.value
    })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                // Opens the modal on submission of all completed form fields
                $('#thank-you-modal').modal('show');
                // Resets form fields on submission
                $('#form-reset')[0].reset();
            },
            function (error) {
                console.log("FAILED", error);
            }
        );
    return false; // Stops the page from refreshing
}