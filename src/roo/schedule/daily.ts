import { ScheduleTime } from '.';

export enum Daily {
	DimensionDrill,
	EmperiumOverrun,
	ExtremeChallenge,
	TheGuildLeague,
	ThemedParty,
}

export const getDailies = (date: Date): Daily[] => {
	const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

	switch (day) {
		case 0: // Sunday
			return [Daily.ThemedParty, Daily.EmperiumOverrun];
		case 1: // Monday
			return [Daily.ExtremeChallenge, Daily.DimensionDrill];
		case 2: // Tuesday
			return [Daily.TheGuildLeague];
		case 3: // Wednesday
			return [Daily.DimensionDrill];
		case 4: // Thursday
			return [Daily.TheGuildLeague];
		case 5: // Friday
			return []; // Empty/None
		case 6: // Saturday
			return [Daily.TheGuildLeague];
		default:
			return [];
	}
};

export const getDailyDuration = (value: Daily): Duration => {
	switch (value) {
		case Daily.DimensionDrill: return { minutes: 15 };
		case Daily.EmperiumOverrun: return { hours: 1 }; 
		case Daily.ExtremeChallenge: return { hours: 24 }; // Started at 00:00
		case Daily.TheGuildLeague: return { minutes: 25 };
		case Daily.ThemedParty: return { minutes: 30 };
		default: return {};
	}
};

export const getDailyTime = (value: Daily): ScheduleTime => {
	switch (value) {
		case Daily.ExtremeChallenge:
			return { hours: 0, minutes: 0 }; // 00:00
		case Daily.ThemedParty:
			return { hours: 19, minutes: 30 }; // 19:30
		case Daily.DimensionDrill:
		case Daily.EmperiumOverrun:
		case Daily.TheGuildLeague:
			return { hours: 19, minutes: 55 }; // 19:55
		default:
			return { hours: 0, minutes: 0 };
	}
};
