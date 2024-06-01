<script>
    export let data;
	let { supabase, session } = data
	$: ({ supabase, session } = data)

    function handleLogout() {
        supabase.auth.signOut();
    }
</script>

<nav class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">   
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div class="hidden sm:block flex-shrink-0">
                    <a href="/" class="text-2xl font-semibold text-gray-800">MyApp</a>
                </div>
                <div class="hidden sm:block sm:ml-6">
                    <div class="flex space-x-4">
                        <a href="/" class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Time Tracker</a>
                        <a href="/projects" class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
                        <a href="/labels" class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Labels</a>
                    </div>
                </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {#if session}
                    <span class="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Welcome, {session.user.email}</span>
                    <button on:click={handleLogout} class="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700">Logout</button>
                {:else}
                    <a href="/login" class="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
                    <a href="/register" class="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</a>
                {/if}
            </div>
        </div>
    </div>

    <div class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
            <a href="/" class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Time Tracker</a>
            <a href="/projects" class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
            <a href="/labels" class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Labels</a>
        </div>
    </div>
</nav>
