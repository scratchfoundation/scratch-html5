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

'use strict';

var SoundPrims = function() {};

SoundPrims.prototype.addPrimsTo = function(primTable) {
    primTable['playSound:'] = this.primPlaySound;
    primTable['doPlaySoundAndWait'] = this.primPlaySoundUntilDone;
    primTable['stopAllSounds'] = this.primStopAllSounds;

    primTable['playDrum'] = this.primPlayDrum;
    primTable['rest:elapsed:from:'] = this.primPlayRest;
    primTable['noteOn:duration:elapsed:from:'] = this.primPlayNote;
    primTable['instrument:'] = this.primSetInstrument;

    /*primTable['changeVolumeBy:'] = this.primChangeVolume;
    primTable['setVolumeTo:'] = this.primSetVolume;
    primTable['volume'] = this.primVolume;*/

    primTable['changeTempoBy:'] = function(b) { runtime.stage.data.tempoBPM = runtime.stage.data.tempoBPM + interp.arg(b, 0); };
    primTable['setTempoTo:'] = function(b) { runtime.stage.data.tempoBPM = interp.arg(b, 0); };
    primTable['tempo'] = function(b) { return runtime.stage.data.tempoBPM; };
};

var playSound = function(snd) {
    if (snd.source) {
        // If this particular sound is already playing, stop it.
        snd.source.disconnect();
        snd.source = null;
    }

    snd.source = runtime.audioContext.createBufferSource();
    snd.source.buffer = snd.buffer;
    snd.source.connect(runtime.audioGain);

    // Track the sound's completion state
    snd.source.done = false;
    snd.source.finished = function() {
        // Remove from the active audio list and disconnect the source from
        // the sound dictionary.
        var i = runtime.audioPlaying.indexOf(snd);
        if (i > -1 && runtime.audioPlaying[i].source != null) {
            runtime.audioPlaying[i].source.done = true;
            runtime.audioPlaying[i].source = null;
            runtime.audioPlaying.splice(i, 1);
        }
    }
    window.setTimeout(snd.source.finished, snd.buffer.duration * 1000);
    // Add the global list of playing sounds and start playing.
    runtime.audioPlaying.push(snd);
    snd.source.start();
    return snd.source;
};

var playDrum = function(drum, secs, client) {
    var player = SoundBank.getDrumPlayer(drum, secs);
    player.client = client;
    player.setDuration(secs);
    var source = runtime.audioContext.createScriptProcessor(4096, 1, 1);
    source.onaudioprocess = function(e) { player.writeSampleData(e); };
    source.soundPlayer = player;
    source.connect(runtime.audioGain);
    runtime.notesPlaying.push(source);
    source.finished = function() {
        var i = runtime.notesPlaying.indexOf(source);
        if (i > -1 && runtime.notesPlaying[i] != null) {
            runtime.notesPlaying.splice(i, 1);
        }
    }
    window.setTimeout(source.finished, secs * 1000);
    return player;
};

var playNote = function(instrument, midiKey, secs, client) {
    var player =  SoundBank.getNotePlayer(instrument, midiKey);
    player.client = client;
    player.setNoteAndDuration(midiKey, secs);
    var source = runtime.audioContext.createScriptProcessor(4096, 1, 1);
    source.onaudioprocess = function(e) { player.writeSampleData(e); };
    source.connect(runtime.audioGain);
    runtime.notesPlaying.push(source);
    source.finished = function() {
        var i = runtime.notesPlaying.indexOf(source);
        if (i > -1 && runtime.notesPlaying[i] != null) {
            runtime.notesPlaying.splice(i, 1);
        }
    }
    window.setTimeout(source.finished, secs * 1000);
    return player;
};

var stopAllSounds = function() {
    var oldPlaying = runtime.audioPlaying;
    runtime.audioPlaying = [];
    for (var s = 0; s < oldPlaying.length; s++) {
        if (oldPlaying[s].source) {
            oldPlaying[s].source.disconnect();
            oldPlaying[s].source.finished();
        }
    }

    var oldPlaying = runtime.notesPlaying;
    runtime.notesPlaying = [];
    for (var s = 0; s < oldPlaying.length; s++) {
        if (oldPlaying[s]) {
            oldPlaying[s].disconnect();
            oldPlaying[s].finished();
        }
    }
};

SoundPrims.prototype.primPlaySound = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    var snd = s.soundNamed(interp.arg(b, 0));
    if (snd != null) playSound(snd);
};

SoundPrims.prototype.primPlaySoundUntilDone = function(b) {
    var activeThread = interp.activeThread;
    if (activeThread.firstTime) {
        var snd = interp.targetSprite().soundNamed(interp.arg(b, 0));
        if (snd == null) return;
        activeThread.tmpObj = playSound(snd);
        activeThread.firstTime = false;
    }
    var player = activeThread.tmpObj;
    if (player == null || player.done || player.playbackState == 3) {
        activeThread.tmpObj = null;
        activeThread.firstTime = true;
    } else {
        interp.yield = true;
    }
};

var beatsToSeconds = function(beats) {
    return beats * 60 / runtime.stage.data.tempoBPM;
};

SoundPrims.prototype.primPlayNote = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    if (interp.activeThread.firstTime) {
        var key = interp.numarg(b, 0);
        var secs = beatsToSeconds(interp.numarg(b, 1));
        playNote(s.instrument, key, secs, s);
        interp.startTimer(secs);
    } else {
        interp.checkTimer();
    }
};

SoundPrims.prototype.primPlayDrum = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    if (interp.activeThread.firstTime) {
        var drum = Math.round(interp.numarg(b, 0));
        var secs = beatsToSeconds(interp.numarg(b, 1));
        playDrum(drum, secs, s);
        interp.startTimer(secs);
    } else {
        interp.checkTimer();
    }
};

SoundPrims.prototype.primPlayRest = function(b) {
    var s = interp.targetSprite();
    if (s == null) return;
    if (interp.activeThread.firstTime) {
        var secs = beatsToSeconds(interp.numarg(b, 0));
        interp.startTimer(secs);
    } else {
        interp.checkTimer();
    }
};

SoundPrims.prototype.primSetInstrument = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.instrument = interp.arg(b, 0);
};

SoundPrims.prototype.primStopAllSounds = function(b) {
    stopAllSounds();
};

SoundPrims.prototype.primChangeVolume = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.volume += interp.numarg(b, 0);
};

SoundPrims.prototype.primSetVolume = function(b) {
    var s = interp.targetSprite();
    if (s != null) s.volume = interp.numarg(b, 0);
};

SoundPrims.prototype.primVolume = function(b) {
    var s = interp.targetSprite();
    return s != null ? s.volume : 0;
};
