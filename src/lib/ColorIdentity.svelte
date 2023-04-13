<script lang="ts">
	import Colorjs from 'colorjs.io'
	import {
		buildPalette,
		hex,
		type Color,
		rgb,
		hsl,
		luminance,
	} from '../scripts/palette'
	import { currentColor } from '../scripts/store/currentColor'
	import { currentPalette } from '../scripts/store/currentPalette'
	import { palettes } from '../scripts/store/palette'
	import { steps } from '../scripts/store/steps'
	import type { Palette } from '../scripts/palette'
	import { colors } from '../scripts/store/colors'

	let palette: Palette
	let color: Colorjs
	let oklch: Color
	let colorContrast = '#ff0000'
	let contrast: number
	$: {
		palette = $palettes[$currentPalette]
		color = $colors[$currentPalette][$currentColor]
	}

	$: contrast =
		Math.round(color.contrast(new Colorjs(colorContrast), 'WCAG21') * 100) /
		100

	//
</script>

<section>
	<div class="color" style="--_color:{hex(color)}" />
	<div class="infos">
		<h3>{palette.name}-{$currentColor}</h3>
		<table>
			<tr>
				<th> Hexadecimal </th>
				<td>{hex(color)}</td>
			</tr>
			<!-- <tr>
				<th> Oklch </th>
				<td>
					oklch(
					{Math.round(oklch.lightness * 10000) / 10000}
					{Math.round(oklch.chroma * 10000) / 10000}
					{Math.round(oklch.hue * 10000) / 10000})
				</td>
			</tr> -->
			<tr>
				<th> Luminance </th>
				<td>
					{luminance(color)}
				</td>
			</tr>
			<!-- <tr>
				<th>
					Ratio of contrast with <input
						type="color"
						bind:value={colorContrast}
					/>
				</th>
				<td>{contrast}</td>
			</tr> -->
		</table>
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: center;
		background-color: var(--surface-1);
		inline-size: clamp(20rem, 70%, 50rem);
		margin-inline: auto;
		padding: var(--s-s);
	}
	.color {
		inline-size: 10rem;
		aspect-ratio: 1;
		background-color: var(--_color);
		border: 1px solid var(--border-3);
	}
	.infos {
		flex: 1;
		display: grid;
		gap: var(--s-s);
	}
	table {
		margin-inline: auto;
	}
	th {
		text-align: start;
		padding-inline-end: var(--s-s);
	}
	h3 {
		text-align: center;
	}
</style>
