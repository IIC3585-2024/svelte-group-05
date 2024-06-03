<script>
  import { goto } from '$app/navigation';

  import LabelList from '../../components/Labels/LabelList.svelte';
  import NewLabel from '../../components/Labels/NewLabel.svelte';

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
      <NewLabel {session} />
      <LabelList />      
    {/if}
  </div>
</main>
