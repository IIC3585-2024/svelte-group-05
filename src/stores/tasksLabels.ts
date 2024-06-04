import { writable } from "svelte/store";
import { supabase } from "../supabaseClient";
import type { CreateTaskLabel, TaskLabel, Task } from "../ts/interfaces";

function createTaskLabelsStore() {
  async function fetchTaskLabels(taskId: string): Promise<TaskLabel[]> {
    const { data, error } = await supabase
      .from("task_labels")
      .select()
      .eq("taskId", taskId);
    if (error) {
      console.error("Error fetching task labels:", error.message);
      return [];
    }
    return data;
  }
  const { subscribe, set, update } = writable<TaskLabel[]>([]);

  return {
    subscribe,
    add: async (taskLabel: CreateTaskLabel) => {
      const { data, error } = await supabase
        .from("task_labels")
        .insert(taskLabel)
        .select("*");
      if (error) {
        console.error("Error adding task labels:", error.message);
      } else {
        update((tasksLabels) => [...tasksLabels, data[0]]);
      }
    },
    delete: async (id: string) => {
      const { error } = await supabase
        .from("task_labels")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Error removing label:", error.message);
      } else {
        update((tasksLabels) =>
          tasksLabels.filter((taskLabel) => taskLabel.id !== id)
        );
      }
    },
    fetch: async (allTaskId: Task[]) => {
      const tasksLabels = await Promise.all(
        allTaskId.map(async (task) => {
          return await fetchTaskLabels(task.id);
        })
      );
      set(tasksLabels.flat());
    },
  };
}

export const tasksLabels = createTaskLabelsStore();
