import { fetchProfile } from "../api/profile.js";
import { deleteListing } from "../api/deleteListing.js";

export async function displayProfile() {
  const profileContainer = document.getElementById("profile-container");
  const userListingsContainer = document.getElementById("user-listings");

  if (!profileContainer || !userListingsContainer) {
    console.error("Error: Required DOM elements not found.");
    return;
  }

  profileContainer.innerHTML = `<div class="flex justify-center items-center h-48">
      <div class="loader border-t-4 border-secondary border-solid rounded-full w-8 h-8 animate-spin"></div>
    </div>`;
  userListingsContainer.innerHTML = `<p class="text-center">Laster innhold...</p>`;

  const username = localStorage.getItem("userName");
  if (!username) {
    profileContainer.innerHTML = `<p>Ingen brukernavn funnet, vennligst logg inn.</p>`;
    userListingsContainer.innerHTML = `<p>Logg inn for å se.</p>`;
    return;
  }

  try {
    const profileResponse = await fetchProfile(username);
    //console.log("Fetched Profile Data:", profileResponse);

    const profile = profileResponse.data;
    const listings = profile.listings || [];

    // Separate listings into categories
    const currentTime = new Date();
    const activeListings = listings.filter(
      (listing) => new Date(listing.endsAt) > currentTime,
    );
    const endedListings = listings.filter(
      (listing) => new Date(listing.endsAt) <= currentTime,
    );

    // Render profile information
    profileContainer.innerHTML = `
    <div class="relative">
      <div class="relative">
        ${
          profile.banner
            ? `
              <img 
                src="${profile.banner.url}" 
                alt="Profile Banner" 
                class="w-full h-48 object-cover rounded-lg"
              >
              <div class="absolute inset-0 bg-white bg-opacity-50 rounded-lg"></div>
            `
            : `<div class="w-full h-48 flex items-center justify-center text-gray-500"></div>`
        }
      </div>
      <div class="profile-info inset-x-0 transform -translate-y-1/4 flex flex-col items-center">
        <div class="avatar w-24 h-24 rounded-full border-4 border-secondary overflow-hidden flex items-center justify-center bg-gray-200">
          <img 
            src="${profile.avatar?.url}" 
            alt="${profile.avatar?.alt || "Avatar"}" 
            class="w-full h-full object-cover"
          >
        </div>
        <a href="/oppdater-profil/" class="text-gray-600 mt-4">Rediger profil</a>
        <h1 class="text-2xl font-medium mt-4">${profile.name}</h1>
        
        <div class="flex flex-col mt-6">
          <p class="text-gray-700 mt-4 break-words break-all whitespace-normal"><strong>Bio:</strong> ${
            profile.bio || ""
          }</p>
          <p class="text-gray-700 mt-2"><strong>Antall annonser lagd:</strong> ${
            listings.length
          }</p>
          <p class="text-gray-700 mt-2"><strong>Antall annonser vunnet:</strong> ${
            profile._count?.wins || 0
          }</p>
          <p class="text-gray-700 mt-2"><strong>Kreditt:</strong> ${
            profile.credits || 0
          }</p>
        </div>
      </div>
    </div>
  `;

    // Render "Annonser jeg har vunnet" Section
    userListingsContainer.innerHTML = `
    <div class="section mb-8">
      <h2 class="text-xl font-medium mb-4">Annonser jeg har vunnet</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${
          profile.wins && profile.wins.length > 0
            ? profile.wins
                .map(
                  (win) => `
              <div class="listing bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
                <div class="relative">
                  ${
                    win.media && win.media.length > 0
                      ? `<img src="${win.media[0].url}" alt="${
                          win.media[0].alt || "Annonse bilde"
                        }" class="w-full h-48 object-cover">`
                      : `<div class="w-full h-48 bg-gray-200 flex items-center justify-center">Ingen bilde</div>`
                  }
                </div>
                <div class="p-4 flex flex-col flex-grow">
                  <h3 class="text-lg font-medium">${win.title}</h3>
                  <p class="text-gray-700 line-clamp-2">${
                    win.description || "Bio:"
                  }</p>
                </div>
                <div class="mt-auto p-4 flex justify-between">
                  <a href="/annonse/?id=${
                    win.id
                  }" class="text-secondary font-medium hover:underline">SE ANNONSE</a>
                </div>
              </div>
            `,
                )
                .join("")
            : `<p>Du har ikke vunnet noen annonser enda.</p>`
        }
      </div>
    </div>
  
       <div class="section mb-8">
  <h2 class="text-xl font-medium mb-4">Aktive annonser</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    ${
      activeListings.length > 0
        ? activeListings
            .map(
              (listing) => `
          <div class="listing bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
            <div class="relative">
              ${
                listing.media && listing.media.length > 0
                  ? `<img src="${listing.media[0].url}" alt="${
                      listing.media[0].alt || "Annonse bilde"
                    }" class="w-full h-48 object-cover">`
                  : `<div class="w-full h-48 bg-gray-200 flex items-center justify-center">Ingen bilde</div>`
              }
            </div>
            <div class="p-4 flex flex-col flex-grow">
              <h3 class="text-lg font-medium">${listing.title}</h3>
              <p class="text-gray-700 line-clamp-2">${
                listing.description || "Bio:"
              }</p>
            </div>
            <div class="mt-auto p-4 flex justify-between">
              <a href="/annonse/?id=${
                listing.id
              }" class="text-secondary font-medium hover:underline">SE ANNONSE</a>
              <div class="flex gap-4">
                <a href="/rediger/?id=${
                  listing.id
                }" class="text-secondary hover:underline">ENDRE</a>
                <a href="#" data-id="${
                  listing.id
                }" class="text-red-500 hover:underline delete-listing">SLETT</a>
              </div>
            </div>
          </div>
        `,
            )
            .join("")
        : `<p>Du har ingen aktive annonser.</p>`
    }
  </div>
</div>
  
<div class="section">
  <h2 class="text-xl font-medium mb-4">Utgåtte Annonser</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    ${
      endedListings.length > 0
        ? endedListings
            .map(
              (listing) => `
          <div class="listing bg-white shadow-md rounded-lg flex flex-col overflow-hidden">
            <div class="relative">
              ${
                listing.media && listing.media.length > 0
                  ? `<img src="${listing.media[0].url}" alt="${
                      listing.media[0].alt || "Annonse bilde"
                    }" class="w-full h-48 object-cover">`
                  : `<div class="w-full h-48 bg-gray-200 flex items-center justify-center">Ingen bilde</div>`
              }
            </div>
            <div class="p-4 flex flex-col flex-grow">
              <h3 class="text-lg font-medium">${listing.title}</h3>
              <p class="text-gray-700 line-clamp-2">${
                listing.description || ""
              }</p>
            </div>
            <div class="mt-auto p-4 flex justify-between">
              <a href="/annonse/?id=${
                listing.id
              }" class="text-secondary font-medium hover:underline">SE ANNONSE</a>
              <div class="flex gap-4">
                <a href="/rediger/?id=${
                  listing.id
                }" class="text-secondary hover:underline">ENDRE</a>
                <a href="#" data-id="${
                  listing.id
                }" class="text-red-500 hover:underline delete-listing">SLETT</a>
              </div>
            </div>
          </div>
        `,
            )
            .join("")
        : `<p>Ingen utgåtte annonser.</p>`
    }
  </div>
</div>
      `;

    // Add delete functionality
    document.querySelectorAll(".delete-listing").forEach((deleteLink) => {
      deleteLink.addEventListener("click", async (event) => {
        event.preventDefault();
        const listingId = event.target.dataset.id;

        if (confirm("Er du sikker på at du vil slette denne annonsen?")) {
          try {
            await deleteListing(listingId);
            alert("Annonse slettet.");
            displayProfile();
          } catch (error) {
            alert(`Failed to delete listing: ${error.message}`);
          }
        }
      });
    });
  } catch (error) {
    console.error("Error displaying profile details:", error);
    profileContainer.innerHTML = `<p>Failed to load profile details. Please try again later.</p>`;
    userListingsContainer.innerHTML = `<p>Failed to load your listings. Please try again later.</p>`;
  }
}
