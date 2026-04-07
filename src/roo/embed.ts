import { formatDuration, getUnixTime, set } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import { MatchKind } from './match';
import { ROO_TIME_ZONE, Schedule, ScheduleKind, ScheduleTime, getScheduleValue } from './schedule';
import { toSpaceSeparatedPascalCase } from '../utilities';
import { Daily } from './schedule/daily';

const colors = {
	[MatchKind.StartsIn5Minutes]: 0xffd166, // Warm yellow
	[MatchKind.StartsNow]: 0x06d6a0, // Mint green
} satisfies Record<MatchKind, number>;

const getEmoji = (kind: ScheduleKind, value?: any) => {
	if (kind === ScheduleKind.Daily) {
		switch (value) {
			case Daily.Arena: return '⚔️';
			case Daily.ExtremeChallenge: return '🔥';
			case Daily.GuildExpedition: return '🗺️';
			case Daily.TheGuildLeague: return '🛡️';
			case Daily.ThemedParty: return '💃';
			case Daily.TimeSpaceAbnormality: return '🌌';
			case Daily.WarOfEmperium: return '🏰';
			case Daily.WeekendBanquet: return '🥂';
		}
	}
	switch (kind) {
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
	const emoji = getEmoji(schedule.kind, schedule.value);

	const startDate = zonedTimeToUtc(set(date, time), ROO_TIME_ZONE);
	const startTimestamp = `<t:${getUnixTime(startDate)}:R>`;

	let status = match === MatchKind.StartsIn5Minutes ? 'starts' : 'is starting';
	let description = `**${titleText}** ${status} ${startTimestamp}!`;

	if (duration && Object.keys(duration).length > 0) {
		const durStr = formatDuration(duration)
			.replace(' hours', 'h').replace(' hour', 'h')
			.replace(' minutes', 'm').replace(' minute', 'm');
		description += `\n⏳ *Duration: ${durStr}*`;
	}

	return {
		title: `${emoji} ${titleText}`,
		description,
		color: colors[match],
		footer: { text: toSpaceSeparatedPascalCase(ScheduleKind[schedule.kind]) }
	};
};
