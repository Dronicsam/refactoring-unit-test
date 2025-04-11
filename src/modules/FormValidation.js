class FormValidation {
  validateText = (data) => {
    const textRegex = /^[A-Za-z\s'-]+$/;
    if (textRegex.test(data)) return 'OK';
    return false;
  };

  validateDate = (data) => {
    const dateRegex = /^\d{1,4}-\d{1,2}-\d{1,2}$/;

    if (dateRegex.test(data)) return 'OK';
    return false;
  };
}

export default FormValidation;
