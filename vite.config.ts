import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      // buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6", // add buffer
      events: "rollup-plugin-node-polyfills/polyfills/events",
      // stream: "rollup-plugin-node-polyfills/polyfills/stream",
      // util: "rollup-plugin-node-polyfills/polyfills/util",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["@tableland/sqlparser", "stream/web", "util/types"],
  },
  build: {
    outDir: "./dist",
    target: "es2020",
    sourcemap: true,
  },
  server: {
    port: 3867,
    host: "0.0.0.0",
    fs: {
      allow: ["/"],
      strict: false,
    },
  },
  define: {
    "process.env": {},
  },
});
