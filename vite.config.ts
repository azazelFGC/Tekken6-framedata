import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  base: "/Tekken6-framedata/",
  plugins: [tailwindcss()],
});
