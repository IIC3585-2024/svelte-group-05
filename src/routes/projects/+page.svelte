<script>
  import { goto } from "$app/navigation";
  import { projects } from "../../stores/projects";

  import NewProject from "../../components/Projects/NewProject.svelte";
  import ProjectList from "../../components/Projects/ProjectList.svelte";

  export let data;

  let { session } = data;
  $: ({ session } = data);

  if (!session) {
    goto("/");
  }
</script>

<main>
  <div class="w-full">
    {#if session}
      <NewProject {session} />
      <ProjectList {projects} />
    {/if}
  </div>
</main>
