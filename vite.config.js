import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  root: "src",
  build: {
    outDir: "../dist",
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
