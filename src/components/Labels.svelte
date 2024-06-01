<script lang="ts">
    import { onMount } from 'svelte';

    export let possibleLabels = [
        { id: 1, name: 'ocio' },
        { id: 2, name: 'ocio2' },
        { id: 3, name: 'ocio3' }
    ];

    export let labels = [];
    let openLabels = false;
    let buttonRef: HTMLButtonElement;

    function clickOutside(node) {
        const handleClick = (event) => {
            if (!node.contains(event.target) && event.target !== buttonRef) {
                openLabels = false;
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }
</script>

<div>
    <button bind:this={buttonRef} class="p-2 border rounded-lg" on:click={() => (openLabels = !openLabels)}>
        Labels
    </button>

    {#if openLabels}
        <div class="absolute bg-white border rounded-lg p-4" use:clickOutside>
            <div class="flex flex-wrap">
                {#each possibleLabels as label}
                    <label class="mr-4 mb-2 flex items-center">
                        <input
                            type="checkbox"
                            name="labels"
                            value={label.name}
                            bind:group={labels}
                            class="mr-2"
                        />
                        {label.name}
                    </label>
                {/each}
            </div>
        </div>
    {/if}
</div>