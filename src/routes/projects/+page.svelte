<script>
  import { goto } from '$app/navigation';

  import NewProject from "../../components/Projects/NewProject.svelte";
  import ProjectList from "../../components/Projects/ProjectList.svelte";

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  if (!session) {
    goto('/');
  }
</script>

<main>
  <div class="w-full">
    {#if session}
      <NewProject {supabase} {session} />
      <ProjectList {supabase} />
    {/if}
  </div>
</main>
