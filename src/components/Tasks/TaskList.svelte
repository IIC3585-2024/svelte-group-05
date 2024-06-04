<script lang="ts">
  import TaskItem from "./TaskItem.svelte";
  import {
    calculateTotalTime,
    groupTasksByWeek,
    formatTotalTime,
  } from "../../utils/functions";

  export let tasks: Task[] = [];
  $: groupedTasks = groupTasksByWeek(tasks);

  import type { Task } from "../../ts/interfaces";

</script>

{#if !tasks.length}
  <p class="text-center mt-8 text-3xl text-gray-500">🙈 No tasks found 🏖️</p>
{:else}
  <div class="space-y-4">
    {#each Object.entries(groupedTasks) as [week, _tasks]}
      <div
        class="flex flex-row items-center justify-between p-4 mb-2 rounded-lg"
      >
        <h2>{week}</h2>

        <p>Total time: {formatTotalTime(calculateTotalTime(_tasks))}</p>
      </div>
      {#each _tasks as task (task.id)}
        <TaskItem {task} />
      {/each}
    {/each}
  </div>
{/if}
