
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName"); 
    alert("You have been logged out.");
    window.location.href = "/auth/login/"; 
  }