export const addEventListenToForms = () => {
  let forms = document.getElementsByClassName('needs-validation')

  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener(
      'submit',
      function(event) {
        if (form.checkValidity() === false) {
          console.log('invalid form input')
          event.preventDefault()
          // event.stopPropagation()
        }

        form.classList.add('was-validated')
      },
      false
    )
  })
}

export const regEx = {
  email: '^[A-Za-z0-9.-_]+@[A-Za-z0-9]+.[A-Za-z0-9]+$',
  phone: '^[0-9]{10}$',
  zip: '^[0-9]{5}$'
}
