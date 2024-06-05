<script>
  import { projects } from "../../../../stores/projects";
  import { tasks } from "../../../../stores/tasks";
  import TaksList from "../../../../components/Tasks/TaskList.svelte";

  import { page } from "$app/stores";
  import { onMount } from "svelte";

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);
  $: projectId = $page.params.id;
  console.log(projectId);
  $: project = $projects.find((_project) => {
    return _project.id.toString() === projectId;
  });
  $: projectTasks = $tasks.filter((task) => task.projectId === project.id);
  $: projectCost = projectTasks.reduce((acc, task) => acc + task.cost, 0);

  let priorityColor = {
    low: "bg-green-200",
    medium: "bg-yellow-200",
    high: "bg-red-200",
  };

</script>

<main>
  <div class="w-full flex flex-col items-center mt-8">
    {#if session && project}
    <div class='flex justify-between '>
      <h1 class="text-2xl font-bold pr-2">Project: {project.name}</h1>
      {#if project.priority}
        <div class="p-1 font-bold rounded-md {priorityColor[project.priority]}">
          {project.priority}
        </div>
      {/if}
    </div>
      <p class="text-lg font-semibold mt-4 mb-4">Total Cost: ${projectCost}</p>
      {#if project.description}
        <div class="flex flex-row max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-8">
          <h5 class="text-center text-gray-500">Description:</h5>
          <p class="text-center text-gray-500">{project.description}</p>
        </div>
      {/if}
      <TaksList tasks={projectTasks} />
    {:else}
      <p class="text-center mt-8 text-3xl text-gray-500">
        🙅‍♂️ No Project found 🚧
      </p>
    {/if}
  </div>
</main>
