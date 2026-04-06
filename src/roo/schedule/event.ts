import { ScheduleTime } from '.';

// Removed expired 2023 events. Add future limited-time events to this enum.
export enum Event {
	None, // Placeholder to satisfy TypeScript compilation
}

export const getEvents = (date: Date): Event[] => {
	// Returns empty array because there are no limited-time events active
	return [];
};

export const getEventDuration = (value: Event): Duration => {
	return {};
};

export const getEventTime = (value: Event): MaybeArray<ScheduleTime> => {
	return [];
};
