<script lang="ts">
	import Indicator from './lib/Indicator.svelte';
	import Timer from './lib/Timer.svelte';

	let isPulsing = false;

	let curr = 4;

	const ringScaleArr = [1, 1.1, 1.2, 1.3, 1.3, 1.3, 1.5, 1.5, 1.7, 1.8, 1.8, 2.0, 2.0, 2.2, 2.2];
	const ringSpeedArr = [4000, 3800, 3400, 3300, 3200, 3100, 3000, 2500, 2500, 2300, 2200, 2100, 2000, 1500, 500];
	const ringThicknessArr = [35, 40, 40, 45, 50, 50, 50, 55, 55, 60, 60, 65, 70, 75, 90];

	let secondsBeforeNotMoreIndicator = 20;
	// let secondsBeforeNotMoreIndicator = 5;

	let finishInterval: number | null = null;

	async function handleTimerEnd() {
		isPulsing = true;

		if (curr == ringScaleArr.length - 1) {
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
		curr = Math.min(curr + 1, 14);
	}
</script>

<main>
	<h1>ZiFi Detector</h1>

	<div class="content">
		<div>
			<div
				class="wifi-logo"
				class:pulsing={isPulsing}
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

<Indicator {curr} indicatorSize={ringScaleArr.length} />
