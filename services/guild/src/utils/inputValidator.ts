import IValidationErrorsInterface from "../interfaces/IValidationErrorsInterface";
import IValdationTestingInterface from "../interfaces/IValdationTestingInterface";

class Validator {
  private errors: IValidationErrorsInterface;
  constructor() {
    this.errors = {};
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
