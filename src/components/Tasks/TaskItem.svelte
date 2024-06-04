<script lang="ts">
  import Labels from "../Labels.svelte";
  import Projects from "../Projects.svelte";
  import UsedLabels from "../Labels/UsedTaskLabels.svelte"
  import { tasks } from "../../stores/tasks";
  import { projects } from "../../stores/projects";
  import { task_labels } from "../../stores/tasks_labels";
  import { labels } from "../../stores/labels";
  import { calculateTotalTime, formatTotalTime } from "../../utils/functions";
  import Icon from "@iconify/svelte";
  import UsedTaskLabels from "../Labels/UsedTaskLabels.svelte";

  let possibleProjects = [];
  let possibleLabels = [];

  export let task;

  $: currentTaskLabels = $task_labels;

  let { name, startTime, stopTime, projectId, startDate, stopDate } = task;

  let project = $projects.find((project) => project.id === projectId);

  function deleteTask() {
    tasks.delete(task.id);
  }

  function updateTask() {
    // Function to handle task update
    console.log("Update task:", task);
  }

  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }
  }
</script>

<div class="p-6 bg-white rounded-lg shadow-md">
  <div class="flex items-center space-x-4 mb-4">
    <p class="flex-1 p-2">
      {name}
    </p>
    <UsedTaskLabels task={task} labels={labels} task_labels={currentTaskLabels} />
    <Projects projects={possibleProjects} bind:project disabled={true} />

    <!-- <Labels {possibleLabels} bind:labels /> -->

    <div>
      <span>
        {startTime}
      </span>
      -
      <span>
        {stopTime}
      </span>
    </div>

    <div class="border-r border-gray-300 h-6 border-1" />

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

    <div class="flex items-center space-x-2">
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
