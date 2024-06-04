<script lang="ts">
  import { goto } from '$app/navigation';
  import Calendar from '../../components/calendar/Calendar.svelte';

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
      <div class='m-6'>
        <Calendar />
      </div>
    {/if}
  </div>
</main>
