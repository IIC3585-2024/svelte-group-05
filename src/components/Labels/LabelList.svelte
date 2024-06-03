<script lang="ts">
    import { labels } from '../../stores/labels'

    function deleteLabel(label) {
        labels.delete(label.id);
    }

</script>


<main class="p-8 bg-gray-100 min-h-screen">
	<h1 class="text-4xl font-bold mb-6">Labels</h1>
		{#if $labels.length === 0}
        <div class="bg-white p-6 rounded-lg shadow-md">
			<p class="text-gray-500">No labels found.</p>
        </div>
		{:else}
			<div class="flex flex-wrap mb-4 justify-center">
                {#each $labels as label (label.id)}
                <div class="bg-white p-6 rounded-lg shadow-md m-3">
					<div class="flex justify-between items-center">
						<div 
                            class="p-4 border border-gray-200 rounded-md hover:bg-gray-50 m-1" 
                            style="background-color: {label.color};">
							{label.name}
						</div>
						<button
							on:click={() => deleteLabel(label)}
							class="px-4 py-2 bg-red-500 text-white rounded-lg active:transaform active:translate-y-1">Delete</button
						>
					</div>
                </div>
                {/each}
			</div>
		{/if}
</main>
