import { fetchSingleListing } from "../api/singleListing.js";

export async function displaySingleListing() {

  //Checking if the listing-container element exists
  const listingContainer = document.getElementById("listing-container");
  if (!listingContainer) {
    console.error("Error: Listing container not found.");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");
  //console.log("Listing ID:", listingId);


  try {
    const response = await fetchSingleListing(listingId);
    const listing = response.data;
    //console.log("Fetched Listing Data:", listing);

    // Render listing details
    const mediaContent =
      listing.media && listing.media.length > 0
        ? `<img src="${listing.media[0].url}" alt="${listing.media[0].alt || "Listing Image"}" class="w-full h-auto mb-4 rounded-lg">`
        : `<p>No media available</p>`;
    listingContainer.innerHTML = `
      <div class="listing bg-white shadow-md rounded-lg p-4">
        <h1 class="text-2xl font-bold mb-4">${listing.title || "No Title"}</h1>
        ${mediaContent}
        <p class="text-gray-700 mb-2"><strong>Description:</strong> ${
          listing.description || "No description available"
        }</p>
        <p class="text-gray-700"><strong>Updated:</strong> ${new Date(
          listing.updated || ""
        ).toLocaleString()}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error displaying listing details:", error);
    listingContainer.innerHTML = `<p>Failed to load listing details. Please try again later.</p>`;
  }
}