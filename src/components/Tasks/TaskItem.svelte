<script lang="ts">
  import Projects from "../Projects.svelte";
  import UsedTaskLabels from "../Labels/UsedTaskLabels.svelte";
  import Cost from "../Labels/Cost.svelte";
  import { tasks } from "../../stores/tasks";
  import { projects } from "../../stores/projects";
  import { tasksLabels } from "../../stores/tasksLabels";
  import { labels } from "../../stores/labels";
  import { calculateTotalTime, formatTotalTime } from "../../utils/functions";
  import Icon from "@iconify/svelte";

  let possibleProjects = [];

  export let task;

  let { name, startTime, stopTime, projectId, startDate, stopDate } = task;

  let project = $projects.find((project) => project.id === projectId);

  function deleteTask() {
    tasks.delete(task.id);
  }
</script>

<div
  class="flex flex-wrap content-start justify-between items-center gap-4 p-6 bg-white rounded-lg shadow-md"
>
  <div class="flex flex-start items-center gap-4">
    <p class="flex-1 p-2">
      {name}
    </p>
    <UsedTaskLabels {task} {labels} tasksLabels={$tasksLabels} />
    <Cost {task} />
    <Projects projects={possibleProjects} bind:project disabled={true} />
  </div>
  <div class="flex flex-wrap content-start items-center gap-4">
    <div class="flex justify-center flex-wrap items-center gap-2">
      <span>
        {startTime}
      </span>

      <span>
        {stopTime}
      </span>
    </div>

    <div class="border-r border-gray-300 h-6 border-1" />

    <div class="flex justify-center flex-wrap items-center gap-2">
      <input
        type="date"
        bind:value={startDate}
        class="p-2 border rounded-lg"
        disabled
      />
      <input
        type="date"
        bind:value={stopDate}
        class="p-2 border rounded-lg"
        disabled
      />
    </div>
  </div>
  <div class="flex justify-center items-center gap-2 flex-wrap content-start">
    <div class="flex items-center space-2">
      <span class="text-xl font-bold">
        {formatTotalTime(calculateTotalTime([task]))}
      </span>
    </div>
    <div class="relative">
      <button
        on:click={deleteTask}
        class="block w-fit px-4 py-2 hover:bg-gray-200 hover:rounded-lg"
      >
        <Icon icon="bi:trash" class="w-6 h-6" />
      </button>
    </div>
  </div>
</div>
