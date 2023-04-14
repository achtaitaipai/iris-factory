<script lang="ts">
	import { asDraggable } from 'svelte-drag-and-drop-actions'
	export let x: number
	export let y: number
	export let minX: number
	export let minY: number
	export let maxX: number
	export let maxY: number
	export let updateValues: (x: number, y: number) => void

	const keydown = (e: KeyboardEvent) => {
		switch (e.code) {
			case 'ArrowLeft':
				updateValues(Math.max(minX, x - 1), y)
				e.preventDefault()
				break
			case 'ArrowRight':
				updateValues(Math.min(maxX, x + 1), y)
				e.preventDefault()
				break
			case 'ArrowUp':
				updateValues(x, Math.max(minY, y - 1))
				e.preventDefault()
				break
			case 'ArrowDown':
				updateValues(x, Math.min(maxY, y + 1))
				e.preventDefault()
				break
		}
	}
</script>

<button
	type="button"
	class="handle"
	on:keydown={keydown}
	style="left:{x - 10}px; top:{y - 10}px"
	use:asDraggable={{
		onDragStart: () => {
			return {
				x,
				y,
			}
		},
		onDragMove: updateValues,
		minX: minX,
		minY: minY,
		maxX: maxX,
		maxY: maxY,
	}}
/>

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
	.handle {
		position: absolute;
		border: 4px solid var(--border-2);
		border-radius: 50%;
		background-color: var(--border-1);
		width: 20px;
		height: 20px;
		cursor: move;
	}
	.handle:focus {
		border-color: var(--text-accent-1);
		outline: 0;
	}
</style>
