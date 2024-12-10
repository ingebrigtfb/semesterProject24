import { fetchProfile } from "../api/profile.js";
import { deleteListing } from "../api/deleteListing.js";

export async function displayProfile() {
  const profileContainer = document.getElementById("profile-container");
  const userListingsContainer = document.getElementById("user-listings");

  if (!profileContainer) {
    console.error("Error: #profile-container element not found in DOM.");
    return;
  }

  if (!userListingsContainer) {
    console.error("Error: #user-listings element not found in DOM.");
    return;
  }

  const username = localStorage.getItem("userName");
  if (!username) {
    profileContainer.innerHTML = `<p>No username found. Please log in.</p>`;
    userListingsContainer.innerHTML = `<p>Log in to view your listings.</p>`;
    return;
  }

  try {
    const profileResponse = await fetchProfile(username);
    console.log("Fetched Profile Data:", profileResponse);

    const profile = profileResponse.data;
    const listings = profile.listings || [];

    // Render profile information
    profileContainer.innerHTML = `
      <div class="profile rounded-md p-4 flex flex-col items-center max-w-lg m-auto">
        <div class="avatar mt-4">
          <img src="${profile.avatar?.url}" alt="${
      profile.avatar?.alt || "Avatar"
    }" class="rounded-full w-20 h-20">
        </div>
        <a href="/oppdater-profil/" class="text-gray-600 mt-2">Rediger profil</a>
        <h1 class="text-2xl font-medium mb-4">${profile.name}</h1>
        <p class="text-gray-700 mb-2"><strong>Bio:</strong> ${
          profile.bio || ""
        }</p>
        <p class="text-gray-700 mb-2"><strong>Antall annonser:</strong> ${
          listings.length
        }</p>
        <p class="text-gray-700 mb-2"><strong>Annonser du har vunnet:</strong> ${
          profile._count?.wins || 0
        }</p>
        <p class="text-gray-700 mb-2"><strong>Kreditt:</strong> ${
          profile.credits || 0
        }</p>
      </div>
    `;

    // Render user listings
    if (listings.length === 0) {
      userListingsContainer.innerHTML = `<p>Du har ikke lagt ut noen annonser</p>`;
    } else {
      userListingsContainer.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${listings
            .map(
              (listing) => `
            <div class="listing bg-white shadow-md rounded-lg overflow-hidden block">
              <div class="relative">
                ${
                  listing.media && listing.media.length > 0
                    ? `<img src="${listing.media[0].url}" alt="${
                        listing.media[0].alt || "Listing Image"
                      }" class="w-full h-48 object-cover">`
                    : `<div class="w-full h-48 bg-gray-200 flex items-center justify-center">No Image</div>`
                }
              </div>
              <div class="p-4 flex flex-col gap-2">
                <h3 class="text-lg font-medium">${listing.title}</h3>
                <p class="text-gray-700 line-clamp-2">${
                  listing.description || ""
                }</p>
                <div class="flex items-center justify-between mt-4">
                  <a href="/annonse/?id=${listing.id}" class="text-black font-medium">GI BUD</a>
                  <div class="flex items-center gap-4">
                    <a href="/rediger/?id=${listing.id}" class="text-blue-500 hover:underline">ENDRE</a>
                    <a href="#" data-id="${listing.id}" class="text-red-500 hover:underline delete-listing">SLETT</a>
                  </div>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `;
    }


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