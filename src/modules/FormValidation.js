class FormValidation {
  validateName = (data) => {
    const nameRegex = /^[A-Za-z\s'-]+$/;
    if (nameRegex.test(data)) return true;
    return false;
  };

  validateDate = (data) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(data)) return true;
    return false;
  };
}

export default FormValidation;
