<script lang="ts">
	export let values: number[] = []
	export let max = 100
	export let min = 0
	export let step = 1
	let currentValue = ''
	const removeKey = (index: number) => {
		values = values.filter((_, i) => i !== index)
	}
	$: {
		currentValue = currentValue
			.replace(/[^\d\s\.]/g, '')
			.replace(/(?<!\d)[\s\.]+/g, '')
		const newKeys = currentValue.match(/[0-9.]+(?=\s)/g)
		if (newKeys) {
			console.log(
				newKeys,
				newKeys.map((k) => Math.max(Math.min(Number(k), max), min))
			)
			values = [...values, ...newKeys.map((k) => Number(k))]
			currentValue = ''
		}
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
			type="text"
			name=""
			placeholder="Add key"
			bind:value={currentValue}
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

	input[type='text'] {
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
