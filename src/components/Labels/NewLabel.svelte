<script lang="ts">
  import { labels } from "../../stores/labels";
  export let session
  let color = '#2ff58b';
  let name = '';
  let userId = session.user.id;

  function handleClick() {
    addLabel();
  }

  function addLabel() {
    const newLabel = {
      name: name,
      color: color,
      userId: userId 
    };
    labels.add(newLabel);
  }

</script>

<div class='p-8 bg-gray-100'>
  <h1 class="text-4xl font-bold mb-6">Create and customize your tags</h1>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div class="flex items-center space-x-2 mb-4">
      <label class="mr-4 mb-2 flex items-center   text-lg font-semibold">
      	<input
      		type="text"
      		bind:value={name}
      		maxlength="30"
      		placeholder="Add your new label here"
      		class="flex-1 p-2 border rounded-lg"
      	/>
      </label>

		  <label class="mr-4 mb-2 flex items-center text-lg font-semibold">
        <input 
          id="hs-color-input"
          type="color"
          bind:value={color}
          class="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
          title="Choose your color"
        />
		  </label>
    	<button
    	    on:click={handleClick}
    	    class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 active:transaform active:translate-y-1"
    	    >Create label
    	</button>
    </div>
  </div>
</div>
