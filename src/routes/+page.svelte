<script>
  import { onMount } from "svelte";
  import Typewriter from "svelte-typewriter";

  const phrases = [
    "Organize. Simplify. Achieve.",
    "Plan. Focus. Succeed.",
    "Prioritize. Manage. Win.",
    "Structure. Optimize. Conquer.",
    "Arrange. Execute. Triumph.",
  ];

  $: currentPhrase = phrases[0];

  function cyclePhrases() {
    let wordIndex = 0;
    setInterval(() => {
      currentPhrase = phrases[wordIndex];
      wordIndex = (wordIndex + 1) % phrases.length;
    }, 5000);
  }

  onMount(cyclePhrases);
</script>

<main class="p-6">
  <div
    class="flex flex-row items-center justify-between bg-gray-100 mt-20 flex-wrap md:flex-nowrap px-20"
  >
    <div class="text-center w-full">
      <h1 class="text-5xl lg:text-7xl font-bold text-gray-900 mb-4 text-center">Taskify</h1>
      <Typewriter mode="loopOnce">
        <span
          class="text-2xl lg:text-4xl text-gray-700 text-center w-[200px] whitespace-nowrap"
        >
          {currentPhrase}
        </span>
      </Typewriter>
    </div>
    <img
      src="/hero.png"
      alt="Taskify"
      class="w-11/12 sm:w-3/4 md:w-1/2 lg:w-5/12 my-10"
    />
  </div>
  <p class="mt-20 text-lg text-gray-700 mb-6 text-center">
    <span>
      <a href="/login" class="text-blue-500 hover:underline">Log in</a> or
      <a href="/signup" class="text-blue-500 hover:underline">Sign up</a> to get
      started.
    </span>
  </p>
</main>
