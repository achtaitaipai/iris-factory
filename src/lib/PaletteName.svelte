<script lang="ts">
	import { tick } from 'svelte'

	export let name: string = ''
	export let namePalette: (name: string) => string
	export let input: HTMLInputElement
	let selectionStart = 0
	let selectionEnd = 0

	const handleInput = async () => {
		name = name
			.toLowerCase()
			.replace(/\s/g, '-')
			.replace(/[éèêë]/gi, 'e')
			.replace(/[àâä]/gi, 'a')
			.replace(/[ûùü]/gi, 'u')
			.replace(/[ôö]/gi, 'o')
			.replace(/ç/gi, 'c')
			.replace(/[^0-9a-z\-\_]/g, '')
		selectionStart = input?.selectionStart ?? 0
		selectionEnd = input?.selectionEnd ?? 0
		await tick()
		input.setSelectionRange(selectionStart, selectionEnd)
	}
	const handleChange = () => {
		name = namePalette(name.trim() === '' ? 'color-0' : name)
	}
</script>

<div>
	<input
		bind:this={input}
		type="text"
		name="name"
		placeholder="name"
		bind:value={name}
		on:input={handleInput}
		on:change={handleChange}
	/>
</div>

<style>
	div {
		flex: 1;
		padding-block: var(--s-xxs);
	}
	input {
		line-height: 1.2;
		background-color: transparent;
		border: 0;
		font-size: var(--fs-4);
		color: var(--text-1);
		font-weight: bold;
		padding-inline: var(--s-xs);
		width: 100%;
		cursor: default;
	}
	input::placeholder {
		color: var(--text-4);
	}
	input:where(:hover, :focus) {
		background-color: var(--surface-2);
		color: var(--text-3);
		outline: 1px solid var(--border-3);
	}
</style>
