var maps = {
  basic: [
    {
      id: "ground",
      type: "platform",
      x: ctx.canvas.width / 2 / SCALE,
      y: ctx.canvas.height / SCALE,
      halfHeight: 5 / SCALE,
      halfWidth: ctx.canvas.width / SCALE,
      color: "black"
    },
    {
      id: "player",
      type: "player",
      color: "green",
      x: 1,
      y: 7,
      halfHeight: 5 / SCALE,
      halfWidth: 5 / SCALE,
      strength: 25
    },
    {
      id: "b1",
      x: 5,
      type: "platform",
      y: 10,
      halfHeight: 5 / SCALE,
      halfWidth: 100 / SCALE
    },
    {
      id: "sh1",
      type: "sidehold",
      x: 10,
      y: 10,
      halfHeight: 150 / SCALE,
      halfWidth: 5 / SCALE,
      color: "green"
    },
    {
      id: "rightWall",
      type: "platform",
      x: ctx.canvas.width / SCALE + 5 / SCALE,
      y: 0,
      halfHeight: ctx.canvas.width / SCALE,
      halfWidth: 5 / SCALE,
      color: "white"
    },
    {
      id: "leftWall",
      type: "platform",
      x: -5 / SCALE,
      y: 0,
      halfHeight: ctx.canvas.width / SCALE,
      halfWidth: 5 / SCALE,
      color: "white"
    },
    {
      id: "haz1",
      type: "hazard",
      x: 13.5,
      y: 10,
      halfHeight: 5 / SCALE,
      halfWidth: 100 / SCALE,
      color: "pink"
    },
    {
      id: "spring1",
      type: "spring",
      x: 1,
      y: 10,
      halfHeight: 5 / SCALE,
      halfWidth: 5 / SCALE,
      color: "purple"
    },
    {
      id: "spring2",
      type: "spring",
      x: 3,
      y: 2,
      halfHeight: 50 / SCALE,
      halfWidth: 50 / SCALE,
      color: "purple"
    }
  ]
};
