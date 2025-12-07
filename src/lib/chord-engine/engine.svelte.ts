import cagedJson from "./caged.json";
import {
    chordToMarkers,
        type ChordFile,
    type Chord,
    type diagram
} from "./json-to-ui";

// jason
const data = cagedJson as ChordFile;
const chords: Chord[] = data.chords;

class GameEngine {
    // state
    progress = $state(0);
    timeLeft = $state(10);

    currentIndex = $state(0);
    currentChord = $derived(chords[this.currentIndex]);
    markers = $derived(chordToMarkers(this.currentChord));

    #intervalId: any;


    constructor() {
        // Automatically start the game when the engine is loaded
        // (Optional: You could wait for a explicit .start() call)
        this.startTimer();
    }


    nextChord() {
        // 1. Cycle to next chord
        this.currentIndex = (this.currentIndex + 1) % chords.length;

        // 2. Logic: Increase Progress
        if (this.progress >= 100) {
            this.progress = 0;
        } else {
            this.progress += 10;
        }

        // 3. Reset the timer for the new chord
        this.startTimer();
    }

    startTimer() {
        // Stop any existing timer first
        this.stopTimer();

        // Reset countdown
        this.timeLeft = 10;

        // Start new countdown
        this.#intervalId = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft -= 1;
            } else {
                // Time is up! Move to next chord automatically
                this.nextChord();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.#intervalId) clearInterval(this.#intervalId);
    }

}

export const game = new GameEngine();