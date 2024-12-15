import { onUpdateProfile, updateCharCount } from "../../ui/updateProfile.js";

document
  .getElementById("update-profile-form")
  .addEventListener("submit", onUpdateProfile);

updateCharCount();
