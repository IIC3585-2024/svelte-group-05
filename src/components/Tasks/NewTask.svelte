<script lang="ts">
  import Labels from "../Labels.svelte";
  import Projects from "../Projects.svelte";
  import { tasks } from "../../stores/tasks";
  import { projects } from "../../stores/projects";
  import { format } from "date-fns";

  export let supabase;

  let possibleLabels = [
    { id: 1, name: "ocio" },
    { id: 2, name: "ocio2" },
    { id: 3, name: "ocio3" },
  ];

  let name = "";
  let project = null;
  let labels = [];
  let startTime: Date;
  let stopTime: Date;
  let startDate = new Date();
  let stopDate = new Date();
  let running = false;
  let elapsedTime = 0;
  let interval: NodeJS.Timeout;

  function handleClick() {
    if (!running) {
      startTime = new Date();
      elapsedTime = 0;
      running = true;
      interval = setInterval(() => {
        elapsedTime = new Date().getTime() - startTime.getTime();
      }, 1000);
    } else {
      stopTime = new Date();
      running = false;
      addTask();
      clearInterval(interval);
    }
  }
  function addTask() {
    const newTask = {
      name,
      projectId: project?.id,
      startTime: format(startTime, "HH:mm:ss"),
      stopTime: format(stopTime, "HH:mm:ss"),
      startDate: format(startDate, "yyyy-MM-dd"),
      stopDate: format(stopDate, "yyyy-MM-dd"),
    };
    tasks.add(newTask);

    name = "";
    project = null;
    labels = [];
  }
</script>

<div class="p-6 bg-white rounded-lg shadow-md">
  <div class="flex items-center space-x-2 mb-4">
    <input
      type="text"
      bind:value={name}
      placeholder="What are you working on?"
      class="flex-1 p-2 border rounded-lg"
    />
    <Projects {projects} bind:project />

    <Labels {possibleLabels} bind:labels />

    <div>
      {#if running}
        {new Date(elapsedTime).toISOString().slice(11, 19)}
      {:else}
        00:00:00
      {/if}
    </div>

    <button
      on:click={handleClick}
      class="px-4 py-2 {running
        ? 'bg-red-500'
        : 'bg-green-500'} text-white rounded-lg"
    >
      {running ? "Stop" : "Start"}
    </button>
  </div>
</div>
