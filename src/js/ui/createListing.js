import { createListing } from "../api/createListing.js";


export async function onCreateListing(event) {
    event.preventDefault();

    const createForm = event.target;

    // Collect media inputs
    const mediaElements = document.querySelectorAll(".image-field");
    const media = Array.from(mediaElements)
        .map((element) => {
            const url = element.querySelector("input[name='media-url']").value.trim();
            const alt = element.querySelector("input[name='media-alt']").value.trim();
            return { url, alt: alt || undefined };
        })
        .filter((item) => item.url);

    // Collect and format the `endsAt` input
    const endsAtInput = createForm.querySelector("input[name='endsAt']").value.trim();
    const endsAt = endsAtInput
        ? new Date(`${endsAtInput}:00`).toISOString()
        : null;

    // Prepare listing data
    const listingData = {
        title: createForm.querySelector("input[name='title']").value.trim(),
        description: createForm.querySelector("textarea[name='description']").value.trim(),
        endsAt,
        media,
    };

    console.log("Final Listing Data:", listingData);

    try {
        // Create listing using API
        const createdListing = await createListing(listingData);
        console.log("Created Listing:", createdListing);

        const listingId = createdListing.data?.id;

        if (listingId) {
            alert("Listing created successfully!");
            window.location.href = `/annonse/?id=${listingId}`;
        } else {
            throw new Error("Listing ID not found in the response.");
        }
    } catch (error) {
        console.error("Error creating listing:", error);
        alert(`Error creating listing: ${error.message}`);
    }
}

// Handle adding more image fields dynamically
export function initializeImageFields() {
    const addImageButton = document.getElementById("add-image");
    const mediaContainer = document.getElementById("media-container");

    if (!addImageButton || !mediaContainer) {
        console.error("Error: Image fields initialization failed.");
        return;
    }

    addImageButton.addEventListener("click", () => {
        // Create new image field container
        const imageField = document.createElement("div");
        imageField.className = "image-field flex items-center gap-4 mb-2";

        // Create URL input field
        const urlInput = document.createElement("input");
        urlInput.type = "url";
        urlInput.name = "media-url";
        urlInput.placeholder = "Legg inn bilde url";
        urlInput.className = "border border-gray-300 rounded-md p-2 flex-grow";

        // Create alt text input field
        const altInput = document.createElement("input");
        altInput.type = "text";
        altInput.name = "media-alt";
        altInput.placeholder = "Legg inn alt tekst";
        altInput.className = "border border-gray-300 rounded-md p-2 flex-grow";

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Fjern";
        removeButton.className = "text-red-500 hover:underline";
        removeButton.addEventListener("click", () => {
            mediaContainer.removeChild(imageField);
        });

        // Append inputs and button to the image field
        imageField.appendChild(urlInput);
        imageField.appendChild(altInput);
        imageField.appendChild(removeButton);

        // Append the image field to the media container
        mediaContainer.appendChild(imageField);
    });
}