<script lang="ts">
  import Labels from "../Labels.svelte";
  import Projects from "../Projects.svelte";
  import { tasks } from "../../stores/tasks";
  import { projects } from "../../stores/projects";
  import { labels } from "../../stores/labels";
  import { task_labels } from "../../stores/tasks_labels";
  import { format } from "date-fns";
  import Icon from "@iconify/svelte";
  import type { Label } from "../../ts/interfaces";

  export let session;


  let name = "";
  let project = null;
  let Selectedlabels: Label[] = [];
  let startTime: Date;
  let stopTime: Date;
  let startDate = new Date();
  let stopDate = new Date();
  let running = false;
  let elapsedTime = 0;
  let interval: NodeJS.Timeout;
  let onlyTime: boolean = true;

  function clear() {
    name = "";
    project = null;
    Selectedlabels = [];
    startTime = null;
    stopTime = null;
    startDate = new Date();
    stopDate = new Date();
    running = false;
    elapsedTime = 0;
    clearInterval(interval);
  }

  function handleClick() {
    if (onlyTime) {
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
      }
    } else {
      addTask();
    }
  }

  function addLabelsToTask() {
    if (Selectedlabels.length == 0){
      return '';
    }

    let last_task = $tasks[$tasks.length - 1];
    Selectedlabels.map( (label) => {
      task_labels.add({
        'labelId': label.toString(),
        'taskId': last_task.id
      })
    })
  }

  async function  addTask() {
    const newTask = {
      name,
      userId: session.user.id,
      projectId: project?.id,
      startTime: onlyTime ? format(startTime, "HH:mm:ss") : startTime,
      stopTime: onlyTime ? format(stopTime, "HH:mm:ss") : stopTime,
      startDate: format(startDate, "yyyy-MM-dd"),
      stopDate: format(stopDate, "yyyy-MM-dd"),
    };

    await tasks.add(newTask);
    await addLabelsToTask();

    clear();
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

    <Labels {labels} bind:Selectedlabels />

    {#if onlyTime}
      <div>
        {#if running}
          {new Date(elapsedTime).toISOString().slice(11, 19)}
        {:else}
          00:00:00
        {/if}
      </div>
    {:else}
      <div class="flex items-center space-x-1">
        <input
          type="time"
          bind:value={startTime}
          class="p-2 border rounded-lg"
        />
        <span>-</span>

        <input
          type="time"
          bind:value={stopTime}
          class="p-2 border rounded-lg"
        />

        <input
          type="date"
          bind:value={startDate}
          class="p-2 border rounded-lg"
          max={format(new Date(), "yyyy-MM-dd")}
        />
        <input
          type="date"
          bind:value={stopDate}
          class="p-2 border rounded-lg"
          max={format(new Date(), "yyyy-MM-dd")}
        />
      </div>
    {/if}
    <button
      on:click={handleClick}
      class="px-4 py-2 {running
        ? 'bg-red-500'
        : 'bg-green-500'} text-white rounded-lg"
    >
      {#if onlyTime}
        {running ? "Stop" : "Start"}
      {:else}
        Save
      {/if}
    </button>
    <button on:click={() => (onlyTime = !onlyTime)} class="block w-fit px-4 py-2 hover:bg-gray-200 hover:rounded-lg">
      <Icon
        icon={onlyTime ? "carbon:calendar" : "carbon:time"}
        class="w-6 h-6"
        on:click={() => (onlyTime = !onlyTime)}
      />
    </button>
  </div>
</div>
