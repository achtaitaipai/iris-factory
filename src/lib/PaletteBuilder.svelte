<script lang="ts">
	import type { Ease } from '../scripts/ease'
	import PaletteName from './PaletteName.svelte'
	import InputHue from './InputHue.svelte'
	import InputKey from './InputKey.svelte'
	import InputEase from './InputEase.svelte'
	import InputSteps from './InputSteps.svelte'
	import Palette from './Palette.svelte'
	export let name = ''

	export let steps = 10
	export let hue = 0
	export let chroma = [0, 0.2, 0]
	export let chromaEase: Ease = 'linear'
	export let lightness = [10, 100]
	export let lightnessEase: Ease = 'linear'
	export let remove = () => {}
</script>

<div class="wrapper">
	<form action="">
		<header>
			<PaletteName bind:name />
			<button type="button" on:click={remove}>
				<svg
					viewBox="0 0 24 24"
					width="1em"
					height="1em"
					stroke="currentColor"
					stroke-width={5}
				>
					<path d="M 0, 0 L 24, 24 M 0, 24 L 24, 0" />
				</svg>
			</button>
		</header>
		<details>
			<summary>Settings</summary>
			<div class="details-content">
				<InputSteps bind:value={steps} />
				<InputHue bind:value={hue} />
				<fieldset>
					<legend>Lightness :</legend>
					<InputKey bind:values={lightness} />
					<InputEase bind:value={lightnessEase} />
				</fieldset>
				<fieldset>
					<legend>Chroma :</legend>
					<InputKey bind:values={chroma} max={0.4} step={0.01} />
					<InputEase bind:value={chromaEase} />
				</fieldset>
			</div>
		</details>
	</form>
	<Palette
		bind:hue
		bind:steps
		bind:chroma
		bind:lightness
		bind:chromaEase
		bind:lightnessEase
	/>
</div>

<style>
	.wrapper {
		background-color: var(--surface-1);
		padding-block: var(--s-s);
		padding-inline: var(--s-m);
		border-radius: 0.5rem;
		border: 1px solid var(--border-1);
	}
	header {
		display: flex;
		align-items: center;
		gap: var(--s-s);
	}
	.details-content,
	fieldset {
		display: grid;
		gap: var(--s-s);
	}

	summary {
		font-size: var(--fs-2);
	}
	details {
		margin-block: var(--s-s);
	}
	.details-content {
		padding-inline: var(--s-s);
		padding-block: var(--s-s);
	}
	button {
		width: auto;
		aspect-ratio: 1;
		height: 100%;
		display: grid;
		place-items: center;
		margin-inline: auto;
		font-weight: bold;
		line-height: 1;
		background-color: var(--surface-1);
		border: 1px solid var(--border-2);
		stroke-width: 5px;
	}

	button:where(:hover, :focus) {
		color: var(--text-1);
		background-color: var(--surface-3);
		border: 1px solid var(--border-2);
	}
</style>
