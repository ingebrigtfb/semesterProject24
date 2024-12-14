import { API_AUCTION_LISTINGS } from "./constants.js";
import { headers } from "./headers.js";

export async function fetchSingleListing(listingId) {
  try {
    
    const url = new URL(`${API_AUCTION_LISTINGS}/${listingId}`);
    url.searchParams.append("_bids", "true"); 
    url.searchParams.append("_seller", "true");

    console.log("Fetching URL:", url.toString()); 

    const response = await fetch(url, { headers: headers() });
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => null);
      console.error("Fetch Error Details:", errorDetails);
      throw new Error("Failed to fetch listing data.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching single listing:", error);
    throw error;
  }
}