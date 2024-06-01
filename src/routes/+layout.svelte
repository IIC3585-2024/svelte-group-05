<script lang="ts">
  import { tasks } from "../stores/tasks";
  import { projects } from "../stores/projects";
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";
  import "../app.css";
  import Navbar from "../components/Shared/Navbar.svelte";

  onMount(async () => {
    await projects.fetch();
    await tasks.fetch();
  });

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<Navbar {data} />
<slot />
