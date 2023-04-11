<script lang="ts">
	export let value: number 
</script>

<label>
	Steps :
	<input type="number" name="steps" min="3" step="1" max="20" bind:value />
</label>

<style>
	input {
		width: 6ch;
		background-color: var(--surface-1);
		text-align: center;
		border: 1px solid var(--border-2);
	}
	input:where(:focus, :hover) {
		border: 1px solid var(--border-3);
		background-color: var(--surface-2);
		outline: 1px solid var(--border-3);
	}
</style>
