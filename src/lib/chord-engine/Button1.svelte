<script lang="ts">
    // You can add props here later, like `export let href = null;`
    // For now, the <slot> is all we need.

</script>

<svelte:head>
  <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap"
          rel="stylesheet"
  >
</svelte:head>

<button class="edge" on:click>
  <span class="front">
    <slot>sdfsdfsad</slot>
  </span>
</button>

<style>
    /* * This is the main "pushable" container.
     * Its only job is to BE the dark "edge" of the button.
     */
    .edge {
        background: hsl(248, 81%, 40%); /* The dark edge color */
        border: none;
        border-radius: 44px;
        padding: 0;
        cursor: pointer;
    }

    /* * This is the "front" blue face of the button.
     * We use "transform" to move it up and down.
     */
    .front {
        display: block;
        box-sizing: border-box;

        /* Copied from your Figma */
        background: #114DF2;
        border-radius: 44px;
        height: 35px; /* (Note: Using padding is usually better) */

        /* My guesses for font/padding to match your image */
        color: white;
        font-family: Nunito, sans-serif;
        font-size: 20px;
        font-weight: 600;
        padding: 0 32px;
        line-height: 35px; /* Center text vertically */

        /* --- 1. DEFAULT STATE --- */
        /* It's lifted 5px "up" from its "edge" */
        transform: translateY(-6px);

    }

    /* --- 2. HOVERING STATE --- */
    .edge:hover .front {
        /* Lifts 3px higher */
        transform: translateY(-4px);
    }

    /* --- 3. PRESSING STATE --- */
    .edge:active .front {
        /* Pushes "down" into the edge */
        transform: translateY(-1px);
    }
</style>