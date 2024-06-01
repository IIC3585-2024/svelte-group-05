import { writable } from 'svelte/store';
import { supabase } from '../supabaseClient';

function createProjectsStore() {

    async function fetchProjects () {
        const { data, error } = await supabase
            .from('projects')
            .select();
        if (error) {
            console.error('Error fetching projects:', error.message);
            return [];
        }
        return data;
    }
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        add: async (project) => {
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
        delete: async (id) => {
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
        fetch: async () => {
            const projects = await fetchProjects();
            set(projects);
        }
    };
}


export const projects = createProjectsStore();