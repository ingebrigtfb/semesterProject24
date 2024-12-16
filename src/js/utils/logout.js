export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  alert("Du ble logget ut");
  window.location.href = "/auth/login/";
}
