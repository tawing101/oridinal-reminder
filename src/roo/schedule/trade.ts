import { ScheduleTime } from '.';

export enum Trade {
	FirstStoreRefresh,
	SecondStoreRefresh,
	ThirdStoreRefresh,
}

export const trades = [
	Trade.FirstStoreRefresh,
	Trade.SecondStoreRefresh,
	Trade.ThirdStoreRefresh,
] satisfies Trade[];

export const getTradeDuration = (value: Trade): Duration => {
	// Store refreshes don't have a duration, so we return an empty object
	return {};
};

export const getTradeTime = (value: Trade): ScheduleTime => {
	switch (value) {
		case Trade.FirstStoreRefresh:
			return { hours: 12, minutes: 0 }; // Alerts at 12:50 PM PH / 1:00 PM PH

		case Trade.SecondStoreRefresh:
			return { hours: 16, minutes: 0 }; // Alerts at 4:50 PM PH / 5:00 PM PH

		case Trade.ThirdStoreRefresh:
			return { hours: 20, minutes: 0 }; // Alerts at 8:50 PM PH / 9:00 PM PH
	}
};
