<script lang="ts">
	import { cubicBezier, type Ease } from '../scripts/ease'
	import PaletteName from './PaletteName.svelte'
	import InputHue from './InputHue.svelte'
	import InputKey from './InputKey.svelte'
	import InputEase from './InputEase.svelte'
	import InputSteps from './InputSteps.svelte'
	import Palette from './Palette.svelte'
	import { onMount } from 'svelte'
	import CubicBezierEditor, {
		type EaseParameter,
	} from './CubicBezierEditor.svelte'
	export let name = ''
	export let namePalette: (name: string) => string

	let lightnessCubic = [
		[0, 100],
		[25, 75],
		[75, 25],
		[100, 0],
	] as EaseParameter

	let chromaCubic = [
		[0, 100],
		[25, 75],
		[75, 25],
		[100, 0],
	] as EaseParameter

	const prepareValues = (values: EaseParameter) =>
		values
			.reduce((acc, val) => acc.concat(val), [])
			.map((n, i) => (i % 2 === 0 ? n / 100 : n / 100)) as [
			number,
			number,
			number,
			number,
			number,
			number,
			number,
			number
		]

	export let steps = 10
	export let hue = 0
	export let chroma = [0, 0.2, 0]
	export let chromaEase: Ease = 'linear'
	export let lightness = [10, 100]
	export let lightnessEase: Ease = 'linear'
	export let remove = () => {}

	let element: HTMLInputElement
	onMount(() => {
		element.focus()
		element.scrollIntoView()
	})
</script>

<div class="wrapper">
	<form action="">
		<header>
			<PaletteName bind:name {namePalette} bind:input={element} />
			<button type="button" on:click={remove} title="remove palette">
				<svg
					width="1em"
					height="1em"
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
				<div>
					<InputSteps bind:value={steps} />
				</div>
				<div>
					<InputHue bind:value={hue} />
				</div>
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
				<div>
					<CubicBezierEditor bind:values={lightnessCubic} />
					{cubicBezier(0.5, ...lightnessCubic)}
					{prepareValues(lightnessCubic).join(', ')}
				</div>
				<div>
					<CubicBezierEditor bind:values={chromaCubic} />
					{chromaCubic.join(', ')}
				</div>
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
		/* border-radius: 0.5rem; */
		border: 1px solid var(--border-1);
		inline-size: 100%;
	}
	header {
		display: flex;
		align-items: center;
		gap: var(--s-s);
	}
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
		--gap: var(--s-l);
		gap: var(--gap);
		padding-inline: var(--s-s);
		padding-block: var(--s-s);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.details-content > * {
		flex-basis: max(50% - var(--gap), 30rem);
		flex-grow: 1;
		flex-shrink: 0;
		width: 40%;
	}
	button {
		height: calc(1.7 * var(--fs-1));
		width: calc(1.7 * var(--fs-1));
		display: grid;
		place-items: center;
		font-weight: bold;
		line-height: 1;
		font-size: var(--fs-0);
	}
	svg {
		stroke-width: 5px;
	}
</style>
