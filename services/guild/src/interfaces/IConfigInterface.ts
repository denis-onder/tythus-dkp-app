export default interface IConfigInterface {
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
