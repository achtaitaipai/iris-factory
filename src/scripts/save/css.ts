import Colorjs from 'colorjs.io'
import { hex, type Color } from '../palette'

export const buildCss = (
	palettes: { colors: Colorjs[]; name: string }[],
	format?: ColorFormat
) => {
	const css = palettes.reduce(
		(str, palette) =>
			str + colorsToCssVariables(palette.colors, palette.name, format),
		`:root{\n`
	)
	return css + '}'
}

const colorsToCssVariables = (
	palette: Colorjs[],
	name: string,
	format?: ColorFormat
) => {
	const css = palette.reduce(
		(str, color, index) =>
			str + `    --${name}-${index} : ${hex(color)};\n`,
		''
	)
	return css
}

type ColorFormat = 'hex' | 'hsl' | 'rgb' | 'oklch'

export const getCssColor = (
	{ lightness, hue, chroma }: Color,
	format?: ColorFormat
) => {
	const color = new Colorjs('oklch', [lightness / 100, chroma, hue])
	switch (format) {
		case 'hsl':
			return color.to(Colorjs.spaces.hsl).toString()

		case 'rgb':
			return color.to(Colorjs.spaces.srgb).toString()
		case 'oklch':
			return `oklch(${lightness}% ${chroma} ${hue})`
		default:
			return color.to(Colorjs.spaces.srgb).toString({ format: 'hex' })
	}
}
