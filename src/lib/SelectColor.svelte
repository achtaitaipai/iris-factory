<script lang="ts">
	import { beforeUpdate } from 'svelte'
	import { colors } from '../scripts/store/colors'
	import { palettes } from '../scripts/store/palette'
	import { steps } from '../scripts/store/steps'
	import { clamp } from '../scripts/helpers'
	export let value: number
	export let label: string

	beforeUpdate(() => {
		const max = $palettes.length * ($steps - 1)
		value = clamp(value, 0, max)
	})
	//
</script>

<label>
	{label}
	<select bind:value>
		{#each $colors.flat() as { name }, i}
			<option value={i}>{name}</option>
		{/each}
	</select>
</label>

<style>
	label {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--s-2xs);
		flex-wrap: wrap;
	}
</style>
