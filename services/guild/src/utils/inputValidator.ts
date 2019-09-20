import IValidationErrorsInterface from "../interfaces/IValidationErrorsInterface";
import IValdationTestingInterface from "../interfaces/IValdationTestingInterface";

class Validator {
  private errors: IValidationErrorsInterface;
  constructor() {
    this.errors = {};
  }
  /**
   * Guild creation validation
   */
  public createGuild(data: IValdationTestingInterface) {
    this.resetErrors();
    if (data.name === "" || data.name === " ") {
      this.errors.nameEmpty = "Please provide your guild name.";
    }
    if (data.name.length <= 2 || data.name.length > 24) {
      this.errors.nameLength =
        "Please provide a guild name which is between 3 and 24 characters long.";
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
