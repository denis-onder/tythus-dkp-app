export default interface IValidationErrorsInterface {
  usernameEmpty?: string;
  usernameLength?: string;
  passwordEmpty?: string;
  passwordLength?: string;
  passwordsNotMatching?: string;
  emailEmpty?: string;
  emailInvalid?: string;
}
