import type { Color } from '../palette'
import { getCssColor } from './css'

export const buildJson = (palettes: { colors: Color[]; name: string }[]) => {
	const data = palettes.reduce<Record<string, string>>(
		(data, { colors, name }) => {
			const currentPalette = colors.reduce<Record<string, string>>(
				(palette, color, index) => {
					return {
						...palette,
						[`${name}-${index}`]: getCssColor(color),
					}
				},
				{}
			)
			return { ...data, ...currentPalette }
		},
		{}
	)

	return JSON.stringify(data)
}
