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

</script>

<main>
  <div class="w-full flex flex-col items-center mt-8">
    {#if session && project}
      <h1 class="text-2xl font-bold mb-4">Project: {project.name}</h1>
      <p class="text-lg font-semibold mb-4">Total Cost: ${projectCost}</p>
      <TaksList tasks={projectTasks} />
    {:else}
      <p class="text-center mt-8 text-3xl text-gray-500">
        🙅‍♂️ No Project found 🚧
      </p>
    {/if}
  </div>
</main>
