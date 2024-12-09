import { API_BASE } from "./constants.js";
import { headers } from "./headers.js";


export async function updateProfile(username, profileData) {
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    throw new Error("No auth token found. Please log in.");
  }

  const url = `${API_BASE}/auction/profiles/${username}`;
  console.log("Request URL:", url);
  console.log("Request Body:", profileData);

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers(authToken),
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Server Response:", errorDetails);
      throw new Error(`Profile update failed: ${errorDetails.message || "Unknown error"}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in updateProfile:", error);
    throw error;
  }
}