import './app.css'
import App from './App.svelte'

// const worker = new Worker(new URL('./worker/index.js', import.meta.url))
if ('serviceWorker' in navigator && import.meta.env.MODE === 'production') {
	navigator.serviceWorker.register('/iris-factory/sw.js')
}
const app = new App({
	target: document.getElementById('app'),
})

console.log('🪓🍵🍵💨')

export default app
