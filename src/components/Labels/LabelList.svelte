<script>
    import { onMount } from 'svelte';
    export let supabase;

    let labels = [];

    onMount(async () => {
        const { data, error } = await supabase.from('labels').select('*');

        if (error) {
            // console.error(error.message);
        } else {
            labels = data;
        }
    });

</script>

<main>
    <h1>Labels</h1>
    <div>
        {#if labels.length === 0}
            <p>No labels found.</p>
        {:else}
            <ul>
                {#each labels as label}
                    <li>{label.name}</li>
                {/each}
            </ul>
        {/if}
</main>
