<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast'
	import { getCssColor } from '../scripts/save/css'
	import type { Ease } from '../scripts/ease'
	import { buildPalette } from '../scripts/palette'
	import { copyToClipBoard } from '../scripts/clipBoard'

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

	const copy = (toCopy: string) => {
		copyToClipBoard(
			toCopy,
			() =>
				toast.push(`
			color copied to clipboard
			`),
			() => toast.push(`copy failled`)
		)
	}
</script>

<ul>
	{#each palette as color}
		<li style="--color: {color};">
			<button title="click to copy color" on:click={() => copy(color)}>
				<span class="sr-only">copy-to-clipboard</span>
			</button>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: grid;
		margin: 0;
		padding: 0;
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		list-style: none;
		gap: 1px;
		border: 1px solid var(--border-1);
	}
	li button {
		background-color: var(--color);
		height: 2rem;
		width: 100%;
		border: 0;
		display: block;
	}
	li button:where(:hover, :focus-visible) {
		transform: scale(1.05);
	}
</style>
