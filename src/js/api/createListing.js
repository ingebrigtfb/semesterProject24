import { API_AUCTION_LISTINGS } from "./constants.js";
import { headers } from "./headers.js";

export async function createListing(listingData) {
  const authToken = localStorage.getItem("token");

  if (!authToken) {
    throw new Error("No auth token found. Please log in.");
  }

  try {
    const response = await fetch(API_AUCTION_LISTINGS, {
      method: "POST",
      headers: headers(authToken),
      body: JSON.stringify(listingData),
    });

    console.log("Create Listing Response:", response);

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error Details:", errorDetails);
      throw new Error(
        `Failed to create listing: ${errorDetails.message || "Unknown error"}`,
      );
    }

    const data = await response.json();
    console.log("Parsed Response Data:", data);

    return data;
  } catch (error) {
    console.error("Error in createListing:", error);
    throw error;
  }
}
