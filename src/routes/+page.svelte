<script>
  import NewTask from "../components/Tasks/NewTask.svelte";
  import TaskList from "../components/Tasks/TaskList.svelte";
  import { tasks } from "../stores/tasks";

  export let data;

  let { session } = data;
  $: ({ session } = data);
  
</script>

<main class="p-6">
  {#if !session}
    <div
      class="flex flex-row items-center justify-center bg-gray-100 mt-20 flex-wrap md:flex-nowrap"
    >
      <div class="text-center">
        <h1 class="text-7xl font-bold text-gray-900 mb-4 text-center">
          Taskify
        </h1>
        <p class="text-4xl text-gray-700 mb-4 text-center">
          Organize. Simplify. Achieve.
        </p>
      </div>
      <img
        src="/src/assets/hero.png"
        alt="Taskify"
        class="w-11/12 sm:w-3/4 md:w-1/2 lg:w-5/12 mb-4"
      />
    </div>
    <p class="mt-20 text-lg text-gray-700 mb-6 text-center">
      <span>
        <a href="/login" class="text-blue-500 hover:underline">Log in</a> or
        <a href="/register" class="text-blue-500 hover:underline">Sign up</a> to
        get started.
      </span>
    </p>
  {:else}
    <div class="container mx-auto">
      <NewTask {session} />
      <TaskList tasks={$tasks} />
    </div>
  {/if}
</main>
