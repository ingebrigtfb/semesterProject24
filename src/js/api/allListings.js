import { API_AUCTION_LISTINGS } from "./constants.js";

export async function fetchAllListings() {
  try {
    const url = new URL(API_AUCTION_LISTINGS);
    url.searchParams.append("_active", "true");
    url.searchParams.append("_active", "true");
    url.searchParams.append("_seller", "true");
    url.searchParams.append("sort", "created");
    url.searchParams.append("sortOrder", "desc");


    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchAllListings:", error);
    throw error;
  }
}