<script lang="ts">
	import { palettes } from '../scripts/store/palette'
	import CubicBezierEditor from './CubicBezierEditor/index.svelte'
	import InputHue from './InputHue.svelte'

	export let index: number

	//
</script>

<form action="">
	<InputHue bind:value={$palettes[index].hue} />
	<fieldset>
		<legend>Lightness :</legend>
		<CubicBezierEditor
			bind:values={$palettes[index].lightness}
			verticalLabel="Lightness"
		/>
	</fieldset>
	<fieldset>
		<legend>Chroma :</legend>
		<CubicBezierEditor
			bind:values={$palettes[index].chroma}
			verticalLabel="Chroma"
		/>
	</fieldset>
</form>

<style>
	form {
		inline-size: 100%;
		display: grid;
		gap: var(--s-xs);
	}
	fieldset {
		border: 0;
		padding: var(--s-s);
	}
</style>
