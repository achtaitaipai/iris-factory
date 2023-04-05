<script lang="ts">
	import { getCssColor } from '../scripts/css'
	import type { Ease } from '../scripts/ease'
	import { buildPalette } from '../scripts/palette'

	export let steps: number
	export let hue: number
	export let chroma: number[]
	export let chromaEase: Ease
	export let lightness: number[]
	export let lightnessEase: Ease
	let palette: string[] = []
	$: palette = buildPalette({
		steps,
		hue,
		chroma,
		chromaEase,
		lightness,
		lightnessEase,
	}).map((col) => getCssColor(col))
</script>

<ul>
	{#each palette as color}
		<li style="--color: {color};" />
	{/each}
</ul>

<style>
	ul {
		display: grid;
		margin: 0;
		padding: 0;
		border: 1px solid var(--border-2);
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		list-style: none;
	}
	li {
		background-color: var(--color);
		height: 3rem;
	}
</style>
