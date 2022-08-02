<script lang="ts">
	let isActive = false;

	let timer = 3 * 1000;

	export let curr: number;
	export let indicatorSize: number;

	let timeout: number | null = null;

	function handleIndicator() {
		if (timeout) {
			isActive = false;

			clearTimeout(timeout);
			timeout = null;

			return;
		}

		isActive = true;

		timeout = setTimeout(() => {
			isActive = false;
			timeout = null;
		}, timer);
	}
</script>

<div class="indicator" class:active={isActive}>
	<span>{curr + 1} / {indicatorSize}</span>
</div>

<div class="indicator-zone" on:click={(e) => handleIndicator()} />

<style>
	div.indicator {
		display: none;
	}

	div.indicator.active {
		display: inherit;
	}
</style>
