import IValidationErrorsInterface from "../interfaces/IValidationErrorsInterface";
import IValdationTestingInterface from "../interfaces/IValdationTestingInterface";

class Validator {
  private errors: IValidationErrorsInterface;
  private emailRegexPattern: RegExp;
  constructor() {
    this.errors = {};
    this.emailRegexPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  }
  /**
   * Validate registration input
   */
  public register(data: IValdationTestingInterface) {
    this.resetErrors();
    if (data.username === "" || data.username === " ") {
      this.errors.usernameEmpty = "An username is required.";
    }
    if (data.username.length < 6) {
      this.errors.usernameLength =
        "Your username is supposed to be longer than 6 characters.";
    }
    if (data.password === "" || data.password === " ") {
      this.errors.passwordEmpty = "A password is required.";
    }
    if (data.password.length < 8) {
      this.errors.passwordLength =
        "Your password is supposed to be longer than 8 characters.";
    }
    if (data.password !== data.confirmPassword) {
      this.errors.passwordsNotMatching = "Your passwords are not matching.";
    }
    if (data.email === "" || data.email === " ") {
      this.errors.emailEmpty = "An email address is required.";
    }
    if (!this.emailRegexPattern.test(data.email)) {
      this.errors.emailInvalid = "Your email address is not valid.";
    }
    return this.checkForErrors();
  }
  /**
   * Validate login input
   */
  public login(data: IValdationTestingInterface) {
    this.resetErrors();
    if (data.username === "" || data.username === " ") {
      this.errors.usernameEmpty = "An username is required.";
    }
    if (data.password === "" || data.password === " ") {
      this.errors.passwordEmpty = "A password is required.";
    }
    return this.checkForErrors();
  }
  private checkForErrors() {
    if (Object.keys(this.errors).length > 0) {
      return this.errors;
    } else {
      return false;
    }
  }
  private resetErrors() {
    this.errors = {};
  }
}

export default new Validator();
