<script lang="ts">
	import { asDraggable } from 'svelte-drag-and-drop-actions'
	import type { EaseParameter } from '../scripts/cubicBezier'
	let width: number
	export let values: EaseParameter = [
		[0, 100],
		[25, 75],
		[75, 25],
		[100, 0],
	]

	const valueToPos = (val: number) => (val * width ?? 1) / 100
	const posToValue = (pos: number) => (pos / (width ?? 1)) * 100
</script>

<div class="wrapper" bind:clientWidth={width}>
	<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<path
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
	{#each values as point, index}
		<div
			class="handle"
			style="left:{valueToPos(point[0]) - 10}px; top:{valueToPos(
				point[1]
			) - 10}px"
			use:asDraggable={{
				onDragStart: () => {
					return {
						x: valueToPos(point[0]),
						y: valueToPos(point[1]),
					}
				},
				onDragMove: (x, y) => {
					point[0] = posToValue(x)
					point[1] = posToValue(y)
				},
				minX: index === 3 ? width : 0,
				minY: 0,
				maxX: index === 0 ? 0 : width,
				maxY: width,
			}}
		/>
	{/each}
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
		/* max-inline-size: 20rem; */
		inline-size:min(20rem,100%);
		margin-inline: auto;
	}
	svg {
		border: 1px solid var(--border-1);
	}
	path {
		stroke: var(--text-1);
		stroke-width: 2px;
		fill: none;
	}
	line {
		stroke: var(--border-1);
		stroke-width: 1px;
	}
	.handle {
		position: absolute;
		border: 4px solid var(--text-1);
		border-radius: 50%;
		background-color: var(--border-1);
		width: 20px;
		height: 20px;
		cursor: move;
	}
</style>
