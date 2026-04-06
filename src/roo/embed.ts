import { formatDuration } from 'date-fns';

import { MatchKind } from './match';
import { Schedule, ScheduleKind, getScheduleTime } from './schedule';
import { Daily } from './schedule/daily';
import { Event } from './schedule/event';
import { Reset } from './schedule/reset';
import { Trade } from './schedule/trade';

// Minimalist color palette
const COLOR_WARNING = 0xffd166; // Warm Yellow for 10-minute warnings
const COLOR_STARTING = 0x06d6a0; // Mint Green for "Starting Now"
const COLOR_INFO = 0x118ab2; // Deep Blue for daily resets/trades

const getEventDetails = (schedule: Schedule): { name: string; emoji: string } => {
	switch (schedule.kind) {
		case ScheduleKind.Daily:
			switch (schedule.value) {
				case Daily.Arena:
					return { name: 'Arena', emoji: '⚔️' };
				case Daily.ExtremeChallenge:
					return { name: 'Extreme Challenge', emoji: '🔥' };
				case Daily.GuildExpedition:
					return { name: 'Guild Expedition', emoji: '🗺️' };
				case Daily.GuildFeast:
					return { name: 'Guild Feast', emoji: '🍖' };
				case Daily.TheGuildLeague:
					return { name: 'The Guild League', emoji: '🛡️' };
				case Daily.ThemedParty:
					return { name: 'Themed Party', emoji: '💃' };
				case Daily.TimeSpaceAbnormality:
					return { name: 'Time-Space Abnormality', emoji: '🌌' };
				case Daily.WarOfEmperium:
					return { name: 'War of Emperium', emoji: '🏰' };
				case Daily.WeekendBanquet:
					return { name: 'Weekend Banquet', emoji: '🥂' };
			}
			break;
		case ScheduleKind.Event:
			return { name: 'Special Event', emoji: '✨' };
		case ScheduleKind.Reset:
			return { name: 'Daily Reset', emoji: '🌅' };
		case ScheduleKind.Trade:
			return { name: 'Trade Reset', emoji: '⚖️' };
	}
	return { name: 'Event', emoji: '📅' };
};

export const generateEmbed = (
	schedule: Schedule,
	matchKind: MatchKind,
	date: Date,
	matchTime: { hours: number; minutes: number },
	duration?: Duration,
): DiscordWebhookEmbed => {
	const { name, emoji } = getEventDetails(schedule);

	let color = COLOR_INFO;
	let statusText = '';

	if (matchKind === MatchKind.StartsIn10Minutes) {
		color = COLOR_WARNING;
		statusText = 'starts in 10 minutes!';
	} else if (matchKind === MatchKind.StartsNow) {
		color = COLOR_STARTING;
		statusText = 'is starting now!';
	}

	let description = `**${name}** ${statusText}`;

	if (duration) {
		// Clean up duration formatting (e.g., "1 hour 10 minutes" -> "1h 10m")
		const formattedDuration = formatDuration(duration)
			.replace(' hours', 'h')
			.replace(' hour', 'h')
			.replace(' minutes', 'm')
			.replace(' minute', 'm');
			
		description += `\n⏳ *Duration: ${formattedDuration}*`;
	}

	return {
		title: `${emoji} ${name}`,
		description,
		color,
	};
};
