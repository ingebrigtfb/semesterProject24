// searchListings.js
import { API_AUCTION_LISTINGS } from "./constants.js";

export async function searchListings(query) {
  try {
    const url = new URL(API_AUCTION_LISTINGS);
    url.searchParams.append("title", query);
    url.searchParams.append("_active", "true");
    url.searchParams.append("_bids", "true");
    url.searchParams.append("_seller", "true");
    url.searchParams.append("sort", "created");
    url.searchParams.append("sortOrder", "desc");

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch search results: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in searchListings:", error);
    throw error;
  }
}
