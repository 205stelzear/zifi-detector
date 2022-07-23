<script lang="ts">
	import Timer from './lib/Timer.svelte';

	let isActive = false;

	let ringScale = 1.2;
	let ringSpeed = 4000;
	let ringThickness = 70;

	// let secondsBeforeNotMoreIndicator = 20;
	let secondsBeforeNotMoreIndicator = 5;

	async function handleTimerEnd() {
		isActive = true;

		// notifyAudio();

		setTimeout(() => {
			isActive = false;
		}, secondsBeforeNotMoreIndicator * 1000);
	}

	const audio = new Audio('./beeps.ogg');

	function notifyAudio() {
		return audio.play();
	}
</script>

<main>
	<h1>ZiFi Detector</h1>

	<div class="content">
		<div>
			<div
				class="wifi-logo"
				class:active={isActive}
				style="
				--ring-scale: {ringScale};
				--ring-speed: {ringSpeed}ms;
				--ring-thickness: {ringThickness}%;
			"
			/>
		</div>

		<div>
			<Timer on:end={() => handleTimerEnd()} />
		</div>
	</div>
</main>
