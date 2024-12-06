export function authorize() {
    if (!localStorage.token) {
      alert("Du må være innlogget for å se denne siden");
      window.location.href = "/auth/login/";
    }
  }