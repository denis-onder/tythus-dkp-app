import apiCaller from "./apiCaller";

export default async (email: string, password: string) => {
  const res = await apiCaller("post", "/login", { email, password });
  return `${res.data.token}`;
};
