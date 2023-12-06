// vite.config.ts
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
var vite_config_default = defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      events: "rollup-plugin-node-polyfills/polyfills/events",
      "@": pat
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCByZWFjdFJlZnJlc2ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXJlZnJlc2hcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3RSZWZyZXNoKCldLFxuICByZXNvbHZlOiB7XG4gICAgZGVkdXBlOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcbiAgICBhbGlhczoge1xuICAgICAgLy8gYnVmZmVyOiBcInJvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL2J1ZmZlci1lczZcIiwgLy8gYWRkIGJ1ZmZlclxuICAgICAgZXZlbnRzOiBcInJvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL2V2ZW50c1wiLFxuICAgICAgLy8gc3RyZWFtOiBcInJvbGx1cC1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMvcG9seWZpbGxzL3N0cmVhbVwiLFxuICAgICAgLy8gdXRpbDogXCJyb2xsdXAtcGx1Z2luLW5vZGUtcG9seWZpbGxzL3BvbHlmaWxscy91dGlsXCIsXG4gICAgICBcIkBcIjogcGF0LFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFtcIkB0YWJsZWxhbmQvc3FscGFyc2VyXCIsIFwic3RyZWFtL3dlYlwiLCBcInV0aWwvdHlwZXNcIl0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcIi4vZGlzdFwiLFxuICAgIHRhcmdldDogXCJlczIwMjBcIixcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDM4NjcsXG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgZnM6IHtcbiAgICAgIGFsbG93OiBbXCIvXCJdLFxuICAgICAgc3RyaWN0OiBmYWxzZSxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBcInByb2Nlc3MuZW52XCI6IHt9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxvQkFBb0I7QUFHN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNQLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxJQUM3QixPQUFPO0FBQUEsTUFFTCxRQUFRO0FBQUEsTUFHUixLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyx3QkFBd0IsY0FBYyxZQUFZO0FBQUEsRUFDOUQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDRixPQUFPLENBQUMsR0FBRztBQUFBLE1BQ1gsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
