import {
  onCreateListing,
  initializeImageFields,
} from "../../ui/createListing.js";

import { authorize } from "../../utils/authorize.js";

authorize();

document
  .getElementById("create-listing-form")
  .addEventListener("submit", onCreateListing);

initializeImageFields();
