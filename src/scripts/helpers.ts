export const clamp = (value: number, min: number, max: number) =>
	Math.max(min, Math.min(value, max))

export const round = (value: number, decimals) => {
	const n = Math.pow(10, decimals)
	return Math.round(n * value) / n
}
