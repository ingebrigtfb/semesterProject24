import { fetchProfile } from "../api/profile.js";

export async function displayProfile() {
  const profileContainer = document.getElementById("profile-container");
  if (!profileContainer) {
    console.error("Error: #profile-container element not found in DOM.");
    return;
  }

  const username = localStorage.getItem("userName");
  if (!username) {
    profileContainer.innerHTML = `<p>No username found. Please log in.</p>`;
    return;
  }

  try {
    const profileResponse = await fetchProfile(username);
    console.log("Fetched Profile Data:", profileResponse);

    const profile = profileResponse.data;

    const listings = profile._count?.listings ?? "No data available";
    const wins = profile._count?.wins ?? "No data available";

    profileContainer.innerHTML = `
      <div class="profile bg-containers shadow-md rounded-md p-4 flex flex-col items-center max-w-lg m-auto">
      <div class="avatar mt-4">
          <img src="${profile.avatar?.url}" alt="${
      profile.avatar?.alt || "Avatar"
    }" class="rounded-full w-20 h-20">
        </div>
        <a href="/oppdater-profil/" class="text-gray-600 mt-2">Rediger profil</a>
        <h1 class="text-2xl font-medium mb-4">${profile.name || "No Name"}</h1>
        <p class="text-gray-700 mb-2"><strong>Bio:</strong> ${
          profile.bio || ""
        }</p>
        <p class="text-gray-700 mb-2"><strong>Listings:</strong> ${listings}</p>
        <p class="text-gray-700 mb-2"><strong>Wins:</strong> ${wins}</p>
        <p class="text-gray-700 mb-2"><strong>Credits:</strong> ${
          profile.credits || 0
        }</p>
      </div>
    `;
  } catch (error) {
    console.error("Error displaying profile details:", error);
    profileContainer.innerHTML = `<p>Failed to load profile details. Please try again later.</p>`;
  }
}
