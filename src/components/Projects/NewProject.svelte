<script>
  import { projects } from "../../stores/projects";

  export let session;
  let projectName = "";
  let errorMessage = "";
  let successMessage = "";

  async function createProject() {
    projects.add({ name: projectName, userId: session.user.id });
    clear();
  }

  function clear() {
    projectName = "";
    errorMessage = "";
    successMessage = "";
  }
</script>

<main class="p-8 bg-gray-100">
  <div class="bg-white p-6 rounded-lg shadow-md">
    {#if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
    {/if}
    {#if successMessage}
      <p class="text-green-500">{successMessage}</p>
    {/if}
    <form
      on:submit|preventDefault={createProject}
      class="flex flex-row justify-between items-center"
    >
      <div class="flex flex-col">
        <label for="projectName" class="mb-2 font-semibold">Project name:</label
        >
        <input
          type="text"
          id="projectName"
          bind:value={projectName}
          required
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 h-fit ml-4"
        >Create project</button
      >
    </form>
  </div>
</main>
