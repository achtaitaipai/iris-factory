import { getEase, type Ease } from './ease'

export type PaletteOptions = {
	hue: number
	lightness: number[]
	lightnessEase?: Ease
	chroma: number[]
	chromaEase?: Ease
	steps: number
}

export type Palette = { name: string } & PaletteOptions
export type Color = {
	hue: number
	chroma: number
	lightness: number
}

export const clonePaletteOptions = (
	palette: PaletteOptions
): PaletteOptions => ({
	chroma: [...palette.chroma],
	lightness: [...palette.lightness],
	hue: palette.hue,
	steps: palette.steps,
	chromaEase: palette.chromaEase,
	lightnessEase: palette.lightnessEase,
})

export const buildPalette = ({
	hue,
	lightness,
	lightnessEase,
	chroma,
	chromaEase,
	steps,
}: PaletteOptions) => {
	const colors: Color[] = []
	for (let i = 0; i < steps; i++) {
		const x = i / (steps - 1)
		const l = interpolateValue(x, lightness, lightnessEase)
		const c = interpolateValue(x, chroma, chromaEase)
		colors.push({ hue, lightness: l, chroma: c })
	}
	return colors
}

export const interpolateValue = (
	x: number,
	keys: number[],
	easeType: Ease | number = 'linear'
) => {
	if (keys.length === 1) return keys[0]
	const numberOfranges = keys.length - 1
	const rangeSize = 1 / numberOfranges
	const currentRange = Math.min(Math.floor(x / rangeSize), numberOfranges - 1)
	const currentX = x === 1 ? 1 : (x % rangeSize) / rangeSize
	const min = keys[currentRange]
	const max = keys[currentRange + 1]
	const ease = getEase(easeType)
	return map(ease(currentX), min, max)
}

const map = (factor: number, min: number, max: number) =>
	factor * (max - min) + min
