import { writable } from 'svelte/store';
import { supabase} from '../supabaseClient';
import type { Project } from '../ts/interfaces';
import { notifications } from "../utils/notification";

function createProjectsStore() {

    async function fetchProjects (userId: string) : Promise<Project[]> {
        const { data, error } = await supabase
            .from('projects')
            .select()
            .eq('userId', userId)
        if (error) {
            notifications.danger('Something went wrong getting projects', 2000)
            return [];
        }
        return data;
    }
    const { subscribe, set, update } = writable<Project[]>([]);

    return {
        subscribe,
        add: async (project: Project) => {
            const { data, error } = await supabase
                .from('projects')
                .insert(project)
                .select('*')

            if (error) {
                notifications.danger('Something went wrong', 2000)
            } else {
                update((projects) => [...projects, data[0]]);
                notifications.success('Project added', 2000)
            }
        },
        delete: async (id:string) => {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);
            if (error) {
                notifications.danger('Something went wrong', 2000)
            } else {
                update((projects) => projects.filter((project) => project.id !== id));
                notifications.success('Project deleted', 2000)
            }
        },
        fetch: async (userId: string) => {
            const projects = await fetchProjects(userId);
            set(projects);
        }
    };
}


export const projects = createProjectsStore();