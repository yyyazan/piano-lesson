<script lang="ts">
    export let finger: number | undefined = undefined;
</script>

<button
        type="button"
        class="marker-btn"
        class:edge={finger !== undefined}
        class:ghost={finger === undefined}
        on:click
>
    {#if finger}
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
    {/if}
</button>

<style>

    .marker-btn {
        pointer-events: auto; /* Re-enable clicks (parent wrapper has none) */
        transform: translate(-50%, -50%);
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        /* Default size for hit target */
        width: 35px;
        height: 30px;
        border-radius: 999px;
        position: relative;
    }

    .edge {
        /* This is the "edge" color */
        background: hsl(0, 0%, 10%);
        border-radius: 999px;


        width: 30px;
        height: 23px;
        transform: translate(-50%, -50%);
        position: relative;

        pointer-events: auto;

    }

    /* front */
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
    .edge:hover .front {
        transform: translateY(-3px); /* half press */
    }

    /* --- 3. PRESSING STATE --- */
    .edge:active .front {
        transform: translateY(-1px); /* Pushes "down" */
    }
    .front:active {
        background: #114DF2;
    }

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

    .dot {
        width: 5px;
        height: 5px;
        border-radius: 999px;
        background: #fff;
        display: inline-block;
    }

    /* --- ghost (Empty fret highlight) --- */
    .ghost {
        background: transparent;
    }

    .ghost:hover {
        background: rgba(231, 100, 100, 0.24);
    }
</style>