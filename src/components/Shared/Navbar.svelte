<script>
  export let data;
  let { supabase, session } = data;
  $: ({ supabase, session } = data);
  import { goto } from '$app/navigation';

  async function handleLogout() {
    await supabase.auth.signOut();
    goto('/');
  }
</script>

<nav class="bg-white border-b border-gray-200 shadow-sm">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div
        class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
      >
        <div class="hidden sm:block flex-shrink-0">
          <a
            href={session ? "/app/tasks" : "/"}
            class="text-2xl font-semibold text-gray-800">Taskify</a
          >
        </div>
        {#if session}
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a
                href="/app/tasks"
                class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
          </div>
        {/if}
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
      >
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

  <div class="sm:hidden" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <a
        href="/"
        class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
  </div>
</nav>
