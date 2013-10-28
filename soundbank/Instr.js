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

// Instr.js
// Tim Mickel, 2013
// Based entirely on the AS by John Maloney, April 2012
//
// This class interacts with IO to load Scratch instruments and drums.
// The variable 'samples' is a dictionary of named sound buffers.
// Call initSamples() to initialize 'samples' before using (during load).
//
// All instrument and drum samples were created for Scratch by:
//
//      Paul Madden, paulmatthewmadden@yahoo.com
//
// Paul is an excellent sound designer and we appreciate all the effort
// he put into this project.

var Instr = function() {}

Instr.samples = {};
Instr.wavsLoaded = 0;

Instr.wavs = {
    'AcousticGuitar_F3': 'instruments/AcousticGuitar_F3_22k.wav',
    'AcousticPiano_As3': 'instruments/AcousticPiano(5)_A#3_22k.wav',
    'AcousticPiano_C4': 'instruments/AcousticPiano(5)_C4_22k.wav',
    'AcousticPiano_G4': 'instruments/AcousticPiano(5)_G4_22k.wav',
    'AcousticPiano_F5': 'instruments/AcousticPiano(5)_F5_22k.wav',
    'AcousticPiano_C6': 'instruments/AcousticPiano(5)_C6_22k.wav',
    'AcousticPiano_Ds6': 'instruments/AcousticPiano(5)_D#6_22k.wav',
    'AcousticPiano_D7': 'instruments/AcousticPiano(5)_D7_22k.wav',
    'AltoSax_A3': 'instruments/AltoSax_A3_22K.wav',
    'AltoSax_C6': 'instruments/AltoSax(3)_C6_22k.wav',
    'Bassoon_C3': 'instruments/Bassoon_C3_22k.wav',
    'BassTrombone_A2_2': 'instruments/BassTrombone_A2(2)_22k.wav',
    'BassTrombone_A2_3': 'instruments/BassTrombone_A2(3)_22k.wav',
    'Cello_C2': 'instruments/Cello(3b)_C2_22k.wav',
    'Cello_As2': 'instruments/Cello(3)_A#2_22k.wav',
    'Choir_F3': 'instruments/Choir(4)_F3_22k.wav',
    'Choir_F4': 'instruments/Choir(4)_F4_22k.wav',
    'Choir_F5': 'instruments/Choir(4)_F5_22k.wav',
    'Clarinet_C4': 'instruments/Clarinet_C4_22k.wav',
    'ElectricBass_G1': 'instruments/ElectricBass(2)_G1_22k.wav',
    'ElectricGuitar_F3': 'instruments/ElectricGuitar(2)_F3(1)_22k.wav',
    'ElectricPiano_C2': 'instruments/ElectricPiano_C2_22k.wav',
    'ElectricPiano_C4': 'instruments/ElectricPiano_C4_22k.wav',
    'EnglishHorn_D4': 'instruments/EnglishHorn(1)_D4_22k.wav',
    'EnglishHorn_F3': 'instruments/EnglishHorn(1)_F3_22k.wav',
    'Flute_B5_1': 'instruments/Flute(3)_B5(1)_22k.wav',
    'Flute_B5_2': 'instruments/Flute(3)_B5(2)_22k.wav',
    'Marimba_C4': 'instruments/Marimba_C4_22k.wav',
    'MusicBox_C4': 'instruments/MusicBox_C4_22k.wav',
    'Organ_G2': 'instruments/Organ(2)_G2_22k.wav',
    'Pizz_A3': 'instruments/Pizz(2)_A3_22k.wav',
    'Pizz_E4': 'instruments/Pizz(2)_E4_22k.wav',
    'Pizz_G2': 'instruments/Pizz(2)_G2_22k.wav',
    'SteelDrum_D5': 'instruments/SteelDrum_D5_22k.wav',
    'SynthLead_C4': 'instruments/SynthLead(6)_C4_22k.wav',
    'SynthLead_C6': 'instruments/SynthLead(6)_C6_22k.wav',
    'SynthPad_A3': 'instruments/SynthPad(2)_A3_22k.wav',
    'SynthPad_C6': 'instruments/SynthPad(2)_C6_22k.wav',
    'TenorSax_C3': 'instruments/TenorSax(1)_C3_22k.wav',
    'Trombone_B3': 'instruments/Trombone_B3_22k.wav',
    'Trumpet_E5': 'instruments/Trumpet_E5_22k.wav',
    'Vibraphone_C3': 'instruments/Vibraphone_C3_22k.wav',
    'Violin_D4': 'instruments/Violin(2)_D4_22K.wav',
    'Violin_A4': 'instruments/Violin(3)_A4_22k.wav',
    'Violin_E5': 'instruments/Violin(3b)_E5_22k.wav',
    'WoodenFlute_C5': 'instruments/WoodenFlute_C5_22k.wav',
    // Drums
    'BassDrum': 'drums/BassDrum(1b)_22k.wav',
    'Bongo': 'drums/Bongo_22k.wav',
    'Cabasa': 'drums/Cabasa(1)_22k.wav',
    'Clap': 'drums/Clap(1)_22k.wav',
    'Claves': 'drums/Claves(1)_22k.wav',
    'Conga': 'drums/Conga(1)_22k.wav',
    'Cowbell': 'drums/Cowbell(3)_22k.wav',
    'Crash': 'drums/Crash(2)_22k.wav',
    'Cuica': 'drums/Cuica(2)_22k.wav',
    'GuiroLong': 'drums/GuiroLong(1)_22k.wav',
    'GuiroShort': 'drums/GuiroShort(1)_22k.wav',
    'HiHatClosed': 'drums/HiHatClosed(1)_22k.wav',
    'HiHatOpen': 'drums/HiHatOpen(2)_22k.wav',
    'HiHatPedal': 'drums/HiHatPedal(1)_22k.wav',
    'Maracas': 'drums/Maracas(1)_22k.wav',
    'SideStick': 'drums/SideStick(1)_22k.wav',
    'SnareDrum': 'drums/SnareDrum(1)_22k.wav',
    'Tambourine': 'drums/Tambourine(3)_22k.wav',
    'Tom': 'drums/Tom(1)_22k.wav',
    'Triangle': 'drums/Triangle(1)_22k.wav',
    'Vibraslap': 'drums/Vibraslap(1)_22k.wav',
    'WoodBlock': 'drums/WoodBlock(1)_22k.wav'
};

Instr.wavCount = Object.keys(Instr.wavs).length;
