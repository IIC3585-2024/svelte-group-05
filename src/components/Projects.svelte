<script lang="ts">
  import { projects } from "../stores/projects";
  import type { Project } from "../ts/interfaces";

  export let project: Project;
  export let disabled: boolean;
</script>

<select bind:value={project} class="p-2 border rounded-lg" disabled={disabled}>
  <option value={null} disabled selected={!project}>
    Select a project
  </option>
  {#each $projects as _project}
    <option
      value={_project}
      selected={project && _project.id === project.id}
    >
      {_project.name}
    </option>
  {/each}
</select>
