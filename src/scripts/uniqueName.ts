export const uniqueName = (name: string, names: string[]) => {
	if (names.filter((n) => n === name).length <= 1) return name
	const baseName = name.replace(/-\d+$/, '')
	let uniqueName = baseName + '-0'
	let count = 1
	while (names.includes(uniqueName)) {
		uniqueName = `${baseName}-${count}`
		count++
	}
	return uniqueName
}
