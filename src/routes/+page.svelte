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

<main class="py-6">
  <div class="flex gap-2 flex-wrap justify-around items-center bg-gray-100 px-20">
    <div class="w-full text-center lg:text-left lg:w-5/12 ml-4">
      <h1 class="text-5xl lg:text-7xl font-bold text-gray-900 mb-4">
        Taskify
      </h1>
      <Typewriter mode="loopOnce">
        <span
          class="text-2xl lg:text-4xl text-gray-700 text-center"
        >
          {currentPhrase}
        </span>
      </Typewriter>
    </div>
    <img
      src="/hero.png"
      alt="Taskify"
      class="w-10/12 md:w-7/12 lg:w-6/12 my-10"
    />
  </div>
  <p class="w-full mt-4 text-lg text-gray-700 mb-6 text-center">
    <span>
      <a href="/login" class="text-blue-500 hover:underline">Log in</a> or
      <a href="/signup" class="text-blue-500 hover:underline">Sign up</a> to get
      started.
    </span>
  </p>
</main>
