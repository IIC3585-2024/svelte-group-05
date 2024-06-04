<script lang="ts">
  import type { Label } from "../ts/interfaces";


  export let labels: Label[];
  export let Selectedlabels: Label[];

  let openLabels = false;
  let buttonRef: HTMLButtonElement;

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (!node.contains(event.target) && event.target !== buttonRef) {
        openLabels = false;
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }
</script>

<div>
  <button
    bind:this={buttonRef}
    class="p-2 border rounded-lg"
    on:click={() => (openLabels = !openLabels)}
  >
    Labels
  </button>

  {#if openLabels}
    {#if $labels.length === 0}
      <div class="absolute bg-white border rounded-lg p-4" use:clickOutside>
        <p class="text-gray-500">No labels available</p>
      </div>
    {:else}
      <div class="absolute bg-white border rounded-lg p-4" use:clickOutside>
        <div class="flex flex-col">
          {#each $labels as label (label.id)}
          <div class='flex justify-items-center text-center'>
            <label class="mr-2 mb-2 flex">
              <input
              type="checkbox"
              name="labels"
              value={label.id}
              class="mr-2"
              bind:group={Selectedlabels}
              />
              {label.name}
            </label>
            <div class='mt-1.5 h-3 w-3 rounded-full' style="background-color: {label.color};"></div>
          </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>
