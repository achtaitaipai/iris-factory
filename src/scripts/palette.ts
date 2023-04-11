import { cubicBezier, type EaseParameter } from './cubicBezier'

export type PaletteOptions = {
	hue: number
	lightness: EaseParameter
	chroma: EaseParameter
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
	chroma: [...palette.chroma.map(itm=>[itm[0],itm[1]])] as EaseParameter,
	lightness: [...palette.lightness.map(itm=>[itm[0],itm[1]])] as EaseParameter,
	hue: palette.hue,
	steps: palette.steps,
})

export const buildPalette = ({
	hue,
	lightness,
	chroma,
	steps,
}: PaletteOptions) => {
	const colors: Color[] = []
	const lightnessCurve = cubicBezier(lightness,steps)
	const chromaCurve = cubicBezier(chroma,steps)
	for (let i = 0; i < steps; i++) {
		const l = lightnessCurve[i] * 100
		const c = chromaCurve[i] * 0.4
		colors.push({ hue, lightness: l, chroma: c })
	}
	return colors
}

