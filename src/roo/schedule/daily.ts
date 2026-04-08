import { ScheduleTime } from '.';

export enum Daily {
	ExtremeChallenge,
	GuildExpedition,
	TheGuildLeague,
	ThemedParty,
	TimeSpaceAbnormality,
	WarOfEmperium,
	WeekendBanquet,
}

export const getDailies = (date: Date): Daily[] => {
	const day = date.getDay(); 

	switch (day) {
		case 0: // Sunday
			return [Daily.ThemedParty, Daily.GuildExpedition, Daily.WarOfEmperium];
		case 1: // Monday
			return [Daily.ExtremeChallenge];
		case 2: // Tuesday
			return [Daily.TimeSpaceAbnormality, Daily.TheGuildLeague];
		case 3: // Wednesday
			return []; // Arena removed
		case 4: // Thursday
			return [Daily.GuildExpedition, Daily.TheGuildLeague];
		case 5: // Friday
			return []; 
		case 6: // Saturday
			return [Daily.WeekendBanquet, Daily.TimeSpaceAbnormality, Daily.TheGuildLeague];
		default:
			return [];
	}
};

export const getDailyDuration = (value: Daily): Duration => {
	switch (value) {
		case Daily.GuildExpedition:
		case Daily.WeekendBanquet: return { minutes: 20 };
		case Daily.ExtremeChallenge: return { hours: 19 };
		case Daily.TheGuildLeague: return { minutes: 25 };
		case Daily.ThemedParty: return { minutes: 30 };
		case Daily.TimeSpaceAbnormality: return { minutes: 13 };
		case Daily.WarOfEmperium: return { hours: 1, minutes: 10 };
		default: return {};
	}
};

export const getDailyTime = (value: Daily): ScheduleTime => {
	switch (value) {
		case Daily.ExtremeChallenge:
			return { hours: 5, minutes: 0 };
		case Daily.ThemedParty:
		case Daily.WeekendBanquet:
			return { hours: 20, minutes: 0 };
		case Daily.TheGuildLeague:
			return { hours: 19, minutes: 55 }; // Fixed per in-game time
		case Daily.GuildExpedition:
		case Daily.TimeSpaceAbnormality:
			return { hours: 20, minutes: 30 };
		case Daily.WarOfEmperium:
			return { hours: 21, minutes: 20 };
		default:
			return { hours: 0, minutes: 0 };
	}
};
