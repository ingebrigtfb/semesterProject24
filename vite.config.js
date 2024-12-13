import { resolve } from "path";
import { defineConfig } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

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
        profile: resolve(__dirname, "./profil/index.html"),
        createListing: resolve(__dirname, "./lage/index.html"),
        editListing: resolve(__dirname, "./rediger/index.html"),
        singleListing: resolve(__dirname, "./annonse/index.html"),
        updateProfile: resolve(__dirname, "./oppdater-profil/index.html"),
      },
    },
  },
  define: {
    "import.meta.env.VITE_API_KEY": JSON.stringify(process.env.VITE_API_KEY),
  },
});