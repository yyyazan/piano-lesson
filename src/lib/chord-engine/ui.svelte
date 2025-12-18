<script lang="ts">
    import { onDestroy } from "svelte";
    import Fretboard from "./Fretboard.svelte";
    import HUD from "./HUD.svelte";
    import Button1 from "../components/Button1.svelte";

    // Import the brain
    import { game } from "./engine.svelte.js";

    // Cleanup: If this component is removed from the screen,
    // stop the timer to save resources.
    onDestroy(() => {
        game.stopTimer();
    });
</script>

<section class="chord-engine">
    <!-- Read data directly from the game object -->
    <HUD
            progress={game.progress}
            timer={game.timeLeft}
    />

    <Fretboard
            markers={game.markers}
            chord_title={game.currentChord.name}
    />

    <!-- Trigger actions on the game object -->
    <Button1 on:click={() => game.nextChord()}>
        next chord
    </Button1>
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