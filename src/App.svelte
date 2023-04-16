<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import Header from './lib/Header.svelte'
	import PaletteBuilder from './lib/PaletteBuilder.svelte'
	import Preview from './lib/Preview.svelte'
	import { currentPalette } from './scripts/store/currentPalette'
	import { palettes } from './scripts/store/palette'
</script>

<Header />
<Preview />
<aside>
	<SvelteToast
		options={{ reversed: true, intro: { y: 192 }, duration: 1000 }}
	/>
	{#if $currentPalette < $palettes.length && $currentPalette >= 0}
		<PaletteBuilder index={$currentPalette} />
	{/if}
</aside>

<style>
	aside {
		display: flex;
		flex-direction: column;
		block-size: 100%;
		overflow: auto;
		align-items: start;

		padding-block: var(--s-s);
		padding-inline: var(--s-m);
	}
</style>
