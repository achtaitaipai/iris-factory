import Colorjs from 'colorjs.io'
import { derived, type Readable } from 'svelte/store'
import { palettes } from './palette'
import { buildPalette, hex, luminance, type Palette } from '../palette'
import { steps } from './steps'

const DEBOUNCEDELAY = 50

let timeoutId: ReturnType<typeof setTimeout>
let isFirstTime = false

export type Colors = {
	color: Colorjs
	hex: string
	oklch: string
	luminance: number
	name: string
	paletteName: string
}

export const colors = derived([palettes, steps], ([$palettes, $steps], set) => {
	if (!isFirstTime) {
		set(createColors($palettes, $steps))
		isFirstTime = true
	} else {
		if (timeoutId) clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			set(createColors($palettes, $steps))
		}, DEBOUNCEDELAY)
	}
}) as Readable<Colors[][]>

const createColors = (palettes: Palette[], steps: number) =>
	palettes.map(({ name, ...p }) =>
		buildPalette({ ...p, steps: steps }).map(
			({ lightness, hue, chroma }, i) => {
				const color = new Colorjs('oklch', [
					lightness / 100,
					chroma,
					hue,
				])
				const hexadecimal = hex(color)
				const relativeLuminance = luminance(color)
				const oklch = `oklch(${lightness} ${chroma} ${hue})`
				return {
					color,
					luminance: relativeLuminance,
					hex: hexadecimal,
					oklch,
					name: `${name}-${i}`,
					paletteName: name,
				}
			}
		)
	)
