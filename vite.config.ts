import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	build: {
		rollupOptions: {
			output: {
				// Prevent vendor.js being created
				entryFileNames: '[name].js',
				// this got rid of the hash on style.css
				assetFileNames: '[name].[ext]',
			},
		},
		outDir: 'iris-factory',
	},
	base: '/iris-factory',
})
