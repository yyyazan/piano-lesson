<!--manages fretboard UI-->
<script lang="ts">
    import type { diagram } from "./types";
    import Marker from "./Marker.svelte";

    export let chord_title: string = "";
    export let markers: diagram[] = [];

    // strings = vertical columns (low E ... high E)
    const strings = [6, 5, 4, 3, 2, 1];

    // visual frets shown in the grid (1..5)
    const fretsVisual = [1, 2, 3, 4, 5];

    // frets that are clickable (include open string = 0)
    const fretsHits = [0, 1, 2, 3, 4, 5];

    // y-position for open-string hit targets (above nut)
    const OPEN_HIT_Y = -22; // px

    // cell sizes (single source of truth)
    const CELL_W = 42;
    const CELL_H = 56;



    function stringLeftPercent(stringNum: number) {
        const idx = strings.indexOf(stringNum);
        return idx >= 0 ? stringLinePositions[idx] : 0;
    }

    function fretTop(fretNum: number) {
        if (fretNum === 0) return `${OPEN_HIT_Y}px`;
        return `${fretCenters[fretNum - 1]}%`;
    }

    function play(string: number, fret: number) {
        console.log(`pressed string ${string} @ fret ${fret}`);
        // later: trigger audio engine note
    }

    // positions of each STRING line (6 strings => 5 spaces between)
    const stringLinePositions = strings.map((_, i) =>
        (i / (strings.length - 1)) * 100
    );
    const innerStringLinePositions = stringLinePositions.slice(1, -1); // to draw 4 inner lines

    // centers of each fret row (for hit buttons)
    const fretCenters = fretsVisual.map((_, i) =>
        ((i + 0.5) / fretsVisual.length) * 100
    );

    // horizontal fret lines between frets only (no first/top line, no last/bottom line)
    const fretLines = Array.from({ length: fretsVisual.length - 1 }, (_, i) =>
        ((i + 1) / fretsVisual.length) * 100
    );

    // Helper to find if a specific grid slot has a marker
    function getMarker(currentMarkers: diagram[], s: number, f: number) {
        return currentMarkers.find(m => m.string === s && m.fret === f);
    }
</script>

<!--chord title -->
<div class="title-container"
     style={`width:${(strings.length - 1) * CELL_W}px;  `}>
    <h1 class="title">{chord_title}</h1>

    <div
            class="fretboard"
            style={`width:${(strings.length - 1) * CELL_W}px; height:${fretsVisual.length * CELL_H}px;`}
    >


        <!-- VISUAL GRID (not interactive) -->
        <div class="cells">
            {#each fretsVisual as _f}
                {#each strings as _s}
                    <div class="cell"></div>
                {/each}
            {/each}
        </div>



        <!-- LINES OVERLAY -->
        <div class="lines">
            <!-- horizontal frets (drawn first) -->
            {#each fretLines as top}
                <div class="fret-line" style={`top:${top}%;`}></div>
            {/each}

            <!-- vertical strings (drawn on top) -->
            {#each innerStringLinePositions as left}
                <div class="string-line" style={`left:${left}%;`}></div>
            {/each}
        </div>

        <!-- INTERACTION LAYER (string press at fret) -->
        <div class="interactions">
            {#each strings as s, si}
                {#each fretsHits as f}
                    {@const activeMarker = getMarker(markers, s, f)}

                    <div
                            class="pos"
                            style={`left:${stringLinePositions[si]}%; top:${f === 0 ? `${OPEN_HIT_Y}px` : `${fretCenters[f - 1]}%`};`}
                    >
                        <Marker
                                finger={activeMarker?.finger}
                                on:click={() => play(s, f)}
                        />
                    </div>
                {/each}
            {/each}
        </div>


    </div>
</div>

<style>
    /* chord title */
    .title-container {
        width: fit-content;      /* shrink to fit content (the board width) */
        margin: 0 auto 8px auto; /* center horizontally */
    }

    .title {
        color: #4b4b4b;
        font-family: garamond, serif;
        margin: auto;
        text-align: center;
    }

    .fretboard {
        position: relative;
        display: inline-block;
        background: white;
        box-sizing: content-box;

        border-style: solid;
        border-color: #4b4b4b;
        border-width: 16px 4px 4px 4px;

        border-radius: 8px;
    }

    /* grid of blank cells */
    .cells {
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: repeat(5, 48px); /* hard coded */
        grid-template-rows: repeat(5, 64px); /* fretsVisual length */
    }


    /* lines drawn on top of cells */
    .lines {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    .string-line {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 4px;
        transform: translateX(-50%);
        background: #4b4b4b;
    }

    .fret-line {
        position: absolute;
        left: 0;
        right: 0;
        height: 2px;
        transform: translateY(-50%);
        background: #bdbdbd;
    }

    .interactions {
        position: absolute;
        inset: 0;
        /* Ensure this sits on top of lines/cells */
        z-index: 10;
    }

    .pos {
        position: absolute;
        /* Ensure the div itself doesn't block clicks, pass through to the button inside */
        pointer-events: none;
    }
</style>