import { defineConfig } from "vite";
import process from "process";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		port: 3000,
		cors: true,
		hmr: {
			port: 3000,
			clientPort:
				Number(process.env.DJANGO_VITE_DEV_SERVER_CLIENT_PORT) ||
				Number(process.env.DJANGO_VITE_DEV_SERVER_PORT) ||
				3000,
			host: process.env.DJANGO_VITE_DEV_SERVER_HOST || "localhost",
		},
	},
});
