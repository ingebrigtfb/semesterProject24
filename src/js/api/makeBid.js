import { API_AUCTION_LISTINGS } from "./constants.js";
import { headers } from "./headers.js";

export async function makeBid(listingId, amount) {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No auth token found. Please log in.");
    }
  try {
    const url = `${API_AUCTION_LISTINGS}/${listingId}/bids`;

    const response = await fetch(url, {
      method: "POST",
      headers: headers(token),
      body: JSON.stringify({ amount }),
    });

    console.log("API Response:", response);

    if (!response.ok) {
      throw new Error(`Failed to make bid: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in makeBid:", error);
    throw error;
  }
}