<script lang="ts">
  import { projects } from "../stores/projects";
  import type { Project } from "../ts/interfaces";

  export let project: Project;
</script>

<select bind:value={project} class="p-2 border rounded-lg">
  <option value={null} disabled selected={!project}></option>
  {#each $projects as _project}
    <option
      value={_project}
      selected={project && _project.id === project.id}
    >
      {_project.name}
    </option>
  {/each}
</select>
