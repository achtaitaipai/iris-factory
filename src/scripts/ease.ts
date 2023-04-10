
export type Ease = keyof typeof eases

//https://easings.net/fr#easeInOutExpo
const eases = {
	linear: (x: number) => x,
	easeInSine: (x: number) => 1 - Math.cos((x * Math.PI) / 2),
	easeOutSine: (x: number) => Math.sin((x * Math.PI) / 2),
	easeInOutSine: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2,
	easeInQuad: (x: number) => x * x,
	easeOutQuad: (x: number) => 1 - (1 - x) * (1 - x),
	easeInOutQuad: (x: number) =>
		x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2,
	easeInCubic: (x: number) => x * x * x,
	easeOutCubic: (x: number) => 1 - Math.pow(1 - x, 3),
	easeInOutCubic: (x: number) =>
		x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
	easeInQuart: (x: number) => x * x * x * x,
	easeOutQuart: (x: number) => 1 - Math.pow(1 - x, 4),
	easeInOutQuart: (x: number) =>
		x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2,
	easeInQuint: (x: number) => x * x * x * x * x,
	easeOutQuint: (x: number) => 1 - Math.pow(1 - x, 5),
	easeInOutQuint: (x: number) =>
		x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2,
	easeInExpo: (x: number) => (x === 0 ? 0 : Math.pow(2, 10 * x - 10)),
	easeOutExpo: (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
	easeInOutExpo: (x: number) =>
		x === 0
			? 0
			: x === 1
			? 1
			: x < 0.5
			? Math.pow(2, 20 * x - 10) / 2
			: (2 - Math.pow(2, -20 * x + 10)) / 2,
	easeInCirc: (x: number) => 1 - Math.sqrt(1 - Math.pow(x, 2)),
	easeOutCirc: (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),
	easeInOutCirc: (x: number) =>
		x < 0.5
			? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
			: (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2,
	easeInBack: (x: number) => {
		const c1 = 1.70158
		const c3 = c1 + 1

		return c3 * x * x * x - c1 * x * x
	},
	easeOutBack: (x: number) => {
		const c1 = 1.70158
		const c3 = c1 + 1

		return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
	},
	easeInOutBack: (x: number) => {
		const c1 = 1.70158
		const c2 = c1 * 1.525

		return x < 0.5
			? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
			: (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
	},
}

export const easeKeys = Object.keys(eases) as Ease[]

export const getEase = (type: Ease | number) =>
	typeof type === 'number'
		? eases[easeKeys[type]]
		: (eases[type] satisfies (x: number) => number)
