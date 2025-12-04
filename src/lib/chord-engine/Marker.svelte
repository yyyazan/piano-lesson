<script lang="ts">
    export let finger: number = 0;
</script>

<button type="button" class="edge" on:click>
    <span class="front" class:layout-grid={finger > 2}>
        {#if finger === 1}
            <span class="dot"></span>
        {:else if finger === 2}
            <span class="dot"></span><span class="dot"></span>
        {:else if finger === 3}
            <span class="dot dot-span-all"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        {:else if finger === 4}
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        {/if}
    </span>
</button>

<style>
    /* The "edge" is the container.
      It provides the dark background color that is
      revealed when the "front" moves.
      It should NOT have display: flex/grid.
    */


    .edge {
        /* This is the "edge" color */
        background: hsl(0, 0%, 10%);
        border-radius: 999px;

        /* These are important: We set the size on the
          container, not the moving parts.
        */
        width: 30px;
        height: 23px;

        /* Must be relative to hold the .front */
        position: relative;

        pointer-events: none;
        transform: translate(-50%, -50%);
    }

    /* The "front" is the main visual (the black circle).
      It holds the content (the dots).
      It gets all the layout styles (flex/grid).
    */
    .front {
        /* It must fill its parent "edge" */
        position: absolute;
        inset: 0;

        /* This is the main marker color */
        background: #4b4b4b;
        border-radius: 999px;
        box-sizing: border-box;

        /* These are your layout styles for the dots */
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;

        /* --- 1. DEFAULT STATE --- */
        transform: translateY(-4px);
    }

    /* --- 2. HOVERING STATE --- */
    /* We target the PARENT Fretboard's .hit:hover,
      and then affect this component.
      This requires a change in Fretboard.svelte.
      For now, let's just make the marker lift on its own hover.
    */
    .edge:hover .front {
        transform: translateY(-4px); /* Lifts higher */
    }

    /* --- 3. PRESSING STATE --- */
    .edge:active .front {
        transform: translateY(-1px); /* Pushes "down" */
    }


    /* --- Dot Layout Styles (now applied to .front) --- */

    /* "layout-grid" is now on ".front", not ".edge" */
    .front.layout-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        align-items: center;
        padding: 3px;
    }

    .front.layout-grid .dot-span-all {
        grid-column: 1 / -1;
    }

    .dot { /* This was .edge .dot, now it's just .dot */
        width: 5px;
        height: 5px;
        border-radius: 999px;
        background: #fff;
        display: inline-block;
    }
</style>