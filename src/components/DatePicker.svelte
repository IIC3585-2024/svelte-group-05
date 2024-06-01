<script lang="ts">
    import { onMount } from 'svelte';

    export let date: Date;

    onMount(() => {
        if (!date) {
            const now = new Date();
            const offset = now.getTimezoneOffset() * 60000;
            const localISOTime = new Date(Date.now() - offset).toISOString().slice(0, -1);
            date = new Date(localISOTime);
        }
    });
</script>

<input type="date" bind:value={date} class="p-2 border rounded-lg" />
