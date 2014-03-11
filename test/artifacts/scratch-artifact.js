'use strict';

var project_id = 123456789;

var returnData = {
  "objName": "Stage",
  "sounds": [{
      "soundName": "pop",
      "soundID": -1,
      "md5": "83a9787d4cb6f3b7632b4ddfebf74367.wav",
      "sampleCount": 258,
      "rate": 11025,
      "format": ""
    }],
  "costumes": [{
      "costumeName": "Scene 1",
      "baseLayerID": -1,
      "baseLayerMD5": "510da64cf172d53750dffd23fbf73563.png",
      "rotationCenterX": 240,
      "rotationCenterY": 180,
      "spritesHiddenInScene": null
    }],
  "currentCostumeIndex": 0,
  "penLayerMD5": "279467d0d49e152706ed66539b577c00.png",
  "tempoBPM": 60,
  "children": [{
      "objName": "Sprite1",
      "scripts": [[283,
          151,
          [["whenClicked"],
            ["clearPenTrails"],
            ["penColor:", 10485886],
            ["putPenDown"],
            ["doForever",
              [["gotoX:y:", ["randomFrom:to:", -240, 240], ["randomFrom:to:", -180, 180]], ["changePenShadeBy:", 10]]]]]],
      "sounds": [{
          "soundName": "pop",
          "soundID": -1,
          "md5": "83a9787d4cb6f3b7632b4ddfebf74367.wav",
          "sampleCount": 258,
          "rate": 11025,
          "format": ""
        }],
      "costumes": [{
          "costumeName": "Costume1",
          "baseLayerID": -1,
          "baseLayerMD5": "cce61b6e9ad98ea8c8c2e9556a94b7ab.png",
          "rotationCenterX": 47,
          "rotationCenterY": 55,
          "spritesHiddenInScene": null
        },
        {
          "costumeName": "Costume2",
          "baseLayerID": -1,
          "baseLayerMD5": "51f6fa1871f17de1a21cdfead7aad574.png",
          "rotationCenterX": 47,
          "rotationCenterY": 55,
          "spritesHiddenInScene": null
        }],
      "currentCostumeIndex": 0,
      "scratchX": 120,
      "scratchY": -101,
      "scale": 1,
      "direction": 90,
      "rotationStyle": "normal",
      "isDraggable": false,
      "indexInLibrary": 0,
      "visible": true
    },
    {
      "objName": "fish31",
      "scripts": [[181, 138, [["whenClicked"], ["nextCostume"]]]],
      "sounds": [{
          "soundName": "pop",
          "soundID": -1,
          "md5": "83a9787d4cb6f3b7632b4ddfebf74367.wav",
          "sampleCount": 258,
          "rate": 11025,
          "format": ""
        }],
      "costumes": [{
          "costumeName": "fish3",
          "baseLayerID": -1,
          "baseLayerMD5": "5ab571cf8c6e6bcf0ee2443b5df17dcb.png",
          "rotationCenterX": 90,
          "rotationCenterY": 79,
          "spritesHiddenInScene": null
        },
        {
          "costumeName": "crab1-a",
          "baseLayerID": -1,
          "baseLayerMD5": "110bf75ed212eb072acec2fa2c39456d.png",
          "rotationCenterX": 92,
          "rotationCenterY": 62,
          "spritesHiddenInScene": null
        },
        {
          "costumeName": "ballerina-a",
          "baseLayerID": -1,
          "baseLayerMD5": "4c789664cc6f69d1ef4678ac8b4cb812.png",
          "rotationCenterX": 51,
          "rotationCenterY": 84,
          "spritesHiddenInScene": null
        }],
      "currentCostumeIndex": 2,
      "scratchX": 108,
      "scratchY": -28,
      "scale": 1,
      "direction": 90,
      "rotationStyle": "normal",
      "isDraggable": false,
      "indexInLibrary": 0,
      "visible": true
    }],
  "info": {
  }
};
