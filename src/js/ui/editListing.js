import { editListing } from "../api/editListing.js";
import { fetchSingleListing } from "../api/singleListing.js";

export async function displayEditListingForm(listingId) {
    const editContainer = document.getElementById("edit-listing-container");
    if (!editContainer) {
        console.error("Error: #edit-listing-container not found.");
        return;
    }

    try {
        const listing = await fetchSingleListing(listingId);
        const { data } = listing;


        editContainer.innerHTML = `
            <form id="edit-listing-form" class="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
              <div class="flex flex-col">
                <label for="title" class="text-sm font-medium mb-1">Tittel</label>
                <input id="title" name="title" type="text" value="${data.title}" required class="border border-gray-300 rounded-md p-2">
              </div>
              <div class="flex flex-col">
                <label for="description" class="text-sm font-medium mb-1">Beskrivelse</label>
                <textarea id="description" name="description" required class="border border-gray-300 rounded-md p-2">${data.description || ""}</textarea>
              </div>
              <div class="flex flex-col gap-4" id="media-container">
                <label class="text-sm font-medium mb-1">Bilder</label>
                ${data.media
                    .map(
                        (media) => `
                    <div class="image-field flex items-center gap-4 mb-2">
                      <input type="url" name="media-url" value="${media.url}" placeholder="Bilde URL" class="border border-gray-300 rounded-md p-2 flex-grow">
                      <input type="text" name="media-alt" value="${media.alt || ""}" placeholder="Alt tekst" class="border border-gray-300 rounded-md p-2 flex-grow">
                      <button type="button" class="text-red-500 hover:underline" onclick="this.parentElement.remove()">Fjern</button>
                    </div>
                `
                    )
                    .join("")}
                <button type="button" id="add-image" class="text-black">Legg til flere bilder</button>
              </div>
              <button type="submit" class="bg-secondary text-white px-4 py-2 rounded-lg mx-auto w-30">Lagre endringer</button>
            </form>
        `;

       
        document.getElementById("add-image").addEventListener("click", () => {
            const mediaContainer = document.getElementById("media-container");

            const imageField = document.createElement("div");
            imageField.className = "image-field flex items-center gap-4 mb-2";

            const urlInput = document.createElement("input");
            urlInput.type = "url";
            urlInput.name = "media-url";
            urlInput.placeholder = "Bilde URL";
            urlInput.className = "border border-gray-300 rounded-md p-2 flex-grow";

            const altInput = document.createElement("input");
            altInput.type = "text";
            altInput.name = "media-alt";
            altInput.placeholder = "Alt tekst";
            altInput.className = "border border-gray-300 rounded-md p-2 flex-grow";

            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.textContent = "Fjern";
            removeButton.className = "text-red-500 hover:underline";
            removeButton.addEventListener("click", () => {
                mediaContainer.removeChild(imageField);
            });

            imageField.appendChild(urlInput);
            imageField.appendChild(altInput);
            imageField.appendChild(removeButton);

            mediaContainer.appendChild(imageField);
        });


        document.getElementById("edit-listing-form").addEventListener("submit", async (event) => {
            event.preventDefault();

            const form = event.target;

            const mediaElements = form.querySelectorAll(".image-field");
            const media = Array.from(mediaElements)
                .map((element) => {
                    const url = element.querySelector("input[name='media-url']").value.trim();
                    const alt = element.querySelector("input[name='media-alt']").value.trim();
                    return { url, alt: alt || undefined };
                })
                .filter((item) => item.url);

            const updatedData = {
                title: form.querySelector("#title").value.trim(),
                description: form.querySelector("#description").value.trim(),
            };

            try {
                const updatedListing = await editListing(listingId, updatedData);
                console.log("Updated Listing:", updatedListing);
                alert("Endringer lagret!");
                window.location.href = `/annonse/?id=${updatedListing.data.id}`;
            } catch (error) {
                console.error("Error updating listing:", error);
                alert("Kunne ikke lagre endringene.");
            }
        });
    } catch (error) {
        console.error("Error displaying edit listing form:", error);
        editContainer.innerHTML = `<p>Kunne ikke laste annonsen. Vennligst prøv igjen senere.</p>`;
    }
}