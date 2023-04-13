<script lang="ts">
	import Colorjs from 'colorjs.io'
	export let color: Colorjs
	let bg = '#ffffff'
	let fg = '#000000'
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
					Background <input type="color" bind:value={bg} />
				</label>
			</th>
			<th>
				<label class="with-color">
					Foreground <input type="color" bind:value={fg} />
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
	[type='color'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: transparent;
		border: none;
		width: 1.5em;
		height: 1.5em;
		cursor: pointer;
	}
	.ratio-result {
		font-weight: bold;
		font-style: italic;
	}
</style>
