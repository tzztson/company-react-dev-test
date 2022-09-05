import { useState } from 'react';

function validate(validations, values) {
  const errors = validations
    .map((validation) => validation(values))
    .filter((validation) => typeof validation === 'object');
 
  return {
    isValid: errors.length === 0,
    errors: errors.reduce((errors, error) => ({ ...errors, ...error }), {}),
  };
}

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export function useForm(initialState = {}, validations = []) {
  // Add the 'onSubmit' argument
  const { isValid: initialIsValid, errors: initialErrors } = validate(validations, initialState);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setValid] = useState(initialIsValid);
  const [touched, setTouched] = useState({});
  const changeHandler = (event) => {
    const newValues = { ...values, [event.target.id]: event.target.value };
    const { isValid, errors } = validate(validations, newValues);
    setValues(newValues);
    setValid(isValid);
    setErrors(errors);
    setTouched({ ...touched, [event.target.id]: true });
  };
  // Add this
  return { values, changeHandler, isValid, errors, touched }; // Add 'submitHandler'
}

export function isRequired(value, isEmail) {
  if (isEmail) {
    const emailError = isValidEmail(value);
    return value != null && String(value).trim().length > 0 && emailError;
  } else {
    return value != null && String(value).trim().length > 0;
  }
}
