import { writable } from 'svelte/store';
import { supabase } from '../supabaseClient';

function createTasksStore() {

    async function fetchTasks () {
        const { data, error } = await supabase
            .from('tasks')
            .select();
        if (error) {
            console.error('Error fetching tasks:', error.message);
            return [];
        }
        return data;
    }
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        add: async (task) => {
            const { data, error } = await supabase
                .from('tasks')
                .insert(task)
                .select('*')
            if (error) {
                console.error('Error adding task:', error.message);
            } else {
                update((tasks) => [...tasks, data[0]]);
            }
        },
        delete: async (id) => {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id);
            if (error) {
                console.error('Error removing task:', error.message);
            } else {
                update((tasks) => tasks.filter((task) => task.id !== id));
            }
        },
        fetch: async () => {
            const tasks = await fetchTasks();
            set(tasks);
        }
    };
}


export const tasks = createTasksStore();