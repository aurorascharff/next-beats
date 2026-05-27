/**
 * Per-track musical profiles.
 *
 * Each track gets unique overrides for BPM, chords, melody, rhythm,
 * and waveforms so it sounds distinct and matches its title/vibe.
 * Fields are optional — anything not set falls back to the genre default.
 */

import type { GenreConfig } from './genre-configs';

export type TrackProfile = Partial<
  Pick<
    GenreConfig,
    | 'bpm'
    | 'chords'
    | 'melodyNotes'
    | 'melodyRhythm'
    | 'melodyWave'
    | 'melodyGain'
    | 'bassWave'
    | 'bassGain'
    | 'padWave'
    | 'padGain'
    | 'padFilter'
    | 'arpeggiate'
    | 'arpSpeed'
    | 'reverb'
  >
>;

// Note frequencies for building custom progressions
const C3 = 130.81,
  D3 = 146.83,
  Eb3 = 155.56,
  E3 = 164.81,
  F3 = 174.61,
  G3 = 196.0,
  Ab3 = 207.65,
  A3 = 220.0,
  Bb3 = 233.08,
  B3 = 246.94;
const C4 = 261.63,
  D4 = 293.66,
  Eb4 = 311.13,
  E4 = 329.63,
  F4 = 349.23,
  G4 = 392.0,
  Ab4 = 415.3,
  A4 = 440.0,
  Bb4 = 466.16,
  B4 = 493.88;
const C5 = 523.25,
  D5 = 587.33,
  E5 = 659.25,
  F5 = 698.46,
  G5 = 783.99;

export const trackProfiles: Record<string, TrackProfile> = {
  // ── Electronic ──

  // t1: Async Await — pulsing, patient, builds anticipation
  t1: {
    bpm: 124,
    chords: [
      [C4, Eb4, G4],
      [Ab3, C4, Eb4],
      [Bb3, D4, F4],
      [G3, Bb3, D4],
    ],
    melodyNotes: [Eb4, F4, G4, Bb4, C5, Eb4],
    melodyRhythm: [0, 4, 6, 8, 12, 14],
    arpeggiate: true,
    arpSpeed: 3,
    padFilter: 1800,
    reverb: 0.35,
  },

  // t2: WebSocket Sunset — warm, flowing, dreamy pads
  t2: {
    bpm: 118,
    chords: [
      [F3, A3, C4, E4],
      [G3, B3, D4],
      [A3, C4, E4],
      [D4, F4, A4],
    ],
    melodyNotes: [A3, C4, D4, E4, G4, A4, C5],
    melodyRhythm: [0, 3, 8, 11],
    padWave: 'sine',
    padGain: 0.06,
    padFilter: 2200,
    arpeggiate: false,
    reverb: 0.55,
  },

  // t3: Server Sent Vibes — rhythmic, upbeat, streaming energy
  t3: {
    bpm: 132,
    chords: [
      [C4, Eb4, Bb4],
      [Ab3, C4, F4],
      [Bb3, D4, G4],
      [Eb4, G4, Bb4],
    ],
    melodyNotes: [C4, Eb4, F4, G4, Bb4, C5, Eb4],
    melodyRhythm: [0, 2, 4, 8, 10, 12, 14],
    arpeggiate: true,
    arpSpeed: 2,
    padFilter: 1600,
    reverb: 0.25,
  },

  // t4: Hydration — deep, immersive, liquid feel
  t4: {
    bpm: 120,
    chords: [
      [D3, F3, A3, C4],
      [Bb3, D4, F4],
      [C4, E4, G4],
      [A3, C4, E4],
    ],
    melodyNotes: [D4, F4, A4, C5, D5],
    melodyRhythm: [0, 6, 8, 14],
    padWave: 'sine',
    padGain: 0.05,
    padFilter: 1200,
    arpeggiate: false,
    reverb: 0.5,
  },

  // t5: Hot Module Reload — fast, urgent, exciting
  t5: {
    bpm: 138,
    chords: [
      [E3, G3, B3],
      [A3, C4, E4],
      [D4, F4, A4],
      [G3, B3, D4],
    ],
    melodyNotes: [E4, G4, A4, B4, D5, E5],
    melodyRhythm: [0, 2, 4, 6, 8, 10, 12, 14],
    melodyWave: 'square',
    arpeggiate: true,
    arpSpeed: 2,
    padFilter: 2000,
    reverb: 0.2,
  },

  // ── Indie ──

  // t6: Localhost Morning — gentle, warm, sunrise vibes
  t6: {
    bpm: 104,
    chords: [
      [G3, B3, D4, F4],
      [C4, E4, G4],
      [A3, C4, E4],
      [D4, F4, A4],
    ],
    melodyNotes: [B3, D4, E4, G4, A4, B4],
    melodyRhythm: [0, 4, 8, 12],
    padWave: 'triangle',
    padFilter: 3000,
    reverb: 0.5,
  },

  // t7: README Love Letter — delicate, heartfelt, acoustic feel
  t7: {
    bpm: 98,
    chords: [
      [C4, E4, G4],
      [A3, C4, E4],
      [F3, A3, C4],
      [G3, B3, D4],
    ],
    melodyNotes: [E4, G4, A4, B4, C5, D5],
    melodyRhythm: [0, 3, 6, 8, 11],
    melodyWave: 'triangle',
    melodyGain: 0.12,
    padFilter: 2800,
    reverb: 0.45,
  },

  // t8: Open Source Crush — upbeat, hopeful, a bit wistful
  t8: {
    bpm: 116,
    chords: [
      [D4, F4, A4],
      [G3, Bb3, D4],
      [C4, E4, G4],
      [F3, A3, C4],
    ],
    melodyNotes: [D4, F4, G4, A4, C5, D5],
    melodyRhythm: [0, 2, 4, 8, 10, 12],
    padFilter: 2600,
    reverb: 0.4,
  },

  // t9: Sunday Deploy — lazy, relaxed, no pressure
  t9: {
    bpm: 96,
    chords: [
      [G3, B3, D4],
      [E3, G3, B3],
      [C4, E4, G4],
      [D4, F4, A4],
    ],
    melodyNotes: [G3, B3, D4, E4, G4],
    melodyRhythm: [0, 6, 8, 14],
    padWave: 'triangle',
    padGain: 0.06,
    padFilter: 2000,
    reverb: 0.6,
  },

  // t10: npm install feelings — quirky, bouncy, playful
  t10: {
    bpm: 112,
    chords: [
      [A3, C4, E4],
      [D4, F4, A4],
      [E3, G3, B3],
      [F3, A3, C4],
    ],
    melodyNotes: [A3, C4, E4, F4, A4, C5],
    melodyRhythm: [0, 2, 4, 6, 10, 12, 14],
    melodyWave: 'triangle',
    padFilter: 3200,
    reverb: 0.3,
  },

  // ── Hip-Hop ──

  // t11: Ship It — confident, punchy, headnod beat
  t11: {
    bpm: 92,
    chords: [
      [C3, Eb3, G3],
      [Ab3, C4, Eb4],
      [Bb3, D4, F4],
      [G3, Bb3, D4],
    ],
    melodyNotes: [C4, Eb4, F4, G4, Bb4],
    melodyRhythm: [0, 3, 6, 8, 11, 14],
    bassGain: 0.16,
    padFilter: 900,
    reverb: 0.2,
  },

  // t12: Stack Overflow Flow — smooth, clever, laid back flow
  t12: {
    bpm: 88,
    chords: [
      [D3, F3, A3],
      [G3, Bb3, D4],
      [C3, Eb3, G3],
      [F3, Ab3, C4],
    ],
    melodyNotes: [D4, F4, G4, A4, C5],
    melodyRhythm: [0, 3, 4, 8, 11, 12],
    padWave: 'sine',
    padFilter: 800,
    reverb: 0.25,
  },

  // t13: 3 AM Push — dark, moody, late-night intensity
  t13: {
    bpm: 85,
    chords: [
      [A3, C4, E4],
      [F3, Ab3, C4],
      [G3, Bb3, D4],
      [Eb3, G3, Bb3],
    ],
    melodyNotes: [A3, C4, D4, E4, G4],
    melodyRhythm: [0, 4, 7, 8, 12],
    melodyGain: 0.07,
    bassGain: 0.18,
    padFilter: 700,
    reverb: 0.35,
  },

  // t14: Merge Conflict — tense, rhythmic, confrontational
  t14: {
    bpm: 95,
    chords: [
      [Eb3, G3, Bb3],
      [C3, Eb3, G3],
      [Ab3, C4, Eb4],
      [Bb3, D4, F4],
    ],
    melodyNotes: [Eb4, F4, G4, Bb4, C5],
    melodyRhythm: [0, 2, 4, 8, 10, 14],
    bassGain: 0.15,
    padFilter: 1000,
    reverb: 0.15,
  },

  // t15: git push --force — aggressive, bold, no looking back
  t15: {
    bpm: 98,
    chords: [
      [G3, Bb3, D4],
      [Eb3, G3, Bb3],
      [F3, Ab3, C4],
      [D3, F3, Ab3],
    ],
    melodyNotes: [G4, Bb4, C5, D5, F5],
    melodyRhythm: [0, 2, 6, 8, 10, 14],
    melodyGain: 0.1,
    bassGain: 0.16,
    padFilter: 1100,
    reverb: 0.15,
  },

  // ── Pop ──

  // t16: Pixel Perfect — bright, precise, satisfying
  t16: {
    bpm: 122,
    chords: [
      [C4, E4, G4],
      [G3, B3, D4],
      [A3, C4, E4],
      [F3, A3, C4],
    ],
    melodyNotes: [E4, G4, A4, B4, C5, D5, E5],
    melodyRhythm: [0, 2, 4, 8, 10, 12],
    melodyWave: 'sine',
    padFilter: 3500,
    reverb: 0.3,
  },

  // t17: Tailwind Hearts — catchy, feel-good, danceable
  t17: {
    bpm: 126,
    chords: [
      [D4, F4, A4],
      [G3, B3, D4],
      [C4, E4, G4],
      [A3, C4, E4],
    ],
    melodyNotes: [D4, E4, F4, A4, B4, D5],
    melodyRhythm: [0, 2, 4, 6, 8, 12, 14],
    padFilter: 3200,
    reverb: 0.25,
  },

  // t18: Component Chemistry — bubbly, playful, spark between elements
  t18: {
    bpm: 118,
    chords: [
      [A3, C4, E4],
      [F3, A3, C4],
      [G3, B3, D4],
      [E3, G3, B3],
    ],
    melodyNotes: [C4, E4, F4, G4, A4, C5],
    melodyRhythm: [0, 3, 4, 8, 11, 12],
    padFilter: 3000,
    reverb: 0.3,
  },

  // t19: Type Safe Love — sweet, reassuring, warm
  t19: {
    bpm: 110,
    chords: [
      [F3, A3, C4, E4],
      [C4, E4, G4],
      [D4, F4, A4],
      [G3, B3, D4],
    ],
    melodyNotes: [A4, C5, D5, E5, G5],
    melodyRhythm: [0, 4, 6, 8, 12],
    melodyWave: 'sine',
    melodyGain: 0.12,
    padFilter: 3800,
    reverb: 0.35,
  },

  // t20: First Contentful Paint — uplifting, the moment it all appears
  t20: {
    bpm: 128,
    chords: [
      [C4, E4, G4, B4],
      [F3, A3, C4],
      [G3, B3, D4],
      [A3, C4, E4],
    ],
    melodyNotes: [E4, G4, B4, C5, D5, E5],
    melodyRhythm: [0, 2, 4, 8, 10, 12, 14],
    padFilter: 4000,
    reverb: 0.2,
  },

  // ── Lo-fi ──

  // t21: Slow Build — gradual, patient, warm lo-fi layers
  t21: {
    bpm: 75,
    chords: [
      [G3, B3, D4, F4],
      [C4, E4, G4],
      [A3, C4, E4, G4],
      [D4, F4, A4],
    ],
    melodyNotes: [B3, D4, E4, G4, A4],
    melodyRhythm: [0, 6, 8, 14],
    melodyWave: 'triangle',
    padFilter: 1400,
    reverb: 0.6,
  },

  // t22: Console Calm — serene, steady, like watching logs scroll
  t22: {
    bpm: 72,
    chords: [
      [C4, E4, G4, B4],
      [A3, C4, E4],
      [F3, A3, C4, E4],
      [G3, B3, D4],
    ],
    melodyNotes: [E4, G4, A4, B4, D5],
    melodyRhythm: [0, 4, 8, 12],
    melodyWave: 'triangle',
    melodyGain: 0.07,
    padFilter: 1200,
    reverb: 0.65,
  },

  // t23: Soft Reset — gentle restart, fresh beginning
  t23: {
    bpm: 80,
    chords: [
      [D4, F4, A4],
      [G3, B3, D4],
      [C4, E4, G4],
      [A3, C4, E4],
    ],
    melodyNotes: [D4, F4, G4, A4, C5],
    melodyRhythm: [0, 4, 6, 8, 12],
    padWave: 'sine',
    padFilter: 1500,
    reverb: 0.55,
  },

  // t24: Idle Thread — floating, peaceful, nothing to process
  t24: {
    bpm: 68,
    chords: [
      [F3, A3, C4, E4],
      [Bb3, D4, F4],
      [C4, E4, G4],
      [G3, Bb3, D4],
    ],
    melodyNotes: [A3, C4, E4, F4, A4],
    melodyRhythm: [0, 8, 12],
    melodyWave: 'sine',
    melodyGain: 0.06,
    padFilter: 1100,
    reverb: 0.7,
  },

  // t25: npm install sleep — drowsy, cozy, winding down
  t25: {
    bpm: 65,
    chords: [
      [G3, Bb3, D4],
      [Eb3, G3, Bb3],
      [F3, A3, C4],
      [C4, Eb4, G4],
    ],
    melodyNotes: [Bb3, D4, Eb4, F4, G4],
    melodyRhythm: [0, 6, 12],
    melodyWave: 'triangle',
    melodyGain: 0.06,
    padFilter: 1000,
    reverb: 0.7,
  },

  // ── Synthwave ──

  // t26: Neon Terminal — glowing, pulsing, retro-futuristic
  t26: {
    bpm: 108,
    chords: [
      [A3, C4, E4],
      [F3, Ab3, C4],
      [G3, Bb3, D4],
      [E3, G3, B3],
    ],
    melodyNotes: [A3, C4, D4, E4, G4, A4],
    melodyRhythm: [0, 2, 4, 8, 10, 12, 14],
    melodyWave: 'sawtooth',
    melodyGain: 0.08,
    arpeggiate: true,
    arpSpeed: 2,
    padFilter: 2400,
    reverb: 0.35,
  },

  // t27: Retro Compiler — mechanical, precise, 80s processor vibes
  t27: {
    bpm: 115,
    chords: [
      [D3, F3, A3],
      [Bb3, D4, F4],
      [C4, E4, G4],
      [G3, Bb3, D4],
    ],
    melodyNotes: [D4, F4, G4, A4, C5, D5],
    melodyRhythm: [0, 2, 4, 6, 8, 12, 14],
    melodyWave: 'square',
    arpeggiate: true,
    arpSpeed: 3,
    padFilter: 2000,
    reverb: 0.3,
  },

  // t28: Cyber Monday — driving, commercial energy, synth bass
  t28: {
    bpm: 120,
    chords: [
      [E3, G3, B3],
      [C3, E3, G3],
      [A3, C4, E4],
      [D3, F3, A3],
    ],
    melodyNotes: [E4, G4, A4, B4, D5, E5],
    melodyRhythm: [0, 2, 4, 8, 10, 14],
    melodyWave: 'sawtooth',
    bassWave: 'sawtooth',
    bassGain: 0.14,
    padFilter: 2600,
    reverb: 0.2,
  },

  // t29: Chrome Dreams — shimmering, nostalgic, wide pads
  t29: {
    bpm: 100,
    chords: [
      [C4, E4, G4, B4],
      [A3, C4, E4, G4],
      [F3, A3, C4, E4],
      [G3, B3, D4, F4],
    ],
    melodyNotes: [E4, G4, B4, C5, D5],
    melodyRhythm: [0, 4, 8, 12],
    melodyWave: 'sawtooth',
    melodyGain: 0.06,
    padWave: 'sawtooth',
    padGain: 0.05,
    padFilter: 3000,
    reverb: 0.5,
  },

  // t30: Midnight Deploy — dark, urgent, pushing to production at night
  t30: {
    bpm: 118,
    chords: [
      [A3, C4, E4],
      [F3, Ab3, C4],
      [E3, G3, B3],
      [D3, F3, A3],
    ],
    melodyNotes: [A4, C5, D5, E5, G5],
    melodyRhythm: [0, 2, 6, 8, 10, 14],
    melodyWave: 'sawtooth',
    bassWave: 'sawtooth',
    padFilter: 2200,
    reverb: 0.25,
  },
};
