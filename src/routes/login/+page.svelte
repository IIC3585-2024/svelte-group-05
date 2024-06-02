<script>
	import { goto } from '$app/navigation';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email = '';
	let password = '';
	let errorMessage = '';

	async function login() {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			errorMessage = error.message;
		} else {
			goto('/');
		}
	}
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100">
	<div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
		<h1 class="text-3xl font-bold text-center text-gray-900">Login</h1>
		<div>
			{#if errorMessage}
				<p class="mb-4 text-sm text-center text-red-600">{errorMessage}</p>
			{/if}
			<form on:submit|preventDefault={login} class="space-y-4">
				<div>
					<label for="email" class="block mb-1 text-sm font-medium text-gray-700">Email:</label>
					<input 
						type="email" 
						id="email" 
						bind:value={email} 
						required 
						class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label for="password" class="block mb-1 text-sm font-medium text-gray-700">Password:</label>
					<input 
						type="password" 
						id="password" 
						bind:value={password} 
						required 
						class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<button 
					type="submit" 
					class="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
				>
					Login
				</button>
			</form>
		</div>
	</div>
</main>
