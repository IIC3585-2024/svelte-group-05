import { writable } from "svelte/store";
import { notifications } from "../utils/notification";
import type { Holiday } from "../ts/interfaces";

function createHolidaysStore() {
  async function fetchHolidays(year: string): Promise<Holiday[]> {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/CL`);
    const data = await response.json();
    if (data.errors) {
      notifications.danger("Something went wrong getting holidays", 2000);
      return [];
    }
    return data;
  }
  const { subscribe, set, update } = writable<Holiday[]>([]);

  return {
    subscribe,
    add: async (year: string) => {
        const holidays = await fetchHolidays(year); 
        if (holidays.length === 0) {
            notifications.danger("Something went wrong", 2000);
        } else {
            update((currentHolidays) => [...currentHolidays, ...holidays]);
            // notifications.success("Holidays added", 2000);
        }
    },
    fetch: async (year: string) => {
      const holidays = await fetchHolidays(year);
      set(holidays);
    },
  };
}

export const holidays = createHolidaysStore();
