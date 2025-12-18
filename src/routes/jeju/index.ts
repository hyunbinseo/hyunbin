export const wmoCodes = [
	0, //
	1,
	2,
	3,
	45,
	48,
	51,
	53,
	55,
	56,
	57,
	61,
	63,
	65,
	66,
	67,
	71,
	73,
	75,
	77,
	80,
	81,
	82,
	85,
	86,
	95,
	96,
	99,
] as const;

export type WmoCode = (typeof wmoCodes)[number];

export const wmoCodeToEmoji = (code: WmoCode) => {
	if (code === 0) return '☀️';
	if (code === 1) return '🌤️';
	if (code === 2) return '⛅';
	if (code === 3) return '☁️';
	if (code === 45 || code === 48) return '🌫️';

	if (
		code === 51 ||
		code === 53 ||
		code === 55 ||
		code === 56 ||
		code === 57 ||
		code === 61 ||
		code === 63 ||
		code === 65 ||
		code === 66 ||
		code === 67 ||
		code === 80 ||
		code === 81 ||
		code === 82
	)
		return '🌧️';

	if (
		code === 71 || //
		code === 73 ||
		code === 75 ||
		code === 77 ||
		code === 85 ||
		code === 86
	)
		return '❄️';

	if (
		code === 95 || //
		code === 96 ||
		code === 99
	)
		return '⛈️';

	return '❓';
};
