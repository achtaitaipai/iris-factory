import { writable } from 'svelte/store'
import { getDatasFromUrl } from '../dataToUrl'
import { clonePaletteOptions, type PaletteOptions } from '../palette'
import { uniqueName } from '../uniqueName'

const defaultPalette: PaletteOptions = {
	chroma: [
		[0, 100],
		[30, 25],
		[60, 60],
		[100, 50],
	],
	lightness: [
		[0, 0],
		[25, 25],
		[90, 40],
		[100, 50],
	],
	hue: Math.floor(Math.random() * 360),
}

const initialPalette = () =>
	getDatasFromUrl()?.palettes ?? [{ name: 'color-0', ...defaultPalette }]

export const palettes = writable(initialPalette())

export const addPalette = () =>
	palettes.update((palettes) => [
		...palettes,
		{
			...clonePaletteOptions(
				palettes[palettes.length - 1] ?? defaultPalette
			),
			hue: Math.floor(Math.random() * 360),
			name: uniqueName(
				'color-0',
				palettes.map((p) => p.name)
			),
		},
	])
