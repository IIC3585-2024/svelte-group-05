<script>
  import NewTask from "../components/Tasks/NewTask.svelte";
  import TaskList from "../components/Tasks/TaskList.svelte";

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);
</script>

<main class="p-6">
  {#if !session}
    <div class="flex flex-col items-center justify-center bg-gray-100">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Taskify</h1>
      <p class="text-lg text-gray-700 mb-2">
        Taskify is a simple task manager that helps you keep track of your
        tasks.
      </p>
      <p class="text-lg text-gray-700">Sign up or log in to get started.</p>
    </div>
  {:else}
    <NewTask {supabase} />
    <TaskList {supabase} />
  {/if}
</main>
