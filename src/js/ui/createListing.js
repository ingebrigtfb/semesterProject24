import { createListing } from "../api/createListing.js";


function addImageField() {
    const mediaContainer = document.getElementById("media-container");

    const imageField = document.createElement("div");
    imageField.className = "image-field flex items-center gap-4 mb-2";

    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.name = "media-url";
    urlInput.placeholder = "Legg inn bilde url";
    urlInput.className = "border border-gray-300 rounded-md p-2 flex-grow";

    const altInput = document.createElement("input");
    altInput.type = "text";
    altInput.name = "media-alt";
    altInput.placeholder = "Legg inn alt tekst";
    altInput.className = "border border-gray-300 rounded-md p-2 flex-grow";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Fjern";
    removeButton.className = "text-red-500 hover:text-red-700";
    removeButton.addEventListener("click", () => {
        mediaContainer.removeChild(imageField);
    });

    imageField.appendChild(urlInput);
    imageField.appendChild(altInput);
    imageField.appendChild(removeButton);

    mediaContainer.appendChild(imageField);
}

// Form Submission Function
export async function onCreateListing(event) {
    event.preventDefault();

    const createForm = event.target;

    const mediaElements = document.querySelectorAll(".image-field");
    const media = Array.from(mediaElements)
        .map((element) => {
            const url = element.querySelector("input[name='media-url']").value.trim();
            const alt = element.querySelector("input[name='media-alt']").value.trim();
            return { url, alt: alt || undefined };
        })
        .filter((item) => item.url);

    const listingData = {
        title: createForm.querySelector("input[name='title']").value.trim(),
        description: createForm.querySelector("textarea[name='description']").value.trim(),
        endsAt: createForm.querySelector("input[name='endsAt']").value.trim(),
        media,
    };

    console.log("Final Listing Data:", listingData);

    try {
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



document.getElementById("add-image").addEventListener("click", addImageField);
document.getElementById("create-listing-form").addEventListener("submit", onCreateListing);