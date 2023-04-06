<script lang="ts">
	export let name: string = ''
	export let namePalette: (name: string) => string
	const handleInput = () => {
		name = name.replace(/[^0-9a-z\-\_]/g, '')
	}
	const handleChange = () => {
		name = namePalette(name)
	}
</script>

<div>
	<input
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
	}
	input::placeholder {
		color: var(--text-4);
	}
	input:where(:hover, :focus) {
		background-color: var(--surface-3);
		color: var(--text-3);
		outline: 0;
	}
</style>
