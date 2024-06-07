<script>
  import NewTask from "../../../components/Tasks/NewTask.svelte";
  import TaskList from "../../../components/Tasks/TaskList.svelte";
  import { tasks } from "../../../stores/tasks";

  export let data;

  let { session } = data;
  $: ({ session } = data);
</script>

<main class="py-6 flex flex-col items-center">
  <div class="container mx-10">
    <NewTask {session} />
    <TaskList tasks={$tasks} />
  </div>
</main>
