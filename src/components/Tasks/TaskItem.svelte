<script lang="ts">
  import Labels from "../Labels.svelte";
  import Projects from "../Projects.svelte";
  import { tasks } from "../../stores/tasks";
  import { projects } from "../../stores/projects";
  import { calculateTotalTime, formatTotalTime } from "../../utils/functions";

  let possibleProjects = [];

  let possibleLabels = [
    { id: 1, name: "ocio" },
    { id: 2, name: "ocio2" },
    { id: 3, name: "ocio3" },
  ];
  export let task;

  let { name, startTime, stopTime, projectId, startDate } = task;

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
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }
  }

</script>

<div class="p-6 bg-white rounded-lg shadow-md">
  <div class="flex items-center space-x-4 mb-4">
    <input
      type="text"
      bind:value={name}
      placeholder="What are you working on?"
      class="flex-1 p-2 border rounded-lg"
    />
    <Projects projects={possibleProjects} bind:project />

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

    <input type="date" bind:value={startDate} class="p-2 border rounded-lg" />

    <div class="flex items-center space-x-2">
      <span class="text-xl font-bold">
        {formatTotalTime(calculateTotalTime([task]))}
      </span>
    </div>
    <div class="relative">
      <button
        on:click={toggleMenu}
        class="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Options
      </button>
      {#if menuOpen}
        <div
          class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10"
        >
          <button
            on:click={updateTask}
            class="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
          >
            Update
          </button>
          <button
            on:click={deleteTask}
            class="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
          >
            Delete
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
