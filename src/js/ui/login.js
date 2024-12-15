import { login } from "../api/login.js";

export async function onLogin(event) {
  event.preventDefault();
  const loginForm = event.target;
  const formData = new FormData(loginForm);
  const data = Object.fromEntries(formData.entries());

  try {
    await login(data);
    alert("You are now logged in");
    window.location.href = "/";
  } catch (error) {
    alert(error);
  }
}
