<script>
  import NewTask from "../../../components/Tasks/NewTask.svelte";
  import TaskList from "../../../components/Tasks/TaskList.svelte";
  import { tasks } from "../../../stores/tasks";

  export let data;

  let { session } = data;
  $: ({ session } = data);
</script>

<main class="p-6">
  <div class="container mx-auto">
    <NewTask {session} />
    <TaskList tasks={$tasks} />
  </div>
</main>
