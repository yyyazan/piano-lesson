<script lang="ts">
    import Fretboard from "./Fretboard.svelte";
    import type { diagram } from "./types";
    import cagedJson from "./caged.json";
    import {
        chordToMarkers,
        type ChordFile,
        type Chord
    } from "./json-to-ui";
    import Button1 from "./Button1.svelte";

    const data = cagedJson as ChordFile;
    const chords: Chord[] = data.chords;

    let currentIndex = 0;
    let currentChord: Chord = chords[currentIndex];
    let markers: diagram[] = chordToMarkers(currentChord);

    function nextChord() {
        currentIndex = (currentIndex + 1) % chords.length;
        currentChord = chords[currentIndex];
        markers = chordToMarkers(currentChord);
    }
</script>

<section class="chord-engine">
    <Fretboard markers={markers} chord_title={currentChord.name} />

    <Button1 on:click={nextChord}>next chord</Button1>
</section>

<style>
    .chord-engine {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 32px 24px;
        margin: 0 auto;
        align-items: center;
    }
</style>