export default interface IConfigInterface {
  server: {
    port: number;
  };
  auth: {
    port: number;
  };
  guild: {
    port: number;
  };
  database: {
    port: number;
  };
  environment: string;
}
