import testApiCaller from "./testApiCaller";

export default async (email: string, password: string) => {
  const res = await testApiCaller("post", "/login", { email, password });
  return `${res.data.token}`;
};
