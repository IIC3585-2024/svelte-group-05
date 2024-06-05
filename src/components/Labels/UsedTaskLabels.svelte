<script lang="ts">
  import type { TaskLabel, Label } from "../../ts/interfaces";
  
  export let tasksLabels;
  export let labels;
  export let task;

  $: taskLabels = tasksLabels.filter((tl: TaskLabel) => tl.taskId === task.id);
  $: usedLabels = $labels.filter((label: Label) => taskLabels.find((tl: TaskLabel) => tl.labelId === label.id));
</script>


<div class="flex flex-wrap">
  {#each usedLabels as label}

    <div class="relative group m-1">
      <span class="mt-1.5 inline-block w-4 h-4 rounded-full" style="background-color: {label.color};"></span>
      <span class="absolute left-1/2 transform -translate-x-1/2 -translate-y-6 bg-gray-800 text-white text-xs px-3 py-2 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap max-w-xs overflow-hidden overflow-ellipsis">
        {label.name}
      </span>
    </div>
  {/each}
  
</div>
