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

// WAVFile.js
// Utility class for reading and decoding WAV file metadata
// Based directly on John Maloney's AS version for the Scratch Flash Player

var WAVFile = function() {};

WAVFile.decode = function(waveData) {
    // Decode the given WAV file data and return an Object with the format and sample data.
    var result = {};

    var data = new OffsetBuffer(waveData);

    // read WAVE File Header
    if (data.readString(4) != 'RIFF') { console.log("WAVFile:  bad file header"); return; }
    var totalSize = data.readInt();
    if (data.getLength() != (totalSize + 8)) console.log("WAVFile: bad RIFF size; ignoring");
    if (data.readString(4) != 'WAVE') { console.log("WAVFile: not a WAVE file"); return; }

    // read format chunk
    var formatChunk = WAVFile.extractChunk('fmt ', data);
    if (formatChunk.getLength() < 16) { console.log("WAVFile: format chunk is too small"); return; }

    var encoding = formatChunk.readShort();
    result.encoding = encoding;
    result.channels = formatChunk.readShort();
    result.samplesPerSecond = formatChunk.readInt();
    result.bytesPerSecond = formatChunk.readInt();
    result.blockAlignment = formatChunk.readShort();
    result.bitsPerSample = formatChunk.readShort();

    // get size of data chunk
    var sampleDataStartAndSize = WAVFile.dataChunkStartAndSize(data);
    result.sampleDataStart = sampleDataStartAndSize[0];
    result.sampleDataSize = sampleDataStartAndSize[1];

    // handle various encodings
    if (encoding == 1) {
        if (!((result.bitsPerSample == 8) || (result.bitsPerSample == 16))) {
            console.log("WAVFile: can only handle 8-bit or 16-bit uncompressed PCM data");
            return;
        }
        result.sampleCount = result.sampleDataSize / 2;
    } else if (encoding == 17) {
        if (formatChunk.length < 20) { console.log("WAVFile: adpcm format chunk is too small"); return; }
        if (result.channels != 1) { console.log("WAVFile: adpcm supports only one channel (monophonic)"); return; }
        formatChunk.offset += 2;  // skip extra header byte count
        var samplesPerBlock = formatChunk.readShort();
        result.adpcmBlockSize = ((samplesPerBlock - 1) / 2) + 4; // block size in bytes
        var factChunk = WAVFile.extractChunk('fact', data);
        if ((factChunk != null) && (factChunk.getLength() == 4)) {
            result.sampleCount = factChunk.readInt();
        } else {
            // this should never happen, since there should always be a 'fact' chunk
            // slight over-estimate (doesn't take ADPCM headers into account)
            result.sampleCount = 2 * result.sampleDataSize;
        }
    } else {
        console.log("WAVFile: unknown encoding " + encoding);
        return;
    }
    return result;
};

WAVFile.extractChunk = function(desiredType, data) {
    // Return the contents of the first chunk of the given type or an empty OffsetBuffer if it is not found.
    data.offset = 12;
    while (data.bytesAvailable() > 8) {
        var chunkType = data.readString(4);
        var chunkSize = data.readUint();
        if (chunkType == desiredType) {
            if (chunkSize > data.bytesAvailable()) return null;
            var result = new OffsetBuffer(data.readBytes(chunkSize));
            return result;
        } else {
            data.offset += chunkSize;
        }
    }
    return new OffsetBuffer(new ArrayBuffer());
};

WAVFile.dataChunkStartAndSize = function(data) {
    // Return an array with the starting offset and size of the first chunk of the given type.
    data.offset = 12;
    while (data.bytesAvailable() >= 8) {
        var chunkType = data.readString(4);
        var chunkSize = data.readUint();
        if (chunkType == 'data') {
            if (chunkSize > data.bytesAvailable()) return [0, 0]; // bad wave file
            return [data.offset, chunkSize];
        } else {
            data.offset += chunkSize;
        }
    }
    return [0, 0]; // chunk not found; bad wave file
};
