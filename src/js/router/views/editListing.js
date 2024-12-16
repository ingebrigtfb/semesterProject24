import { displayEditListingForm } from "../../ui/editListing.js";
import { authorize } from "../../utils/authorize.js";

authorize();

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

if (!listingId) {
  console.error("Error: No listing ID found in the URL.");
  document.getElementById("edit-listing-container").innerHTML =
    `<p>Kunne ikke finne annonsen. Vennligst prøv igjen senere.</p>`;
} else {
  displayEditListingForm(listingId);
}
