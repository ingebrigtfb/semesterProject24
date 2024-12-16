import { onUpdateProfile, updateCharCount } from "../../ui/updateProfile.js";
import { authorize } from "../../utils/authorize.js";

authorize();

document
  .getElementById("update-profile-form")
  .addEventListener("submit", onUpdateProfile);

updateCharCount();
