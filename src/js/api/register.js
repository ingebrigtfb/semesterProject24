import { API_AUTH_REGISTER } from "./constants";

export async function register({ name, email, password, bio, banner, avatar }) {
  const response = await fetch(API_AUTH_REGISTER, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      bio,
      banner,
      avatar,
    }),
  });

  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  throw new Error("Register failed");
}
