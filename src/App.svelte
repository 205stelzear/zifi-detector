<script lang="ts">
	import Timer from './lib/Timer.svelte';

	let isActive = false;

	// let secondsBeforeNotMoreIndicator = 20;
	let secondsBeforeNotMoreIndicator = 5;

	function handleTimerEnd() {
		isActive = true;

		setTimeout(() => {
			isActive = false;
		}, secondsBeforeNotMoreIndicator * 1000);
	}
</script>

<main>
	<h1>ZiFi Detector</h1>

	<div class="content">
		<div>
			<img id="wifi-logo" class:active={isActive} src="./wifi.svg" alt="Vite Logo" />
		</div>

		<div>
			<Timer on:end={() => handleTimerEnd()} />
		</div>
	</div>

	<div />
</main>
