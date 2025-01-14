// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // Ensure the host is correctly set
    port: 5173, // Specify the port
    strictPort: true, // Fail if the port is already in use
    hmr: {
      protocol: "ws", // Use WebSocket protocol
      host: "localhost", // Ensure HMR connects to the correct host
    },
  },
});
