<script lang="ts">
  import { onMount } from "svelte";
  import { invalidate } from "$app/navigation";
  import "../app.css";
  import Navbar from "../components/Shared/Navbar.svelte";
  import Toast from "../components/Shared/Toast.svelte";

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

<svelte:head>
  <title>Taskify</title>
</svelte:head>

<Navbar {data} />
<Toast />
<slot />
