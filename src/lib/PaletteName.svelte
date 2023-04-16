<script lang="ts">
	import { tick } from 'svelte'
	import { currentPalette } from '../scripts/store/currentPalette'

	export let name: string = ''
	export let namePalette: (name: string) => string
	let input: HTMLInputElement
	let selectionStart = 0
	let selectionEnd = 0
	export let index: number

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

	const handleFocus = () => {
		$currentPalette = index
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
		maxlength="10"
		on:focus={handleFocus}
	/>
</div>

<style>
	div {
		block-size: 100%;
		padding-block: var(--s-2xs);
		/* inline-size: 15ch; */
		margin-inline-end: var(--s-2xs);
	}
	@media (max-width: 30rem) {
		div {
			display: none;
		}
	}
	input {
		padding-inline: var(--s-3xs);
		inline-size: calc(10ch + 2 * var(--s-3xs));
		block-size: 100%;
		line-height: 1.2;
		font-weight: bold;
		color: var(--text-1);
		background-color: transparent;
		outline: 1px solid transparent;
		border: 0;
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
	:global([aria-selected='true'] input) {
		color: var(--text-accent-1);
		outline: 1px solid var(--text-accent-1);
	}
</style>
