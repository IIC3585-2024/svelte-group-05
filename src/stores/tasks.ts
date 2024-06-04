import { writable } from 'svelte/store';
import { supabase } from '../supabaseClient';
import type { Task } from '../ts/interfaces';

function createTasksStore() {

    async function fetchTasks (userId: string) : Promise<Task[]> {
        const { data, error } = await supabase
            .from('tasks')
            .select()
            .eq('userId', userId)

        if (error) {
            console.error('Error fetching tasks:', error.message);
            return [];
        }
        return data;
    }
    const { subscribe, set, update } = writable<Task[]>([]);

    return {
        subscribe,
        add: async (task: Task) => {
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
        delete: async (id: string) => {
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
        fetch: async (userId: string) : Promise<Task[]> => {
            const tasks = await fetchTasks(userId);
            set(tasks);
            return tasks;
        }
    };
}


export const tasks = createTasksStore();