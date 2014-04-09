// Copyright (C) 2013 Massachusetts Institute of Technology
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 2,
// as published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

// SoundBank.js
// Tim Mickel, 2013
// Based on the original AS by John Maloney - Scratch 1.4 compatibility removed
//
// A collection of instrument and drum resources to support the note and drum commands.

var SoundBank = function() {};

// -----------------------------
// Scratch 2.0 Instrument Definitions
//------------------------------

// Each instrument is an array of one or more key-span entries of the following form:
//
//   top key of key span, sampleName, midiKey, loopStart, loopEnd, [attack, hold, decay]
//
// The loop points are -1 if the sound is unlooped (e.g. Marimba).
// The three-element envelop array may be omitted if the instrument has no envelope.
SoundBank.instruments = [
    [
        [38, 'AcousticPiano_As3', 58, 10266, 17053, [0, 100, 22]],
        [44, 'AcousticPiano_C4', 60, 13968, 18975, [0, 100, 20]],
        [51, 'AcousticPiano_G4', 67, 12200, 12370, [0, 80, 18]],
        [62, 'AcousticPiano_C6', 84, 13042, 13276, [0, 80, 16]],
        [70, 'AcousticPiano_F5', 77, 12425, 12965, [0, 40, 14]],
        [77, 'AcousticPiano_Ds6', 87, 12368, 12869, [0, 20, 10]],
        [85, 'AcousticPiano_Ds6', 87, 12368, 12869, [0, 0, 8]],
        [90, 'AcousticPiano_Ds6', 87, 12368, 12869, [0, 0, 6]],
        [96, 'AcousticPiano_D7', 98, 7454, 7606, [0, 0, 3]],
        [128, 'AcousticPiano_D7', 98, 7454, 7606, [0, 0, 2]]
    ],
    [
        [48, 'ElectricPiano_C2', 36, 15338, 17360, [0, 80, 10]],
        [74, 'ElectricPiano_C4', 60, 11426, 12016, [0, 40, 8]],
        [128, 'ElectricPiano_C4', 60, 11426, 12016, [0, 0, 6]]
    ],
    [
        [128, 'Organ_G2', 43, 1306, 3330]
    ],
    [
        [40, 'AcousticGuitar_F3', 53, 36665, 36791, [0, 0, 15]],
        [56, 'AcousticGuitar_F3', 53, 36665, 36791, [0, 0, 13.5]],
        [60, 'AcousticGuitar_F3', 53, 36665, 36791, [0, 0, 12]],
        [67, 'AcousticGuitar_F3', 53, 36665, 36791, [0, 0, 8.5]],
        [72, 'AcousticGuitar_F3', 53, 36665, 36791, [0, 0, 7]],
        [83, 'AcousticGuitar_F3', 53, 36665, 36791, [0, 0, 5.5]],
        [128, 'AcousticGuitar_F3', 53, 36665, 36791, [0, 0, 4.5]]
    ],
    [
        [40, 'ElectricGuitar_F3', 53, 34692, 34945, [0, 0, 15]],
        [56, 'ElectricGuitar_F3', 53, 34692, 34945, [0, 0, 13.5]],
        [60, 'ElectricGuitar_F3', 53, 34692, 34945, [0, 0, 12]],
        [67, 'ElectricGuitar_F3', 53, 34692, 34945, [0, 0, 8.5]],
        [72, 'ElectricGuitar_F3', 53, 34692, 34945, [0, 0, 7]],
        [83, 'ElectricGuitar_F3', 53, 34692, 34945, [0, 0, 5.5]],
        [128, 'ElectricGuitar_F3', 53, 34692, 34945, [0, 0, 4.5]]
    ],
    [
        [34, 'ElectricBass_G1', 31, 41912, 42363, [0, 0, 17]],
        [48, 'ElectricBass_G1', 31, 41912, 42363, [0, 0, 14]],
        [64, 'ElectricBass_G1', 31, 41912, 42363, [0, 0, 12]],
        [128, 'ElectricBass_G1', 31, 41912, 42363, [0, 0, 10]]
    ],
    [
        [38, 'Pizz_G2', 43, 8554, 8782, [0, 0, 5]],
        [45, 'Pizz_G2', 43, 8554, 8782, [0, 12, 4]],
        [56, 'Pizz_A3', 57, 11460, 11659, [0, 0, 4]],
        [64, 'Pizz_A3', 57, 11460, 11659, [0, 0, 3.2]],
        [72, 'Pizz_E4', 64, 17525, 17592, [0, 0, 2.8]],
        [80, 'Pizz_E4', 64, 17525, 17592, [0, 0, 2.2]],
        [128, 'Pizz_E4', 64, 17525, 17592, [0, 0, 1.5]]
    ],
    [
        [41, 'Cello_C2', 36, 8548, 8885],
        [52, 'Cello_As2', 46, 7465, 7845],
        [62, 'Violin_D4', 62, 10608, 11360],
        [75, 'Violin_A4', 69, 3111, 3314, [70, 0, 0]],
        [128, 'Violin_E5', 76, 2383, 2484]
    ],
    [
        [30, 'BassTrombone_A2_3', 45, 1357, 2360],
        [40, 'BassTrombone_A2_2', 45, 1893, 2896],
        [55, 'Trombone_B3', 59, 2646, 3897],
        [88, 'Trombone_B3', 59, 2646, 3897, [50, 0, 0]],
        [128, 'Trumpet_E5', 76, 2884, 3152]
    ],
    [
        [128, 'Clarinet_C4', 60, 14540, 15468]
    ],
    [
        [40, 'TenorSax_C3', 48, 8939, 10794],
        [50, 'TenorSax_C3', 48, 8939, 10794, [20, 0, 0]],
        [59, 'TenorSax_C3', 48, 8939, 10794, [40, 0, 0]],
        [67, 'AltoSax_A3', 57, 8546, 9049],
        [75, 'AltoSax_A3', 57, 8546, 9049, [20, 0, 0]],
        [80, 'AltoSax_A3', 57, 8546, 9049, [20, 0, 0]],
        [128, 'AltoSax_C6', 84, 1258, 1848]
    ],
    [
        [61, 'Flute_B5_2', 83, 1859, 2259],
        [128, 'Flute_B5_1', 83, 2418, 2818]
    ],
    [
        [128, 'WoodenFlute_C5', 72, 11426, 15724]
    ],
    [
        [57, 'Bassoon_C3', 48, 2428, 4284],
        [67, 'Bassoon_C3', 48, 2428, 4284, [40, 0, 0]],
        [76, 'Bassoon_C3', 48, 2428, 4284, [80, 0, 0]],
        [84, 'EnglishHorn_F3', 53, 7538, 8930, [40, 0, 0]],
        [128, 'EnglishHorn_D4', 62, 4857, 5231]
    ],
    [
        [39, 'Choir_F3', 53, 14007, 41281],
        [50, 'Choir_F3', 53, 14007, 41281, [40, 0, 0]],
        [61, 'Choir_F3', 53, 14007, 41281, [60, 0, 0]],
        [72, 'Choir_F4', 65, 16351, 46436],
        [128, 'Choir_F5', 77, 18440, 45391]
    ],
    [
        [38, 'Vibraphone_C3', 48, 6202, 6370, [0, 100, 8]],
        [48, 'Vibraphone_C3', 48, 6202, 6370, [0, 100, 7.5]],
        [59, 'Vibraphone_C3', 48, 6202, 6370, [0, 60, 7]],
        [70, 'Vibraphone_C3', 48, 6202, 6370, [0, 40, 6]],
        [78, 'Vibraphone_C3', 48, 6202, 6370, [0, 20, 5]],
        [86, 'Vibraphone_C3', 48, 6202, 6370, [0, 0, 4]],
        [128, 'Vibraphone_C3', 48, 6202, 6370, [0, 0, 3]]
    ],
    [
        [128, 'MusicBox_C4', 60, 14278, 14700, [0, 0, 2]]
    ],
    [
        [128, 'SteelDrum_D5', 74.4, -1, -1, [0, 0, 2]]
    ],
    [
        [128, 'Marimba_C4', 60, -1, -1]
    ],
    [
        [80, 'SynthLead_C4', 60, 135, 1400],
        [128, 'SynthLead_C6', 84, 124, 356]
    ],
    [
        [38, 'SynthPad_A3', 57, 4212, 88017, [50, 0, 0]],
        [50, 'SynthPad_A3', 57, 4212, 88017, [80, 0, 0]],
        [62, 'SynthPad_A3', 57, 4212, 88017, [110, 0, 0]],
        [74, 'SynthPad_A3', 57, 4212, 88017, [150, 0, 0]],
        [86, 'SynthPad_A3', 57, 4212, 88017, [200, 0, 0]],
        [128, 'SynthPad_C6', 84, 2575, 9202]
    ]
];

// -----------------------------
// Scratch 2.0 Drum Definitions
//------------------------------

// Each drum entry is an array of of the form:
//
//   sampleName, pitchAdjust, [loopStart, loopEnd, decay]
//
// pitchAdjust (pitch shift in semitones) adjusts the original pitch.
// The loop points and decay parameter may be omitted if the drum is unlooped.
// (A few drums are looped to create several different pitched drums from one sample.)
SoundBank.drums = [
    ['SnareDrum', 0],
    ['Tom', 0],
    ['SideStick', 0],
    ['Crash', -7],
    ['HiHatOpen', -8],
    ['HiHatClosed', 0],
    ['Tambourine', 0],
    ['Clap', 0],
    ['Claves', 0],
    ['WoodBlock', -4],
    ['Cowbell', 0],
    ['Triangle', -6, 16843, 17255, 2],
    ['Bongo', 2],
    ['Conga', -7, 4247, 4499, 2], // jhm decay
    ['Cabasa', 0],
    ['GuiroLong', 0],
    ['Vibraslap', -6],
    ['Cuica', -5],
];

SoundBank.getNotePlayer = function(instNum, midiKey) {
    // Return a NotePlayer for the given Scratch 2.0 instrument number (1..21)
    // and MIDI key (0..127). If the instrument is out of range, use 1.
    var r = SoundBank.getNoteRecord(instNum - 1, midiKey);
    var env = r.length > 5 ? r[5] : null;
    return new NotePlayer(Instr.samples[r[1]], SoundBank.pitchForKey(r[2]), r[3], r[4], env);
};

SoundBank.getNoteRecord = function(instNum, midiKey) {
    // Get a note record for the given instrument number.
    if (instNum < 0 || instNum >= SoundBank.instruments.length) instNum = 0;
    var keyRanges = SoundBank.instruments[instNum];
    for (var r = 0; r < keyRanges.length; r++) {
        var topOfKeyRange = keyRanges[r][0];
        if (midiKey <= topOfKeyRange) return keyRanges[r];
    }
    return keyRanges[keyRanges.length - 1]; // return the note record for the top key range.
};

SoundBank.pitchForKey = function(midiKey) {
    return 440 * Math.pow(2, (midiKey - 69) / 12); // midi key 69 is A=440 Hz
};

SoundBank.getDrumPlayer = function(drumNum, secs) {
    // Return a NotePlayer for the given drum number.
    var entry = SoundBank.drums[drumNum - 1];
    if (entry == null) entry = SoundBank.drums[2];
    var loopStart = -1, loopEnd = -1, env = null;
    if (entry.length >= 4) {
        loopStart = entry[2];
        loopEnd = entry[3];
    }
    if (entry.length >= 5) env = [0, 0, entry[4]];
    var player = new NotePlayer(Instr.samples[entry[0]], SoundBank.pitchForKey(60), loopStart, loopEnd, env);
    player.setNoteAndDuration(60 + entry[1], 0);
    return player;
};
