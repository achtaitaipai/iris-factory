<script lang="ts">
	import Colorjs from 'colorjs.io'
	import { colors, type Colors } from '../scripts/store/colors'
	import { currentColor } from '../scripts/store/currentColor'
	import { currentPalette } from '../scripts/store/currentPalette'
	import ContrastRatio from './ContrastRatio.svelte'

	let color: Colors | undefined
	let colorContrast = '#ff0000'
	let contrast: number
	$: {
		if ($currentPalette < $colors.length && $currentPalette >= 0)
			color = $colors[$currentPalette][$currentColor]
	}

	$: contrast = color
		? Math.round(
				color.color.contrast(new Colorjs(colorContrast), 'WCAG21') * 100
		  ) / 100
		: 0
</script>

{#if color}
	<section>
		<header>
			<div class="color" style="--_color:{color.hex}" />

			<h2>{color.name}</h2>
		</header>
		<table>
			<tr>
				<th> Hexadecimal </th>
				<td>{color.hex}</td>
			</tr>
			<tr>
				<th> Relative luminance </th>
				<td>
					{color.luminance}
				</td>
			</tr>
		</table>
		<ContrastRatio color={color.color} />
	</section>
{/if}

<style>
	section {
		display: none;
	}

	@media (min-width: 600px) {
		section {
			display: inline-grid;
			gap: var(--s-s);
			padding: var(--s-s);
			margin-inline: auto;
			background-color: var(--surface-1);
			border: 1px solid var(--border-1);
			max-inline-size: 100%;
		}
		header {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: var(--s-s);
		}
		.color {
			inline-size: 3rem;
			aspect-ratio: 1;
			background-color: var(--_color);
			border: 1px solid var(--border-3);
		}
	}
</style>
