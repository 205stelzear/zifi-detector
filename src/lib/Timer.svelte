<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { formatNumberToTime } from '../utils/time';

	export let defaultTimer: number = 2.5 * 60;
	// export let defaultTimer: number = 10;

	const dispatch = createEventDispatcher();

	let timer: number = defaultTimer;

	$: fTimer = formatNumberToTime(timer);

	function decreaseTimer() {
		timer--;

		if (timer == 0) {
			dispatch('end');

			timer = defaultTimer;
		}
	}

	onMount(() => {
		const interval = setInterval(() => decreaseTimer(), 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<p class="timer">{fTimer}</p>

<style>
	.timer {
		color: #888;
		font-size: 6em;
	}
</style>
