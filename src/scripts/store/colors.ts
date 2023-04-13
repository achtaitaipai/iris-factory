import Colorjs from 'colorjs.io'
import { derived, type Readable } from 'svelte/store'
import { palettes } from './palette'
import { buildPalette, type Palette } from '../palette'
import { steps } from './steps'

const DEBOUNCEDELAY = 50

let timeoutId: ReturnType<typeof setTimeout>
let isFirstTime = false
export const colors = derived([palettes, steps], ([$palettes, $steps], set) => {
	if (!isFirstTime) {
		set(createColors($palettes, $steps))
		isFirstTime = true
	} else {
		if (timeoutId) clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			console.log('🔥')
			set(createColors($palettes, $steps))
		}, DEBOUNCEDELAY)
	}
}) as Readable<Colorjs[][]>

const createColors = (palettes: Palette[], steps: number) =>
	palettes.map((p) =>
		buildPalette({ ...p, steps: steps }).map(
			({ lightness, hue, chroma }) =>
				new Colorjs('oklch', [lightness / 100, chroma, hue])
		)
	)
