import { writable } from 'svelte/store'
import { getDatasFromUrl } from '../dataToUrl'

const initialSteps = () => getDatasFromUrl()?.steps ?? 13

export const steps = writable(initialSteps())
