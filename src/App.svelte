<script lang="ts">
	import Timer from './lib/Timer.svelte';

	let isActive = false;
	
	let curr = 4;
	
	const ringScaleArr = [1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 2.2, 2.2];
	const ringSpeedArr = [4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 2000, 2000, 1700];
	const ringThicknessArr = [35, 40, 40, 45, 50, 50, 50, 55, 55, 60, 60, 65, 70, 70, 80];

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

	function handleLeftControl() {
		curr = Math.max(curr - 1, 0);
	}
	function handleRightControl() {
		curr = Math.min(curr + 1, 14);
	}
</script>

<main>
	<h1>ZiFi Detector</h1>

	<div class="content">
		<div>
			<div
				class="wifi-logo"
				class:active={isActive}
				style="--ring-scale: {ringScaleArr[curr]}; --ring-speed: {ringSpeedArr[curr]}ms; --ring-thickness: {ringThicknessArr[curr]}%;"
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
