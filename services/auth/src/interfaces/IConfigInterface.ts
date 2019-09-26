export default interface IConfigInterface {
  gateway: {
    port: number;
  };
  server: {
    port: number;
  };
  database: {
    uri?: string;
    port: number;
    name: string;
  };
  environment: string;
  secretOrKey?: string;
}
