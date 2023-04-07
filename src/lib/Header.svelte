<header>
	<h1>
		<a href="./"> Iris-Factory </a>
	</h1>
	<nav>
		<a
			href="https://github.com/achtaitaipai/iris-factory#readme"
			target="_blank"
			title="github"
		>
			<svg width="1em" height="1em" viewBox="0 0 16 16">
				<path
					fill="currentColor"
					d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
				/>
			</svg>
		</a>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: var(--s-xs);
		padding-inline: var(--s-m);
		background-color: var(--surface-1);
		border-bottom: 1px solid var(--border-2);
	}
	h1 a {
		color: var(--text-accent-1);
	}

	h1 a:where(:hover, :focus-visible) {
		color: var(--text-accent-2);
	}
	@supports (background-clip: text) or (-webkit-background-clip: text) {
		h1 a {
			background-image: linear-gradient(
				to bottom right,
				var(--text-accent-2) 30%,
				var(--surface-1) 100%
			);
			background-clip: text;
			-webkit-background-clip: text;
			color: transparent;
		}
		h1 a:where(:hover, :focus-visible) {
			color: transparent;
		}
	}
	nav a {
		color: var(--text-3);
		font-size: var(--fs-2);
	}

	nav a:where(:hover, :focus) {
		color: var(--text-accent-2);
	}
</style>
