import type { diagram } from "./types";

export type FretValue = number | "x";

export interface Chord {
    name: string;
    "base-fret": number;
    frets: FretValue[];   // length 6, low E -> high e
    fingers: number[];    // length 6, 0..4
}

export interface ChordFile {
    group?: string;
    tuning: string[];
    chords: Chord[];
}

// index 0 (low E) -> string 6, index 5 -> string 1
function stringNumberFromIndex(i: number): number {
    return 6 - i;
}

export function chordToMarkers(chord: Chord): diagram[] {
    const markers: diagram[] = [];

    chord.frets.forEach((val, i) => {
        const string = stringNumberFromIndex(i);
        const finger = (chord.fingers[i] ?? 0) as 0 | 1 | 2 | 3 | 4;

        if (val === "x") {
            // muted string: no dot yet (X/O later)
            return;
        }

        if (val === 0) {
            // open string: no dot yet (open circle later)
            return;
        }

        // visible frets 1..5 for now
        markers.push({
            string,
            fret: val,
            finger: (finger || 1) as 1 | 2 | 3 | 4  // default to 1-dot if finger=0
        });
    });

    return markers;
}