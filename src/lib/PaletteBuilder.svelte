<script lang="ts">
	import { onMount } from 'svelte'
	import CubicBezierEditor from './CubicBezierEditor/index.svelte'
	import InputHue from './InputHue.svelte'
	import InputSteps from './InputSteps.svelte'
	import Palette from './Palette.svelte'
	import PaletteName from './PaletteName.svelte'
	import { palettes } from '../scripts/store/palette'
	import { uniqueName } from '../scripts/uniqueName'
	
	export let index:number


	const namePalette = () =>
				uniqueName(
					$palettes[index].name,
					$palettes.map((p) => p.name),
					index
				)


	let element: HTMLInputElement
	
	onMount(() => {
		element.focus()
		element.scrollIntoView()
	})

	const removePalette = (index:number)=>palettes.update(pals=>pals.filter((_,i)=>i!==index))
</script>

<div class="wrapper">
	<form action="">
		<header>
			<PaletteName bind:name={$palettes[index].name} {namePalette} bind:input={element} />
			<button type="button" on:click={()=>{
				removePalette(index)
				
				 }} title="remove palette">
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
					<InputSteps bind:value={$palettes[index].steps} />
				</div>
				<div>
					<InputHue bind:value={$palettes[index].hue} />
				</div>
				<fieldset>
					<legend>lightness :</legend>
					<CubicBezierEditor  bind:values={$palettes[index].lightness}/>
				</fieldset>
				<fieldset>
					<legend>chroma :</legend>
					<CubicBezierEditor bind:values={$palettes[index].chroma} />
				</fieldset>
			</div>
		</details>
	</form>
	<Palette
		hue={$palettes[index].hue}
		steps={$palettes[index].steps}
		chroma={$palettes[index].chroma}
		lightness={$palettes[index].lightness}
	/>
</div>

<style>
	.wrapper {
		background-color: var(--surface-1);
		padding-block: var(--s-s);
		padding-inline: var(--s-m);
		border: 1px solid var(--border-1);
		inline-size: 100%;
	}
	header {
		display: flex;
		align-items: center;
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
		flex-basis: max(50% - var(--gap), 15rem);
		flex-grow: 1;
		flex-shrink: 0;
	}
	fieldset{
		border: 0;
		padding: var(--s-s);
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
