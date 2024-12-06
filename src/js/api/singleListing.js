import { API_AUCTION_SINGLE_LISTING } from "./constants.js";

export async function fetchSingleListing(listingId) {
  try {
    
    const url = API_AUCTION_SINGLE_LISTING.replace("<id>", listingId);
    //console.log("API URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch listing: ${response.statusText}`);
    }

    const data = await response.json();
    //console.log("Fetched Listing Data:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchSingleListing:", error);
    throw error;
  }
}