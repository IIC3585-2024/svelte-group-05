<script lang="ts">
  export let task;
</script>

<div class="relative group">
  <span class="absolute left-1/2 transform -translate-x-1/2 -translate-y-6 bg-gray-800 text-white text-xs px-3 py-2 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap max-w-xs overflow-hidden overflow-ellipsis">
    ${task.cost}
  </span>
  <p>$</p>
</div>
