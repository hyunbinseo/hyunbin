import { isHoliday } from '@hyunbinseo/holidays-kr';

export const days: Readonly<string[]> = ['일', '월', '화', '수', '목', '금', '토'];

type FormatDateOptions = { date: Date; dayOne: boolean; nextMonth: boolean };

export const formatDateString = (options?: Partial<FormatDateOptions>) => {
	const defaultOptions = {
		date: new Date(),
		dayOne: false,
		nextMonth: false,
	} satisfies FormatDateOptions;

	const { date, dayOne, nextMonth } = { ...defaultOptions, ...options };

	if (nextMonth) date.setMonth(date.getMonth() + 1);

	return [
		date.getFullYear(),
		(date.getMonth() + 1).toString().padStart(2, '0'),
		dayOne ? '01' : date.getDate().toString().padStart(2, '0'),
	].join('-');
};

const getMonthInUtc0 = (date: Date) => Number(date.toISOString().substring(5, 7));

export const getDates = ({
	startDate,
	selectedDays,
	excludeHolidays,
	limitToCurrentMonth,
	totalCount,
}: {
	startDate: string;
	selectedDays: number[];
	excludeHolidays: boolean;
	limitToCurrentMonth: boolean;
	totalCount: number;
}) => {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) throw new TypeError();

	if (!startDate || !selectedDays.length) return [];

	const dates: string[] = [];

	let date = new Date(`${startDate}T09:00:00`);
	const startMonth = getMonthInUtc0(date);

	if (Number.isNaN(date.getTime()) || !startMonth) return [];

	while (limitToCurrentMonth ? true : dates.length < totalCount) {
		if (limitToCurrentMonth && getMonthInUtc0(date) !== startMonth) break;

		const dayIndex = days.indexOf(
			date.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', weekday: 'short' }),
		);

		if (dayIndex === -1) throw new Error();

		if (selectedDays.includes(dayIndex) && (!excludeHolidays ? true : !isHoliday(date))) {
			dates.push(
				date.toLocaleDateString('ko-KR', {
					timeZone: 'Asia/Seoul',
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					weekday: 'short',
				}),
			);
		}

		date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
	}

	return dates;
};
