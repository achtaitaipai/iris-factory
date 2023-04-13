<script lang="ts">
	import { colors } from '../scripts/store/colors'
	import { currentColor } from '../scripts/store/currentColor'
	import { currentPalette } from '../scripts/store/currentPalette'
	import { addPalette, palettes } from '../scripts/store/palette'
	import { steps } from '../scripts/store/steps'
	import { uniqueName } from '../scripts/uniqueName'
	import ColorIdentity from './ColorIdentity.svelte'
	import Colors from './Colors.svelte'
	import CopyBtns from './CopyBtns.svelte'
	import InputSteps from './InputSteps.svelte'
	import PaletteName from './PaletteName.svelte'

	const namePalette = (index: number) =>
		uniqueName(
			$palettes[index].name,
			$palettes.map((p) => p.name),
			index
		)

	const removePalette = (index: number) => {
		palettes.update((pals) => pals.filter((_, i) => i !== index))
		$currentPalette = Math.max(
			0,
			Math.min($palettes.length - 1, $currentPalette)
		)
	}

	const handleKeyboard = (e: KeyboardEvent) => {
		switch (e.code) {
			case 'ArrowLeft':
				e.preventDefault()
				$currentColor--
				break
			case 'ArrowRight':
				e.preventDefault()
				$currentColor++

				break
			case 'ArrowDown':
				e.preventDefault()
				$currentPalette++
				break
			case 'ArrowUp':
				e.preventDefault()
				$currentPalette--
				break
		}
		if ($currentColor >= $steps) $currentColor = 0
		if ($currentColor < 0) $currentColor = $steps - 1
		if ($currentPalette >= $palettes.length) $currentPalette = 0
		if ($currentPalette < 0) $currentPalette = $palettes.length - 1
	}
</script>

<main>
	<div class="settings">
		<InputSteps bind:value={$steps} />
		<CopyBtns />
	</div>
	<div class="palettes" on:keydown={handleKeyboard}>
		{#each $colors as list, index}
			{#if $palettes[index]}
				<div class="palette" aria-selected={index === $currentPalette}>
					<PaletteName
						bind:name={$palettes[index].name}
						namePalette={() => namePalette(index)}
					/>
					<Colors {index} colors={list.map(({ hex }) => hex)} />
					<button
						type="button"
						on:click={() => {
							removePalette(index)
						}}
						title="remove palette"
						class="remove"
					>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							><path
								d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
								fill="currentColor"
								fill-rule="evenodd"
								clip-rule="evenodd"
							/></svg
						>
					</button>
				</div>
			{/if}
		{/each}
	</div>

	<button on:click={() => addPalette()} title="new palette">
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			><path
				d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
				fill="currentColor"
				fill-rule="evenodd"
				clip-rule="evenodd"
			/></svg
		>
	</button>
	{#if $currentPalette < $palettes.length && $currentPalette >= 0 && $currentColor >= 0 && $currentColor < $steps}
		<ColorIdentity />
	{/if}
</main>

<style>
	main {
		overflow: auto;
		padding: var(--s-s);
		display: grid;
		gap: var(--s-s);
		max-block-size: 100%;
		overflow: auto;
	}
	.settings {
		display: flex;
		justify-content: space-between;
		padding-inline: var(--s-2xs);
		margin-block-end: var(--s-s);
	}
	.palettes {
		display: grid;
	}
	.palette {
		display: flex;
		align-items: center;
		height: 5rem;
	}

	button {
		font-size: var(--fs--1);
		padding: var(--s-2xs);
		display: block;
		margin-inline: auto;
		font-weight: bold;
		line-height: 1;
		stroke-width: 5px;
	}
	button:not(:hover, :focus) {
		border-color: transparent;
	}
	.remove {
		margin-inline-start: var(--s-2xs);
		margin-block: var(--s-2xs);
	}
</style>
