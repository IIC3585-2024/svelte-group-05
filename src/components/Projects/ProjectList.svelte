<script>
  import { goto } from "$app/navigation";

  export let projects;
  function deleteProject(project) {
    projects.delete(project.id);
  }
</script>

<main class="p-8 bg-gray-100 min-h-screen">
  <h1 class="text-4xl font-bold mb-6">Projects</h1>
  <div class="bg-white p-6 rounded-lg shadow-md">
    {#if projects.length === 0}
      <p class="text-center mt-8 text-3xl text-gray-500">
        🙅‍♂️ No Projects found 🚧
      </p>
    {:else}
      <div class="mb-6">
        {#each $projects as project (project.id)}
          <div class="flex justify-between items-center mb-4">
            <button
              class="p-4 border border-gray-200 rounded-md hover:bg-gray-50"
              on:click={() => goto(`/app/projects/${project.id}`)}
            >
              {project.name}
            </button>
            <button
              on:click={() => deleteProject(project)}
              class="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button
            >
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>
