<script lang="ts">
	import Colorjs from 'colorjs.io'
	import { colors } from '../scripts/store/colors'
	import SelectColor from './SelectColor.svelte'
	export let color: Colorjs
	let bgIndex = 0
	let fgIndex = 0

	let fgRatio: number
	let bgRatio: number

	$: {
		fgRatio =
			Math.round(
				Colorjs.contrastWCAG21(color, $colors.flat()[fgIndex].color) *
					100
			) / 100
		bgRatio =
			Math.round(
				Colorjs.contrastWCAG21($colors.flat()[bgIndex].color, color) *
					100
			) / 100
	}

	const criterias = [
		['Body Text', 4.5, 7],
		['Large Text', 3, 4.5],
	] satisfies [string, number, number][]

	const ratioLevel = (ratio: number, aa: number, aaa: number) => {
		if (ratio >= aaa) return '<span class="success">AAA</span>'
		if (ratio >= aa) return '<span class="warning">AA</span>'
		return '<span class="error">Fail</span>'
	}
	const ratioToString = (ratio: number) => {
		let ratioStr = ratio.toString()

		if (ratioStr.length === 1) ratioStr += '.00'
		if (ratioStr.length === 3) ratioStr += '0'
		return ratioStr
	}
</script>

<h3>Contrast ratio</h3>
<table>
	<thead>
		<tr>
			<th />
			<th>
				<SelectColor bind:value={bgIndex} label="Background" />
			</th>
			<th>
				<SelectColor bind:value={fgIndex} label="Foreground" />
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Ratio</td>
			<td>{ratioToString(bgRatio)}</td>
			<td>{ratioToString(fgRatio)}</td>
		</tr>
		{#each criterias as [label, aa, aaa]}
			<tr>
				<td>{label}</td>
				<td class="ratio-result"
					>{@html ratioLevel(bgRatio, aa, aaa)}</td
				>
				<td class="ratio-result"
					>{@html ratioLevel(fgRatio, aa, aaa)}</td
				>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	h3 {
		text-align: center;
	}

	.ratio-result {
		font-weight: bold;
		font-style: italic;
	}
</style>
