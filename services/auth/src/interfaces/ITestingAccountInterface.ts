export default interface ITestingAccountInterface {
  username: string;
  password: string;
  confirmPassword?: string;
  email?: string;
  realm?: string;
  region?: string;
  class?: string;
}
