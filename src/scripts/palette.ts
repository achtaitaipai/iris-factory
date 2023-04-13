import { cubicBezier, type CubicBezierParameter } from './cubicBezier'
import Colorjs from 'colorjs.io'

export type PaletteOptions = {
	hue: number
	lightness: CubicBezierParameter
	chroma: CubicBezierParameter
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
	chroma: [
		...palette.chroma.map((itm) => [itm[0], itm[1]]),
	] as CubicBezierParameter,
	lightness: [
		...palette.lightness.map((itm) => [itm[0], itm[1]]),
	] as CubicBezierParameter,
	hue: palette.hue,
})

export const buildPalette = ({
	hue,
	lightness,
	chroma,
	steps,
}: PaletteOptions & { steps: number }) => {
	const colors: Color[] = []
	const lightnessCurve = cubicBezier(lightness, steps)
	const chromaCurve = cubicBezier(chroma, steps)
	for (let i = 0; i < steps; i++) {
		const l = lightnessCurve[i] * 100
		const c = chromaCurve[i] * 0.4
		colors.push({ hue, lightness: l, chroma: c })
	}
	return colors
}

export const hex = (color: Colorjs) =>
	color.to(Colorjs.spaces.srgb).toString({ format: 'hex' })

export const hsl = (color: Colorjs) => {
	const { h, s, l } = color.to(Colorjs.spaces.hsl).hsl
	return [h, s, l].join(' ')
}

export const rgb = (color: Colorjs) => {
	const { r, g, b } = color.to(Colorjs.spaces.srgb).srgb
	return [r, g, b].map((n) => Math.round(n * 256)).join(' ')
}
export const luminance = (color: Colorjs) =>
	Math.round(color.luminance * 10) / 10
