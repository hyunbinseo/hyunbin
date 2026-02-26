export const copyZwsp = () => {
	navigator.clipboard.writeText('\u200B');
	alert('ZWSP가 복사되었습니다.');
};

// NOTE Avoid editing this or check the final build
// Uncaught SyntaxError: illegal character U+0010
export const generatePINString = (length = 6) => {
	let pin = '';
	while (pin.length < length) {
		const [v] = crypto.getRandomValues(new Uint32Array(1));
		if (!v) continue;
		pin += v.toString().at(-1);
	}
	prompt('무작위 숫자 문자열:', pin);
};

export const getViewportSize = () => {
	prompt(
		'뷰포트 크기:',
		[
			window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
			window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
		].join(' x '),
	);
};

export const normalizeString = () => {
	let string = prompt('자소가 분리된 문자열을 입력하세요.');
	if (!string) return;

	const normalized = string.normalize('NFC');
	prompt(
		normalized !== string ? '다음 값을 복사해 사용하세요.' : '자소가 분리되어 있지 않습니다.',
		normalized,
	);
};

export const snuLibraryProxy = () => {
	location.href = `https://libproxy.snu.ac.kr/link.n2s?url=${encodeURIComponent(location.href)}`;
};

export const snuSugangEnter = () => {
	if (location.hostname !== 'sugang.snu.ac.kr') {
		alert('서울대학교 수강신청 사이트가 아닙니다.');
		return;
	}
	document.cookie = 'enter=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	location.reload();
};
