import { fetchAllListings } from "../api/allListings.js";

export async function displayAllListings() {
  const postsContainer = document.getElementById("posts-container");
  if (!postsContainer) {
    console.error("Error: posts-container element not found.");
    return;
  }

  try {
    const response = await fetchAllListings();
    //console.log(response);

    const listings = response.data;
    //console.log(listings);

    if (!listings || listings.length === 0) {
      postsContainer.innerHTML = `<p>No listings available at the moment.</p>`;
      return;
    }

    postsContainer.innerHTML = "";

    listings.sort((a, b) => new Date(b.updated) - new Date(a.updated));

   
    listings.forEach((listing) => {
      //console.log("listing); 

      const postElement = document.createElement("div");
      postElement.className = "post bg-white shadow-md rounded-lg p-4 mb-4";

      const mediaContent =
        listing.media && listing.media.length > 0
          ? `<img src="${listing.media[0].url}" alt="${listing.media[0].alt}" class="w-[200px] h-auto mb-4 rounded-lg">`
          : "";

          const sellerName = listing.seller ? listing.seller.name : "Unknown";

          postElement.innerHTML = `
            <a href="/annonse/?id=${listing.id}" class="block">
              <h2 class="text-xl font-medium mb-2">${listing.title}</h2>
              <p class="text-gray-700 mb-2">Author: ${sellerName}</p>
              ${mediaContent}
              <p class="text-gray-700">${listing.description || "No description available"}</p>
            </a>
          `;

      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error displaying posts:", error);
    postsContainer.innerHTML = `<p>Failed to load listings. Please try again later.</p>`;
  }
}
