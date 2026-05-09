import { API_URL } from "./config";

export async function signup(
  email: string,
  password: string
) {
  const response = await fetch(
    `${API_URL}/api/auth/signup`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return response.json();
}

export async function login(
  email: string,
  password: string
) {
  const response = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return response.json();
}