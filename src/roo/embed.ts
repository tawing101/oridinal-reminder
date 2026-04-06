import { add, formatDuration, getUnixTime, set } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { MatchKind } from './match';
import { ROO_TIME_ZONE, Schedule, ScheduleKind, ScheduleTime, getScheduleValue } from './schedule';

import { toSpaceSeparatedPascalCase } from '../utilities';

const colors = {
	[MatchKind.StartsIn10Minutes]: 0xffd166, // warm yellow for "get ready"
	[MatchKind.StartsNow]: 0x06d6a0, // mint green for "starting now"
} satisfies Record<MatchKind, number>;

const getEmoji = (kind: ScheduleKind) => {
	switch (kind) {
		case ScheduleKind.Daily: return '⚔️';
		case ScheduleKind.Event: return '✨';
		case ScheduleKind.Reset: return '🌅';
		case ScheduleKind.Trade: return '⚖️';
		default: return '📅';
	}
};

export const generateEmbed = (
	schedule: Schedule,
	match: MatchKind,
	date: Date,
	time: ScheduleTime,
	duration?: Duration,
): DiscordWebhookEmbed => {
	const titleText = toSpaceSeparatedPascalCase(getScheduleValue(schedule));
	const footerText = toSpaceSeparatedPascalCase(ScheduleKind[schedule.kind]);
	const emoji = getEmoji(schedule.kind);

	const startDate = zonedTimeToUtc(set(date, time), ROO_TIME_ZONE);
	const start = toDiscordTimestamp(startDate);

	let status = match === MatchKind.StartsIn10Minutes ? 'starts' : 'is starting';
	let description = `**${titleText}** ${status} ${start}!`;

	if (duration !== undefined) {
		const duration_ = formatDuration(duration, { format: ['hours', 'minutes'] })
			.replace(' hours', 'h').replace(' hour', 'h')
			.replace(' minutes', 'm').replace(' minute', 'm');
			
		description += `\n⏳ *Duration: ${duration_}*`;
	}

	return {
		title: `${emoji} ${titleText}`,
		description,
		footer: { text: footerText, icon_url: 'https://b.cgas.io/mVhvd_L8tHq1.png' },
		color: colors[match],
	};
};

const toDiscordTimestamp = (date: Date) => {
	const unixTime = getUnixTime(date);
	// Minimal relative timestamp: "in 10 minutes" or "a few seconds ago"
	return `<t:${unixTime}:R>`;
};
