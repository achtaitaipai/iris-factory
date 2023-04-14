<script lang="ts">
	import { tick } from 'svelte'
	import { clamp, round } from '../../scripts/helpers'

	export let y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
		y4: number

	let value: string
	let selectionStart = 0
	let selectionEnd = 0
	$: {
		value = [y1, x2, y2, x3, y3, y4].map((n) => round(n, 0)).join(', ')
	}

	const handleInput = async ({ target }: Event) => {
		const input = target as HTMLInputElement
		const value = input.value
		selectionStart = input?.selectionStart ?? 0
		selectionEnd = input?.selectionEnd ?? 0
		input.value = value.replace(/[^0-9,]|(?<=,)(?=,)|(?<=^,)(?=,)/g, '')
		await tick()
		input.setSelectionRange(selectionStart, selectionEnd)
	}

	const handleChange = ({ target }: Event) => {
		const input = target as HTMLInputElement
		const numbers = input.value
			.split(',')
			.map((n) => clamp(Number(n), 0, 100))
		;[y1, x2, y2, x3, y3, y4] = [y1, x2, y2, x3, y3, y4].map((n, i) =>
			typeof numbers[i] === 'number' ? numbers[i] : n
		)
		console.log(input.value)
	}
	//
</script>

<label>
	Curve : <input
		type="text"
		{value}
		on:change={handleChange}
		on:input={handleInput}
	/>
</label>

<style>
	label {
		display: flex;
		gap: var(--s-2xs);
		margin-block-start: var(--s-s);
	}
	input {
		flex: 1;
		background-color: transparent;
		border: 1px solid var(--border-2);
		padding-inline: var(--s-2xs);
	}
	input:where(:hover, :focus) {
		outline: 0;
		color: var(--text-accent-1);
		background-color: var(--surface-1);
		border-color: var(--border-accent-1);
	}
</style>
