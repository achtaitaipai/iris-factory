<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import CopyBtns from './lib/CopyBtns.svelte'
	import Header from './lib/Header.svelte'
	import PaletteBuilder from './lib/PaletteBuilder.svelte'
	import { addPalette, palettes } from './scripts/store/palette'
</script>

<Header />
<main class="center">

	<SvelteToast
		options={{ reversed: true, intro: { y: 192 }, duration: 1000 }}
	/>

	<CopyBtns palettes={$palettes} />

	{#each $palettes as { name, chroma, lightness, steps, hue }, index}
		<PaletteBuilder
			{index}
		/>
	{/each}

	<button on:click={()=>addPalette()} title="new palette">
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

</main>

<style>
	main {
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
		border-radius: 50%;
		stroke-width: 5px;
	}
</style>
