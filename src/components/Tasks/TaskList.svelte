<script lang="ts">
  import TaskItem from "./TaskItem.svelte";
  import { tasks } from "../../stores/tasks";
  import {
    calculateTotalTime,
    groupTasksByWeek,
    formatTotalTime,
  } from "../../utils/functions";

  import type { Task } from "../../ts/interfaces";

  let groupedTasks = {};
  $: if ($tasks.length > 0) {
    groupedTasks = groupTasksByWeek($tasks as Task[]);
  }
</script>

{#if !$tasks.length}
  <p>No tasks found.</p>
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
