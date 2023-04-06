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
			<button type="button" on:click={remove} title="remove palette">
				<svg
					width="24"
					height="24"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					><path
						d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
						fill="currentColor"
						fill-rule="evenodd"
						clip-rule="evenodd"
					/></svg
				>
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
		font-size: var(--fs-1);
	}
	svg {
		stroke-width: 5px;
	}
	button:where(:hover, :focus) {
		color: var(--text-1);
		background-color: var(--surface-3);
		border: 1px solid var(--border-2);
	}
</style>
