import { ScheduleTime } from '.';

export enum Daily {
	Arena,
	ExtremeChallenge,
	GuildExpedition,
	TheGuildLeague,
	ThemedParty,
	TimeSpaceAbnormality,
	WarOfEmperium,
	WeekendBanquet,
}

export const getDailies = (date: Date): Daily[] => {
	const day = date.getDay() as Day;

	switch (day) {
		case 0:
			// sunday
			return [Daily.ThemedParty, Daily.GuildExpedition, Daily.WarOfEmperium];

		case 1:
			// monday
			return [Daily.ExtremeChallenge];

		case 2:
			// tuesday
			return [Daily.TimeSpaceAbnormality, Daily.TheGuildLeague];

		case 3:
			// wednesday
			return [Daily.Arena];

		case 4:
			// thursday
			return [Daily.GuildExpedition, Daily.TheGuildLeague];

		case 5:
			// friday
			return [];

		case 6:
			// saturday
			return [Daily.WeekendBanquet, Daily.TimeSpaceAbnormality, Daily.TheGuildLeague];
	}
};

export const getDailyDuration = (value: Daily): Duration => {
	switch (value) {
		case Daily.Arena:
			return { minutes: 35 };

		case Daily.GuildExpedition:
		case Daily.WeekendBanquet:
			return { minutes: 20 };

		case Daily.ExtremeChallenge:
			return { hours: 19 };

		case Daily.TheGuildLeague:
			return { minutes: 25 };

		case Daily.ThemedParty:
			return { minutes: 30 };

		case Daily.TimeSpaceAbnormality:
			return { minutes: 13 };

		case Daily.WarOfEmperium:
			return { hours: 1, minutes: 10 };
	}
};

export const getDailyTime = (value: Daily): ScheduleTime => {
	switch (value) {
		case Daily.ExtremeChallenge:
			return { hours: 5, minutes: 0 };

		case Daily.ThemedParty:
		case Daily.WeekendBanquet:
			return { hours: 20, minutes: 0 };

		case Daily.Arena:
			return { hours: 20, minutes: 25 };

		case Daily.GuildExpedition:
		case Daily.TimeSpaceAbnormality:
			return { hours: 20, minutes: 30 };

		case Daily.TheGuildLeague:
			return { hours: 20, minutes: 55 };

		case Daily.WarOfEmperium:
			return { hours: 21, minutes: 20 };
	}
};
