import { API_BASE } from "./constants.js";
import { headers } from "./headers.js";

export async function deleteListing(listingId) {
  const authToken = localStorage.getItem("token");
  if (!authToken) {
    throw new Error("No auth token found. Please log in.");
  }

  const url = `${API_BASE}/auction/listings/${listingId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers(authToken),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Server Response:", errorDetails);
      throw new Error(
        `Failed to delete listing: ${errorDetails.message || "Unknown error"}`,
      );
    }

    console.log(`Listing ${listingId} deleted successfully.`);
    return true;
  } catch (error) {
    console.error("Error in deleteListing:", error);
    throw error;
  }
}
