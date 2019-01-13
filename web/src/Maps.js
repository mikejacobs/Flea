var maps = {
  basic: [
    {
      id: "ground",
      type: "platform",
      x: 0,
      y: 1,
      height: 1,
      width: canvasTileWidth,
      color: "black"
    },
    {
      id: "player",
      type: "player",
      color: "blue",
      x: 1,
      y: 10,
      height: 0.95,
      width: 0.95,
      strength: 25
    },
    {
      id: "b1",
      type: "platform",
      x: 1,
      y: 5,
      height: 1,
      width: 5
    },
    {
      id: "sh1",
      x: 10,
      type: "sidehold",
      y: 13,
      height: 10,
      width: 1,
      color: "green"
    },
    {
      id: "rightWall",
      type: "platform",
      x: canvasTileWidth,
      y: canvasTileHeight,
      height: canvasTileHeight,
      width: 1,
      color: "white"
    },
    {
      id: "leftWall",
      type: "platform",
      x: -1,
      y: canvasTileHeight,
      height: canvasTileHeight,
      width: 1,
      color: "green"
    },
    {
      id: "haz1",
      type: "hazard",
      x: 13,
      y: 10,
      height: 1,
      width: 5,
      color: "pink"
    },
    {
      id: "spring1",
      type: "spring",
      x: 1,
      y: 20,
      height: 1,
      width: 1,
      color: "purple"
    }
  ]
};
