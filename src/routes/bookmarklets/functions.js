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
