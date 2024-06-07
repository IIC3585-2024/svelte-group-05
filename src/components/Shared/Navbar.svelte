<script>
  export let data;
  let { supabase, session } = data;
  $: ({ supabase, session } = data);
  import { goto } from "$app/navigation";

  async function handleLogout() {
    await supabase.auth.signOut();
    goto("/");
  }
</script>

<nav class="bg-white border-b border-gray-200 shadow-sm">
  <div class="max-w-7xl mx-auto p-4">
    <div class="relative flex items-center justify-between">
      <div class="flex-1 flex items-center justify-between px-4">
        {#if !session}
          <div>
            <a
              href={session ? "/app/tasks" : "/"}
              class="text-2xl font-semibold text-gray-800">Taskify</a
            >
          </div>
        {/if}
        {#if session}
          <div class="flex flex-wrap">
            <div class="flex lg:space-x-4 mr-4 flex-wrap">
              <a
                href="/app/tasks"
                class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium mr-4"
                >Time Tracker</a
              >
              <a
                href="/app/projects"
                class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >Projects</a
              >
              <a
                href="/app/labels"
                class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >Labels</a
              >
            </div>
            <div class="flex space-x-4">
              <a
                href="/app/calendar"
                class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >Calendar</a
              >
              <a
                href="/app/dashboard"
                class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >Dashboard</a
              >
            </div>
          </div>
        {/if}
      </div>
      <div class="flex pr-2 self-start">
        {#if session}
          <span class="text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >Welcome, {session.user.email}</span
          >
          <button
            on:click={handleLogout}
            class="bg-red-500 text-white px-3 py-2 rounded-md font-medium hover:bg-red-700"
            >Logout</button
          >
        {:else}
          <a
            href="/login"
            class="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >Login</a
          >
          <a
            href="/signup"
            class="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
            >Sign Up</a
          >
        {/if}
      </div>
    </div>
  </div>
</nav>
