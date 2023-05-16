<script lang="ts">
	import Indicator from './lib/Indicator.svelte';
	import Timer from './lib/Timer.svelte';

	let isPulsing = false;

	let curr = 4;

	type Ring = {
		scale: number;
		speed: number;
		thickness: number;
	};

	const rings: Ring[] = [
		{ scale: 1, speed: 4000, thickness: 35 },
		{ scale: 1.1, speed: 3800, thickness: 40 },
		{ scale: 1.2, speed: 3400, thickness: 40 },
		{ scale: 1.3, speed: 3300, thickness: 45 },
		{ scale: 1.3, speed: 3200, thickness: 50 },
		{ scale: 1.3, speed: 3100, thickness: 50 },
		{ scale: 1.5, speed: 3000, thickness: 50 },
		{ scale: 1.5, speed: 2500, thickness: 55 },
		{ scale: 1.7, speed: 2500, thickness: 55 },
		{ scale: 1.8, speed: 2300, thickness: 60 },
		{ scale: 1.8, speed: 2200, thickness: 60 },
		{ scale: 2.0, speed: 2100, thickness: 65 },
		{ scale: 2.0, speed: 2000, thickness: 70 },
		{ scale: 2.2, speed: 1500, thickness: 75 },
		{ scale: 2.2, speed: 500, thickness: 90 },
	];

	let secondsBeforeNotMoreIndicator = 20;
	// let secondsBeforeNotMoreIndicator = 5;

	let finishInterval: number | null = null;

	async function handleTimerEnd() {
		isPulsing = true;

		if (curr == rings.length - 1) {
			if (finishInterval) {
				return;
			}

			notifyAudio();

			finishInterval = setInterval(() => {
				notifyAudio();
			}, 3000);
		} else {
			if (finishInterval) {
				clearInterval(finishInterval);
				finishInterval = null;
			}

			notifyAudio();

			setTimeout(() => {
				isPulsing = false;
			}, secondsBeforeNotMoreIndicator * 1000);
		}
	}

	const audio = new Audio('./beeps.ogg');

	function notifyAudio() {
		return audio.play();
	}

	function handleLeftControl() {
		curr = Math.max(curr - 1, 0);
	}
	function handleRightControl() {
		curr = Math.min(curr + 1, rings.length - 1);
	}
</script>

<main>
	<h1>ZiFi Detector</h1>

	<div class="content">
		<div>
			<div
				class="wifi-logo"
				class:pulsing={isPulsing}
				style="--ring-scale: {rings[curr]?.scale}; --ring-speed: {rings[curr]?.speed}ms; --ring-thickness: {rings[curr]?.thickness}%;"
			/>
		</div>

		<div>
			<Timer on:end={() => handleTimerEnd()} />
		</div>
	</div>
</main>

<div class="controls">
	<div class="left" on:click={(e) => handleLeftControl()} />
	<div class="right" on:click={(e) => handleRightControl()} />
</div>

<Indicator {curr} indicatorSize={rings.length} />
