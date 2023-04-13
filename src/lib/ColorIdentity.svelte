<script lang="ts">
	import Colorjs from 'colorjs.io'
	import { colors, type Colors } from '../scripts/store/colors'
	import { currentColor } from '../scripts/store/currentColor'
	import { currentPalette } from '../scripts/store/currentPalette'
	import ContrastRatio from './ContrastRatio.svelte'

	let color: Colors
	let colorContrast = '#ff0000'
	let contrast: number
	$: {
		color = $colors[$currentPalette][$currentColor]
	}

	$: contrast =
		Math.round(
			color.color.contrast(new Colorjs(colorContrast), 'WCAG21') * 100
		) / 100
</script>

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

<style>
	section {
		display: inline-grid;
		gap: var(--s-s);
		padding: var(--s-s);
		margin-inline: auto;
		background-color: var(--surface-1);
		border: 1px solid var(--border-1);
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
</style>
