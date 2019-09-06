export default interface IConfigInterface {
  gateway: {
    server: {
      port: Number;
    };
    environment: String;
  };
  auth: {
    server: {
      port: Number;
    };
    environment: String;
  };
  guild: {
    server: {
      port: Number;
    };
    environment: String;
  };
}
