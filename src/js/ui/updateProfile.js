import { updateProfile } from "../api/updateProfile.js";

export async function onUpdateProfile(event) {
  event.preventDefault();

  const updateForm = event.target;
  const formData = new FormData(updateForm);

  const profileData = {};
  if (formData.get("bio")) profileData.bio = formData.get("bio");

  if (formData.get("avatar")) {
    profileData.avatar = {
      url: formData.get("avatar"),
      alt: formData.get("avatar-alt") || "Avatar image",
    };
  }

  if (formData.get("banner")) {
    profileData.banner = {
      url: formData.get("banner"),
      alt: formData.get("banner-alt") || "Banner image",
    };
  }

  const username = localStorage.getItem("userName");
  if (!username) {
    alert("No username found. Please log in.");
    return;
  }

  try {
    const updatedProfile = await updateProfile(username, profileData);
    alert("Profilen ble oppdatert!");
    window.location.href = "/profil/";
    console.log("Updated Profile:", updatedProfile);
  } catch (error) {
    alert(`Gikk ikke å oppdatere profil: ${error.message}`);
  }
}

//charater count

export function updateCharCount() {
  const bioField = document.getElementById("bio");
  const charCount = document.getElementById("bio-char-count");
  const remaining = 160 - bioField.value.length;
  charCount.textContent = `${remaining} tegn igjen`;
}

// Attach to window for global access
window.updateCharCount = updateCharCount;
