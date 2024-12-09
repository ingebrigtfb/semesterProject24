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
    alert("Profile updated successfully!");
    window.location.href = "/profile/";
    console.log("Updated Profile:", updatedProfile);
  } catch (error) {
    alert(`Error updating profile: ${error.message}`);
  }
}