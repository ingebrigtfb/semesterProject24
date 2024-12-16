import { fetchAllListings } from "../api/allListings.js";
import { searchListings } from "../api/searchListing.js";

export async function displayAllListings() {
  const postsContainer = document.getElementById("posts-container");
  const searchBar = document.getElementById("search-bar");

  if (!postsContainer || !searchBar) {
    console.error("Error: Required DOM elements not found.");
    return;
  }

  async function fetchAndRenderListings(query = "") {
    //console.log("Search query:", query);
    postsContainer.innerHTML = `<div class="flex justify-center">Laster innhold<p class="loader border-t-4 border-secondary border-solid rounded-full w-8 h-8 animate-spin"></p></div>`;
    try {
      const response = query
        ? await searchListings(query)
        : await fetchAllListings();
      //console.log("API Response:", response);

      const listings = response.data;

      if (!listings || listings.length === 0) {
        postsContainer.innerHTML = `<p>No listings found for "${query}".</p>`;
        return;
      }

      // Filter listings based on the query
      const filteredListings = query
        ? listings.filter((listing) =>
            listing.title.toLowerCase().includes(query.toLowerCase()),
          )
        : listings;

      if (filteredListings.length === 0) {
        postsContainer.innerHTML = `<p>Ingen søk på "${query}".</p>`;
        return;
      }

      // Sort listings by updated timestamp (desc)
      const sortedListings = filteredListings.sort((a, b) => {
        const updatedA = new Date(a.updated).getTime();
        const updatedB = new Date(b.updated).getTime();
        return updatedB - updatedA;
      });

      postsContainer.className =
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6 max-w-[1400px] m-auto";
      postsContainer.innerHTML = "";

      sortedListings.forEach((listing) => {
        const highestBidAmount = listing.bids?.length
          ? Math.max(...listing.bids.map((bid) => bid.amount))
          : 0;

        const mediaContent =
          listing.media && listing.media.length > 0
            ? `<img src="${listing.media[0].url}" alt="${
                listing.media[0].alt || "Listing Image"
              }" class="w-full h-64 object-cover rounded-t-lg">`
            : `<div class="w-full h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">Ingen bilde</div>`;

        const postElement = document.createElement("a");
        postElement.href = `/annonse/?id=${listing.id}`;
        postElement.className =
          "bg-containers shadow-md rounded-lg flex flex-col min-w-[300px] hover:shadow-lg transition-shadow duration-300";

        postElement.innerHTML = `
            <div class="relative">
              ${mediaContent}
            </div>
            <div class="p-4 flex flex-col justify-between flex-grow">
              <h2 class="text-lg font-bold mb-2 line-clamp-3">${
                listing.title
              }</h2>
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">${
                listing.description || ""
              }</p>
              <div class="flex items-center justify-between">
                <button class="bg-secondary text-white text-sm font-medium px-4 py-2 rounded hover:bg-grey-700">
                  GI BUD
                </button>
                <p class="text-sm font-medium text-secondary">Høyeste bud: ${highestBidAmount} NOK</p>
              </div>
            </div>
          `;

        postsContainer.appendChild(postElement);
      });
    } catch (error) {
      console.error("Error displaying listings:", error);
      postsContainer.innerHTML = `<p>Failed to load listings. Please try again later.</p>`;
    }
  }

  await fetchAndRenderListings();

  // Add event listener for search functionality
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    fetchAndRenderListings(query);
  });
}
