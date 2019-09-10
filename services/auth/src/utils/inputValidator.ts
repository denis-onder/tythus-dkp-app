import IValidationErrorsInterface from "../interfaces/IValidationErrorsInterface";

class Validator {
  private errors: IValidationErrorsInterface;
  constructor() {
    this.errors = {};
  }
  /**
   * Validate registration input
   */
  public register() {}
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
