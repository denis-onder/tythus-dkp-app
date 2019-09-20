export default interface IValidationErrorsInterface {
  usernameEmpty?: string;
  usernameLength?: string;
  passwordEmpty?: string;
  passwordLength?: string;
  passwordsNotMatching?: string;
  emailEmpty?: string;
  emailInvalid?: string;
  classEmpty?: string;
  classInvalid?: string;
  realmEmpty?: string;
  regionEmpty?: string;
  regionInvalid?: string;
  factionEmpty?: string;
  factionInvalid?: string;
}
