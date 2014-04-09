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

// NotePlayer.js
// Tim Mickel, 2013
// Based entirely on the AS version by John Maloney
//
// Subclass of SoundDecoder to play notes on a sampled instrument or drum.
//
// A sampled instrument outputs interpolated sound samples from  an array of signed,
// 16-bit integers with an original sampling rate of 22050 samples/sec. The pitch is
// shifted by change the step size while iterating through this array. An instrument
// may also be looped so that it can be sustained and it may have a volume envelope
// to control the attack and decay of the note.

var NotePlayer = function(wavFileData, originalPitch, loopStart, loopEnd, env) {
    this.originalPitch = originalPitch || null;
    this.index = 0;
    this.samplesRemaining = 0; // determines note duration

    // Looping
    this.isLooped = false;
    this.loopPoint = 0; // final sample in loop
    this.loopLength = 0;

    // Volume Envelope
    this.envelopeValue = 1;
    this.samplesSinceStart = 0;
    this.attackEnd = 0;
    this.attackRate = 0;
    this.holdEnd = 0;
    this.decayRate = 1;

    if (wavFileData == null) wavFileData = new ArrayBuffer();

    var stepSize = 0.5; // default - no pitch shift
    var startOffset = 0;
    this.endOffset = wavFileData.byteLength / 2; // end of sample data
    var getSample = function() { return 0; } // called once at startup time
    this.soundData = new Uint8Array(wavFileData);

    if ((loopStart >= 0) && (loopStart < this.endOffset)) {
        this.isLooped = true;
        this.loopPoint = loopStart;
        if ((loopEnd > 0) && (loopEnd <= this.endOffset)) this.endOffset = loopEnd;
        this.loopLength = this.endOffset - this.loopPoint;

        // Compute the original pitch more exactly from the loop length:
        var oneCycle = 22050 / this.originalPitch;
        var cycles = Math.round(this.loopLength / oneCycle);
        this.originalPitch = 22050 / (this.loopLength / cycles);
    }
    if (env) {
        this.attackEnd = env[0] * 44.100;
        if (this.attackEnd > 0) this.attackRate = Math.pow(33000, 1 / this.attackEnd);
        this.holdEnd = this.attackEnd + env[1] * 44.100;
        var decayCount = env[2] * 44100;
        this.decayRate = decayCount == 0 ? 1 : Math.pow(33000, -1 / decayCount);
    }
};

NotePlayer.prototype = Object.create(SoundDecoder.prototype);
NotePlayer.prototype.constructor = NotePlayer;

NotePlayer.prototype.setNoteAndDuration = function(midiKey, secs) {
    midiKey = Math.max(0, Math.min(midiKey, 127));
    var pitch = 440 * Math.pow(2, (midiKey - 69) / 12); // midi key 69 is A (440 Hz)
    this.stepSize = pitch / (2 * this.originalPitch); // adjust for original sampling rate of 22050
    this.setDuration(secs);
};

NotePlayer.prototype.setDuration = function(secs) {
    this.samplesSinceStart = 0;
    this.samplesRemaining = 44100 * secs;
    if (!this.isLooped) this.samplesRemaining = Math.min(this.samplesRemaining, this.endOffset / this.stepSize);
    this.envelopeValue = this.attackEnd > 0 ? 1 / 33000 : 1;
};

NotePlayer.prototype.interpolatedSample = function() {
    if (this.samplesRemaining-- <= 0) { this.noteFinished(); return 0; }
    this.index += this.stepSize;
    while (this.index >= this.endOffset) {
        if (!this.isLooped) return 0;
        this.index -= this.loopLength;
    }
    var i = Math.floor(this.index);
    var frac = this.index - i;
    var curr = this.rawSample(i);
    var next = this.rawSample(i + 1);
    var sample = (curr + frac * (next - curr)) / 100000; // xxx 32000; attenuate...
    if (this.samplesRemaining < 1000) sample *= (this.samplesRemaining / 1000.0); // relaase phease
    this.updateEnvelope();
    return this.envelopeValue * sample;
};

NotePlayer.prototype.rawSample = function(sampleIndex) {
    if (sampleIndex >= this.endOffset) {
        if (!this.isLooped) return 0;
        sampleIndex = this.loopPoint;
    }
    var byteIndex = 2 * sampleIndex;
    var result = (this.soundData[byteIndex + 1] << 8) + this.soundData[byteIndex];
    return result <= 32767 ? result : result - 65536;
};

NotePlayer.prototype.updateEnvelope = function() {
    // Compute envelopeValue for the current sample.
    this.samplesSinceStart++;
    if (this.samplesSinceStart < this.attackEnd) {
        this.envelopeValue *= this.attackRate;
    } else if (this.samplesSinceStart == this.attackEnd) {
        this.envelopeValue = 1;
    } else if (this.samplesSinceStart > this.holdEnd) {
        if (this.decayRate < 1) this.envelopeValue *= this.decayRate;
    }
};
