import { ScheduleTime } from '.';

export enum Trade {
	StoreRefresh1,
	StoreRefresh2,
	StoreRefresh3,
}

export const trades = [
	Trade.StoreRefresh1,
	Trade.StoreRefresh2,
	Trade.StoreRefresh3,
] satisfies Trade[];

export const getTradeDuration = (value: Trade): Duration => {
	// Store refreshes don't have a "duration" like events, 
	// they just happen instantly, so we return an empty duration.
	return {};
};

export const getTradeTime = (value: Trade): ScheduleTime => {
	switch (value) {
		case Trade.StoreRefresh1:
			return { hours: 5, minutes: 0 }; // 5:00 AM

		case Trade.StoreRefresh2:
			return { hours: 13, minutes: 0 }; // 1:00 PM

		case Trade.StoreRefresh3:
			return { hours: 21, minutes: 0 }; // 9:00 PM
	}
};
