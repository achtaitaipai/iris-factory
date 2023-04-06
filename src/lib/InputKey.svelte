<script lang="ts">
	export let values: number[] = []
	export let max = 100
	export let min = 0
	export let step = 1
	let currentValue: number | undefined = undefined
	const removeKey = (index: number) => {
		values = values.filter((_, i) => i !== index)
	}
	const addKey = () => {
		if (currentValue !== undefined) {
			values = [...values, Math.max(0, Math.min(max, currentValue))]
			currentValue = undefined
		}
	}
	const handleKeyDown = ({ code }: KeyboardEvent) => {
		if (code.includes('Enter') || code === 'Space') addKey()
	}
</script>

<label>
	Keys :
	<div class="wrapper">
		{#each values as key, index}
			<span class="key" data-index={index}>
				<input type="number" bind:value={key} {max} {min} {step} />
				<button
					title="delete"
					type="button"
					on:click={() => removeKey(index)}
					><span aria-hidden="true">X</span></button
				>
			</span>
		{/each}

		<input
			class="newKey"
			type="number"
			{max}
			{min}
			{step}
			placeholder="Add key"
			bind:value={currentValue}
			on:keydown={handleKeyDown}
			on:blur={addKey}
		/>
	</div>
</label>

<style>
	label {
		display: grid;
		gap: var(--s-2xs);
	}
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: var(--s-xs);
		align-items: center;
		flex-wrap: wrap;
		padding-inline: var(--s-xs);
	}

	input.newKey {
		flex: 1;
		background-color: transparent;
		border: 0;
		outline: 0;
	}
	.key {
		display: flex;
		align-items: center;
		border: 1px solid var(--border-2);
		color: var(--text-2);
	}
	.key:focus-within {
		border: 1px solid var(--border-3);
		color: var(--text-1);
	}

	.key input {
		padding-inline-start: var(--s-2xs);
		width: 8ch;
		outline: 0;
		border: 0;
		text-align: center;
		background-color: transparent;
	}
	.key button {
		padding-inline: var(--s-2xs);
		background-color: transparent;
		border: 0;
		color: var(--text-3);
	}

	.key button:where(:hover, :focus) {
		color: var(--text-1);
	}
</style>
