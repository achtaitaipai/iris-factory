<script lang="ts">
	import { easeKeys } from '../scripts/ease'
	export let value = ''
</script>

<label>
	Easing Function :
	<select bind:value>
		{#each easeKeys as ease}
			<option value={ease}>{ease}</option>
		{/each}
	</select></label
>

<style>
	label {
		display: grid;
		gap: var(--s-2xs);
	}
	select {
		position: relative;
		padding-inline: var(--s-2xs);
		padding-block: var(--s-3xs);
		border-radius: 0.8rem;
		border-color: var(--border-2);
		background-color: var(--surface-2);
		appearance: none;
		background-image: linear-gradient(45deg, transparent 50%, gray 50%),
			linear-gradient(135deg, gray 50%, transparent 50%),
			linear-gradient(to right, #ccc, #ccc);
		background-position: calc(100% - 20px) calc(1em + 2px),
			calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
		background-size: 5px 5px, 5px 5px, 1px 1.5em;
		background-repeat: no-repeat;
	}
	select:where(:focus) {
		outline: 1px solid var(--border-3);
	}
</style>
