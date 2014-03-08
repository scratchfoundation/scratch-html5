var sensingData = {
  "objName": "Stage",
  "variables": [{
      "name": "myAnswer",
      "value": 0,
      "isPersistent": false
    }],
  "costumes": [{
      "costumeName": "backdrop1",
      "baseLayerID": -1,
      "baseLayerMD5": "b61b1077b0ea1931abee9dbbfa7903ff.png",
      "bitmapResolution": 2,
      "rotationCenterX": 480,
      "rotationCenterY": 360
    }],
  "currentCostumeIndex": 0,
  "penLayerMD5": "5c81a336fab8be57adc039a8a2b33ca9.png",
  "tempoBPM": 60,
  "videoAlpha": 0.5,
  "children": [{
      "objName": "Sprite1",
      "variables": [{
          "name": "myAnswer2",
          "value": 0,
          "isPersistent": false
        }, {
          "name": "answer",
          "value": 0,
          "isPersistent": false
        }],
      "scripts": [[42, 40.5, [["whenGreenFlag"], ["doAsk", "What's your name?"]]],
        [44.5,
          155.5,
          [["whenGreenFlag"],
            ["say:", "Hello!"],
            ["doIf", ["=", ["timeAndDate", "minute"], "60"], [["say:", ["timestamp"]]]]]]],
      "costumes": [{
          "costumeName": "costume1",
          "baseLayerID": -1,
          "baseLayerMD5": "f9a1c175dbe2e5dee472858dd30d16bb.svg",
          "bitmapResolution": 1,
          "rotationCenterX": 47,
          "rotationCenterY": 55
        }],
      "currentCostumeIndex": 0,
      "scratchX": 0,
      "scratchY": 0,
      "scale": 1,
      "direction": 90,
      "rotationStyle": "normal",
      "isDraggable": false,
      "indexInLibrary": 1,
      "visible": true,
      "spriteInfo": {
      }
    }],
  "info": {
    "projectID": "18926654",
    "spriteCount": 1,
    "flashVersion": "MAC 12,0,0,70",
    "swfVersion": "v396",
    "userAgent": "Mozilla\/5.0 (Macintosh; Intel Mac OS X 10.9; rv:27.0) Gecko\/20100101 Firefox\/27.0",
    "videoOn": false,
    "scriptCount": 2,
    "hasCloudData": false
  }
};
