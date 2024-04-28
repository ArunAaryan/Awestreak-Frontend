import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
export const manifest = {
  theme_color: "#000000",
  background_color: "#000000",
  display: "fullscreen",
  scope: "/",
  start_url: "/boards/all",
  name: "Awestreak",
  short_name: "Awestreak",
  description: "Public Learning & Streaks",
  icons: [
    {
      src: "/icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/icon-256x256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "/icon-384x384.png",
      sizes: "384x384",
      type: "image/png",
    },
    {
      src: "/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};
export default defineConfig({
  plugins: [react(), VitePWA(manifest)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
