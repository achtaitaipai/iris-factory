import type { Colors } from './store/colors'

export const buildAndDownloadPng = (colors: Colors[][], steps: number) => {
	const canvas = document.createElement('canvas')
	const cellHeight = 100
	const cellWidth = 200
	canvas.width = cellWidth * steps
	canvas.height = cellHeight * colors.length
	const ctx = canvas.getContext('2d')

	ctx.textBaseline = 'top'
	ctx.font =
		"14px ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace"

	for (let y = 0; y < colors.length; y++) {
		const py = y * cellHeight
		const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
		for (let x = 0; x < steps; x++) {
			const palette = [...colors[y]]
			const px = x * cellWidth
			const { hex, luminance, color, name } = palette[x]
			ctx.fillStyle = hex
			ctx.fillRect(px, py, cellWidth, cellHeight)

			const sortedColors = palette.sort(
				(a, b) =>
					color.contrastWCAG21(a.color) -
					color.contrastWCAG21(b.color)
			)

			const textColor =
				sortedColors.find((c) => color.contrastWCAG21(c.color) >= 4)
					?.hex ?? sortedColors.at(-1).hex

			ctx.fillStyle = textColor
			ctx.fillText(name, px + cellWidth * 0.1, py + cellHeight * 0.1)
			ctx.fillText(hex, px + cellWidth * 0.1, py + cellHeight * 0.1 + 18)

			gradient.addColorStop(x / steps, hex)
		}

		ctx.fillStyle = gradient
		ctx.fillRect(0, py + cellHeight * 0.7, canvas.width, cellHeight * 0.3)
	}

	const link = document.createElement('a')
	link.download = 'iris-palette.png'
	canvas.toBlob(function (blob) {
		link.href = URL.createObjectURL(blob)
		link.click()
	})
}
