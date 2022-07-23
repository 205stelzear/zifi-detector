/* eslint-disable @typescript-eslint/no-magic-numbers */
export function formatNumberToTime(num: number) {
	const minutes = Math.floor(num / 60);
	const seconds = num - minutes * 60;

	const fMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const fSeconds = seconds < 10 ? `0${seconds}` : seconds;

	return `${fMinutes}:${fSeconds}`;
}
