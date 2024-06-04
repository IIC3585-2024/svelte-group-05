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
    add: async (task_label: CreateTaskLabel) => {
      console.log("Adding task labels:", task_label);
      const { data, error } = await supabase
        .from("task_labels")
        .insert(task_label)
        .select("*");
      if (error) {
        console.error("Error adding task labels:", error.message);
      } else {
        update((task_labels) => [...task_labels, data[0]]);
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
        update((task_labels) =>
          task_labels.filter((task_label) => task_label.id !== id)
        );
      }
    },
    fetch: async (allTaskId: Task[]) => {
      const task_labels = await Promise.all(
        allTaskId.map(async (task) => {
          return await fetchTaskLabels(task.id);
        })
      );
      set(task_labels.flat());
    },
  };
}

export const task_labels = createTaskLabelsStore();
