import { register } from '../api/register.js';

export async function onRegister(event) {
    event.preventDefault();
    const registerForm = event.target;
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    try {
        await register(data);
        alert("You are now registered");
        window.location.href = "/auth/login/";
    } catch (error) {
        alert(error);
    }
}