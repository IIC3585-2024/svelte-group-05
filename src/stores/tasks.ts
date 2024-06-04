import { writable } from 'svelte/store';
import { supabase } from '../supabaseClient';
import type { Task } from '../ts/interfaces';
import { notifications } from "../utils/notification";

function createTasksStore() {

    async function fetchTasks (userId: string) : Promise<Task[]> {
        const { data, error } = await supabase
            .from('tasks')
            .select()
            .eq('userId', userId)

        if (error) {
            notifications.danger('Something went wrong getting tasks', 2000)
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
                notifications.danger('Something went wrong', 2000)
            } else {
                update((tasks) => [...tasks, data[0]]);
                notifications.success('Task added', 2000)
            }
        },
        delete: async (id: string) => {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id);
            if (error) {
                notifications.danger('Something went wrong', 2000)
            } else {
                update((tasks) => tasks.filter((task) => task.id !== id));
                notifications.success('Task deleted', 2000)
            }
        },
        fetch: async (userId: string) => {
            const tasks = await fetchTasks(userId);
            set(tasks);
        }
    };
}


export const tasks = createTasksStore();