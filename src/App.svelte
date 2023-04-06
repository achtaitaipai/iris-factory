<script lang="ts">
	import CodeOutput from './lib/CodeOutput.svelte'
	import Header from './lib/Header.svelte'
	import PaletteBuilder from './lib/PaletteBuilder.svelte'
	import { getDatasFromUrl } from './scripts/dataToUrl'
	import type { Palette, PaletteOptions } from './scripts/palette'
	const defaultPalette: PaletteOptions = {
		chroma: [0.01, 0.2, 0.02],
		lightness: [95, 20],
		hue: 260,
		chromaEase: 'linear',
		lightnessEase: 'linear',
		steps: 10,
	}
	let palettes: Palette[] = getDatasFromUrl() ?? [
		{ name: 'color-0', ...defaultPalette },
	]

	const addPalette = () => {
		palettes = [
			...palettes,
			{
				name: 'color-' + palettes.length,

				...defaultPalette,
				hue: Math.floor(Math.random() * 360),
			},
		]
	}
	const removePalette = (index: number) => {
		palettes = palettes.filter((_, i) => i !== index)
	}
</script>

<Header />
<main>
	{#each palettes as { name, chroma, lightness, lightnessEase, chromaEase, steps, hue }, index}
		<PaletteBuilder
			bind:name
			bind:chroma
			bind:lightness
			bind:lightnessEase
			bind:chromaEase
			bind:steps
			bind:hue
			remove={() => removePalette(index)}
		/>
	{/each}
	<button on:click={addPalette} title="new palette">
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			><path
				d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
				fill="currentColor"
				fill-rule="evenodd"
				clip-rule="evenodd"
			/></svg
		>
	</button>

	<CodeOutput bind:palettes />
</main>

<style>
	main {
		width: clamp(20rem, 80vw, 60rem);
		margin-inline: auto;
		padding-block: var(--s-l);
		display: grid;
		gap: var(--s-m);
	}
	button {
		padding: var(--s-xs);
		display: block;
		margin-inline: auto;
		font-size: var(--fs-1);
		font-weight: bold;
		line-height: 1;
		background-color: var(--surface-1);
		border: 1px solid var(--border-2);
		border-radius: 50%;
		stroke-width: 5px;
	}

	button:where(:hover, :focus-visible) {
		color: var(--text-1);
		background-color: var(--surface-3);
		border: 1px solid var(--border-2);
	}
</style>
