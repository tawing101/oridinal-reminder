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
	return {};
};

export const getTradeTime = (value: Trade): ScheduleTime => {
	switch (value) {
		case Trade.FirstStoreRefresh:
			return { hours: 4, minutes: 0 }; // 04:00 In-game (Starts at 5:00 AM PH)

		case Trade.SecondStoreRefresh:
			return { hours: 12, minutes: 0 }; // 12:00 In-game (Starts at 1:00 PM PH)

		case Trade.ThirdStoreRefresh:
			return { hours: 20, minutes: 0 }; // 20:00 In-game (Starts at 9:00 PM PH)
	}
};
