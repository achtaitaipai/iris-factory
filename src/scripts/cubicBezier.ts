type Point = [number, number]
export type CubicBezierParameter = [Point, Point, Point, Point]
const precision = 50

export const cubicBezier = (
	[p0, p1, p2, p3]: CubicBezierParameter,
	steps: number
) => {
	const curve: Point[] = []
	for (let i = 0; i <= precision; i++) {
		const t = i / precision
		const y = getPoint(t, p0[1], p1[1], p2[1], p3[1])
		const x = getPoint(t, p0[0], p1[0], p2[0], p3[0])
		curve.push([x, y])
	}
	const result: number[] = []
	for (let step = 0; step < steps; step++) {
		const x = step / (steps - 1)
		result.push(1 - closest(x, curve))
	}
	return result
}

const closest = (x: number, curve: Point[]) => {
	let y = 0
	let dist = Infinity
	for (let i = 0; i < curve.length; i++) {
		const currentDist = Math.abs(curve[i][0] - x)
		if (currentDist < dist) {
			dist = currentDist
			y = curve[i][1]
		}
	}
	return y
}

const getPoint = (
	t: number,
	p0: number,
	p1: number,
	p2: number,
	p3: number
) => {
	p0 /= 100
	p1 /= 100
	p2 /= 100
	p3 /= 100
	return (
		Math.pow(1 - t, 3) * p0 +
		3 * Math.pow(1 - t, 2) * t * p1 +
		3 * (1 - t) * Math.pow(t, 2) * p2 +
		Math.pow(t, 3) * p3
	)
}
