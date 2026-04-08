import { utcToZonedTime } from 'date-fns-tz';

import { generateEmbed } from './roo/embed';
import { MatchKind, matchSchedule } from './roo/match';

import { ROO_TIME_ZONE, Schedule, ScheduleKind, getScheduleDuration, getScheduleTime } from './roo/schedule';
import { getDailies } from './roo/schedule/daily';
import { getEvents } from './roo/schedule/event';
import { getResets } from './roo/schedule/reset';
import { trades } from './roo/schedule/trade';

const scheduled = ((_controller, env, ctx) => {
	const date = utcToZonedTime(Date.now(), ROO_TIME_ZONE);

	const dailies = getDailies(date);
	const events = getEvents(date);
	const resets = getResets(date);

	const schedules = [
		...dailies.map((value): Schedule => ({ kind: ScheduleKind.Daily, value })),
		...events.map((value): Schedule => ({ kind: ScheduleKind.Event, value })),
		...resets.map((value): Schedule => ({ kind: ScheduleKind.Reset, value })),
		...trades.map((value): Schedule => ({ kind: ScheduleKind.Trade, value })),
	] satisfies Schedule[];

	const embeds = [] as KindValue<ScheduleKind, DiscordWebhookEmbed>[];
	let hasStartingNow = false;

	for (const schedule of schedules) {
		const time = getScheduleTime(schedule);
		const match = matchSchedule(time, date);
		
		if (match !== undefined) {
			if (match.kind === MatchKind.StartsNow) {
				hasStartingNow = true;
			}
			const duration = getScheduleDuration(schedule);
			const embed = generateEmbed(schedule, match.kind, date, match.time, duration);
			embeds.push({ kind: schedule.kind, value: embed });
		}
	}

	if (embeds.length > 0) {
		const mention = `<@&${env.DISCORD_ROLE_MENTION_ID}>`;
		const greeting = hasStartingNow ? "It's time to play! 🎉" : "Get ready, everyone! 🌟";

		const payload = {
			content: `Hey ${mention}! ${greeting}`,
			embeds: embeds.map(({ value }) => value),
		} satisfies DiscordWebhookPayload;

		ctx.waitUntil(
			fetch(env.DISCORD_WEBHOOK_URL, {
				body: JSON.stringify(payload),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			})
			.then(async (res) => {
				if (!res.ok) {
					const errorText = await res.text();
					console.error(`Discord API Error (${res.status}): ${errorText}`);
				}
			})
			.catch((err) => {
				console.error('Fetch error when contacting Discord:', err);
			})
		);
	}
}) satisfies ExportedHandlerScheduledHandler<Env>;

export default { scheduled } satisfies ExportedHandler<Env>;
