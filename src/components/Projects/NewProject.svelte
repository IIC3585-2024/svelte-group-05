<script lang="ts">
  import { projects } from "../../stores/projects";
  import type { Priority } from "../../ts/interfaces";

  export let session;
  let projectName = "";
  let projectDescription = "";
  let errorMessage = "";
  let successMessage = "";
  let priority: Priority | null = null;

  let priorityList = [
    { id: 1, name: "low" },
    { id: 2, name: "medium" },
    { id: 3, name: "high" },
  ];

  async function createProject() {
    projects.add({ name: projectName, userId: session.user.id , priority: priority, description: projectDescription});
    clear();
  }

  function clear() {
    projectName = "";
    errorMessage = "";
    successMessage = "";
    priority = null;
    projectDescription = "";
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
      class="justify-between items-center"
    >
    <div class="flex justify-between items-center mb-3">
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
        <select bind:value={priority} class="p-2 border rounded-lg">
          <option value={null} disabled selected={!priority}>
            Select a priority
          </option>
          {#each  priorityList as _priority}
          <option
          value={_priority.name}
          >
          {_priority.name}
        </option>
        {/each}
      </select>
    </div>
      
      <div class="flex flex-col mb-4">
        <label for="projectDescription" class="mb-2 font-semibold">Description:</label
        >
        <textarea
          id="projectDescription"
          bind:value={projectDescription}
          class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        ></textarea>

      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 h-fit"
        >Create project</button
      >
    </form>
  </div>
</main>
