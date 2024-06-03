import { writable } from 'svelte/store';
import { supabase } from '../supabaseClient';
import type { Label } from '../ts/interfaces';
import { notifications } from "../utils/notification";

function createLabelsStore() {

    async function fetchLabels (userId: string) : Promise<Label[]> {
        const { data, error } = await supabase
          .from("labels")
          .select()
          .eq("userId", userId);
        if (error) {
            notifications.danger('Something went wrong getting labels', 2000)
            return [];
        }
        return data;
    }
    const { subscribe, set, update } = writable<Label[]>([]);

    return {
        subscribe,
        add: async (label: Label) => {
            const { data, error } = await supabase
                .from('labels')
                .insert(label)
                .select('*')
            if (error) {
                notifications.danger('Something went wrong', 2000)
            } else {
                update((labels) => [...labels, data[0]]);
                notifications.success('Label added', 2000)
            }
        },
        delete: async (id:string) => {
            const { error } = await supabase
                .from('labels')
                .delete()
                .eq('id', id);
            if (error) {
                notifications.danger('Something went wrong', 2000)
            } else {
                update((labels) => labels.filter((label) => label.id !== id));
                notifications.success('Project deleted', 2000)
            }
        },
        fetch: async (userId:string) => {
            const labels = await fetchLabels(userId);
            set(labels);
        }
    };
}


export const labels = createLabelsStore();