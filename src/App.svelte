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
	<button on:click={addPalette}>
		<svg viewBox="0 0 24 24" width="1em" height="1em" stroke="currentColor">
			<path d="M 12, 0 L 12, 24 M 0, 12 L 24, 12" />
		</svg>
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
