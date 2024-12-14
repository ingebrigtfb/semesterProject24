import { createListing } from "../api/createListing.js";


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

    const endsAtInput = createForm.querySelector("input[name='endsAt']").value.trim();
    const endsAt = endsAtInput
        ? new Date(`${endsAtInput}:00`).toISOString() 
        : null;

    const listingData = {
        title: createForm.querySelector("input[name='title']").value.trim(),
        description: createForm.querySelector("textarea[name='description']").value.trim(),
        endsAt,
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