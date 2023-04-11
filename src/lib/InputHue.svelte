<script lang="ts">
	export let value:number 
</script>

<label>
	Hue {value}°
	<input type="range" bind:value min="0" max="360" />
</label>

<style>
	label {
		display: grid;
		gap: var(--s-2xs);
		/* width: 20rem; */
	}
	input {
		appearance: none;
	}
	input::-webkit-slider-thumb {
		appearance: none;
		height: 120%;
		width: 8px;
		aspect-ratio: 1;
		transform: translateY(-10%);
		border: 2px solid var(--text-1);
	}
	input::-webkit-slider-runnable-track {
		border-radius: 0.5rem;
		height: 1.5em;
		background: linear-gradient(
			to right,
			rgb(228, 0, 123),
			rgb(229, 0, 114),
			rgb(230, 0, 105),
			rgb(231, 0, 96),
			rgb(231, 0, 87),
			rgb(232, 0, 78),
			rgb(233, 0, 68),
			rgb(233, 0, 57),
			rgb(234, 0, 45),
			rgb(234, 0, 30),
			rgb(235, 0, 7),
			rgb(223, 47, 0),
			rgb(210, 67, 0),
			rgb(200, 79, 0),
			rgb(191, 87, 0),
			rgb(183, 93, 0),
			rgb(176, 98, 0),
			rgb(169, 102, 0),
			rgb(163, 106, 0),
			rgb(157, 109, 0),
			rgb(151, 112, 0),
			rgb(145, 114, 0),
			rgb(139, 116, 0),
			rgb(134, 119, 0),
			rgb(128, 121, 0),
			rgb(122, 123, 0),
			rgb(115, 125, 0),
			rgb(109, 126, 0),
			rgb(101, 128, 0),
			rgb(93, 130, 0),
			rgb(83, 132, 0),
			rgb(72, 134, 0),
			rgb(57, 136, 0),
			rgb(34, 137, 0),
			rgb(0, 139, 18),
			rgb(0, 138, 40),
			rgb(0, 138, 55),
			rgb(0, 138, 66),
			rgb(0, 137, 76),
			rgb(0, 137, 84),
			rgb(0, 136, 91),
			rgb(0, 136, 97),
			rgb(0, 136, 103),
			rgb(0, 135, 108),
			rgb(0, 135, 113),
			rgb(0, 135, 118),
			rgb(0, 135, 122),
			rgb(0, 134, 126),
			rgb(0, 134, 130),
			rgb(0, 134, 133),
			rgb(0, 133, 137),
			rgb(0, 133, 140),
			rgb(0, 133, 144),
			rgb(0, 132, 147),
			rgb(0, 132, 150),
			rgb(0, 132, 154),
			rgb(0, 131, 157),
			rgb(0, 131, 161),
			rgb(0, 131, 165),
			rgb(0, 130, 169),
			rgb(0, 130, 173),
			rgb(0, 129, 177),
			rgb(0, 128, 182),
			rgb(0, 128, 187),
			rgb(0, 127, 193),
			rgb(0, 126, 200),
			rgb(0, 125, 207),
			rgb(0, 123, 215),
			rgb(0, 122, 224),
			rgb(0, 120, 236),
			rgb(0, 117, 249),
			rgb(42, 113, 255),
			rgb(71, 109, 255),
			rgb(92, 104, 255),
			rgb(110, 99, 255),
			rgb(126, 92, 255),
			rgb(142, 84, 255),
			rgb(158, 73, 255),
			rgb(172, 62, 249),
			rgb(185, 50, 240),
			rgb(196, 35, 231),
			rgb(207, 8, 222),
			rgb(212, 0, 208),
			rgb(215, 0, 194),
			rgb(218, 0, 182),
			rgb(220, 0, 171),
			rgb(222, 0, 160),
			rgb(224, 0, 150),
			rgb(225, 0, 141),
			rgb(227, 0, 132)
		);
	}
</style>
