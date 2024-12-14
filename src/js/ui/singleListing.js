import { fetchSingleListing } from "../api/singleListing.js";
import { makeBid } from "../api/makeBid.js";

// Initialize Countdown Logic
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
  
      countdownElement.textContent = `Tid igjen: ${
        days > 0 ? days + "d " : ""
      }${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
  
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
  }
  
  function initializeCarousel(totalImages) {
    const carouselImages = document.getElementById("carousel-images");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
  
    let currentIndex = 0;
    let autoSlideInterval;
  
    const updateCarousel = () => {
      const offset = currentIndex * -100;
      carouselImages.style.transform = `translateX(${offset}%)`;
    };
  
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
      }, 3000); // Slide every 3 seconds
    };
  
    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };
  
    // Event listeners for manual navigation
    prevButton.addEventListener("click", () => {
      stopAutoSlide();
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      updateCarousel();
      startAutoSlide();
    });
  
    nextButton.addEventListener("click", () => {
      stopAutoSlide();
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
      startAutoSlide();
    });
  
    // Start the automatic slide
    startAutoSlide();
    updateCarousel();
  }
  
  // Display Single Listing Logic
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
  
      if (!listing) {
        listingContainer.innerHTML = `<p>Annonse ble ikke funnet.</p>`;
        return;
      }
  
      const endsAt = listing.endsAt
        ? new Date(listing.endsAt).toLocaleString()
        : "No end date provided";
  
      // Calculate total bid amount if bid details are included
      const totalBidAmount = listing.bids?.length
        ? listing.bids.reduce((sum, bid) => sum + (bid.amount || 0), 0)
        : 0;

        const sellerName = listing.seller?.name || "Ukjent selger";
  
        let mediaContent = "";
        if (listing.media && listing.media.length > 0) {
          if (listing.media.length === 1) {
            mediaContent = `
              <div class="w-full aspect-w-16 aspect-h-9">
                <img 
                  src="${listing.media[0].url}" 
                  alt="${listing.media[0].alt || ""}" 
                  class="w-full h-full max-h-[500px] object-cover rounded-lg"
                >
              </div>`;
          } else {
            mediaContent = `
              <div class="carousel relative w-full overflow-hidden">
                <div id="carousel-images" class="flex transition-transform duration-500 ease-in-out">
                  ${listing.media
                    .map(
                      (image) => `
                      <div class="w-full aspect-w-16 aspect-h-9 flex-shrink-0">
                        <img 
                          src="${image.url}" 
                          alt="${image.alt || "Listing Image"}" 
                          class="w-full h-full object-cover rounded-lg"
                        >
                      </div>`
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
          mediaContent = `<p>Ingen bilder.</p>`;
        }
  
      const countdownHTML = listing.endsAt
        ? `<p id="countdown" class="text-lg font-bold text-red-500"></p>`
        : `<p class="text-gray-500">Ingen sluttid lagt inn.</p>`;
  
      const bidFormHTML = `
        <div class="bid-form-container mt-6">
          <p class="mb-2"><strong>Høyeste bud:</strong> ${totalBidAmount} NOK</p>
          <form id="bid-form" class="flex flex-col gap-4">
            <input 
              type="number" 
              id="bid-amount" 
              placeholder="Legg inn bud (NOK)" 
              class="w-full border border-secondary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" 
              required
            />
            <button 
              type="submit" 
              class="bg-secondary text-white font-medium px-4 py-2 rounded w-[100px]">
              Gi bud
            </button>
          </form>
          <p id="bid-message" class="mt-4 hidden"></p>
        </div>
      `;
  
      listingContainer.innerHTML = `
      <div class="listing bg-white shadow-md rounded-lg p-4">
        <h1 class="text-2xl font-medium mb-4">${listing.title || ""}</h1>
        ${mediaContent}
        <div class="flex justify-end mt-4">
          <p class="text-gray-700 text-sm"><strong>Opprettet av:</strong> ${sellerName}</p>
        </div>
        <p class="text-gray-700 mt-4 mb-4"><strong>Beskrivelse:</strong> ${
          listing.description || ""
        }</p>
        <p class="text-gray-700 mb-4"><strong>Opprettet:</strong> ${new Date(
          listing.created
        ).toLocaleString("no-NO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
        <p class="text-gray-700 mb-4"><strong>Oppdatert:</strong> ${new Date(
          listing.updated
        ).toLocaleString("no-NO", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
        <p class="text-gray-700 mb-4"><strong>Slutter:</strong> ${endsAt}</p>
        ${countdownHTML}
        ${bidFormHTML}
      </div>
    `;
  
      // Initialize carousel and countdown
      if (listing.media && listing.media.length > 1) {
        initializeCarousel(listing.media.length);
      }
  
      if (listing.endsAt) {
        initializeCountdown(new Date(listing.endsAt));
      }
  
      // Handle bid form submission
      const bidForm = document.getElementById("bid-form");
      const bidAmountInput = document.getElementById("bid-amount");
      const bidMessage = document.getElementById("bid-message");
  
      bidForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const bidAmount = parseFloat(bidAmountInput.value);
        const token = localStorage.getItem("token");
  
        if (!token) {
          bidMessage.textContent = "Du må logge inn for å by";
          bidMessage.classList.remove("hidden");
          bidMessage.classList.add("text-red-600");
  
          const redirectToLogin = confirm(
            "Du må logge inn for å by. Vil du bli omdirigert til innlogging?"
          );
  
          if (redirectToLogin) {
            window.location.href = "/auth/login/";
          }
          return;
        }
  
        if (bidAmount <= totalBidAmount) {
          bidMessage.textContent = "Ditt bud er for lavt";
          bidMessage.classList.remove("hidden");
          bidMessage.classList.add("text-red-600");
          return;
        }
  
        try {
          const result = await makeBid(listingId, bidAmount, token);
          console.log("Bid successful:", result);
  
          bidMessage.textContent = "Ditt bud er plassert!";
          bidMessage.classList.remove("hidden");
          bidMessage.classList.add("text-green-500");

          setTimeout(function(){
            window.location.reload(1);
         }, 5000);
  
          bidAmountInput.value = "";
        } catch (error) {
          console.error("Error placing bid:", error);
  
          bidMessage.textContent = "Kunne ikke plassere bud. Prøv igjen.";
          bidMessage.classList.remove("hidden");
          bidMessage.classList.add("text-red-600");
        }
      });
    } catch (error) {
      console.error("Error displaying listing details:", error);
      listingContainer.innerHTML = `<p>Fikk ikke lastet inn annonse detaljer.</p>`;
    }
  }