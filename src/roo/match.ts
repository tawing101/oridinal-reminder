import { differenceInMinutes, set, startOfMinute } from 'date-fns';

import { ScheduleTime } from './schedule';

export enum MatchKind {
	StartsIn10Minutes,
	StartsNow,
}

export const matchSchedule = (
	time: MaybeArray<ScheduleTime>,
	date: Date,
): { kind: MatchKind; time: ScheduleTime } | undefined => {
	const times = Array.isArray(time) ? time : [time];
	
	// OPTIMIZATION: Strip seconds to prevent missed matches if Cron fires late
	const currentMinute = startOfMinute(date);

	for (const time_ of times) {
		const scheduleDate = set(currentMinute, time_);
		const diff = differenceInMinutes(scheduleDate, currentMinute);

		if (diff === 0) {
			return { kind: MatchKind.StartsNow, time: time_ };
		} else if (diff === 10) {
			return { kind: MatchKind.StartsIn10Minutes, time: time_ };
		}
	}
};
