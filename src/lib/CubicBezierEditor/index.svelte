<script lang="ts">
	import type { CubicBezierParameter } from '../../scripts/cubicBezier'
	import Handle from './Handle.svelte'
	let width: number
	export let values: CubicBezierParameter

	const valueToPos = (val: number) => (val * width ?? 1) / 100
	const posToValue = (pos: number) => (pos / (width ?? 1)) * 100
	const updateValues = (index: number, x: number, y: number) => {
		values[index][0] = posToValue(x)
		values[index][1] = posToValue(y)
	}
</script>

<div class="wrapper" bind:clientWidth={width}>
	<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<path
			class="grid"
			d="M 0 10 100 10 M 0 20 100 20 M 0 30 100 30 M 0 40 100 40 M 0 50 100 50 M 0 60 100 60 M0 70 100 70 M 0 80 100 80 M 0 90 100 90"
		/>
		<path
			class="curve"
			d="M {values[0][0]} {values[0][1]} C {values[1][0]} {values[1][1]}, {values[2][0]} {values[2][1]}, {values[3][0]} {values[3][1]}"
		/>
		<line
			x1={values[0][0]}
			y1={values[0][1]}
			x2={values[1][0]}
			y2={values[1][1]}
		/>
		<line
			x1={values[2][0]}
			y1={values[2][1]}
			x2={values[3][0]}
			y2={values[3][1]}
		/>
	</svg>

	<Handle
		x={valueToPos(values[0][0])}
		y={valueToPos(values[0][1])}
		minX={0}
		minY={0}
		maxX={0}
		maxY={width}
		updateValues={(x, y) => updateValues(0, x, y)}
	/>
	<Handle
		x={valueToPos(values[1][0])}
		y={valueToPos(values[1][1])}
		minX={0}
		minY={0}
		maxX={width}
		maxY={width}
		updateValues={(x, y) => updateValues(1, x, y)}
	/>
	<Handle
		x={valueToPos(values[2][0])}
		y={valueToPos(values[2][1])}
		minX={0}
		minY={0}
		maxX={width}
		maxY={width}
		updateValues={(x, y) => updateValues(2, x, y)}
	/>
	<Handle
		x={valueToPos(values[3][0])}
		y={valueToPos(values[3][1])}
		minX={width}
		minY={0}
		maxX={width}
		maxY={width}
		updateValues={(x, y) => updateValues(3, x, y)}
	/>
</div>

<style>
	:global([draggable]) {
		-webkit-touch-callout: none;
		-ms-touch-action: none;
		touch-action: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.wrapper {
		position: relative;
		inline-size: min(20rem, 100%);
		margin-inline: auto;
	}
	svg {
		outline: 6px solid var(--border-2);
		outline-offset: 6px;
		background-color: var(--surface-2);
	}
	.grid {
		stroke: var(--border-2);
		stroke-dasharray: 3;
		stroke-width: 1px;
		fill: none;
	}
	.curve {
		stroke: var(--text-accent-2);
		stroke-width: 2px;
		fill: none;
	}
	line {
		stroke: var(--text-2);
		stroke-width: 1px;
	}
</style>
