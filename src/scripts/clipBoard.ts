export const copyToClipBoard = async (
	text: string,
	onSuccess?: () => void,
	onFailed?: () => void
) => {
	if (!navigator?.clipboard) {
		if (onFailed) onFailed()
		return false
	}
	try {
		await navigator.clipboard.writeText(text)
		if (onSuccess) onSuccess()
		return true
	} catch (error) {
		if (onFailed) onFailed()
		return false
	}
}
