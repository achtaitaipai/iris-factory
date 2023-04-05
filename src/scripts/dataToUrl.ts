import {
	compressToEncodedURIComponent as compress,
	decompressFromEncodedURIComponent as decompress,
} from 'lz-string'
import type { Palette } from './palette'

let timer: ReturnType<typeof setTimeout> | undefined = undefined

export const getUrlWithData = (data: string) => {
	const compressedData = compress(data)
	return '?d=' + compressedData
}

export const getDatasFromUrl = () => {
	const params = new URLSearchParams(window.location.search)
	const compressed = params.get('d')
	if (!compressed) return
	const json = decompress(compressed)
	return JSON.parse(json) as Palette[]
}
