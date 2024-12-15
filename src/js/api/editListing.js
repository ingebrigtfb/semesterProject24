import { API_AUCTION_LISTINGS } from "./constants.js";
import { headers } from "./headers.js";

export async function editListing(listingId, updatedData) {
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    throw new Error("No auth token found. Please log in.");
  }

  const url = `${API_AUCTION_LISTINGS}/${listingId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: headers(authToken),
      body: JSON.stringify(updatedData),
    });

    console.log("Edit Listing Response:", response);

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error Details:", errorDetails);
      throw new Error(
        `Failed to edit listing: ${errorDetails.message || "Unknown error"}`,
      );
    }

    const data = await response.json();
    console.log("Edited Listing Data:", data);
    return data;
  } catch (error) {
    console.error("Error in editListing:", error);
    throw error;
  }
}
