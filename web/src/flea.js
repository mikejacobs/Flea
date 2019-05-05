////////////////////////
/*
TODO:
    *implement tile system
        convert tiles to box2d scaling system (2/SCALE = 1 tile)
    *make better hazard
    *death animation
        explosion?

*/
////////////////////////
// Options
var activeMapName = "basic";
var canvasWidth = 1200;
var canvasHeight = 600;
var debugging = true;
//

var commandButton, shiftButton, spaceBar, rightArrow, leftArrow, upArrow;

var world = {};
var bodiesState = null;
var game = null;
var once = true;
var tileSize = 10;
var running = true;

var ctx;
var canvasTileWidth = canvasWidth / tileSize;
var canvasTileHeight = canvasHeight / tileSize;

function update(animStart) {
  game.update();
  bodiesState = game.getState();
  var graveyard = [];
  for (var id in bodiesState) {
    var entity = world[id];
    // console.log("entity update", entity.type, entity.x);
    if (entity && entity.toDelete) {
      console.log("removeing", entity);
      graveyard.push(id);
    } else if (entity) {
      entity.update(bodiesState[id]);
    }
  }

  for (var i = 0; i < graveyard.length; i++) {
    game.removeBody(world[graveyard[i]].id);
    delete world[graveyard[i]];
  }
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (var id in world) {
    var entity = world[id];
    entity.draw(ctx);
  }
}

function createCanvas(id, parent) {
  var canvas = $(
    '<canvas id="' +
      id +
      '" width="' +
      canvasWidth +
      '" height="' +
      canvasHeight +
      '"/>'
  );
  canvas.appendTo($("#" + parent));
  return canvas;
}

function init(map) {
  ctx = createCanvas("canvas", "canvases")
    .get(0)
    .getContext("2d");

  var activeMap = map || maps[activeMapName];
  console.log("map", map);
  for (var i = 0; i < activeMap.length; i++) {
    // console.log("initial state ud", activeMap[i].id)
    var block = activeMap[i];
    block.halfWidth = (block.width * tileSize) / (2 * SCALE);
    block.halfHeight = (block.height * tileSize) / (2 * SCALE);
    block.x = (block.x * tileSize) / SCALE + block.halfWidth;
    block.y = (canvasHeight - block.y * tileSize) / SCALE + block.halfHeight;
    // console.log("build entity: ", block.id, block.x, block.y)
    world[block.id] = Entity.build(block);
    if (block.type == "player") player = world[block.id];
  }
  game = new Game(60, false, canvasWidth, canvasHeight, SCALE);
  game.setBodies(world);
  editor = new Editor(createCanvas("crosshair", "canvases"));
  running = true;
}

function loadMap(map) {
  // todo: destroy canvases
  running = false;
  $("canvas").remove();
  game = null;
  editor = null;
  world = {};
  init(map);
}

$(window).keydown(routeDown);
$(window).keyup(routeUp);

function routeDown(e) {
  // console.log(e.keyCode)
  switch (e.keyCode) {
    case 16:
      shiftButton = true;
      break;
    case 32:
      spaceBar = true;
      return false;
      // jump()
      break;
    case 39:
      rightArrow = true;
      moveState = 1;
      break;
    case 37:
      leftArrow = true;
      moveState = -1;
      break;
    case 224:
      commandButton = true;
      break;
    case 38:
      upArrow = true;
      break;
    default:
      break;
  }
}

function routeUp(e) {
  // console.log(e.keyCode)
  switch (e.keyCode) {
    case 16:
      shiftButton = false;
      break;
    case 224:
      commandButton = false;
      break;
    case 32:
      spaceBar = false;
      return false;
      break;
    case 39:
      rightArrow = false;
      moveState = 0;
      break;
    case 37:
      leftArrow = false;
      moveState = 0;
      break;
    case 38:
      upArrow = false;
      break;
    default:
      break;
  }
}

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
$(function() {
  init();

  (function loop(animStart) {
    update(animStart);
    draw();
    player.step();
    //debug pause
    !((debugging && shiftButton && commandButton) || !running) &&
      requestAnimFrame(loop);
  })();
});
tileToBox = function(value) {
  return (value * 2 + 1) / 12;
};
tileToMeters = function(value) {};
