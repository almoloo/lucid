// vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      events: "rollup-plugin-node-polyfills/polyfills/events",
      "@": path.resolve("/Users/alimousavi/Documents/Projects/bounty/lucid", "./src")
    }
  },
  optimizeDeps: {
    exclude: ["@tableland/sqlparser", "stream/web", "util/types"]
  },
  build: {
    outDir: "./dist",
    target: "es2020",
    sourcemap: true
  },
  server: {
    port: 3867,
    host: "0.0.0.0",
    fs: {
      allow: ["/"],
      strict: false
    }
  },
  define: {
    "process.env": {}
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIGltcG9ydCByZWFjdFJlZnJlc2ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXJlZnJlc2hcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBkZWR1cGU6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxuICAgIGFsaWFzOiB7XG4gICAgICAvLyBidWZmZXI6IFwicm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvYnVmZmVyLWVzNlwiLCAvLyBhZGQgYnVmZmVyXG4gICAgICBldmVudHM6IFwicm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvZXZlbnRzXCIsXG4gICAgICAvLyBzdHJlYW06IFwicm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvc3RyZWFtXCIsXG4gICAgICAvLyB1dGlsOiBcInJvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3V0aWxcIixcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoXCIvVXNlcnMvYWxpbW91c2F2aS9Eb2N1bWVudHMvUHJvamVjdHMvYm91bnR5L2x1Y2lkXCIsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogW1wiQHRhYmxlbGFuZC9zcWxwYXJzZXJcIiwgXCJzdHJlYW0vd2ViXCIsIFwidXRpbC90eXBlc1wiXSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiLi9kaXN0XCIsXG4gICAgdGFyZ2V0OiBcImVzMjAyMFwiLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzg2NyxcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICBmczoge1xuICAgICAgYWxsb3c6IFtcIi9cIl0sXG4gICAgICBzdHJpY3Q6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIGRlZmluZToge1xuICAgIFwicHJvY2Vzcy5lbnZcIjoge30sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxVQUFVO0FBRWpCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsSUFDN0IsT0FBTztBQUFBLE1BRUwsUUFBUTtBQUFBLE1BR1IsS0FBSyxLQUFLLFFBQVEscURBQXFELE9BQU87QUFBQSxJQUNoRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyx3QkFBd0IsY0FBYyxZQUFZO0FBQUEsRUFDOUQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixPQUFPLENBQUMsR0FBRztBQUFBLE1BQ1gsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
