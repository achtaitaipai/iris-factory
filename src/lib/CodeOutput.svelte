<script lang="ts">
	import { buildCss } from '../scripts/css'
	import { getUrlWithData } from '../scripts/dataToUrl'
	import { buildPalette, type Palette } from '../scripts/palette'

	export let palettes: Palette[]
	let css = ''

	$: {
		css = buildCss(
			palettes.map((p) => ({
				name: p.name,
				colors: buildPalette(p),
			}))
		)
	}
</script>

<pre><code
		>{css}
</code></pre>

<style>
	pre {
		background-color: var(--surface-1);
		padding-inline: var(--s-l);
		padding-block: var(--s-m);
		border: 1px solid var(--border-2);
		border-radius: 0.8rem;
	}
</style>
