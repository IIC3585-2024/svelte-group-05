<script lang="ts">
  import { labels } from "../stores/labels";
  import { tasks } from "../stores/tasks";
  import { projects } from "../stores/projects";
  import { task_labels } from "../stores/tasks_labels";
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";
  import "../app.css";
  import Navbar from "../components/Shared/Navbar.svelte";

  
  export let data;
  
  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(async () => {
    if (!session) {
      return;
    }
    await projects.fetch(session.user.id);
    let result_tasks = await tasks.fetch(session.user.id);
    await labels.fetch(session.user.id);
    await task_labels.fetch(result_tasks);
  });


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
