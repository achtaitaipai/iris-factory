<script lang="ts">
	import Colorjs from 'colorjs.io'
	import { colors } from '../scripts/store/colors'
	export let color: Colorjs
	let bg = $colors.flat()[0].hex
	let fg = $colors.flat()[0].hex
	let fgRatio: number
	let bgRatio: number
	$: {
		fgRatio =
			Math.round(Colorjs.contrastWCAG21(color, new Colorjs(fg)) * 100) /
			100
		bgRatio =
			Math.round(Colorjs.contrastWCAG21(new Colorjs(bg), color) * 100) /
			100
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
</script>

<h3>Contrast ratio</h3>
<table>
	<thead>
		<tr>
			<th />
			<th>
				<label class="with-color">
					Background
					<select bind:value={bg}>
						{#each $colors.flat() as { name, hex }}
							<option value={hex}>{name}</option>
						{/each}
					</select>
				</label>
			</th>
			<th>
				<label class="with-color">
					Foreground
					<select bind:value={fg}>
						{#each $colors.flat() as { name, hex }}
							<option value={hex}>{name}</option>
						{/each}
					</select>
				</label>
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Ratio</td>
			<td>{bgRatio}</td>
			<td>{fgRatio}</td>
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
	.with-color {
		display: flex;
		align-items: center;
		gap: var(--s-2xs);
	}
	.ratio-result {
		font-weight: bold;
		font-style: italic;
	}
</style>
