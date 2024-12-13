import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        createListing: resolve(__dirname, "./listing/create/index.html"),
        editListing: resolve(__dirname, "./listing/edit/index.html"),
        singleListing: resolve(__dirname, "./listing/single/index.html"),
        updateProfile: resolve(__dirname, "./profile/update/index.html"),
      },
    },
  },
});