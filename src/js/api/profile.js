import { API_BASE } from "./constants.js";
import { headers } from "./headers.js";

export async function fetchProfile(username) {
  const authToken = localStorage.getItem("token");
  
  
  if (!authToken) {
    throw new Error("No auth token found. Please log in.");
  }

  const url = `${API_BASE}/auction/profiles/${username}`;
  console.log("Fetching Profile with URL:", url);

  try {
    
    const response = await fetch(url, {
      headers: headers(authToken), 
    });

    console.log("Response Status:", response.status, response.statusText);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Server Response:", response.status, response.statusText, errorDetails);
      throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText} - ${errorDetails || "No details"}`);
    }

   
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error in fetchProfile:", error);
    throw error;
  }
}