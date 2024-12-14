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

    // Check if the listing exists
    if (!listing) {
      listingContainer.innerHTML = `<p>Listing not found. Please check the ID and try again.</p>`;
      return;
    }

    // Format endsAt
    const endsAt = listing.endsAt
      ? new Date(listing.endsAt).toLocaleString()
      : "No end date provided";

    // Handle media content
    let mediaContent = "";
    if (listing.media && listing.media.length > 0) {
      if (listing.media.length === 1) {
        mediaContent = `
          <img 
            src="${listing.media[0].url}" 
            alt="${listing.media[0].alt || "Listing Image"}" 
            class="w-full h-auto rounded-lg"
          >`;
      } else {
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
      mediaContent = `<p>No media available for this listing.</p>`;
    }

    // Add a countdown container if `endsAt` exists
    const countdownHTML = listing.endsAt
      ? `<p id="countdown" class="text-lg font-bold text-red-500"></p>`
      : `<p class="text-gray-500">No end date provided for this listing.</p>`;

    // Render the listing details
    listingContainer.innerHTML = `
      <div class="listing bg-white shadow-md rounded-lg p-4">
        <h1 class="text-2xl font-bold mb-4">${listing.title || ""}</h1>
        ${mediaContent}
        <p class="text-gray-700 mb-2"><strong>Description:</strong> ${
          listing.description || ""
        }</p>
        <p class="text-gray-700"><strong>Created:</strong> ${new Date(
          listing.created
        ).toString()}</p>
        <p class="text-gray-700"><strong>Updated:</strong> ${new Date(
          listing.updated
        ).toString()}</p>
        <p class="text-gray-700"><strong>Ends At:</strong> ${endsAt}</p>
        ${countdownHTML}
      </div>
    `;

    if (listing.media && listing.media.length > 1) {
      initializeCarousel(listing.media.length);
    }

    if (listing.endsAt) {
      initializeCountdown(new Date(listing.endsAt));
    }
  } catch (error) {
    console.error("Error displaying listing details:", error);
    listingContainer.innerHTML = `<p>Prøvde å laste inn, prøv igjen senere.</p>`;
  }
}

// Initialize Carousel Logic
function initializeCarousel(totalImages) {
  const carouselImages = document.getElementById("carousel-images");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  let currentIndex = 0;

  const updateCarousel = () => {
    const offset = currentIndex * -100;
    carouselImages.style.transform = `translateX(${offset}%)`;
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


function initializeCountdown(utcEndTime) {
    const countdownElement = document.getElementById("countdown");
  
    const localEndTime = new Date(utcEndTime);
  
    function updateCountdown() {
      const now = new Date(); 
      const timeRemaining = localEndTime - now; 
  
      if (timeRemaining <= 0) {
        clearInterval(timer);
        countdownElement.textContent = "Auction has ended.";
        countdownElement.classList.add("text-gray-500");
        return;
      }
  
   
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
      const seconds = Math.floor((timeRemaining / 1000) % 60);
  

      countdownElement.textContent = `Time left: ${days > 0 ? days + "d " : ""}${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); 
  }