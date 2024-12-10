import { fetchSingleListing } from "../api/singleListing.js";

export async function displaySingleListing() {
  const listingContainer = document.getElementById("listing-container");
  if (!listingContainer) {
    console.error("Error: Listing container not found.");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");
  console.log("Listing ID:", listingId);

  try {
    const response = await fetchSingleListing(listingId);
    const listing = response.data;
    console.log("Fetched Listing Data:", listing);
    console.log("Media Array:", listing.media);

    let mediaContent = "";
    if (listing.media && listing.media.length > 0) {
      if (listing.media.length === 1) {
        // Single image, no carousel
        mediaContent = `
          <img 
            src="${listing.media[0].url}" 
            alt="${listing.media[0].alt || "Listing Image"}" 
            class="w-full h-auto rounded-lg"
          >`;
      } else {
        // Multiple images, create carousel
        mediaContent = `
          <div class="carousel relative w-full h-auto overflow-hidden">
            <div id="carousel-images" class="flex transition-transform duration-500 ease-in-out">
              ${listing.media
                .map(
                  (image) => `
                <img 
                  src="${image.url}" 
                  alt="${image.alt || "Listing Image"}" 
                  class="w-full h-auto flex-shrink-0 rounded-lg"
                >
              `
                )
                .join("")}
            </div>
            <button 
              id="prev-button" 
              class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center z-20">
              &lt;
            </button>
            <button 
              id="next-button" 
              class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center z-20">
              &gt;
            </button>
          </div>`;
      }
    } else {
      //console.log("No media available");
      mediaContent = `<p></p>`;
    }

    // Display listing details

    listingContainer.innerHTML = `
      <div class="listing bg-white shadow-md rounded-lg p-4">
        <h1 class="text-2xl font-bold mb-4">${listing.title || "No Title"}</h1>
        ${mediaContent}
        <p class="text-gray-700 mb-2"><strong>Description:</strong> ${
          listing.description || ""
        }</p>
        <p class="text-gray-700"><strong>Updated:</strong> ${new Date(
          listing.updated || ""
        ).toLocaleString()}</p>
      </div>
    `;

    if (listing.media && listing.media.length > 1) {
      initializeCarousel(listing.media.length);
    }
  } catch (error) {
    console.error("Error displaying listing details:", error);
    listingContainer.innerHTML = `<p>Failed to load listing details. Please try again later.</p>`;
  }
}

// carousel logic

function initializeCarousel(totalImages) {
  const carouselImages = document.getElementById("carousel-images");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  let currentIndex = 0;

  console.log("Total Images in Carousel:", totalImages);

  const updateCarousel = () => {
    const offset = currentIndex * -100; 
    carouselImages.style.transform = `translateX(${offset}%)`;
    console.log("Current Index:", currentIndex);
  };

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
  });

  
  updateCarousel();
}