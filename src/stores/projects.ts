import { writable } from 'svelte/store';
import { supabase} from '../supabaseClient';
import type { Project } from '../ts/interfaces';

function createProjectsStore() {

    async function fetchProjects (userId: string) : Promise<Project[]> {
        const { data, error } = await supabase
            .from('projects')
            .select()
            .eq('userId', userId)
        if (error) {
            console.error('Error fetching projects:', error.message);
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
                console.error('Error adding project:', error.message);
            } else {
                update((projects) => [...projects, data[0]]);
            }
        },
        delete: async (id:string) => {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);
            if (error) {
                console.error('Error removing project:', error.message);
            } else {
                update((projects) => projects.filter((project) => project.id !== id));
            }
        },
        fetch: async (userId: string) => {
            const projects = await fetchProjects(userId);
            set(projects);
        }
    };
}


export const projects = createProjectsStore();