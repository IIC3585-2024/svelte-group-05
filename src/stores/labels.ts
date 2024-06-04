import { writable } from 'svelte/store';
import { supabase } from '../supabaseClient';
import type { Label, CreateLabel  } from '../ts/interfaces';

function createLabelsStore() {

    async function fetchLabels (userId: string) : Promise<Label[]> {
        const { data, error } = await supabase
          .from("labels")
          .select()
          .eq("userId", userId);
        if (error) {
            console.error('Error fetching labels:', error.message);
            return [];
        }
        return data;
    }
    const { subscribe, set, update } = writable<Label[]>([]);

    return {
        subscribe,
        add: async (label: CreateLabel) => {
            console.log('Adding label:', label);
            const { data, error } = await supabase
                .from('labels')
                .insert(label)
                .select('*')
            if (error) {
                console.error('Error adding label:', error.message);
            } else {
                update((labels) => [...labels, data[0]]);
            }
        },
        delete: async (id: string) => {
            const { error } = await supabase
                .from('labels')
                .delete()
                .eq('id', id);
            if (error) {
                console.error('Error removing label:', error.message);
            } else {
                update((labels) => labels.filter((label) => label.id !== id));
            }
        },
        fetch: async (userId: string) => {
            const labels = await fetchLabels(userId);
            set(labels);
        }
    };
}


export const labels = createLabelsStore();