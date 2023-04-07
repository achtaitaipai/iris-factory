export const uniqueName = (name: string, names: string[], index?: number) => {
	if (!exists(name, names, index)) return name
	const baseName = name.replace(/-\d+$/, '')
	let uniqueName = baseName + '-0'
	let count = 1
	while (exists(uniqueName, names, index)) {
		uniqueName = `${baseName}-${count}`
		count++
	}
	return uniqueName
}

export const exists = (name: string, names: string[], index?: number) =>
	names.findIndex((n, i) => n === name && i !== index) !== -1
