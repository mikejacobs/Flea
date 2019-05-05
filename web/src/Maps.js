var maps = {
  basic: [
    // {
    //   id: "ground",
    //   type: "platform",
    //   x: 0,
    //   y: 1,
    //   height: 1,
    //   width: canvasTileWidth,
    //   color: "black"
    // },
    {
      type: "player",
      color: "blue",
      x: 1,
      y: 10,
      height: 0.95,
      width: 0.95,
      strength: 25
    },
    {
      type: "platform",
      x: 1,
      y: 5,
      height: 1,
      width: 5
    },
    {
      x: 10,
      type: "sidehold",
      y: 13,
      height: 10,
      width: 1,
      color: "green"
    },
    {
      type: "platform",
      x: canvasTileWidth,
      y: canvasTileHeight,
      height: canvasTileHeight,
      width: 1,
      color: "white"
    },
    {
      type: "platform",
      x: -1,
      y: canvasTileHeight,
      height: canvasTileHeight,
      width: 1,
      color: "green"
    },
    {
      type: "hazard",
      x: 13,
      y: 10,
      height: 1,
      width: 5,
      color: "pink"
    },
    {
      type: "spring",
      x: 1,
      y: 20,
      height: 1,
      width: 1,
      color: "purple"
    }
  ]
};

function giveBlockId(block) {
  block.id = block.x + "_" + block.y;
}

for (map in maps) {
  var m = maps[map];
  m.map(giveBlockId);
  m.push({
    id: -canvasTileWidth + "_" + -100,
    type: "hazard",
    x: -canvasTileWidth,
    y: -100,
    height: 1,
    width: canvasTileWidth * 3,
    color: "black"
  });
}
