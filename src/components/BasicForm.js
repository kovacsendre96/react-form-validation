import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameValueChangeHandler,
    inputBlurHandler: NameBlurHandler,
    reset: NameInputReset,
  } = useInput((value) => value.trim() !== "" && value.length > 3);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameValueChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameInputReset,
  } = useInput((value) => value.trim() !== "" && value.length > 3);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailValueChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.includes("@") && value.includes(".com"));

  useEffect(() => {
    if (nameIsValid && lastNameIsValid && emailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [nameIsValid, lastNameIsValid, emailIsValid]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!nameIsValid || !lastNameIsValid || !emailIsValid) {
      return;
    }

    NameInputReset();
    lastNameInputReset();
    emailInputReset();
  };

  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";

  const lastNameInputClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            value={nameValue}
            onChange={nameValueChangeHandler}
            onBlur={NameBlurHandler}
            type="text"
            id="name"
          />
          {nameHasError && <p className="error-text">Name field is required</p>}
        </div>

        <div className={lastNameInputClasses}>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={lastNameValue}
            onChange={lastNameValueChangeHandler}
            onBlur={lastNameBlurHandler}
            type="text"
            id="lastName"
          />
          {lastNameHasError && (
            <p className="error-text">Last name field is required</p>
          )}
        </div>
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          value={emailValue}
          onChange={emailValueChangeHandler}
          onBlur={emailBlurHandler}
          type="text"
          id="name"
        />
        {emailHasError && <p className="error-text">Email field is required</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
