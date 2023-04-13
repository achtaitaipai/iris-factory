<svelte:options immutable />

<script lang="ts">
	import type Colorjs from 'colorjs.io'
	import { hex } from '../scripts/palette'
	import { currentColor } from '../scripts/store/currentColor'
	import { currentPalette } from '../scripts/store/currentPalette'

	export let index: number
	export let colors: string[]

	//
</script>

<div class="wrapper">
	<div class="buttons">
		{#each colors as hex, i}
			<button
				type="button"
				style="--_bg-color:{hex};"
				aria-current={i === $currentColor && index === $currentPalette}
				on:click={() => {
					$currentPalette = index
					$currentColor = i
				}}
			/>
		{/each}
	</div>
	<div
		class="gradient"
		style="background-image:linear-gradient(to right,{colors.join(',')});"
	/>
</div>

<style>
	.wrapper {
		flex: 1;
		height: 100%;
		display: grid;
		grid-template-rows: 2fr 1fr;
	}
	.buttons {
		display: flex;
		flex: 1;
		height: 100%;
	}
	button {
		flex: 1;
		background-color: var(--_bg-color);
		color: var(--_color);
		height: 100%;
		border: 0;
		transition: transform 0.15s;
	}
	button:where(:active, [aria-current='true']) {
		transform: scale(1.1);
		outline: 1px solid var(--text-accent-1);
		z-index: 10;
	}
</style>
