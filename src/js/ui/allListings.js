import { fetchAllListings } from "../api/allListings.js";

export async function displayAllListings() {
  const postsContainer = document.getElementById("posts-container");
  if (!postsContainer) {
    console.error("Error: posts-container element not found.");
    return;
  }

  try {
    const response = await fetchAllListings();

    const listings = response.data;

    if (!listings || listings.length === 0) {
      postsContainer.innerHTML = `<p>No listings available at the moment.</p>`;
      return;
    }

    postsContainer.className = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6 max-w-[1400px] m-auto";

    listings.forEach((listing) => {
      const totalBidAmount = listing.bids
        ? listing.bids.reduce((sum, bid) => sum + (bid.amount || 0), 0)
        : 0;

      const mediaContent =
        listing.media && listing.media.length > 0
          ? `<img src="${listing.media[0].url}" alt="${listing.media[0].alt || "Listing Image"}" class="w-full h-64 object-cover rounded-t-lg">`
          : `<div class="w-full h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">No Image</div>`;

      const postElement = document.createElement("a");
      postElement.href = `/annonse/?id=${listing.id}`;
      postElement.className = "bg-white shadow-md rounded-lg flex flex-col hover:shadow-lg transition-shadow duration-300";

      postElement.innerHTML = `
        <div class="relative">
          ${mediaContent}
        </div>
        <div class="p-4 flex flex-col justify-between flex-grow">
          <h2 class="text-lg font-bold mb-2 line-clamp-3">${listing.title}</h2>
          <p class="text-sm text-gray-600 mb-4 line-clamp-3">${listing.description || "No description available"}</p>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-600">
              GI BUD
            </button>
            <p class="text-sm font-medium text-gray-700">Total Bud: ${totalBidAmount} NOK</p>
          </div>
        </div>
      `;

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error displaying posts:", error);
    postsContainer.innerHTML = `<p>Failed to load listings. Please try again later.</p>`;
  }
}